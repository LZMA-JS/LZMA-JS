
/*
 * Copyright (C) 2009 Archie L. Cobbs. All rights reserved.
 *
 * $Id$
 */

package org.dellroad.lzma.client;

/**
 * Encodes and decodes strings to/from binary using "modified UTF-8 encoding".
 * This is the same encoding as is used by Java class files.
 */
public final class UTF8 {

    private UTF8() {
    }

    /**
     * Encode the given string.
     */
    public static byte[] encode(String s) {
        final char[] chars = s.toCharArray();
        int elen;

        // Compute encoded length
        elen = 0;
        for (int i = 0; i < s.length(); i++) {
            int ch = chars[i];
            if (ch >= 0x0001 && ch <= 0x007f)
                elen++;
            else if (ch == 0x0000 || (ch >= 0x0080 && ch <= 0x07ff))
                elen += 2;
            else
                elen += 3;
        }

        // Do the actual encoding
        byte[] data = new byte[elen];
        elen = 0;
        for (int i = 0; i < s.length(); i++) {
            int ch = chars[i];
            if (ch >= 0x0001 && ch <= 0x007f)
                data[elen++] = (byte)ch;
            else if (ch == 0x0000
                || (ch >= 0x0080 && ch <= 0x07ff)) {
                data[elen++]
                    = (byte)(0xc0 | ((ch >> 6) & 0x1f));
                data[elen++] = (byte)(0x80 | (ch & 0x3f));
            } else {
                data[elen++]
                    = (byte)(0xe0 | ((ch >> 12) & 0x0f));
                data[elen++]
                    = (byte)(0x80 | ((ch >> 6) & 0x3f));
                data[elen++] = (byte)(0x80 | (ch & 0x3f));
            }
        }
        return data;
    }

    /**
     * Decode the given UTF-8 data.
     *
     * @throws IllegalArgumentException if the UTF-8 input is invalid
     */
    public static String decode(byte[] utf) {
        StringBuilder buf = new StringBuilder(utf.length);
        for (int i = 0; i < utf.length; i++) {
            int x = utf[i] & 0xff;
            if ((x & 0x80) == 0) {
                if (x == 0)
                    throw new IllegalArgumentException("invalid UTF-8");
                buf.append((char)x);
            } else if ((x & 0xe0) == 0xc0) {
                if (i + 1 >= utf.length)
                    throw new IllegalArgumentException("invalid UTF-8");
                int y = utf[++i] & 0xff;
                if ((y & 0xc0) != 0x80)
                    throw new IllegalArgumentException("invalid UTF-8");
                buf.append((char)((x & 0x1f) << 6) | (y & 0x3f));
            } else if ((x & 0xf0) == 0xe0) {
                if (i + 2 >= utf.length)
                    throw new IllegalArgumentException("invalid UTF-8");
                int y = utf[++i] & 0xff;
                if ((y & 0xc0) != 0x80)
                    throw new IllegalArgumentException("invalid UTF-8");
                int z = utf[++i] & 0xff;
                if ((z & 0xc0) != 0x80)
                    throw new IllegalArgumentException("invalid UTF-8");
                buf.append((char)(((x & 0x0f) << 12) | ((y & 0x3f) << 6) | (z & 0x3f)));
            } else
                throw new IllegalArgumentException("invalid UTF-8");
        }
        return buf.toString();
    }
}

