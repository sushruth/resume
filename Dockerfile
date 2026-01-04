FROM alpine:latest

# Install only necessary LaTeX packages
RUN apk add --no-cache \
    texlive-latex \
    texlive-latex-extra \
    texlive-xetex \
    texlive-fonts-recommended \
    texlive-fonts-extra

WORKDIR /workspace

# Copy resume files
COPY resume.tex ./
COPY resume.xmpdata ./
COPY TLCresume.sty ./
COPY sections/ ./sections/
COPY careerProfile.json ./

ENTRYPOINT ["pdflatex", "-interaction=nonstopmode", "-output-directory=.", "resume.tex"]
