LZMA in a Browser
===

[LZMA-JS](https://github.com/nmrugg/LZMA-JS) is a JavaScript implementation of the Lempel-Ziv-Markov chain (LZMA) compression algorithm.
The JavaScript, CSS, and HTML is licensed under the MIT license.  See LICENSE for more details.

It is based on [gwt-lzma](http://code.google.com/p/gwt-lzma/), which is a port of the LZMA SDK from
Java into JavaScript.  The original Java code is licensed under the Apache License 2.0 license.

Demos
---

Live demos can be found [here](http://nmrugg.github.com/LZMA-JS/ "Demos").

How to Use
---

First, load the bootstrapping code.
    
    /// In a browser:
    <script src="../src/lzma.js"></script>

    /// In Node.js:
    var LZMA = require("../src/lzma.js").LZMA;

Create the LZMA object.
    
    /// LZMA([optional path])
    /// If lzma_worker.js is in the same directory, you don't need to set the path.
    /// You should be able to do the first two steps simultaneously in Node.js: var my_lzma = require("../src/lzma.js").LZMA();
    var my_lzma = new LZMA("../src/lzma_worker.js");

(De)Compress stuff.

    /// To compress:
    ///NOTE: mode can be 1-9 (1 is fast but not as good; 9 will probably make your browser crash).
    my_lzma.compress(string, mode, on_finish(result) {}, on_progress(percent) {});
    
    /// To decompress:
    my_lzma.decompress(byte_array, on_finish(result) {}, on_progress(percent) {});

Node.js Installation
---

LZMA-JS is available in the npm repository.
    
    $ npm install lzma

and load it with the following code:
    
    var my_lzma = require("lzma").LZMA();
    

Notes
---

The calls to compress() and decompress() are asynchronous, so you need to supply a callback function if you
want to use the (de)compressed data.

If the decompression progress is unable to be calculated, the on_progress() function will be triggered once with the value -1.

LZMA-JS will try to use Web Workers if they are available.  If the environment does not support web workers,
it will just do something else, and it won't pollute the global scope.

But I don't want to use Web Workers
---

If you'd prefer not to bother with Web Workers, you can just include <code>lzma_worker.js</code> directly. For example:

    <script src="../src/lzma_worker.js"></script>

That will create a global <code>LZMA</code> <code>object</code> that you can use directly. Like this:

    LZMA.compress(string, mode, on_finish(result) {}, on_progress(percent) {});
    
    LZMA.decompress(byte_array, on_finish(result) {}, on_progress(percent) {});

Note that this <code>LZMA</code> variable is an <code>object</code>, not a <code>function</code>.

In Node.js, the Web Worker code is already skipped, so there's no need to do this.
