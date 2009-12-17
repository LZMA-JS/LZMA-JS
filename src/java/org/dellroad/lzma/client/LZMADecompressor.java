
/*
 * Copyright (C) 2009 Archie L. Cobbs. All rights reserved.
 *
 * $Id$
 */

package org.dellroad.lzma.client;

import com.google.gwt.user.client.IncrementalCommand;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.dellroad.lzma.client.SevenZip.Compression.LZMA.Chunker;
import org.dellroad.lzma.client.SevenZip.Compression.LZMA.Decoder;

/**
 * LZMA decompressor.
 */
public class LZMADecompressor implements IncrementalCommand {

    private Chunker chunker;
    private long length;
    private IOException exception;

    /**
     * Constructor.
     *
     * <p>
     * Decompression will stop when one of the following is true:
     * <ul>
     * <li>An "end of file" marker is read from the compressed data</li>
     * <li>The decompressed output reaches the length encoded in the compressed data</li>
     * <li>The end of {@code input} is reached</li>
     * </ul>
     *
     * <p>
     * The input and output streams will <em>not</em> be closed when the operation completes.
     *
     * @param input compressed input
     * @param output uncompressed output
     * @throws IOException if {@code input} or {@code output} causes an exception
     * @throws IOException if the compressed data is truncated or corrupted
     */
    public LZMADecompressor(InputStream input, OutputStream output) throws IOException {
        init(input, output);
    }

    LZMADecompressor() {
    }

    void init(InputStream input, OutputStream output) throws IOException {
        byte[] properties = new byte[5];
        for (int i = 0; i < properties.length; i++) {
            int r = input.read();
            if (r == -1)
                throw new IOException("truncated input");
            properties[i] = (byte)r;
        }
        Decoder decoder = new Decoder();
        if (!decoder.SetDecoderProperties(properties))
            throw new IOException("corrupted input");
        long expectedLength = -1;
        for (int i = 0; i < 64; i += 8) {
            int r = input.read();
            if (r == -1)
                throw new IOException("truncated input");
            expectedLength |= ((long)r) << i;
        }
        this.length = expectedLength;
        this.chunker = decoder.CodeInChunks(input, output, this.length);
    }

    /**
     * Process the next chunk of data. If an {@link IOException} is thrown during processing,
     * this returns {@code false} and {@link #getException} will return the caught exception.
     *
     * @return {@code true} if there is more work to do, otherwise {@code false}
     * @throws IllegalStateException if this compression operation has already completed
     */
    public boolean execute() {
        try {
            return this.chunker.processChunk();
        } catch (IOException e) {
            this.exception = e;
            return false;
        }
    }

    /**
     * Determine how much of the output data has been generated so far.
     * If a length of {@code -1} was encoded in the compressed data, then this always returns zero.
     *
     * @return a value from 0.0 to 1.0
     */
    public double getProgress() {
        if (this.length == -1)
            return 0.0;
        return (double)this.chunker.getOutBytesProcessed() / (double)this.length;
    }

    /**
     * Get the exception thrown during the previous execution round, if any.
     * <b>Note:</b> this method must be checked after compression is complete to determine
     * if there was an error.
     *
     * @return thrown exception, or {@code null} if none was ever thrown
     */
    public IOException getException() {
        return this.exception;
    }
}

