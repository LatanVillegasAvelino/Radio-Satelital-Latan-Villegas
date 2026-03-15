# 🔐 Configuración de Firma Digital — Quick Start

> Esquema de firma: **APK Signature Scheme V2 + V3** (RSA-2048 · 10000 días)

## 📦 Archivos creados/actualizados

1. **`.github/workflows/android-build.yml`** - Workflow de GitHub Actions con soporte para firmado
2. **`docs/ANDROID_SIGNING_GUIDE.md`** - Guía completa de configuración
3. **`scripts/generate-android-signing.sh`** - Script para generar el keystore automáticamente

## 🚀 Inicio rápido

### Paso 1: Generar el Keystore

Ejecuta el script (en Linux/macOS):

```bash
chmod +x scripts/generate-android-signing.sh
./scripts/generate-android-signing.sh
```

El script te pedirá:
- Información personal (nombre, empresa, país)
- Contraseñas del keystore

Esto generará:
- `android-keystore.jks` - Tu keystore privado
- `android-keystore.txt` - Versión base64 codificada

### Paso 2: Configurar Secretos en GitHub

Ve a: `https://github.com/latanvillegas/Radio_Satelital/settings/secrets/actions`

Crea **3 secretos**:

| Nombre | Valor |
|--------|-------|
| `KEYSTORE_BASE64` | Contenido de `android-keystore.txt` (una línea) |
| `KEY_ALIAS` | El alias usado al generar (ej: `radio_satelital`) |
| `KEY_PASSWORD` | La contraseña del keystore y clave |

### Paso 3: Activar el Workflow

```bash
# Commit de cambios
git add .gitignore SIGNING_README.txt
git commit -m "Add Android signing configuration"

# Push a la rama version-nativa
git push origin version-nativa
```

El workflow se ejecutará automáticamente al detectar el push.

## 📱 Verificar el APK Firmado

Después del workflow:

1. Ve a **Actions** en GitHub
2. Selecciona la última ejecución
3. Descarga el artifact `RadioSatelital-v9.5-Release-APK-Signed`
4. Verifica la firma V2/V3 localmente:

```bash
# Verificar esquema V2/V3 (usa apksigner, NO jarsigner)
$ANDROID_SDK_ROOT/build-tools/34.0.0/apksigner verify --verbose --print-certs RadioSatelital-v9.5-release-signed.apk
```

Salida esperada:
```
Verified using v2 scheme (APK Signature Scheme v2): true
Verified using v3 scheme (APK Signature Scheme v3): true
```

## ⚠️ Seguridad Importante

```bash
# NO hagas commit de estos archivos:
echo "android-keystore.jks" >> .gitignore
echo "*.txt" >> .gitignore
echo "SIGNING_README.txt" >> .gitignore
```

## 📚 Documentación Completa

Para más detalles, consulta: **[docs/ANDROID_SIGNING_GUIDE.md](docs/ANDROID_SIGNING_GUIDE.md)**

## 🛠️ Troubleshooting

Si el APK se genera sin firmar:
1. Verifica que los 3 secretos estén configurados en GitHub
2. Revisa los logs del workflow en Actions
3. Asegúrate de usar las contraseñas correctas

---

**Configuración completada** ✅
