/// © 2015 Nathan Rugg <nmrugg@gmail.com> | MIT
/// See LICENSE for more details.

/* jshint boss:true, unused:true, undef:true, noarg: true, forin:true, -W041, -W021, worker:true, browser:true, node:true */

/* global setImmediate, setTimeout, window, onmessage */

var LZMA = (function () {
	var action_compress   = 1,
		action_decompress = 2,
		action_progress   = 3,
		wait = typeof setImmediate === "function" ? setImmediate : setTimeout,
		c = function () {return {typeName: String(this.typeId$)};},
		__prototype = "prototype",
		__4294967296 = 4294967296;
	
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
		P1000000_longLit = [16777216, 0],
		P7fffffffffffffff_longLit = [4294967295, 9223372032559808512];
	
	function Object_0() {
	}
	
	_ = Object_0[__prototype] = {};
	_.getClass$ = c;
	_.typeMarker$ = nullMethod;
	_.typeId$ = 1;
	
	function Throwable() {
	}
	
	_ = Throwable[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 3;
	_.detailMessage = null;
	
	function Exception() {
	}
	
	_ = Exception[__prototype] = new Throwable();
	_.getClass$ = c;
	_.typeId$ = 4;
	
	
	function RuntimeException() {
	}
	
	_ = RuntimeException[__prototype] = new Exception();
	_.getClass$ = c;
	_.typeId$ = 5;
	function $append(a, x) {
		a[a.explicitLength++] = x;
	}
	
	function $appendNonNull(a, x) {
		a[a.explicitLength++] = x;
	}
	
	function $toString(a) {
		var s_0, s;
		s_0 = (s = a.join('') , a.length = a.explicitLength = 0 , s);
		a[a.explicitLength++] = s_0;
		return s_0;
	}
	
	function createFromSeed(seedType, length_0) {
		var array = new Array(length_0);
		if (seedType > 0) {
			var value = [null, 0, false, [0, 0]][seedType];
			for (var i = 0; i < length_0; ++i) {
				array[i] = value;
			}
		}
		return array;
	}
	
	function getClass_2() {
		return this.arrayClass$;
	}
	
	function initDim(arrayClass, typeId, queryId, length_0, seedType) {
		var result;
		result = createFromSeed(seedType, length_0);
		$clinit_4();
		wrapArray(result, expandoNames_0, expandoValues_0);
		result.arrayClass$ = arrayClass;
		result.typeId$ = typeId;
		result.queryId$ = queryId;
		return result;
	}
	
	function initValues(arrayClass, typeId, queryId, array) {
		$clinit_4();
		wrapArray(array, expandoNames_0, expandoValues_0);
		array.arrayClass$ = arrayClass;
		array.typeId$ = typeId;
		array.queryId$ = queryId;
		return array;
	}
	
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
	
	function Array_0() {
	}
	
	_ = Array_0[__prototype] = new Object_0();
	_.getClass$ = getClass_2;
	_.typeId$ = 0;
	_.arrayClass$ = null;
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
	
	function InputStream() {
	}
	
	_ = InputStream[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 0;
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
	
	function $read(this$static) {
		if (this$static.pos >= this$static.count)
			return -1;
		return this$static.buf[this$static.pos++] & 255;
	}
	
	function ByteArrayInputStream() {
	}
	
	_ = ByteArrayInputStream[__prototype] = new InputStream();
	_.getClass$ = c;
	_.typeId$ = 0;
	_.buf = null;
	_.count = 0;
	_.pos = 0;
		
	function OutputStream() {
	}
	
	_ = OutputStream[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 0;
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
		
	function $write_0(this$static, buf, off, len) {
		$ensureCapacity(this$static, this$static.count + len);
		arraycopy(buf, off, this$static.buf, this$static.count, len);
		this$static.count += len;
	}
		
	function ByteArrayOutputStream() {
	}
	
	_ = ByteArrayOutputStream[__prototype] = new OutputStream();
	_.getClass$ = c;
	_.typeId$ = 0;
	_.buf = null;
	_.count = 0;
	function $IOException(this$static, message) {
		this$static.detailMessage = message;
		return this$static;
	}
		
	function IOException() {
	}
	
	_ = IOException[__prototype] = new Exception();
	_.getClass$ = c;
	_.typeId$ = 7;
	
	function ArithmeticException() {
	}
	
	_ = ArithmeticException[__prototype] = new RuntimeException();
	_.getClass$ = c;
	_.typeId$ = 8;
	function $ArrayStoreException(this$static, message) {
		this$static.detailMessage = message;
		return this$static;
	}
	
	
	function ArrayStoreException() {
	}
	
	_ = ArrayStoreException[__prototype] = new RuntimeException();
	_.getClass$ = c;
	_.typeId$ = 9;
	function createForArray(packageName, className) {
		var clazz;
		clazz = new Class();
		clazz.typeName = packageName + className;
		return clazz;
	}
	
	function Class() {
	}
	
	_ = Class[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 0;
	_.typeName = null;
	
	function ClassCastException() {
	}
	
	_ = ClassCastException[__prototype] = new RuntimeException();
	_.getClass$ = c;
	_.typeId$ = 12;
	
	function Enum() {
	}
	
	_ = Enum[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 0;	
	
	function IllegalArgumentException() {
	}
	
	_ = IllegalArgumentException[__prototype] = new RuntimeException();
	_.getClass$ = c;
	_.typeId$ = 13;
	
	function IllegalStateException() {
	}
	
	_ = IllegalStateException[__prototype] = new RuntimeException();
	_.getClass$ = c;
	_.typeId$ = 14;
	
	function IndexOutOfBoundsException() {
	}
	
	_ = IndexOutOfBoundsException[__prototype] = new RuntimeException();
	_.getClass$ = c;
	_.typeId$ = 15;
	function max(x, y) {
		return x > y?x:y;
	}
		
	
	function NullPointerException() {
	}
	
	_ = NullPointerException[__prototype] = new RuntimeException();
	_.getClass$ = c;
	_.typeId$ = 16;
	function $equals(this$static, other) {
		if (other == null) {
			return false;
		}
		return String(this$static) == other;
	}
	
	
	
	_ = String[__prototype];
	_.getClass$ = c;
	_.typeId$ = 2;
	function $StringBuilder(this$static) {
		var array;
		this$static.data = (array = [] , array.explicitLength = 0 , array);
		return this$static;
	}
	
	
	function StringBuilder() {
	}
	
	_ = StringBuilder[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 0;
	function arraycopy(src, srcOfs, dest, destOfs, len) {
		var destArray, destEnd, destTypeName, destlen, i, srcArray, srcTypeName, srclen;
		
		if (src == null || dest == null) {
			throw new NullPointerException();
		}
		
		srcTypeName  = (src.typeMarker$  == nullMethod || src.typeId$  == 2 ? src.getClass$()  : c()).typeName;
		destTypeName = (dest.typeMarker$ == nullMethod || dest.typeId$ == 2 ? dest.getClass$() : c()).typeName;
		
		if (srcTypeName.charCodeAt(0) != 91 || destTypeName.charCodeAt(0) != 91) {
			throw $ArrayStoreException(new ArrayStoreException(), 'Must be array types');
		}
		if (srcTypeName.charCodeAt(1) != destTypeName.charCodeAt(1)) {
			throw $ArrayStoreException(new ArrayStoreException(), 'Array types must match');
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
	
	function $execute_0(this$static) {
		try {
			return $processChunk(this$static.chunker);
		} catch (err) {
		  this$static.exception = err;
		  return false;
		}
	}
	
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
				throw $IOException(new IOException(), 'truncated input');
			properties[i] = r << 24 >> 24;
		}
		
		decoder = $Decoder(new Decoder());
		if (!$SetDecoderProperties(decoder, properties)) {
			throw $IOException(new IOException(), 'corrupted input');
		}
		for (i = 0; i < 64; i += 8) {
			r = $read(input);
			if (r == -1)
				throw $IOException(new IOException(), 'truncated input');
			r = r.toString(16);
			if (r.length == 1) r = "0" + r;
			hex_length = r + "" + hex_length;
		}
		
		/// Was the length set in the header (if it was compressed from a stream, the length is all f's).
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
	
	
	function LZMADecompressor() {
	}
	
	_ = LZMADecompressor[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 0;
	_.chunker = null;
	_.exception = null;
	_.length_0 = P0_longLit;
	function $LZMAByteArrayDecompressor(this$static, data) {
		this$static.output = $ByteArrayOutputStream(new ByteArrayOutputStream());
		$init_0(this$static, $ByteArrayInputStream(new ByteArrayInputStream(), data), this$static.output);
		return this$static;
	}
	
	
	function LZMAByteArrayDecompressor() {
	}
	
	_ = LZMAByteArrayDecompressor[__prototype] = new LZMADecompressor();
	_.getClass$ = c;
	_.typeId$ = 0;
	_.output = null;

	
		

	function InWindow() {
	}
	
	_ = InWindow[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 0;
	_._blockSize = 0;
	_._bufferBase = null;
	_._bufferOffset = 0;
	_._keepSizeAfter = 0;
	_._keepSizeBefore = 0;
	_._pointerToLastSafePosition = 0;
	_._pos = 0;
	_._posLimit = 0;
	_._stream = null;
	_._streamEndWasReached = false;
	_._streamPos = 0;

	

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
	
	
	function OutWindow() {
	}
	
	_ = OutWindow[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 0;
	_._buffer = null;
	_._pos = 0;
	_._stream = null;
	_._streamPos = 0;
	_._windowSize = 0;
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
	

	
	function $Chunker(this$static, decoder) {
		this$static.decoder = decoder;
		this$static.encoder = null;
		this$static.alive = true;
		return this$static;
	}
	
	function $processChunk(this$static) {
		var exception;
		if (!this$static.alive) {
			throw new IllegalStateException();
		}
		exception = true;
		try {
			if (this$static.encoder) {
				throw new Error("No encoding");
			} else {
				$processDecoderChunk(this$static);
			}
			exception = false;
			return this$static.alive;
		} finally {
			if (exception) {
				this$static.alive = false;
			}
		}
	}
	
	function $processDecoderChunk(this$static) {
		var result;
		result = $CodeOneChunk(this$static.decoder);
		if (result == -1) {
			throw $IOException(new IOException(), 'corrupted input');
		}
		this$static.inBytesProcessed = N1_longLit;
		this$static.outBytesProcessed = this$static.decoder.nowPos64;
		if (result == 1 || compare(this$static.decoder.outSize, P0_longLit) >= 0 && compare(this$static.decoder.nowPos64, this$static.decoder.outSize) >= 0) {
			$CodeFinish(this$static.decoder);
			this$static.alive = false;
		}
	}
	
	
	
	function Chunker() {
	}
	
	_ = Chunker[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 0;
	_.alive = false;
	_.decoder = null;
	_.encoder = null;
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
	
	
	function Decoder() {
	}
	
	_ = Decoder[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 0;
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
	
	
	function Decoder$LenDecoder() {
	}
	
	_ = Decoder$LenDecoder[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 0;
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
	
	
	function Decoder$LiteralDecoder() {
	}
	
	_ = Decoder$LiteralDecoder[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 0;
	_.m_Coders = null;
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
	
	function Decoder$LiteralDecoder$Decoder2() {
	}
	
	_ = Decoder$LiteralDecoder$Decoder2[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 17;

	
	

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
	
	function BitTreeDecoder() {
	}
	
	_ = BitTreeDecoder[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 20;
	_.Models = null;
	_.NumBitLevels = 0;
	
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
	
	function InitBitModels(probs) {
		var i;
		for (i = 0; i < probs.length; ++i) {
			probs[i] = 1024;
		}
	}
	
	function Decoder_0() {
	}
	
	_ = Decoder_0[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 0;
	_.Code = 0;
	_.Range = 0;
	_.Stream = null;
	
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
	
	
	function decode(utf) {
		var buf, i, x, y, z;
		buf = $StringBuilder(new StringBuilder());
		for (i = 0; i < utf.length; ++i) {
			x = utf[i] & 255;
			if ((x & 128) == 0) {
				if (x == 0) {
				    /// It appears that this is binary data, so it can't be converted to a string, so just send it back.
					return convert_binary_arr(utf);
				}
				$appendNonNull(buf.data, String.fromCharCode(x & 65535));
			} else if ((x & 224) == 192) {
				if (i + 1 >= utf.length) {
				    /// It appears that this is binary data, so it can't be converted to a string, so just send it back.
					return convert_binary_arr(utf);
				}
				y = utf[++i] & 255;
				if ((y & 192) != 128) {
					/// It appears that this is binary data, so it can't be converted to a string, so just send it back.
					return convert_binary_arr(utf);
				}
				$append(buf.data, String.fromCharCode((x & 31) << 6 & 65535 | y & 63));
			} else if ((x & 240) == 224) {
				if (i + 2 >= utf.length) {
					/// It appears that this is binary data, so it can't be converted to a string, so just send it back.
					return convert_binary_arr(utf);
				}
				y = utf[++i] & 255;
				if ((y & 192) != 128) {
					/// It appears that this is binary data, so it can't be converted to a string, so just send it back.
					return convert_binary_arr(utf);
				}
				z = utf[++i] & 255;
				if ((z & 192) != 128) {
					/// It appears that this is binary data, so it can't be converted to a string, so just send it back.
					return convert_binary_arr(utf);
				}
				$appendNonNull(buf.data, String.fromCharCode(((x & 15) << 12 | (y & 63) << 6 | z & 63) & 65535));
			} else {
				/// It appears that this is binary data, so it can't be converted to a string, so just send it back.
				return convert_binary_arr(utf);
			}
		}
		return $toString(buf.data);
	}
	

	function $LZMAJS(this$static) {
		return this$static;
	}
	function toDouble(a) {
		return a[1] + a[0];
	}
	
	function decompress() {
		var this$static = $LZMAJS(new LZMAJS()),
			percent,
			data,
			start,
			/// Arguments
			byte_arr = arguments[0],
			callback_num,
			on_finish,
			on_progress,
			has_progress;
		
		if (typeof arguments[1] === "function") {
			on_finish = arguments[1];
			if (typeof arguments[2] === "function") {
				on_progress = arguments[2];
			}
		} else {
			callback_num = arguments[1];
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
			var res;
			
			start = (new Date()).getTime();
			
			while ($execute_0(this$static.d)) {
				if ((new Date()).getTime() - start > 200) {
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
		
		wait(do_action, 0);
	}
	
	function LZMAJS () {}
	
	_ = LZMAJS[__prototype] = new Object_0();
	_.getClass$ = c;
	_.typeId$ = 0;
	_.c = null;
	_.d = null;
	
	function nullMethod() {
	}
	
	var _3_3D_classLit = createForArray('', '[[D'),
		_3B_classLit = createForArray('', '[B'),
		_3S_classLit = createForArray('', '[S'),
		bitTreeDecoder_2_classLit = createForArray('[Ll', 'bd'),
		decoder2_2_classLit = createForArray('[Ll.', 'd');
	
	
	/// Are we in a Web Worker?
	/// This seems to be the most reliable way to detect this.
	if (typeof onmessage !== "undefined" && (typeof window === "undefined" || typeof window.document === "undefined")) {
	   (function create_onmessage() {
	        /* jshint -W020 */
            /// Create the global onmessage function.
            onmessage = function (e) {
                if (e && e.data) {
                    if (e.data.action === action_compress) {
                        LZMA.compress(e.data.data, e.data.mode, e.data.callback_num);
                    } else if (e.data.action === action_decompress) {
                        LZMA.decompress(e.data.data, e.data.callback_num);
                    }
                }
            };
        }());
    }
		
	return {
		decompress: decompress
	};
}());

/// Allow Node.js to be able to access this directly if it is included directly.
this.LZMA = LZMA;

/// This is used by browsers that do not support web workers.
this.LZMA_WORKER = LZMA;
