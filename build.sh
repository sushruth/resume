#!/bin/bash
set -e

# Install Bun if not present
if ! command -v bun &> /dev/null; then
    echo "Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
fi

# Navigate to CLI directory and run sync
cd cli
bun install
bun run sync
cd ..

# Copy index.html to root for Cloudflare Pages
cp resume/index.html ./index.html

echo "Build complete!"
