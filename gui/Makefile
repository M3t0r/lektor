# we'll use the integrity file as a stand-in for the whole of node_modules/
NODE_MODULES := node_modules/.yarn-integrity

YARN := yarn

.PHONY: build
build: ${NODE_MODULES}
	$(YARN) run electron-webpack
	$(YARN) run electron-builder

.PHONY: run
run: ${NODE_MODULES}
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
