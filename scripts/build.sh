#!/bin/bash

# This script builds the container image and uses it to compile the resume.
# It mimics the behavior of the CI/CD pipeline for local development.
# Uses Podman for rootless container builds.

set -e

# --- Configuration ---
IMAGE_NAME="latex-builder"
IMAGE_TAG="latest"
CONTAINER_IMAGE="${IMAGE_NAME}:${IMAGE_TAG}"

# --- Build Step ---
echo "Building container image with Podman: ${CONTAINER_IMAGE}..."
podman build --layers -t "${CONTAINER_IMAGE}" .

# --- Compile Step ---
echo "Compiling resume using Podman..."
podman run --rm -w /workspace/resume -v "$(pwd):/workspace:Z" "${CONTAINER_IMAGE}" pdflatex -interaction=nonstopmode -output-directory=/workspace resume.tex

echo "Done. The output is resume.pdf"
