function loadScript(url, onload) {
    window.LZMA = undefined;
    window.LZMA_WORKER = undefined;

    var script = document.createElement("script");
    document.head.appendChild(script);
    script.src = url;
    script.onload = onload;
    document.head.removeChild(script);
}

function loadLZMA(url) {
    return function (done) {
        var _this = this;
        loadScript(url, function () {
            _this.lzma = LZMA;
            done();
        });
    };
}

function loadLZMAWorker(url, workerURL) {
    return function (done) {
        var _this = this;
        loadScript(url, function () {
            _this.lzma = new LZMA(workerURL);
            done();
        });
    };
}

function loadLZMAReference(url) {
    return function (done) {
        var _this = this;
        loadScript(url, function () {
            _this.lzmaref = LZMA;
            done();
        });
    };
}

var globalFixtures = {};
function loadFixture(name) {
    return function (done) {
        this.fixtures = globalFixtures;

        if (name in globalFixtures) {
            done();
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/base/test/files/" + name, true);
        xhr.responseType = "arraybuffer";
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                globalFixtures[name] = new Int8Array(xhr.response);
                done();
            }
        };
        xhr.send();
    }
}

function testLZMAFixture(name, mode, isCompressor, isDecompressor) {
    before(loadFixture(name));
    before(loadFixture(name + ".lzma"));

    isCompressor &&
        it("can compress '" + name + "'", function (done) {
            var data = this.fixtures[name]
            var lzma = this.lzma;
            this.lzmaref.compress(data, mode, function (expected) {
                lzma.compress(data, mode, function (actual) {
                    expect(actual).to.eql(expected);
                    done();
                });
            });
        });

    isDecompressor &&
        it("can decompress '" + name +".lzma'", function (done) {
            var data = this.fixtures[name + ".lzma"]
            var lzma = this.lzma;
            this.lzmaref.decompress(data, function (expected) {
                lzma.decompress(data, function (actual) {
                    expect(actual).to.eql(expected);
                    done();
                });
            });
        });
}

function LZMATestCase(isCompressor, isDecompressor, isWorker) {
    var raw = "";
    var compressed = [93, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -125, -1, -5, -1, -1, -64, 0, 0, 0];

    isCompressor &&
        it("can compress asynchronously", function (done) {
            this.lzma.compress(raw, 1, function (data) {
                expect(data).to.eql(compressed);
                done()
            });
        });

    isDecompressor &&
        it("can decompress asynchronously", function (done) {
            this.lzma.decompress(compressed, function (data) {
                expect(data).to.eql(raw);
                done()
            });
        });

    if (!isWorker) {
        it("has the same LZMA_WORKER as LZMA", function () {
            expect(LZMA_WORKER).to.equal(LZMA);
        });

        isCompressor &&
            it("can compress synchronously", function () {
                expect(this.lzma.compress(raw, 1)).to.eql(compressed);
            });

        isDecompressor &&
            it("can decompress synchronously", function () {
                expect(this.lzma.decompress(compressed)).to.eql(raw);
            });
    }

    describe("with fixture", function () {
        this.timeout(20000)

        testLZMAFixture("binary", 1, isCompressor, isDecompressor);
        testLZMAFixture("level 9", 9, isCompressor, isDecompressor);

        before(loadFixture("error-corrupted input.lzma"));
        isDecompressor && !isWorker && // Jasmine cannot deal with data clone error
            it("can decompress 'error-corrupted input.lzma'", function (done) {
                this.lzma.decompress(this.fixtures["error-corrupted input.lzma"], function (data, err) {
                    expect(err).to.not.be.undefined;
                    done();
                });
            });

        before(loadFixture("error-truncated input.lzma"));
        isDecompressor && !isWorker && // Jasmine cannot deal with data clone error
            it("can decompress 'error-truncated input.lzma'", function (done) {
                this.lzma.decompress(this.fixtures["error-truncated input.lzma"], function (data, err) {
                    expect(err).to.not.be.undefined;
                    done();
                });
            });
    });
}
