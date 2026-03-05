#!/usr/bin/env bash

set -euo pipefail

if [[ "${EUID}" -eq 0 ]]; then
  echo "Ejecuta este script como usuario normal (no root)."
  exit 1
fi

if [[ ! -f /etc/os-release ]]; then
  echo "No se pudo detectar el sistema operativo."
  exit 1
fi

source /etc/os-release

if [[ "${ID:-}" != "ubuntu" ]]; then
  echo "Este script está preparado para Ubuntu. Detectado: ${ID:-desconocido}"
  exit 1
fi

if ! command -v sudo >/dev/null 2>&1; then
  echo "sudo no está disponible en este sistema."
  exit 1
fi

echo "[1/5] Actualizando índices de paquetes..."
sudo apt update

echo "[2/5] Instalando dependencias del sistema para Tauri..."
sudo apt install -y \
  libwebkit2gtk-4.1-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  patchelf \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  pkg-config

echo "[3/5] Verificando Rust..."
if ! command -v rustc >/dev/null 2>&1; then
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
fi

export PATH="${HOME}/.cargo/bin:${PATH}"

if ! command -v rustc >/dev/null 2>&1; then
  echo "Rust no quedó disponible en PATH. Abre una nueva terminal e inténtalo de nuevo."
  exit 1
fi

echo "[4/5] Verificando Node.js y npm..."
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "Node.js/npm no detectados. Instalando desde repositorio de Ubuntu..."
  sudo apt install -y nodejs npm
fi

echo "[5/5] Instalando dependencias del proyecto..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${PROJECT_ROOT}"
npm install

echo ""
echo "✅ Entorno nativo listo."
echo "Siguiente paso:"
echo "  npm run tauri:dev"
echo "  npm run tauri:build"
