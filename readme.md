LZMA in a Browser
===

[LZMA.JS](https://github.com/nmrugg/LZMA-JS) is a JavaScript implementation of the Lempel-Ziv-Markov chain (LZMA) compression algorithm.
The JavaScript, CSS, and HTML is licensed under the MIT license.  See LICENSE for more details.

It is based on [gwt-lzma](http://code.google.com/p/gwt-lzma/), which is a port of the LZMA SDK from
Java into JavaScript.  The original Java code is licensed under the Apache License 2.0 license.

Because it is based on a GWT module, the code is unfortunately very difficult to read.  Help cleaning
up the code and making it readable would be appreciated.  It could also be optimized quite a bit.

Live demos can be found [here](http://nmrugg.github.com/LZMA-JS/ "Demos").

How to Use
---

First, load the bootstrapping code.
    
    /// In a browser:
    <script src="../src/lzma.js"></script>

    /// In node:
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

LZMA.JS is available in the npm repository.  If you have [npm](https://github.com/isaacs/npm) installed, you can install it by running
    
    $ npm install lzma

and load it with the following code:
    
    var my_lzma = require("lzma").LZMA();
    

Notes
---

The calls to compress() and decompress() are asynchronous, so you need to supply a callback function if you
want to use the (de)compressed data.  There was a synchronous version, which you can find in
[the archives](https://github.com/nmrugg/LZMA-JS/archives/ef453c278e5087de68b869b2f0d023a0ff922aa2),
but it is no longer maintained.

LZMA.JS will use [web workers](http://www.whatwg.org/specs/web-workers/current-work/) if they are available.  If the
environment does not support web workers, it will create a few global functions (Worker(), onmessage(), and
postMessage()) to mimic the functionality.
