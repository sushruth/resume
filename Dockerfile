FROM alpine:latest

# Install TeX Live and necessary dependencies
RUN apk add --no-cache \
    texlive-full

WORKDIR /workspace

# Copy resume source files from resume/ folder
COPY resume/resume.tex ./
COPY resume/resume.xmpdata ./
COPY resume/TLCresume.sty ./
COPY resume/sections/ ./sections/
COPY resume/careerProfile.json ./

ENTRYPOINT ["pdflatex", "-interaction=nonstopmode", "-output-directory=.", "resume.tex"]
