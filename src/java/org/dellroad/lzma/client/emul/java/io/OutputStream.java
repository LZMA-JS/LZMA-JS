
/*
 * Copyright (C) 2009 Archie L. Cobbs. All rights reserved.
 *
 * $Id$
 */

package java.io;

public abstract class OutputStream {

    public abstract void write(int b) throws IOException;

    public void write(byte[] buf) throws IOException {
        write(buf, 0, buf.length);
    }

    public void write(byte[] buf, int off, int len) throws IOException {
        for (int i = 0; i < len; i++)
            write(buf[off + i]);
    }

    public void flush() throws IOException {
    }

    public void close() throws IOException {
    }
}

