
/*
 * Copyright (C) 2009 Archie L. Cobbs. All rights reserved.
 *
 * $Id$
 */

package java.io;

public class ByteArrayInputStream extends InputStream {

    protected byte[] buf;
    protected int pos;
    protected int mark;
    protected int count;

    public ByteArrayInputStream(byte[] buf) {
        this(buf, 0, buf.length);
    }

    public ByteArrayInputStream(byte[] buf, int off, int len) {
        this.buf = buf;
        this.pos = off;
        this.mark = off;
        this.count = off + len;
        if (this.count > buf.length)
            this.count = buf.length;
    }

    @Override
    public synchronized int read() {
        if (this.pos >= this.count)
            return -1;
        return this.buf[this.pos++] & 0xff;
    }

    @Override
    public synchronized int read(byte[] buf, int off, int len) {
        if (this.pos >= this.count)
            return -1;
        len = Math.min(len, this.count - this.pos);
        System.arraycopy(this.buf, this.pos, buf, off, len);
        this.pos += len;
        return len;
    }

    @Override
    public synchronized long skip(long n) {
        n = Math.min(n, this.count - this.pos);
        this.pos += (int)n;
        return n;
    }

    @Override
    public synchronized int available() {
        return this.count - this.pos;
    }

    @Override
    public synchronized void mark(int readlimit) {
        this.mark = this.pos;
    }

    @Override
    public synchronized void reset() {
        this.pos = this.mark;
    }

    @Override
    public boolean markSupported() {
        return true;
    }
}

