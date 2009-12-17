
package org.dellroad.lzma.client.SevenZip.Compression.LZMA;

import java.io.IOException;

public class Chunker {

    private final Encoder encoder;
    private final Decoder decoder;

    private boolean alive;

    long inBytesProcessed;
    long outBytesProcessed;

    Chunker(Encoder encoder) {
        this.encoder = encoder;
        this.decoder = null;
        this.alive = true;
    }

    Chunker(Decoder decoder) {
        this.decoder = decoder;
        this.encoder = null;
        this.alive = true;
    }

    public long getInBytesProcessed() {
        return this.inBytesProcessed;
    }

    public long getOutBytesProcessed() {
        return this.outBytesProcessed;
    }

    /**
     * Process the next chunk of data.
     *
     * @return {@code true} if there is still more data to process, {@code false} if we're done
     */
    public boolean processChunk() throws IOException {
        if (!this.alive)
            throw new IllegalStateException();
        boolean exception = true;
        try {
            if (this.encoder != null)
                processEncoderChunk();
            else
                processDecoderChunk();
            exception = false;
            return this.alive;
        } finally {
            if (exception)
                this.alive = false;
        }
    }

    private void processEncoderChunk() throws IOException {
        this.encoder.CodeOneBlock(this.encoder.processedInSize, this.encoder.processedOutSize, this.encoder.finished);
        this.inBytesProcessed = this.encoder.processedInSize[0];
        this.outBytesProcessed = this.encoder.processedOutSize[0];
        if (this.encoder.finished[0]) {
            this.encoder.ReleaseStreams();
            this.alive = false;
        }
    }

    private void processDecoderChunk() throws IOException {
        int result = this.decoder.CodeOneChunk();
        if (result == -1)
            throw new IOException("corrupted input");
        this.inBytesProcessed = -1;
        this.outBytesProcessed = this.decoder.nowPos64;
        if (result == 1 || (this.decoder.outSize >= 0 && this.decoder.nowPos64 >= this.decoder.outSize)) {
            this.decoder.CodeFinish();
            this.alive = false;
        }
    }
}

