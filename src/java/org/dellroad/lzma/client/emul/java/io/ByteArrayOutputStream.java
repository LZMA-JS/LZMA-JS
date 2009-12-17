
/*
 * Copyright (C) 2009 Archie L. Cobbs. All rights reserved.
 *
 * $Id$
 */

package java.io;

public class ByteArrayOutputStream extends OutputStream {

    protected byte[] buf;
    protected int count;

    public ByteArrayOutputStream() {
        this(32);
    }

    public ByteArrayOutputStream(int size) {
        this.buf = new byte[size];
    }

    @Override
    public void write(int b) {
        ensureCapacity(this.count + 1);
        this.buf[this.count++] = (byte)b;
    }

    @Override
    public void write(byte[] buf, int off, int len) {
        ensureCapacity(this.count + len);
        System.arraycopy(buf, off, this.buf, this.count, len);
        this.count += len;
    }

    public void writeTo(OutputStream out) throws IOException {
        out.write(this.buf, 0, this.count);
    }

    public void reset() {
        this.count = 0;
    }

    public byte[] toByteArray() {
        byte[] data = new byte[this.count];
        System.arraycopy(this.buf, 0, data, 0, this.count);
        return data;
    }

    public int size() {
        return this.count;
    }

/*
    public String toString() {
        return new String(this.buf, 0, this.count);
    }

    public String toString(String enc) throws UnsupportedEncodingException {
        return new String(this.buf, 0, this.count, enc);
    }

    public String toString(int hibyte) {
        return new String(this.buf, hibyte, 0, this.count);
    }
*/

    private void ensureCapacity(int len) {
        if (len <= this.buf.length)
            return;
        len = Math.max(len, this.buf.length * 2);
        byte[] newbuf = new byte[len];
        System.arraycopy(this.buf, 0, newbuf, 0, this.buf.length);
        this.buf = newbuf;
    }
}

