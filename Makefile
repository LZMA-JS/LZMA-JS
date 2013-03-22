all:
	@echo "Try make check"

check:
	cd test && node test-node.js
