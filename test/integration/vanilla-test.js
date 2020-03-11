describe("Vanilla", function () {
    before(loadLZMAReference("/base/src/lzma_worker.js"));

    ["", "-min"].forEach(function (suffix) {
        describe("lzma_worker" + suffix + ".js", function () {
            before(loadLZMA("/base/src/lzma_worker" + suffix + ".js"));
            LZMATestCase(true, true, false);
        });

        describe("lzma-c" + suffix + ".js", function () {
            before(loadLZMA("/base/src/lzma-c" + suffix + ".js"));
            LZMATestCase(true, false, false);
        });

        describe("lzma-d" + suffix + ".js", function () {
            before(loadLZMA("/base/src/lzma-d" + suffix + ".js"));
            LZMATestCase(false, true, false);
        });

        describe("lzma" + suffix + ".js with lzma_worker.js", function () {
            before(loadLZMAWorker("/base/src/lzma" + suffix + ".js", "/base/src/lzma_worker.js"));
            LZMATestCase(true, true, true);
        });

        describe("lzma" + suffix + ".js with lzma-c.js", function () {
            before(loadLZMAWorker("/base/src/lzma" + suffix + ".js", "/base/src/lzma-c.js"));
            LZMATestCase(true, false, true);
        });

        describe("lzma" + suffix + ".js with lzma-d.js", function () {
            before(loadLZMAWorker("/base/src/lzma" + suffix + ".js", "/base/src/lzma-d.js"));
            LZMATestCase(false, true, true);
        });
    });
});
