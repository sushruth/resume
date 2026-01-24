#!/bin/bash
set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Install Bun if not present
if ! command -v bun &> /dev/null; then
    echo "Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
fi

# Navigate to CLI directory and run sync
cd "$SCRIPT_DIR/cli"
bun install
bun run sync

# Copy index.html to infrastructure directory
cp "$SCRIPT_DIR/resume/index.html" "$SCRIPT_DIR/index.html"

echo "Build complete!"
