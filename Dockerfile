FROM alpine:latest

# Install TeX Live and necessary dependencies
RUN apk add --no-cache \
	texlive-full

WORKDIR /workspace
