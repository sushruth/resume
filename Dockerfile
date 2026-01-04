FROM alpine:latest

# Install TeX Live with required packages
# texlive: base TeX Live distribution
# texlive-luatex: LuaTeX engine (includes biblatex, fontutils)
# texmf-dist-latexextra: Extra LaTeX packages (includes latexrecommended as dependency)
#   Provides: geometry, hyperref, titlesec, enumitem, xcolor, booktabs, tabularx,
#            array, microtype, colortbl, arydshln, standalone, import, babel, etc.
# texmf-dist-fontsextra: Additional fonts for better typography
RUN apk add --no-cache \
	texlive \
	texlive-luatex \
	texmf-dist-latexextra \
	texmf-dist-fontsextra \
	texmf-dist-langcjk

WORKDIR /workspace
