#!/usr/bin/env bash

set -euo pipefail

# Install our npm dependencies
echo "--- 🚀 Installing npm dependencies..."
npm ci

echo "--- 🚀 Run next build..."
npm run build

# For now we only want the static bundle
zip -r build.zip out
