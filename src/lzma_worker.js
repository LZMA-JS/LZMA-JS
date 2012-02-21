var LZMA,
	action_compress   = 1,
	action_decompress = 2,
	action_update	 = 3;

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
var $Class;
(function () {
	var initializing = false,
		fnTest = /xyz/.test(function () { return 'xyz'; }) ? /\b_super\b/ : /.*/;
	// The base Class implementation (does nothing)
	$Class = function () {};

	// Create a new Class that inherits from this class
	$Class.extend = function (prop) {
		var _super = this.prototype, name, prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" && 
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function (name, fn) {
					return function () {
						var tmp = this._super, ret;
			
						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];
			
						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						ret = fn.apply(this, arguments);        
						this._super = tmp;
			
						return ret;
					};
				}(name, prop[name])) :
				prop[name];
		}

		// The dummy class constructor
		function $Class() {
			// All construction is actually done in the init method
			if (!initializing && this.init) {
				if (this.initialize) {
					this.initialize.apply(this, arguments);
				}
				this.init.apply(this, arguments);
			}
		}

		// Populate our constructed prototype object
		$Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		$Class.constructor = $Class;

		// And make this class extendable
		$Class.extend = arguments.callee;

		return $Class;
	};
}());

function update_progress(percent, callback_num) {
	///TODO: Calculate ETA.
	postMessage({
		action: 3,
		callback_num: callback_num,
		result: percent
	});
}

LZMA = (function () {
	var Class = $Class.extend({
		getClass$: getClass_11,
		typeMarker$: nullMethod,
		typeId$: 0,
		typeName: null
	});
	
	function createForClass(packageName, className) {
		var clazz;
		clazz = new Class();
		clazz.typeName = packageName + className;
		return clazz;
	}
	
	function createForArray(packageName, className) {
		var clazz;
		clazz = new Class();
		clazz.typeName = packageName + className;
		return clazz;
	}
	
	var Ljava_lang_Throwable_2_classLit = createForClass('java.lang.', 'Throwable'),
		Ljava_lang_Exception_2_classLit = createForClass('java.lang.', 'Exception'),
		Ljava_lang_RuntimeException_2_classLit = createForClass('java.lang.', 'RuntimeException'),
		Lcom_google_gwt_core_client_JavaScriptException_2_classLit = createForClass('com.google.gwt.core.client.', 'JavaScriptException'),
		Lcom_google_gwt_core_client_JavaScriptObject_2_classLit = createForClass('com.google.gwt.core.client.', 'JavaScriptObject$'),
		_3_3D_classLit = createForArray('', '[[D'),
		Ljava_io_InputStream_2_classLit = createForClass('java.io.', 'InputStream'),
		Ljava_io_ByteArrayInputStream_2_classLit = createForClass('java.io.', 'ByteArrayInputStream'),
		_3B_classLit = createForArray('', '[B'),
		Ljava_io_OutputStream_2_classLit = createForClass('java.io.', 'OutputStream'),
		Ljava_io_ByteArrayOutputStream_2_classLit = createForClass('java.io.', 'ByteArrayOutputStream'),
		Ljava_io_IOException_2_classLit = createForClass('java.io.', 'IOException'),
		Ljava_lang_ArithmeticException_2_classLit = createForClass('java.lang.', 'ArithmeticException'),
		Ljava_lang_ArrayStoreException_2_classLit = createForClass('java.lang.', 'ArrayStoreException'),
		_3C_classLit = createForArray('', '[C'),
		Ljava_lang_Class_2_classLit = createForClass('java.lang.', 'Class'),
		Ljava_lang_ClassCastException_2_classLit = createForClass('java.lang.', 'ClassCastException'),
		Ljava_lang_IllegalArgumentException_2_classLit = createForClass('java.lang.', 'IllegalArgumentException'),
		Ljava_lang_IllegalStateException_2_classLit = createForClass('java.lang.', 'IllegalStateException'),
		Ljava_lang_IndexOutOfBoundsException_2_classLit = createForClass('java.lang.', 'IndexOutOfBoundsException'),
		_3I_classLit = createForArray('', '[I'),
		Ljava_lang_NullPointerException_2_classLit = createForClass('java.lang.', 'NullPointerException'),
		Ljava_lang_String_2_classLit = createForClass('java.lang.', 'String'),
		Ljava_lang_StringBuilder_2_classLit = createForClass('java.lang.', 'StringBuilder'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_LZ_InWindow_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZ.', 'InWindow'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_LZ_BinTree_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZ.', 'BinTree'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_LZ_OutWindow_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZ.', 'OutWindow'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Chunker_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Chunker'),
		_3S_classLit = createForArray('', '[S'),
		_3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeDecoder_2_classLit = createForArray('[Lorg.dellroad.lzma.client.SevenZip.Compression.RangeCoder.', 'BitTreeDecoder;'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Decoder'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LenDecoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Decoder$LenDecoder'),
		_3Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LiteralDecoder$Decoder2_2_classLit = createForArray('[Lorg.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Decoder$LiteralDecoder$Decoder2;'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LiteralDecoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Decoder$LiteralDecoder'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LiteralDecoder$Decoder2_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Decoder$LiteralDecoder$Decoder2'),
		_3Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$Optimal_2_classLit = createForArray('[Lorg.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder$Optimal;'),
		_3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeEncoder_2_classLit = createForArray('[Lorg.dellroad.lzma.client.SevenZip.Compression.RangeCoder.', 'BitTreeEncoder;'),
		_3J_classLit = createForArray('', '[J'),
		_3Z_classLit = createForArray('', '[Z'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder'),
		_3Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LiteralEncoder$Encoder2_2_classLit = createForArray('[Lorg.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder$LiteralEncoder$Encoder2;'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LiteralEncoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder$LiteralEncoder'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LiteralEncoder$Encoder2_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder$LiteralEncoder$Encoder2'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LenEncoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder$LenEncoder'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LenPriceTableEncoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder$LenPriceTableEncoder'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$Optimal_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.LZMA.', 'Encoder$Optimal'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeDecoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.RangeCoder.', 'BitTreeDecoder'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeEncoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.RangeCoder.', 'BitTreeEncoder'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_Decoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.RangeCoder.', 'Decoder'),
		Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_Encoder_2_classLit = createForClass('org.dellroad.lzma.client.SevenZip.Compression.RangeCoder.', 'Encoder'),
		Lorg_dellroad_lzma_client_LZMACompressor_2_classLit = createForClass('org.dellroad.lzma.client.', 'LZMACompressor'),
		Lorg_dellroad_lzma_client_LZMAByteArrayCompressor_2_classLit = createForClass('org.dellroad.lzma.client.', 'LZMAByteArrayCompressor'),
		Lorg_dellroad_lzma_client_LZMADecompressor_2_classLit = createForClass('org.dellroad.lzma.client.', 'LZMADecompressor'),
		Lorg_dellroad_lzma_client_LZMAByteArrayDecompressor_2_classLit = createForClass('org.dellroad.lzma.client.', 'LZMAByteArrayDecompressor'),
		Lorg_dellroad_lzma_demo_client_LZMADemo_2_classLit = createForClass('org.dellroad.lzma.demo.client.', 'LZMADemo');

	var g_FastPos;

	var CrcTable;

	var N8000000000000000_longLit = [0, -9223372036854775808],
		N1_longLit = [4294967295, -4294967296],
		P0_longLit = [0, 0],
		P1_longLit = [1, 0],
		P4_longLit = [4, 0],
		P1000_longLit = [4096, 0],
		Pffffff_longLit = [16777215, 0],
		P1000000_longLit = [16777216, 0],
		Pff000000_longLit = [4278190080, 0],
		Pffffffff_longLit = [4294967295, 0],
		P7fffffffffffffff_longLit = [4294967295, 9223372032559808512];

	var ProbPrices;

	var expandoNames_0, expandoValues_0;

	var typeIdArray = [
			{},
			{},
			{1: 1},
			{2: 1},
			{2: 1},
			{2: 1},
			{2: 1},
			{2: 1, 10: 1},
			{2: 1},
			{2: 1},
			{2: 1},
			{2: 1},
			{2: 1},
			{2: 1, 11: 1},
			{2: 1},
			{2: 1},
			{2: 1},
			{4: 1},
			{5: 1},
			{6: 1},
			{7: 1},
			{8: 1},
			{9: 1}
		];

	var dontExecute = {};

	function nullMethod() {
	}
		
	function getClass_22() {
		return Ljava_lang_Throwable_2_classLit;
	}
	
	function getClass_13() {
		return Ljava_lang_Exception_2_classLit;
	}
	
	function getClass_19() {
		return Ljava_lang_RuntimeException_2_classLit;
	}
	
	function getClass_0() {
		return Lcom_google_gwt_core_client_JavaScriptException_2_classLit;
	}
	
	var Throwable = $Class.extend({
		getClass$: getClass_22,
		typeMarker$: nullMethod,
		typeId$: 3,
		detailMessage: null
	});
	
	var Exception = Throwable.extend({
		getClass$: getClass_13,
		typeId$: 4
	});
	
	var RuntimeException = Exception.extend({
		init: function (message) {
			this.detailMessage = message;
		},
		getClass$: getClass_19,
		typeId$: 5
	});
	
	var JavaScriptException = RuntimeException.extend({
		getClass$: getClass_0,
		typeId$: 6
	});
	
	var ArithmeticException = RuntimeException.extend({
		init: function (explanation) {
			this.detailMessage = explanation;
		},
		getClass$: getClass_8,
		typeId$: 8
	});
	
	var NullPointerException = RuntimeException.extend({
		getClass$: getClass_17,
		typeId$: 16
	});
	
	var IOException = Exception.extend({
		init: function (message) {
			this.detailMessage = message;
		},
		getClass$: getClass_5,
		typeId$: 7
	});
	
	var IllegalArgumentException = RuntimeException.extend({
		init: function (message) {
			this.detailMessage = message;
		},
		getClass$: getClass_14,
		typeId$: 13
	});
	
	var IllegalStateException = RuntimeException.extend({
		getClass$: getClass_15,
		typeId$: 14
	});
	
	var IndexOutOfBoundsException = RuntimeException.extend({
		getClass$: getClass_16,
		typeId$: 15
	});
	
	var ArrayStoreException = RuntimeException.extend({
		init: function (message) {
			this.detailMessage = message;
		},
		getClass$: getClass_9,
		typeId$: 9
	});
	
	var ClassCastException = RuntimeException.extend({
		getClass$: getClass_10,
		typeId$: 12
	});
	
	var OutputStream = $Class.extend({
		getClass$: getClass_7,
		typeMarker$: nullMethod,
		typeId$: 0
	});
	
	function initExpandos(protoType, expandoNames, expandoValues) {
		var i = 0, value, name_0;
		for (name_0 in protoType) {
			value = protoType[name_0];
			if (value) {
				expandoNames[i] = name_0;
				expandoValues[i] = value;
				i += 1;
			}
		}
	}

	var Array_0 = $Class.extend({
		getClass$: getClass_2,
		typeMarker$: nullMethod,
		typeId$: 0,
		arrayClass$: null,
		length: 0,
		queryId$: 0
	});
	
	function $clinit_4() {
		if (dontExecute.$clinit_4) {
			return;
		}
		dontExecute.$clinit_4 = true;
		expandoNames_0 = [];
		expandoValues_0 = [];
		initExpandos(new Array_0(), expandoNames_0, expandoValues_0);
	}

	function wrapArray(array, expandoNames, expandoValues) {
		var i, c;

		$clinit_4();
		for (i = 0, c = expandoNames.length; i < c; i += 1) {
			array[expandoNames[i]] = expandoValues[i];
		}
	}
	
	function createFromSeed(seedType, length_0) {
		var array = [],
			value,
			i;

		if (seedType > 0) {
			value = [null, 0, false, [0, 0]][seedType];
			for (i = 0; i < length_0; i += 1) {
				array[i] = value;
			}
		}
		return array;
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
	
	function canCastUnsafe(srcId, dstId) {
		return srcId && typeIdArray[srcId][dstId];
	}
	
	function makeFromBits(highBits, lowBits) {
		var high, low;
		high = highBits * 4294967296;
		low = lowBits;
		if (lowBits < 0) {
			low += 4294967296;
		}
		return [low, high];
	}
	
	function create(valueLow, valueHigh) {
		var diffHigh, diffLow;
		valueHigh %= 1.8446744073709552E19;
		valueLow %= 1.8446744073709552E19;
		diffHigh = valueHigh % 4294967296;
		diffLow = Math.floor(valueLow / 4294967296) * 4294967296;
		valueHigh = valueHigh - diffHigh + diffLow;
		valueLow = valueLow - diffLow + diffHigh;
		while (valueLow < 0) {
			valueLow += 4294967296;
			valueHigh -= 4294967296;
		}
		while (valueLow > 4294967295) {
			valueLow -= 4294967296;
			valueHigh += 4294967296;
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
	
	function lowBits_0(a) {
		if (a[0] >= 2147483648) {
			return ~~Math.max(Math.min(a[0] - 4294967296, 2147483647), -2147483648);
		} else {
			return ~~Math.max(Math.min(a[0], 2147483647), -2147483648);
		}
	}
	
	var LN_2, MAX_VALUE, MIN_VALUE, NEG_ONE, ONE, TWO, TWO_PWR_24, ZERO;

	var boxedValues;

	function $clinit_9() {
		if (dontExecute.$clinit_9) {
			return;
		}
		dontExecute.$clinit_9 = true;
		boxedValues = initDim(_3_3D_classLit, 0, 9, 256, 0);
	}
	
	function internalFromInt(value) {
		if (value >= 0) {
			return [value, 0];
		} else {
			return [value + 4294967296, -4294967296];
		}
	}
	
	function fromInt(value) {
		var rebase, result;
		if (value > -129 && value < 128) {
			rebase = value + 128;
			$clinit_9();
			result = boxedValues[rebase];
			if (result == null) {
				boxedValues[rebase] = internalFromInt(value);
				result = boxedValues[rebase];
			}
			return result;
		}
		return internalFromInt(value);
	}
	
	function $clinit_10() {
		if (dontExecute.$clinit_10) {
			return;
		}
		dontExecute.$clinit_10 = true;
		LN_2 = Math.log(2);
		MAX_VALUE = P7fffffffffffffff_longLit;
		MIN_VALUE = N8000000000000000_longLit;
		NEG_ONE = fromInt(-1);
		ONE = fromInt(1);
		TWO = fromInt(2);
		TWO_PWR_24 = P1000000_longLit;
		ZERO = fromInt(0);
	}
	
	function $append(a, x) {
		a[a.explicitLength] = x;
		a.explicitLength += 1;
	}
	
	function $appendNonNull(a, x) {
		a[a.explicitLength] = x;
		a.explicitLength += 1;
	}
	
	function $toString(a) {
		var s_0,
			s;
		
		s = a.join('');
		a.length = 0;
		a.explicitLength = 0;
		s_0 = s;
		a[a.explicitLength] = s_0;
		a.explicitLength += 1;
		return s_0;
	}
	
	function getClass_2() {
		return this.arrayClass$;
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
		array[index] = value;
		return value;
	}
	
	
	function canCast(srcId, dstId) {
		return srcId && !!typeIdArray[srcId][dstId];
	}
	
	function dynamicCast(src, dstId) {
		if (src != null && !canCastUnsafe(src.typeId$, dstId)) {
			throw new ClassCastException();
		}
		return src;
	}
	
	function instanceOf(src, dstId) {
		return src != null && canCast(src.typeId$, dstId);
	}
	
	function round_int(x) {
		return ~~Math.max(Math.min(x, 2147483647), -2147483648);
	}
	
	function caught(e) {
		if (e != null && canCast(e.typeId$, 2)) {
			return e;
		}
		return new JavaScriptException(e);
	}
	
	function add(a, b) {
		var newHigh, newLow;
		newHigh = a[1] + b[1];
		newLow = a[0] + b[0];
		return create(newLow, newHigh);
	}
	
	function addTimes(accum, a, b) {
		if (a == 0) {
			return accum;
		}
		if (b == 0) {
			return accum;
		}
		return add(accum, create(a * b, 0));
	}
	
	function and(a, b) {
		return makeFromBits(~~Math.max(Math.min(a[1] / 4294967296, 2147483647), -2147483648) & ~~Math.max(Math.min(b[1] / 4294967296, 2147483647), -2147483648), lowBits_0(a) & lowBits_0(b));
	}
	
	function sub(a, b) {
		var newHigh, newLow;
		newHigh = a[1] - b[1];
		newLow = a[0] - b[0];
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
		} else {
			return 1;
		}
	}
	
	function eq(a, b) {
		return a[0] == b[0] && a[1] == b[1];
	}
	
	function pwrAsDouble(n) {
		if (n <= 30) {
			return 1 << n;
		} else {
			return pwrAsDouble(30) * pwrAsDouble(n - 30);
		}
	}
	
	function shr(a, n) {
		var newHigh, newLow, shiftFact;
		n &= 63;
		shiftFact = pwrAsDouble(n);
		newHigh = a[1] / shiftFact;
		newLow = Math.floor(a[0] / shiftFact);
		return create(newLow, newHigh);
	}
	
	function neg(a) {
		var newHigh, newLow;
		$clinit_10();
		if (eq(a, MIN_VALUE)) {
			return MIN_VALUE;
		}
		newHigh = -a[1];
		newLow = -a[0];
		if (newLow > 4294967295) {
			newLow -= 4294967296;
			newHigh += 4294967296;
		}
		if (newLow < 0) {
			newLow += 4294967296;
			newHigh -= 4294967296;
		}
		return [newLow, newHigh];
	}
	
	function shl(a, n) {
		var diff, newHigh, newLow, twoToN;
		n &= 63;
		$clinit_10();
		if (eq(a, MIN_VALUE)) {
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
		diff = newLow - newLow % 4294967296;
		newHigh += diff;
		newLow -= diff;
		if (newHigh >= 9223372036854775807) {
			newHigh -= 1.8446744073709552E19;
		}
		return [newLow, newHigh];
	}
	
	function fromDouble(value) {
		if (isNaN(value)) {
			$clinit_10();
			return ZERO;
		}
		if (value < -9223372036854775808) {
			$clinit_10();
			return MIN_VALUE;
		}
		if (value >= 9223372036854775807) {
			$clinit_10();
			return MAX_VALUE;
		}
		if (value > 0) {
			return create(Math.floor(value), 0);
		} else {
			return create(Math.ceil(value), 0);
		}
	}
	
	function toDoubleRoundDown(a) {
		var diff, magnitute, toSubtract;
		$clinit_10();
		magnitute = round_int(Math.log(a[1]) / LN_2);
		if (magnitute <= 48) {
			return a[1] + a[0];
		} else {
			diff = magnitute - 48;
			toSubtract = (1 << diff) - 1;
			return a[1] + (a[0] - toSubtract);
		}
	}
	
	function toDoubleRoundUp(a) {
		var diff, magnitute, toAdd;
		$clinit_10();
		magnitute = round_int(Math.log(a[1]) / LN_2);
		if (magnitute <= 48) {
			return a[1] + a[0];
		} else {
			diff = magnitute - 48;
			toAdd = (1 << diff) - 1;
			return a[1] + (a[0] + toAdd);
		}
	}
	
	function multByMinValue(a) {
		if ((lowBits_0(a) & 1) == 1) {
			$clinit_10();
			return MIN_VALUE;
		} else {
			$clinit_10();
			return ZERO;
		}
	}
	
	function mul(a, b) {
		var a1, a2, a3, a4, b1, b2, b3, b4, res;
		if (a[0] == 0 && a[1] == 0) {
			$clinit_10();
			return ZERO;
		}
		if (b[0] == 0 && b[1] == 0) {
			$clinit_10();
			return ZERO;
		}
		$clinit_10();
		if (eq(a, MIN_VALUE)) {
			return multByMinValue(b);
		}
		if (eq(b, MIN_VALUE)) {
			return multByMinValue(a);
		}
		if (a[1] < 0) {
			if (b[1] < 0) {
				return mul(neg(a), neg(b));
			} else {
				return neg(mul(neg(a), b));
			}
		}
		if (b[1] < 0) {
			return neg(mul(a, neg(b)));
		}
		if (compare(a, TWO_PWR_24) < 0 && compare(b, TWO_PWR_24) < 0) {
			return create((a[1] + a[0]) * (b[1] + b[0]), 0);
		}
		a3 = a[1] % 281474976710656;
		a4 = a[1] - a3;
		a1 = a[0] % 65536;
		a2 = a[0] - a1;
		b3 = b[1] % 281474976710656;
		b4 = b[1] - b3;
		b1 = b[0] % 65536;
		b2 = b[0] - b1;
		res = ZERO;
		res = addTimes(res, a4, b1);
		res = addTimes(res, a3, b2);
		res = addTimes(res, a3, b1);
		res = addTimes(res, a2, b3);
		res = addTimes(res, a2, b2);
		res = addTimes(res, a2, b1);
		res = addTimes(res, a1, b4);
		res = addTimes(res, a1, b3);
		res = addTimes(res, a1, b2);
		res = addTimes(res, a1, b1);
		return res;
	}
	
	function div(a, b) {
		var approx, deltaRem, deltaResult, halfa, rem, result;
		if (b[0] == 0 && b[1] == 0) {
			throw new ArithmeticException('/ by zero');
		}
		if (a[0] == 0 && a[1] == 0) {
			$clinit_10();
			return ZERO;
		}
		$clinit_10();
		if (eq(a, MIN_VALUE)) {
			if (eq(b, ONE) || eq(b, NEG_ONE)) {
				return MIN_VALUE;
			}
			halfa = shr(a, 1);
			approx = shl(div(halfa, b), 1);
			rem = sub(a, mul(b, approx));
			return add(approx, div(rem, b));
		}
		if (eq(b, MIN_VALUE)) {
			return ZERO;
		}
		if (a[1] < 0) {
			if (b[1] < 0) {
				return div(neg(a), neg(b));
			} else {
				return neg(div(neg(a), b));
			}
		}
		if (b[1] < 0) {
			return neg(div(a, neg(b)));
		}
		result = ZERO;
		rem = a;
		while (compare(rem, b) >= 0) {
			deltaResult = fromDouble(Math.floor(toDoubleRoundDown(rem) / toDoubleRoundUp(b)));
			if (deltaResult[0] == 0 && deltaResult[1] == 0) {
				deltaResult = ONE;
			}
			deltaRem = mul(deltaResult, b);
			result = add(result, deltaResult);
			rem = sub(rem, deltaRem);
		}
		return result;
	}
	
	function shru(a, n) {
		var sr;
		n &= 63;
		sr = shr(a, n);
		if (a[1] < 0) {
			$clinit_10();
			sr = add(sr, shl(TWO, 63 - n));
		}
		return sr;
	}
	
	function toString_0(a) {
		var digits, rem, remDivTenPower, res, tenPowerLong, zeroesNeeded;
		if (a[0] == 0 && a[1] == 0) {
			return '0';
		}
		$clinit_10();
		if (eq(a, MIN_VALUE)) {
			return '-9223372036854775808';
		}
		if (a[1] < 0) {
			return '-' + toString_0(neg(a));
		}
		rem = a;
		res = '';
		while (!(rem[0] == 0 && rem[1] == 0)) {
			tenPowerLong = fromInt(1000000000);
			remDivTenPower = div(rem, tenPowerLong);
			digits = String(lowBits_0(sub(rem, mul(remDivTenPower, tenPowerLong))));
			rem = remDivTenPower;
			if (!(rem[0] == 0 && rem[1] == 0)) {
				zeroesNeeded = 9 - digits.length;
				for (; zeroesNeeded > 0; zeroesNeeded -= 1) {
					digits = '0' + digits;
				}
			}
			res = digits + res;
		}
		return res;
	}
	
	function getClass_6() {
		return Ljava_io_InputStream_2_classLit;
	}
	
	var InputStream = $Class.extend({
		getClass$: getClass_6,
		typeMarker$: nullMethod,
		typeId$: 0
	});
	
	function getClass_3() {
		return Ljava_io_ByteArrayInputStream_2_classLit;
	}
	
	var ByteArrayInputStream = InputStream.extend({
		init: function (buf, off, len) {
			len = len || buf.length;
			off = off || 0;

			this.buf = buf;
			this.pos = off;
			this.count = off + len;
			if (this.count > buf.length) {
				this.count = buf.length;
			}
		},
		getClass$: getClass_3,
		typeId$: 0,
		buf: null,
		count: 0,
		pos: 0
	});
	
	function $read(this$static) {
		var ret;
		if (this$static.pos >= this$static.count) {
			return -1;
		}
		ret = this$static.buf[this$static.pos] & 255;
		this$static.pos += 1;
		return ret;
	}
	
	function getClass_7() {
		return Ljava_io_OutputStream_2_classLit;
	}
	
	function $equals(this$static, other) {
		if (other == null) {
			return false;
		}
		return String(this$static) == other;
	}
	
	function $getChars(this$static, srcBegin, srcEnd, dst, dstBegin) {
		var srcIdx;
		for (srcIdx = srcBegin; srcIdx < srcEnd; srcIdx += 1) {
			dst[dstBegin] = this$static.charCodeAt(srcIdx);
			dstBegin += 1;
		}
	}
	
	function arraycopy(src, srcOfs, dest, destOfs, len) {
		var destArray, destEnd, destTypeName, destlen, i, srcArray, srcTypeName, srclen;
		
		if (src == null || dest == null) {
			throw new NullPointerException();
		}
		
		srcTypeName  = (src.typeMarker$  == nullMethod || src.typeId$  == 2 ? src.getClass$()  : Lcom_google_gwt_core_client_JavaScriptObject_2_classLit).typeName;
		destTypeName = (dest.typeMarker$ == nullMethod || dest.typeId$ == 2 ? dest.getClass$() : Lcom_google_gwt_core_client_JavaScriptObject_2_classLit).typeName;
		
		if (srcTypeName.charCodeAt(0) != 91 || destTypeName.charCodeAt(0) != 91) {
			throw new ArrayStoreException('Must be array types');
		}
		if (srcTypeName.charCodeAt(1) != destTypeName.charCodeAt(1)) {
			throw new ArrayStoreException('Array types must match');
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
					srcOfs -= 1;
					setCheck(destArray, destEnd, srcArray[srcOfs]);
				}
			} else {
				for (destEnd = destOfs + len; destOfs < destEnd;) {
					setCheck(destArray, destOfs, srcArray[srcOfs]);
					destOfs += 1;
					srcOfs += 1;
				}
			}
		} else {
			for (i = 0; i < len; i += 1) {
				dest[destOfs + i] = src[srcOfs + i];
			}
		}
	}
	
	function $read_0(this$static, buf, off, len) {
		if (this$static.pos >= this$static.count) {
			return -1;
		}
		len = Math.min(len, this$static.count - this$static.pos);
		arraycopy(this$static.buf, this$static.pos, buf, off, len);
		this$static.pos += len;
		return len;
	}

	function $ensureCapacity(this$static, len) {
		var newbuf;
		if (len <= this$static.buf.length) {
			return;
		}
		len = Math.max(len, this$static.buf.length * 2);
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
	
	function $write(this$static, b) {
		$ensureCapacity(this$static, this$static.count + 1);
		this$static.buf[this$static.count] = b << 24 >> 24;
		this$static.count += 1;
	}
	
	function $write_0(this$static, buf, off, len) {
		$ensureCapacity(this$static, this$static.count + len);
		arraycopy(buf, off, this$static.buf, this$static.count, len);
		this$static.count += len;
	}
	
	function getClass_4() {
		return Ljava_io_ByteArrayOutputStream_2_classLit;
	}
	
	var ByteArrayOutputStream = OutputStream.extend({
		init: function () {
			this.buf = initDim(_3B_classLit, 0, -1, 32, 1);
		},
		getClass$: getClass_4,
		typeId$: 0,
		buf: null,
		count: 0
	});
	
	function getClass_5() {
		return Ljava_io_IOException_2_classLit;
	}
	
	function getClass_8() {
		return Ljava_lang_ArithmeticException_2_classLit;
	}
	
	function getClass_9() {
		return Ljava_lang_ArrayStoreException_2_classLit;
	}
	
	function getClass_11() {
		return Ljava_lang_Class_2_classLit;
	}
	
	function getClass_10() {
		return Ljava_lang_ClassCastException_2_classLit;
	}
	
	function getClass_14() {
		return Ljava_lang_IllegalArgumentException_2_classLit;
	}
	
	function getClass_15() {
		return Ljava_lang_IllegalStateException_2_classLit;
	}
	
	function getClass_16() {
		return Ljava_lang_IndexOutOfBoundsException_2_classLit;
	}
	
	function getClass_17() {
		return Ljava_lang_NullPointerException_2_classLit;
	}
	
	function getClass_21() {
		return Ljava_lang_String_2_classLit;
	}
	
	String.prototype.getClass$ = getClass_21;
	String.prototype.typeId$ = 2;
	
	function getClass_20() {
		return Ljava_lang_StringBuilder_2_classLit;
	}
	
	var StringBuilder = $Class.extend({
		init: function () {
			var array = [];
			array.explicitLength = 0;

			this.data = array;
		},
		getClass$: getClass_20,
		typeMarker$: nullMethod,
		typeId$: 0
	});
	
	
	function $configure(this$static, encoder) {
		if (!encoder.SetDictionarySize(1 << this$static.dictionarySize)) {
			throw new RuntimeException('unexpected failure');
		}
		if (!encoder.SetNumFastBytes(this$static.fb)) {
			throw new RuntimeException('unexpected failure');
		}
		if (!encoder.SetMatchFinder(this$static.matchFinder)) {
			throw new RuntimeException('unexpected failure');
		}
		if (!encoder.SetLcLpPb(this$static.lc, this$static.lp, this$static.pb)) {
			throw new RuntimeException('unexpected failure');
		}
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
	
	function GetLenToPosState(len) {
		len -= 2;
		if (len < 4) {
			return len;
		}
		return 3;
	}

	var BitTreeDecoder = $Class.extend({
		init: function (numBitLevels) {
			this.NumBitLevels = numBitLevels;
			this.Models = initDim(_3S_classLit, 0, -1, 1 << numBitLevels, 1);
		},
		getClass$: getClass_42,
		typeMarker$: nullMethod,
		typeId$: 20,
		Models: null,
		NumBitLevels: 0,
		ReverseDecode: function (rangeDecoder) {
			return BitTreeDecoder.ReverseDecode(this.Models, 0, rangeDecoder, this.NumBitLevels);
		},
		Decode: function (rangeDecoder) {
			var bitIndex, m;
			m = 1;
			for (bitIndex = this.NumBitLevels; bitIndex != 0; bitIndex -= 1) {
				m = (m << 1) + rangeDecoder.DecodeBit(this.Models, m);
			}
			return m - (1 << this.NumBitLevels);
		}
	});

	// Static members
	BitTreeDecoder.ReverseDecode = function (Models, startIndex, rangeDecoder, NumBitLevels) {
		var bit, bitIndex, m, symbol;
		m = 1;
		symbol = 0;
		for (bitIndex = 0; bitIndex < NumBitLevels; bitIndex += 1) {
			bit = rangeDecoder.DecodeBit(Models, startIndex + m);
			m <<= 1;
			m += bit;
			symbol |= bit << bitIndex;
		}
		return symbol;
	};

	function $CodeOneChunk(this$static) {
		var decoder2, distance, len, numDirectBits, posSlot, posState;
		posState = lowBits_0(this$static.nowPos64) & this$static.m_PosStateMask;
		if (this$static.m_RangeDecoder.DecodeBit(this$static.m_IsMatchDecoders, (this$static.state << 4) + posState) == 0) {
			decoder2 = this$static.m_LiteralDecoder.GetDecoder(lowBits_0(this$static.nowPos64), this$static.prevByte);
			if (this$static.state < 7) {
				this$static.prevByte = decoder2.DecodeNormal(this$static.m_RangeDecoder);
			} else {
				this$static.prevByte = decoder2.DecodeWithMatchByte(this$static.m_RangeDecoder, this$static.m_OutWindow.GetByte(this$static.rep0));
			}
			this$static.m_OutWindow.PutByte(this$static.prevByte);
			this$static.state = StateUpdateChar(this$static.state);
			this$static.nowPos64 = add(this$static.nowPos64, P1_longLit);
		} else {
			if (this$static.m_RangeDecoder.DecodeBit(this$static.m_IsRepDecoders, this$static.state) == 1) {
				len = 0;
				if (this$static.m_RangeDecoder.DecodeBit(this$static.m_IsRepG0Decoders, this$static.state) == 0) {
					if (this$static.m_RangeDecoder.DecodeBit(this$static.m_IsRep0LongDecoders, (this$static.state << 4) + posState) == 0) {
						this$static.state = this$static.state < 7 ? 9 : 11;
						len = 1;
					}
				} else {
					if (this$static.m_RangeDecoder.DecodeBit(this$static.m_IsRepG1Decoders, this$static.state) == 0) {
						distance = this$static.rep1;
					} else {
						if (this$static.m_RangeDecoder.DecodeBit(this$static.m_IsRepG2Decoders, this$static.state) == 0) {
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
					len = this$static.m_RepLenDecoder.Decode(this$static.m_RangeDecoder, posState) + 2;
					this$static.state = this$static.state < 7 ? 8 : 11;
				}
			} else {
				this$static.rep3 = this$static.rep2;
				this$static.rep2 = this$static.rep1;
				this$static.rep1 = this$static.rep0;
				len = 2 + this$static.m_LenDecoder.Decode(this$static.m_RangeDecoder, posState);
				this$static.state = this$static.state < 7 ? 7 : 10;
				posSlot = this$static.m_PosSlotDecoder[GetLenToPosState(len)].Decode(this$static.m_RangeDecoder);
				if (posSlot >= 4) {
					numDirectBits = (posSlot >> 1) - 1;
					this$static.rep0 = (2 | posSlot & 1) << numDirectBits;
					if (posSlot < 14) {
						this$static.rep0 += BitTreeDecoder.ReverseDecode(this$static.m_PosDecoders, this$static.rep0 - posSlot - 1, this$static.m_RangeDecoder, numDirectBits);
					} else {
						this$static.rep0 += this$static.m_RangeDecoder.DecodeDirectBits(numDirectBits - 4) << 4;
						this$static.rep0 += this$static.m_PosAlignDecoder.ReverseDecode(this$static.m_RangeDecoder);
						if (this$static.rep0 < 0) {
							if (this$static.rep0 == -1) {
								return 1;
							}
							return -1;
						}
					}
				} else {
					this$static.rep0 = posSlot;
				}
			}
			if (compare(fromInt(this$static.rep0), this$static.nowPos64) >= 0 || this$static.rep0 >= this$static.m_DictionarySizeCheck) {
				return -1;
			}
			this$static.m_OutWindow.CopyBlock(this$static.rep0, len);
			this$static.nowPos64 = add(this$static.nowPos64, fromInt(len));
			this$static.prevByte = this$static.m_OutWindow.GetByte(0);
		}
		return 0;
	}
	
	function $CodeFinish(this$static) {
		this$static.m_OutWindow.Flush();
		this$static.m_OutWindow.ReleaseStream();
		this$static.m_RangeDecoder.Stream = null;
	}
	
	function $processDecoderChunk(this$static) {
		var result;
		result = $CodeOneChunk(this$static.decoder);
		if (result == -1) {
			throw new IOException('corrupted input');
		}
		this$static.inBytesProcessed = N1_longLit;
		this$static.outBytesProcessed = this$static.decoder.nowPos64;
		if (result == 1 || (compare(this$static.decoder.outSize, P0_longLit) >= 0 && compare(this$static.decoder.nowPos64, this$static.decoder.outSize) >= 0)) {
			$CodeFinish(this$static.decoder);
			this$static.alive = false;
		}
	}
	
	function $ReadBlock(this$static) {
		var numReadBytes, pointerToPostion, size;
		if (this$static._streamEndWasReached) {
			return;
		}
		while (true) {
			size = -this$static._bufferOffset + this$static._blockSize - this$static._streamPos;
			if (size == 0) {
				return;
			}
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
	
	function $Init_5(this$static) {
		var i;
		this$static._bufferOffset = 0;
		this$static._pos = 0;
		this$static._streamPos = 0;
		this$static._streamEndWasReached = false;
		$ReadBlock(this$static);
		for (i = 0; i < this$static._hashSizeSum; i += 1) {
			this$static._hash[i] = 0;
		}
		this$static._cyclicBufferPos = 0;
		$ReduceOffsets(this$static, -1);
	}
	
	function $clinit_66() {
		var end, i, j, start;
		if (dontExecute.$clinit_66) {
			return;
		}
		dontExecute.$clinit_66 = true;
		ProbPrices = initDim(_3I_classLit, 0, -1, 512, 1);
		for (i = 8; i >= 0; i -= 1) {
			start = 1 << 9 - i - 1;
			end = 1 << 9 - i;
			for (j = start; j < end; j += 1) {
				ProbPrices[j] = (i << 6) + (end - j << 6 >>> 9 - i - 1);
			}
		}
	}
	
	function GetPrice(Prob, symbol) {
		$clinit_66();
		return ProbPrices[((Prob - symbol ^ -symbol) & 2047) >>> 2];
	}
	
	function $GetPrice(this$static, symbol, posState) {
		return this$static._prices[posState * 272 + symbol];
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
			this$static.ShiftLow();
		}
	}

	var BitTreeEncoder = $Class.extend({
		init: function (numBitLevels) {
			this.NumBitLevels = numBitLevels;
			this.Models = initDim(_3S_classLit, 0, -1, 1 << numBitLevels, 1);
		},
		typeMarker$: nullMethod,
		getClass$: getClass_43,
		typeId$: 21,
		Models: null,
		NumBitLevels: 0,
		ReverseEncode: function (rangeEncoder, symbol) {
			// Call static version with member variables
			return BitTreeEncoder.ReverseEncode(this.Models, 0, rangeEncoder, this.NumBitLevels, symbol);
		},
		GetPrice: function (symbol) {
			var bit, bitIndex, m, price;

			price = 0;
			m = 1;
			for (bitIndex = this.NumBitLevels; bitIndex != 0;) {
				bitIndex -= 1;
				bit = symbol >>> bitIndex & 1;
				price += GetPrice(this.Models[m], bit);
				m = (m << 1) + bit;
			}
			return price;
		},
		ReverseGetPrice: function (symbol) {
			var bit, i, m, price;
			price = 0;
			m = 1;
			for (i = this.NumBitLevels; i != 0; i -= 1) {
				bit = symbol & 1;
				symbol >>>= 1;
				price += GetPrice(this.Models[m], bit);
				m = m << 1 | bit;
			}
			return price;
		},
		Encode: function (rangeEncoder, symbol) {
			var bit, bitIndex, m;
			m = 1;
			for (bitIndex = this.NumBitLevels; bitIndex != 0;) {
				bitIndex -= 1;
				bit = symbol >>> bitIndex & 1;
				$Encode_3(rangeEncoder, this.Models, m, bit);
				m = m << 1 | bit;
			}
		}
	});

	// Static members
	BitTreeEncoder.ReverseEncode = function (Models, startIndex, rangeEncoder, NumBitLevels, symbol) {
		var bit, i, m;
		m = 1;
		for (i = 0; i < NumBitLevels; i += 1) {
			bit = symbol & 1;
			$Encode_3(rangeEncoder, Models, startIndex + m, bit);
			m = m << 1 | bit;
			symbol >>= 1;
		}
	};
	BitTreeEncoder.ReverseGetPrice = function (Models, startIndex, NumBitLevels, symbol) {
		var bit, i, m, price;
		price = 0;
		m = 1;
		for (i = NumBitLevels; i != 0; i -= 1) {
			bit = symbol & 1;
			symbol >>>= 1;
			$clinit_66();
			price += ProbPrices[((Models[startIndex + m] - bit ^ -bit) & 2047) >>> 2];
			m = m << 1 | bit;
		}
		return price;
	};

	
	function GetPosSlot2(pos) {
		if (pos < 131072) {
			return g_FastPos[pos >> 6] + 12;
		}
		if (pos < 134217728) {
			return g_FastPos[pos >> 16] + 32;
		}
		return g_FastPos[pos >> 26] + 52;
	}
	
	function $GetIndexByte(this$static, index) {
		return this$static._bufferBase[this$static._bufferOffset + this$static._pos + index];
	}
	
	function $GetNumAvailableBytes(this$static) {
		return this$static._streamPos - this$static._pos;
	}
	
	function $MoveBlock(this$static) {
		var i, numBytes, offset;
		offset = this$static._bufferOffset + this$static._pos - this$static._keepSizeBefore;
		if (offset > 0) {
			offset -= 1;
		}
		numBytes = this$static._bufferOffset + this$static._streamPos - offset;
		for (i = 0; i < numBytes; i += 1) {
			this$static._bufferBase[i] = this$static._bufferBase[offset + i];
		}
		this$static._bufferOffset -= offset;
	}
	
	function $MovePos_1(this$static) {
		var pointerToPostion;
		this$static._pos += 1;
		if (this$static._pos > this$static._posLimit) {
			pointerToPostion = this$static._bufferOffset + this$static._pos;
			if (pointerToPostion > this$static._pointerToLastSafePosition) {
				$MoveBlock(this$static);
			}
			$ReadBlock(this$static);
		}
	}
	
	function $NormalizeLinks(items, numItems, subValue) {
		var i, value;
		for (i = 0; i < numItems; i += 1) {
			value = items[i];
			if (value <= subValue) {
				value = 0;
			} else {
				value -= subValue;
			}
			items[i] = value;
		}
	}
	
	function $MovePos_0(this$static) {
		var subValue;
		this$static._cyclicBufferPos += 1;
		if (this$static._cyclicBufferPos >= this$static._cyclicBufferSize) {
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
			matchMinPos = this$static._pos > this$static._cyclicBufferSize ? this$static._pos - this$static._cyclicBufferSize : 0;
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
				cyclicPos = (delta <= this$static._cyclicBufferPos ? this$static._cyclicBufferPos - delta : this$static._cyclicBufferPos - delta + this$static._cyclicBufferSize) << 1;
				pby1 = this$static._bufferOffset + curMatch;
				len = len0 < len1 ? len0 : len1;
				if (this$static._bufferBase[pby1 + len] == this$static._bufferBase[cur + len]) {
					for (len += 1; len != lenLimit; len += 1) {
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
			num -= 1;
		} while (num != 0);
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
		matchMinPos = this$static._pos > this$static._cyclicBufferSize ? this$static._pos - this$static._cyclicBufferSize : 0;
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
					distances[offset] = maxLen = 2;
					offset += 1;
					distances[offset] = this$static._pos - curMatch2 - 1;
					offset += 1;
				}
			}
			if (curMatch3 > matchMinPos) {
				if (this$static._bufferBase[this$static._bufferOffset + curMatch3] == this$static._bufferBase[cur]) {
					if (curMatch3 == curMatch2) {
						offset -= 2;
					}
					distances[offset] = maxLen = 3;
					offset += 1;
					distances[offset] = this$static._pos - curMatch3 - 1;
					offset += 1;
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
					distances[offset] = maxLen = this$static.kNumHashDirectBytes;
					offset += 1;
					distances[offset] = this$static._pos - curMatch - 1;
					offset += 1;
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
			cyclicPos = (delta <= this$static._cyclicBufferPos ? this$static._cyclicBufferPos - delta : this$static._cyclicBufferPos - delta + this$static._cyclicBufferSize) << 1;
			pby1 = this$static._bufferOffset + curMatch;
			len = len0 < len1 ? len0 : len1;
			if (this$static._bufferBase[pby1 + len] == this$static._bufferBase[cur + len]) {
				for (len += 1; len != lenLimit; len += 1) {
					if (this$static._bufferBase[pby1 + len] != this$static._bufferBase[cur + len]) {
						break;
					}
				}
				if (maxLen < len) {
					distances[offset] = maxLen = len;
					offset += 1;
					distances[offset] = delta - 1;
					offset += 1;
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
	
	function $GetMatchLen(this$static, index, distance, limit) {
		var i, pby;
		if (this$static._streamEndWasReached) {
			if (this$static._pos + index + limit > this$static._streamPos) {
				limit = this$static._streamPos - (this$static._pos + index);
			}
		}
		distance += 1;
		pby = this$static._bufferOffset + this$static._pos + index;
		for (i = 0; i < limit; i += 1) {
			if (this$static._bufferBase[pby + i] !== this$static._bufferBase[pby + i - distance]) {
				break;
			}
		}
		return i;
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
	
	function $processEncoderChunk(this$static) {
		this$static.encoder.CodeOneBlock(this$static.encoder.processedInSize, this$static.encoder.processedOutSize, this$static.encoder.finished);
		this$static.inBytesProcessed = this$static.encoder.processedInSize[0];
		if (this$static.encoder.finished[0]) {
			this$static.encoder.ReleaseStreams();
			this$static.alive = false;
		}
	}
	
	function $processChunk(this$static) {
		var exception;
		if (!this$static.alive) {
			throw new IllegalStateException();
		}
		exception = true;
		try {
			if (this$static.encoder) {
				$processEncoderChunk(this$static);
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
	
	function $execute(this$static) {
		var $e0;
		try {
			return $processChunk(this$static.chunker);
		} catch (e) {
			$e0 = caught(e);
			if (instanceOf(e, 10)) {
				return false;
			} else {
				throw e;
			}
		}
	}
	
	function $clinit_59() {
		if (dontExecute.$clinit_59) {
			return;
		}
		dontExecute.$clinit_59 = true;
		var c, j, k, slotFast;
		g_FastPos = initDim(_3B_classLit, 0, -1, 2048, 1);
		c = 2;
		g_FastPos[0] = 0;
		g_FastPos[1] = 1;
		for (slotFast = 2; slotFast < 22; slotFast += 1) {
			k = 1 << (slotFast >> 1) - 1;
			for (j = 0; j < k; j += 1, c += 1) {
				g_FastPos[c] = slotFast << 24 >> 24;
			}
		}
	}
	
	var RangeCoderEncoder = $Class.extend({
		getClass$: getClass_45,
		typeMarker$: nullMethod,
		typeId$: 0,
		Low: P0_longLit,
		Range: 0,
		Stream: null,
		_cache: 0,
		_cacheSize: 0,
		_position: P0_longLit,
		FlushData: function () {
			var i;
			for (i = 0; i < 5; i += 1) {
				this.ShiftLow();
			}
		},
		ShiftLow: function () {
			var LowHi, temp;
			LowHi = lowBits_0(shru(this.Low, 32));
			if (LowHi != 0 || compare(this.Low, Pff000000_longLit) < 0) {
				this._position = add(this._position, fromInt(this._cacheSize));
				temp = this._cache;
				do {
					$write(this.Stream, temp + LowHi);
					temp = 255;
					this._cacheSize -= 1;
				} while (this._cacheSize != 0);
				this._cache = lowBits_0(this.Low) >>> 24;
			}
			this._cacheSize += 1;
			this.Low = shl(and(this.Low, Pffffff_longLit), 8);
		},
		EncodeDirectBits: function (v, numTotalBits) {
			var i;
			for (i = numTotalBits - 1; i >= 0; i -= 1) {
				this.Range >>>= 1;
				if ((v >>> i & 1) == 1) {
					this.Low = add(this.Low, fromInt(this.Range));
				}
				if ((this.Range & -16777216) == 0) {
					this.Range <<= 8;
					this.ShiftLow();
				}
			}
		},
		GetProcessedSizeAdd: function () {
			return add(add(fromInt(this._cacheSize), this._position), P4_longLit);
		}
	});

	// Static members
	RangeCoderEncoder.InitBitModels = function (probs) {
		$clinit_66();
		var i;
		for (i = 0; i < probs.length; i += 1) {
			probs[i] = 1024;
		}
	};

	
	var RangeCoderDecoder = $Class.extend({
		getClass$: getClass_44,
		typeMarker$: nullMethod,
		typeId$: 0,
		Code: 0,
		Range: 0,
		Stream: null,
		DecodeDirectBits: function (numTotalBits) {
			var i, result, t;
			result = 0;
			for (i = numTotalBits; i != 0; i -= 1) {
				this.Range >>>= 1;
				t = this.Code - this.Range >>> 31;
				this.Code -= this.Range & t - 1;
				result = result << 1 | 1 - t;
				if ((this.Range & -16777216) == 0) {
					this.Code = this.Code << 8 | $read(this.Stream);
					this.Range <<= 8;
				}
			}
			return result;
		},
		DecodeBit: function (probs, index) {
			var newBound, prob;
			prob = probs[index];
			newBound = (this.Range >>> 11) * prob;
			if ((this.Code ^ -2147483648) < (newBound ^ -2147483648)) {
				this.Range = newBound;
				probs[index] = prob + (2048 - prob >>> 5) << 16 >> 16;
				if ((this.Range & -16777216) == 0) {
					this.Code = this.Code << 8 | $read(this.Stream);
					this.Range <<= 8;
				}
				return 0;
			} else {
				this.Range -= newBound;
				this.Code -= newBound;
				probs[index] = prob - (prob >>> 5) << 16 >> 16;
				if ((this.Range & -16777216) == 0) {
					this.Code = this.Code << 8 | $read(this.Stream);
					this.Range <<= 8;
				}
				return 1;
			}
		}
	});
	
	// Static members
	RangeCoderDecoder.InitBitModels = function (probs) {
		var i;
		for (i = 0; i < probs.length; i += 1) {
			probs[i] = 1024;
		}
	};

	
	var LenEncoder = $Class.extend({
		init: function () {
			var posState;
			this._choice = initDim(_3S_classLit, 0, -1, 2, 1);
			this._lowCoder = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeEncoder_2_classLit, 0, 8, 16, 0);
			this._midCoder = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeEncoder_2_classLit, 0, 8, 16, 0);
			this._highCoder = new BitTreeEncoder(8);
			for (posState = 0; posState < 16; posState += 1) {
				this._lowCoder[posState] = new BitTreeEncoder(3);
				this._midCoder[posState] = new BitTreeEncoder(3);
			}
		},
		getClass$: getClass_33,
		typeMarker$: nullMethod,
		typeId$: 0,
		Encode: function (rangeEncoder, symbol, posState) {
			if (symbol < 8) {
				$Encode_3(rangeEncoder, this._choice, 0, 0);
				this._lowCoder[posState].Encode(rangeEncoder, symbol);
			} else {
				symbol -= 8;
				$Encode_3(rangeEncoder, this._choice, 0, 1);
				if (symbol < 8) {
					$Encode_3(rangeEncoder, this._choice, 1, 0);
					this._midCoder[posState].Encode(rangeEncoder, symbol);
				} else {
					$Encode_3(rangeEncoder, this._choice, 1, 1);
					this._highCoder.Encode(rangeEncoder, symbol - 8);
				}
			}
		},
		SetPrices: function (posState, numSymbols, prices, st) {
			var a0, a1, b0, b1, i;
			
			$clinit_66();
			a0 = ProbPrices[this._choice[0] >>> 2];
			a1 = ProbPrices[2048 - this._choice[0] >>> 2];
			b0 = a1 + ProbPrices[this._choice[1] >>> 2];
			b1 = a1 + ProbPrices[2048 - this._choice[1] >>> 2];
			i = 0;
			for (i = 0; i < 8; i += 1) {
				if (i >= numSymbols) {
					return;
				}
				prices[st + i] = a0 + this._lowCoder[posState].GetPrice(i);
			}
			for (; i < 16; i += 1) {
				if (i >= numSymbols) {
					return;
				}
				prices[st + i] = b0 + this._midCoder[posState].GetPrice(i - 8);
			}
			for (; i < numSymbols; i += 1) {
				prices[st + i] = b1 + this._highCoder.GetPrice(i - 8 - 8);
			}
		},
		Init: function (numPosStates) {
			var posState;
			RangeCoderEncoder.InitBitModels(this._choice);
			for (posState = 0; posState < numPosStates; posState += 1) {
				RangeCoderDecoder.InitBitModels(this._lowCoder[posState].Models);
				RangeCoderDecoder.InitBitModels(this._midCoder[posState].Models);
			}
			RangeCoderDecoder.InitBitModels(this._highCoder.Models);
		}
	});

	
	var LenPriceTableEncoder = LenEncoder.extend({
		init: function () {
			this._super();
			this._prices = initDim(_3I_classLit, 0, -1, 4352, 1);
			this._counters = initDim(_3I_classLit, 0, -1, 16, 1);
		},
		UpdateTables: function (numPosStates) {
			var posState;
			for (posState = 0; posState < numPosStates; posState += 1) {
				this.SetPrices(posState, this._tableSize, this._prices, posState * 272);
				this._counters[posState] = this._tableSize;
			}
		},
		Encode: function (rangeEncoder, symbol, posState) {
			this._super(rangeEncoder, symbol, posState);
			this._counters[posState] -= 1;
			if (this._counters[posState] == 0) {
				this.SetPrices(posState, this._tableSize, this._prices, posState * 272);
				this._counters[posState] = this._tableSize;
			}
		},
		getClass$: getClass_34,
		typeId$: 0,
		_tableSize: 0
	});
	
	var Encoder2 = $Class.extend({
		init: function () {
			this.m_Encoders = initDim(_3S_classLit, 0, -1, 768, 1);
		},
		getClass$: getClass_35,
		typeMarker$: nullMethod,
		typeId$: 18,
		EncodeMatched: function (rangeEncoder, matchByte, symbol) {
			var bit, context, i, matchBit, same, state;
			context = 1;
			same = true;
			for (i = 7; i >= 0; i -= 1) {
				bit = symbol >> i & 1;
				state = context;
				if (same) {
					matchBit = matchByte >> i & 1;
					state += 1 + matchBit << 8;
					same = matchBit == bit;
				}
				$Encode_3(rangeEncoder, this.m_Encoders, state, bit);
				context = context << 1 | bit;
			}
		},
		GetPrice: function (matchMode, matchByte, symbol) {
			var bit, context, i, matchBit, price;
			price = 0;
			context = 1;
			i = 7;
			if (matchMode) {
				for (; i >= 0; i -= 1) {
					matchBit = matchByte >> i & 1;
					bit = symbol >> i & 1;
					price += GetPrice(this.m_Encoders[(1 + matchBit << 8) + context], bit);
					context = context << 1 | bit;
					if (matchBit != bit) {
						i -= 1;
						break;
					}
				}
			}
			for (; i >= 0; i -= 1) {
				bit = symbol >> i & 1;
				price += GetPrice(this.m_Encoders[context], bit);
				context = context << 1 | bit;
			}
			return price;
		},
		Encode: function (rangeEncoder, symbol) {
			var bit, context, i;
			context = 1;
			for (i = 7; i >= 0; i -= 1) {
				bit = symbol >> i & 1;
				$Encode_3(rangeEncoder, this.m_Encoders, context, bit);
				context = context << 1 | bit;
			}
		}
	});


	var LiteralEncoder = $Class.extend({
		getClass$: getClass_36,
		typeMarker$: nullMethod,
		typeId$: 0,
		m_Coders: null,
		m_NumPosBits: 0,
		m_NumPrevBits: 0,
		m_PosMask: 0,
		Create: function (numPosBits, numPrevBits) {
			var i, numStates;
			if (this.m_Coders != null && this.m_NumPrevBits == numPrevBits && this.m_NumPosBits == numPosBits) {
				return;
			}
			this.m_NumPosBits = numPosBits;
			this.m_PosMask = (1 << numPosBits) - 1;
			this.m_NumPrevBits = numPrevBits;
			numStates = 1 << this.m_NumPrevBits + this.m_NumPosBits;
			this.m_Coders = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LiteralEncoder$Encoder2_2_classLit, 0, 5, numStates, 0);
			for (i = 0; i < numStates; i += 1) {
				this.m_Coders[i] = new Encoder2();
			}
		},
		GetSubCoder: function (pos, prevByte) {
			return this.m_Coders[((pos & this.m_PosMask) << this.m_NumPrevBits) + ((prevByte & 255) >>> 8 - this.m_NumPrevBits)];
		}
	});
	
	
	var Optimal = $Class.extend({
		MakeAsChar: function () {
			this.BackPrev = -1;
			this.Prev1IsChar = false;
		},
		MakeAsShortRep: function () {
			this.BackPrev = 0;
			this.Prev1IsChar = false;
		},
		getClass$: getClass_37,
		typeMarker$: nullMethod,
		typeId$: 19,
		BackPrev: 0,
		BackPrev2: 0,
		Backs0: 0,
		Backs1: 0,
		Backs2: 0,
		Backs3: 0,
		PosPrev: 0,
		PosPrev2: 0,
		Prev1IsChar: false,
		Prev2: false,
		Price: 0,
		State: 0
	});

	
	var Encoder = $Class.extend({
		init: function () {
			var i;
			$clinit_59();
			this._repDistances = initDim(_3I_classLit, 0, -1, 4, 1);
			this._optimum = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$Optimal_2_classLit, 0, 6, 4096, 0);
			$clinit_66();
			this._rangeEncoder = new RangeCoderEncoder();
			this._isMatch = initDim(_3S_classLit, 0, -1, 192, 1);
			this._isRep = initDim(_3S_classLit, 0, -1, 12, 1);
			this._isRepG0 = initDim(_3S_classLit, 0, -1, 12, 1);
			this._isRepG1 = initDim(_3S_classLit, 0, -1, 12, 1);
			this._isRepG2 = initDim(_3S_classLit, 0, -1, 12, 1);
			this._isRep0Long = initDim(_3S_classLit, 0, -1, 192, 1);
			this._posSlotEncoder = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeEncoder_2_classLit, 0, 8, 4, 0);
			this._posEncoders = initDim(_3S_classLit, 0, -1, 114, 1);
			this._posAlignEncoder = new BitTreeEncoder(4);
			this._lenEncoder = new LenPriceTableEncoder();
			this._repMatchLenEncoder = new LenPriceTableEncoder();
			this._literalEncoder = new LiteralEncoder();
			this._matchDistances = initDim(_3I_classLit, 0, -1, 548, 1);
			this._posSlotPrices = initDim(_3I_classLit, 0, -1, 256, 1);
			this._distancesPrices = initDim(_3I_classLit, 0, -1, 512, 1);
			this._alignPrices = initDim(_3I_classLit, 0, -1, 16, 1);
			this.reps = initDim(_3I_classLit, 0, -1, 4, 1);
			this.repLens = initDim(_3I_classLit, 0, -1, 4, 1);
			this.processedInSize = initDim(_3J_classLit, 0, -1, 1, 3);
			this.processedOutSize = initDim(_3J_classLit, 0, -1, 1, 3);
			this.finished = initDim(_3Z_classLit, 0, -1, 1, 2);
			this.properties = initDim(_3B_classLit, 0, -1, 5, 1);
			this.tempPrices = initDim(_3I_classLit, 0, -1, 128, 1);
			for (i = 0; i < 4096; i += 1) {
				this._optimum[i] = new Optimal();
			}
			for (i = 0; i < 4; i += 1) {
				this._posSlotEncoder[i] = new BitTreeEncoder(6);
			}
		},
		getClass$: getClass_38,
		typeMarker$: nullMethod,
		typeId$: 0,
		_additionalOffset: 0,
		_alignPriceCount: 0,
		_dictionarySize: 4194304,
		_dictionarySizePrev: -1,
		_distTableSize: 44,
		_finished: false,
		_inStream: null,
		_longestMatchLength: 0,
		_longestMatchWasFound: false,
		_matchFinder: null,
		_matchFinderType: 1,
		_matchPriceCount: 0,
		_needReleaseMFStream: false,
		_numDistancePairs: 0,
		_numFastBytes: 32,
		_numFastBytesPrev: -1,
		_numLiteralContextBits: 3,
		_numLiteralPosStateBits: 0,
		_optimumCurrentIndex: 0,
		_optimumEndIndex: 0,
		_posStateBits: 2,
		_posStateMask: 3,
		_previousByte: 0,
		_state: 0,
		_writeEndMark: false,
		backRes: 0,
		nowPos64: P0_longLit,
		ReadMatchDistances: function () {
			var lenRes;
			lenRes = 0;
			this._numDistancePairs = $GetMatches(this._matchFinder, this._matchDistances);
			if (this._numDistancePairs > 0) {
				lenRes = this._matchDistances[this._numDistancePairs - 2];
				if (lenRes == this._numFastBytes) {
					lenRes += $GetMatchLen(this._matchFinder, lenRes - 1, this._matchDistances[this._numDistancePairs - 1], 273 - lenRes);
				}
			}
			this._additionalOffset += 1;
			return lenRes;
		},
		MovePos: function (num) {
			if (num > 0) {
				$Skip(this._matchFinder, num);
				this._additionalOffset += num;
			}
		},
		GetRepLen1Price: function (state, posState) {
			$clinit_66();
			return ProbPrices[this._isRepG0[state] >>> 2] + ProbPrices[this._isRep0Long[(state << 4) + posState] >>> 2];
		},
		GetPureRepPrice: function (repIndex, state, posState) {
			var price;
			if (repIndex == 0) {
				$clinit_66();
				price = ProbPrices[this._isRepG0[state] >>> 2];
				price += ProbPrices[2048 - this._isRep0Long[(state << 4) + posState] >>> 2];
			} else {
				$clinit_66();
				price = ProbPrices[2048 - this._isRepG0[state] >>> 2];
				if (repIndex == 1) {
					price += ProbPrices[this._isRepG1[state] >>> 2];
				} else {
					price += ProbPrices[2048 - this._isRepG1[state] >>> 2];
					price += GetPrice(this._isRepG2[state], repIndex - 2);
				}
			}
			return price;
		},
		GetPosLenPrice: function (pos, len, posState) {
			var lenToPosState, price;
			lenToPosState = GetLenToPosState(len);
			if (pos < 128) {
				price = this._distancesPrices[lenToPosState * 128 + pos];
			} else {
				price = this._posSlotPrices[(lenToPosState << 6) + GetPosSlot2(pos)] + this._alignPrices[pos & 15];
			}
			return price + $GetPrice(this._lenEncoder, len - 2, posState);
		},
		Backward: function (cur) {
			var backCur, backMem, posMem, posPrev;
			this._optimumEndIndex = cur;
			posMem = this._optimum[cur].PosPrev;
			backMem = this._optimum[cur].BackPrev;
			do {
				if (this._optimum[cur].Prev1IsChar) {
					this._optimum[posMem].MakeAsChar();
					this._optimum[posMem].PosPrev = posMem - 1;
					if (this._optimum[cur].Prev2) {
						this._optimum[posMem - 1].Prev1IsChar = false;
						this._optimum[posMem - 1].PosPrev = this._optimum[cur].PosPrev2;
						this._optimum[posMem - 1].BackPrev = this._optimum[cur].BackPrev2;
					}
				}
				posPrev = posMem;
				backCur = backMem;
				backMem = this._optimum[posPrev].BackPrev;
				posMem = this._optimum[posPrev].PosPrev;
				this._optimum[posPrev].BackPrev = backCur;
				this._optimum[posPrev].PosPrev = cur;
				cur = posPrev;
			} while (cur > 0);
			this.backRes = this._optimum[0].BackPrev;
			this._optimumCurrentIndex = this._optimum[0].PosPrev;
			return this._optimumCurrentIndex;
		},
		GetOptimum: function (position) {
			var cur,
				curAnd1Price,
				curAndLenCharPrice,
				curAndLenPrice,
				curBack,
				curPrice,
				currentByte,
				distance,
				i,
				len,
				lenEnd,
				lenMain,
				lenRes,
				lenTest,
				lenTest2,
				lenTestTemp,
				matchByte,
				matchPrice,
				newLen,
				nextIsChar,
				nextMatchPrice,
				nextOptimum,
				nextRepMatchPrice,
				normalMatchPrice,
				numAvailableBytes,
				numAvailableBytesFull,
				numDistancePairs,
				offs,
				offset,
				opt,
				optimum,
				pos,
				posPrev,
				posState,
				posStateNext,
				price_4,
				repIndex,
				repLen,
				repMatchPrice,
				repMaxIndex,
				shortRepPrice,
				startLen,
				state,
				state2,
				t,
				price,
				price_0,
				price_1,
				price_2,
				price_3;

			if (this._optimumEndIndex != this._optimumCurrentIndex) {
				lenRes = this._optimum[this._optimumCurrentIndex].PosPrev - this._optimumCurrentIndex;
				this.backRes = this._optimum[this._optimumCurrentIndex].BackPrev;
				this._optimumCurrentIndex = this._optimum[this._optimumCurrentIndex].PosPrev;
				return lenRes;
			}
			this._optimumCurrentIndex = this._optimumEndIndex = 0;
			if (this._longestMatchWasFound) {
				lenMain = this._longestMatchLength;
				this._longestMatchWasFound = false;
			} else {
				lenMain = this.ReadMatchDistances();
			}
			numDistancePairs = this._numDistancePairs;
			numAvailableBytes = $GetNumAvailableBytes(this._matchFinder) + 1;
			if (numAvailableBytes < 2) {
				this.backRes = -1;
				return 1;
			}
			if (numAvailableBytes > 273) {
				numAvailableBytes = 273;
			}
			repMaxIndex = 0;
			for (i = 0; i < 4; i += 1) {
				this.reps[i] = this._repDistances[i];
				this.repLens[i] = $GetMatchLen(this._matchFinder, -1, this.reps[i], 273);
				if (this.repLens[i] > this.repLens[repMaxIndex]) {
					repMaxIndex = i;
				}
			}
			if (this.repLens[repMaxIndex] >= this._numFastBytes) {
				this.backRes = repMaxIndex;
				lenRes = this.repLens[repMaxIndex];
				this.MovePos(lenRes - 1);
				return lenRes;
			}
			if (lenMain >= this._numFastBytes) {
				this.backRes = this._matchDistances[numDistancePairs - 1] + 4;
				this.MovePos(lenMain - 1);
				return lenMain;
			}
			currentByte = $GetIndexByte(this._matchFinder, -1);
			matchByte = $GetIndexByte(this._matchFinder, -this._repDistances[0] - 1 - 1);
			if (lenMain < 2 && currentByte != matchByte && this.repLens[repMaxIndex] < 2) {
				this.backRes = -1;
				return 1;
			}
			this._optimum[0].State = this._state;
			posState = position & this._posStateMask;
			$clinit_66();
			this._optimum[1].Price = (ProbPrices[this._isMatch[(this._state << 4) + posState] >>> 2]) + this._literalEncoder.GetSubCoder(position, this._previousByte).GetPrice(this._state >= 7, matchByte, currentByte);
			this._optimum[1].MakeAsChar();
			matchPrice = ProbPrices[2048 - this._isMatch[(this._state << 4) + posState] >>> 2];
			repMatchPrice = matchPrice + ProbPrices[2048 - this._isRep[this._state] >>> 2];
			if (matchByte == currentByte) {
				shortRepPrice = repMatchPrice + this.GetRepLen1Price(this._state, posState);
				if (shortRepPrice < this._optimum[1].Price) {
					this._optimum[1].Price = shortRepPrice;
					this._optimum[1].MakeAsShortRep();
				}
			}
			lenEnd = lenMain >= this.repLens[repMaxIndex] ? lenMain : this.repLens[repMaxIndex];
			if (lenEnd < 2) {
				this.backRes = this._optimum[1].BackPrev;
				return 1;
			}
			this._optimum[1].PosPrev = 0;
			this._optimum[0].Backs0 = this.reps[0];
			this._optimum[0].Backs1 = this.reps[1];
			this._optimum[0].Backs2 = this.reps[2];
			this._optimum[0].Backs3 = this.reps[3];
			len = lenEnd;
			do {
				this._optimum[len].Price = 268435455;
				len -= 1;
			} while (len >= 2);
			for (i = 0; i < 4; i += 1) {
				repLen = this.repLens[i];
				if (repLen < 2) {
					continue;
				}
				price_4 = repMatchPrice + this.GetPureRepPrice(i, this._state, posState);
				do {
					curAndLenPrice = price_4 + $GetPrice(this._repMatchLenEncoder, repLen - 2, posState);
					optimum = this._optimum[repLen];
					if (curAndLenPrice < optimum.Price) {
						optimum.Price = curAndLenPrice;
						optimum.PosPrev = 0;
						optimum.BackPrev = i;
						optimum.Prev1IsChar = false;
					}
					repLen -= 1;
				} while (repLen >= 2);
			}
			normalMatchPrice = matchPrice + ProbPrices[this._isRep[this._state] >>> 2];
			len = this.repLens[0] >= 2 ? this.repLens[0] + 1 : 2;
			if (len <= lenMain) {
				offs = 0;
				while (len > this._matchDistances[offs]) {
					offs += 2;
				}
				for (;; len += 1) {
					distance = this._matchDistances[offs + 1];
					curAndLenPrice = normalMatchPrice + this.GetPosLenPrice(distance, len, posState);
					optimum = this._optimum[len];
					if (curAndLenPrice < optimum.Price) {
						optimum.Price = curAndLenPrice;
						optimum.PosPrev = 0;
						optimum.BackPrev = distance + 4;
						optimum.Prev1IsChar = false;
					}
					if (len == this._matchDistances[offs]) {
						offs += 2;
						if (offs == numDistancePairs) {
							break;
						}
					}
				}
			}
			cur = 0;
			while (true) {
				cur += 1;
				if (cur == lenEnd) {
					return this.Backward(cur);
				}
				newLen = this.ReadMatchDistances();
				numDistancePairs = this._numDistancePairs;
				if (newLen >= this._numFastBytes) {
					this._longestMatchLength = newLen;
					this._longestMatchWasFound = true;
					return this.Backward(cur);
				}
				position += 1;
				posPrev = this._optimum[cur].PosPrev;
				if (this._optimum[cur].Prev1IsChar) {
					posPrev -= 1;
					if (this._optimum[cur].Prev2) {
						state = this._optimum[this._optimum[cur].PosPrev2].State;
						if (this._optimum[cur].BackPrev2 < 4) {
							state = (state < 7) ? 8 : 11;
						} else {
							state = (state < 7) ? 7 : 10;
						}
					} else {
						state = this._optimum[posPrev].State;
					}
					state = StateUpdateChar(state);
				} else {
					state = this._optimum[posPrev].State;
				}
				if (posPrev == cur - 1) {
					if (this._optimum[cur].BackPrev == 0) {
						state = state < 7 ? 9 : 11;
					} else {
						state = StateUpdateChar(state);
					}
				} else {
					if (this._optimum[cur].Prev1IsChar && this._optimum[cur].Prev2) {
						posPrev = this._optimum[cur].PosPrev2;
						pos = this._optimum[cur].BackPrev2;
						state = state < 7 ? 8 : 11;
					} else {
						pos = this._optimum[cur].BackPrev;
						if (pos < 4) {
							state = state < 7 ? 8 : 11;
						} else {
							state = state < 7 ? 7 : 10;
						}
					}
					opt = this._optimum[posPrev];
					if (pos < 4) {
						if (pos == 0) {
							this.reps[0] = opt.Backs0;
							this.reps[1] = opt.Backs1;
							this.reps[2] = opt.Backs2;
							this.reps[3] = opt.Backs3;
						} else if (pos == 1) {
							this.reps[0] = opt.Backs1;
							this.reps[1] = opt.Backs0;
							this.reps[2] = opt.Backs2;
							this.reps[3] = opt.Backs3;
						} else if (pos == 2) {
							this.reps[0] = opt.Backs2;
							this.reps[1] = opt.Backs0;
							this.reps[2] = opt.Backs1;
							this.reps[3] = opt.Backs3;
						} else {
							this.reps[0] = opt.Backs3;
							this.reps[1] = opt.Backs0;
							this.reps[2] = opt.Backs1;
							this.reps[3] = opt.Backs2;
						}
					} else {
						this.reps[0] = pos - 4;
						this.reps[1] = opt.Backs0;
						this.reps[2] = opt.Backs1;
						this.reps[3] = opt.Backs2;
					}
				}
				this._optimum[cur].State = state;
				this._optimum[cur].Backs0 = this.reps[0];
				this._optimum[cur].Backs1 = this.reps[1];
				this._optimum[cur].Backs2 = this.reps[2];
				this._optimum[cur].Backs3 = this.reps[3];
				curPrice = this._optimum[cur].Price;
				currentByte = $GetIndexByte(this._matchFinder, -1);
				matchByte = $GetIndexByte(this._matchFinder, -this.reps[0] - 1 - 1);
				posState = position & this._posStateMask;
				curAnd1Price = curPrice + ProbPrices[this._isMatch[(state << 4) + posState] >>> 2] + this._literalEncoder.GetSubCoder(position, $GetIndexByte(this._matchFinder, -2)).GetPrice(state >= 7, matchByte, currentByte);
				nextOptimum = this._optimum[cur + 1];
				nextIsChar = false;
				if (curAnd1Price < nextOptimum.Price) {
					nextOptimum.Price = curAnd1Price;
					nextOptimum.PosPrev = cur;
					nextOptimum.BackPrev = -1;
					nextOptimum.Prev1IsChar = false;
					nextIsChar = true;
				}
				matchPrice = curPrice + ProbPrices[2048 - this._isMatch[(state << 4) + posState] >>> 2];
				repMatchPrice = matchPrice + ProbPrices[2048 - this._isRep[state] >>> 2];
				if (matchByte == currentByte && !(nextOptimum.PosPrev < cur && nextOptimum.BackPrev == 0)) {
					shortRepPrice = repMatchPrice + (ProbPrices[this._isRepG0[state] >>> 2] + ProbPrices[this._isRep0Long[(state << 4) + posState] >>> 2]);
					if (shortRepPrice <= nextOptimum.Price) {
						nextOptimum.Price = shortRepPrice;
						nextOptimum.PosPrev = cur;
						nextOptimum.BackPrev = 0;
						nextOptimum.Prev1IsChar = false;
						nextIsChar = true;
					}
				}
				numAvailableBytesFull = $GetNumAvailableBytes(this._matchFinder) + 1;
				numAvailableBytesFull = 4095 - cur < numAvailableBytesFull ? 4095 - cur : numAvailableBytesFull;
				numAvailableBytes = numAvailableBytesFull;
				if (numAvailableBytes < 2) {
					continue;
				}
				if (numAvailableBytes > this._numFastBytes) {
					numAvailableBytes = this._numFastBytes;
				}
				if (!nextIsChar && matchByte != currentByte) {
					t = Math.min(numAvailableBytesFull - 1, this._numFastBytes);
					lenTest2 = $GetMatchLen(this._matchFinder, 0, this.reps[0], t);
					if (lenTest2 >= 2) {
						state2 = StateUpdateChar(state);
						posStateNext = position + 1 & this._posStateMask;
						nextRepMatchPrice = curAnd1Price + ProbPrices[2048 - this._isMatch[(state2 << 4) + posStateNext] >>> 2] + ProbPrices[2048 - this._isRep[state2] >>> 2];
						offset = cur + 1 + lenTest2;
						while (lenEnd < offset) {
							lenEnd += 1;
							this._optimum[lenEnd].Price = 268435455;
						}
						
						price = $GetPrice(this._repMatchLenEncoder, lenTest2 - 2, posStateNext);
						curAndLenPrice = nextRepMatchPrice + price + this.GetPureRepPrice(0, state2, posStateNext);
						optimum = this._optimum[offset];
						if (curAndLenPrice < optimum.Price) {
							optimum.Price = curAndLenPrice;
							optimum.PosPrev = cur + 1;
							optimum.BackPrev = 0;
							optimum.Prev1IsChar = true;
							optimum.Prev2 = false;
						}
					}
				}
				startLen = 2;
				for (repIndex = 0; repIndex < 4; repIndex += 1) {
					lenTest = $GetMatchLen(this._matchFinder, -1, this.reps[repIndex], numAvailableBytes);
					if (lenTest < 2) {
						continue;
					}
					lenTestTemp = lenTest;
					do {
						while (lenEnd < cur + lenTest) {
							lenEnd += 1;
							this._optimum[lenEnd].Price = 268435455;
						}
						
						price_0 = $GetPrice(this._repMatchLenEncoder, lenTest - 2, posState);
						curAndLenPrice = repMatchPrice + price_0 + this.GetPureRepPrice(repIndex, state, posState);
						optimum = this._optimum[cur + lenTest];
						if (curAndLenPrice < optimum.Price) {
							optimum.Price = curAndLenPrice;
							optimum.PosPrev = cur;
							optimum.BackPrev = repIndex;
							optimum.Prev1IsChar = false;
						}
						lenTest -= 1;
					} while (lenTest >= 2);
					lenTest = lenTestTemp;
					if (repIndex == 0) {
						startLen = lenTest + 1;
					}
					if (lenTest < numAvailableBytesFull) {
						t = Math.min(numAvailableBytesFull - 1 - lenTest, this._numFastBytes);
						lenTest2 = $GetMatchLen(this._matchFinder, lenTest, this.reps[repIndex], t);
						if (lenTest2 >= 2) {
							state2 = state < 7 ? 8 : 11;
							posStateNext = position + lenTest & this._posStateMask;
							
							price_1 = $GetPrice(this._repMatchLenEncoder, lenTest - 2, posState);

							curAndLenCharPrice = repMatchPrice + price_1 + this.GetPureRepPrice(repIndex, state, posState) + ProbPrices[this._isMatch[(state2 << 4) + posStateNext] >>> 2] + this._literalEncoder.GetSubCoder(position + lenTest, $GetIndexByte(this._matchFinder, lenTest - 1 - 1)).GetPrice(true, $GetIndexByte(this._matchFinder, lenTest - 1 - (this.reps[repIndex] + 1)), $GetIndexByte(this._matchFinder, lenTest - 1));
							state2 = StateUpdateChar(state2);
							posStateNext = position + lenTest + 1 & this._posStateMask;
							nextMatchPrice = curAndLenCharPrice + ProbPrices[2048 - this._isMatch[(state2 << 4) + posStateNext] >>> 2];
							nextRepMatchPrice = nextMatchPrice + ProbPrices[2048 - this._isRep[state2] >>> 2];
							offset = lenTest + 1 + lenTest2;
							while (lenEnd < cur + offset) {
								lenEnd += 1;
								this._optimum[lenEnd].Price = 268435455;
							}
							
							price_2 = $GetPrice(this._repMatchLenEncoder, lenTest2 - 2, posStateNext);
							curAndLenPrice = nextRepMatchPrice + price_2 + this.GetPureRepPrice(0, state2, posStateNext);
							optimum = this._optimum[cur + offset];
							if (curAndLenPrice < optimum.Price) {
								optimum.Price = curAndLenPrice;
								optimum.PosPrev = cur + lenTest + 1;
								optimum.BackPrev = 0;
								optimum.Prev1IsChar = true;
								optimum.Prev2 = true;
								optimum.PosPrev2 = cur;
								optimum.BackPrev2 = repIndex;
							}
						}
					}
				}
				if (newLen > numAvailableBytes) {
					newLen = numAvailableBytes;
					for (numDistancePairs = 0;; numDistancePairs += 2) {
						if (newLen <= this._matchDistances[numDistancePairs]) {
							break;
						}
					}
					this._matchDistances[numDistancePairs] = newLen;
					numDistancePairs += 2;
				}
				if (newLen >= startLen) {
					normalMatchPrice = matchPrice + ProbPrices[this._isRep[state] >>> 2];
					while (lenEnd < cur + newLen) {
						lenEnd += 1;
						this._optimum[lenEnd].Price = 268435455;
					}
					offs = 0;
					while (startLen > this._matchDistances[offs]) {
						offs += 2;
					}
					for (lenTest = startLen;; lenTest += 1) {
						curBack = this._matchDistances[offs + 1];
						curAndLenPrice = normalMatchPrice + this.GetPosLenPrice(curBack, lenTest, posState);
						optimum = this._optimum[cur + lenTest];
						if (curAndLenPrice < optimum.Price) {
							optimum.Price = curAndLenPrice;
							optimum.PosPrev = cur;
							optimum.BackPrev = curBack + 4;
							optimum.Prev1IsChar = false;
						}
						if (lenTest == this._matchDistances[offs]) {
							if (lenTest < numAvailableBytesFull) {
								t = Math.min(numAvailableBytesFull - 1 - lenTest, this._numFastBytes);
								lenTest2 = $GetMatchLen(this._matchFinder, lenTest, curBack, t);
								if (lenTest2 >= 2) {
									state2 = state < 7 ? 7 : 10;
									posStateNext = position + lenTest & this._posStateMask;
									curAndLenCharPrice = curAndLenPrice + ProbPrices[this._isMatch[(state2 << 4) + posStateNext] >>> 2] + this._literalEncoder.GetSubCoder(position + lenTest, $GetIndexByte(this._matchFinder, lenTest - 1 - 1)).GetPrice(true, $GetIndexByte(this._matchFinder, lenTest - (curBack + 1) - 1), $GetIndexByte(this._matchFinder, lenTest - 1));
									state2 = StateUpdateChar(state2);
									posStateNext = position + lenTest + 1 & this._posStateMask;
									nextMatchPrice = curAndLenCharPrice + ProbPrices[2048 - this._isMatch[(state2 << 4) + posStateNext] >>> 2];
									nextRepMatchPrice = nextMatchPrice + ProbPrices[2048 - this._isRep[state2] >>> 2];
									offset = lenTest + 1 + lenTest2;
									while (lenEnd < cur + offset) {
										lenEnd += 1;
										this._optimum[lenEnd].Price = 268435455;
									}

									price_3 = $GetPrice(this._repMatchLenEncoder, lenTest2 - 2, posStateNext);
									curAndLenPrice = nextRepMatchPrice + price_3 + this.GetPureRepPrice(0, state2, posStateNext);
									optimum = this._optimum[cur + offset];
									if (curAndLenPrice < optimum.Price) {
										optimum.Price = curAndLenPrice;
										optimum.PosPrev = cur + lenTest + 1;
										optimum.BackPrev = 0;
										optimum.Prev1IsChar = true;
										optimum.Prev2 = true;
										optimum.PosPrev2 = cur;
										optimum.BackPrev2 = curBack + 4;
									}
								}
							}
							offs += 2;
							if (offs == numDistancePairs) {
								break;
							}
						}
					}
				}
			}
		},
		WriteEndMarker: function (posState) {
			var lenToPosState;
			if (!this._writeEndMark) {
				return;
			}
			$Encode_3(this._rangeEncoder, this._isMatch, (this._state << 4) + posState, 1);
			$Encode_3(this._rangeEncoder, this._isRep, this._state, 0);
			this._state = this._state < 7 ? 7 : 10;
			this._lenEncoder.Encode(this._rangeEncoder, 0, posState);
			lenToPosState = GetLenToPosState(2);
			this._posSlotEncoder[lenToPosState].Encode(this._rangeEncoder, 63);
			this._rangeEncoder.EncodeDirectBits(67108863, 26);
			this._posAlignEncoder.ReverseEncode(this._rangeEncoder, 15);
		},
		Flush: function (nowPos) {
			this.ReleaseMFStream();
			this.WriteEndMarker(nowPos & this._posStateMask);
			this._rangeEncoder.FlushData();
		},
		ReleaseMFStream: function () {
			if (!!this._matchFinder && this._needReleaseMFStream) {
				this._matchFinder._stream = null;
				this._needReleaseMFStream = false;
			}
		},
		ReleaseStreams: function () {
			this.ReleaseMFStream();
			this._rangeEncoder.Stream = null;
		},
		CodeOneBlock: function (inSize, outSize, finished) {
			var baseVal, complexState, curByte, distance, footerBits, i, len, lenToPosState, matchByte, pos, posReduced, posSlot, posState, progressPosValuePrev, subCoder;
			inSize[0] = P0_longLit;
			outSize[0] = P0_longLit;
			finished[0] = true;
			if (this._inStream) {
				this._matchFinder._stream = this._inStream;
				$Init_5(this._matchFinder);
				this._needReleaseMFStream = true;
				this._inStream = null;
			}
			if (this._finished) {
				return;
			}
			this._finished = true;
			progressPosValuePrev = this.nowPos64;
			if (eq(this.nowPos64, P0_longLit)) {
				if ($GetNumAvailableBytes(this._matchFinder) == 0) {
					this.Flush(lowBits_0(this.nowPos64));
					return;
				}
				this.ReadMatchDistances();
				posState = lowBits_0(this.nowPos64) & this._posStateMask;
				$Encode_3(this._rangeEncoder, this._isMatch, (this._state << 4) + posState, 0);
				this._state = StateUpdateChar(this._state);
				curByte = $GetIndexByte(this._matchFinder, -this._additionalOffset);
				this._literalEncoder.GetSubCoder(lowBits_0(this.nowPos64), this._previousByte).Encode(this._rangeEncoder, curByte);
				this._previousByte = curByte;
				this._additionalOffset -= 1;
				this.nowPos64 = add(this.nowPos64, P1_longLit);
			}
			if ($GetNumAvailableBytes(this._matchFinder) == 0) {
				this.Flush(lowBits_0(this.nowPos64));
				return;
			}
			while (true) {
				len = this.GetOptimum(lowBits_0(this.nowPos64));
				pos = this.backRes;
				posState = lowBits_0(this.nowPos64) & this._posStateMask;
				complexState = (this._state << 4) + posState;
				if (len == 1 && pos == -1) {
					$Encode_3(this._rangeEncoder, this._isMatch, complexState, 0);
					curByte = $GetIndexByte(this._matchFinder, -this._additionalOffset);
					subCoder = this._literalEncoder.GetSubCoder(lowBits_0(this.nowPos64), this._previousByte);
					if (this._state < 7) {
						subCoder.Encode(this._rangeEncoder, curByte);
					} else {
						matchByte = $GetIndexByte(this._matchFinder, -this._repDistances[0] - 1 - this._additionalOffset);
						subCoder.EncodeMatched(this._rangeEncoder, matchByte, curByte);
					}
					this._previousByte = curByte;
					this._state = StateUpdateChar(this._state);
				} else {
					$Encode_3(this._rangeEncoder, this._isMatch, complexState, 1);
					if (pos < 4) {
						$Encode_3(this._rangeEncoder, this._isRep, this._state, 1);
						if (pos == 0) {
							$Encode_3(this._rangeEncoder, this._isRepG0, this._state, 0);
							if (len == 1) {
								$Encode_3(this._rangeEncoder, this._isRep0Long, complexState, 0);
							} else {
								$Encode_3(this._rangeEncoder, this._isRep0Long, complexState, 1);
							}
						} else {
							$Encode_3(this._rangeEncoder, this._isRepG0, this._state, 1);
							if (pos == 1) {
								$Encode_3(this._rangeEncoder, this._isRepG1, this._state, 0);
							} else {
								$Encode_3(this._rangeEncoder, this._isRepG1, this._state, 1);
								$Encode_3(this._rangeEncoder, this._isRepG2, this._state, pos - 2);
							}
						}
						if (len == 1) {
							this._state = this._state < 7 ? 9 : 11;
						} else {
							this._repMatchLenEncoder.Encode(this._rangeEncoder, len - 2, posState);
							this._state = this._state < 7 ? 8 : 11;
						}
						distance = this._repDistances[pos];
						if (pos != 0) {
							for (i = pos; i >= 1; i -= 1) {
								this._repDistances[i] = this._repDistances[i - 1];
							}
							this._repDistances[0] = distance;
						}
					} else {
						$Encode_3(this._rangeEncoder, this._isRep, this._state, 0);
						this._state = this._state < 7 ? 7 : 10;
						this._lenEncoder.Encode(this._rangeEncoder, len - 2, posState);
						pos -= 4;
						posSlot = GetPosSlot(pos);
						lenToPosState = GetLenToPosState(len);
						this._posSlotEncoder[lenToPosState].Encode(this._rangeEncoder, posSlot);
						if (posSlot >= 4) {
							footerBits = (posSlot >> 1) - 1;
							baseVal = (2 | posSlot & 1) << footerBits;
							posReduced = pos - baseVal;
							if (posSlot < 14) {
								BitTreeEncoder.ReverseEncode(this._posEncoders, baseVal - posSlot - 1, this._rangeEncoder, footerBits, posReduced);
							} else {
								this._rangeEncoder.EncodeDirectBits(posReduced >> 4, footerBits - 4);
								this._posAlignEncoder.ReverseEncode(this._rangeEncoder, posReduced & 15);
								this._alignPriceCount += 1;
							}
						}
						distance = pos;
						for (i = 3; i >= 1; i -= 1) {
							this._repDistances[i] = this._repDistances[i - 1];
						}
						this._repDistances[0] = distance;
						this._matchPriceCount += 1;
					}
					this._previousByte = $GetIndexByte(this._matchFinder, len - 1 - this._additionalOffset);
				}
				this._additionalOffset -= len;
				this.nowPos64 = add(this.nowPos64, fromInt(len));
				if (this._additionalOffset == 0) {
					if (this._matchPriceCount >= 128) {
						this.FillDistancesPrices();
					}
					if (this._alignPriceCount >= 16) {
						this.FillAlignPrices();
					}
					inSize[0] = this.nowPos64;
					outSize[0] = this._rangeEncoder.GetProcessedSizeAdd();
					if ($GetNumAvailableBytes(this._matchFinder) == 0) {
						this.Flush(lowBits_0(this.nowPos64));
						return;
					}
					if (compare(sub(this.nowPos64, progressPosValuePrev), P1000_longLit) >= 0) {
						this._finished = false;
						finished[0] = false;
						return;
					}
				}
			}
		},
		WriteCoderProperties: function (outStream) {
			var i;
			this.properties[0] = (this._posStateBits * 5 + this._numLiteralPosStateBits) * 9 + this._numLiteralContextBits << 24 >> 24;
			for (i = 0; i < 4; i += 1) {
				this.properties[1 + i] = this._dictionarySize >> 8 * i << 24 >> 24;
			}
			$write_0(outStream, this.properties, 0, 5);
		},
		FillDistancesPrices: function () {
			var baseVal, encoder, footerBits, i, lenToPosState, posSlot, st, st2;
			for (i = 4; i < 128; i += 1) {
				posSlot = GetPosSlot(i);
				footerBits = (posSlot >> 1) - 1;
				baseVal = (2 | posSlot & 1) << footerBits;
				this.tempPrices[i] = BitTreeEncoder.ReverseGetPrice(this._posEncoders, baseVal - posSlot - 1, footerBits, i - baseVal);
			}
			for (lenToPosState = 0; lenToPosState < 4; lenToPosState += 1) {
				encoder = this._posSlotEncoder[lenToPosState];
				st = lenToPosState << 6;
				for (posSlot = 0; posSlot < this._distTableSize; posSlot += 1) {
					this._posSlotPrices[st + posSlot] = encoder.GetPrice(posSlot);
				}
				for (posSlot = 14; posSlot < this._distTableSize; posSlot += 1) {
					this._posSlotPrices[st + posSlot] += (posSlot >> 1) - 1 - 4 << 6;
				}
				st2 = lenToPosState * 128;
				for (i = 0; i < 4; i += 1) {
					this._distancesPrices[st2 + i] = this._posSlotPrices[st + i];
				}
				for (; i < 128; i += 1) {
					this._distancesPrices[st2 + i] = this._posSlotPrices[st + GetPosSlot(i)] + this.tempPrices[i];
				}
			}
			this._matchPriceCount = 0;
		},
		FillAlignPrices: function () {
			var i;
			for (i = 0; i < 16; i += 1) {
				this._alignPrices[i] = this._posAlignEncoder.ReverseGetPrice(i);
			}
			this._alignPriceCount = 0;
		},
		SetDictionarySize: function (dictionarySize) {
			var dicLogSize;
			if (dictionarySize < 1 || dictionarySize > 536870912) {
				return false;
			}
			this._dictionarySize = dictionarySize;
			for (dicLogSize = 0;; dicLogSize += 1) {
				if (dictionarySize >= 1 << dicLogSize) {
					break;
				}
			}
			this._distTableSize = dicLogSize * 2;
			return true;
		},
		SetNumFastBytes: function (numFastBytes) {
			if (numFastBytes < 5 || numFastBytes > 273) {
				return false;
			}
			this._numFastBytes = numFastBytes;
			return true;
		},
		SetMatchFinder: function (matchFinderIndex) {
			var matchFinderIndexPrev;
			if (matchFinderIndex < 0 || matchFinderIndex > 2) {
				return false;
			}
			matchFinderIndexPrev = this._matchFinderType;
			this._matchFinderType = matchFinderIndex;
			if (!!this._matchFinder && matchFinderIndexPrev != this._matchFinderType) {
				this._dictionarySizePrev = -1;
				this._matchFinder = null;
			}
			return true;
		},
		SetLcLpPb: function (lc, lp, pb) {
			if (lp < 0 || lp > 4 || lc < 0 || lc > 8 || pb < 0 || pb > 4) {
				return false;
			}
			this._numLiteralPosStateBits = lp;
			this._numLiteralContextBits = lc;
			this._posStateBits = pb;
			this._posStateMask = (1 << this._posStateBits) - 1;
			return true;
		},
	});
	
	
	function $clinit_60() {
		if (dontExecute.$clinit_60) {
			return;
		}
		dontExecute.$clinit_60 = true;
		var i, j, r;
		CrcTable = initDim(_3I_classLit, 0, -1, 256, 1);
		for (i = 0; i < 256; i += 1) {
			r = i;
			for (j = 0; j < 8; j += 1) {
				if ((r & 1) != 0) {
					r = r >>> 1 ^ -306674912;
				} else {
					r >>>= 1;
				}
			}
			CrcTable[i] = r;
		}
	}
	
	var InWindow = $Class.extend({
		getClass$: getClass_40,
		typeMarker$: nullMethod,
		typeId$: 0,
		_blockSize: 0,
		_bufferBase: null,
		_bufferOffset: 0,
		_keepSizeAfter: 0,
		_keepSizeBefore: 0,
		_pointerToLastSafePosition: 0,
		_pos: 0,
		_posLimit: 0,
		_stream: null,
		_streamEndWasReached: false,
		_streamPos: 0
	});
	
	var BinTree = InWindow.extend({
		getClass$: getClass_39,
		typeId$: 0,
		HASH_ARRAY: true,
		_cutValue: 255,
		_cyclicBufferPos: 0,
		_cyclicBufferSize: 0,
		_hash: null,
		_hashMask: 0,
		_hashSizeSum: 0,
		_matchMaxLen: 0,
		_son: null,
		kFixHashSize: 66560,
		kMinMatchCheck: 4,
		kNumHashDirectBytes: 0
	});
	
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
			if (hs > 16777216) {
				hs >>= 1;
			}
			this$static._hashMask = hs;
			hs += 1;
			hs += this$static.kFixHashSize;
		}

		if (hs != this$static._hashSizeSum) {
			this$static._hash = initDim(_3I_classLit, 0, -1, this$static._hashSizeSum = hs, 1);
		}
		return true;
	}
	
	function $Create_2(this$static) {
		var bt, numHashBytes;
		if (!this$static._matchFinder) {
			$clinit_60();
			bt = new BinTree();
			numHashBytes = 4;
			if (this$static._matchFinderType == 0) {
				numHashBytes = 2;
			}
			$SetType(bt, numHashBytes);
			this$static._matchFinder = bt;
		}
		this$static._literalEncoder.Create(this$static._numLiteralPosStateBits, this$static._numLiteralContextBits);
		if (this$static._dictionarySize == this$static._dictionarySizePrev && this$static._numFastBytesPrev == this$static._numFastBytes) {
			return;
		}
		$Create_3(this$static._matchFinder, this$static._dictionarySize, 4096, this$static._numFastBytes, 274);
		this$static._dictionarySizePrev = this$static._dictionarySize;
		this$static._numFastBytesPrev = this$static._numFastBytes;
	}
	
	function $BaseInit(this$static) {
		var i;
		this$static._state = 0;
		this$static._previousByte = 0;
		for (i = 0; i < 4; i += 1) {
			this$static._repDistances[i] = 0;
		}
	}
	
	function $Init_9(this$static) {
		this$static._position = P0_longLit;
		this$static.Low = P0_longLit;
		this$static.Range = -1;
		this$static._cacheSize = 1;
		this$static._cache = 0;
	}
	
	function $Init_3(this$static) {
		var i, numStates;
		numStates = 1 << this$static.m_NumPrevBits + this$static.m_NumPosBits;
		for (i = 0; i < numStates; i += 1) {
			RangeCoderEncoder.InitBitModels(this$static.m_Coders[i].m_Encoders);
		}
	}
	
	function $Init_4(this$static) {
		var i;
		$BaseInit(this$static);
		$Init_9(this$static._rangeEncoder);
		RangeCoderEncoder.InitBitModels(this$static._isMatch);
		RangeCoderEncoder.InitBitModels(this$static._isRep0Long);
		RangeCoderEncoder.InitBitModels(this$static._isRep);
		RangeCoderEncoder.InitBitModels(this$static._isRepG0);
		RangeCoderEncoder.InitBitModels(this$static._isRepG1);
		RangeCoderEncoder.InitBitModels(this$static._isRepG2);
		RangeCoderEncoder.InitBitModels(this$static._posEncoders);
		$Init_3(this$static._literalEncoder);
		for (i = 0; i < 4; i += 1) {
			RangeCoderDecoder.InitBitModels(this$static._posSlotEncoder[i].Models);
		}
		this$static._lenEncoder.Init(1 << this$static._posStateBits);
		this$static._repMatchLenEncoder.Init(1 << this$static._posStateBits);
		RangeCoderDecoder.InitBitModels(this$static._posAlignEncoder.Models);
		this$static._longestMatchWasFound = false;
		this$static._optimumEndIndex = 0;
		this$static._optimumCurrentIndex = 0;
		this$static._additionalOffset = 0;
	}
	
	var Chunker = $Class.extend({
		init: function (encoder, decoder) {
			this.encoder = encoder;
			this.decoder = decoder;
			this.alive = true;
		},
		getClass$: getClass_28,
		typeMarker$: nullMethod,
		typeId$: 0,
		alive: false,
		decoder: null,
		encoder: null
	});
	
	
	function $init(this$static, input, output, length_0, mode) {
		var encoder, i;
		if (!mode) {
			throw new IllegalArgumentException('null mode');
		}
		if (compare(length_0, N1_longLit) < 0) {
			throw new IllegalArgumentException('invalid length ' + toString_0(length_0));
		}
		this$static.length_0 = length_0;
		encoder = new Encoder();
		$configure(mode, encoder);
		encoder._writeEndMark = true;
		encoder.WriteCoderProperties(output);
		for (i = 0; i < 64; i += 8) {
			$write(output, lowBits_0(shr(length_0, i)) & 255);
		}
		
		encoder._needReleaseMFStream = false;
		encoder._inStream = input;
		encoder._finished = false;
		$Create_2(encoder);
		encoder._rangeEncoder.Stream = output;
		$Init_4(encoder);
		encoder.FillDistancesPrices();
		encoder.FillAlignPrices();
		encoder._lenEncoder._tableSize = encoder._numFastBytes + 1 - 2;
		encoder._lenEncoder.UpdateTables(1 << encoder._posStateBits);
		encoder._repMatchLenEncoder._tableSize = encoder._numFastBytes + 1 - 2;
		encoder._repMatchLenEncoder.UpdateTables(1 << encoder._posStateBits);
		encoder.nowPos64 = P0_longLit;

		this$static.chunker = new Chunker(encoder);
	}
	
	function getClass_26() {
		return Lorg_dellroad_lzma_client_LZMACompressor_2_classLit;
	}
	
	var LZMACompressor = $Class.extend({
		getClass$: getClass_26,
		typeMarker$: nullMethod,
		typeId$: 0,
		chunker: null
	});
	
	function getClass_24() {
		return Lorg_dellroad_lzma_client_LZMAByteArrayCompressor_2_classLit;
	}
	
	var LZMAByteArrayCompressor = LZMACompressor.extend({
		init: function (data, mode) {
			var $e0;
			this.output = new ByteArrayOutputStream();
			try {
				$init(this, new ByteArrayInputStream(data), this.output, fromInt(data.length), mode);
			} catch (e) {
				$e0 = caught(e);
				if (instanceOf($e0, 10)) {
					throw new RuntimeException('impossible exception');
				} else {
					throw $e0;
				}
			}
		},
		getClass$: getClass_24,
		typeId$: 0,
		output: null
	});

	function $execute_0(this$static) {
		var $e0, e2;
		try {
			return $processChunk(this$static.chunker);
		} catch (e) {
			$e0 = caught(e);
			if (instanceOf($e0, 10)) {
				e2 = $e0;
				this$static.exception = e2;
				return false;
			} else {
				throw $e0;
			}
		}
	}
	
	var OutWindow = $Class.extend({
		getClass$: getClass_41,
		typeMarker$: nullMethod,
		typeId$: 0,
		_buffer: null,
		_pos: 0,
		_stream: null,
		_streamPos: 0,
		_windowSize: 0,
		Flush: function () {
			var size;
			size = this._pos - this._streamPos;
			if (size == 0) {
				return;
			}
			$write_0(this._stream, this._buffer, this._streamPos, size);
			if (this._pos >= this._windowSize) {
				this._pos = 0;
			}
			this._streamPos = this._pos;
		},
		SetStream: function (stream) {
			this.Flush();
			this._stream = null;
			this._stream = stream;
		},
		ReleaseStream: function () {
			this.Flush();
			this._stream = null;
		},
		GetByte: function (distance) {
			var pos;
			pos = this._pos - distance - 1;
			if (pos < 0) {
				pos += this._windowSize;
			}
			return this._buffer[pos];
		},
		PutByte: function (b) {
			this._buffer[this._pos] = b;
			this._pos += 1;
			if (this._pos >= this._windowSize) {
				this.Flush();
			}
		},
		CopyBlock: function (distance, len) {
			var pos;
			pos = this._pos - distance - 1;
			if (pos < 0) {
				pos += this._windowSize;
			}
			for (; len != 0; len -= 1) {
				if (pos >= this._windowSize) {
					pos = 0;
				}
				this._buffer[this._pos] = this._buffer[pos];
				this._pos += 1;
				pos += 1;
				if (this._pos >= this._windowSize) {
					this.Flush();
				}
			}
		},
		Create: function (windowSize) {
			if (this._buffer == null || this._windowSize != windowSize) {
				this._buffer = initDim(_3B_classLit, 0, -1, windowSize, 1);
			}
			this._windowSize = windowSize;
			this._pos = 0;
			this._streamPos = 0;
		},
		Init: function (solid) {
			if (!solid) {
				this._streamPos = 0;
				this._pos = 0;
			}
		}
	});
	
	
	var LenDecoder = $Class.extend({
		init: function () {
			this.m_Choice = initDim(_3S_classLit, 0, -1, 2, 1);
			this.m_LowCoder = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeDecoder_2_classLit, 0, 7, 16, 0);
			this.m_MidCoder = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeDecoder_2_classLit, 0, 7, 16, 0);
			this.m_HighCoder = new BitTreeDecoder(8);
		},
		Create: function (numPosStates) {
			for (; this.m_NumPosStates < numPosStates; this.m_NumPosStates += 1) {
				this.m_LowCoder[this.m_NumPosStates] = new BitTreeDecoder(3);
				this.m_MidCoder[this.m_NumPosStates] = new BitTreeDecoder(3);
			}
		},
		Init: function () {
			var posState;
			RangeCoderDecoder.InitBitModels(this.m_Choice);
			for (posState = 0; posState < this.m_NumPosStates; posState += 1) {
				RangeCoderDecoder.InitBitModels(this.m_LowCoder[posState].Models);
				RangeCoderDecoder.InitBitModels(this.m_MidCoder[posState].Models);
			}
			RangeCoderDecoder.InitBitModels(this.m_HighCoder.Models);
		},
		Decode: function (rangeDecoder, posState) {
			var symbol;
			if (rangeDecoder.DecodeBit(this.m_Choice, 0) == 0) {
				return this.m_LowCoder[posState].Decode(rangeDecoder);
			}
			symbol = 8;
			if (rangeDecoder.DecodeBit(this.m_Choice, 1) == 0) {
				symbol += this.m_MidCoder[posState].Decode(rangeDecoder);
			} else {
				symbol += 8 + this.m_HighCoder.Decode(rangeDecoder);
			}
			return symbol;
		},
		getClass$: getClass_29,
		typeMarker$: nullMethod,
		typeId$: 0,
		m_NumPosStates: 0
	});

	
	var Decoder2 = $Class.extend({
		init: function () {
			this.m_Decoders = initDim(_3S_classLit, 0, -1, 768, 1);
		},
		DecodeNormal: function (rangeDecoder) {
			var symbol;
			symbol = 1;
			do {
				symbol = symbol << 1 | rangeDecoder.DecodeBit(this.m_Decoders, symbol);
			} while (symbol < 256);
			return symbol << 24 >> 24;
		},
		DecodeWithMatchByte: function (rangeDecoder, matchByte) {
			var bit, matchBit, symbol;
			symbol = 1;
			do {
				matchBit = matchByte >> 7 & 1;
				matchByte <<= 1;
				bit = rangeDecoder.DecodeBit(this.m_Decoders, (1 + matchBit << 8) + symbol);
				symbol = symbol << 1 | bit;
				if (matchBit != bit) {
					while (symbol < 256) {
						symbol = symbol << 1 | rangeDecoder.DecodeBit(this.m_Decoders, symbol);
					}
					break;
				}
			} while (symbol < 256);
			return symbol << 24 >> 24;
		},
		getClass$: getClass_30,
		typeMarker$: nullMethod,
		typeId$: 17
	});


	var LiteralDecoder = $Class.extend({
		GetDecoder: function (pos, prevByte) {
			return this.m_Coders[((pos & this.m_PosMask) << this.m_NumPrevBits) + ((prevByte & 255) >>> 8 - this.m_NumPrevBits)];
		},
		Create: function (numPosBits, numPrevBits) {
			var i, numStates;
			if (this.m_Coders != null && this.m_NumPrevBits == numPrevBits && this.m_NumPosBits == numPosBits) {
				return;
			}
			this.m_NumPosBits = numPosBits;
			this.m_PosMask = (1 << numPosBits) - 1;
			this.m_NumPrevBits = numPrevBits;
			numStates = 1 << this.m_NumPrevBits + this.m_NumPosBits;
			this.m_Coders = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LiteralDecoder$Decoder2_2_classLit, 0, 4, numStates, 0);
			for (i = 0; i < numStates; i += 1) {
				this.m_Coders[i] = new Decoder2();
			}
		},
		getClass$: getClass_31,
		typeMarker$: nullMethod,
		typeId$: 0,
		m_Coders: null,
		m_NumPosBits: 0,
		m_NumPrevBits: 0,
		m_PosMask: 0
	});

	
	var Decoder = $Class.extend({
		init: function () {
			var i;
			this.m_OutWindow = new OutWindow();
			this.m_RangeDecoder = new RangeCoderDecoder();
			this.m_IsMatchDecoders = initDim(_3S_classLit, 0, -1, 192, 1);
			this.m_IsRepDecoders = initDim(_3S_classLit, 0, -1, 12, 1);
			this.m_IsRepG0Decoders = initDim(_3S_classLit, 0, -1, 12, 1);
			this.m_IsRepG1Decoders = initDim(_3S_classLit, 0, -1, 12, 1);
			this.m_IsRepG2Decoders = initDim(_3S_classLit, 0, -1, 12, 1);
			this.m_IsRep0LongDecoders = initDim(_3S_classLit, 0, -1, 192, 1);
			this.m_PosSlotDecoder = initDim(_3Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeDecoder_2_classLit, 0, 7, 4, 0);
			this.m_PosDecoders = initDim(_3S_classLit, 0, -1, 114, 1);
			this.m_PosAlignDecoder = new BitTreeDecoder(4);
			this.m_LenDecoder = new LenDecoder();
			this.m_RepLenDecoder = new LenDecoder();
			this.m_LiteralDecoder = new LiteralDecoder();
			for (i = 0; i < 4; i += 1) {
				this.m_PosSlotDecoder[i] = new BitTreeDecoder(6);
			}
		},
		SetDictionarySize: function (dictionarySize) {
			if (dictionarySize < 0) {
				return false;
			}
			if (this.m_DictionarySize != dictionarySize) {
				this.m_DictionarySize = dictionarySize;
				this.m_DictionarySizeCheck = Math.max(this.m_DictionarySize, 1);
				this.m_OutWindow.Create(Math.max(this.m_DictionarySizeCheck, 4096));
			}
			return true;
		},
		SetDecoderProperties: function (properties) {
			var dictionarySize, i, lc, lp, pb, remainder, val;
			if (properties.length < 5) {
				return false;
			}
			val = properties[0] & 255;
			lc = val % 9;
			remainder = ~~(val / 9);
			lp = remainder % 5;
			pb = ~~(remainder / 5);
			dictionarySize = 0;
			for (i = 0; i < 4; i += 1) {
				dictionarySize += (properties[1 + i] & 255) << i * 8;
			}
			if (!this.SetLcLpPb(lc, lp, pb)) {
				return false;
			}
			return this.SetDictionarySize(dictionarySize);
		},
		SetLcLpPb: function (lc, lp, pb) {
			var numPosStates;
			if (lc > 8 || lp > 4 || pb > 4) {
				return false;
			}
			this.m_LiteralDecoder.Create(lp, lc);
			numPosStates = 1 << pb;
			this.m_LenDecoder.Create(numPosStates);
			this.m_RepLenDecoder.Create(numPosStates);
			this.m_PosStateMask = numPosStates - 1;
			return true;
		},
		getClass$: getClass_32,
		typeMarker$: nullMethod,
		typeId$: 0,
		m_DictionarySize: -1,
		m_DictionarySizeCheck: -1,
		m_PosStateMask: 0,
		nowPos64: P0_longLit,
		outSize: P0_longLit,
		prevByte: 0,
		rep0: 0,
		rep1: 0,
		rep2: 0,
		rep3: 0,
		state: 0
	});

	
	
	function $Init_0(this$static) {
		var i, numStates;
		numStates = 1 << this$static.m_NumPrevBits + this$static.m_NumPosBits;
		for (i = 0; i < numStates; i += 1) {
			RangeCoderDecoder.InitBitModels(this$static.m_Coders[i].m_Decoders);
		}
	}
	
	function $Init_8(this$static) {
		var i;
		this$static.Code = 0;
		this$static.Range = -1;
		for (i = 0; i < 5; i += 1) {
			this$static.Code = this$static.Code << 8 | $read(this$static.Stream);
		}
	}
	
	function $Init_1(this$static) {
		var i;
		this$static.m_OutWindow.Init(false);
		RangeCoderDecoder.InitBitModels(this$static.m_IsMatchDecoders);
		RangeCoderDecoder.InitBitModels(this$static.m_IsRep0LongDecoders);
		RangeCoderDecoder.InitBitModels(this$static.m_IsRepDecoders);
		RangeCoderDecoder.InitBitModels(this$static.m_IsRepG0Decoders);
		RangeCoderDecoder.InitBitModels(this$static.m_IsRepG1Decoders);
		RangeCoderDecoder.InitBitModels(this$static.m_IsRepG2Decoders);
		RangeCoderDecoder.InitBitModels(this$static.m_PosDecoders);
		$Init_0(this$static.m_LiteralDecoder);
		for (i = 0; i < 4; i += 1) {
			RangeCoderDecoder.InitBitModels(this$static.m_PosSlotDecoder[i].Models);
		}
		this$static.m_LenDecoder.Init();
		this$static.m_RepLenDecoder.Init();
		RangeCoderDecoder.InitBitModels(this$static.m_PosAlignDecoder.Models);
		$Init_8(this$static.m_RangeDecoder);
	}
	
	function $CodeInChunks(this$static, inStream, outStream, outSize) {
		this$static.m_RangeDecoder.Stream = inStream;
		this$static.m_OutWindow.SetStream(outStream);
		$Init_1(this$static);
		this$static.state = 0;
		this$static.rep0 = 0;
		this$static.rep1 = 0;
		this$static.rep2 = 0;
		this$static.rep3 = 0;
		this$static.outSize = outSize;
		this$static.nowPos64 = P0_longLit;
		this$static.prevByte = 0;
		return new Chunker(null, this$static);
	}
	
	function $init_0(this$static, input, output) {
		var decoder,
			hex_length = "",
			i,
			properties,
			r,
			tmp_length;
		
		properties = initDim(_3B_classLit, 0, -1, 5, 1);
		for (i = 0; i < properties.length; i += 1) {
			r = $read(input);
			if (r == -1) {
				throw new IOException('truncated input');
			}
			properties[i] = r << 24 >> 24;
		}
		decoder = new Decoder();
		if (!decoder.SetDecoderProperties(properties)) {
			throw new IOException('corrupted input');
		}
		
		for (i = 0; i < 64; i += 8) {
			r = $read(input);
			if (r == -1) {
				throw new IOException('truncated input');
			}
			r = r.toString(16);
			if (r.length == 1) {
				r = "0" + r;
			}
			hex_length = String(r) + String(hex_length);
		}
		
		/// Was the length set in the header (if it was compressed from a stream, the length is all f's).
		if (hex_length.toLowerCase() == "ffffffffffffffffff" || hex_length == 0) {
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
	
	function getClass_27() {
		return Lorg_dellroad_lzma_client_LZMADecompressor_2_classLit;
	}
	
	var LZMADecompressor = $Class.extend({
		getClass$: getClass_27,
		typeMarker$: nullMethod,
		typeId$: 0,
		chunker: null,
		exception: null,
		length_0: P0_longLit
	});
	
	function getClass_25() {
		return Lorg_dellroad_lzma_client_LZMAByteArrayDecompressor_2_classLit;
	}
	
	var LZMAByteArrayDecompressor = LZMADecompressor.extend({
		init: function (data) {
			this.output = new ByteArrayOutputStream();
			$init_0(this, new ByteArrayInputStream(data), this.output);
		},
		getClass$: getClass_25,
		typeId$: 0,
		output: null
	});
	
	function getClass_40() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_LZ_InWindow_2_classLit;
	}
	
	function getClass_39() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_LZ_BinTree_2_classLit;
	}
	
	function getClass_41() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_LZ_OutWindow_2_classLit;
	}
	
	function getClass_28() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Chunker_2_classLit;
	}
	
	function getClass_32() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder_2_classLit;
	}
	
	function getClass_29() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LenDecoder_2_classLit;
	}
	
	function getClass_31() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LiteralDecoder_2_classLit;
	}
	
	function getClass_30() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Decoder$LiteralDecoder$Decoder2_2_classLit;
	}
	
	function getClass_38() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder_2_classLit;
	}
	
	function getClass_33() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LenEncoder_2_classLit;
	}
	
	function getClass_34() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LenPriceTableEncoder_2_classLit;
	}
	
	function getClass_36() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LiteralEncoder_2_classLit;
	}
	
	function getClass_35() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$LiteralEncoder$Encoder2_2_classLit;
	}
	
	function getClass_37() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_LZMA_Encoder$Optimal_2_classLit;
	}
	
	function getClass_42() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeDecoder_2_classLit;
	}
	
	function getClass_43() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_BitTreeEncoder_2_classLit;
	}
	
	function getClass_44() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_Decoder_2_classLit;
	}
	
	function getClass_45() {
		return Lorg_dellroad_lzma_client_SevenZip_Compression_RangeCoder_Encoder_2_classLit;
	}
	
	function decode(utf) {
		var buf, i, x, y, z;
		buf = new StringBuilder();
		for (i = 0; i < utf.length; i += 1) {
			x = utf[i] & 255;
			if ((x & 128) == 0) {
				if (x == 0) {
					throw new IllegalArgumentException('invalid UTF-8');
				}
				$appendNonNull(buf.data, String.fromCharCode(x & 65535));
			} else if ((x & 224) == 192) {
				if (i + 1 >= utf.length) {
					throw new IllegalArgumentException('invalid UTF-8');
				}
				i += 1;
				y = utf[i] & 255;
				if ((y & 192) != 128) {
					throw new IllegalArgumentException('invalid UTF-8');
				}
				$append(buf.data, String.fromCharCode((x & 31) << 6 & 65535 | y & 63));
			} else if ((x & 240) == 224) {
				if (i + 2 >= utf.length) {
					throw new IllegalArgumentException('invalid UTF-8');
				}
				i += 1;
				y = utf[i] & 255;
				if ((y & 192) != 128) {
					throw new IllegalArgumentException('invalid UTF-8');
				}
				i += 1;
				z = utf[i] & 255;
				if ((z & 192) != 128) {
					throw new IllegalArgumentException('invalid UTF-8');
				}
				$appendNonNull(buf.data, String.fromCharCode(((x & 15) << 12 | (y & 63) << 6 | z & 63) & 65535));
			} else {
				throw new IllegalArgumentException('invalid UTF-8');
			}
		}
		return $toString(buf.data);
	}
	
	function encode(s) {
		var ch, chars, data, elen, i, charArr, n;
		
		n = s.length;
		charArr = initDim(_3C_classLit, 0, -1, n, 1);
		$getChars(s, 0, n, charArr, 0);
		chars = charArr;
		elen = 0;
		for (i = 0; i < s.length; i += 1) {
			ch = chars[i];
			if (ch >= 1 && ch <= 127) {
				elen += 1;
			} else if (ch == 0 || (ch >= 128 && ch <= 2047)) {
				elen += 2;
			} else {
				elen += 3;
			}
		}
		data = initDim(_3B_classLit, 0, -1, elen, 1);
		elen = 0;
		for (i = 0; i < s.length; i += 1) {
			ch = chars[i];
			if (ch >= 1 && ch <= 127) {
				data[elen] = ch << 24 >> 24;
				elen += 1;
			} else if (ch == 0 || (ch >= 128 && ch <= 2047)) {
				data[elen] = (192 | ch >> 6 & 31) << 24 >> 24;
				elen += 1;
				data[elen] = (128 | ch & 63) << 24 >> 24;
				elen += 1;
			} else {
				data[elen] = (224 | ch >> 12 & 15) << 24 >> 24;
				elen += 1;
				data[elen] = (128 | ch >> 6 & 63) << 24 >> 24;
				elen += 1;
				data[elen] = (128 | ch & 63) << 24 >> 24;
				elen += 1;
			}
		}
		return data;
	}
	
	function toDouble(a) {
		return a[1] + a[0];
	}
	
	var LZMADemo = $Class.extend({
		getClass$: getClass_46,
		typeMarker$: nullMethod,
		typeId$: 0,
		c: null,
		d: null
	});
	
	var get_mode_obj = (function () {
		var modes = [{dictionarySize: 16, fb: 64,  matchFinder: 0, lc: 3, lp: 0, pb: 2},
					{dictionarySize: 20, fb: 64,  matchFinder: 0, lc: 3, lp: 0, pb: 2},
					{dictionarySize: 19, fb: 64,  matchFinder: 1, lc: 3, lp: 0, pb: 2},
					{dictionarySize: 20, fb: 64,  matchFinder: 1, lc: 3, lp: 0, pb: 2},
					{dictionarySize: 21, fb: 128, matchFinder: 1, lc: 3, lp: 0, pb: 2},
					{dictionarySize: 22, fb: 128, matchFinder: 1, lc: 3, lp: 0, pb: 2},
					{dictionarySize: 23, fb: 128, matchFinder: 1, lc: 3, lp: 0, pb: 2},
					{dictionarySize: 24, fb: 255, matchFinder: 1, lc: 3, lp: 0, pb: 2},
					{dictionarySize: 25, fb: 255, matchFinder: 1, lc: 3, lp: 0, pb: 2}];
		
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
		
	function compress(str, mode, callback_num) {
		var this$static = new LZMADemo(),
			percent,
			start;
		
		this$static.mode = get_mode_obj(mode);
		
		this$static.c = new LZMAByteArrayCompressor(encode(str), this$static.mode);
		
		update_progress(0, callback_num);
		
		function do_action() {
			start = (new Date()).getTime();
			while ($execute(this$static.c)) {
				percent = toDouble(this$static.c.chunker.inBytesProcessed) / toDouble(this$static.c.length_0);
				/// If about 200 miliseconds have passed, update the progress.
				if ((new Date()).getTime() - start > 200) {
					update_progress(percent, callback_num);
					setTimeout(do_action, 0);
					return false;
				}
			}
			
			update_progress(1, callback_num);
			
			/// .slice(0) is required for Firefox 4.0 (because I think arrays are now passed by reference, which is not allowed when sending messages to or from web workers).
			/// .slice(0) simply returns the entire array by value.
			postMessage({
				action: action_compress,
				callback_num: callback_num,
				result: $toByteArray(this$static.c.output).slice(0)
			});
		}
		
		setTimeout(do_action, 1);
	}
	
	function decompress(byte_arr, callback_num) {
		var this$static = new LZMADemo(),
			percent,
			data = initValues(_3B_classLit, 0, -1, byte_arr),
			start;
		
		this$static.d = new LZMAByteArrayDecompressor(data);
		
		update_progress(0, callback_num);
		
		function do_action() {
			start = (new Date()).getTime();
			while ($execute_0(this$static.d)) {
				percent = toDouble(this$static.d.chunker.decoder.nowPos64) / toDouble(this$static.d.length_0);
				/// If about 200 miliseconds have passed, update the progress.
				if ((new Date()).getTime() - start > 200) {
					update_progress(percent, callback_num);
					setTimeout(do_action, 0);
					return false;
				}
			}
			
			update_progress(1, callback_num);
			
			postMessage({
				action: action_decompress,
				callback_num: callback_num,
				result: decode($toByteArray(this$static.d.output))
			});
		}
		
		setTimeout(do_action, 0);
	}
	
	function getClass_46() {
		return Lorg_dellroad_lzma_demo_client_LZMADemo_2_classLit;
	}
	
	
	return {
		compress:   compress,
		decompress: decompress
	};
}());

onmessage = function (e) {
	if (e.data.action === action_compress) {
		LZMA.compress(e.data.data, e.data.mode, e.data.callback_num);
	} else {
		LZMA.decompress(e.data.data, e.data.callback_num);
	}
};
