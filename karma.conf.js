module.exports = function (config) {
    config.set({
        frameworks: ["mocha", "chai"],
        files: [
            "test/integration/test_helper.js",
            "test/integration/*-test.js",
            { pattern: "test/files/*", watched: false, included: false },
            { pattern: "src/*.js", included: false, nocache: true },
            { pattern: "src/*.js.map", watched: false, included: false, nocache: true }
        ],
        browserNoActivityTimeout: 20000,
        browsers: ["Firefox"]
    });
};
