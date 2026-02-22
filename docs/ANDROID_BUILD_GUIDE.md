# Guía de Compilación de Android - Tauri v2

Esta guía te ayudará a compilar Radio Satelital como aplicación nativa Android usando Tauri v2.

## 🔍 Estado Actual de la Configuración

✅ **Configuración corregida:**
- `src-tauri/tauri.conf.json`: Actualizado con configuración Android
- `src-tauri/Cargo.toml`: Dependencias actualizadas
- Iconos verificados: `icon-192.png` y `icon-512.png` existentes
- Permisos Android configurados: INTERNET, ACCESO A RED, AUDIO Y MEDIOS

## 📋 Requisitos Previos

### 1. Instalar herramientas requeridas

```bash
# Instalar Node.js y npm (si no los tienes)
# Desde https://nodejs.org/

# Instalar Rust (si no lo tienes)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Recargar variables de entorno
source $HOME/.cargo/env
```

### 2. Instalar Android SDK

```bash
# Instalación recomendada: 
# Descarga Android Studio desde https://developer.android.com/studio

# O si prefieres CLI (Linux/macOS):
# sdkmanager es proporcionado por Android Studio

# Variables de entorno (agregar al ~/.bashrc o ~/.zshrc):
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH
```

### 3. Agregar targets de Rust para Android

```bash
rustup target add aarch64-linux-android
rustup target add armv7-linux-androideabi
rustup target add x86_64-linux-android
rustup target add i686-linux-android
```

## 🚀 Inicialización de Android (Primera Vez)

Ejecuta este script en el directorio raíz del proyecto:

```bash
bash scripts/setup-android.sh
```

O manualmente:

```bash
# 1. Instalar dependencias Node
npm install

# 2. Inicializar Android
cargo install tauri-cli
cargo tauri android init
```

Esto creará la estructura de Android en `src-tauri/gen/android/`.

## 📦 Compilación para Android

### Desarrollo en vivo

```bash
cargo tauri android dev
```

Conecta un dispositivo Android o inicia un emulador, y la app se instalará en tiempo de desarrollo.

### Compilación de APK Debug

```bash
cargo tauri android build --debug
```

APK generado: `src-tauri/gen/android/app/build/outputs/apk/universal/debug/app-universal-debug.apk`

### Compilación de APK Release

```bash
# Compila APKs de diferentes arquitecturas
cargo tauri android build --release
```

APKs generados en: `src-tauri/gen/android/app/build/outputs/apk/release/`

## 🔐 Firmar APK Release (Opcional)

### 1. Generar keystore

```bash
keytool -genkey -v \
  -keystore $HOME/.android/radio-satelital.keystore \
  -alias radio-satelital \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Responde las preguntas con tu información.

### 2. Configurar Tauri para usar la keystore

Edita `src-tauri/tauri.conf.json`:

```json
"android": {
  "signingConfig": {
    "keystorePath": "/ruta/a/radio-satelital.keystore",
    "keystorePassword": "tu_contraseña",
    "keyAlias": "radio-satelital",
    "keyPassword": "tu_contraseña"
  }
}
```

### 3. Compilar con firma

```bash
cargo tauri android build --release
```

## 📦 Estructuras Generadas

Después de ejecutar `tauri android init`, se generan estos APKs:

- **app-universal-release.apk**: Compatible con todos los dispositivos (recomendado para distribución)
- **app-arm64-v8a-release.apk**: Dispositivos ARM 64-bit
- **app-armeabi-v7a-release.apk**: Dispositivos ARM 32-bit
- **app-x86-release.apk**: Emuladores x86
- **app-x86_64-release.apk**: Emuladores x86 64-bit

## 🧪 Testing Antes de Compilar

```bash
# Verificar que todo esté configurado correctamente
ls -la src-tauri/gen/android/  # Debe existir

# Ver la configuración
cat src-tauri/tauri.conf.json | grep android

# Limpiar builds anteriores
cargo clean
cd src-tauri && cargo clean
```

## ⚠️ Problemas Comunes y Soluciones

### Error: "ANDROID_HOME no está definido"
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH
```

### Error: "Rust target aarch64-linux-android not found"
```bash
rustup target add aarch64-linux-android
```

### APK no se instala en el dispositivo
```bash
# Verifica que el dispositivo está conectado
adb devices

# Instalar manualmente
adb install -r app-universal-release.apk
```

### Service Worker causa conflictos
El archivo `sw.js` (PWA) se deshabilita automáticamente en modo Tauri nativo. No requiere cambios.

### Error de permisos en manifiesto
Verificar que `tauri.conf.json` tiene:
```json
"android": {
  "usesPermission": ["INTERNET", "ACCESS_NETWORK_STATE"]
}
```

## 🔄 CI/CD con GitHub Actions

Para compilar automáticamente en GitHub Actions, crea `.github/workflows/android-build.yml`:

```yaml
name: Android Build
on:
  push:
    branches: [version-nativa]

jobs:
  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - uses: dtolnay/rust-toolchain@stable
        with:
          targets: aarch64-linux-android,armv7-linux-androideabi
      - name: Install Android SDK
        uses: android-actions/setup-android@v2
      - name: Build APK
        run: |
          npm install
          npm run tauri android build --release
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: android-apk
          path: src-tauri/gen/android/app/build/outputs/apk/release/
```

## 📱 Distribución

### Google Play Store
1. Crea una cuenta de desarrollador en https://play.google.com/console/developer/
2. Sube el APK universal release
3. Llena los requisitos de la tienda

### Distribuir directamente
1. Comparte el APK `app-universal-release.apk`
2. Los usuarios pueden instalar con: `adb install -r app.apk`
3. O hacer clic en el APK en el gestor de archivos del dispositivo

## 🔗 Referencias

- [Tauri Android Guide](https://v2.tauri.app/develop/android/)
- [Android Developer Docs](https://developer.android.com/docs)
- [Rust Android Targets](https://doc.rust-lang.org/platform-support.html#tier-2)
- [Android Studio](https://developer.android.com/studio)
