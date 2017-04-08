describe("ES6", function () {
    before(loadLZMAReference("/base/dist/js/lzma-codec.min.js"));

    ["", ".min"].forEach(function (suffix) {
        describe("lzma-codec" + suffix + ".js", function () {
            before(loadLZMA("/base/dist/js/lzma-codec" + suffix + ".js"));
            LZMATestCase(true, true, false);
        });

        describe("lzma-comp" + suffix + ".js", function () {
            before(loadLZMA("/base/dist/js/lzma-comp" + suffix + ".js"));
            LZMATestCase(true, false, false);
        });

        describe("lzma-decomp" + suffix + ".js", function () {
            before(loadLZMA("/base/dist/js/lzma-decomp" + suffix + ".js"));
            LZMATestCase(false, true, false);
        });
    });

    ["", "-min"].forEach(function (suffix) {
        describe("lzma" + suffix + ".js with lzma-codec.min.js", function () {
            before(loadLZMAWorker("/base/src/lzma" + suffix + ".js", "/base/dist/js/lzma-codec.min.js"));
            LZMATestCase(true, true, true);
        });

        describe("lzma" + suffix + ".js with lzma-comp.min.js", function () {
            before(loadLZMAWorker("/base/src/lzma" + suffix + ".js", "/base/dist/js/lzma-comp.min.js"));
            LZMATestCase(true, false, true);
        });

        describe("lzma" + suffix + ".js with lzma-decomp.min.js", function () {
            before(loadLZMAWorker("/base/src/lzma" + suffix + ".js", "/base/dist/js/lzma-decomp.min.js"));
            LZMATestCase(false, true, true);
        });
    });
});
