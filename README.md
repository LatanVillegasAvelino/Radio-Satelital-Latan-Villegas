# 📻 Radio Satelital - Ultra Wave Player (v9.5)

![Version](https://img.shields.io/badge/version-v9.5-00e676?style=for-the-badge)
![PWA Score](https://img.shields.io/badge/PWABuilder-44%2F44-brightgreen?style=for-the-badge&logo=pwa)
![Platform](https://img.shields.io/badge/Android-TWA-3DDC84?style=for-the-badge&logo=android)

**Radio Satelital** es una aplicación de radio progresiva (PWA) de última generación, certificada con **puntuación perfecta (44/44)** en estándares web. Diseñada para ofrecer streaming de alta calidad, modo offline real y una experiencia visual inmersiva.

🌐 **Web Oficial:** [latanvillegas.online](https://latanvillegas.online/)

---

## 🚀 Características Principales (v9.5)

### 🏆 Certificación Platino PWA
Esta versión ha alcanzado el máximo nivel de integración técnica:
* **✅ Soporte Offline Real:** Nueva interfaz dedicada (`offline.html`) cuando no hay conexión.
* **✅ Widgets Nativos:** Controla la radio desde la pantalla de inicio de Android (carpeta `widgets/`).
* **✅ Integración Profunda:** Soporte para Pestañas (Tabbed Display) y Notas Rápidas.
* **✅ Dual-App Ready:** Verificación de activos (`.well-known`) para coexistir con versiones anteriores.

### 🎧 Experiencia de Audio Premium
* **Motor de Audio v9.5:** Optimizado para cero cortes en segundo plano.
* **Media Session API:** Control total desde la pantalla de bloqueo y reloj.
* **Multi-Formato:** Soporte nativo para `.mp3`, `.m3u` y streaming Shoutcast/Icecast.

### 🎨 Personalización Visual
* **Temas Premium:** Cyber Dark, AMOLED Real, Gold Luxury.
* **Modo Wear:** Estilos inspirados en Smartwatches (Blue Ocean, Sunset Orange).
* **Responsive:** Adaptación fluida a cualquier tamaño de pantalla.

---

## 📲 Descarga e Instalación

### 🤖 Android (APK Oficial)
Descarga la aplicación nativa sin publicidad y con todas las funciones desbloqueadas:
[**📥 Descargar Última Versión (v9.5)**](https://github.com/LatanVillegasAvelino/Radio-Satelital-Latan-Villegas/releases)

### 🌐 Web (PWA)
1. Ingresa a [latanvillegas.online](https://latanvillegas.online/) desde Chrome o Edge.
2. Presiona "Instalar Aplicación" en el menú del navegador.

---

## 📂 Estructura del Proyecto

```text
/
├── .well-known/      # Verificación de activos (AssetLinks para TWA)
├── widgets/          # Configuración de Widgets nativos
│   ├── mini.json
│   └── data.json
├── manifest.json     # Manifiesto v3 (Pestañas, Notas, Shortcuts)
├── sw.js             # Service Worker (Caché inteligente + Offline)
├── index.html        # App Principal
├── offline.html      # Pantalla Sin Conexión
├── style.css         # Motor de Temas v9.5
├── main.js           # Lógica del reproductor
├── stations.js       # Base de datos de emisoras
└── assets/           # Iconos e imágenes

```

## 🤝 Colaboraciones

¡Este proyecto está abierto a la comunidad! Si eres desarrollador o tienes ideas para mejorar **Radio Satelital**, tu ayuda es bienvenida.

Puedes contribuir de las siguientes formas:
* 🐛 **Reportar Errores:** Si encuentras algún fallo, abre un [Issue](https://github.com/LatanVillegasAvelino/Radio-Satelital-Latan-Villegas/issues) detallando el problema.
* 💡 **Sugerir Funciones:** ¿Se te ocurre algo nuevo? Compártelo en la sección de Issues.
* 💻 **Pull Requests:** Si mejoras el código, envía tu solicitud para integrarla al proyecto.
* ⭐ **Deja una Estrella:** Si te gusta el proyecto, ¡apóyanos dando clic en la estrella (Star) arriba a la derecha!

---

## 👤 Autor y Contacto

Desarrollado con ❤️ por **Latán Villegas Avelino**.

* **Redes:** Integradas en la aplicación (Menú Lateral).
* **Estado:** Activo y en desarrollo constante.

---

## ☕ Apoyo al Desarrollador

¿Te gusta **Radio Satelital**? Si valoras este proyecto y quieres motivar futuras actualizaciones, ¡invítame un café!

[![Donar con PayPal](https://img.shields.io/badge/Hacer%20Donaci%C3%B3n-PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=alv.oficial123@gmail.com&currency_code=USD&source=url)

---
© 2026 Radio Satelital. Todos los derechos reservados.
