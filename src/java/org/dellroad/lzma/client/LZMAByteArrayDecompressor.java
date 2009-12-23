
/*
 * Copyright (C) 2009 Archie L. Cobbs. All rights reserved.
 *
 * $Id$
 */

package org.dellroad.lzma.client;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * LZMA decompressor for {@code byte[]} arrays.
 */
public class LZMAByteArrayDecompressor extends LZMADecompressor {

    private final ByteArrayOutputStream output;

    /**
     * Constructor.
     *
     * @param data compressed data
     * @throws IOException if the compressed data is truncated or corrupted
     */
    public LZMAByteArrayDecompressor(byte[] data) throws IOException {
        this.output = new ByteArrayOutputStream();
        init(new ByteArrayInputStream(data), this.output);
    }

    /**
     * Get the uncompressed data.
     */
    public byte[] getUncompressedData() {
        return this.output.toByteArray();
    }
}

