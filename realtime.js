// realtime.js - Sistema de notificaciones en tiempo real con WebSockets
// =====================================================================

class RealtimeNotifier {
  constructor(supabaseConfig) {
    this.config = supabaseConfig;
    this.subscriptions = [];
    this.listeners = {
      stationAdded: [],
      stationApproved: [],
      stationRejected: [],
      adminInvited: [],
      invitationAccepted: [],
      adminAdded: []
    };
    this.notificationQueue = [];
    this.maxQueueSize = 50;
  }

  /**
   * Suscribirse a cambios en tabla de estaciones (nuevas radios pendientes)
   */
  watchPendingStations(onNewStation) {
    if (!this.config) return;

    const listener = {
      event: '*',
      schema: 'public',
      table: 'global_stations',
      filter: 'status=eq.pending'
    };

    this.listeners.stationAdded.push(onNewStation);

    const channel = this.createChannel('pending-stations', listener, (payload) => {
      if (payload.eventType === 'INSERT') {
        const station = payload.new;
        this.notificationQueue.push({
          id: Date.now(),
          type: 'station-added',
          title: '🎙️ Nueva radio pendiente',
          message: `${station.name} (${station.country})`,
          station,
          timestamp: new Date(),
          read: false
        });

        onNewStation(station);
        this.triggerNotification('stationAdded', station);
      }
    });

    return channel;
  }

  /**
   * Suscribirse a cambios en aprobaciones
   */
  watchApprovals(onApprovalChange) {
    if (!this.config) return;

    const listener = {
      event: '*',
      schema: 'public',
      table: 'global_stations',
      filter: 'status=in.(approved,rejected)'
    };

    const channel = this.createChannel('approval-changes', listener, (payload) => {
      if (payload.eventType === 'UPDATE') {
        const station = payload.new;
        const previousStatus = payload.old.status;

        if (station.status === 'approved' && previousStatus === 'pending') {
          this.notificationQueue.push({
            id: Date.now(),
            type: 'station-approved',
            title: '✅ Radio aprobada',
            message: `${station.name} fue aprobada`,
            station,
            timestamp: new Date(),
            read: false
          });

          this.triggerNotification('stationApproved', station);
        } else if (station.status === 'rejected' && previousStatus === 'pending') {
          this.notificationQueue.push({
            id: Date.now(),
            type: 'station-rejected',
            title: '❌ Radio rechazada',
            message: `${station.name} fue rechazada`,
            station,
            timestamp: new Date(),
            read: false
          });

          this.triggerNotification('stationRejected', station);
        }

        onApprovalChange(station);
      }
    });

    return channel;
  }

  /**
   * Suscribirse a nuevas invitaciones
   */
  watchInvitations(onNewInvitation) {
    if (!this.config) return;

    const listener = {
      event: 'INSERT',
      schema: 'public',
      table: 'admin_invitations'
    };

    this.listeners.adminInvited.push(onNewInvitation);

    const channel = this.createChannel('admin-invitations', listener, (payload) => {
      const invitation = payload.new;

      this.notificationQueue.push({
        id: Date.now(),
        type: 'invitation-sent',
        title: '📧 Nueva invitación enviada',
        message: `Invitación enviada a ${invitation.email}`,
        invitation,
        timestamp: new Date(),
        read: false
      });

      onNewInvitation(invitation);
      this.triggerNotification('adminInvited', invitation);
    });

    return channel;
  }

  /**
   * Suscribirse a nuevos administradores
   */
  watchAdminUsers(onNewAdmin) {
    if (!this.config) return;

    const listener = {
      event: 'INSERT',
      schema: 'public',
      table: 'admin_users'
    };

    this.listeners.adminAdded.push(onNewAdmin);

    const channel = this.createChannel('admin-users', listener, (payload) => {
      const admin = payload.new;

      this.notificationQueue.push({
        id: Date.now(),
        type: 'admin-added',
        title: '👤 Nuevo administrador',
        message: `${admin.email} fue agregado como ${admin.role}`,
        admin,
        timestamp: new Date(),
        read: false
      });

      onNewAdmin(admin);
      this.triggerNotification('adminAdded', admin);
    });

    return channel;
  }

  /**
   * Crear canal de Realtime
   */
  createChannel(channelName, listener, callback) {
    if (!this.config || !this.config.url) {
      console.warn('Supabase Realtime no disponible');
      return null;
    }

    // Usar Supabase Realtime API
    const wsUrl = this.config.url
      .replace('https://', 'wss://')
      .replace('http://', 'ws://') + '/realtime/v1';

    try {
      const socket = new WebSocket(`${wsUrl}?apikey=${this.config.anonKey}`);

      socket.onopen = () => {
        // Suscribirse al canal
        const subscription = {
          id: Date.now(),
          event: 'phx_join',
          topic: `realtime:${listener.schema}:${listener.table}`,
          payload: {
            config: {
              postgres_changes: [listener]
            }
          }
        };

        socket.send(JSON.stringify(subscription));
        console.log(`✓ Conectado a canal: ${channelName}`);
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          if (message.event === 'postgres_changes') {
            const payload = message.payload;
            if (payload && payload.data) {
              callback(payload.data);
            }
          }
        } catch (e) {
          console.error('Error procesando mensaje WebSocket:', e);
        }
      };

      socket.onerror = (error) => {
        console.error(`Error en canal ${channelName}:`, error);
      };

      socket.onclose = () => {
        console.log(`✗ Desconectado de canal: ${channelName}`);
        // Reintentar conexión en 5 segundos
        setTimeout(() => {
          this.createChannel(channelName, listener, callback);
        }, 5000);
      };

      this.subscriptions.push({
        name: channelName,
        socket,
        listener
      });

      return socket;
    } catch (error) {
      console.error('Error creando canal WebSocket:', error);
      return null;
    }
  }

  /**
   * Disparar evento de notificación
   */
  triggerNotification(eventType, data) {
    if (this.listeners[eventType]) {
      this.listeners[eventType].forEach(callback => {
        try {
          callback(data);
        } catch (e) {
          console.error(`Error en listener ${eventType}:`, e);
        }
      });
    }

    // Limitar tamaño de cola
    if (this.notificationQueue.length > this.maxQueueSize) {
      this.notificationQueue = this.notificationQueue.slice(-this.maxQueueSize);
    }

    // Dispara notificación del navegador
    this.showBrowserNotification(eventType, data);
  }

  /**
   * Mostrar notificación del navegador
   */
  showBrowserNotification(type, data) {
    if (!('Notification' in window)) return;

    if (Notification.permission !== 'granted') return;

    let title = '';
    let options = {
      icon: '/favicon.png',
      badge: '/icon-192.png',
      tag: type,
      requireInteraction: false
    };

    switch (type) {
      case 'stationAdded':
        title = `🎙️ Nueva radio: ${data.name}`;
        options.body = `${data.country} · ${data.region}`;
        break;
      case 'stationApproved':
        title = `✅ ${data.name} aprobada`;
        options.body = 'La radio está ahora visible para todos';
        break;
      case 'stationRejected':
        title = `❌ ${data.name} rechazada`;
        options.body = 'Revisa el panel para más detalles';
        break;
      case 'adminInvited':
        title = `📧 Invitación enviada`;
        options.body = `${data.email} fue invitado`;
        break;
      case 'adminAdded':
        title = `👤 ${data.email} es admin`;
        options.body = `Rol: ${data.role}`;
        break;
    }

    if (title) {
      new Notification(title, options);
    }
  }

  /**
   * Solicitar permiso para notificaciones
   */
  requestNotificationPermission() {
    if (!('Notification' in window)) {
      console.warn('Notificaciones del navegador no soportadas');
      return Promise.resolve(false);
    }

    if (Notification.permission === 'granted') {
      return Promise.resolve(true);
    }

    if (Notification.permission !== 'denied') {
      return Notification.requestPermission().then(
        permission => permission === 'granted'
      );
    }

    return Promise.resolve(false);
  }

  /**
   * Obtener cola de notificaciones
   */
  getNotificationQueue() {
    return [...this.notificationQueue];
  }

  /**
   * Marcar notificación como leída
   */
  markAsRead(notificationId) {
    const notification = this.notificationQueue.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  /**
   * Limpiar notificaciones leídas
   */
  clearRead() {
    this.notificationQueue = this.notificationQueue.filter(n => !n.read);
  }

  /**
   * Desuscribir de todos los canales
   */
  unsubscribeAll() {
    this.subscriptions.forEach(sub => {
      if (sub.socket) {
        sub.socket.close();
      }
    });
    this.subscriptions = [];
  }

  /**
   * Reproducir sonido de notificación
   */
  playNotificationSound() {
    const audioData = 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==';
    try {
      const audio = new Audio(audioData);
      audio.volume = 0.3;
      audio.play().catch(() => console.log('No se pudo reproducir sonido'));
    } catch (e) {
      console.log('Audio no disponible');
    }
  }

  /**
   * Actualizar badge de la pestaña del navegador
   */
  updateBadge(count) {
    if ('setAppBadge' in navigator) {
      if (count > 0) {
        navigator.setAppBadge(count);
      } else {
        navigator.clearAppBadge();
      }
    }
  }
}

// Exportar para uso
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RealtimeNotifier;
}
