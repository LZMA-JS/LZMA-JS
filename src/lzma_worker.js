/// © 2015 Nathan Rugg <nmrugg@gmail.com> | MIT
/// See LICENSE for more details.

/* jshint boss:true, unused:true, undef:true, noarg: true, forin:true, -W041, -W021, worker:true, browser:true, node:true */

/* global setImmediate, setTimeout, window, onmessage */

///NOTE: This is the master file that is used to generate lzma-c.js and lzma-d.js.
///      Comments are used to determine which parts are to be removed.
///
/// cs-ce (compression start-end)
/// ds-de (decompression start-end)
/// xs-xe (only in this file start-end)
/// co    (compression only)
/// do    (decompression only)

var LZMA = (function () {
    var /** cs */
        action_compress   = 1,
        /** ce */
        /** ds */
        action_decompress = 2,
        /** de */
        action_progress   = 3,
        wait = typeof setImmediate == "function" ? setImmediate : setTimeout,
        c = function () {return {typeName: this.typeId$+""};},
        __4294967296 = 4294967296;
    
    function make_thing(typeId, proto)
    {
        function func() {}
        _ = func.prototype = proto || new Object_0();
        _.getClass$ = c;
        _.typeId$ = typeId;
        return func;
    }
    
    function update_progress(percent, callback_num) {
        postMessage({
            action: action_progress,
            callback_num: callback_num,
            result: percent
        });
    }
    
    var _,
        N8000000000000000_longLit = [0, -9223372036854775808],
        N1_longLit = [4294967295, -__4294967296],
        P0_longLit = [0, 0],
        P1_longLit = [1, 0],
        /** cs */
        P4_longLit = [4, 0],
        P1000_longLit = [4096, 0],
        Pffffff_longLit = [16777215, 0],
        Pff000000_longLit = [4278190080, 0],
        Pffffffff_longLit = [4294967295, 0],
        /** ce */
        P1000000_longLit = [16777216, 0],
        P7fffffffffffffff_longLit = [4294967295, 9223372032559808512];
    
    var Object_0 = make_thing(1, {});
    _.typeMarker$ = nullMethod;
    
    var Throwable = make_thing(3);
    
    var Exception = make_thing(4, new Throwable());
    
    /** cs */
    function $RuntimeException(this$static, message) {
        this$static.detailMessage = message;
        return this$static;
    }
    /** ce */
    
    var RuntimeException = make_thing(5, new Exception());
    
    /** ds */
    function $append(a, x) {
        a[a.explicitLength++] = x;
    }
    
    function $toString(a) {
        var s_0, s;
        s_0 = (s = a.join("") , a.length = a.explicitLength = 0 , s);
        a[a.explicitLength++] = s_0;
        return s_0;
    }
    /** de */
    
    function createFromSeed(seedType, length_0) {
        var array = new Array(length_0);
        if (seedType > 0) {
            var value = [null, 0, false, [0, 0]][seedType];
            if (typeof value !== "number") {
                for (var i = 0; i < length_0; ++i) {
                    array[i] = value;
                }
            }
        }
        return array;
    }
    
    function initDim(arrayClass, typeId, queryId, length_0, seedType) {
        var result = createFromSeed(seedType, length_0);
        $clinit_4();
        wrapArray(result, expandoNames_0, expandoValues_0);
        result.arrayClass$ = arrayClass;
        result.typeId$ = typeId;
        result.queryId$ = queryId;
        return result;
    }
    
    /** ds */
    function initValues(arrayClass, typeId, queryId, array) {
        $clinit_4();
        wrapArray(array, expandoNames_0, expandoValues_0);
        array.arrayClass$ = arrayClass;
        array.typeId$ = typeId;
        array.queryId$ = queryId;
        return array;
    }
    /** de */
    
    function setCheck(array, index, value) {
        if (value != null) {
            if (array.queryId$ > 0 && !canCastUnsafe(value.typeId$, array.queryId$)) {
            throw new ArrayStoreException();
            }
            if (array.queryId$ < 0 && (value.typeMarker$ == nullMethod || value.typeId$ == 2)) {
            throw new ArrayStoreException();
            }
        }
        return array[index] = value;
    }
    
    var Array_0 = make_thing(0);
    _.getClass$ = function () {
        return this.arrayClass$;
    };
    _.length = 0;
    _.queryId$ = 0;
    
    function $clinit_4() {
        $clinit_4 = nullMethod;
        expandoNames_0 = [];
        expandoValues_0 = [];
        initExpandos(new Array_0(), expandoNames_0, expandoValues_0);
    }
    
    function initExpandos(protoType, expandoNames, expandoValues) {
        var i = 0, value;
        for (var name_0 in protoType) {
            if (value = protoType[name_0]) {
            expandoNames[i] = name_0;
            expandoValues[i] = value;
            ++i;
            }
        }
    }
    
    function wrapArray(array, expandoNames, expandoValues) {
        $clinit_4();
        for (var i = 0, c = expandoNames.length; i < c; ++i) {
            array[expandoNames[i]] = expandoValues[i];
        }
    }
    
    var expandoNames_0, expandoValues_0;
    
    function canCastUnsafe(srcId, dstId) {
        return srcId && typeIdArray[srcId][dstId];
    }
    
    function dynamicCast(src, dstId) {
        if (src != null && !canCastUnsafe(src.typeId$, dstId)) {
            throw new ClassCastException();
        }
        return src;
    }
            
    var typeIdArray = [
            {},
            {},
            {1:1},
            {2:1},
            {2:1},
            {2:1},
            {2:1},
            {2:1, 10:1},
            {2:1},
            {2:1},
            {2:1},
            {2:1},
            {2:1},
            {2:1, 11:1},
            {2:1},
            {2:1},
            {2:1},
            {4:1},
            {5:1},
            {6:1},
            {7:1},
            {8:1},
            {9:1}
        ];
    
    function add(a, b) {
        var newHigh, newLow;
        newHigh = a[1] + b[1];
        newLow = a[0] + b[0];
        return create(newLow, newHigh);
    }
    
    /** cs */
    function and(a, b) {
        return makeFromBits(~~Math.max(Math.min(a[1] / __4294967296, 2147483647), -2147483648) & ~~Math.max(Math.min(b[1] / __4294967296, 2147483647), -2147483648), lowBits_0(a) & lowBits_0(b));
    }
    /** ce */
    
    function compare(a, b) {
        var nega, negb;
        if (a[0] == b[0] && a[1] == b[1]) {
            return 0;
        }
        nega = a[1] < 0;
        negb = b[1] < 0;
        if (nega && !negb) {
            return -1;
        }
        if (!nega && negb) {
            return 1;
        }
        if (sub(a, b)[1] < 0) {
            return -1;
        }
        else {
            return 1;
        }
    }
    
    function create(valueLow, valueHigh) {
        var diffHigh, diffLow;
        valueHigh %= 1.8446744073709552E19;
        valueLow %= 1.8446744073709552E19;
        diffHigh = valueHigh % __4294967296;
        diffLow = Math.floor(valueLow / __4294967296) * __4294967296;
        valueHigh = valueHigh - diffHigh + diffLow;
        valueLow = valueLow - diffLow + diffHigh;
        while (valueLow < 0) {
            valueLow += __4294967296;
            valueHigh -= __4294967296;
        }
        while (valueLow > 4294967295) {
            valueLow -= __4294967296;
            valueHigh += __4294967296;
        }
        valueHigh = valueHigh % 1.8446744073709552E19;
        while (valueHigh > 9223372032559808512) {
            valueHigh -= 1.8446744073709552E19;
        }
        while (valueHigh < -9223372036854775808) {
            valueHigh += 1.8446744073709552E19;
        }
        return [valueLow, valueHigh];
    }
    
    /** cs */
    function eq(a, b) {
        return a[0] == b[0] && a[1] == b[1];
    }
    /** ce */
    /** ds */
    function fromDouble(value) {
        if (isNaN(value)) {
            return $clinit_10() , ZERO;
        }
        if (value < -9223372036854775808) {
            return $clinit_10() , MIN_VALUE;
        }
        if (value >= 9223372036854775807) {
            return $clinit_10() , MAX_VALUE;
        }
        if (value > 0) {
            return create(Math.floor(value), 0);
        } else {
            return create(Math.ceil(value), 0);
        }
    }
    /** de */
    
    function fromInt(value) {
        var rebase, result;
        if (value > -129 && value < 128) {
            rebase = value + 128;
            result = ($clinit_9() , boxedValues)[rebase];
            if (result == null) {
                result = boxedValues[rebase] = internalFromInt(value);
            }
            return result;
        }
        return internalFromInt(value);
    }
    
    function internalFromInt(value) {
        if (value >= 0) {
            return [value, 0];
        } else {
            return [value + __4294967296, -__4294967296];
        }
    }
    
    function lowBits_0(a) {
        if (a[0] >= 2147483648) {
            return ~~Math.max(Math.min(a[0] - __4294967296, 2147483647), -2147483648);
        } else {
            return ~~Math.max(Math.min(a[0], 2147483647), -2147483648);
        }
    }
    /** cs */
    function makeFromBits(highBits, lowBits) {
        var high, low;
        high = highBits * __4294967296;
        low = lowBits;
        if (lowBits < 0) {
            low += __4294967296;
        }
        return [low, high];
    }
        
    function neg(a) {
        var newHigh, newLow;
        if (eq(a, ($clinit_10() , MIN_VALUE))) {
            return MIN_VALUE;
        }
        newHigh = -a[1];
        newLow = -a[0];
        if (newLow > 4294967295) {
            newLow -= __4294967296;
            newHigh += __4294967296;
        }
        if (newLow < 0) {
            newLow += __4294967296;
            newHigh -= __4294967296;
        }
        return [newLow, newHigh];
    }
    
    function pwrAsDouble(n) {
        if (n <= 30) {
            return 1 << n;
        } else {
            return pwrAsDouble(30) * pwrAsDouble(n - 30);
        }
    }
    
    function shl(a, n) {
        var diff, newHigh, newLow, twoToN;
        n &= 63;
        if (eq(a, ($clinit_10() , MIN_VALUE))) {
            if (n == 0) {
                return a;
            } else {
                return ZERO;
            }
        }
        if (a[1] < 0) {
            return neg(shl(neg(a), n));
        }
        twoToN = pwrAsDouble(n);
        newHigh = a[1] * twoToN % 1.8446744073709552E19;
        newLow = a[0] * twoToN;
        diff = newLow - newLow % __4294967296;
        newHigh += diff;
        newLow -= diff;
        if (newHigh >= 9223372036854775807) {
            newHigh -= 1.8446744073709552E19;
        }
        return [newLow, newHigh];
    }
    
    function shr(a, n) {
        var newHigh, newLow, shiftFact;
        n &= 63;
        shiftFact = pwrAsDouble(n);
        newHigh = a[1] / shiftFact;
        newLow = Math.floor(a[0] / shiftFact);
        return create(newLow, newHigh);
    }
    
    function shru(a, n) {
        var sr;
        n &= 63;
        sr = shr(a, n);
        if (a[1] < 0) {
            sr = add(sr, shl(($clinit_10() , TWO), 63 - n));
        }
        return sr;
    }
    /** ce */
    
    function sub(a, b) {
        var newHigh, newLow;
        newHigh = a[1] - b[1];
        newLow = a[0] - b[0];
        return create(newLow, newHigh);
    }
        
    function $clinit_9() {
        $clinit_9 = nullMethod;
        boxedValues = initDim(_3_3D_classLit, 0, 9, 256, 0);
    }
    
    var boxedValues;
    function $clinit_10() {
        $clinit_10 = nullMethod;
        LN_2 = Math.log(2);
        MAX_VALUE = P7fffffffffffffff_longLit;
        MIN_VALUE = N8000000000000000_longLit;
        NEG_ONE = fromInt(-1);
        ONE = fromInt(1);
        TWO = fromInt(2);
        TWO_PWR_24 = P1000000_longLit;
        ZERO = fromInt(0);
    }
    
    var LN_2, MAX_VALUE, MIN_VALUE, NEG_ONE, ONE, TWO, TWO_PWR_24, ZERO;
    
    var InputStream = make_thing(0);
    
    function $ByteArrayInputStream(this$static, buf) {
        $ByteArrayInputStream_0(this$static, buf, 0, buf.length);
        return this$static;
    }
    
    function $ByteArrayInputStream_0(this$static, buf, off, len) {
        this$static.buf = buf;
        this$static.pos = off;
        this$static.count = off + len;
        if (this$static.count > buf.length)
            this$static.count = buf.length;
        return this$static;
    }
    
    /** ds */
    function $read(this$static) {
        if (this$static.pos >= this$static.count)
            return -1;
        return this$static.buf[this$static.pos++] & 255;
    }
    /** de */
    /** cs */
    function $read_0(this$static, buf, off, len) {
        if (this$static.pos >= this$static.count)
            return -1;
        len = min(len, this$static.count - this$static.pos);
        arraycopy(this$static.buf, this$static.pos, buf, off, len);
        this$static.pos += len;
        return len;
    }
    /** ce */
    
    var ByteArrayInputStream = make_thing(0, new InputStream());
    _.count = 0;
    _.pos = 0;
    
    var OutputStream = make_thing(0);
    
    function $ByteArrayOutputStream(this$static) {
        this$static.buf = initDim(_3B_classLit, 0, -1, 32, 1);
        return this$static;
    }
    
    function $ensureCapacity(this$static, len) {
        var newbuf;
        if (len <= this$static.buf.length)
            return;
        len = max(len, this$static.buf.length * 2);
        newbuf = initDim(_3B_classLit, 0, -1, len, 1);
        arraycopy(this$static.buf, 0, newbuf, 0, this$static.buf.length);
        this$static.buf = newbuf;
    }
    
    function $toByteArray(this$static) {
        var data;
        data = initDim(_3B_classLit, 0, -1, this$static.count, 1);
        arraycopy(this$static.buf, 0, data, 0, this$static.count);
        return data;
    }
    
    /** cs */
    function $write(this$static, b) {
        $ensureCapacity(this$static, this$static.count + 1);
        this$static.buf[this$static.count++] = b << 24 >> 24;
    }
    /** ce */
    
    function $write_0(this$static, buf, off, len) {
        $ensureCapacity(this$static, this$static.count + len);
        arraycopy(buf, off, this$static.buf, this$static.count, len);
        this$static.count += len;
    }
    
    var ByteArrayOutputStream = make_thing(0, new OutputStream());
    _.count = 0;
    
    /** ds */
    function $IOException(this$static, message) {
        this$static.detailMessage = message;
        return this$static;
    }
    
    var IOException = make_thing(7);
    /** de */
    
    function $ArrayStoreException(this$static, message) {
        this$static.detailMessage = message;
        return this$static;
    }
    
    var ArrayStoreException = make_thing(9, new RuntimeException());
    
    function createForArray(packageName, className) {
        var clazz;
        clazz = new Class();
        clazz.typeName = packageName + className;
        return clazz;
    }
    
    var Class = make_thing(0);
    
    var ClassCastException = make_thing(12, new RuntimeException());
    
    /** cs */
    function $IllegalArgumentException(this$static, message) {
        this$static.detailMessage = message;
        return this$static;
    }
    
    var IllegalArgumentException = make_thing(13, new RuntimeException());
    /** ce */
    
    var IllegalStateException = make_thing(14, new RuntimeException());
    
    var IndexOutOfBoundsException = make_thing(15, new RuntimeException());
    
    function max(x, y) {
        return x > y?x:y;
    }
    /** cs */
    function min(x, y) {
        return x < y?x:y;
    }
    /** ce */
    
    var NullPointerException = make_thing(16, new RuntimeException());
    
    function $equals(this$static, other) {
        if (other == null) {
            return false;
        }
        return String(this$static) == other;
    }
    
    /** cs */
    function $getChars(this$static, srcBegin, srcEnd, dst, dstBegin) {
        var srcIdx;
        for (srcIdx = srcBegin; srcIdx < srcEnd; ++srcIdx) {
            dst[dstBegin++] = this$static.charCodeAt(srcIdx);
        }
    }
    /** ce */
    
    /** ds */
    function $StringBuilder(this$static) {
        var array;
        this$static.data = (array = [] , array.explicitLength = 0 , array);
        return this$static;
    }
    
    var StringBuilder = make_thing(0);
    /** de */
    
    function arraycopy(src, srcOfs, dest, destOfs, len) {
        var destArray, destEnd, destTypeName, destlen, i, srcArray, srcTypeName, srclen;
        
        if (src == null || dest == null) {
            throw new NullPointerException();
        }
        
        srcTypeName  = (src.typeMarker$  == nullMethod || src.typeId$  == 2 ? src.getClass$()  : c()).typeName;
        destTypeName = (dest.typeMarker$ == nullMethod || dest.typeId$ == 2 ? dest.getClass$() : c()).typeName;
        
        if (srcTypeName.charCodeAt(0) != 91 || destTypeName.charCodeAt(0) != 91) {
            throw $ArrayStoreException(new ArrayStoreException(), "Must be array types");
        }
        if (srcTypeName.charCodeAt(1) != destTypeName.charCodeAt(1)) {
            throw $ArrayStoreException(new ArrayStoreException(), "Array types must match");
        }
        
        srclen  = src.length;
        destlen = dest.length;
        if (srcOfs < 0 || destOfs < 0 || len < 0 || srcOfs + len > srclen || destOfs + len > destlen) {
            throw new IndexOutOfBoundsException();
        }
        if ((srcTypeName.charCodeAt(1) == 76 || srcTypeName.charCodeAt(1) == 91) && !$equals(srcTypeName, destTypeName)) {
            srcArray  = dynamicCast(src, 3);
            destArray = dynamicCast(dest, 3);
            if ((src == null ? null : src) === (dest == null ? null : dest) && srcOfs < destOfs) {
                srcOfs += len;
                for (destEnd = destOfs + len; destEnd-- > destOfs;) {
                    setCheck(destArray, destEnd, srcArray[--srcOfs]);
                }
            } else {
                for (destEnd = destOfs + len; destOfs < destEnd;) {
                    setCheck(destArray, destOfs++, srcArray[srcOfs++]);
                }
            }
        } else {
            for (i = 0; i < len; ++i) {
                dest[destOfs + i] = src[srcOfs + i];
            }
        }
    }
    
    /** cs */
    function $configure(this$static, encoder) {
        if (!$SetDictionarySize_0(encoder, 1 << this$static.dicSize) || !$SetNumFastBytes(encoder, this$static.fb) || !$SetMatchFinder(encoder, this$static.matchFinder) || !$SetLcLpPb_0(encoder, this$static.lc, this$static.lp, this$static.pb))
            throw $RuntimeException(new RuntimeException(), "unexpected failure");
    }
    /** ce */
    
    function $execute(this$static) {
        try {
            return $processChunk(this$static.chunker);
        } catch (err) {
            this$static.exception = err;
            return false;
        }
    }
    
    /** cs */
    function $init(this$static, input, output, length_0, mode) {
        var encoder, i;
        if (!mode)
            throw $IllegalArgumentException(new IllegalArgumentException(), "null mode");
        if (compare(length_0, N1_longLit) < 0)
            throw $IllegalArgumentException(new IllegalArgumentException(), "invalid length " + length_0);
        this$static.length_0 = length_0;
        encoder = $Encoder(new Encoder());
        $configure(mode, encoder);
        encoder._writeEndMark = true;
        $WriteCoderProperties(encoder, output);
        for (i = 0; i < 64; i += 8)
            $write(output, lowBits_0(shr(length_0, i)) & 255);
        this$static.chunker = (encoder._needReleaseMFStream = false , (encoder._inStream = input , encoder._finished = false , $Create_2(encoder) , encoder._rangeEncoder.Stream = output , $Init_4(encoder) , $FillDistancesPrices(encoder) , $FillAlignPrices(encoder) , encoder._lenEncoder._tableSize = encoder._numFastBytes + 1 - 2 , $UpdateTables(encoder._lenEncoder, 1 << encoder._posStateBits) , encoder._repMatchLenEncoder._tableSize = encoder._numFastBytes + 1 - 2 , $UpdateTables(encoder._repMatchLenEncoder, 1 << encoder._posStateBits) , encoder.nowPos64 = P0_longLit , undefined) , $Chunker_0(new Chunker(), encoder));
    }
    
    
    var LZMACompressor = make_thing(0);
    
    function $LZMAByteArrayCompressor(this$static, data, mode) {
        this$static.output = $ByteArrayOutputStream(new ByteArrayOutputStream());
        try {
            $init(this$static, $ByteArrayInputStream(new ByteArrayInputStream(), data), this$static.output, fromInt(data.length), mode);
        } catch (err) {
            throw err;
        }
        return this$static;
    }
    
    var LZMAByteArrayCompressor = make_thing(0, new LZMACompressor());
    /** ce */
    
    /** ds */
    function $init_0(this$static, input, output) {
        var decoder,
            hex_length = "",
            i,
            properties,
            r,
            tmp_length;
        
        properties = initDim(_3B_classLit, 0, -1, 5, 1);
        for (i = 0; i < properties.length; ++i) {
            r = $read(input);
            if (r == -1)
                throw $IOException(new IOException(), "truncated input");
            properties[i] = r << 24 >> 24;
        }
        
        decoder = $Decoder(new Decoder());
        if (!$SetDecoderProperties(decoder, properties)) {
            throw $IOException(new IOException(), "corrupted input");
        }
        for (i = 0; i < 64; i += 8) {
            r = $read(input);
            if (r == -1)
                throw $IOException(new IOException(), "truncated input");
            r = r.toString(16);
            if (r.length == 1) r = "0" + r;
            hex_length = r + "" + hex_length;
        }
        
        /// Was the length set in the header (if it was compressed from a stream, the length is all f"s).
        if (/^0+$|^f+$/i.test(hex_length)) {
            /// The length is unknown, so set to -1.
            this$static.length_0 = N1_longLit;
        } else {
            ///NOTE: If there is a problem with the decoder because of the length, you can always set the length to -1 (N1_longLit) which means unknown.
            tmp_length = parseInt(hex_length, 16);
            /// If the length is too long to handle, just set it to unknown.
            if (tmp_length > 4294967295) {
                this$static.length_0 = N1_longLit;
            } else {
                this$static.length_0 = fromDouble(tmp_length);
            }
        }
        
        this$static.chunker = $CodeInChunks(decoder, input, output, this$static.length_0);
    }
    
    var LZMADecompressor = make_thing(0);
    _.length_0 = P0_longLit;
    
    function $LZMAByteArrayDecompressor(this$static, data) {
        this$static.output = $ByteArrayOutputStream(new ByteArrayOutputStream());
        $init_0(this$static, $ByteArrayInputStream(new ByteArrayInputStream(), data), this$static.output);
        return this$static;
    }
    
    var LZMAByteArrayDecompressor = make_thing(0, new LZMADecompressor());
    /** de */
    /** cs */
    function $Create_4(this$static, keepSizeBefore, keepSizeAfter, keepSizeReserv) {
        var blockSize;
        this$static._keepSizeBefore = keepSizeBefore;
        this$static._keepSizeAfter = keepSizeAfter;
        blockSize = keepSizeBefore + keepSizeAfter + keepSizeReserv;
        if (this$static._bufferBase == null || this$static._blockSize != blockSize) {
            this$static._bufferBase = null;
            this$static._blockSize = blockSize;
            this$static._bufferBase = initDim(_3B_classLit, 0, -1, this$static._blockSize, 1);
        }
        this$static._pointerToLastSafePosition = this$static._blockSize - keepSizeAfter;
    }
    
    function $GetIndexByte(this$static, index) {
        return this$static._bufferBase[this$static._bufferOffset + this$static._pos + index];
    }
    
    function $GetMatchLen(this$static, index, distance, limit) {
        var i, pby;
        if (this$static._streamEndWasReached) {
            if (this$static._pos + index + limit > this$static._streamPos) {
                limit = this$static._streamPos - (this$static._pos + index);
            }
        }
        ++distance;
        pby = this$static._bufferOffset + this$static._pos + index;
        for (i = 0; i < limit && this$static._bufferBase[pby + i] == this$static._bufferBase[pby + i - distance]; ++i) {
        }
        return i;
    }
    
    function $GetNumAvailableBytes(this$static) {
        return this$static._streamPos - this$static._pos;
    }
    
    function $MoveBlock(this$static) {
        var i, numBytes, offset;
        offset = this$static._bufferOffset + this$static._pos - this$static._keepSizeBefore;
        if (offset > 0) {
            --offset;
        }
        numBytes = this$static._bufferOffset + this$static._streamPos - offset;
        for (i = 0; i < numBytes; ++i) {
            this$static._bufferBase[i] = this$static._bufferBase[offset + i];
        }
        this$static._bufferOffset -= offset;
    }
    
    function $MovePos_1(this$static) {
        var pointerToPostion;
        ++this$static._pos;
        if (this$static._pos > this$static._posLimit) {
            pointerToPostion = this$static._bufferOffset + this$static._pos;
            if (pointerToPostion > this$static._pointerToLastSafePosition) {
                $MoveBlock(this$static);
            }
            $ReadBlock(this$static);
        }
    }
    
    function $ReadBlock(this$static) {
        var numReadBytes, pointerToPostion, size;
        if (this$static._streamEndWasReached)
            return;
        while (true) {
            size = -this$static._bufferOffset + this$static._blockSize - this$static._streamPos;
            if (size == 0)
                return;
            numReadBytes = $read_0(this$static._stream, this$static._bufferBase, this$static._bufferOffset + this$static._streamPos, size);
            if (numReadBytes == -1) {
                this$static._posLimit = this$static._streamPos;
                pointerToPostion = this$static._bufferOffset + this$static._posLimit;
                if (pointerToPostion > this$static._pointerToLastSafePosition) {
                    this$static._posLimit = this$static._pointerToLastSafePosition - this$static._bufferOffset;
                }
                this$static._streamEndWasReached = true;
                return;
            }
            this$static._streamPos += numReadBytes;
            if (this$static._streamPos >= this$static._pos + this$static._keepSizeAfter) {
                this$static._posLimit = this$static._streamPos - this$static._keepSizeAfter;
            }
        }
    }
    
    function $ReduceOffsets(this$static, subValue) {
        this$static._bufferOffset += subValue;
        this$static._posLimit -= subValue;
        this$static._pos -= subValue;
        this$static._streamPos -= subValue;
    }
    
    var InWindow = make_thing(0);
    _._blockSize = 0;
    _._bufferOffset = 0;
    _._keepSizeAfter = 0;
    _._keepSizeBefore = 0;
    _._pointerToLastSafePosition = 0;
    _._pos = 0;
    _._posLimit = 0;
    _._streamPos = 0;
    
    function $clinit_60() {
        $clinit_60 = nullMethod;
        var i, j, r;
        CrcTable = initDim(_3I_classLit, 0, -1, 256, 1);
        for (i = 0; i < 256; ++i) {
            r = i;
            for (j = 0; j < 8; ++j)
            if ((r & 1) != 0) {
                r = r >>> 1 ^ -306674912;
            } else {
                r >>>= 1;
            }
            CrcTable[i] = r;
        }
    }
    
    function $Create_3(this$static, historySize, keepAddBufferBefore, matchMaxLen, keepAddBufferAfter) {
        var cyclicBufferSize, hs, windowReservSize;
        if (historySize > 1073741567) {
            return false;
        }

        this$static._cutValue = 16 + (matchMaxLen >> 1);
        windowReservSize = ~~((historySize + keepAddBufferBefore + matchMaxLen + keepAddBufferAfter) / 2) + 256;
        $Create_4(this$static, historySize + keepAddBufferBefore, matchMaxLen + keepAddBufferAfter, windowReservSize);
        this$static._matchMaxLen = matchMaxLen;
        cyclicBufferSize = historySize + 1;
        if (this$static._cyclicBufferSize != cyclicBufferSize) {
            this$static._son = initDim(_3I_classLit, 0, -1, (this$static._cyclicBufferSize = cyclicBufferSize) * 2, 1);
        }

        hs = 65536;
        if (this$static.HASH_ARRAY) {
            hs = historySize - 1;
            hs |= hs >> 1;
            hs |= hs >> 2;
            hs |= hs >> 4;
            hs |= hs >> 8;
            hs >>= 1;
            hs |= 65535;
            if (hs > 16777216)
            hs >>= 1;
            this$static._hashMask = hs;
            ++hs;
            hs += this$static.kFixHashSize;
        }

        if (hs != this$static._hashSizeSum) {
            this$static._hash = initDim(_3I_classLit, 0, -1, this$static._hashSizeSum = hs, 1);
        }
        return true;
    }
    
    function $GetMatches(this$static, distances) {
        var count, cur, curMatch, curMatch2, curMatch3, cyclicPos, delta, hash2Value, hash3Value, hashValue, len, len0, len1, lenLimit, matchMinPos, maxLen, offset, pby1, ptr0, ptr1, temp;
        if (this$static._pos + this$static._matchMaxLen <= this$static._streamPos) {
            lenLimit = this$static._matchMaxLen;
        } else {
            lenLimit = this$static._streamPos - this$static._pos;
            if (lenLimit < this$static.kMinMatchCheck) {
                $MovePos_0(this$static);
                return 0;
            }
        }
        offset = 0;
        matchMinPos = this$static._pos > this$static._cyclicBufferSize?this$static._pos - this$static._cyclicBufferSize:0;
        cur = this$static._bufferOffset + this$static._pos;
        maxLen = 1;
        hash2Value = 0;
        hash3Value = 0;
        if (this$static.HASH_ARRAY) {
            temp = CrcTable[this$static._bufferBase[cur] & 255] ^ this$static._bufferBase[cur + 1] & 255;
            hash2Value = temp & 1023;
            temp ^= (this$static._bufferBase[cur + 2] & 255) << 8;
            hash3Value = temp & 65535;
            hashValue = (temp ^ CrcTable[this$static._bufferBase[cur + 3] & 255] << 5) & this$static._hashMask;
        } else {
            hashValue = this$static._bufferBase[cur] & 255 ^ (this$static._bufferBase[cur + 1] & 255) << 8;
        }

        curMatch = this$static._hash[this$static.kFixHashSize + hashValue];
        if (this$static.HASH_ARRAY) {
            curMatch2 = this$static._hash[hash2Value];
            curMatch3 = this$static._hash[1024 + hash3Value];
            this$static._hash[hash2Value] = this$static._pos;
            this$static._hash[1024 + hash3Value] = this$static._pos;
            if (curMatch2 > matchMinPos) {
                if (this$static._bufferBase[this$static._bufferOffset + curMatch2] == this$static._bufferBase[cur]) {
                    distances[offset++] = maxLen = 2;
                    distances[offset++] = this$static._pos - curMatch2 - 1;
                }
            }
            if (curMatch3 > matchMinPos) {
                if (this$static._bufferBase[this$static._bufferOffset + curMatch3] == this$static._bufferBase[cur]) {
                    if (curMatch3 == curMatch2) {
                        offset -= 2;
                    }
                    distances[offset++] = maxLen = 3;
                    distances[offset++] = this$static._pos - curMatch3 - 1;
                    curMatch2 = curMatch3;
                }
            }
            if (offset != 0 && curMatch2 == curMatch) {
                offset -= 2;
                maxLen = 1;
            }
        }
        this$static._hash[this$static.kFixHashSize + hashValue] = this$static._pos;
        ptr0 = (this$static._cyclicBufferPos << 1) + 1;
        ptr1 = this$static._cyclicBufferPos << 1;
        len0 = len1 = this$static.kNumHashDirectBytes;
        if (this$static.kNumHashDirectBytes != 0) {
            if (curMatch > matchMinPos) {
                if (this$static._bufferBase[this$static._bufferOffset + curMatch + this$static.kNumHashDirectBytes] != this$static._bufferBase[cur + this$static.kNumHashDirectBytes]) {
                    distances[offset++] = maxLen = this$static.kNumHashDirectBytes;
                    distances[offset++] = this$static._pos - curMatch - 1;
                }
            }
        }
        count = this$static._cutValue;
        while (true) {
            if (curMatch <= matchMinPos || count-- == 0) {
                this$static._son[ptr0] = this$static._son[ptr1] = 0;
                break;
            }
            delta = this$static._pos - curMatch;
            cyclicPos = (delta <= this$static._cyclicBufferPos?this$static._cyclicBufferPos - delta:this$static._cyclicBufferPos - delta + this$static._cyclicBufferSize) << 1;
            pby1 = this$static._bufferOffset + curMatch;
            len = len0 < len1?len0:len1;
            if (this$static._bufferBase[pby1 + len] == this$static._bufferBase[cur + len]) {
                while (++len != lenLimit) {
                    if (this$static._bufferBase[pby1 + len] != this$static._bufferBase[cur + len]) {
                        break;
                    }
                }
                if (maxLen < len) {
                    distances[offset++] = maxLen = len;
                    distances[offset++] = delta - 1;
                    if (len == lenLimit) {
                    this$static._son[ptr1] = this$static._son[cyclicPos];
                    this$static._son[ptr0] = this$static._son[cyclicPos + 1];
                    break;
                    }
                }
            }
            if ((this$static._bufferBase[pby1 + len] & 255) < (this$static._bufferBase[cur + len] & 255)) {
                this$static._son[ptr1] = curMatch;
                ptr1 = cyclicPos + 1;
                curMatch = this$static._son[ptr1];
                len1 = len;
            } else {
                this$static._son[ptr0] = curMatch;
                ptr0 = cyclicPos;
                curMatch = this$static._son[ptr0];
                len0 = len;
            }
        }
        $MovePos_0(this$static);
        return offset;
    }
    
    function $Init_5(this$static) {
        this$static._bufferOffset = 0;
        this$static._pos = 0;
        this$static._streamPos = 0;
        this$static._streamEndWasReached = false;
        $ReadBlock(this$static);
        this$static._cyclicBufferPos = 0;
        $ReduceOffsets(this$static, -1);
    }
    
    function $MovePos_0(this$static) {
        var subValue;
        if (++this$static._cyclicBufferPos >= this$static._cyclicBufferSize) {
            this$static._cyclicBufferPos = 0;
        }
        $MovePos_1(this$static);
        if (this$static._pos == 1073741823) {
            subValue = this$static._pos - this$static._cyclicBufferSize;
            $NormalizeLinks(this$static._son, this$static._cyclicBufferSize * 2, subValue);
            $NormalizeLinks(this$static._hash, this$static._hashSizeSum, subValue);
            $ReduceOffsets(this$static, subValue);
        }
    }
    
    function $NormalizeLinks(items, numItems, subValue) {
        var i, value;
        for (i = 0; i < numItems; ++i) {
            value = items[i];
            if (value <= subValue) {
                value = 0;
            } else {
                value -= subValue;
            }
            items[i] = value;
        }
    }
    
    function $SetType(this$static, numHashBytes) {
        this$static.HASH_ARRAY = numHashBytes > 2;
        if (this$static.HASH_ARRAY) {
            this$static.kNumHashDirectBytes = 0;
            this$static.kMinMatchCheck = 4;
            this$static.kFixHashSize = 66560;
        } else {
            this$static.kNumHashDirectBytes = 2;
            this$static.kMinMatchCheck = 3;
            this$static.kFixHashSize = 0;
        }
    }
    
    function $Skip(this$static, num) {
        var count, cur, curMatch, cyclicPos, delta, hash2Value, hash3Value, hashValue, len, len0, len1, lenLimit, matchMinPos, pby1, ptr0, ptr1, temp;
        do {
            if (this$static._pos + this$static._matchMaxLen <= this$static._streamPos) {
                lenLimit = this$static._matchMaxLen;
            } else {
                lenLimit = this$static._streamPos - this$static._pos;
                if (lenLimit < this$static.kMinMatchCheck) {
                    $MovePos_0(this$static);
                    continue;
                }
            }
            matchMinPos = this$static._pos > this$static._cyclicBufferSize?this$static._pos - this$static._cyclicBufferSize:0;
            cur = this$static._bufferOffset + this$static._pos;
            if (this$static.HASH_ARRAY) {
                temp = CrcTable[this$static._bufferBase[cur] & 255] ^ this$static._bufferBase[cur + 1] & 255;
                hash2Value = temp & 1023;
                this$static._hash[hash2Value] = this$static._pos;
                temp ^= (this$static._bufferBase[cur + 2] & 255) << 8;
                hash3Value = temp & 65535;
                this$static._hash[1024 + hash3Value] = this$static._pos;
                hashValue = (temp ^ CrcTable[this$static._bufferBase[cur + 3] & 255] << 5) & this$static._hashMask;
            } else {
                hashValue = this$static._bufferBase[cur] & 255 ^ (this$static._bufferBase[cur + 1] & 255) << 8;
            }
            curMatch = this$static._hash[this$static.kFixHashSize + hashValue];
            this$static._hash[this$static.kFixHashSize + hashValue] = this$static._pos;
            ptr0 = (this$static._cyclicBufferPos << 1) + 1;
            ptr1 = this$static._cyclicBufferPos << 1;
            len0 = len1 = this$static.kNumHashDirectBytes;
            count = this$static._cutValue;
            while (true) {
                if (curMatch <= matchMinPos || count-- == 0) {
                    this$static._son[ptr0] = this$static._son[ptr1] = 0;
                    break;
                }
                delta = this$static._pos - curMatch;
                cyclicPos = (delta <= this$static._cyclicBufferPos?this$static._cyclicBufferPos - delta:this$static._cyclicBufferPos - delta + this$static._cyclicBufferSize) << 1;
                pby1 = this$static._bufferOffset + curMatch;
                len = len0 < len1?len0:len1;
                if (this$static._bufferBase[pby1 + len] == this$static._bufferBase[cur + len]) {
                    while (++len != lenLimit) {
                        if (this$static._bufferBase[pby1 + len] != this$static._bufferBase[cur + len]) {
                            break;
                        }
                    }
                    if (len == lenLimit) {
                        this$static._son[ptr1] = this$static._son[cyclicPos];
                        this$static._son[ptr0] = this$static._son[cyclicPos + 1];
                        break;
                    }
                }
                if ((this$static._bufferBase[pby1 + len] & 255) < (this$static._bufferBase[cur + len] & 255)) {
                    this$static._son[ptr1] = curMatch;
                    ptr1 = cyclicPos + 1;
                    curMatch = this$static._son[ptr1];
                    len1 = len;
                } else {
                    this$static._son[ptr0] = curMatch;
                    ptr0 = cyclicPos;
                    curMatch = this$static._son[ptr0];
                    len0 = len;
                }
            }
            $MovePos_0(this$static);
        }
        while (--num != 0);
    }
    
    var BinTree = make_thing(0, new InWindow());
    _.HASH_ARRAY = true;
    _._cutValue = 255;
    _._cyclicBufferPos = 0;
    _._cyclicBufferSize = 0;
    _._hashSizeSum = 0;
    _.kFixHashSize = 66560;
    _.kMinMatchCheck = 4;
    _.kNumHashDirectBytes = 0;
    
    var CrcTable;
    
    /** ce */
    /** ds */
    function $CopyBlock(this$static, distance, len) {
        var pos;
        pos = this$static._pos - distance - 1;
        if (pos < 0) {
            pos += this$static._windowSize;
        }
        for (; len != 0; --len) {
            if (pos >= this$static._windowSize) {
                pos = 0;
            }
            this$static._buffer[this$static._pos++] = this$static._buffer[pos++];
            if (this$static._pos >= this$static._windowSize) {
                $Flush_0(this$static);
            }
        }
    }
    
    function $Create_5(this$static, windowSize) {
        if (this$static._buffer == null || this$static._windowSize != windowSize) {
            this$static._buffer = initDim(_3B_classLit, 0, -1, windowSize, 1);
        }
        this$static._windowSize = windowSize;
        this$static._pos = 0;
        this$static._streamPos = 0;
    }
    
    function $Flush_0(this$static) {
        var size;
        size = this$static._pos - this$static._streamPos;
        if (size == 0) {
            return;
        }
        $write_0(this$static._stream, this$static._buffer, this$static._streamPos, size);
        if (this$static._pos >= this$static._windowSize) {
            this$static._pos = 0;
        }
        this$static._streamPos = this$static._pos;
    }
    
    function $GetByte(this$static, distance) {
        var pos;
        pos = this$static._pos - distance - 1;
        if (pos < 0) {
            pos += this$static._windowSize;
        }
        return this$static._buffer[pos];
    }
    
    function $Init_7(this$static, solid) {
        if (!solid) {
            this$static._streamPos = 0;
            this$static._pos = 0;
        }
    }
    
    function $PutByte(this$static, b) {
        this$static._buffer[this$static._pos++] = b;
        if (this$static._pos >= this$static._windowSize) {
            $Flush_0(this$static);
        }
    }
    
    function $ReleaseStream(this$static) {
        $Flush_0(this$static);
        this$static._stream = null;
    }
    
    function $SetStream_0(this$static, stream) {
        $Flush_0(this$static);
        this$static._stream = null;
        this$static._stream = stream;
    }
    
    
    var OutWindow = make_thing(0);
    _._pos = 0;
    _._streamPos = 0;
    _._windowSize = 0;
    /** de */
    
    function GetLenToPosState(len) {
        len -= 2;
        if (len < 4) {
            return len;
        }
        return 3;
    }
    
    function StateUpdateChar(index) {
        if (index < 4) {
            return 0;
        }
        if (index < 10) {
            return index - 3;
        }
        return index - 6;
    }
    
    /** cs */
    function $Chunker_0(this$static, encoder) {
        this$static.encoder = encoder;
        this$static.decoder = null;
        this$static.alive = true;
        return this$static;
    }
    /** ce */
    /** ds */
    function $Chunker(this$static, decoder) {
        this$static.decoder = decoder;
        this$static.encoder = null;
        this$static.alive = true;
        return this$static;
    }
    /** de */
    
    function $processChunk(this$static) {
        var exception;
        if (!this$static.alive) {
            throw new IllegalStateException();
        }
        exception = true;
        try {
            if (this$static.encoder) {
                /// do:throw new Error("No encoding");
                /** cs */
                $processEncoderChunk(this$static);
                /** ce */
            } else {
                /// co:throw new Error("No decoding");
                /** ds */
                $processDecoderChunk(this$static);
                /** de */
            }
            exception = false;
            return this$static.alive;
        } finally {
            if (exception) {
                this$static.alive = false;
            }
        }
    }
    
    /** ds */
    function $processDecoderChunk(this$static) {
        var result;
        result = $CodeOneChunk(this$static.decoder);
        if (result == -1) {
            throw $IOException(new IOException(), "corrupted input");
        }
        this$static.inBytesProcessed = N1_longLit;
        this$static.outBytesProcessed = this$static.decoder.nowPos64;
        if (result == 1 || compare(this$static.decoder.outSize, P0_longLit) >= 0 && compare(this$static.decoder.nowPos64, this$static.decoder.outSize) >= 0) {
            $CodeFinish(this$static.decoder);
            this$static.alive = false;
        }
    }
    /** de */
    /** cs */
    function $processEncoderChunk(this$static) {
        $CodeOneBlock(this$static.encoder, this$static.encoder.processedInSize, this$static.encoder.processedOutSize, this$static.encoder.finished);
        this$static.inBytesProcessed = this$static.encoder.processedInSize[0];
        if (this$static.encoder.finished[0]) {
            $ReleaseStreams(this$static.encoder);
            this$static.alive = false;
        }
    }
    /** ce */
    
    var Chunker = make_thing(0);
    
    /** ds */
    function $CodeFinish(this$static) {
        $Flush_0(this$static.m_OutWindow);
        $ReleaseStream(this$static.m_OutWindow);
        this$static.m_RangeDecoder.Stream = null;
    }
    
    
    function $CodeInChunks(this$static, inStream, outStream, outSize) {
        this$static.m_RangeDecoder.Stream = inStream;
        $SetStream_0(this$static.m_OutWindow, outStream);
        $Init_1(this$static);
        this$static.state = 0;
        this$static.rep0 = 0;
        this$static.rep1 = 0;
        this$static.rep2 = 0;
        this$static.rep3 = 0;
        this$static.outSize = outSize;
        this$static.nowPos64 = P0_longLit;
        this$static.prevByte = 0;
        return $Chunker(new Chunker(), this$static);
    }
    
    function $CodeOneChunk(this$static) {
        var decoder2, distance, len, numDirectBits, posSlot, posState;
        posState = lowBits_0(this$static.nowPos64) & this$static.m_PosStateMask;
        if ($DecodeBit(this$static.m_RangeDecoder, this$static.m_IsMatchDecoders, (this$static.state << 4) + posState) == 0) {
            decoder2 = $GetDecoder(this$static.m_LiteralDecoder, lowBits_0(this$static.nowPos64), this$static.prevByte);
            if (this$static.state < 7) {
            this$static.prevByte = $DecodeNormal(decoder2, this$static.m_RangeDecoder);
            }
            else {
            this$static.prevByte = $DecodeWithMatchByte(decoder2, this$static.m_RangeDecoder, $GetByte(this$static.m_OutWindow, this$static.rep0));
            }
            $PutByte(this$static.m_OutWindow, this$static.prevByte);
            this$static.state = StateUpdateChar(this$static.state);
            this$static.nowPos64 = add(this$static.nowPos64, P1_longLit);
        } else {
            if ($DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRepDecoders, this$static.state) == 1) {
                len = 0;
                if ($DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRepG0Decoders, this$static.state) == 0) {
                    if ($DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRep0LongDecoders, (this$static.state << 4) + posState) == 0) {
                        this$static.state = this$static.state < 7?9:11;
                        len = 1;
                    }
                } else {
                    if ($DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRepG1Decoders, this$static.state) == 0) {
                        distance = this$static.rep1;
                    } else {
                        if ($DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRepG2Decoders, this$static.state) == 0) {
                            distance = this$static.rep2;
                        } else {
                            distance = this$static.rep3;
                            this$static.rep3 = this$static.rep2;
                        }
                        this$static.rep2 = this$static.rep1;
                    }
                    this$static.rep1 = this$static.rep0;
                    this$static.rep0 = distance;
                }
                if (len == 0) {
                    len = $Decode(this$static.m_RepLenDecoder, this$static.m_RangeDecoder, posState) + 2;
                    this$static.state = this$static.state < 7?8:11;
                }
            } else {
                this$static.rep3 = this$static.rep2;
                this$static.rep2 = this$static.rep1;
                this$static.rep1 = this$static.rep0;
                len = 2 + $Decode(this$static.m_LenDecoder, this$static.m_RangeDecoder, posState);
                this$static.state = this$static.state < 7?7:10;
                posSlot = $Decode_0(this$static.m_PosSlotDecoder[GetLenToPosState(len)], this$static.m_RangeDecoder);
                if (posSlot >= 4) {
                    numDirectBits = (posSlot >> 1) - 1;
                    this$static.rep0 = (2 | posSlot & 1) << numDirectBits;
                    if (posSlot < 14) {
                        this$static.rep0 += ReverseDecode(this$static.m_PosDecoders, this$static.rep0 - posSlot - 1, this$static.m_RangeDecoder, numDirectBits);
                    } else {
                        this$static.rep0 += $DecodeDirectBits(this$static.m_RangeDecoder, numDirectBits - 4) << 4;
                        this$static.rep0 += $ReverseDecode(this$static.m_PosAlignDecoder, this$static.m_RangeDecoder);
                        if (this$static.rep0 < 0) {
                            if (this$static.rep0 == -1) {
                                return 1;
                            }
                            return -1;
                        }
                    }
                } else 
                    this$static.rep0 = posSlot;
            }
            if (compare(fromInt(this$static.rep0), this$static.nowPos64) >= 0 || this$static.rep0 >= this$static.m_DictionarySizeCheck) {
                return -1;
            }
            $CopyBlock(this$static.m_OutWindow, this$static.rep0, len);
            this$static.nowPos64 = add(this$static.nowPos64, fromInt(len));
            this$static.prevByte = $GetByte(this$static.m_OutWindow, 0);
        }
        return 0;
    }
    
    function $Decoder(this$static) {
        var i;
        this$static.m_OutWindow = new OutWindow();
        this$static.m_RangeDecoder = new Decoder_0();
        this$static.m_IsMatchDecoders = initDim(_3S_classLit, 0, -1, 192, 1);
        this$static.m_IsRepDecoders = initDim(_3S_classLit, 0, -1, 12, 1);
        this$static.m_IsRepG0Decoders = initDim(_3S_classLit, 0, -1, 12, 1);
        this$static.m_IsRepG1Decoders = initDim(_3S_classLit, 0, -1, 12, 1);
        this$static.m_IsRepG2Decoders = initDim(_3S_classLit, 0, -1, 12, 1);
        this$static.m_IsRep0LongDecoders = initDim(_3S_classLit, 0, -1, 192, 1);
        this$static.m_PosSlotDecoder = initDim(bitTreeDecoder_2_classLit, 0, 7, 4, 0);
        this$static.m_PosDecoders = initDim(_3S_classLit, 0, -1, 114, 1);
        this$static.m_PosAlignDecoder = $BitTreeDecoder(new BitTreeDecoder(), 4);
        this$static.m_LenDecoder = $Decoder$LenDecoder(new Decoder$LenDecoder());
        this$static.m_RepLenDecoder = $Decoder$LenDecoder(new Decoder$LenDecoder());
        this$static.m_LiteralDecoder = new Decoder$LiteralDecoder();
        for (i = 0; i < 4; ++i) {
            this$static.m_PosSlotDecoder[i] = $BitTreeDecoder(new BitTreeDecoder(), 6);
        }
        return this$static;
    }
    
    function $Init_1(this$static) {
        var i;
        $Init_7(this$static.m_OutWindow, false);
        InitBitModels(this$static.m_IsMatchDecoders);
        InitBitModels(this$static.m_IsRep0LongDecoders);
        InitBitModels(this$static.m_IsRepDecoders);
        InitBitModels(this$static.m_IsRepG0Decoders);
        InitBitModels(this$static.m_IsRepG1Decoders);
        InitBitModels(this$static.m_IsRepG2Decoders);
        InitBitModels(this$static.m_PosDecoders);
        $Init_0(this$static.m_LiteralDecoder);
        for (i = 0; i < 4; ++i) {
            InitBitModels(this$static.m_PosSlotDecoder[i].Models);
        }
        $Init(this$static.m_LenDecoder);
        $Init(this$static.m_RepLenDecoder);
        InitBitModels(this$static.m_PosAlignDecoder.Models);
        $Init_8(this$static.m_RangeDecoder);
    }
    
    function $SetDecoderProperties(this$static, properties) {
        var dictionarySize, i, lc, lp, pb, remainder, val;
        if (properties.length < 5)
            return false;
        val = properties[0] & 255;
        lc = val % 9;
        remainder = ~~(val / 9);
        lp = remainder % 5;
        pb = ~~(remainder / 5);
        dictionarySize = 0;
        for (i = 0; i < 4; ++i) {
            dictionarySize += (properties[1 + i] & 255) << i * 8;
        }
        ///NOTE: If the input is bad, it might call for an insanely large dictionary size, which would crash the script.
        if (dictionarySize > 99999999 || !$SetLcLpPb(this$static, lc, lp, pb)) {
            return false;
        }
        return $SetDictionarySize(this$static, dictionarySize);
    }
    
    function $SetDictionarySize(this$static, dictionarySize) {
        if (dictionarySize < 0) {
            return false;
        }
        if (this$static.m_DictionarySize != dictionarySize) {
            this$static.m_DictionarySize = dictionarySize;
            this$static.m_DictionarySizeCheck = max(this$static.m_DictionarySize, 1);
            $Create_5(this$static.m_OutWindow, max(this$static.m_DictionarySizeCheck, 4096));
        }
        return true;
    }
    
    function $SetLcLpPb(this$static, lc, lp, pb) {
        var numPosStates;
        if (lc > 8 || lp > 4 || pb > 4) {
            return false;
        }
        $Create_0(this$static.m_LiteralDecoder, lp, lc);
        numPosStates = 1 << pb;
        $Create(this$static.m_LenDecoder, numPosStates);
        $Create(this$static.m_RepLenDecoder, numPosStates);
        this$static.m_PosStateMask = numPosStates - 1;
        return true;
    }
    
    var Decoder = make_thing(0);
    _.m_DictionarySize = -1;
    _.m_DictionarySizeCheck = -1;
    _.m_PosStateMask = 0;
    _.nowPos64 = P0_longLit;
    _.outSize = P0_longLit;
    _.prevByte = 0;
    _.rep0 = 0;
    _.rep1 = 0;
    _.rep2 = 0;
    _.rep3 = 0;
    _.state = 0;
    
    function $Create(this$static, numPosStates) {
        for (; this$static.m_NumPosStates < numPosStates; ++this$static.m_NumPosStates) {
            this$static.m_LowCoder[this$static.m_NumPosStates] = $BitTreeDecoder(new BitTreeDecoder(), 3);
            this$static.m_MidCoder[this$static.m_NumPosStates] = $BitTreeDecoder(new BitTreeDecoder(), 3);
        }
    }
    
    function $Decode(this$static, rangeDecoder, posState) {
        var symbol;
        if ($DecodeBit(rangeDecoder, this$static.m_Choice, 0) == 0) {
            return $Decode_0(this$static.m_LowCoder[posState], rangeDecoder);
        }
        symbol = 8;
        if ($DecodeBit(rangeDecoder, this$static.m_Choice, 1) == 0) {
            symbol += $Decode_0(this$static.m_MidCoder[posState], rangeDecoder);
        } else {
            symbol += 8 + $Decode_0(this$static.m_HighCoder, rangeDecoder);
        }
        return symbol;
    }
    
    function $Decoder$LenDecoder(this$static) {
        this$static.m_Choice = initDim(_3S_classLit, 0, -1, 2, 1);
        this$static.m_LowCoder = initDim(bitTreeDecoder_2_classLit, 0, 7, 16, 0);
        this$static.m_MidCoder = initDim(bitTreeDecoder_2_classLit, 0, 7, 16, 0);
        this$static.m_HighCoder = $BitTreeDecoder(new BitTreeDecoder(), 8);
        return this$static;
    }
    
    function $Init(this$static) {
        var posState;
        InitBitModels(this$static.m_Choice);
        for (posState = 0; posState < this$static.m_NumPosStates; ++posState) {
            InitBitModels(this$static.m_LowCoder[posState].Models);
            InitBitModels(this$static.m_MidCoder[posState].Models);
        }
        InitBitModels(this$static.m_HighCoder.Models);
    }
    
    
    var Decoder$LenDecoder = make_thing(0);
    _.m_NumPosStates = 0;
    
    function $Create_0(this$static, numPosBits, numPrevBits) {
        var i, numStates;
        if (this$static.m_Coders != null && this$static.m_NumPrevBits == numPrevBits && this$static.m_NumPosBits == numPosBits)
            return;
        this$static.m_NumPosBits = numPosBits;
        this$static.m_PosMask = (1 << numPosBits) - 1;
        this$static.m_NumPrevBits = numPrevBits;
        numStates = 1 << this$static.m_NumPrevBits + this$static.m_NumPosBits;
        this$static.m_Coders = initDim(decoder2_2_classLit, 0, 4, numStates, 0);
        for (i = 0; i < numStates; ++i)
            this$static.m_Coders[i] = $Decoder$LiteralDecoder$Decoder2(new Decoder$LiteralDecoder$Decoder2());
    }
    
    function $GetDecoder(this$static, pos, prevByte) {
        return this$static.m_Coders[((pos & this$static.m_PosMask) << this$static.m_NumPrevBits) + ((prevByte & 255) >>> 8 - this$static.m_NumPrevBits)];
    }
    
    function $Init_0(this$static) {
        var i, numStates;
        numStates = 1 << this$static.m_NumPrevBits + this$static.m_NumPosBits;
        for (i = 0; i < numStates; ++i) {
            InitBitModels(this$static.m_Coders[i].m_Decoders);
        }
    }
    
    
    var Decoder$LiteralDecoder = make_thing(0);
    _.m_NumPosBits = 0;
    _.m_NumPrevBits = 0;
    _.m_PosMask = 0;
    
    function $DecodeNormal(this$static, rangeDecoder) {
        var symbol;
        symbol = 1;
        do {
            symbol = symbol << 1 | $DecodeBit(rangeDecoder, this$static.m_Decoders, symbol);
        } while (symbol < 256);
        return symbol << 24 >> 24;
    }
    
    function $DecodeWithMatchByte(this$static, rangeDecoder, matchByte) {
        var bit, matchBit, symbol;
        symbol = 1;
        do {
            matchBit = matchByte >> 7 & 1;
            matchByte <<= 1;
            bit = $DecodeBit(rangeDecoder, this$static.m_Decoders, (1 + matchBit << 8) + symbol);
            symbol = symbol << 1 | bit;
            if (matchBit != bit) {
                while (symbol < 256) {
                    symbol = symbol << 1 | $DecodeBit(rangeDecoder, this$static.m_Decoders, symbol);
                }
            break;
            }
        } while (symbol < 256);
        return symbol << 24 >> 24;
    }
    
    function $Decoder$LiteralDecoder$Decoder2(this$static) {
        this$static.m_Decoders = initDim(_3S_classLit, 0, -1, 768, 1);
        return this$static;
    }
    
    var Decoder$LiteralDecoder$Decoder2 = make_thing(17);
    
    /** de */
    /** cs */
    function $clinit_59() {
        $clinit_59 = nullMethod;
        var c, j, k, slotFast;
        g_FastPos = initDim(_3B_classLit, 0, -1, 2048, 1);
        c = 2;
        g_FastPos[0] = 0;
        g_FastPos[1] = 1;
        for (slotFast = 2; slotFast < 22; ++slotFast) {
            k = 1 << (slotFast >> 1) - 1;
            for (j = 0; j < k; ++j , ++c)
            g_FastPos[c] = slotFast << 24 >> 24;
        }
    }
    
    function $Backward(this$static, cur) {
        var backCur, backMem, posMem, posPrev;
        this$static._optimumEndIndex = cur;
        posMem = this$static._optimum[cur].PosPrev;
        backMem = this$static._optimum[cur].BackPrev;
        do {
            if (this$static._optimum[cur].Prev1IsChar) {
                $MakeAsChar(this$static._optimum[posMem]);
                this$static._optimum[posMem].PosPrev = posMem - 1;
                if (this$static._optimum[cur].Prev2) {
                    this$static._optimum[posMem - 1].Prev1IsChar = 0;
                    this$static._optimum[posMem - 1].PosPrev = this$static._optimum[cur].PosPrev2;
                    this$static._optimum[posMem - 1].BackPrev = this$static._optimum[cur].BackPrev2;
                }
            }
            posPrev = posMem;
            backCur = backMem;
            backMem = this$static._optimum[posPrev].BackPrev;
            posMem = this$static._optimum[posPrev].PosPrev;
            this$static._optimum[posPrev].BackPrev = backCur;
            this$static._optimum[posPrev].PosPrev = cur;
            cur = posPrev;
        } while (cur > 0);
        this$static.backRes = this$static._optimum[0].BackPrev;
        this$static._optimumCurrentIndex = this$static._optimum[0].PosPrev;
        return this$static._optimumCurrentIndex;
    }
    
    function $BaseInit(this$static) {
        var i;
        this$static._state = 0;
        this$static._previousByte = 0;
        for (i = 0; i < 4; ++i) {
            this$static._repDistances[i] = 0;
        }
    }
    
    function $CodeOneBlock(this$static, inSize, outSize, finished) {
        var baseVal, complexState, curByte, distance, footerBits, i, len, lenToPosState, matchByte, pos, posReduced, posSlot, posState, progressPosValuePrev, subCoder;
        inSize[0] = P0_longLit;
        outSize[0] = P0_longLit;
        finished[0] = true;
        if (this$static._inStream) {
            this$static._matchFinder._stream = this$static._inStream;
            $Init_5(this$static._matchFinder);
            this$static._needReleaseMFStream = true;
            this$static._inStream = null;
        }
        if (this$static._finished) {
            return;
        }
        this$static._finished = true;
        progressPosValuePrev = this$static.nowPos64;
        if (eq(this$static.nowPos64, P0_longLit)) {
            if ($GetNumAvailableBytes(this$static._matchFinder) == 0) {
                $Flush(this$static, lowBits_0(this$static.nowPos64));
                return;
            }
            $ReadMatchDistances(this$static);
            posState = lowBits_0(this$static.nowPos64) & this$static._posStateMask;
            $Encode_3(this$static._rangeEncoder, this$static._isMatch, (this$static._state << 4) + posState, 0);
            this$static._state = StateUpdateChar(this$static._state);
            curByte = $GetIndexByte(this$static._matchFinder, -this$static._additionalOffset);
            $Encode_1($GetSubCoder(this$static._literalEncoder, lowBits_0(this$static.nowPos64), this$static._previousByte), this$static._rangeEncoder, curByte);
            this$static._previousByte = curByte;
            --this$static._additionalOffset;
            this$static.nowPos64 = add(this$static.nowPos64, P1_longLit);
        }
        if ($GetNumAvailableBytes(this$static._matchFinder) == 0) {
            $Flush(this$static, lowBits_0(this$static.nowPos64));
            return;
        }
        while (true) {
            len = $GetOptimum(this$static, lowBits_0(this$static.nowPos64));
            pos = this$static.backRes;
            posState = lowBits_0(this$static.nowPos64) & this$static._posStateMask;
            complexState = (this$static._state << 4) + posState;
            if (len == 1 && pos == -1) {
                $Encode_3(this$static._rangeEncoder, this$static._isMatch, complexState, 0);
                curByte = $GetIndexByte(this$static._matchFinder, -this$static._additionalOffset);
                subCoder = $GetSubCoder(this$static._literalEncoder, lowBits_0(this$static.nowPos64), this$static._previousByte);
                if (this$static._state < 7) {
                    $Encode_1(subCoder, this$static._rangeEncoder, curByte);
                } else {
                    matchByte = $GetIndexByte(this$static._matchFinder, -this$static._repDistances[0] - 1 - this$static._additionalOffset);
                    $EncodeMatched(subCoder, this$static._rangeEncoder, matchByte, curByte);
                }
                this$static._previousByte = curByte;
                this$static._state = StateUpdateChar(this$static._state);
            } else {
                $Encode_3(this$static._rangeEncoder, this$static._isMatch, complexState, 1);
                if (pos < 4) {
                    $Encode_3(this$static._rangeEncoder, this$static._isRep, this$static._state, 1);
                    if (pos == 0) {
                        $Encode_3(this$static._rangeEncoder, this$static._isRepG0, this$static._state, 0);
                        if (len == 1) {
                            $Encode_3(this$static._rangeEncoder, this$static._isRep0Long, complexState, 0);
                        } else {
                            $Encode_3(this$static._rangeEncoder, this$static._isRep0Long, complexState, 1);
                        }
                    } else {
                        $Encode_3(this$static._rangeEncoder, this$static._isRepG0, this$static._state, 1);
                        if (pos == 1) {
                            $Encode_3(this$static._rangeEncoder, this$static._isRepG1, this$static._state, 0);
                        } else {
                            $Encode_3(this$static._rangeEncoder, this$static._isRepG1, this$static._state, 1);
                            $Encode_3(this$static._rangeEncoder, this$static._isRepG2, this$static._state, pos - 2);
                        }
                    }
                    if (len == 1) {
                        this$static._state = this$static._state < 7?9:11;
                    } else {
                        $Encode_0(this$static._repMatchLenEncoder, this$static._rangeEncoder, len - 2, posState);
                        this$static._state = this$static._state < 7?8:11;
                    }
                    distance = this$static._repDistances[pos];
                    if (pos != 0) {
                        for (i = pos; i >= 1; --i) {
                            this$static._repDistances[i] = this$static._repDistances[i - 1];
                        }
                        this$static._repDistances[0] = distance;
                    }
                } else {
                    $Encode_3(this$static._rangeEncoder, this$static._isRep, this$static._state, 0);
                    this$static._state = this$static._state < 7?7:10;
                    $Encode_0(this$static._lenEncoder, this$static._rangeEncoder, len - 2, posState);
                    pos -= 4;
                    posSlot = GetPosSlot(pos);
                    lenToPosState = GetLenToPosState(len);
                    $Encode_2(this$static._posSlotEncoder[lenToPosState], this$static._rangeEncoder, posSlot);
                    if (posSlot >= 4) {
                        footerBits = (posSlot >> 1) - 1;
                        baseVal = (2 | posSlot & 1) << footerBits;
                        posReduced = pos - baseVal;
                        if (posSlot < 14) {
                            ReverseEncode(this$static._posEncoders, baseVal - posSlot - 1, this$static._rangeEncoder, footerBits, posReduced);
                        } else {
                            $EncodeDirectBits(this$static._rangeEncoder, posReduced >> 4, footerBits - 4);
                            $ReverseEncode(this$static._posAlignEncoder, this$static._rangeEncoder, posReduced & 15);
                            ++this$static._alignPriceCount;
                        }
                    }
                    distance = pos;
                    for (i = 3; i >= 1; --i) {
                        this$static._repDistances[i] = this$static._repDistances[i - 1];
                    }
                    this$static._repDistances[0] = distance;
                    ++this$static._matchPriceCount;
                }
                this$static._previousByte = $GetIndexByte(this$static._matchFinder, len - 1 - this$static._additionalOffset);
            }
            this$static._additionalOffset -= len;
            this$static.nowPos64 = add(this$static.nowPos64, fromInt(len));
            if (this$static._additionalOffset == 0) {
                if (this$static._matchPriceCount >= 128) {
                    $FillDistancesPrices(this$static);
                }
                if (this$static._alignPriceCount >= 16) {
                    $FillAlignPrices(this$static);
                }
                inSize[0] = this$static.nowPos64;
                outSize[0] = $GetProcessedSizeAdd(this$static._rangeEncoder);
                if ($GetNumAvailableBytes(this$static._matchFinder) == 0) {
                    $Flush(this$static, lowBits_0(this$static.nowPos64));
                    return;
                }
                if (compare(sub(this$static.nowPos64, progressPosValuePrev), P1000_longLit) >= 0) {
                    this$static._finished = false;
                    finished[0] = false;
                    return;
                }
            }
        }
    }
    
    function $Create_2(this$static) {
        var bt, numHashBytes;
        if (!this$static._matchFinder) {
            bt = ($clinit_60() , new BinTree());
            numHashBytes = 4;
            if (this$static._matchFinderType == 0) {
                numHashBytes = 2;
            }
            $SetType(bt, numHashBytes);
            this$static._matchFinder = bt;
        }
        $Create_1(this$static._literalEncoder, this$static._numLiteralPosStateBits, this$static._numLiteralContextBits);
        if (this$static._dictionarySize == this$static._dictionarySizePrev && this$static._numFastBytesPrev == this$static._numFastBytes) {
            return;
        }
        $Create_3(this$static._matchFinder, this$static._dictionarySize, 4096, this$static._numFastBytes, 274);
        this$static._dictionarySizePrev = this$static._dictionarySize;
        this$static._numFastBytesPrev = this$static._numFastBytes;
    }
    
    function $Encoder(this$static) {
        var i;
        $clinit_59();
        this$static._repDistances = initDim(_3I_classLit, 0, -1, 4, 1);
        this$static._optimum = initDim(optimal_2_classLit, 0, 6, 4096, 0);
        this$static._rangeEncoder = ($clinit_66() , new Encoder_0());
        this$static._isMatch = initDim(_3S_classLit, 0, -1, 192, 1);
        this$static._isRep = initDim(_3S_classLit, 0, -1, 12, 1);
        this$static._isRepG0 = initDim(_3S_classLit, 0, -1, 12, 1);
        this$static._isRepG1 = initDim(_3S_classLit, 0, -1, 12, 1);
        this$static._isRepG2 = initDim(_3S_classLit, 0, -1, 12, 1);
        this$static._isRep0Long = initDim(_3S_classLit, 0, -1, 192, 1);
        this$static._posSlotEncoder = initDim(bitTreeEncoder_2_classLit, 0, 8, 4, 0);
        this$static._posEncoders = initDim(_3S_classLit, 0, -1, 114, 1);
        this$static._posAlignEncoder = $BitTreeEncoder(new BitTreeEncoder(), 4);
        this$static._lenEncoder = $Encoder$LenPriceTableEncoder(new Encoder$LenPriceTableEncoder());
        this$static._repMatchLenEncoder = $Encoder$LenPriceTableEncoder(new Encoder$LenPriceTableEncoder());
        this$static._literalEncoder = new Encoder$LiteralEncoder();
        this$static._matchDistances = initDim(_3I_classLit, 0, -1, 548, 1);
        this$static._posSlotPrices = initDim(_3I_classLit, 0, -1, 256, 1);
        this$static._distancesPrices = initDim(_3I_classLit, 0, -1, 512, 1);
        this$static._alignPrices = initDim(_3I_classLit, 0, -1, 16, 1);
        this$static.reps = initDim(_3I_classLit, 0, -1, 4, 1);
        this$static.repLens = initDim(_3I_classLit, 0, -1, 4, 1);
        this$static.processedInSize = initDim(_3J_classLit, 0, -1, 1, 3);
        this$static.processedOutSize = initDim(_3J_classLit, 0, -1, 1, 3);
        this$static.finished = initDim(_3Z_classLit, 0, -1, 1, 2);
        this$static.properties = initDim(_3B_classLit, 0, -1, 5, 1);
        this$static.tempPrices = initDim(_3I_classLit, 0, -1, 128, 1);
        for (i = 0; i < 4096; ++i) {
            this$static._optimum[i] = new Encoder$Optimal();
        }
        for (i = 0; i < 4; ++i) {
            this$static._posSlotEncoder[i] = $BitTreeEncoder(new BitTreeEncoder(), 6);
        }
        return this$static;
    }
    
    function $FillAlignPrices(this$static) {
        var i;
        for (i = 0; i < 16; ++i) {
            this$static._alignPrices[i] = $ReverseGetPrice(this$static._posAlignEncoder, i);
        }
        this$static._alignPriceCount = 0;
    }
    
    function $FillDistancesPrices(this$static) {
        var baseVal, encoder, footerBits, i, lenToPosState, posSlot, st, st2;
        for (i = 4; i < 128; ++i) {
            posSlot = GetPosSlot(i);
            footerBits = (posSlot >> 1) - 1;
            baseVal = (2 | posSlot & 1) << footerBits;
            this$static.tempPrices[i] = ReverseGetPrice(this$static._posEncoders, baseVal - posSlot - 1, footerBits, i - baseVal);
        }
        for (lenToPosState = 0; lenToPosState < 4; ++lenToPosState) {
            encoder = this$static._posSlotEncoder[lenToPosState];
            st = lenToPosState << 6;
            for (posSlot = 0; posSlot < this$static._distTableSize; ++posSlot) {
                this$static._posSlotPrices[st + posSlot] = $GetPrice_1(encoder, posSlot);
            }
            for (posSlot = 14; posSlot < this$static._distTableSize; ++posSlot) {
                this$static._posSlotPrices[st + posSlot] += (posSlot >> 1) - 1 - 4 << 6;
            }
            st2 = lenToPosState * 128;
            for (i = 0; i < 4; ++i) {
                this$static._distancesPrices[st2 + i] = this$static._posSlotPrices[st + i];
            }
            for (; i < 128; ++i) {
                this$static._distancesPrices[st2 + i] = this$static._posSlotPrices[st + GetPosSlot(i)] + this$static.tempPrices[i];
            }
        }
        this$static._matchPriceCount = 0;
    }
    
    function $Flush(this$static, nowPos) {
        $ReleaseMFStream(this$static);
        $WriteEndMarker(this$static, nowPos & this$static._posStateMask);
        $FlushData(this$static._rangeEncoder);
    }
    
    function $GetOptimum(this$static, position) {
        var cur, curAnd1Price, curAndLenCharPrice, curAndLenPrice, curBack, curPrice, currentByte, distance, i, len, lenEnd, lenMain, lenRes, lenTest, lenTest2, lenTestTemp, matchByte, matchPrice, newLen, nextIsChar, nextMatchPrice, nextOptimum, nextRepMatchPrice, normalMatchPrice, numAvailableBytes, numAvailableBytesFull, numDistancePairs, offs, offset, opt, optimum, pos, posPrev, posState, posStateNext, price_4, repIndex, repLen, repMatchPrice, repMaxIndex, shortRepPrice, startLen, state, state2, t, price, price_0, price_1, price_2, price_3;
        if (this$static._optimumEndIndex != this$static._optimumCurrentIndex) {
            lenRes = this$static._optimum[this$static._optimumCurrentIndex].PosPrev - this$static._optimumCurrentIndex;
            this$static.backRes = this$static._optimum[this$static._optimumCurrentIndex].BackPrev;
            this$static._optimumCurrentIndex = this$static._optimum[this$static._optimumCurrentIndex].PosPrev;
            return lenRes;
        }
        this$static._optimumCurrentIndex = this$static._optimumEndIndex = 0;
        if (this$static._longestMatchWasFound) {
            lenMain = this$static._longestMatchLength;
            this$static._longestMatchWasFound = false;
        } else {
            lenMain = $ReadMatchDistances(this$static);
        }
        numDistancePairs = this$static._numDistancePairs;
        numAvailableBytes = $GetNumAvailableBytes(this$static._matchFinder) + 1;
        if (numAvailableBytes < 2) {
            this$static.backRes = -1;
            return 1;
        }
        if (numAvailableBytes > 273) {
            numAvailableBytes = 273;
        }
        repMaxIndex = 0;
        for (i = 0; i < 4; ++i) {
            this$static.reps[i] = this$static._repDistances[i];
            this$static.repLens[i] = $GetMatchLen(this$static._matchFinder, -1, this$static.reps[i], 273);
            if (this$static.repLens[i] > this$static.repLens[repMaxIndex]) {
                repMaxIndex = i;
            }
        }
        if (this$static.repLens[repMaxIndex] >= this$static._numFastBytes) {
            this$static.backRes = repMaxIndex;
            lenRes = this$static.repLens[repMaxIndex];
            $MovePos(this$static, lenRes - 1);
            return lenRes;
        }
        if (lenMain >= this$static._numFastBytes) {
            this$static.backRes = this$static._matchDistances[numDistancePairs - 1] + 4;
            $MovePos(this$static, lenMain - 1);
            return lenMain;
        }
        currentByte = $GetIndexByte(this$static._matchFinder, -1);
        matchByte = $GetIndexByte(this$static._matchFinder, -this$static._repDistances[0] - 1 - 1);
        if (lenMain < 2 && currentByte != matchByte && this$static.repLens[repMaxIndex] < 2) {
            this$static.backRes = -1;
            return 1;
        }
        this$static._optimum[0].State = this$static._state;
        posState = position & this$static._posStateMask;
        this$static._optimum[1].Price = ($clinit_66() , ProbPrices[this$static._isMatch[(this$static._state << 4) + posState] >>> 2]) + $GetPrice_0($GetSubCoder(this$static._literalEncoder, position, this$static._previousByte), this$static._state >= 7, matchByte, currentByte);
        $MakeAsChar(this$static._optimum[1]);
        matchPrice = ProbPrices[2048 - this$static._isMatch[(this$static._state << 4) + posState] >>> 2];
        repMatchPrice = matchPrice + ProbPrices[2048 - this$static._isRep[this$static._state] >>> 2];
        if (matchByte == currentByte) {
            shortRepPrice = repMatchPrice + $GetRepLen1Price(this$static, this$static._state, posState);
            if (shortRepPrice < this$static._optimum[1].Price) {
                this$static._optimum[1].Price = shortRepPrice;
                $MakeAsShortRep(this$static._optimum[1]);
            }
        }
        lenEnd = lenMain >= this$static.repLens[repMaxIndex]?lenMain:this$static.repLens[repMaxIndex];
        if (lenEnd < 2) {
            this$static.backRes = this$static._optimum[1].BackPrev;
            return 1;
        }
        this$static._optimum[1].PosPrev = 0;
        this$static._optimum[0].Backs0 = this$static.reps[0];
        this$static._optimum[0].Backs1 = this$static.reps[1];
        this$static._optimum[0].Backs2 = this$static.reps[2];
        this$static._optimum[0].Backs3 = this$static.reps[3];
        len = lenEnd;
        do {
            this$static._optimum[len--].Price = 268435455;
        } while (len >= 2);
        for (i = 0; i < 4; ++i) {
            repLen = this$static.repLens[i];
            if (repLen < 2) {
                continue;
            }
            price_4 = repMatchPrice + $GetPureRepPrice(this$static, i, this$static._state, posState);
            do {
                curAndLenPrice = price_4 + $GetPrice(this$static._repMatchLenEncoder, repLen - 2, posState);
                optimum = this$static._optimum[repLen];
                if (curAndLenPrice < optimum.Price) {
                    optimum.Price = curAndLenPrice;
                    optimum.PosPrev = 0;
                    optimum.BackPrev = i;
                    optimum.Prev1IsChar = 0;
                }
            } while (--repLen >= 2);
        }
        normalMatchPrice = matchPrice + ProbPrices[this$static._isRep[this$static._state] >>> 2];
        len = this$static.repLens[0] >= 2?this$static.repLens[0] + 1:2;
        if (len <= lenMain) {
            offs = 0;
            while (len > this$static._matchDistances[offs]) {
                offs += 2;
            }
            for (;; ++len) {
                distance = this$static._matchDistances[offs + 1];
                curAndLenPrice = normalMatchPrice + $GetPosLenPrice(this$static, distance, len, posState);
                optimum = this$static._optimum[len];
                if (curAndLenPrice < optimum.Price) {
                    optimum.Price = curAndLenPrice;
                    optimum.PosPrev = 0;
                    optimum.BackPrev = distance + 4;
                    optimum.Prev1IsChar = 0;
                }
                if (len == this$static._matchDistances[offs]) {
                    offs += 2;
                    if (offs == numDistancePairs) {
                        break;
                    }
                }
            }
        }
        cur = 0;
        while (true) {
            ++cur;
            if (cur == lenEnd) {
                return $Backward(this$static, cur);
            }
            newLen = $ReadMatchDistances(this$static);
            numDistancePairs = this$static._numDistancePairs;
            if (newLen >= this$static._numFastBytes) {
                this$static._longestMatchLength = newLen;
                this$static._longestMatchWasFound = true;
                return $Backward(this$static, cur);
            }
            ++position;
            posPrev = this$static._optimum[cur].PosPrev;
            if (this$static._optimum[cur].Prev1IsChar) {
                --posPrev;
                if (this$static._optimum[cur].Prev2) {
                    state = this$static._optimum[this$static._optimum[cur].PosPrev2].State;
                    if (this$static._optimum[cur].BackPrev2 < 4) {
                        state = (state < 7) ? 8 : 11;
                    } else {
                        state = (state < 7) ? 7 : 10;
                    }
                } else {
                    state = this$static._optimum[posPrev].State;
                }
                state = StateUpdateChar(state);
            } else {
                state = this$static._optimum[posPrev].State;
            }
            if (posPrev == cur - 1) {
                if (this$static._optimum[cur].BackPrev == 0) {
                    state = state < 7?9:11;
                } else {
                    state = StateUpdateChar(state);
                }
            } else {
                if (this$static._optimum[cur].Prev1IsChar && this$static._optimum[cur].Prev2) {
                    posPrev = this$static._optimum[cur].PosPrev2;
                    pos = this$static._optimum[cur].BackPrev2;
                    state = state < 7?8:11;
                } else {
                    pos = this$static._optimum[cur].BackPrev;
                    if (pos < 4) {
                        state = state < 7?8:11;
                    } else {
                        state = state < 7?7:10;
                    }
                }
                opt = this$static._optimum[posPrev];
                if (pos < 4) {
                    if (pos == 0) {
                        this$static.reps[0] = opt.Backs0;
                        this$static.reps[1] = opt.Backs1;
                        this$static.reps[2] = opt.Backs2;
                        this$static.reps[3] = opt.Backs3;
                    } else if (pos == 1) {
                        this$static.reps[0] = opt.Backs1;
                        this$static.reps[1] = opt.Backs0;
                        this$static.reps[2] = opt.Backs2;
                        this$static.reps[3] = opt.Backs3;
                    } else if (pos == 2) {
                        this$static.reps[0] = opt.Backs2;
                        this$static.reps[1] = opt.Backs0;
                        this$static.reps[2] = opt.Backs1;
                        this$static.reps[3] = opt.Backs3;
                    } else {
                        this$static.reps[0] = opt.Backs3;
                        this$static.reps[1] = opt.Backs0;
                        this$static.reps[2] = opt.Backs1;
                        this$static.reps[3] = opt.Backs2;
                    }
                } else {
                    this$static.reps[0] = pos - 4;
                    this$static.reps[1] = opt.Backs0;
                    this$static.reps[2] = opt.Backs1;
                    this$static.reps[3] = opt.Backs2;
                }
            }
            this$static._optimum[cur].State = state;
            this$static._optimum[cur].Backs0 = this$static.reps[0];
            this$static._optimum[cur].Backs1 = this$static.reps[1];
            this$static._optimum[cur].Backs2 = this$static.reps[2];
            this$static._optimum[cur].Backs3 = this$static.reps[3];
            curPrice = this$static._optimum[cur].Price;
            currentByte = $GetIndexByte(this$static._matchFinder, -1);
            matchByte = $GetIndexByte(this$static._matchFinder, -this$static.reps[0] - 1 - 1);
            posState = position & this$static._posStateMask;
            curAnd1Price = curPrice + ProbPrices[this$static._isMatch[(state << 4) + posState] >>> 2] + $GetPrice_0($GetSubCoder(this$static._literalEncoder, position, $GetIndexByte(this$static._matchFinder, -2)), state >= 7, matchByte, currentByte);
            nextOptimum = this$static._optimum[cur + 1];
            nextIsChar = false;
            if (curAnd1Price < nextOptimum.Price) {
                nextOptimum.Price = curAnd1Price;
                nextOptimum.PosPrev = cur;
                nextOptimum.BackPrev = -1;
                nextOptimum.Prev1IsChar = 0;
                nextIsChar = true;
            }
            matchPrice = curPrice + ProbPrices[2048 - this$static._isMatch[(state << 4) + posState] >>> 2];
            repMatchPrice = matchPrice + ProbPrices[2048 - this$static._isRep[state] >>> 2];
            if (matchByte == currentByte && !(nextOptimum.PosPrev < cur && nextOptimum.BackPrev == 0)) {
                shortRepPrice = repMatchPrice + (ProbPrices[this$static._isRepG0[state] >>> 2] + ProbPrices[this$static._isRep0Long[(state << 4) + posState] >>> 2]);
                if (shortRepPrice <= nextOptimum.Price) {
                    nextOptimum.Price = shortRepPrice;
                    nextOptimum.PosPrev = cur;
                    nextOptimum.BackPrev = 0;
                    nextOptimum.Prev1IsChar = 0;
                    nextIsChar = true;
                }
            }
            numAvailableBytesFull = $GetNumAvailableBytes(this$static._matchFinder) + 1;
            numAvailableBytesFull = 4095 - cur < numAvailableBytesFull?4095 - cur:numAvailableBytesFull;
            numAvailableBytes = numAvailableBytesFull;
            if (numAvailableBytes < 2) {
                continue;
            }
            if (numAvailableBytes > this$static._numFastBytes) {
                numAvailableBytes = this$static._numFastBytes;
            }
            if (!nextIsChar && matchByte != currentByte) {
                t = min(numAvailableBytesFull - 1, this$static._numFastBytes);
                lenTest2 = $GetMatchLen(this$static._matchFinder, 0, this$static.reps[0], t);
                if (lenTest2 >= 2) {
                    state2 = StateUpdateChar(state);
                    posStateNext = position + 1 & this$static._posStateMask;
                    nextRepMatchPrice = curAnd1Price + ProbPrices[2048 - this$static._isMatch[(state2 << 4) + posStateNext] >>> 2] + ProbPrices[2048 - this$static._isRep[state2] >>> 2];
                    offset = cur + 1 + lenTest2;
                    while (lenEnd < offset) {
                        this$static._optimum[++lenEnd].Price = 268435455;
                    }
                    curAndLenPrice = nextRepMatchPrice + (price = $GetPrice(this$static._repMatchLenEncoder, lenTest2 - 2, posStateNext) , price + $GetPureRepPrice(this$static, 0, state2, posStateNext));
                    optimum = this$static._optimum[offset];
                    if (curAndLenPrice < optimum.Price) {
                        optimum.Price = curAndLenPrice;
                        optimum.PosPrev = cur + 1;
                        optimum.BackPrev = 0;
                        optimum.Prev1IsChar = 1;
                        optimum.Prev2 = 0;
                    }
                }
            }
            startLen = 2;
            for (repIndex = 0; repIndex < 4; ++repIndex) {
                lenTest = $GetMatchLen(this$static._matchFinder, -1, this$static.reps[repIndex], numAvailableBytes);
                if (lenTest < 2) {
                    continue;
                }
                lenTestTemp = lenTest;
                do {
                    while (lenEnd < cur + lenTest) {
                        this$static._optimum[++lenEnd].Price = 268435455;
                    }
                    curAndLenPrice = repMatchPrice + (price_0 = $GetPrice(this$static._repMatchLenEncoder, lenTest - 2, posState) , price_0 + $GetPureRepPrice(this$static, repIndex, state, posState));
                    optimum = this$static._optimum[cur + lenTest];
                    if (curAndLenPrice < optimum.Price) {
                        optimum.Price = curAndLenPrice;
                        optimum.PosPrev = cur;
                        optimum.BackPrev = repIndex;
                        optimum.Prev1IsChar = 0;
                    }
                } while (--lenTest >= 2);
                lenTest = lenTestTemp;
                if (repIndex == 0) {
                    startLen = lenTest + 1;
                }
                if (lenTest < numAvailableBytesFull) {
                    t = min(numAvailableBytesFull - 1 - lenTest, this$static._numFastBytes);
                    lenTest2 = $GetMatchLen(this$static._matchFinder, lenTest, this$static.reps[repIndex], t);
                    if (lenTest2 >= 2) {
                        state2 = state < 7?8:11;
                        posStateNext = position + lenTest & this$static._posStateMask;
                        curAndLenCharPrice = repMatchPrice + (price_1 = $GetPrice(this$static._repMatchLenEncoder, lenTest - 2, posState) , price_1 + $GetPureRepPrice(this$static, repIndex, state, posState)) + ProbPrices[this$static._isMatch[(state2 << 4) + posStateNext] >>> 2] + $GetPrice_0($GetSubCoder(this$static._literalEncoder, position + lenTest, $GetIndexByte(this$static._matchFinder, lenTest - 1 - 1)), true, $GetIndexByte(this$static._matchFinder, lenTest - 1 - (this$static.reps[repIndex] + 1)), $GetIndexByte(this$static._matchFinder, lenTest - 1));
                        state2 = StateUpdateChar(state2);
                        posStateNext = position + lenTest + 1 & this$static._posStateMask;
                        nextMatchPrice = curAndLenCharPrice + ProbPrices[2048 - this$static._isMatch[(state2 << 4) + posStateNext] >>> 2];
                        nextRepMatchPrice = nextMatchPrice + ProbPrices[2048 - this$static._isRep[state2] >>> 2];
                        offset = lenTest + 1 + lenTest2;
                        while (lenEnd < cur + offset) {
                            this$static._optimum[++lenEnd].Price = 268435455;
                        }
                        curAndLenPrice = nextRepMatchPrice + (price_2 = $GetPrice(this$static._repMatchLenEncoder, lenTest2 - 2, posStateNext) , price_2 + $GetPureRepPrice(this$static, 0, state2, posStateNext));
                        optimum = this$static._optimum[cur + offset];
                        if (curAndLenPrice < optimum.Price) {
                            optimum.Price = curAndLenPrice;
                            optimum.PosPrev = cur + lenTest + 1;
                            optimum.BackPrev = 0;
                            optimum.Prev1IsChar = 1;
                            optimum.Prev2 = 1;
                            optimum.PosPrev2 = cur;
                            optimum.BackPrev2 = repIndex;
                        }
                    }
                }
            }
            if (newLen > numAvailableBytes) {
                newLen = numAvailableBytes;
                for (numDistancePairs = 0; newLen > this$static._matchDistances[numDistancePairs]; numDistancePairs += 2) {
                }
                this$static._matchDistances[numDistancePairs] = newLen;
                numDistancePairs += 2;
            }
            if (newLen >= startLen) {
            normalMatchPrice = matchPrice + ProbPrices[this$static._isRep[state] >>> 2];
            while (lenEnd < cur + newLen) {
                this$static._optimum[++lenEnd].Price = 268435455;
            }
            offs = 0;
            while (startLen > this$static._matchDistances[offs]) {
                offs += 2;
            }
            for (lenTest = startLen;; ++lenTest) {
                curBack = this$static._matchDistances[offs + 1];
                curAndLenPrice = normalMatchPrice + $GetPosLenPrice(this$static, curBack, lenTest, posState);
                optimum = this$static._optimum[cur + lenTest];
                if (curAndLenPrice < optimum.Price) {
                    optimum.Price = curAndLenPrice;
                    optimum.PosPrev = cur;
                    optimum.BackPrev = curBack + 4;
                    optimum.Prev1IsChar = 0;
                }
                if (lenTest == this$static._matchDistances[offs]) {
                    if (lenTest < numAvailableBytesFull) {
                        t = min(numAvailableBytesFull - 1 - lenTest, this$static._numFastBytes);
                        lenTest2 = $GetMatchLen(this$static._matchFinder, lenTest, curBack, t);
                        if (lenTest2 >= 2) {
                            state2 = state < 7?7:10;
                            posStateNext = position + lenTest & this$static._posStateMask;
                            curAndLenCharPrice = curAndLenPrice + ProbPrices[this$static._isMatch[(state2 << 4) + posStateNext] >>> 2] + $GetPrice_0($GetSubCoder(this$static._literalEncoder, position + lenTest, $GetIndexByte(this$static._matchFinder, lenTest - 1 - 1)), true, $GetIndexByte(this$static._matchFinder, lenTest - (curBack + 1) - 1), $GetIndexByte(this$static._matchFinder, lenTest - 1));
                            state2 = StateUpdateChar(state2);
                            posStateNext = position + lenTest + 1 & this$static._posStateMask;
                            nextMatchPrice = curAndLenCharPrice + ProbPrices[2048 - this$static._isMatch[(state2 << 4) + posStateNext] >>> 2];
                            nextRepMatchPrice = nextMatchPrice + ProbPrices[2048 - this$static._isRep[state2] >>> 2];
                            offset = lenTest + 1 + lenTest2;
                            while (lenEnd < cur + offset) {
                                this$static._optimum[++lenEnd].Price = 268435455;
                            }
                            curAndLenPrice = nextRepMatchPrice + (price_3 = $GetPrice(this$static._repMatchLenEncoder, lenTest2 - 2, posStateNext) , price_3 + $GetPureRepPrice(this$static, 0, state2, posStateNext));
                            optimum = this$static._optimum[cur + offset];
                            if (curAndLenPrice < optimum.Price) {
                                optimum.Price = curAndLenPrice;
                                optimum.PosPrev = cur + lenTest + 1;
                                optimum.BackPrev = 0;
                                optimum.Prev1IsChar = 1;
                                optimum.Prev2 = 1;
                                optimum.PosPrev2 = cur;
                                optimum.BackPrev2 = curBack + 4;
                            }
                        }
                    }
                    offs += 2;
                    if (offs == numDistancePairs)
                        break;
                    }
                }
            }
        }
    }
    
    function $GetPosLenPrice(this$static, pos, len, posState) {
        var lenToPosState, price;
        lenToPosState = GetLenToPosState(len);
        if (pos < 128) {
            price = this$static._distancesPrices[lenToPosState * 128 + pos];
        } else {
            price = this$static._posSlotPrices[(lenToPosState << 6) + GetPosSlot2(pos)] + this$static._alignPrices[pos & 15];
        }
        return price + $GetPrice(this$static._lenEncoder, len - 2, posState);
    }
    
    function $GetPureRepPrice(this$static, repIndex, state, posState) {
        var price;
        if (repIndex == 0) {
            price = ($clinit_66() , ProbPrices[this$static._isRepG0[state] >>> 2]);
            price += ProbPrices[2048 - this$static._isRep0Long[(state << 4) + posState] >>> 2];
        } else {
            price = ($clinit_66() , ProbPrices[2048 - this$static._isRepG0[state] >>> 2]);
            if (repIndex == 1) {
                price += ProbPrices[this$static._isRepG1[state] >>> 2];
            } else {
                price += ProbPrices[2048 - this$static._isRepG1[state] >>> 2];
                price += GetPrice(this$static._isRepG2[state], repIndex - 2);
            }
        }
        return price;
    }
    
    function $GetRepLen1Price(this$static, state, posState) {
        return ($clinit_66() , ProbPrices[this$static._isRepG0[state] >>> 2]) + ProbPrices[this$static._isRep0Long[(state << 4) + posState] >>> 2];
    }
    
    function $Init_4(this$static) {
        var i;
        $BaseInit(this$static);
        $Init_9(this$static._rangeEncoder);
        InitBitModels_0(this$static._isMatch);
        InitBitModels_0(this$static._isRep0Long);
        InitBitModels_0(this$static._isRep);
        InitBitModels_0(this$static._isRepG0);
        InitBitModels_0(this$static._isRepG1);
        InitBitModels_0(this$static._isRepG2);
        InitBitModels_0(this$static._posEncoders);
        $Init_3(this$static._literalEncoder);
        for (i = 0; i < 4; ++i) {
            InitBitModels(this$static._posSlotEncoder[i].Models);
        }
        $Init_2(this$static._lenEncoder, 1 << this$static._posStateBits);
        $Init_2(this$static._repMatchLenEncoder, 1 << this$static._posStateBits);
        InitBitModels(this$static._posAlignEncoder.Models);
        this$static._longestMatchWasFound = false;
        this$static._optimumEndIndex = 0;
        this$static._optimumCurrentIndex = 0;
        this$static._additionalOffset = 0;
    }
    
    function $MovePos(this$static, num) {
        if (num > 0) {
            $Skip(this$static._matchFinder, num);
            this$static._additionalOffset += num;
        }
    }
    
    function $ReadMatchDistances(this$static) {
        var lenRes;
        lenRes = 0;
        this$static._numDistancePairs = $GetMatches(this$static._matchFinder, this$static._matchDistances);
        if (this$static._numDistancePairs > 0) {
            lenRes = this$static._matchDistances[this$static._numDistancePairs - 2];
            if (lenRes == this$static._numFastBytes)
            lenRes += $GetMatchLen(this$static._matchFinder, lenRes - 1, this$static._matchDistances[this$static._numDistancePairs - 1], 273 - lenRes);
        }
        ++this$static._additionalOffset;
        return lenRes;
    }
    
    function $ReleaseMFStream(this$static) {
        if (!!this$static._matchFinder && this$static._needReleaseMFStream) {
            this$static._matchFinder._stream = null;
            this$static._needReleaseMFStream = false;
        }
    }
    
    function $ReleaseStreams(this$static) {
        $ReleaseMFStream(this$static);
        this$static._rangeEncoder.Stream = null;
    }
    
    function $SetDictionarySize_0(this$static, dictionarySize) {
        var dicLogSize;
        if (dictionarySize < 1 || dictionarySize > 536870912) {
            return false;
        }
        this$static._dictionarySize = dictionarySize;
        for (dicLogSize = 0; dictionarySize > 1 << dicLogSize; ++dicLogSize) {
        }
        this$static._distTableSize = dicLogSize * 2;
        return true;
    }
    
    function $SetLcLpPb_0(this$static, lc, lp, pb) {
        if (lp < 0 || lp > 4 || lc < 0 || lc > 8 || pb < 0 || pb > 4) {
            return false;
        }
        this$static._numLiteralPosStateBits = lp;
        this$static._numLiteralContextBits = lc;
        this$static._posStateBits = pb;
        this$static._posStateMask = (1 << this$static._posStateBits) - 1;
        return true;
    }
    
    function $SetMatchFinder(this$static, matchFinderIndex) {
        var matchFinderIndexPrev;
        if (matchFinderIndex < 0 || matchFinderIndex > 2) {
            return false;
        }
        matchFinderIndexPrev = this$static._matchFinderType;
        this$static._matchFinderType = matchFinderIndex;
        if (!!this$static._matchFinder && matchFinderIndexPrev != this$static._matchFinderType) {
            this$static._dictionarySizePrev = -1;
            this$static._matchFinder = null;
        }
        return true;
    }
    
    function $SetNumFastBytes(this$static, numFastBytes) {
        if (numFastBytes < 5 || numFastBytes > 273) {
            return false;
        }
        this$static._numFastBytes = numFastBytes;
        return true;
    }
    
    function $WriteCoderProperties(this$static, outStream) {
        var i;
        this$static.properties[0] = (this$static._posStateBits * 5 + this$static._numLiteralPosStateBits) * 9 + this$static._numLiteralContextBits << 24 >> 24;
        for (i = 0; i < 4; ++i) {
            this$static.properties[1 + i] = this$static._dictionarySize >> 8 * i << 24 >> 24;
        }
        $write_0(outStream, this$static.properties, 0, 5);
    }
    
    function $WriteEndMarker(this$static, posState) {
        var lenToPosState;
        if (!this$static._writeEndMark) {
            return;
        }
        $Encode_3(this$static._rangeEncoder, this$static._isMatch, (this$static._state << 4) + posState, 1);
        $Encode_3(this$static._rangeEncoder, this$static._isRep, this$static._state, 0);
        this$static._state = this$static._state < 7?7:10;
        $Encode_0(this$static._lenEncoder, this$static._rangeEncoder, 0, posState);
        lenToPosState = GetLenToPosState(2);
        $Encode_2(this$static._posSlotEncoder[lenToPosState], this$static._rangeEncoder, 63);
        $EncodeDirectBits(this$static._rangeEncoder, 67108863, 26);
        $ReverseEncode(this$static._posAlignEncoder, this$static._rangeEncoder, 15);
    }
    
    function GetPosSlot(pos) {
        if (pos < 2048) {
            return g_FastPos[pos];
        }
        if (pos < 2097152) {
            return g_FastPos[pos >> 10] + 20;
        }
        return g_FastPos[pos >> 20] + 40;
    }
    
    function GetPosSlot2(pos) {
        if (pos < 131072) {
            return g_FastPos[pos >> 6] + 12;
        }
        if (pos < 134217728) {
            return g_FastPos[pos >> 16] + 32;
        }
        return g_FastPos[pos >> 26] + 52;
    }
    
    var Encoder = make_thing(0);
    _._additionalOffset = 0;
    _._alignPriceCount = 0;
    _._dictionarySize = 4194304;
    _._dictionarySizePrev = -1;
    _._distTableSize = 44;
    _._longestMatchLength = 0;
    _._matchFinderType = 1;
    _._matchPriceCount = 0;
    _._numDistancePairs = 0;
    _._numFastBytes = 32;
    _._numFastBytesPrev = -1;
    _._numLiteralContextBits = 3;
    _._numLiteralPosStateBits = 0;
    _._optimumCurrentIndex = 0;
    _._optimumEndIndex = 0;
    _._posStateBits = 2;
    _._posStateMask = 3;
    _._previousByte = 0;
    _._state = 0;
    _.backRes = 0;
    _.nowPos64 = P0_longLit;
    
    var g_FastPos;
    function $Encode(this$static, rangeEncoder, symbol, posState) {
        if (symbol < 8) {
            $Encode_3(rangeEncoder, this$static._choice, 0, 0);
            $Encode_2(this$static._lowCoder[posState], rangeEncoder, symbol);
        } else {
            symbol -= 8;
            $Encode_3(rangeEncoder, this$static._choice, 0, 1);
            if (symbol < 8) {
                $Encode_3(rangeEncoder, this$static._choice, 1, 0);
                $Encode_2(this$static._midCoder[posState], rangeEncoder, symbol);
            } else {
                $Encode_3(rangeEncoder, this$static._choice, 1, 1);
                $Encode_2(this$static._highCoder, rangeEncoder, symbol - 8);
            }
        }
    }
    
    function $Encoder$LenEncoder(this$static) {
        var posState;
        this$static._choice = initDim(_3S_classLit, 0, -1, 2, 1);
        this$static._lowCoder = initDim(bitTreeEncoder_2_classLit, 0, 8, 16, 0);
        this$static._midCoder = initDim(bitTreeEncoder_2_classLit, 0, 8, 16, 0);
        this$static._highCoder = $BitTreeEncoder(new BitTreeEncoder(), 8);
        for (posState = 0; posState < 16; ++posState) {
            this$static._lowCoder[posState] = $BitTreeEncoder(new BitTreeEncoder(), 3);
            this$static._midCoder[posState] = $BitTreeEncoder(new BitTreeEncoder(), 3);
        }
        return this$static;
    }
    
    function $Init_2(this$static, numPosStates) {
        var posState;
        InitBitModels_0(this$static._choice);
        for (posState = 0; posState < numPosStates; ++posState) {
            InitBitModels(this$static._lowCoder[posState].Models);
            InitBitModels(this$static._midCoder[posState].Models);
        }
        InitBitModels(this$static._highCoder.Models);
    }
    
    function $SetPrices(this$static, posState, numSymbols, prices, st) {
        var a0, a1, b0, b1, i;
        a0 = ($clinit_66() , ProbPrices[this$static._choice[0] >>> 2]);
        a1 = ProbPrices[2048 - this$static._choice[0] >>> 2];
        b0 = a1 + ProbPrices[this$static._choice[1] >>> 2];
        b1 = a1 + ProbPrices[2048 - this$static._choice[1] >>> 2];
        i = 0;
        for (i = 0; i < 8; ++i) {
            if (i >= numSymbols)
            return;
            prices[st + i] = a0 + $GetPrice_1(this$static._lowCoder[posState], i);
        }
        for (; i < 16; ++i) {
            if (i >= numSymbols)
            return;
            prices[st + i] = b0 + $GetPrice_1(this$static._midCoder[posState], i - 8);
        }
        for (; i < numSymbols; ++i) {
            prices[st + i] = b1 + $GetPrice_1(this$static._highCoder, i - 8 - 8);
        }
    }
    
    var Encoder$LenEncoder = make_thing(0);
    
    function $Encode_0(this$static, rangeEncoder, symbol, posState) {
        $Encode(this$static, rangeEncoder, symbol, posState);
        if (--this$static._counters[posState] == 0) {
            $SetPrices(this$static, posState, this$static._tableSize, this$static._prices, posState * 272);
            this$static._counters[posState] = this$static._tableSize;
        }
    }
    
    function $Encoder$LenPriceTableEncoder(this$static) {
        $Encoder$LenEncoder(this$static);
        this$static._prices = initDim(_3I_classLit, 0, -1, 4352, 1);
        this$static._counters = initDim(_3I_classLit, 0, -1, 16, 1);
        return this$static;
    }
    
    function $GetPrice(this$static, symbol, posState) {
        return this$static._prices[posState * 272 + symbol];
    }
    
    function $UpdateTables(this$static, numPosStates) {
        var posState;
        for (posState = 0; posState < numPosStates; ++posState) {
            $SetPrices(this$static, posState, this$static._tableSize, this$static._prices, posState * 272);
            this$static._counters[posState] = this$static._tableSize;
        }
    }
    
    var Encoder$LenPriceTableEncoder = make_thing(0, new Encoder$LenEncoder());
    _._tableSize = 0;
    
    function $Create_1(this$static, numPosBits, numPrevBits) {
        var i, numStates;
        if (this$static.m_Coders != null && this$static.m_NumPrevBits == numPrevBits && this$static.m_NumPosBits == numPosBits) {
            return;
        }
        this$static.m_NumPosBits = numPosBits;
        this$static.m_PosMask = (1 << numPosBits) - 1;
        this$static.m_NumPrevBits = numPrevBits;
        numStates = 1 << this$static.m_NumPrevBits + this$static.m_NumPosBits;
        this$static.m_Coders = initDim(encoder2_2_classLit, 0, 5, numStates, 0);
        for (i = 0; i < numStates; ++i) {
            this$static.m_Coders[i] = $Encoder$LiteralEncoder$Encoder2(new Encoder$LiteralEncoder$Encoder2());
        }
    }
    
    function $GetSubCoder(this$static, pos, prevByte) {
        return this$static.m_Coders[((pos & this$static.m_PosMask) << this$static.m_NumPrevBits) + ((prevByte & 255) >>> 8 - this$static.m_NumPrevBits)];
    }
    
    function $Init_3(this$static) {
        var i, numStates;
        numStates = 1 << this$static.m_NumPrevBits + this$static.m_NumPosBits;
        for (i = 0; i < numStates; ++i) {
            InitBitModels_0(this$static.m_Coders[i].m_Encoders);
        }
    }
    
    var Encoder$LiteralEncoder = make_thing(0);
    _.m_NumPosBits = 0;
    _.m_NumPrevBits = 0;
    _.m_PosMask = 0;
    
    function $Encode_1(this$static, rangeEncoder, symbol) {
        var bit, context, i;
        context = 1;
        for (i = 7; i >= 0; --i) {
            bit = symbol >> i & 1;
            $Encode_3(rangeEncoder, this$static.m_Encoders, context, bit);
            context = context << 1 | bit;
        }
    }
    
    function $EncodeMatched(this$static, rangeEncoder, matchByte, symbol) {
        var bit, context, i, matchBit, same, state;
        context = 1;
        same = true;
        for (i = 7; i >= 0; --i) {
            bit = symbol >> i & 1;
            state = context;
            if (same) {
                matchBit = matchByte >> i & 1;
                state += 1 + matchBit << 8;
                same = matchBit == bit;
            }
            $Encode_3(rangeEncoder, this$static.m_Encoders, state, bit);
            context = context << 1 | bit;
        }
    }
    
    function $Encoder$LiteralEncoder$Encoder2(this$static) {
        this$static.m_Encoders = initDim(_3S_classLit, 0, -1, 768, 1);
        return this$static;
    }
    
    function $GetPrice_0(this$static, matchMode, matchByte, symbol) {
        var bit, context, i, matchBit, price;
        price = 0;
        context = 1;
        i = 7;
        if (matchMode) {
            for (; i >= 0; --i) {
                matchBit = matchByte >> i & 1;
                bit = symbol >> i & 1;
                price += GetPrice(this$static.m_Encoders[(1 + matchBit << 8) + context], bit);
                context = context << 1 | bit;
                if (matchBit != bit) {
                    --i;
                    break;
                }
            }
        }
        for (; i >= 0; --i) {
            bit = symbol >> i & 1;
            price += GetPrice(this$static.m_Encoders[context], bit);
            context = context << 1 | bit;
        }
        return price;
    }
    
    var Encoder$LiteralEncoder$Encoder2 = make_thing(18);
    
    function $MakeAsChar(this$static) {
        this$static.BackPrev = -1;
        this$static.Prev1IsChar = 0;
    }
    
    function $MakeAsShortRep(this$static) {
        this$static.BackPrev = 0;
        this$static.Prev1IsChar = 0;
    }
    
    var Encoder$Optimal = make_thing(19);
    _.BackPrev = 0;
    _.BackPrev2 = 0;
    _.Backs0 = 0;
    _.Backs1 = 0;
    _.Backs2 = 0;
    _.Backs3 = 0;
    _.PosPrev = 0;
    _.PosPrev2 = 0;
    _.Price = 0;
    _.State = 0;
    /** ce */
    /** ds */
    function $BitTreeDecoder(this$static, numBitLevels) {
        this$static.NumBitLevels = numBitLevels;
        this$static.Models = initDim(_3S_classLit, 0, -1, 1 << numBitLevels, 1);
        return this$static;
    }
    
    function $Decode_0(this$static, rangeDecoder) {
        var bitIndex, m;
        m = 1;
        for (bitIndex = this$static.NumBitLevels; bitIndex != 0; --bitIndex) {
            m = (m << 1) + $DecodeBit(rangeDecoder, this$static.Models, m);
        }
        return m - (1 << this$static.NumBitLevels);
    }
    
    function $ReverseDecode(this$static, rangeDecoder) {
        var bit, bitIndex, m, symbol;
        m = 1;
        symbol = 0;
        for (bitIndex = 0; bitIndex < this$static.NumBitLevels; ++bitIndex) {
            bit = $DecodeBit(rangeDecoder, this$static.Models, m);
            m <<= 1;
            m += bit;
            symbol |= bit << bitIndex;
        }
        return symbol;
    }
    
    function ReverseDecode(Models, startIndex, rangeDecoder, NumBitLevels) {
        var bit, bitIndex, m, symbol;
        m = 1;
        symbol = 0;
        for (bitIndex = 0; bitIndex < NumBitLevels; ++bitIndex) {
            bit = $DecodeBit(rangeDecoder, Models, startIndex + m);
            m <<= 1;
            m += bit;
            symbol |= bit << bitIndex;
        }
        return symbol;
    }
    
    var BitTreeDecoder = make_thing(20);
    _.NumBitLevels = 0;
    /** de */
    /** cs */
    function $BitTreeEncoder(this$static, numBitLevels) {
        this$static.NumBitLevels = numBitLevels;
        this$static.Models = initDim(_3S_classLit, 0, -1, 1 << numBitLevels, 1);
        return this$static;
    }
    
    function $Encode_2(this$static, rangeEncoder, symbol) {
        var bit, bitIndex, m;
        m = 1;
        for (bitIndex = this$static.NumBitLevels; bitIndex != 0;) {
            --bitIndex;
            bit = symbol >>> bitIndex & 1;
            $Encode_3(rangeEncoder, this$static.Models, m, bit);
            m = m << 1 | bit;
        }
    }
    
    function $GetPrice_1(this$static, symbol) {
        var bit, bitIndex, m, price;
        price = 0;
        m = 1;
        for (bitIndex = this$static.NumBitLevels; bitIndex != 0;) {
            --bitIndex;
            bit = symbol >>> bitIndex & 1;
            price += GetPrice(this$static.Models[m], bit);
            m = (m << 1) + bit;
        }
        return price;
    }
    
    function $ReverseEncode(this$static, rangeEncoder, symbol) {
        var bit, i, m;
        m = 1;
        for (i = 0; i < this$static.NumBitLevels; ++i) {
            bit = symbol & 1;
            $Encode_3(rangeEncoder, this$static.Models, m, bit);
            m = m << 1 | bit;
            symbol >>= 1;
        }
    }
    
    function $ReverseGetPrice(this$static, symbol) {
        var bit, i, m, price;
        price = 0;
        m = 1;
        for (i = this$static.NumBitLevels; i != 0; --i) {
            bit = symbol & 1;
            symbol >>>= 1;
            price += GetPrice(this$static.Models[m], bit);
            m = m << 1 | bit;
        }
        return price;
    }
    
    function ReverseEncode(Models, startIndex, rangeEncoder, NumBitLevels, symbol) {
        var bit, i, m;
        m = 1;
        for (i = 0; i < NumBitLevels; ++i) {
            bit = symbol & 1;
            $Encode_3(rangeEncoder, Models, startIndex + m, bit);
            m = m << 1 | bit;
            symbol >>= 1;
        }
    }
    
    function ReverseGetPrice(Models, startIndex, NumBitLevels, symbol) {
        var bit, i, m, price;
        price = 0;
        m = 1;
        for (i = NumBitLevels; i != 0; --i) {
            bit = symbol & 1;
            symbol >>>= 1;
            price += ($clinit_66() , ProbPrices[((Models[startIndex + m] - bit ^ -bit) & 2047) >>> 2]);
            m = m << 1 | bit;
        }
        return price;
    }
    
    var BitTreeEncoder = make_thing(21);
    _.NumBitLevels = 0;
    /** ce */
    /** ds */
    function $DecodeBit(this$static, probs, index) {
        var newBound, prob;
        prob = probs[index];
        newBound = (this$static.Range >>> 11) * prob;
        if ((this$static.Code ^ -2147483648) < (newBound ^ -2147483648)) {
            this$static.Range = newBound;
            probs[index] = prob + (2048 - prob >>> 5) << 16 >> 16;
            if ((this$static.Range & -16777216) == 0) {
                this$static.Code = this$static.Code << 8 | $read(this$static.Stream);
                this$static.Range <<= 8;
            }
            return 0;
        } else {
            this$static.Range -= newBound;
            this$static.Code -= newBound;
            probs[index] = prob - (prob >>> 5) << 16 >> 16;
            if ((this$static.Range & -16777216) == 0) {
                this$static.Code = this$static.Code << 8 | $read(this$static.Stream);
                this$static.Range <<= 8;
            }
            return 1;
        }
    }
    
    function $DecodeDirectBits(this$static, numTotalBits) {
        var i, result, t;
        result = 0;
        for (i = numTotalBits; i != 0; --i) {
            this$static.Range >>>= 1;
            t = this$static.Code - this$static.Range >>> 31;
            this$static.Code -= this$static.Range & t - 1;
            result = result << 1 | 1 - t;
            if ((this$static.Range & -16777216) == 0) {
                this$static.Code = this$static.Code << 8 | $read(this$static.Stream);
                this$static.Range <<= 8;
            }
        }
        return result;
    }
    
    function $Init_8(this$static) {
        var i;
        this$static.Code = 0;
        this$static.Range = -1;
        for (i = 0; i < 5; ++i) {
            this$static.Code = this$static.Code << 8 | $read(this$static.Stream);
        }
    }
    
    var Decoder_0 = make_thing(0);
    _.Code = 0;
    _.Range = 0;
    /** de */
    
    function InitBitModels(probs) {
        var i;
        for (i = 0; i < probs.length; ++i) {
            probs[i] = 1024;
        }
    }
    /** cs */
    function $clinit_66() {
        $clinit_66 = nullMethod;
        var end, i, j, start;
        ProbPrices = initDim(_3I_classLit, 0, -1, 512, 1);
        for (i = 8; i >= 0; --i) {
            start = 1 << 9 - i - 1;
            end = 1 << 9 - i;
            for (j = start; j < end; ++j) {
                ProbPrices[j] = (i << 6) + (end - j << 6 >>> 9 - i - 1);
            }
        }
    }
    
    function $Encode_3(this$static, probs, index, symbol) {
        var newBound, prob;
        prob = probs[index];
        newBound = (this$static.Range >>> 11) * prob;
        if (symbol == 0) {
            this$static.Range = newBound;
            probs[index] = prob + (2048 - prob >>> 5) << 16 >> 16;
        } else {
            this$static.Low = add(this$static.Low, and(fromInt(newBound), Pffffffff_longLit));
            this$static.Range -= newBound;
            probs[index] = prob - (prob >>> 5) << 16 >> 16;
        }
        if ((this$static.Range & -16777216) == 0) {
            this$static.Range <<= 8;
            $ShiftLow(this$static);
        }
    }
    
    function $EncodeDirectBits(this$static, v, numTotalBits) {
        var i;
        for (i = numTotalBits - 1; i >= 0; --i) {
            this$static.Range >>>= 1;
            if ((v >>> i & 1) == 1) {
                this$static.Low = add(this$static.Low, fromInt(this$static.Range));
            }
            if ((this$static.Range & -16777216) == 0) {
                this$static.Range <<= 8;
                $ShiftLow(this$static);
            }
        }
    }
    
    function $FlushData(this$static) {
        var i;
        for (i = 0; i < 5; ++i) {
            $ShiftLow(this$static);
        }
    }
    
    function $GetProcessedSizeAdd(this$static) {
        return add(add(fromInt(this$static._cacheSize), this$static._position), P4_longLit);
    }
    
    function $Init_9(this$static) {
        this$static._position = P0_longLit;
        this$static.Low = P0_longLit;
        this$static.Range = -1;
        this$static._cacheSize = 1;
        this$static._cache = 0;
    }
    
    function $ShiftLow(this$static) {
        var LowHi, temp;
        LowHi = lowBits_0(shru(this$static.Low, 32));
        if (LowHi != 0 || compare(this$static.Low, Pff000000_longLit) < 0) {
            this$static._position = add(this$static._position, fromInt(this$static._cacheSize));
            temp = this$static._cache;
            do {
                $write(this$static.Stream, temp + LowHi);
                temp = 255;
            } while (--this$static._cacheSize != 0);
            this$static._cache = lowBits_0(this$static.Low) >>> 24;
        }
        ++this$static._cacheSize;
        this$static.Low = shl(and(this$static.Low, Pffffff_longLit), 8);
    }
    
    function GetPrice(Prob, symbol) {
        $clinit_66();
        return ProbPrices[((Prob - symbol ^ -symbol) & 2047) >>> 2];
    }
    
    function InitBitModels_0(probs) {
        $clinit_66();
        var i;
        for (i = 0; i < probs.length; ++i) {
            probs[i] = 1024;
        }
    }
    /** ce */
    /** ds */
    function convert_binary_arr(arr)
    {
        var i;
        
        for (i = arr.length - 1; i >= 0; i -= 1) {
            if (arr[i] < 0) {
                arr[i] = 256 + arr[i];
            }
        }
        
        return arr;
    }
    /** de */
    /** cs */
    var Encoder_0 = make_thing(0);
    _.Low = P0_longLit;
    _.Range = 0;
    _._cache = 0;
    _._cacheSize = 0;
    _._position = P0_longLit;
    
    var ProbPrices;
    /** ce */
    /** ds */
    function decode(utf) {
        var buf = $StringBuilder(new StringBuilder()), i, x, y, z;
        for (i = 0; i < utf.length; ++i) {
            x = utf[i] & 255;
            if ((x & 128) == 0) {
                if (x == 0) {
                    /// It appears that this is binary data, so it cannot be converted to a string, so just send it back.
                    return convert_binary_arr(utf);
                }
                $append(buf.data, String.fromCharCode(x & 65535));
            } else if ((x & 224) == 192) {
                if (i + 1 >= utf.length) {
                    /// It appears that this is binary data, so it cannot be converted to a string, so just send it back.
                    return convert_binary_arr(utf);
                }
                y = utf[++i] & 255;
                if ((y & 192) != 128) {
                    /// It appears that this is binary data, so it cannot be converted to a string, so just send it back.
                    return convert_binary_arr(utf);
                }
                $append(buf.data, String.fromCharCode((x & 31) << 6 & 65535 | y & 63));
            } else if ((x & 240) == 224) {
                if (i + 2 >= utf.length) {
                    /// It appears that this is binary data, so it cannot be converted to a string, so just send it back.
                    return convert_binary_arr(utf);
                }
                y = utf[++i] & 255;
                if ((y & 192) != 128) {
                    /// It appears that this is binary data, so it cannot be converted to a string, so just send it back.
                    return convert_binary_arr(utf);
                }
                z = utf[++i] & 255;
                if ((z & 192) != 128) {
                    /// It appears that this is binary data, so it cannot be converted to a string, so just send it back.
                    return convert_binary_arr(utf);
                }
                $append(buf.data, String.fromCharCode(((x & 15) << 12 | (y & 63) << 6 | z & 63) & 65535));
            } else {
                /// It appears that this is binary data, so it cannot be converted to a string, so just send it back.
                return convert_binary_arr(utf);
            }
        }
        return $toString(buf.data);
    }
    /** de */
    /** cs */
    function encode(s) {
        var ch, chars, data, elen, i, charArr, n;
        chars = (n = s.length , charArr = initDim(_3C_classLit, 0, -1, n, 1) , $getChars(s, 0, n, charArr, 0) , charArr);
        elen = 0;
        for (i = 0; i < s.length; ++i) {
            ch = chars[i];
            if (ch >= 1 && ch <= 127) {
                ++elen;
            } else if (ch == 0 || ch >= 128 && ch <= 2047) {
                elen += 2;
            } else {
                elen += 3;
            }
        }
        data = initDim(_3B_classLit, 0, -1, elen, 1);
        elen = 0;
        for (i = 0; i < s.length; ++i) {
            ch = chars[i];
            if (ch >= 1 && ch <= 127) {
                data[elen++] = ch << 24 >> 24;
            } else if (ch == 0 || ch >= 128 && ch <= 2047) {
                data[elen++] = (192 | ch >> 6 & 31) << 24 >> 24;
                data[elen++] = (128 | ch & 63) << 24 >> 24;
            } else {
                data[elen++] = (224 | ch >> 12 & 15) << 24 >> 24;
                data[elen++] = (128 | ch >> 6 & 63) << 24 >> 24;
                data[elen++] = (128 | ch & 63) << 24 >> 24;
            }
        }
        return data;
    }
    /** ce */
    
    function $LZMAJS(this$static) {
        return this$static;
    }
    function toDouble(a) {
        return a[1] + a[0];
    }
    /** cs */
    function compress(str, mode, on_finish, on_progress) {
        var this$static = $LZMAJS(new LZMAJS()),
            percent,
            callback_num;
        
        if (typeof on_finish !== "function") {
            callback_num = on_finish;
            on_finish = on_progress = 0;
        }
        
        this$static.mode = get_mode_obj(mode);
        
        this$static.c = $LZMAByteArrayCompressor(new LZMAByteArrayCompressor(), encode(str), this$static.mode);
        
        if (on_progress) {
            on_progress(0);
        } else if (typeof callback_num !== "undefined") {
            update_progress(0, callback_num);
        }
        
        function do_action() {
            var res, start = (new Date()).getTime();
            
            while ($execute(this$static.c)) {
                percent = toDouble(this$static.c.chunker.inBytesProcessed) / toDouble(this$static.c.length_0);
                /// If about 200 miliseconds have passed, update the progress.
                if ((new Date()).getTime() - start > 200) {
                    if (on_progress) {
                        on_progress(percent);
                    } else if (typeof callback_num !== "undefined") {
                        update_progress(percent, callback_num);
                    }
                    wait(do_action, 0);
                    return false;
                }
            }
            
            if (on_progress) {
                on_progress(1);
            } else if (typeof callback_num !== "undefined") {
                update_progress(1, callback_num);
            }
            
            res = $toByteArray(this$static.c.output);
            
            if (on_finish) {
                on_finish(res);
            } else if (typeof callback_num !== "undefined") {
                postMessage({
                    action: action_compress,
                    callback_num: callback_num,
                    /// .slice(0) is required for Firefox 4.0 (because I think arrays are now passed by reference, which is not allowed when sending messages to or from web workers).
                    /// .slice(0) simply returns the entire array by value.
                    result: res.slice(0)
                });
            }
        }
        
        do_action();
    }
    /** ce */
    /** ds */
    function decompress(byte_arr, on_finish, on_progress) {
        var this$static = $LZMAJS(new LZMAJS()),
            percent,
            data,
            callback_num,
            has_progress;
        
        if (typeof on_finish !== "function") {
            callback_num = on_finish;
            on_finish = on_progress = 0;
        }
        
        data = initValues(_3B_classLit, 0, -1, byte_arr);
        
        this$static.d = $LZMAByteArrayDecompressor(new LZMAByteArrayDecompressor(), data);
        
        has_progress = toDouble(this$static.d.length_0) > -1;
        
        if (on_progress) {
            on_progress(has_progress ? 0 : -1);
        } else if (typeof callback_num !== "undefined") {
            update_progress(has_progress ? 0 : -1, callback_num);
        }
        
        function do_action() {
            var res, i = 0, start = (new Date()).getTime();
            while ($execute(this$static.d)) {
                if (++i%1000 == 0 && (new Date()).getTime() - start > 200) {
                    if (has_progress) {
                        percent = toDouble(this$static.d.chunker.decoder.nowPos64) / toDouble(this$static.d.length_0);
                        /// If about 200 miliseconds have passed, update the progress.					
                        if (on_progress) {
                            on_progress(percent);
                        } else if (typeof callback_num !== "undefined") {
                            update_progress(percent, callback_num);
                        }
                    }
                    
                    /// This allows other code to run, like the browser to update.
                    wait(do_action, 0);
                    return false;
                }
            }
            
            if (has_progress) {
                if (on_progress) {
                    on_progress(1);
                } else if (typeof callback_num !== "undefined") {
                    update_progress(1, callback_num);
                }
            }
            
            res = decode($toByteArray(this$static.d.output));
            
            if (on_finish) {
                on_finish(res);
            } else if (typeof callback_num !== "undefined") {
                postMessage({
                    action: action_decompress,
                    callback_num: callback_num,
                    /// If the result is an array of integers (because it is binary), we need to use slice to make a copy of the data before it is returned from the Web Worker.
                    result: (typeof res !== "string" ? res.slice(0) : res)
                });
            }
        }
        
        do_action();
    }
    /** de */
    var LZMAJS = make_thing(0);
    
    function nullMethod() {}
    
    var _3B_classLit = createForArray("", "[B"),
        _3S_classLit = createForArray("", "[S"),
        /** cs */
        _3C_classLit = createForArray("", "[C"),
        _3I_classLit = createForArray("", "[I"),
        optimal_2_classLit = createForArray("[Ll.", "o"),
        bitTreeEncoder_2_classLit = createForArray("[Ll", "be"),
        _3J_classLit = createForArray("", "[J"),
        _3Z_classLit = createForArray("", "[Z"),
        encoder2_2_classLit = createForArray("[Ll.", "e"),
        /** ce */
        /** ds */
        bitTreeDecoder_2_classLit = createForArray("[Ll", "bd"),
        decoder2_2_classLit = createForArray("[Ll.", "d"),
        /** de */
        _3_3D_classLit = createForArray("", "[[D");
    
    /** cs */
    var get_mode_obj = (function () {
        var modes = [
                        {dicSize: 16, fb: 64,  matchFinder: 0, lc: 3, lp: 0, pb: 2},
                        {dicSize: 20, fb: 64,  matchFinder: 0, lc: 3, lp: 0, pb: 2},
                        {dicSize: 19, fb: 64,  matchFinder: 1, lc: 3, lp: 0, pb: 2},
                        {dicSize: 20, fb: 64,  matchFinder: 1, lc: 3, lp: 0, pb: 2},
                        {dicSize: 21, fb: 128, matchFinder: 1, lc: 3, lp: 0, pb: 2},
                        {dicSize: 22, fb: 128, matchFinder: 1, lc: 3, lp: 0, pb: 2},
                        {dicSize: 23, fb: 128, matchFinder: 1, lc: 3, lp: 0, pb: 2},
                        {dicSize: 24, fb: 255, matchFinder: 1, lc: 3, lp: 0, pb: 2},
                        {dicSize: 25, fb: 255, matchFinder: 1, lc: 3, lp: 0, pb: 2}
                    ];
        
        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        return function (mode) {
            if (!isNumber(mode)) {
                mode = 1;
            } else {
                if (mode < 1) {
                    mode = 1;
                } else if (mode > 9) {
                    mode = 9;
                }
            }
            
            return modes[mode - 1];
        };
    }());
    /** ce */
    
    /// Are we in a Web Worker?
    /// This seems to be the most reliable way to detect this.
    if (typeof onmessage !== "undefined" && (typeof window == "undefined" || typeof window.document == "undefined")) {
    (function create_onmessage() {
            /* jshint -W020 */
            /// Create the global onmessage function.
            onmessage = function (e) {
                if (e && e.data) {
                    /** xs */
                    if (e.data.action == action_decompress) {
                        LZMA.decompress(e.data.data, e.data.callback_num);
                    } else if (e.data.action == action_compress) {
                        LZMA.compress(e.data.data, e.data.mode, e.data.callback_num);
                    }
                    /** xe */
                    /// co:if (e.data.action == action_compress) {
                    /// co:    LZMA.compress(e.data.data, e.data.mode, e.data.callback_num);
                    /// co:}
                    /// do:if (e.data.action == action_decompress) {
                    /// do:    LZMA.decompress(e.data.data, e.data.callback_num);
                    /// do:}
                }
            };
        }());
    }
        
    return {
        /** xs */
        compress:   compress,
        decompress: decompress
        /** xe */
        /// co:compress:   compress
        /// do:decompress: decompress
    };
}());

/// Allow Node.js to be able to access this directly if it is included directly.
this.LZMA = LZMA;

/// This is used by browsers that do not support web workers.
this.LZMA_WORKER = LZMA;
