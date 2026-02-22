#!/bin/bash

# Script de configuración completa para Tauri + Android
# Este script prepara el proyecto para compilación de Android

set -e  # Salir si hay error

echo "🚀 Iniciando configuración de Tauri Android..."

# 1. Verificar dependencias
echo "📋 Verificando dependencias..."

if ! command -v cargo &> /dev/null; then
    echo "❌ Rust/Cargo no está instalado"
    echo "📖 Instala Rust desde: https://rustup.rs/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ Node.js/npm no está instalado"
    exit 1
fi

# 2. Instalar dependencias Node
echo "📦 Instalando dependencias Node..."
npm install

# 3. Instalar Tauri CLI globally (opcional pero recomendado)
echo "📦 Instalando Tauri CLI..."
npm install -g @tauri-apps/cli@latest

# 4. Crear directorio assets si no existe
echo "📁 Creando directorio de assets..."
mkdir -p src-tauri/gen/android/app/src/main/assets

# 5. Copiar archivos frontend al directorio de assets correctamente
echo "📋 Preparando archivos frontend..."
# Los archivos HTML/CSS/JS se sirven desde ../  según la configuración
# Tauri copia automáticamente desde frontendDist

# 6. Inicializar Android (requiere Android SDK)
echo "🤖 Iniciando configuración de Android..."
echo "⚠️  Esto requiere Android SDK instalado"
echo ""
echo "Si no tienes Android SDK instalado, ejecuta:"
echo "  cargo install tauri-cli"
echo "  cargo tauri android init"
echo ""
echo "O instala Android Studio desde: https://developer.android.com/studio"
echo ""

# 7. Mostrar estado de la configuración
echo "✅ Verificación de configuración:"
echo ""
echo "📋 Archivos verificados:"
[ -f "src-tauri/tauri.conf.json" ] && echo "  ✅ tauri.conf.json" || echo "  ❌ tauri.conf.json (falta)"
[ -f "src-tauri/Cargo.toml" ] && echo "  ✅ Cargo.toml" || echo "  ❌ Cargo.toml (falta)"
[ -f "package.json" ] && echo "  ✅ package.json" || echo "  ❌ package.json (falta)"
[ -f "index.html" ] && echo "  ✅ index.html (frontend)" || echo "  ❌ index.html (falta)"
[ -f "icon-192.png" ] && echo "  ✅ icon-192.png" || echo "  ❌ icon-192.png (falta)"

echo ""
echo "📦 Dependencias Rust:"
grep "version" src-tauri/Cargo.toml | head -3

echo ""
echo "🎯 Próximos pasos:"
echo "1. Instala Android SDK/NDK (si no lo tienes)"
echo "2. Ejecuta: cargo tauri android init"
echo "3. Ejecuta: cargo tauri android dev"
echo "4. O compila con: cargo tauri android build"
echo ""
echo "✨ Configuración completada!"
