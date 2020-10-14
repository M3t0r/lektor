# we'll use the integrity file as a stand-in for the whole of node_modules/
NODE_MODULES := node_modules/.yarn-integrity

YARN := yarn
CURL := curl
TAR := tar

IMAGEMAGICK_VERSION := 7.0.10-30
IMAGEMAGICK_SOURCES := https://github.com/ImageMagick/ImageMagick/archive/${IMAGEMAGICK_VERSION}.tar.gz
IMAGEMAGICK_DIR := build/ImageMagick-${IMAGEMAGICK_VERSION}
IMAGEMAGICK_BIN_NAME := magick

PLATFORM_BUILD_REQUIREMENTS :=

.PHONY: build
build: ${NODE_MODULES} ${PLATFORM_BUILD_REQUIREMENTS}
	$(YARN) run electron-webpack
	$(YARN) run electron-builder

.PHONY: run
run: ${NODE_MODULES} ${PLATFORM_BUILD_REQUIREMENTS}
	$(YARN) run electron-webpack dev

.PHONY: lint
lint: ${NODE_MODULES}
	${YARN} run standard src/

.PHONY: prettier
prettier: ${NODE_MODULES}
	${YARN} run standard --fix src/

${NODE_MODULES}: package.json
	$(YARN) install --dev
	touch $@

.PHONY: clean
clean:
	rm -rf dist


### ImageMagick

dist/magick: ${IMAGEMAGICK_DIR}/utilities/magick
	cp "$^" "$@"

${IMAGEMAGICK_DIR}/utilities/magick: ${IMAGEMAGICK_DIR}/Makefile
	${MAKE} -C "${IMAGEMAGICK_DIR}" utilities/magick

${IMAGEMAGICK_DIR}/Makefile: ${IMAGEMAGICK_DIR}/configure
	cd "${IMAGEMAGICK_DIR}"; ./configure \
		--enable-static \
		--disable-shared \
		--without-modules \
		--enable-delegate-build

${IMAGEMAGICK_DIR}/configure: build/ImageMagick-${IMAGEMAGICK_VERSION}.tar.gz
	${TAR} -C build/ -xf "$^"
	touch "$@"

build/ImageMagick-${IMAGEMAGICK_VERSION}.tar.gz:
	${CURL} -L ${IMAGEMAGICK_SOURCES} -o "$@"
