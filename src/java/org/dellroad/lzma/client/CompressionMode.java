
/*
 * Copyright (C) 2009 Archie L. Cobbs. All rights reserved.
 *
 * $Id$
 */

package org.dellroad.lzma.client;

import org.dellroad.lzma.client.SevenZip.Compression.LZMA.Encoder;

/**
 * Represents LZMA compression modes, from 1 (fastest compression) to 9 (best compression).
 */
public enum CompressionMode {

    MODE_1(1, 0, 16, 64,  Encoder.EMatchFinderTypeBT2, 3, 0, 2),
    MODE_2(2, 0, 20, 64,  Encoder.EMatchFinderTypeBT2, 3, 0, 2),
    MODE_3(3, 1, 19, 64,  Encoder.EMatchFinderTypeBT4, 3, 0, 2),
    MODE_4(4, 2, 20, 64,  Encoder.EMatchFinderTypeBT4, 3, 0, 2),
    MODE_5(5, 2, 21, 128, Encoder.EMatchFinderTypeBT4, 3, 0, 2),
    MODE_6(6, 2, 22, 128, Encoder.EMatchFinderTypeBT4, 3, 0, 2),
    MODE_7(7, 2, 23, 128, Encoder.EMatchFinderTypeBT4, 3, 0, 2),
    MODE_8(8, 2, 24, 255, Encoder.EMatchFinderTypeBT4, 3, 0, 2),
    MODE_9(9, 2, 25, 255, Encoder.EMatchFinderTypeBT4, 3, 0, 2);

    private final int level;
    private final int algorithm;
    private final int dictionarySize;
    private final int fb;
    private final int matchFinder;
    private final int lc;
    private final int lp;
    private final int pb;

    private CompressionMode(int level, int algorithm, int dictionarySize, int fb, int matchFinder, int lc, int lp, int pb) {
        this.level = level;
        this.algorithm = algorithm;
        this.dictionarySize = dictionarySize;
        this.fb = fb;
        this.matchFinder = matchFinder;
        this.lc = lc;
        this.lp = lp;
        this.pb = pb;
    }

    /**
     * Configure the given {@link Encoder} based on this compression mode.
     */
    public void configure(Encoder encoder) {
        if (!encoder.SetAlgorithm(this.algorithm))
            throw new RuntimeException("unexpected failure");
        if (!encoder.SetDictionarySize(1 << this.dictionarySize))
            throw new RuntimeException("unexpected failure");
        if (!encoder.SetNumFastBytes(this.fb))
            throw new RuntimeException("unexpected failure");
        if (!encoder.SetMatchFinder(this.matchFinder))
            throw new RuntimeException("unexpected failure");
        if (!encoder.SetLcLpPb(this.lc, this.lp, this.pb))
            throw new RuntimeException("unexpected failure");
    }

    /**
     * Return the integer level number corresponding to this instance.
     *
     * @return a value from 1 to 9
     * @see #get get()
     */
    public int getLevel() {
        return this.level;
    }

    /**
     * The the instance corresponding to the integer {@code level}.
     *
     * @param level value from 1 (fastest) to 9 (best)
     * @throws IllegalArgumentException if {@code mode} is invalid
     * @see #getLevel getLevel()
     */
    public static CompressionMode get(int level) {
        switch (level) {
        case 1:
            return MODE_1;
        case 2:
            return MODE_2;
        case 3:
            return MODE_3;
        case 4:
            return MODE_4;
        case 5:
            return MODE_5;
        case 6:
            return MODE_6;
        case 7:
            return MODE_7;
        case 8:
            return MODE_8;
        case 9:
            return MODE_9;
        default:
            throw new IllegalArgumentException("invalid level " + level);
        }
    }
}

