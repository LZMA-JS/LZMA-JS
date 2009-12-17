
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
     */
    public LZMAByteArrayDecompressor(byte[] data) {
        this.output = new ByteArrayOutputStream();
        try {
            init(new ByteArrayInputStream(data), this.output);
        } catch (IOException e) {
            throw new RuntimeException("impossible exception");
        }
    }

    /**
     * Get the uncompressed data.
     */
    public byte[] getUncompressedData() {
        return this.output.toByteArray();
    }
}

