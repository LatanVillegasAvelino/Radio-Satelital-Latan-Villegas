# 🔔 Notificaciones en Tiempo Real - WebSockets

## Descripción

El sistema de notificaciones en tiempo real usa **Supabase Realtime** (basado en WebSockets) para mantener el panel de administración sincronizado con cambios en la base de datos en vivo.

## Características

✅ **Notificaciones instantáneas** cuando llegan nuevas radios  
✅ **Actualizaciones en tiempo real** de aprobaciones/rechazos  
✅ **Notificaciones del navegador** (push notifications)  
✅ **Badge de la pestaña** con contador de notificaciones pendientes  
✅ **Sonidos de notificación**  
✅ **Historial de notificaciones** (últimas 50)  
✅ **Auto-recarga de datos** con cambios  

## Eventos monitoreados

| Evento | Descripción | Icono |
|--------|-------------|-------|
| **station-added** | Nueva radio pendiente de aprobación | 🎙️ |
| **station-approved** | Radio fue aprobada | ✅ |
| **station-rejected** | Radio fue rechazada | ❌ |
| **invitation-sent** | Invitación enviada a nuevo admin | 📧 |
| **admin-added** | Nuevo administrador registrado | 👤 |

## Configuración de Supabase Realtime

### 1. Habilitar Realtime en tu tabla

Ve a **Supabase Dashboard** → **Database** → **Replication**

Habilita Realtime para estas tablas:
- `global_stations`
- `admin_invitations`  
- `admin_users`
- `approval_history`

```sql
-- SQL para habilitar (si es necesario)
ALTER TABLE public.global_stations REPLICA IDENTITY FULL;
ALTER TABLE public.admin_invitations REPLICA IDENTITY FULL;
ALTER TABLE public.admin_users REPLICA IDENTITY FULL;
ALTER TABLE public.approval_history REPLICA IDENTITY FULL;
```

### 2. Configurar WebSocket en supabase.config.js

Asegúrate de que tenga la URL correcta (ya debería estar configurada):

```javascript
window.SUPABASE_CONFIG = {
  url: "https://tuproject.supabase.co",
  anonKey: "tu_clave_anonima",
  // ... resto de config
};
```

## Cómo funciona

### 1. Instancia del notificador

```javascript
// En admin.js
let realtimeNotifier = null;

// Se instancia en setupRealtimeListeners()
realtimeNotifier = new RealtimeNotifier(cfg);
```

### 2. Suscripción a cambios

```javascript
// Escuchar nuevas radios pendientes
realtimeNotifier.watchPendingStations(async (station) => {
  // Se ejecuta automáticamente cuando hay INSERT
  addNotification({...});
  await loadPendingStations();
  renderStations();
});
```

### 3. Mostrar notificación

```javascript
addNotification({
  type: 'station-added',
  title: '🎙️ Nueva radio pendiente',
  message: `${station.name} (${station.country})`,
  timestamp: new Date()
});
```

### 4. Actualización en UI

- Badge con contador se actualiza
- Notificación aparece en el panel desplegable
- Se reproduce sonido (opcional)
- Notificación del navegador (si está permitida)

## UI del Panel de Notificaciones

### Botón de Notificaciones

```
🔔 [5]  ← badge rojo con contador
```

### Panel Desplegable

- Aparece al hacer clic en 🔔
- Muestra últimas notificaciones
- Botón "Limpiar" para borrar todas
- Cada notificación muestra:
  - Icono del tipo
  - Título
  - Mensaje
  - Tiempo transcurrido (ej: "5m", "2h")

### Toast Emergente (opcional)

-Notificación emergente en la esquina inferior derecha
- Se auto-cierra después de 5 segundos

## Notificaciones del Navegador

### Habilitar

```javascript
// Se solicita automáticamente al iniciar panel
realtimeNotifier.requestNotificationPermission()
```

### Permiso

El navegador pedirá permiso una sola vez:
- ✅ Permitir
- ❌ Bloquear
- ⏭️ Preguntar después

### Contenido

Cuando hay una notificación:
- Título: "🎙️ Nueva radio: Radio Satelital"
- Descripción: "Perú · Lima"
- Icono: favicon.png
- Badge: icon-192.png (para dispositivos móviles)

## Badge de la Pestaña

```javascript
// Se actualiza automáticamente
navigator.setAppBadge(count);  // Muestra número
navigator.clearAppBadge();     // Limpia
```

Nota: Solo funciona en navegadores soportados (Chrome, Edge, Firefox)

## Sonidos de Notificación

Código de prueba para reproducir sonido:

```javascript
realtimeNotifier.playNotificationSound();
```

Nota: En realtime.js hay un audio simple de demostración. En producción, reemplazar con un archivo real.

## Cola de Notificaciones

```javascript
// Obtener todas las notificaciones
const allNotifications = notifications;

// Obtener no leídas
const unread = notifications.filter(n => !n.read);

// Marcar como leída
markNotificationAsRead(notificationId);

// Limpiar todas
clearAllNotifications();

// Máximo de notificaciones en memoria
const MAX_NOTIFICATIONS = 50;
```

## Troubleshooting

### WebSocket no conecta

**Síntoma**: Las notificaciones no aparecen

**Solución**:
1. Verificar que Realtime esté habilitado en Supabase
2. Verificar que la URL y API key sean correctas
3. Abrir consola del navegador (F12) y buscar errores
4. Verificar que las tablas tengan `REPLICA IDENTITY FULL`

```sql
-- Verificar estado
SELECT * FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('global_stations', 'admin_users', 'admin_invitations');
```

### Notificaciones no se muestran

**Síntoma**: WebSocket conecta pero no hay notificaciones

**Solución**:
1. Verificar que hay cambios en la BD (INSERT/UPDATE)
2. Abrir DevTools → Network → WS (WebSockets) para ver mensajes
3. Verificar que el filtro de la suscripción coincida
4. Verificar permisos RLS en Supabase

### Demasiadas reconexiones

**Síntoma**: Consola llena de "Desconectado de canal"

**Solución**:
1. Verificar conexión a internet
2. Revisar límites de conexiones en Supabase
3. Ajustar timeout en realtime.js (línea ~170)

```javascript
// Reintentar en 10 segundos (en lugar de 5)
setTimeout(() => {
  this.createChannel(channelName, listener, callback);
}, 10000);
```

## Optimización

### Reducir uso de ancho de banda

1. **Filtros específicos**:
```javascript
// Solo escuchar radios pendientes
const listener = {
  event: 'INSERT',
  schema: 'public',
  table: 'global_stations',
  filter: 'status=eq.pending'  // ← Solo pending
};
```

2. **Unsubscribir cuando sea necesario**:
```javascript
// Desconectar todos los canales
realtimeNotifier.unsubscribeAll();
```

### Caché de notificaciones

```javascript
// Las notificaciones se guardan en memoria
// Para persistencia, agregar a localStorage:

const saveNotifications = () => {
  localStorage.setItem('admin_notifications', JSON.stringify(notifications));
};

const loadNotifications = () => {
  return JSON.parse(localStorage.getItem('admin_notifications') || '[]');
};
```

## Integración Futura

### Notificaciones por email

```javascript
// Cuando se recibe notificación importante
if (importancia === 'alta') {
  await fetch('/api/send-email', {
    method: 'POST',
    body: JSON.stringify({
      to: adminState.currentUser.email,
      subject: notification.title,
      message: notification.message
    })
  });
}
```

### Sonidos personalizados

```javascript
// En realtime.js, reemplazar audio simple por:
const playSound = (type) => {
  const sounds = {
    'station-added': '/sounds/bell.mp3',
    'approved': '/sounds/success.mp3',
    'rejected': '/sounds/error.mp3'
  };
  
  const audio = new Audio(sounds[type]);
  audio.volume = 0.5;
  audio.play();
};
```

### Guardado persistente

```javascript
// Guardar notificaciones en Supabase
const saveNotificationLog = async (notification) => {
  await supabaseRest('notification_logs', {
    method: 'POST',
    data: {
      admin_id: adminState.currentUser.id,
      type: notification.type,
      title: notification.title,
      message: notification.message
    }
  });
};
```

## Archivos Relacionados

- `realtime.js` - Lógica de WebSockets
- `admin.js` - Integración con el panel
- `admin.html` - UI del panel de notificaciones

## Referencias

- [Supabase Realtime Docs](https://supabase.com/docs/guides/realtime)
- [WebSockets API MDN](https://developer.mozilla.org/es/docs/Web/API/WebSocket)
- [Notifications API MDN](https://developer.mozilla.org/es/docs/Web/API/Notifications_API)

---

**Versión**: 1.0  
**Última actualización**: Febrero 2026
