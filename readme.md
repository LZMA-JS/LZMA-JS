LZMA-JS is a JavaScript implementation of the Lempel-Ziv-Markov chain (LZMA) compression algorithm.

It is based on [gwt-lzma](http://code.google.com/p/gwt-lzma/), which is a port of the LZMA SDK from Java into JavaScript.  The original Java code,
which is included in the project, is licensed under the Apache License 2.0 license.

Because it is based on a GWT module, the code is unfortunately very difficult to read.  Help cleaning up the code and making it readable would be appreciated.
It could also be optimized quite a bit.  There are a few bugs to fix too.  WebKit cannot handle large amounts of data, and IE 9 has issues.

The compiled JavaScript is in the build/gwtc/war/lzma_demo directory.  The JavaScript, CSS, and HTML is licensed under
the MIT license.

Live demos can be found [here](http://nmrugg.github.com/LZMA-JS/ "Demos").
