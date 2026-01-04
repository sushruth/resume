FROM alpine:latest

# Install TeX Live and necessary dependencies
RUN apk add --no-cache \
    texlive-full

WORKDIR /workspace

# Copy resume files
COPY resume.tex ./
COPY resume.xmpdata ./
COPY TLCresume.sty ./
COPY sections/ ./sections/
COPY careerProfile.json ./

ENTRYPOINT ["pdflatex", "-interaction=nonstopmode", "-output-directory=.", "resume.tex"]
