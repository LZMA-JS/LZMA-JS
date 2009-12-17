
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
import org.dellroad.lzma.client.SevenZip.Compression.LZMA.Encoder;

/**
 * LZMA compressor.
 */
public class LZMACompressor implements IncrementalCommand {

    /**
     * The default compression mode ({@code 3}).
     */
    public static final CompressionMode DEFAULT_COMPRESSION_MODE = CompressionMode.MODE_3;

    private Chunker chunker;
    private long length;
    private IOException exception;

    /**
     * Construct an encoder with unknown input length and using the {@link #DEFAULT_COMPRESSION_MODE default compression mode}.
     *
     * <p>
     * This is a convenience constructor, equivalent to:
     * <blockquote>
     * <code>LZMACompressor(input, output, -1, DEFAULT_COMPRESSION_MODE)</code>
     * </blockquote>
     */
    public LZMACompressor(InputStream input, OutputStream output) throws IOException {
        this(input, output, -1, DEFAULT_COMPRESSION_MODE);
    }

    /**
     * Construct an encoder with unknown using the {@link #DEFAULT_COMPRESSION_MODE default compression mode}.
     *
     * <p>
     * This is a convenience constructor, equivalent to:
     * <blockquote>
     * <code>LZMACompressor(input, output, length, DEFAULT_COMPRESSION_MODE)</code>
     * </blockquote>
     */
    public LZMACompressor(InputStream input, OutputStream output, long length) throws IOException {
        this(input, output, -1, DEFAULT_COMPRESSION_MODE);
    }

    /**
     * Primary constructor.
     *
     * <p>
     * The given {@code length} limits how much data will be read from the input and
     * will be encoded at the beginning of the compressed output. This allows decompressors
     * to determine the uncompressed length without having to decompress the entire content,
     * and causes the decompressor to stop decompressing at that point. If the length is not
     * known, {@code -1} should be used.
     *
     * <p>
     * The input and output streams will <em>not</em> be closed when the operation completes.
     *
     * @param input uncompressed input
     * @param output compressed output
     * @param length length of the input data if known, otherwise {@code -1}
     * @param mode compression mode
     * @throws IllegalArgumentException if {@code length} is less than {@code -1}
     * @throws IllegalArgumentException if {@code mode} is null
     * @throws IOException if {@code input} or {@code output} does
     */
    public LZMACompressor(InputStream input, OutputStream output, long length, CompressionMode mode) throws IOException {
        init(input, output, length, mode);
    }

    LZMACompressor() {
    }

    void init(InputStream input, OutputStream output, long length, CompressionMode mode) throws IOException {
        if (mode == null)
            throw new IllegalArgumentException("null mode");
        if (length < -1)
            throw new IllegalArgumentException("invalid length " + length);
        this.length = length;
        Encoder encoder = new Encoder();
        mode.configure(encoder);
        encoder.SetEndMarkerMode(true);
        encoder.WriteCoderProperties(output);
        for (int i = 0; i < 64; i += 8)
            output.write((int)(length >> i) & 0xff);
        this.chunker = encoder.CodeInChunks(input, output, length, -1);
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
     * Determine how much of the input data has been compressed so far.
     * If a length of {@code -1} was given to the constructor, then this always returns zero.
     *
     * @return a value from 0.0 to 1.0
     */
    public double getProgress() {
        if (this.length == -1)
            return 0.0;
        return (double)this.chunker.getInBytesProcessed() / (double)this.length;
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

