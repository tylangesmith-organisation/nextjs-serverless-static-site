#!/usr/bin/env bash

set -euo pipefail

# Ok lets's jump into our CDK directory
cd .github/deploy

# Install our npm dependencies
echo "--- 🚀 Installing npm dependencies..."
npm ci

echo "--- 🚀 Run lint..."
npm run lint

echo "--- 🚀 Run tests..."
npm run test
