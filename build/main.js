(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_enqueueEffects(managers, result.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$document = _Browser_document;
var $mdgriffith$elm_ui$Internal$Model$AlignY = function (a) {
	return {$: 'AlignY', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Top = {$: 'Top'};
var $mdgriffith$elm_ui$Element$alignTop = $mdgriffith$elm_ui$Internal$Model$AlignY($mdgriffith$elm_ui$Internal$Model$Top);
var $mdgriffith$elm_ui$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 'Colored', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 'StyleClass', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
	return {$: 'Flag', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
	return {$: 'Second', a: a};
};
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $mdgriffith$elm_ui$Internal$Flag$flag = function (i) {
	return (i > 31) ? $mdgriffith$elm_ui$Internal$Flag$Second(1 << (i - 32)) : $mdgriffith$elm_ui$Internal$Flag$Flag(1 << i);
};
var $mdgriffith$elm_ui$Internal$Flag$bgColor = $mdgriffith$elm_ui$Internal$Flag$flag(8);
var $elm$core$Basics$round = _Basics_round;
var $mdgriffith$elm_ui$Internal$Model$floatClass = function (x) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(x * 255));
};
var $mdgriffith$elm_ui$Internal$Model$formatColorClass = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return $mdgriffith$elm_ui$Internal$Model$floatClass(red) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(green) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(blue) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(alpha))))));
};
var $mdgriffith$elm_ui$Element$Background$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$bgColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var $mdgriffith$elm_ui$Internal$Flag$fontColor = $mdgriffith$elm_ui$Internal$Flag$flag(14);
var $mdgriffith$elm_ui$Element$Font$color = function (fontColor) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var $mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
	return {$: 'Unkeyed', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AsColumn = {$: 'AsColumn'};
var $mdgriffith$elm_ui$Internal$Model$asColumn = $mdgriffith$elm_ui$Internal$Model$AsColumn;
var $mdgriffith$elm_ui$Internal$Style$classes = {above: 'a', active: 'atv', alignBottom: 'ab', alignCenterX: 'cx', alignCenterY: 'cy', alignContainerBottom: 'acb', alignContainerCenterX: 'accx', alignContainerCenterY: 'accy', alignContainerRight: 'acr', alignLeft: 'al', alignRight: 'ar', alignTop: 'at', alignedHorizontally: 'ah', alignedVertically: 'av', any: 's', behind: 'bh', below: 'b', bold: 'w7', borderDashed: 'bd', borderDotted: 'bdt', borderNone: 'bn', borderSolid: 'bs', capturePointerEvents: 'cpe', clip: 'cp', clipX: 'cpx', clipY: 'cpy', column: 'c', container: 'ctr', contentBottom: 'cb', contentCenterX: 'ccx', contentCenterY: 'ccy', contentLeft: 'cl', contentRight: 'cr', contentTop: 'ct', cursorPointer: 'cptr', cursorText: 'ctxt', focus: 'fcs', focusedWithin: 'focus-within', fullSize: 'fs', grid: 'g', hasBehind: 'hbh', heightContent: 'hc', heightExact: 'he', heightFill: 'hf', heightFillPortion: 'hfp', hover: 'hv', imageContainer: 'ic', inFront: 'fr', inputMultiline: 'iml', inputMultilineFiller: 'imlf', inputMultilineParent: 'imlp', inputMultilineWrapper: 'implw', inputText: 'it', italic: 'i', link: 'lnk', nearby: 'nb', noTextSelection: 'notxt', onLeft: 'ol', onRight: 'or', opaque: 'oq', overflowHidden: 'oh', page: 'pg', paragraph: 'p', passPointerEvents: 'ppe', root: 'ui', row: 'r', scrollbars: 'sb', scrollbarsX: 'sbx', scrollbarsY: 'sby', seButton: 'sbt', single: 'e', sizeByCapital: 'cap', spaceEvenly: 'sev', strike: 'sk', text: 't', textCenter: 'tc', textExtraBold: 'w8', textExtraLight: 'w2', textHeavy: 'w9', textJustify: 'tj', textJustifyAll: 'tja', textLeft: 'tl', textLight: 'w3', textMedium: 'w5', textNormalWeight: 'w4', textRight: 'tr', textSemiBold: 'w6', textThin: 'w1', textUnitalicized: 'tun', transition: 'ts', transparent: 'clr', underline: 'u', widthContent: 'wc', widthExact: 'we', widthFill: 'wf', widthFillPortion: 'wfp', wrapped: 'wrp'};
var $mdgriffith$elm_ui$Internal$Model$Generic = {$: 'Generic'};
var $mdgriffith$elm_ui$Internal$Model$div = $mdgriffith$elm_ui$Internal$Model$Generic;
var $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = {$: 'NoNearbyChildren'};
var $mdgriffith$elm_ui$Internal$Model$columnClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.column);
var $mdgriffith$elm_ui$Internal$Model$gridClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.grid);
var $mdgriffith$elm_ui$Internal$Model$pageClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.page);
var $mdgriffith$elm_ui$Internal$Model$paragraphClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.paragraph);
var $mdgriffith$elm_ui$Internal$Model$rowClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.row);
var $mdgriffith$elm_ui$Internal$Model$singleClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.single);
var $mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
	switch (context.$) {
		case 'AsRow':
			return $mdgriffith$elm_ui$Internal$Model$rowClass;
		case 'AsColumn':
			return $mdgriffith$elm_ui$Internal$Model$columnClass;
		case 'AsEl':
			return $mdgriffith$elm_ui$Internal$Model$singleClass;
		case 'AsGrid':
			return $mdgriffith$elm_ui$Internal$Model$gridClass;
		case 'AsParagraph':
			return $mdgriffith$elm_ui$Internal$Model$paragraphClass;
		default:
			return $mdgriffith$elm_ui$Internal$Model$pageClass;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
	return {$: 'Keyed', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$NoStyleSheet = {$: 'NoStyleSheet'};
var $mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
	return {$: 'Styled', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addChildren = F2(
	function (existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 'NoNearbyChildren':
				return existing;
			case 'ChildrenBehind':
				var behind = nearbyChildren.a;
				return _Utils_ap(behind, existing);
			case 'ChildrenInFront':
				var inFront = nearbyChildren.a;
				return _Utils_ap(existing, inFront);
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					behind,
					_Utils_ap(existing, inFront));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$addKeyedChildren = F3(
	function (key, existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 'NoNearbyChildren':
				return existing;
			case 'ChildrenBehind':
				var behind = nearbyChildren.a;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					existing);
			case 'ChildrenInFront':
				var inFront = nearbyChildren.a;
				return _Utils_ap(
					existing,
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						inFront));
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					_Utils_ap(
						existing,
						A2(
							$elm$core$List$map,
							function (x) {
								return _Utils_Tuple2(key, x);
							},
							inFront)));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$AsEl = {$: 'AsEl'};
var $mdgriffith$elm_ui$Internal$Model$asEl = $mdgriffith$elm_ui$Internal$Model$AsEl;
var $mdgriffith$elm_ui$Internal$Model$AsParagraph = {$: 'AsParagraph'};
var $mdgriffith$elm_ui$Internal$Model$asParagraph = $mdgriffith$elm_ui$Internal$Model$AsParagraph;
var $mdgriffith$elm_ui$Internal$Flag$alignBottom = $mdgriffith$elm_ui$Internal$Flag$flag(41);
var $mdgriffith$elm_ui$Internal$Flag$alignRight = $mdgriffith$elm_ui$Internal$Flag$flag(40);
var $mdgriffith$elm_ui$Internal$Flag$centerX = $mdgriffith$elm_ui$Internal$Flag$flag(42);
var $mdgriffith$elm_ui$Internal$Flag$centerY = $mdgriffith$elm_ui$Internal$Flag$flag(43);
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 'Px':
			var px = x.a;
			return $elm$core$String$fromInt(px) + 'px';
		case 'Content':
			return 'auto';
		case 'Fill':
			var i = x.a;
			return $elm$core$String$fromInt(i) + 'fr';
		case 'Min':
			var min = x.a;
			var len = x.b;
			return 'min' + ($elm$core$String$fromInt(min) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + ($elm$core$String$fromInt(max) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
	}
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $mdgriffith$elm_ui$Internal$Model$transformClass = function (transform) {
	switch (transform.$) {
		case 'Untransformed':
			return $elm$core$Maybe$Nothing;
		case 'Moved':
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'mv-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(x) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(y) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(z))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			return $elm$core$Maybe$Just(
				'tfrm-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ty) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ox) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oz) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(angle))))))))))))))))))));
	}
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $mdgriffith$elm_ui$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 'Shadows':
			var name = style.a;
			return name;
		case 'Transparency':
			var name = style.a;
			var o = style.b;
			return name;
		case 'Style':
			var _class = style.a;
			return _class;
		case 'FontFamily':
			var name = style.a;
			return name;
		case 'FontSize':
			var i = style.a;
			return 'font-size-' + $elm$core$String$fromInt(i);
		case 'Single':
			var _class = style.a;
			return _class;
		case 'Colored':
			var _class = style.a;
			return _class;
		case 'SpacingStyle':
			var cls = style.a;
			var x = style.b;
			var y = style.c;
			return cls;
		case 'PaddingStyle':
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 'BorderWidth':
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 'GridTemplateStyle':
			var template = style.a;
			return 'grid-rows-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.b)))))));
		case 'GridPosition':
			var pos = style.a;
			return 'gp grid-pos-' + ($elm$core$String$fromInt(pos.row) + ('-' + ($elm$core$String$fromInt(pos.col) + ('-' + ($elm$core$String$fromInt(pos.width) + ('-' + $elm$core$String$fromInt(pos.height)))))));
		case 'PseudoSelector':
			var selector = style.a;
			var subStyle = style.b;
			var name = function () {
				switch (selector.$) {
					case 'Focus':
						return 'fs';
					case 'Hover':
						return 'hv';
					default:
						return 'act';
				}
			}();
			return A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					function (sty) {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$getStyleName(sty);
						if (_v1 === '') {
							return '';
						} else {
							var styleName = _v1;
							return styleName + ('-' + name);
						}
					},
					subStyle));
		default:
			var x = style.a;
			return A2(
				$elm$core$Maybe$withDefault,
				'',
				$mdgriffith$elm_ui$Internal$Model$transformClass(x));
	}
};
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $mdgriffith$elm_ui$Internal$Model$reduceStyles = F2(
	function (style, nevermind) {
		var cache = nevermind.a;
		var existing = nevermind.b;
		var styleName = $mdgriffith$elm_ui$Internal$Model$getStyleName(style);
		return A2($elm$core$Set$member, styleName, cache) ? nevermind : _Utils_Tuple2(
			A2($elm$core$Set$insert, styleName, cache),
			A2($elm$core$List$cons, style, existing));
	});
var $mdgriffith$elm_ui$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 'Property', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 'Style', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$dot = function (c) {
	return '.' + c;
};
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $mdgriffith$elm_ui$Internal$Model$formatColor = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return 'rgba(' + ($elm$core$String$fromInt(
		$elm$core$Basics$round(red * 255)) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(green * 255))) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(blue * 255))) + (',' + ($elm$core$String$fromFloat(alpha) + ')')))));
};
var $mdgriffith$elm_ui$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.inset ? $elm$core$Maybe$Just('inset') : $elm$core$Maybe$Nothing,
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.offset.a) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.offset.b) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.blur) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.size) + 'px'),
					$elm$core$Maybe$Just(
					$mdgriffith$elm_ui$Internal$Model$formatColor(shadow.color))
				])));
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $mdgriffith$elm_ui$Internal$Model$renderFocusStyle = function (focus) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.focusedWithin) + ':focus-within',
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.borderColor),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.backgroundColor),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										blur: shadow.blur,
										color: shadow.color,
										inset: false,
										offset: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.offset)),
										size: shadow.size
									}));
						},
						focus.shadow),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					]))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + (':focus .focusable, ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + '.focusable:focus')),
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.borderColor),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.backgroundColor),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										blur: shadow.blur,
										color: shadow.color,
										inset: false,
										offset: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.offset)),
										size: shadow.size
									}));
						},
						focus.shadow),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					])))
		]);
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
	return {$: 'Batch', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 'Child', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 'Descriptor', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Left = {$: 'Left'};
var $mdgriffith$elm_ui$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 'Prop', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Right = {$: 'Right'};
var $mdgriffith$elm_ui$Internal$Style$Self = function (a) {
	return {$: 'Self', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 'Supports', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Content = function (a) {
	return {$: 'Content', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Bottom = {$: 'Bottom'};
var $mdgriffith$elm_ui$Internal$Style$CenterX = {$: 'CenterX'};
var $mdgriffith$elm_ui$Internal$Style$CenterY = {$: 'CenterY'};
var $mdgriffith$elm_ui$Internal$Style$Top = {$: 'Top'};
var $mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray(
	[$mdgriffith$elm_ui$Internal$Style$Top, $mdgriffith$elm_ui$Internal$Style$Bottom, $mdgriffith$elm_ui$Internal$Style$Right, $mdgriffith$elm_ui$Internal$Style$Left, $mdgriffith$elm_ui$Internal$Style$CenterX, $mdgriffith$elm_ui$Internal$Style$CenterY]);
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _v1 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentTop);
		case 'Bottom':
			var _v2 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentBottom);
		case 'Right':
			var _v3 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentRight);
		case 'Left':
			var _v4 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentLeft);
		case 'CenterX':
			var _v5 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentCenterX);
		default:
			var _v6 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY);
	}
};
var $mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _v1 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignTop);
		case 'Bottom':
			var _v2 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignBottom);
		case 'Right':
			var _v3 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignRight);
		case 'Left':
			var _v4 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignLeft);
		case 'CenterX':
			var _v5 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX);
		default:
			var _v6 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY);
	}
};
var $mdgriffith$elm_ui$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _v0 = values(alignment);
		var content = _v0.a;
		var indiv = _v0.b;
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$contentName(
					$mdgriffith$elm_ui$Internal$Style$Content(alignment)),
				content),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(
							$mdgriffith$elm_ui$Internal$Style$Self(alignment)),
						indiv)
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$elDescription = _List_fromArray(
	[
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hasBehind),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.seButton),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'auto !important')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightContent),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
			])),
		$mdgriffith$elm_ui$Internal$Style$describeAlignment(
		function (alignment) {
			switch (alignment.$) {
				case 'Top':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
							]));
				case 'Bottom':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
							]));
				case 'Right':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
							]));
				case 'Left':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							]));
				case 'CenterX':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
							]));
				default:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
									]))
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
							]));
			}
		})
	]);
var $mdgriffith$elm_ui$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(
							$mdgriffith$elm_ui$Internal$Style$Self(alignment)),
						values(alignment))
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$Above = {$: 'Above'};
var $mdgriffith$elm_ui$Internal$Style$Behind = {$: 'Behind'};
var $mdgriffith$elm_ui$Internal$Style$Below = {$: 'Below'};
var $mdgriffith$elm_ui$Internal$Style$OnLeft = {$: 'OnLeft'};
var $mdgriffith$elm_ui$Internal$Style$OnRight = {$: 'OnRight'};
var $mdgriffith$elm_ui$Internal$Style$Within = {$: 'Within'};
var $mdgriffith$elm_ui$Internal$Style$locations = function () {
	var loc = $mdgriffith$elm_ui$Internal$Style$Above;
	var _v0 = function () {
		switch (loc.$) {
			case 'Above':
				return _Utils_Tuple0;
			case 'Below':
				return _Utils_Tuple0;
			case 'OnRight':
				return _Utils_Tuple0;
			case 'OnLeft':
				return _Utils_Tuple0;
			case 'Within':
				return _Utils_Tuple0;
			default:
				return _Utils_Tuple0;
		}
	}();
	return _List_fromArray(
		[$mdgriffith$elm_ui$Internal$Style$Above, $mdgriffith$elm_ui$Internal$Style$Below, $mdgriffith$elm_ui$Internal$Style$OnRight, $mdgriffith$elm_ui$Internal$Style$OnLeft, $mdgriffith$elm_ui$Internal$Style$Within, $mdgriffith$elm_ui$Internal$Style$Behind]);
}();
var $mdgriffith$elm_ui$Internal$Style$baseSheet = _List_fromArray(
	[
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		'html,body',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		_Utils_ap(
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
			_Utils_ap(
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.imageContainer))),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ':focus',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'outline', 'none')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.root),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.nearby),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.nearby),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				$mdgriffith$elm_ui$Internal$Style$Batch(
				function (fn) {
					return A2($elm$core$List$map, fn, $mdgriffith$elm_ui$Internal$Style$locations);
				}(
					function (loc) {
						switch (loc.$) {
							case 'Above':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.above),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
												])),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'Below':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.below),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												]))
										]));
							case 'OnRight':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onRight),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'OnLeft':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onLeft),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'right', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'Within':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							default:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
						}
					}))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'resize', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'box-sizing', 'border-box'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-size', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-family', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'inherit'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.wrapped),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-wrap', 'wrap')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.noTextSelection),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-moz-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-webkit-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-ms-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'user-select', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cursorPointer),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'pointer')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cursorText),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.passPointerEvents),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.capturePointerEvents),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.transparent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.opaque),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.hover, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.hover, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.focus, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.focus, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.active, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.active, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.transition),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Prop,
						'transition',
						A2(
							$elm$core$String$join,
							', ',
							A2(
								$elm$core$List$map,
								function (x) {
									return x + ' 160ms';
								},
								_List_fromArray(
									['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbars),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbarsX),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbarsY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clip),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clipX),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clipY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', 'auto')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderNone),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderDashed),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dashed')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderDotted),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dotted')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderSolid),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputText),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1.05'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background', 'transparent')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthExact),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.link),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-left', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-right', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 'Bottom':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 'Right':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_Nil);
								case 'Left':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_Nil);
								case 'CenterX':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.spaceEvenly),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightExact),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
											]));
								case 'Bottom':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto')
											]));
								case 'Right':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 'CenterX':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.spaceEvenly),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.grid),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', '-ms-grid'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'.gp',
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Supports,
						_Utils_Tuple2('display', 'grid'),
						_List_fromArray(
							[
								_Utils_Tuple2('display', 'grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$gridAlignments(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
										]);
								case 'Bottom':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
										]);
								case 'Right':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
										]);
								case 'Left':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
										]);
								case 'CenterX':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
										]);
								default:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
										]);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.page),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any + ':first-child'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.any + ($mdgriffith$elm_ui$Internal$Style$selfName(
								$mdgriffith$elm_ui$Internal$Style$Self($mdgriffith$elm_ui$Internal$Style$Left)) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.any))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.any + ($mdgriffith$elm_ui$Internal$Style$selfName(
								$mdgriffith$elm_ui$Internal$Style$Self($mdgriffith$elm_ui$Internal$Style$Right)) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.any))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Bottom':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Right':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 'CenterX':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultiline),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background-color', 'transparent')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineWrapper),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineParent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineFiller),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'transparent')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.paragraph),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hasBehind),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.above),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.below),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onRight),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onLeft),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Internal$Style$Child,
										$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
											]))
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.grid),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Bottom':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Right':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right')
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left')
											]));
								case 'CenterX':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.hidden',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textThin),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '100')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textExtraLight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '200')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textLight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '300')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textNormalWeight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '400')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textMedium),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '500')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textSemiBold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '600')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '700')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textExtraBold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '800')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textHeavy),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '900')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.italic),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'italic')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.strike),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.underline),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.underline),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.strike)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textUnitalicized),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'normal')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textJustify),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textJustifyAll),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify-all')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textCenter),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'center')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textRight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'right')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textLeft),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'left')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.modal',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none')
					]))
			]))
	]);
var $mdgriffith$elm_ui$Internal$Style$fontVariant = function (_var) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + _var,
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\"'))
				])),
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + (_var + '-off'),
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\" 0'))
				]))
		]);
};
var $mdgriffith$elm_ui$Internal$Style$commonValues = $elm$core$List$concat(
	_List_fromArray(
		[
			A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.border-' + $elm$core$String$fromInt(x),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'border-width',
							$elm$core$String$fromInt(x) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 6)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 8, 32)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.p-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'padding',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 24)),
			_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'small-caps')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp-off',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'normal')
					]))
			]),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('zero'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('onum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('liga'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('dlig'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('ordn'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('tnum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('afrc'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('frac')
		]));
var $mdgriffith$elm_ui$Internal$Style$explainer = '\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > .' + ($mdgriffith$elm_ui$Internal$Style$classes.any + (' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > .' + ($mdgriffith$elm_ui$Internal$Style$classes.any + ' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n')));
var $mdgriffith$elm_ui$Internal$Style$inputTextReset = '\ninput[type="search"],\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$sliderReset = '\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$thumbReset = '\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n';
var $mdgriffith$elm_ui$Internal$Style$trackReset = '\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + (' { flex-basis: auto !important; } ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container) + (' { flex-basis: auto !important; }}' + ($mdgriffith$elm_ui$Internal$Style$inputTextReset + ($mdgriffith$elm_ui$Internal$Style$sliderReset + ($mdgriffith$elm_ui$Internal$Style$trackReset + ($mdgriffith$elm_ui$Internal$Style$thumbReset + $mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $mdgriffith$elm_ui$Internal$Style$Intermediate = function (a) {
	return {$: 'Intermediate', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return $mdgriffith$elm_ui$Internal$Style$Intermediate(
			{closing: closing, others: _List_Nil, props: _List_Nil, selector: selector});
	});
var $mdgriffith$elm_ui$Internal$Style$renderRules = F2(
	function (_v0, rulesToRender) {
		var parent = _v0.a;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 'Prop':
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								props: A2(
									$elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.props)
							});
					case 'Supports':
						var _v2 = rule.a;
						var prop = _v2.a;
						var value = _v2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Style$Intermediate(
										{closing: '\n}', others: _List_Nil, props: props, selector: '@supports (' + (prop + (':' + (value + (') {' + parent.selector))))}),
									rendered.others)
							});
					case 'Adjacent':
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector + (' + ' + selector), ''),
										adjRules),
									rendered.others)
							});
					case 'Child':
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector + (' > ' + child), ''),
										childRules),
									rendered.others)
							});
					case 'Descriptor':
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(
											$mdgriffith$elm_ui$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.selector, descriptor),
											''),
										descriptorRules),
									rendered.others)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector, ''),
										batched),
									rendered.others)
							});
				}
			});
		return $mdgriffith$elm_ui$Internal$Style$Intermediate(
			A3($elm$core$List$foldr, generateIntermediates, parent, rulesToRender));
	});
var $mdgriffith$elm_ui$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return $elm$core$String$concat(
			A2(
				$elm$core$List$map,
				function (_v3) {
					var x = _v3.a;
					var y = _v3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _v2 = rule.props;
		if (!_v2.b) {
			return '';
		} else {
			return rule.selector + ('{' + (renderValues(rule.props) + (rule.closing + '}')));
		}
	};
	var renderIntermediate = function (_v0) {
		var rule = _v0.a;
		return _Utils_ap(
			renderClass(rule),
			$elm$core$String$concat(
				A2($elm$core$List$map, renderIntermediate, rule.others)));
	};
	return $elm$core$String$concat(
		A2(
			$elm$core$List$map,
			renderIntermediate,
			A3(
				$elm$core$List$foldr,
				F2(
					function (_v1, existing) {
						var name = _v1.a;
						var styleRules = _v1.b;
						return A2(
							$elm$core$List$cons,
							A2(
								$mdgriffith$elm_ui$Internal$Style$renderRules,
								A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var $mdgriffith$elm_ui$Internal$Style$rules = _Utils_ap(
	$mdgriffith$elm_ui$Internal$Style$overrides,
	$mdgriffith$elm_ui$Internal$Style$renderCompact(
		_Utils_ap($mdgriffith$elm_ui$Internal$Style$baseSheet, $mdgriffith$elm_ui$Internal$Style$commonValues)));
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $mdgriffith$elm_ui$Internal$Model$staticRoot = function (opts) {
	var _v0 = opts.mode;
	switch (_v0.$) {
		case 'Layout':
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'div',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$virtual_dom$VirtualDom$node,
						'style',
						_List_Nil,
						_List_fromArray(
							[
								$elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Style$rules)
							]))
					]));
		case 'NoStaticStyleSheet':
			return $elm$virtual_dom$VirtualDom$text('');
		default:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'elm-ui-static-rules',
				_List_fromArray(
					[
						A2(
						$elm$virtual_dom$VirtualDom$property,
						'rules',
						$elm$json$Json$Encode$string($mdgriffith$elm_ui$Internal$Style$rules))
					]),
				_List_Nil);
	}
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$fontName = function (font) {
	switch (font.$) {
		case 'Serif':
			return 'serif';
		case 'SansSerif':
			return 'sans-serif';
		case 'Monospace':
			return 'monospace';
		case 'Typeface':
			var name = font.a;
			return '\"' + (name + '\"');
		case 'ImportFont':
			var name = font.a;
			var url = font.b;
			return '\"' + (name + '\"');
		default:
			var name = font.a.name;
			return '\"' + (name + '\"');
	}
};
var $mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
	switch (_var.$) {
		case 'VariantActive':
			var name = _var.a;
			return name === 'smcp';
		case 'VariantOff':
			var name = _var.a;
			return false;
		default:
			var name = _var.a;
			var index = _var.b;
			return (name === 'smcp') && (index === 1);
	}
};
var $mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
	if (typeface.$ === 'FontWith') {
		var font = typeface.a;
		return A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.variants);
	} else {
		return false;
	}
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $mdgriffith$elm_ui$Internal$Model$renderProps = F3(
	function (force, _v0, existing) {
		var key = _v0.a;
		var val = _v0.b;
		return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
	});
var $mdgriffith$elm_ui$Internal$Model$renderStyle = F4(
	function (options, maybePseudo, selector, props) {
		if (maybePseudo.$ === 'Nothing') {
			return _List_fromArray(
				[
					selector + ('{' + (A3(
					$elm$core$List$foldl,
					$mdgriffith$elm_ui$Internal$Model$renderProps(false),
					'',
					props) + '\n}'))
				]);
		} else {
			var pseudo = maybePseudo.a;
			switch (pseudo.$) {
				case 'Hover':
					var _v2 = options.hover;
					switch (_v2.$) {
						case 'NoHover':
							return _List_Nil;
						case 'ForceHover':
							return _List_fromArray(
								[
									selector + ('-hv {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(true),
									'',
									props) + '\n}'))
								]);
						default:
							return _List_fromArray(
								[
									selector + ('-hv:hover {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(false),
									'',
									props) + '\n}'))
								]);
					}
				case 'Focus':
					var renderedProps = A3(
						$elm$core$List$foldl,
						$mdgriffith$elm_ui$Internal$Model$renderProps(false),
						'',
						props);
					return _List_fromArray(
						[selector + ('-fs:focus {' + (renderedProps + '\n}')), '.' + ($mdgriffith$elm_ui$Internal$Style$classes.any + (':focus ~ ' + (selector + ('-fs:not(.focus)  {' + (renderedProps + '\n}'))))), '.' + ($mdgriffith$elm_ui$Internal$Style$classes.any + (':focus ' + (selector + ('-fs  {' + (renderedProps + '\n}'))))), selector + ('-fs:focus-within {' + (renderedProps + '\n}')), '.focusable-parent:focus ~ ' + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + (selector + ('-fs {' + (renderedProps + '\n}'))))))]);
				default:
					return _List_fromArray(
						[
							selector + ('-act:active {' + (A3(
							$elm$core$List$foldl,
							$mdgriffith$elm_ui$Internal$Model$renderProps(false),
							'',
							props) + '\n}'))
						]);
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderVariant = function (_var) {
	switch (_var.$) {
		case 'VariantActive':
			var name = _var.a;
			return '\"' + (name + '\"');
		case 'VariantOff':
			var name = _var.a;
			return '\"' + (name + '\" 0');
		default:
			var name = _var.a;
			var index = _var.b;
			return '\"' + (name + ('\" ' + $elm$core$String$fromInt(index)));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
	if (typeface.$ === 'FontWith') {
		var font = typeface.a;
		return $elm$core$Maybe$Just(
			A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$renderVariant, font.variants)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
	switch (transform.$) {
		case 'Untransformed':
			return $elm$core$Maybe$Nothing;
		case 'Moved':
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'translate3d(' + ($elm$core$String$fromFloat(x) + ('px, ' + ($elm$core$String$fromFloat(y) + ('px, ' + ($elm$core$String$fromFloat(z) + 'px)'))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			var translate = 'translate3d(' + ($elm$core$String$fromFloat(tx) + ('px, ' + ($elm$core$String$fromFloat(ty) + ('px, ' + ($elm$core$String$fromFloat(tz) + 'px)')))));
			var scale = 'scale3d(' + ($elm$core$String$fromFloat(sx) + (', ' + ($elm$core$String$fromFloat(sy) + (', ' + ($elm$core$String$fromFloat(sz) + ')')))));
			var rotate = 'rotate3d(' + ($elm$core$String$fromFloat(ox) + (', ' + ($elm$core$String$fromFloat(oy) + (', ' + ($elm$core$String$fromFloat(oz) + (', ' + ($elm$core$String$fromFloat(angle) + 'rad)')))))));
			return $elm$core$Maybe$Just(translate + (' ' + (scale + (' ' + rotate))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderStyleRule = F3(
	function (options, rule, maybePseudo) {
		switch (rule.$) {
			case 'Style':
				var selector = rule.a;
				var props = rule.b;
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, selector, props);
			case 'Shadows':
				var name = rule.a;
				var prop = rule.b;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, 'box-shadow', prop)
						]));
			case 'Transparency':
				var name = rule.a;
				var transparency = rule.b;
				var opacity = A2(
					$elm$core$Basics$max,
					0,
					A2($elm$core$Basics$min, 1, 1 - transparency));
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'opacity',
							$elm$core$String$fromFloat(opacity))
						]));
			case 'FontSize':
				var i = rule.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			case 'FontFamily':
				var name = rule.a;
				var typefaces = rule.b;
				var features = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Internal$Model$renderVariants, typefaces));
				var families = _List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-family',
						A2(
							$elm$core$String$join,
							', ',
							A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$fontName, typefaces))),
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'font-feature-settings', features),
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-variant',
						A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$hasSmallCaps, typefaces) ? 'small-caps' : 'normal')
					]);
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, '.' + name, families);
			case 'Single':
				var _class = rule.a;
				var prop = rule.b;
				var val = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, prop, val)
						]));
			case 'Colored':
				var _class = rule.a;
				var prop = rule.b;
				var color = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							prop,
							$mdgriffith$elm_ui$Internal$Model$formatColor(color))
						]));
			case 'SpacingStyle':
				var cls = rule.a;
				var x = rule.b;
				var y = rule.c;
				var yPx = $elm$core$String$fromInt(y) + 'px';
				var xPx = $elm$core$String$fromInt(x) + 'px';
				var single = '.' + $mdgriffith$elm_ui$Internal$Style$classes.single;
				var row = '.' + $mdgriffith$elm_ui$Internal$Style$classes.row;
				var wrappedRow = '.' + ($mdgriffith$elm_ui$Internal$Style$classes.wrapped + row);
				var right = '.' + $mdgriffith$elm_ui$Internal$Style$classes.alignRight;
				var paragraph = '.' + $mdgriffith$elm_ui$Internal$Style$classes.paragraph;
				var page = '.' + $mdgriffith$elm_ui$Internal$Style$classes.page;
				var left = '.' + $mdgriffith$elm_ui$Internal$Style$classes.alignLeft;
				var halfY = $elm$core$String$fromFloat(y / 2) + 'px';
				var halfX = $elm$core$String$fromFloat(x / 2) + 'px';
				var column = '.' + $mdgriffith$elm_ui$Internal$Style$classes.column;
				var _class = '.' + cls;
				var any = '.' + $mdgriffith$elm_ui$Internal$Style$classes.any;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (row + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (wrappedRow + (' > ' + any)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin', halfY + (' ' + halfX))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (column + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_Utils_ap(_class, paragraph),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							'textarea' + (any + _class),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)')),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'height',
									'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::after'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-top',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::before'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-bottom',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								]))
						]));
			case 'PaddingStyle':
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'padding',
							$elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 'BorderWidth':
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'border-width',
							$elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 'GridTemplateStyle':
				var template = rule.a;
				var toGridLengthHelper = F3(
					function (minimum, maximum, x) {
						toGridLengthHelper:
						while (true) {
							switch (x.$) {
								case 'Px':
									var px = x.a;
									return $elm$core$String$fromInt(px) + 'px';
								case 'Content':
									var _v2 = _Utils_Tuple2(minimum, maximum);
									if (_v2.a.$ === 'Nothing') {
										if (_v2.b.$ === 'Nothing') {
											var _v3 = _v2.a;
											var _v4 = _v2.b;
											return 'max-content';
										} else {
											var _v6 = _v2.a;
											var maxSize = _v2.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v2.b.$ === 'Nothing') {
											var minSize = _v2.a.a;
											var _v5 = _v2.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
										} else {
											var minSize = _v2.a.a;
											var maxSize = _v2.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 'Fill':
									var i = x.a;
									var _v7 = _Utils_Tuple2(minimum, maximum);
									if (_v7.a.$ === 'Nothing') {
										if (_v7.b.$ === 'Nothing') {
											var _v8 = _v7.a;
											var _v9 = _v7.b;
											return $elm$core$String$fromInt(i) + 'fr';
										} else {
											var _v11 = _v7.a;
											var maxSize = _v7.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v7.b.$ === 'Nothing') {
											var minSize = _v7.a.a;
											var _v10 = _v7.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
										} else {
											var minSize = _v7.a.a;
											var maxSize = _v7.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 'Min':
									var m = x.a;
									var len = x.b;
									var $temp$minimum = $elm$core$Maybe$Just(m),
										$temp$maximum = maximum,
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
								default:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = minimum,
										$temp$maximum = $elm$core$Maybe$Just(m),
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
							}
						}
					});
				var toGridLength = function (x) {
					return A3(toGridLengthHelper, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, x);
				};
				var xSpacing = toGridLength(template.spacing.a);
				var ySpacing = toGridLength(template.spacing.b);
				var rows = function (x) {
					return 'grid-template-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.rows)));
				var msRows = function (x) {
					return '-ms-grid-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.columns)));
				var msColumns = function (x) {
					return '-ms-grid-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.columns)));
				var gapY = 'grid-row-gap:' + (toGridLength(template.spacing.b) + ';');
				var gapX = 'grid-column-gap:' + (toGridLength(template.spacing.a) + ';');
				var columns = function (x) {
					return 'grid-template-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.columns)));
				var _class = '.grid-rows-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.b)))))));
				var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msColumns + (msRows + '}')));
				return _List_fromArray(
					[base, supports]);
			case 'GridPosition':
				var position = rule.a;
				var msPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'-ms-grid-row: ' + ($elm$core$String$fromInt(position.row) + ';'),
							'-ms-grid-row-span: ' + ($elm$core$String$fromInt(position.height) + ';'),
							'-ms-grid-column: ' + ($elm$core$String$fromInt(position.col) + ';'),
							'-ms-grid-column-span: ' + ($elm$core$String$fromInt(position.width) + ';')
						]));
				var modernPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'grid-row: ' + ($elm$core$String$fromInt(position.row) + (' / ' + ($elm$core$String$fromInt(position.row + position.height) + ';'))),
							'grid-column: ' + ($elm$core$String$fromInt(position.col) + (' / ' + ($elm$core$String$fromInt(position.col + position.width) + ';')))
						]));
				var _class = '.grid-pos-' + ($elm$core$String$fromInt(position.row) + ('-' + ($elm$core$String$fromInt(position.col) + ('-' + ($elm$core$String$fromInt(position.width) + ('-' + $elm$core$String$fromInt(position.height)))))));
				var modernGrid = _class + ('{' + (modernPosition + '}'));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msPosition + '}'));
				return _List_fromArray(
					[base, supports]);
			case 'PseudoSelector':
				var _class = rule.a;
				var styles = rule.b;
				var renderPseudoRule = function (style) {
					return A3(
						$mdgriffith$elm_ui$Internal$Model$renderStyleRule,
						options,
						style,
						$elm$core$Maybe$Just(_class));
				};
				return A2($elm$core$List$concatMap, renderPseudoRule, styles);
			default:
				var transform = rule.a;
				var val = $mdgriffith$elm_ui$Internal$Model$transformValue(transform);
				var _class = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				var _v12 = _Utils_Tuple2(_class, val);
				if ((_v12.a.$ === 'Just') && (_v12.b.$ === 'Just')) {
					var cls = _v12.a.a;
					var v = _v12.b.a;
					return A4(
						$mdgriffith$elm_ui$Internal$Model$renderStyle,
						options,
						maybePseudo,
						'.' + cls,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Model$Property, 'transform', v)
							]));
				} else {
					return _List_Nil;
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$encodeStyles = F2(
	function (options, stylesheet) {
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$map,
				function (style) {
					var styled = A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing);
					return _Utils_Tuple2(
						$mdgriffith$elm_ui$Internal$Model$getStyleName(style),
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styled));
				},
				stylesheet));
	});
var $mdgriffith$elm_ui$Internal$Model$bracket = F2(
	function (selector, rules) {
		var renderPair = function (_v0) {
			var name = _v0.a;
			var val = _v0.b;
			return name + (': ' + (val + ';'));
		};
		return selector + (' {' + (A2(
			$elm$core$String$join,
			'',
			A2($elm$core$List$map, renderPair, rules)) + '}'));
	});
var $mdgriffith$elm_ui$Internal$Model$fontRule = F3(
	function (name, modifier, _v0) {
		var parentAdj = _v0.a;
		var textAdjustment = _v0.b;
		return _List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + (', ' + ('.' + (name + (' .' + modifier))))))), parentAdj),
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (', .' + (name + (' .' + (modifier + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.text)))))))))), textAdjustment)
			]);
	});
var $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule = F3(
	function (fontToAdjust, _v0, otherFontName) {
		var full = _v0.a;
		var capital = _v0.b;
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_Utils_ap(
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital, capital),
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.fullSize, full)));
	});
var $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule = F2(
	function (fontToAdjust, otherFontName) {
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + (', ' + ('.' + (name + (' .' + $mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('line-height', '1')
						])),
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (', .' + (name + (' .' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.text)))))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('vertical-align', '0'),
							_Utils_Tuple2('line-height', '1')
						]))
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$adjust = F3(
	function (size, height, vertical) {
		return {height: height / size, size: size, vertical: vertical};
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $mdgriffith$elm_ui$Internal$Model$convertAdjustment = function (adjustment) {
	var lines = _List_fromArray(
		[adjustment.capital, adjustment.baseline, adjustment.descender, adjustment.lowercase]);
	var lineHeight = 1.5;
	var normalDescender = (lineHeight - 1) / 2;
	var oldMiddle = lineHeight / 2;
	var descender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.descender,
		$elm$core$List$minimum(lines));
	var newBaseline = A2(
		$elm$core$Maybe$withDefault,
		adjustment.baseline,
		$elm$core$List$minimum(
			A2(
				$elm$core$List$filter,
				function (x) {
					return !_Utils_eq(x, descender);
				},
				lines)));
	var base = lineHeight;
	var ascender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.capital,
		$elm$core$List$maximum(lines));
	var capitalSize = 1 / (ascender - newBaseline);
	var capitalVertical = 1 - ascender;
	var fullSize = 1 / (ascender - descender);
	var fullVertical = 1 - ascender;
	var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
	var newFullMiddle = ((ascender - descender) / 2) + descender;
	return {
		capital: A3($mdgriffith$elm_ui$Internal$Model$adjust, capitalSize, ascender - newBaseline, capitalVertical),
		full: A3($mdgriffith$elm_ui$Internal$Model$adjust, fullSize, ascender - descender, fullVertical)
	};
};
var $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules = function (converted) {
	return _Utils_Tuple2(
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'block')
			]),
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'inline-block'),
				_Utils_Tuple2(
				'line-height',
				$elm$core$String$fromFloat(converted.height)),
				_Utils_Tuple2(
				'vertical-align',
				$elm$core$String$fromFloat(converted.vertical) + 'em'),
				_Utils_Tuple2(
				'font-size',
				$elm$core$String$fromFloat(converted.size) + 'em')
			]));
};
var $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (face, found) {
				if (found.$ === 'Nothing') {
					if (face.$ === 'FontWith') {
						var _with = face.a;
						var _v2 = _with.adjustment;
						if (_v2.$ === 'Nothing') {
							return found;
						} else {
							var adjustment = _v2.a;
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.full;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))),
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.capital;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment)))));
						}
					} else {
						return found;
					}
				} else {
					return found;
				}
			}),
		$elm$core$Maybe$Nothing,
		typefaces);
};
var $mdgriffith$elm_ui$Internal$Model$renderTopLevelValues = function (rules) {
	var withImport = function (font) {
		if (font.$ === 'ImportFont') {
			var url = font.b;
			return $elm$core$Maybe$Just('@import url(\'' + (url + '\');'));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var fontImports = function (_v2) {
		var name = _v2.a;
		var typefaces = _v2.b;
		var imports = A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$filterMap, withImport, typefaces));
		return imports;
	};
	var allNames = A2($elm$core$List$map, $elm$core$Tuple$first, rules);
	var fontAdjustments = function (_v1) {
		var name = _v1.a;
		var typefaces = _v1.b;
		var _v0 = $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment(typefaces);
		if (_v0.$ === 'Nothing') {
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					$mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule(name),
					allNames));
		} else {
			var adjustment = _v0.a;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					A2($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule, name, adjustment),
					allNames));
		}
	};
	return _Utils_ap(
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontImports, rules)),
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontAdjustments, rules)));
};
var $mdgriffith$elm_ui$Internal$Model$topLevelValue = function (rule) {
	if (rule.$ === 'FontFamily') {
		var name = rule.a;
		var typefaces = rule.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(name, typefaces));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var combine = F2(
			function (style, rendered) {
				return {
					rules: _Utils_ap(
						rendered.rules,
						A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing)),
					topLevel: function () {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
						if (_v1.$ === 'Nothing') {
							return rendered.topLevel;
						} else {
							var topLevel = _v1.a;
							return A2($elm$core$List$cons, topLevel, rendered.topLevel);
						}
					}()
				};
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			combine,
			{rules: _List_Nil, topLevel: _List_Nil},
			stylesheet);
		var topLevel = _v0.topLevel;
		var rules = _v0.rules;
		return _Utils_ap(
			$mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel),
			$elm$core$String$concat(rules));
	});
var $mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		var _v0 = options.mode;
		switch (_v0.$) {
			case 'Layout':
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			case 'NoStaticStyleSheet':
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			default:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'elm-ui-rules',
					_List_fromArray(
						[
							A2(
							$elm$virtual_dom$VirtualDom$property,
							'rules',
							A2($mdgriffith$elm_ui$Internal$Model$encodeStyles, options, styleSheet))
						]),
					_List_Nil);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$embedKeyed = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.focus)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				'static-stylesheet',
				$mdgriffith$elm_ui$Internal$Model$staticRoot(opts)),
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
				children)) : A2(
			$elm$core$List$cons,
			_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
			children);
	});
var $mdgriffith$elm_ui$Internal$Model$embedWith = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.focus)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			$mdgriffith$elm_ui$Internal$Model$staticRoot(opts),
			A2($elm$core$List$cons, dynamicStyleSheet, children)) : A2($elm$core$List$cons, dynamicStyleSheet, children);
	});
var $mdgriffith$elm_ui$Internal$Flag$heightBetween = $mdgriffith$elm_ui$Internal$Flag$flag(45);
var $mdgriffith$elm_ui$Internal$Flag$heightFill = $mdgriffith$elm_ui$Internal$Flag$flag(37);
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$core$Basics$not = _Basics_not;
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$core$Bitwise$and = _Bitwise_and;
var $mdgriffith$elm_ui$Internal$Flag$present = F2(
	function (myFlag, _v0) {
		var fieldOne = _v0.a;
		var fieldTwo = _v0.b;
		if (myFlag.$ === 'Flag') {
			var first = myFlag.a;
			return _Utils_eq(first & fieldOne, first);
		} else {
			var second = myFlag.a;
			return _Utils_eq(second & fieldTwo, second);
		}
	});
var $elm$html$Html$s = _VirtualDom_node('s');
var $elm$html$Html$u = _VirtualDom_node('u');
var $mdgriffith$elm_ui$Internal$Flag$widthBetween = $mdgriffith$elm_ui$Internal$Flag$flag(44);
var $mdgriffith$elm_ui$Internal$Flag$widthFill = $mdgriffith$elm_ui$Internal$Flag$flag(39);
var $mdgriffith$elm_ui$Internal$Model$finalizeNode = F6(
	function (has, node, attributes, children, embedMode, parentContext) {
		var createNode = F2(
			function (nodeName, attrs) {
				if (children.$ === 'Keyed') {
					var keyed = children.a;
					return A3(
						$elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							switch (embedMode.$) {
								case 'NoStyleSheet':
									return keyed;
								case 'OnlyDynamic':
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, false, opts, styles, keyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, true, opts, styles, keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A2(
						function () {
							switch (nodeName) {
								case 'div':
									return $elm$html$Html$div;
								case 'p':
									return $elm$html$Html$p;
								default:
									return $elm$virtual_dom$VirtualDom$node(nodeName);
							}
						}(),
						attrs,
						function () {
							switch (embedMode.$) {
								case 'NoStyleSheet':
									return unkeyed;
								case 'OnlyDynamic':
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, false, opts, styles, unkeyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, true, opts, styles, unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 'Generic':
					return A2(createNode, 'div', attributes);
				case 'NodeName':
					var nodeName = node.a;
					return A2(createNode, nodeName, attributes);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						$elm$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A2(
								createNode,
								internal,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.single))
									]))
							]));
			}
		}();
		switch (parentContext.$) {
			case 'AsRow':
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerX, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX])))
						]),
					_List_fromArray(
						[html])) : html));
			case 'AsColumn':
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerY, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignBottom, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $mdgriffith$elm_ui$Internal$Model$textElementClasses = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthContent + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.heightContent)))));
var $mdgriffith$elm_ui$Internal$Model$textElement = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$textElementFillClasses = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthFill + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.heightFill)))));
var $mdgriffith$elm_ui$Internal$Model$textElementFill = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementFillClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$createElement = F3(
	function (context, children, rendered) {
		var gatherKeyed = F2(
			function (_v8, _v9) {
				var key = _v8.a;
				var child = _v8.b;
				var htmls = _v9.a;
				var existingStyles = _v9.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _v6) {
				var htmls = _v6.a;
				var existingStyles = _v6.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		if (children.$ === 'Keyed') {
			var keyedChildren = children.a;
			var _v1 = A3(
				$elm$core$List$foldr,
				gatherKeyed,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				keyedChildren);
			var keyed = _v1.a;
			var styles = _v1.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.styles : _Utils_ap(rendered.styles, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.has,
						rendered.node,
						rendered.attributes,
						$mdgriffith$elm_ui$Internal$Model$Keyed(
							A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.children)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						html: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.has,
							rendered.node,
							rendered.attributes,
							$mdgriffith$elm_ui$Internal$Model$Keyed(
								A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.children))),
						styles: allStyles
					});
			}
		} else {
			var unkeyedChildren = children.a;
			var _v3 = A3(
				$elm$core$List$foldr,
				gather,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				unkeyedChildren);
			var unkeyed = _v3.a;
			var styles = _v3.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.styles : _Utils_ap(rendered.styles, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.has,
						rendered.node,
						rendered.attributes,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.children)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						html: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.has,
							rendered.node,
							rendered.attributes,
							$mdgriffith$elm_ui$Internal$Model$Unkeyed(
								A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.children))),
						styles: allStyles
					});
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 'Single', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
	return {$: 'Transform', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $mdgriffith$elm_ui$Internal$Flag$add = F2(
	function (myFlag, _v0) {
		var one = _v0.a;
		var two = _v0.b;
		if (myFlag.$ === 'Flag') {
			var first = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, first | one, two);
		} else {
			var second = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, one, second | two);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
	return {$: 'ChildrenBehind', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2(
	function (a, b) {
		return {$: 'ChildrenBehindAndInFront', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
	return {$: 'ChildrenInFront', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$nearbyElement = F2(
	function (location, elem) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					function () {
						switch (location.$) {
							case 'Above':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.above]));
							case 'Below':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.below]));
							case 'OnRight':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.onRight]));
							case 'OnLeft':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.onLeft]));
							case 'InFront':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.inFront]));
							default:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.behind]));
						}
					}())
				]),
			_List_fromArray(
				[
					function () {
					switch (elem.$) {
						case 'Empty':
							return $elm$virtual_dom$VirtualDom$text('');
						case 'Text':
							var str = elem.a;
							return $mdgriffith$elm_ui$Internal$Model$textElement(str);
						case 'Unstyled':
							var html = elem.a;
							return html($mdgriffith$elm_ui$Internal$Model$asEl);
						default:
							var styled = elem.a;
							return A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, $mdgriffith$elm_ui$Internal$Model$asEl);
					}
				}()
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3(
	function (location, elem, existing) {
		var nearby = A2($mdgriffith$elm_ui$Internal$Model$nearbyElement, location, elem);
		switch (existing.$) {
			case 'NoNearbyChildren':
				if (location.$ === 'Behind') {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						_List_fromArray(
							[nearby]));
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						_List_fromArray(
							[nearby]));
				}
			case 'ChildrenBehind':
				var existingBehind = existing.a;
				if (location.$ === 'Behind') {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						A2($elm$core$List$cons, nearby, existingBehind));
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						_List_fromArray(
							[nearby]));
				}
			case 'ChildrenInFront':
				var existingInFront = existing.a;
				if (location.$ === 'Behind') {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						_List_fromArray(
							[nearby]),
						existingInFront);
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						A2($elm$core$List$cons, nearby, existingInFront));
				}
			default:
				var existingBehind = existing.a;
				var existingInFront = existing.b;
				if (location.$ === 'Behind') {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						A2($elm$core$List$cons, nearby, existingBehind),
						existingInFront);
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						A2($elm$core$List$cons, nearby, existingInFront));
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 'Embedded', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
	return {$: 'NodeName', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 'Generic':
				return $mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
			case 'NodeName':
				var name = old.a;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, x, y);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
	switch (align.$) {
		case 'Left':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignLeft);
		case 'Right':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignRight);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignCenterX);
	}
};
var $mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
	switch (align.$) {
		case 'Top':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignTop);
		case 'Bottom':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignBottom);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignCenterY);
	}
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Model$FullTransform = F4(
	function (a, b, c, d) {
		return {$: 'FullTransform', a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
	return {$: 'Moved', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$composeTransformation = F2(
	function (transform, component) {
		switch (transform.$) {
			case 'Untransformed':
				switch (component.$) {
					case 'MoveX':
						var x = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, 0, 0));
					case 'MoveY':
						var y = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, y, 0));
					case 'MoveZ':
						var z = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, 0, z));
					case 'MoveXYZ':
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 'Rotate':
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var xyz = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							xyz,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			case 'Moved':
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				switch (component.$) {
					case 'MoveX':
						var newX = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(newX, y, z));
					case 'MoveY':
						var newY = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, newY, z));
					case 'MoveZ':
						var newZ = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, y, newZ));
					case 'MoveXYZ':
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 'Rotate':
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var scale = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							scale,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			default:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				var scaled = transform.b;
				var origin = transform.c;
				var angle = transform.d;
				switch (component.$) {
					case 'MoveX':
						var newX = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(newX, y, z),
							scaled,
							origin,
							angle);
					case 'MoveY':
						var newY = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, newY, z),
							scaled,
							origin,
							angle);
					case 'MoveZ':
						var newZ = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, y, newZ),
							scaled,
							origin,
							angle);
					case 'MoveXYZ':
						var newMove = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, newMove, scaled, origin, angle);
					case 'Rotate':
						var newOrigin = component.a;
						var newAngle = component.b;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, scaled, newOrigin, newAngle);
					default:
						var newScale = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, newScale, origin, angle);
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$height = $mdgriffith$elm_ui$Internal$Flag$flag(7);
var $mdgriffith$elm_ui$Internal$Flag$heightContent = $mdgriffith$elm_ui$Internal$Flag$flag(36);
var $mdgriffith$elm_ui$Internal$Flag$merge = F2(
	function (_v0, _v1) {
		var one = _v0.a;
		var two = _v0.b;
		var three = _v1.a;
		var four = _v1.b;
		return A2($mdgriffith$elm_ui$Internal$Flag$Field, one | three, two | four);
	});
var $mdgriffith$elm_ui$Internal$Flag$none = A2($mdgriffith$elm_ui$Internal$Flag$Field, 0, 0);
var $mdgriffith$elm_ui$Internal$Model$renderHeight = function (h) {
	switch (h.$) {
		case 'Px':
			var px = h.a;
			var val = $elm$core$String$fromInt(px);
			var name = 'height-px-' + val;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.heightExact + (' ' + name),
				_List_fromArray(
					[
						A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height', val + 'px')
					]));
		case 'Content':
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightContent,
				_List_Nil);
		case 'Fill':
			var portion = h.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightFill,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion + (' height-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.column + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'height-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 'Min':
			var minSize = h.a;
			var len = h.b;
			var cls = 'min-height-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-height',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = h.a;
			var len = h.b;
			var cls = 'max-height-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-height',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$widthContent = $mdgriffith$elm_ui$Internal$Flag$flag(38);
var $mdgriffith$elm_ui$Internal$Model$renderWidth = function (w) {
	switch (w.$) {
		case 'Px':
			var px = w.a;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.widthExact + (' width-px-' + $elm$core$String$fromInt(px)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						'width-px-' + $elm$core$String$fromInt(px),
						'width',
						$elm$core$String$fromInt(px) + 'px')
					]));
		case 'Content':
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthContent,
				_List_Nil);
		case 'Fill':
			var portion = w.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthFill,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion + (' width-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.row + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'width-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 'Min':
			var minSize = w.a;
			var len = w.b;
			var cls = 'min-width-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-width',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = w.a;
			var len = w.b;
			var cls = 'max-width-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-width',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$borderWidth = $mdgriffith$elm_ui$Internal$Flag$flag(27);
var $elm$core$Basics$ge = _Utils_ge;
var $mdgriffith$elm_ui$Internal$Model$skippable = F2(
	function (flag, style) {
		if (_Utils_eq(flag, $mdgriffith$elm_ui$Internal$Flag$borderWidth)) {
			if (style.$ === 'Single') {
				var val = style.c;
				switch (val) {
					case '0px':
						return true;
					case '1px':
						return true;
					case '2px':
						return true;
					case '3px':
						return true;
					case '4px':
						return true;
					case '5px':
						return true;
					case '6px':
						return true;
					default:
						return false;
				}
			} else {
				return false;
			}
		} else {
			switch (style.$) {
				case 'FontSize':
					var i = style.a;
					return (i >= 8) && (i <= 32);
				case 'PaddingStyle':
					var name = style.a;
					var t = style.b;
					var r = style.c;
					var b = style.d;
					var l = style.e;
					return _Utils_eq(t, b) && (_Utils_eq(t, r) && (_Utils_eq(t, l) && ((t >= 0) && (t <= 24))));
				default:
					return false;
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$width = $mdgriffith$elm_ui$Internal$Flag$flag(6);
var $mdgriffith$elm_ui$Internal$Flag$xAlign = $mdgriffith$elm_ui$Internal$Flag$flag(30);
var $mdgriffith$elm_ui$Internal$Flag$yAlign = $mdgriffith$elm_ui$Internal$Flag$flag(29);
var $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive = F8(
	function (classes, node, has, transform, styles, attrs, children, elementAttrs) {
		gatherAttrRecursive:
		while (true) {
			if (!elementAttrs.b) {
				var _v1 = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				if (_v1.$ === 'Nothing') {
					return {
						attributes: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes),
							attrs),
						children: children,
						has: has,
						node: node,
						styles: styles
					};
				} else {
					var _class = _v1.a;
					return {
						attributes: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes + (' ' + _class)),
							attrs),
						children: children,
						has: has,
						node: node,
						styles: A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$Transform(transform),
							styles)
					};
				}
			} else {
				var attribute = elementAttrs.a;
				var remaining = elementAttrs.b;
				switch (attribute.$) {
					case 'NoAttribute':
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'Class':
						var flag = attribute.a;
						var exactClassName = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = exactClassName + (' ' + classes),
								$temp$node = node,
								$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					case 'Attr':
						var actualAttribute = attribute.a;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = A2($elm$core$List$cons, actualAttribute, attrs),
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'StyleClass':
						var flag = attribute.a;
						var style = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							if (A2($mdgriffith$elm_ui$Internal$Model$skippable, flag, style)) {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							} else {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = A2($elm$core$List$cons, style, styles),
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							}
						}
					case 'TransformComponent':
						var flag = attribute.a;
						var component = attribute.b;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
							$temp$transform = A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, transform, component),
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'Width':
						var width = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$width, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (width.$) {
								case 'Px':
									var px = width.a;
									var $temp$classes = ($mdgriffith$elm_ui$Internal$Style$classes.widthExact + (' width-px-' + $elm$core$String$fromInt(px))) + (' ' + classes),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3(
											$mdgriffith$elm_ui$Internal$Model$Single,
											'width-px-' + $elm$core$String$fromInt(px),
											'width',
											$elm$core$String$fromInt(px) + 'px'),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Content':
									var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.widthContent),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$widthContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Fill':
									var portion = width.a;
									if (portion === 1) {
										var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.widthFill),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion + (' width-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.row + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'width-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v4 = $mdgriffith$elm_ui$Internal$Model$renderWidth(width);
									var addToFlags = _v4.a;
									var newClass = _v4.b;
									var newStyles = _v4.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 'Height':
						var height = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$height, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (height.$) {
								case 'Px':
									var px = height.a;
									var val = $elm$core$String$fromInt(px) + 'px';
									var name = 'height-px-' + val;
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightExact + (' ' + (name + (' ' + classes))),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height ', val),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Content':
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightContent + (' ' + classes),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$heightContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Fill':
									var portion = height.a;
									if (portion === 1) {
										var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightFill + (' ' + classes),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion + (' height-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.column + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'height-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v6 = $mdgriffith$elm_ui$Internal$Model$renderHeight(height);
									var addToFlags = _v6.a;
									var newClass = _v6.b;
									var newStyles = _v6.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 'Describe':
						var description = attribute.a;
						switch (description.$) {
							case 'Main':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'main', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Navigation':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'nav', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'ContentInfo':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'footer', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Complementary':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'aside', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Heading':
								var i = description.a;
								if (i <= 1) {
									var $temp$classes = classes,
										$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h1', node),
										$temp$has = has,
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								} else {
									if (i < 7) {
										var $temp$classes = classes,
											$temp$node = A2(
											$mdgriffith$elm_ui$Internal$Model$addNodeName,
											'h' + $elm$core$String$fromInt(i),
											node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes,
											$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h6', node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								}
							case 'Paragraph':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Button':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Label':
								var label = description.a;
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'LivePolite':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							default:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
						}
					case 'Nearby':
						var location = attribute.a;
						var elem = attribute.b;
						var newStyles = function () {
							switch (elem.$) {
								case 'Empty':
									return styles;
								case 'Text':
									var str = elem.a;
									return styles;
								case 'Unstyled':
									var html = elem.a;
									return styles;
								default:
									var styled = elem.a;
									return _Utils_ap(styles, styled.styles);
							}
						}();
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = newStyles,
							$temp$attrs = attrs,
							$temp$children = A3($mdgriffith$elm_ui$Internal$Model$addNearbyElement, location, elem, children),
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'AlignX':
						var x = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignXName(x) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (x.$) {
									case 'CenterX':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerX, flags);
									case 'Right':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignRight, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					default:
						var y = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignYName(y) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (y.$) {
									case 'CenterY':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerY, flags);
									case 'Bottom':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignBottom, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Untransformed = {$: 'Untransformed'};
var $mdgriffith$elm_ui$Internal$Model$untransformed = $mdgriffith$elm_ui$Internal$Model$Untransformed;
var $mdgriffith$elm_ui$Internal$Model$element = F4(
	function (context, node, attributes, children) {
		return A3(
			$mdgriffith$elm_ui$Internal$Model$createElement,
			context,
			children,
			A8(
				$mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive,
				$mdgriffith$elm_ui$Internal$Model$contextClasses(context),
				node,
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Model$untransformed,
				_List_Nil,
				_List_Nil,
				$mdgriffith$elm_ui$Internal$Model$NoNearbyChildren,
				$elm$core$List$reverse(attributes)));
	});
var $mdgriffith$elm_ui$Internal$Model$Height = function (a) {
	return {$: 'Height', a: a};
};
var $mdgriffith$elm_ui$Element$height = $mdgriffith$elm_ui$Internal$Model$Height;
var $mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
	return {$: 'Attr', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		$elm$html$Html$Attributes$class(cls));
};
var $mdgriffith$elm_ui$Internal$Model$Content = {$: 'Content'};
var $mdgriffith$elm_ui$Element$shrink = $mdgriffith$elm_ui$Internal$Model$Content;
var $mdgriffith$elm_ui$Internal$Model$Width = function (a) {
	return {$: 'Width', a: a};
};
var $mdgriffith$elm_ui$Element$width = $mdgriffith$elm_ui$Internal$Model$Width;
var $mdgriffith$elm_ui$Element$column = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentTop + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.contentLeft)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $jxxcarlson$elm_text_editor$Editor$Config$DontWrap = {$: 'DontWrap'};
var $author$project$Main$EditorMsg = function (a) {
	return {$: 'EditorMsg', a: a};
};
var $author$project$Main$editorConfig = {
	editorMsg: $author$project$Main$EditorMsg,
	fontProportion: 0.75,
	height: 480,
	lineHeight: 16.0,
	lineHeightFactor: 1.0,
	showInfoPanel: true,
	width: 500,
	wrapOption: $jxxcarlson$elm_text_editor$Editor$Config$DontWrap,
	wrapParams: {maximumWidth: 55, optimalWidth: 50, stringWidth: $elm$core$String$length}
};
var $mdgriffith$elm_ui$Element$el = F2(
	function (attrs, child) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					attrs)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $jxxcarlson$elm_text_editor$Editor$Styles$style = $elm$html$Html$node('style');
var $jxxcarlson$elm_text_editor$Editor$Styles$getStyleParams = function (c) {
	return {
		editorHeight: $elm$core$String$fromFloat(c.editorHeight),
		editorWidth: $elm$core$String$fromFloat(c.editorWidth),
		fontSize: $elm$core$String$fromFloat(c.fontProportion * c.lineHeight),
		lineHeight: $elm$core$String$fromFloat(c.lineHeight)
	};
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $lukewestby$elm_string_interpolate$String$Interpolate$applyInterpolation = F2(
	function (replacements, _v0) {
		var match = _v0.match;
		var ordinalString = A2(
			$elm$core$Basics$composeL,
			$elm$core$String$dropLeft(1),
			$elm$core$String$dropRight(1))(match);
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$andThen,
				function (value) {
					return A2($elm$core$Array$get, value, replacements);
				},
				$elm$core$String$toInt(ordinalString)));
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $lukewestby$elm_string_interpolate$String$Interpolate$interpolationRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('\\{\\d+\\}'));
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $lukewestby$elm_string_interpolate$String$Interpolate$interpolate = F2(
	function (string, args) {
		var asArray = $elm$core$Array$fromList(args);
		return A3(
			$elm$regex$Regex$replace,
			$lukewestby$elm_string_interpolate$String$Interpolate$interpolationRegex,
			$lukewestby$elm_string_interpolate$String$Interpolate$applyInterpolation(asArray),
			string);
	});
var $jxxcarlson$elm_text_editor$Editor$Styles$styleTemplate = '\n\nbody { font-size: {1}px;\n       line-height: {2}px;}\n\n.elm-editor-container {\n  font-family: monospace;\n  width: {0}px;\n  user-select: none;\n  -webkit-user-select: none;\n  display: flex;\n  // overflow-x : scroll;\n  // overflow-y : scroll;\n  // height: {3}px;\n}\n\n.elm-editor-container:focus {\n  outline: none;\n    // background-color : lightblue;\n}\n\n.elm-editor-gutter {\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n}\n\n.elm-editor-lines {\n  flex-grow: 1;\n}\n\n.elm-editor-line-number {\n  display: inline-block;\n  width: 35px;\n  padding-right: 5px;\n  text-align: right;\n  background-color: lightgray;\n  cursor: default;\n}\n\n.elm-editor-line {\n  cursor: text;\n}\n\n.elm-editor-line__gutter-padding {\n  width: 5px;\n}\n\n.elm-editor-line__character--has-cursor {\n  position: relative;\n}\n\n.elm-editor-line__character--selected {\n  background-color: #8d9ffe;\n  color: white;\n}\n\n.elm-editor-cursor {\n  position: absolute;\n  border-left: 16px solid #990000;\n  opacity: 0.2;\n  left: 0;\n  height: 100%;\n}\n\n.elm-editor-container:focus .elm-editor-cursor {\n  animation: 1s blink step-start infinite;\n  border-left: 4px solid #333333;\n}\n\n@keyframes blink {\n  from, to {\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;s\n  }\n}\n\n\nbody {\n    font-family: sans-serif;\n\n    }\n\n.center-column {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: lightblue; //: #eeeeee;\n    }\n\n#editor-container {\n    text-align: left;\n    }\n\n\n\n';
var $jxxcarlson$elm_text_editor$Editor$Styles$styleText = function (styleConfig) {
	var s = $jxxcarlson$elm_text_editor$Editor$Styles$getStyleParams(styleConfig);
	return A2(
		$lukewestby$elm_string_interpolate$String$Interpolate$interpolate,
		$jxxcarlson$elm_text_editor$Editor$Styles$styleTemplate,
		_List_fromArray(
			[s.editorWidth, s.fontSize, s.lineHeight, s.editorHeight]));
};
var $jxxcarlson$elm_text_editor$Editor$Styles$editorStyles = function (styleConfig) {
	return A2(
		$jxxcarlson$elm_text_editor$Editor$Styles$style,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(
				$jxxcarlson$elm_text_editor$Editor$Styles$styleText(styleConfig))
			]));
};
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $jxxcarlson$elm_text_editor$Editor$innerStyle = function (h) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$Attributes$style,
			'height',
			$elm$core$String$fromFloat(h) + 'px'),
			A2($elm$html$Html$Attributes$style, 'border', 'solid'),
			A2($elm$html$Html$Attributes$style, 'border-width', '0.5px'),
			A2($elm$html$Html$Attributes$style, 'border-color', '#aaa'),
			A2($elm$html$Html$Attributes$attribute, 'id', '__inner_editor__'),
			A2($elm$html$Html$Attributes$style, 'overflow-y', 'scroll'),
			A2(
			$elm$html$Html$Attributes$style,
			'height',
			$elm$core$String$fromFloat(h) + 'px')
		]);
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $jxxcarlson$elm_text_editor$Buffer$lines = function (_v0) {
	var content = _v0.a;
	return A2($elm$core$String$split, '\n', content);
};
var $jxxcarlson$elm_text_editor$Editor$Update$AcceptLineNumber = function (a) {
	return {$: 'AcceptLineNumber', a: a};
};
var $jxxcarlson$elm_text_editor$Editor$View$setHtmlId = function (id) {
	return A2($elm$html$Html$Attributes$attribute, 'id', id);
};
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $jxxcarlson$elm_text_editor$Editor$Widget$textField = F5(
	function (width, msg, str, attr, innerAttr) {
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'margin-bottom', '10px')
					]),
				attr),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$input,
					_Utils_ap(
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'height', '18px'),
								A2(
								$elm$html$Html$Attributes$style,
								'width',
								$elm$core$String$fromInt(width) + 'px'),
								$elm$html$Html$Attributes$type_('text'),
								$elm$html$Html$Attributes$placeholder(str),
								A2($elm$html$Html$Attributes$style, 'margin-right', '8px'),
								$elm$html$Html$Events$onInput(msg)
							]),
						innerAttr),
					_List_Nil)
				]));
	});
var $jxxcarlson$elm_text_editor$Editor$View$acceptLineNumber = A5(
	$jxxcarlson$elm_text_editor$Editor$Widget$textField,
	30,
	$jxxcarlson$elm_text_editor$Editor$Update$AcceptLineNumber,
	'',
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'margin-top', '5px'),
			A2($elm$html$Html$Attributes$style, 'float', 'left')
		]),
	_List_fromArray(
		[
			$jxxcarlson$elm_text_editor$Editor$View$setHtmlId('line-number-input')
		]));
var $jxxcarlson$elm_text_editor$Editor$Update$ToggleGoToLinePanel = {$: 'ToggleGoToLinePanel'};
var $elm$html$Html$button = _VirtualDom_node('button');
var $jxxcarlson$elm_text_editor$Editor$Widget$lightButtonLabelStyle = function (width) {
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
			A2($elm$html$Html$Attributes$style, 'color', '#444'),
			A2(
			$elm$html$Html$Attributes$style,
			'width',
			$elm$core$String$fromInt(width) + 'px'),
			A2($elm$html$Html$Attributes$style, 'height', '24px'),
			A2($elm$html$Html$Attributes$style, 'border', 'none'),
			A2($elm$html$Html$Attributes$style, 'text-align', 'left')
		]);
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $jxxcarlson$elm_text_editor$Editor$Widget$rowButtonStyle = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
		A2($elm$html$Html$Attributes$style, 'border', 'none'),
		A2($elm$html$Html$Attributes$style, 'margin-right', '8px'),
		A2($elm$html$Html$Attributes$style, 'float', 'left')
	]);
var $jxxcarlson$elm_text_editor$Editor$Widget$lightRowButton = F4(
	function (width, msg, str, attr) {
		return A2(
			$elm$html$Html$div,
			_Utils_ap($jxxcarlson$elm_text_editor$Editor$Widget$rowButtonStyle, attr),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$button,
					_Utils_ap(
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(msg)
							]),
						$jxxcarlson$elm_text_editor$Editor$Widget$lightButtonLabelStyle(width)),
					_List_fromArray(
						[
							$elm$html$Html$text(str)
						]))
				]));
	});
var $jxxcarlson$elm_text_editor$Editor$View$dismissGoToLineButton = A4(
	$jxxcarlson$elm_text_editor$Editor$Widget$lightRowButton,
	25,
	$jxxcarlson$elm_text_editor$Editor$Update$ToggleGoToLinePanel,
	'X',
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'margin-top', '5px'),
			A2($elm$html$Html$Attributes$style, 'float', 'left')
		]));
var $jxxcarlson$elm_text_editor$Editor$Update$NoOp = {$: 'NoOp'};
var $jxxcarlson$elm_text_editor$Editor$Style$darkGray = '#444548';
var $jxxcarlson$elm_text_editor$Editor$Widget$rowButtonLabelStyle = function (width) {
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
			A2($elm$html$Html$Attributes$style, 'background-color', $jxxcarlson$elm_text_editor$Editor$Style$darkGray),
			A2($elm$html$Html$Attributes$style, 'color', '#eee'),
			A2(
			$elm$html$Html$Attributes$style,
			'width',
			$elm$core$String$fromInt(width) + 'px'),
			A2($elm$html$Html$Attributes$style, 'height', '24px'),
			A2($elm$html$Html$Attributes$style, 'border', 'none')
		]);
};
var $jxxcarlson$elm_text_editor$Editor$Widget$rowButton = F4(
	function (width, msg, str, attr) {
		return A2(
			$elm$html$Html$div,
			_Utils_ap($jxxcarlson$elm_text_editor$Editor$Widget$rowButtonStyle, attr),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$button,
					_Utils_ap(
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(msg)
							]),
						$jxxcarlson$elm_text_editor$Editor$Widget$rowButtonLabelStyle(width)),
					_List_fromArray(
						[
							$elm$html$Html$text(str)
						]))
				]));
	});
var $jxxcarlson$elm_text_editor$Editor$View$goToLineButton = A4(
	$jxxcarlson$elm_text_editor$Editor$Widget$rowButton,
	80,
	$jxxcarlson$elm_text_editor$Editor$Update$NoOp,
	'Go to line',
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'margin-top', '5px'),
			A2($elm$html$Html$Attributes$style, 'margin-left', '5px'),
			A2($elm$html$Html$Attributes$style, 'float', 'left')
		]));
var $jxxcarlson$elm_text_editor$Editor$Style$lightGray = '#a5a6ab';
var $jxxcarlson$elm_text_editor$Editor$View$px = function (p) {
	return $elm$core$String$fromFloat(p) + 'px';
};
var $jxxcarlson$elm_text_editor$Editor$View$goToLinePanel_ = function (width) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'width',
				$jxxcarlson$elm_text_editor$Editor$View$px(width)),
				A2($elm$html$Html$Attributes$style, 'height', '34px'),
				A2($elm$html$Html$Attributes$style, 'padding', '1px'),
				A2($elm$html$Html$Attributes$style, 'opacity', '0.9'),
				A2($elm$html$Html$Attributes$style, 'background-color', $jxxcarlson$elm_text_editor$Editor$Style$lightGray),
				A2($elm$html$Html$Attributes$style, 'float', 'left')
			]),
		_List_fromArray(
			[$jxxcarlson$elm_text_editor$Editor$View$goToLineButton, $jxxcarlson$elm_text_editor$Editor$View$acceptLineNumber, $jxxcarlson$elm_text_editor$Editor$View$dismissGoToLineButton]));
};
var $jxxcarlson$elm_text_editor$Editor$View$goToLinePanel = function (state) {
	return state.showGoToLinePanel ? $jxxcarlson$elm_text_editor$Editor$View$goToLinePanel_(state.config.width) : A2($elm$html$Html$div, _List_Nil, _List_Nil);
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
var $jxxcarlson$elm_text_editor$Editor$Widget$headingStyle = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
		A2($elm$html$Html$Attributes$style, 'margin-right', '12px'),
		A2($elm$html$Html$Attributes$style, 'float', 'left')
	]);
var $jxxcarlson$elm_text_editor$Editor$View$cursorPosition = F2(
	function (state, lines) {
		var r = $elm$core$String$fromInt(state.cursor.line + 1);
		var ll = A2(
			$elm$core$Maybe$withDefault,
			'-1',
			A2(
				$elm$core$Maybe$map,
				A2($elm$core$Basics$composeR, $elm$core$String$length, $elm$core$String$fromInt),
				A2($elm_community$list_extra$List$Extra$getAt, state.cursor.line, lines)));
		var c = $elm$core$String$fromInt(state.cursor.column);
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				$jxxcarlson$elm_text_editor$Editor$Widget$headingStyle,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'margin-top', '2px')
					])),
			_List_fromArray(
				[
					$elm$html$Html$text('Cursor = (' + (r + (', ' + (c + (', ' + (ll + ')'))))))
				]));
	});
var $jxxcarlson$elm_text_editor$Editor$View$headerPanelStyle = function (width) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$Attributes$style,
			'width',
			$jxxcarlson$elm_text_editor$Editor$View$px(width - 40)),
			A2($elm$html$Html$Attributes$style, 'padding-top', '10px'),
			A2($elm$html$Html$Attributes$style, 'height', '27px'),
			A2($elm$html$Html$Attributes$style, 'background-color', $jxxcarlson$elm_text_editor$Editor$Style$lightGray),
			A2($elm$html$Html$Attributes$style, 'opacity', '0.8'),
			A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
			A2($elm$html$Html$Attributes$style, 'padding-left', '40px'),
			$elm$html$Html$Attributes$class('flex-row')
		]);
};
var $jxxcarlson$elm_text_editor$Editor$View$lineCount = function (lines) {
	return A2(
		$elm$html$Html$div,
		_Utils_ap(
			$jxxcarlson$elm_text_editor$Editor$Widget$headingStyle,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin-top', '2px')
				])),
		_List_fromArray(
			[
				$elm$html$Html$text(
				'Lines: ' + $elm$core$String$fromInt(
					$elm$core$List$length(lines)))
			]));
};
var $jxxcarlson$elm_text_editor$Editor$Update$ToggleHelp = {$: 'ToggleHelp'};
var $jxxcarlson$elm_text_editor$Editor$View$toggleHelpButtonHeader = function (state) {
	var label = state.showHelp ? 'Help' : 'Back';
	return A4(
		$jxxcarlson$elm_text_editor$Editor$Widget$rowButton,
		60,
		$jxxcarlson$elm_text_editor$Editor$Update$ToggleHelp,
		label,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'height', '25px'),
				A2($elm$html$Html$Attributes$style, 'margin-top', '-3px'),
				A2($elm$html$Html$Attributes$style, 'margin-left', '-30px')
			]));
};
var $elm$core$String$words = _String_words;
var $jxxcarlson$elm_text_editor$Editor$View$wordCount = function (lines) {
	var words = $elm$core$List$concat(
		A2($elm$core$List$map, $elm$core$String$words, lines));
	return A2(
		$elm$html$Html$div,
		_Utils_ap(
			$jxxcarlson$elm_text_editor$Editor$Widget$headingStyle,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin-top', '2px')
				])),
		_List_fromArray(
			[
				$elm$html$Html$text(
				'Words: ' + $elm$core$String$fromInt(
					$elm$core$List$length(words)))
			]));
};
var $jxxcarlson$elm_text_editor$Editor$Config$DoWrap = {$: 'DoWrap'};
var $jxxcarlson$elm_text_editor$Editor$View$wrappingOptionDisplay = function (state) {
	var message = _Utils_eq(state.config.wrapOption, $jxxcarlson$elm_text_editor$Editor$Config$DoWrap) ? 'Wrap: ON' : 'Wrap: OFF';
	return A2(
		$elm$html$Html$div,
		_Utils_ap(
			$jxxcarlson$elm_text_editor$Editor$Widget$headingStyle,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin-top', '2px')
				])),
		_List_fromArray(
			[
				$elm$html$Html$text(message)
			]));
};
var $jxxcarlson$elm_text_editor$Editor$View$headerPanel = F2(
	function (state, lines) {
		return A2(
			$elm$html$Html$div,
			$jxxcarlson$elm_text_editor$Editor$View$headerPanelStyle(state.config.width),
			_List_fromArray(
				[
					$jxxcarlson$elm_text_editor$Editor$View$toggleHelpButtonHeader(state),
					$jxxcarlson$elm_text_editor$Editor$View$wordCount(lines),
					$jxxcarlson$elm_text_editor$Editor$View$lineCount(lines),
					$jxxcarlson$elm_text_editor$Editor$View$wrappingOptionDisplay(state),
					A2($jxxcarlson$elm_text_editor$Editor$View$cursorPosition, state, lines)
				]));
	});
var $jxxcarlson$elm_text_editor$Editor$Update$MouseUp = {$: 'MouseUp'};
var $jxxcarlson$elm_text_editor$Editor$Update$SelectGroup = {$: 'SelectGroup'};
var $jxxcarlson$elm_text_editor$Editor$Update$SelectLine = {$: 'SelectLine'};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $jxxcarlson$elm_text_editor$Editor$Update$Insert = function (a) {
	return {$: 'Insert', a: a};
};
var $elm$json$Json$Decode$fail = _Json_fail;
var $jxxcarlson$elm_text_editor$Editor$Update$Clear = {$: 'Clear'};
var $jxxcarlson$elm_text_editor$Editor$Update$Copy = {$: 'Copy'};
var $jxxcarlson$elm_text_editor$Editor$Update$CopyPasteClipboard = {$: 'CopyPasteClipboard'};
var $jxxcarlson$elm_text_editor$Editor$Update$CursorDown = {$: 'CursorDown'};
var $jxxcarlson$elm_text_editor$Editor$Update$CursorLeft = {$: 'CursorLeft'};
var $jxxcarlson$elm_text_editor$Editor$Update$CursorRight = {$: 'CursorRight'};
var $jxxcarlson$elm_text_editor$Editor$Update$CursorToGroupEnd = {$: 'CursorToGroupEnd'};
var $jxxcarlson$elm_text_editor$Editor$Update$CursorToGroupStart = {$: 'CursorToGroupStart'};
var $jxxcarlson$elm_text_editor$Editor$Update$CursorToLineEnd = {$: 'CursorToLineEnd'};
var $jxxcarlson$elm_text_editor$Editor$Update$CursorToLineStart = {$: 'CursorToLineStart'};
var $jxxcarlson$elm_text_editor$Editor$Update$CursorUp = {$: 'CursorUp'};
var $jxxcarlson$elm_text_editor$Editor$Update$Cut = {$: 'Cut'};
var $jxxcarlson$elm_text_editor$Editor$Update$Deindent = {$: 'Deindent'};
var $jxxcarlson$elm_text_editor$Editor$Update$FirstLine = {$: 'FirstLine'};
var $jxxcarlson$elm_text_editor$Editor$Update$Indent = {$: 'Indent'};
var $jxxcarlson$elm_text_editor$Editor$Update$LastLine = {$: 'LastLine'};
var $jxxcarlson$elm_text_editor$Editor$Update$Paste = {$: 'Paste'};
var $jxxcarlson$elm_text_editor$Editor$Update$Redo = {$: 'Redo'};
var $jxxcarlson$elm_text_editor$Editor$Update$RemoveCharAfter = {$: 'RemoveCharAfter'};
var $jxxcarlson$elm_text_editor$Editor$Update$RemoveCharBefore = {$: 'RemoveCharBefore'};
var $jxxcarlson$elm_text_editor$Editor$Update$RemoveGroupAfter = {$: 'RemoveGroupAfter'};
var $jxxcarlson$elm_text_editor$Editor$Update$RemoveGroupBefore = {$: 'RemoveGroupBefore'};
var $jxxcarlson$elm_text_editor$Editor$Update$RollSearchSelectionBackward = {$: 'RollSearchSelectionBackward'};
var $jxxcarlson$elm_text_editor$Editor$Update$RollSearchSelectionForward = {$: 'RollSearchSelectionForward'};
var $jxxcarlson$elm_text_editor$Editor$Update$ScrollDown = function (a) {
	return {$: 'ScrollDown', a: a};
};
var $jxxcarlson$elm_text_editor$Editor$Update$ScrollUp = function (a) {
	return {$: 'ScrollUp', a: a};
};
var $jxxcarlson$elm_text_editor$Editor$Update$SelectAll = {$: 'SelectAll'};
var $jxxcarlson$elm_text_editor$Editor$Update$SelectDown = {$: 'SelectDown'};
var $jxxcarlson$elm_text_editor$Editor$Update$SelectLeft = {$: 'SelectLeft'};
var $jxxcarlson$elm_text_editor$Editor$Update$SelectRight = {$: 'SelectRight'};
var $jxxcarlson$elm_text_editor$Editor$Update$SelectToGroupEnd = {$: 'SelectToGroupEnd'};
var $jxxcarlson$elm_text_editor$Editor$Update$SelectToGroupStart = {$: 'SelectToGroupStart'};
var $jxxcarlson$elm_text_editor$Editor$Update$SelectToLineEnd = {$: 'SelectToLineEnd'};
var $jxxcarlson$elm_text_editor$Editor$Update$SelectToLineStart = {$: 'SelectToLineStart'};
var $jxxcarlson$elm_text_editor$Editor$Update$SelectUp = {$: 'SelectUp'};
var $jxxcarlson$elm_text_editor$Editor$Update$SendLine = {$: 'SendLine'};
var $jxxcarlson$elm_text_editor$Editor$Update$ToggleInfoPanel = {$: 'ToggleInfoPanel'};
var $jxxcarlson$elm_text_editor$Editor$Update$ToggleReplacePanel = {$: 'ToggleReplacePanel'};
var $jxxcarlson$elm_text_editor$Editor$Update$ToggleSearchPanel = {$: 'ToggleSearchPanel'};
var $jxxcarlson$elm_text_editor$Editor$Update$ToggleWrapping = {$: 'ToggleWrapping'};
var $jxxcarlson$elm_text_editor$Editor$Update$Undo = {$: 'Undo'};
var $jxxcarlson$elm_text_editor$Editor$Update$WrapAll = {$: 'WrapAll'};
var $jxxcarlson$elm_text_editor$Editor$Update$WrapSelection = {$: 'WrapSelection'};
var $jxxcarlson$elm_text_editor$Editor$Update$WriteToSystemClipBoard = {$: 'WriteToSystemClipBoard'};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $jxxcarlson$elm_text_editor$Editor$Keymap$keymaps = {
	control: $elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2('Backspace', $jxxcarlson$elm_text_editor$Editor$Update$RemoveGroupBefore),
				_Utils_Tuple2('Delete', $jxxcarlson$elm_text_editor$Editor$Update$RemoveGroupAfter),
				_Utils_Tuple2('d', $jxxcarlson$elm_text_editor$Editor$Update$SelectGroup),
				_Utils_Tuple2('c', $jxxcarlson$elm_text_editor$Editor$Update$Copy),
				_Utils_Tuple2('g', $jxxcarlson$elm_text_editor$Editor$Update$ToggleGoToLinePanel),
				_Utils_Tuple2('.', $jxxcarlson$elm_text_editor$Editor$Update$RollSearchSelectionForward),
				_Utils_Tuple2(',', $jxxcarlson$elm_text_editor$Editor$Update$RollSearchSelectionBackward),
				_Utils_Tuple2('h', $jxxcarlson$elm_text_editor$Editor$Update$ToggleHelp),
				_Utils_Tuple2('x', $jxxcarlson$elm_text_editor$Editor$Update$Cut),
				_Utils_Tuple2('s', $jxxcarlson$elm_text_editor$Editor$Update$ToggleSearchPanel),
				_Utils_Tuple2('r', $jxxcarlson$elm_text_editor$Editor$Update$ToggleReplacePanel),
				_Utils_Tuple2('v', $jxxcarlson$elm_text_editor$Editor$Update$Paste),
				_Utils_Tuple2('z', $jxxcarlson$elm_text_editor$Editor$Update$Undo),
				_Utils_Tuple2('w', $jxxcarlson$elm_text_editor$Editor$Update$WrapSelection),
				_Utils_Tuple2('y', $jxxcarlson$elm_text_editor$Editor$Update$Redo)
			])),
	controlAndOption: $elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2('ArrowUp', $jxxcarlson$elm_text_editor$Editor$Update$FirstLine),
				_Utils_Tuple2('ArrowDown', $jxxcarlson$elm_text_editor$Editor$Update$LastLine),
				_Utils_Tuple2('ArrowRight', $jxxcarlson$elm_text_editor$Editor$Update$CursorToGroupEnd),
				_Utils_Tuple2('ArrowLeft', $jxxcarlson$elm_text_editor$Editor$Update$CursorToGroupStart),
				_Utils_Tuple2('∑', $jxxcarlson$elm_text_editor$Editor$Update$ToggleWrapping),
				_Utils_Tuple2('ç', $jxxcarlson$elm_text_editor$Editor$Update$Clear)
			])),
	controlAndShift: $elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2('ArrowRight', $jxxcarlson$elm_text_editor$Editor$Update$SelectToGroupEnd),
				_Utils_Tuple2('ArrowLeft', $jxxcarlson$elm_text_editor$Editor$Update$SelectToGroupStart),
				_Utils_Tuple2('C', $jxxcarlson$elm_text_editor$Editor$Update$WriteToSystemClipBoard),
				_Utils_Tuple2('I', $jxxcarlson$elm_text_editor$Editor$Update$ToggleInfoPanel),
				_Utils_Tuple2('V', $jxxcarlson$elm_text_editor$Editor$Update$CopyPasteClipboard),
				_Utils_Tuple2('W', $jxxcarlson$elm_text_editor$Editor$Update$WrapAll),
				_Utils_Tuple2('S', $jxxcarlson$elm_text_editor$Editor$Update$SendLine),
				_Utils_Tuple2('A', $jxxcarlson$elm_text_editor$Editor$Update$SelectAll)
			])),
	noModifier: $elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2('ArrowUp', $jxxcarlson$elm_text_editor$Editor$Update$CursorUp),
				_Utils_Tuple2('ArrowDown', $jxxcarlson$elm_text_editor$Editor$Update$CursorDown),
				_Utils_Tuple2('ArrowLeft', $jxxcarlson$elm_text_editor$Editor$Update$CursorLeft),
				_Utils_Tuple2('ArrowRight', $jxxcarlson$elm_text_editor$Editor$Update$CursorRight),
				_Utils_Tuple2('Backspace', $jxxcarlson$elm_text_editor$Editor$Update$RemoveCharBefore),
				_Utils_Tuple2('Delete', $jxxcarlson$elm_text_editor$Editor$Update$RemoveCharAfter),
				_Utils_Tuple2(
				'Enter',
				$jxxcarlson$elm_text_editor$Editor$Update$Insert('\n')),
				_Utils_Tuple2('Home', $jxxcarlson$elm_text_editor$Editor$Update$CursorToLineStart),
				_Utils_Tuple2('End', $jxxcarlson$elm_text_editor$Editor$Update$CursorToLineEnd),
				_Utils_Tuple2('Tab', $jxxcarlson$elm_text_editor$Editor$Update$Indent)
			])),
	option: $elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'ArrowUp',
				$jxxcarlson$elm_text_editor$Editor$Update$ScrollUp(20)),
				_Utils_Tuple2(
				'ArrowDown',
				$jxxcarlson$elm_text_editor$Editor$Update$ScrollDown(20)),
				_Utils_Tuple2('ArrowLeft', $jxxcarlson$elm_text_editor$Editor$Update$CursorToLineStart),
				_Utils_Tuple2('ArrowRight', $jxxcarlson$elm_text_editor$Editor$Update$CursorToLineEnd)
			])),
	shift: $elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2('ArrowUp', $jxxcarlson$elm_text_editor$Editor$Update$SelectUp),
				_Utils_Tuple2('ArrowDown', $jxxcarlson$elm_text_editor$Editor$Update$SelectDown),
				_Utils_Tuple2('ArrowLeft', $jxxcarlson$elm_text_editor$Editor$Update$SelectLeft),
				_Utils_Tuple2('ArrowRight', $jxxcarlson$elm_text_editor$Editor$Update$SelectRight),
				_Utils_Tuple2('Tab', $jxxcarlson$elm_text_editor$Editor$Update$Deindent),
				_Utils_Tuple2('Home', $jxxcarlson$elm_text_editor$Editor$Update$SelectToLineStart),
				_Utils_Tuple2('End', $jxxcarlson$elm_text_editor$Editor$Update$SelectToLineEnd)
			]))
};
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $jxxcarlson$elm_text_editor$Editor$Keymap$keyToMsg = function (event) {
	var keyFrom = function (keymap) {
		return A2(
			$elm$core$Maybe$withDefault,
			$elm$json$Json$Decode$fail('This key does nothing'),
			A2(
				$elm$core$Maybe$map,
				$elm$json$Json$Decode$succeed,
				A2($elm$core$Dict$get, event.key, keymap)));
	};
	var keyOrCharFrom = function (keymap) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					keyFrom(keymap),
					A2(
					$elm$core$Maybe$withDefault,
					$elm$json$Json$Decode$fail('This key does nothing'),
					A2(
						$elm$core$Maybe$map,
						A2($elm$core$Basics$composeR, $jxxcarlson$elm_text_editor$Editor$Update$Insert, $elm$json$Json$Decode$succeed),
						event._char))
				]));
	};
	var _v0 = event.modifier;
	switch (_v0.$) {
		case 'None':
			return keyOrCharFrom($jxxcarlson$elm_text_editor$Editor$Keymap$keymaps.noModifier);
		case 'Control':
			return keyFrom($jxxcarlson$elm_text_editor$Editor$Keymap$keymaps.control);
		case 'Shift':
			return keyOrCharFrom($jxxcarlson$elm_text_editor$Editor$Keymap$keymaps.shift);
		case 'ControlAndShift':
			return keyFrom($jxxcarlson$elm_text_editor$Editor$Keymap$keymaps.controlAndShift);
		case 'ControlAndOption':
			return keyFrom($jxxcarlson$elm_text_editor$Editor$Keymap$keymaps.controlAndOption);
		default:
			return keyFrom($jxxcarlson$elm_text_editor$Editor$Keymap$keymaps.option);
	}
};
var $jxxcarlson$elm_text_editor$Editor$Keymap$Keydown = F3(
	function (_char, key, modifier) {
		return {_char: _char, key: key, modifier: modifier};
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $jxxcarlson$elm_text_editor$Editor$Keymap$characterDecoder = A2(
	$elm$json$Json$Decode$map,
	function (key) {
		var _v0 = $elm$core$String$uncons(key);
		if ((_v0.$ === 'Just') && (_v0.a.b === '')) {
			var _v1 = _v0.a;
			var _char = _v1.a;
			return $elm$core$Maybe$Just(
				$elm$core$String$fromChar(_char));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	},
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $jxxcarlson$elm_text_editor$Editor$Keymap$Control = {$: 'Control'};
var $jxxcarlson$elm_text_editor$Editor$Keymap$ControlAndOption = {$: 'ControlAndOption'};
var $jxxcarlson$elm_text_editor$Editor$Keymap$ControlAndShift = {$: 'ControlAndShift'};
var $jxxcarlson$elm_text_editor$Editor$Keymap$None = {$: 'None'};
var $jxxcarlson$elm_text_editor$Editor$Keymap$Option = {$: 'Option'};
var $jxxcarlson$elm_text_editor$Editor$Keymap$Shift = {$: 'Shift'};
var $jxxcarlson$elm_text_editor$Editor$Keymap$modifier = F3(
	function (ctrl, shift, option) {
		var _v0 = _Utils_Tuple3(ctrl, shift, option);
		_v0$5:
		while (true) {
			if (!_v0.a) {
				if (_v0.b) {
					if (!_v0.c) {
						return $jxxcarlson$elm_text_editor$Editor$Keymap$Shift;
					} else {
						break _v0$5;
					}
				} else {
					if (_v0.c) {
						return $jxxcarlson$elm_text_editor$Editor$Keymap$Option;
					} else {
						break _v0$5;
					}
				}
			} else {
				if (_v0.b) {
					if (!_v0.c) {
						return $jxxcarlson$elm_text_editor$Editor$Keymap$ControlAndShift;
					} else {
						break _v0$5;
					}
				} else {
					if (!_v0.c) {
						return $jxxcarlson$elm_text_editor$Editor$Keymap$Control;
					} else {
						return $jxxcarlson$elm_text_editor$Editor$Keymap$ControlAndOption;
					}
				}
			}
		}
		return $jxxcarlson$elm_text_editor$Editor$Keymap$None;
	});
var $jxxcarlson$elm_text_editor$Editor$Keymap$modifierDecoder = A4(
	$elm$json$Json$Decode$map3,
	$jxxcarlson$elm_text_editor$Editor$Keymap$modifier,
	A2($elm$json$Json$Decode$field, 'ctrlKey', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'shiftKey', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'altKey', $elm$json$Json$Decode$bool));
var $jxxcarlson$elm_text_editor$Editor$Keymap$keydownDecoder = A4(
	$elm$json$Json$Decode$map3,
	$jxxcarlson$elm_text_editor$Editor$Keymap$Keydown,
	$jxxcarlson$elm_text_editor$Editor$Keymap$characterDecoder,
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string),
	$jxxcarlson$elm_text_editor$Editor$Keymap$modifierDecoder);
var $jxxcarlson$elm_text_editor$Editor$Keymap$decoder = A2($elm$json$Json$Decode$andThen, $jxxcarlson$elm_text_editor$Editor$Keymap$keyToMsg, $jxxcarlson$elm_text_editor$Editor$Keymap$keydownDecoder);
var $jxxcarlson$elm_text_editor$Editor$Update$MouseDown = function (a) {
	return {$: 'MouseDown', a: a};
};
var $jxxcarlson$elm_text_editor$Editor$Update$MouseOver = function (a) {
	return {$: 'MouseOver', a: a};
};
var $jxxcarlson$elm_text_editor$Editor$View$withTrue = function (a) {
	return _Utils_Tuple2(a, true);
};
var $jxxcarlson$elm_text_editor$Editor$View$captureOnMouseDown = function (msg) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'mousedown',
		A2(
			$elm$json$Json$Decode$map,
			$jxxcarlson$elm_text_editor$Editor$View$withTrue,
			$elm$json$Json$Decode$succeed(msg)));
};
var $jxxcarlson$elm_text_editor$Editor$View$captureOnMouseOver = function (msg) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'mouseover',
		A2(
			$elm$json$Json$Decode$map,
			$jxxcarlson$elm_text_editor$Editor$View$withTrue,
			$elm$json$Json$Decode$succeed(msg)));
};
var $jxxcarlson$elm_text_editor$Editor$View$name = 'elm-editor';
var $elm$html$Html$span = _VirtualDom_node('span');
var $jxxcarlson$elm_text_editor$Editor$View$lineNumber = function (number) {
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($jxxcarlson$elm_text_editor$Editor$View$name + '-line-number'),
				$jxxcarlson$elm_text_editor$Editor$View$captureOnMouseDown(
				$jxxcarlson$elm_text_editor$Editor$Update$MouseDown(
					{column: 0, line: number})),
				$jxxcarlson$elm_text_editor$Editor$View$captureOnMouseDown($jxxcarlson$elm_text_editor$Editor$Update$SelectLine),
				$jxxcarlson$elm_text_editor$Editor$View$captureOnMouseOver(
				$jxxcarlson$elm_text_editor$Editor$Update$MouseOver(
					{column: 0, line: number}))
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(
				$elm$core$String$fromInt(number + 0))
			]));
};
var $jxxcarlson$elm_text_editor$Editor$View$gutter = function (maxLines_) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($jxxcarlson$elm_text_editor$Editor$View$name + '-gutter')
			]),
		A2(
			$elm$core$List$map,
			$jxxcarlson$elm_text_editor$Editor$View$lineNumber,
			A2($elm$core$List$range, 1, maxLines_)));
};
var $jxxcarlson$elm_text_editor$Position$Position = F2(
	function (line, column) {
		return {column: column, line: line};
	});
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $elm$core$Char$fromCode = _Char_fromCode;
var $jxxcarlson$elm_text_editor$Editor$View$nonBreakingSpace = $elm$core$Char$fromCode(160);
var $jxxcarlson$elm_text_editor$Editor$View$ensureNonBreakingSpace = function (_char) {
	if (' ' === _char.valueOf()) {
		return $jxxcarlson$elm_text_editor$Editor$View$nonBreakingSpace;
	} else {
		return _char;
	}
};
var $jxxcarlson$elm_text_editor$Position$betweenHelp = F3(
	function (start, end, point) {
		betweenHelp:
		while (true) {
			if (_Utils_cmp(start, end) > 0) {
				var $temp$start = end,
					$temp$end = start,
					$temp$point = point;
				start = $temp$start;
				end = $temp$end;
				point = $temp$point;
				continue betweenHelp;
			} else {
				return (!_Utils_eq(start, end)) && ((_Utils_cmp(point, start) > -1) && (_Utils_cmp(point, end) < 0));
			}
		}
	});
var $jxxcarlson$elm_text_editor$Position$order = F2(
	function (pos1, pos2) {
		return (_Utils_cmp(pos2.line, pos1.line) > 0) ? _Utils_Tuple2(pos1, pos2) : ((_Utils_eq(pos2.line, pos1.line) && (_Utils_cmp(pos2.column, pos1.column) > 0)) ? _Utils_Tuple2(pos1, pos2) : _Utils_Tuple2(pos2, pos1));
	});
var $jxxcarlson$elm_text_editor$Position$between = F3(
	function (pos1, pos2, _v0) {
		var line = _v0.line;
		var column = _v0.column;
		var _v1 = A2($jxxcarlson$elm_text_editor$Position$order, pos1, pos2);
		var start = _v1.a;
		var end = _v1.b;
		return _Utils_eq(start.line, end.line) ? (_Utils_eq(line, start.line) && A3($jxxcarlson$elm_text_editor$Position$betweenHelp, start.column, end.column, column)) : (_Utils_eq(start.line, line) ? (_Utils_cmp(column, start.column) > -1) : (_Utils_eq(end.line, line) ? (_Utils_cmp(column, end.column) < 0) : A3($jxxcarlson$elm_text_editor$Position$betweenHelp, start.line, end.line, line)));
	});
var $jxxcarlson$elm_text_editor$Editor$View$selected = F3(
	function (cursor, maybeSelection, _char) {
		return A2(
			$elm$core$Maybe$withDefault,
			false,
			A2(
				$elm$core$Maybe$map,
				function (selection) {
					return A3($jxxcarlson$elm_text_editor$Position$between, cursor, selection, _char);
				},
				maybeSelection));
	});
var $jxxcarlson$elm_text_editor$Editor$View$character = F4(
	function (cursor, selection, position, _char) {
		return A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2($jxxcarlson$elm_text_editor$Editor$View$name + '-line__character', true),
							_Utils_Tuple2(
							$jxxcarlson$elm_text_editor$Editor$View$name + '-line__character--has-cursor',
							_Utils_eq(cursor, position)),
							_Utils_Tuple2(
							$jxxcarlson$elm_text_editor$Editor$View$name + '-line__character--selected',
							A3($jxxcarlson$elm_text_editor$Editor$View$selected, cursor, selection, position))
						])),
					$jxxcarlson$elm_text_editor$Editor$View$captureOnMouseDown(
					$jxxcarlson$elm_text_editor$Editor$Update$MouseDown(position)),
					$jxxcarlson$elm_text_editor$Editor$View$captureOnMouseOver(
					$jxxcarlson$elm_text_editor$Editor$Update$MouseOver(position))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					$elm$core$String$fromChar(
						$jxxcarlson$elm_text_editor$Editor$View$ensureNonBreakingSpace(_char))),
					_Utils_eq(cursor, position) ? A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class($jxxcarlson$elm_text_editor$Editor$View$name + '-cursor')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(' ')
						])) : $elm$html$Html$text('')
				]));
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $jxxcarlson$elm_text_editor$Editor$View$line = F4(
	function (cursor, selection, index, content) {
		var length = $elm$core$String$length(content);
		var endPosition = {column: length, line: index};
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class($jxxcarlson$elm_text_editor$Editor$View$name + '-line'),
					A2($elm$html$Html$Attributes$style, 'white-space', 'pre-wrap'),
					$jxxcarlson$elm_text_editor$Editor$View$captureOnMouseDown(
					$jxxcarlson$elm_text_editor$Editor$Update$MouseDown(endPosition)),
					$jxxcarlson$elm_text_editor$Editor$View$captureOnMouseOver(
					$jxxcarlson$elm_text_editor$Editor$Update$MouseOver(endPosition))
				]),
			$elm$core$List$concat(
				_List_fromArray(
					[
						_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class($jxxcarlson$elm_text_editor$Editor$View$name + '-line__gutter-padding'),
									$jxxcarlson$elm_text_editor$Editor$View$captureOnMouseDown(
									$jxxcarlson$elm_text_editor$Editor$Update$MouseDown(
										{column: 0, line: index + 0})),
									$jxxcarlson$elm_text_editor$Editor$View$captureOnMouseOver(
									$jxxcarlson$elm_text_editor$Editor$Update$MouseOver(
										{column: 0, line: index + 0}))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$elm$core$String$fromChar($jxxcarlson$elm_text_editor$Editor$View$nonBreakingSpace))
								]))
						]),
						A2(
						$elm$core$List$indexedMap,
						A2(
							$elm$core$Basics$composeR,
							$jxxcarlson$elm_text_editor$Position$Position(index),
							A2($jxxcarlson$elm_text_editor$Editor$View$character, cursor, selection)),
						$elm$core$String$toList(content)),
						(_Utils_eq(index, cursor.line) && (_Utils_cmp(cursor.column, length) > -1)) ? _List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class($jxxcarlson$elm_text_editor$Editor$View$name + '-line__character'),
									$elm$html$Html$Attributes$class($jxxcarlson$elm_text_editor$Editor$View$name + '-line__character--has-cursor')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(' '),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class($jxxcarlson$elm_text_editor$Editor$View$name + '-cursor')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(' ')
										]))
								]))
						]) : _List_Nil
					])));
	});
var $jxxcarlson$elm_text_editor$Editor$View$linesContainer = $elm$html$Html$div(
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class($jxxcarlson$elm_text_editor$Editor$View$name + '-lines')
		]));
var $elm$html$Html$Events$onDoubleClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'dblclick',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onMouseUp = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseup',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $jxxcarlson$elm_text_editor$Editor$View$onTripleClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		A2(
			$elm$json$Json$Decode$andThen,
			function (detail) {
				return (detail >= 3) ? $elm$json$Json$Decode$succeed(msg) : $elm$json$Json$Decode$fail('');
			},
			A2($elm$json$Json$Decode$field, 'detail', $elm$json$Json$Decode$int)));
};
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $jxxcarlson$elm_text_editor$Editor$View$innerView = F3(
	function (attr, lines, state) {
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				attr,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex-column')
					])),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class($jxxcarlson$elm_text_editor$Editor$View$name + '-container'),
							A2(
							$elm$html$Html$Events$preventDefaultOn,
							'keydown',
							A2($elm$json$Json$Decode$map, $jxxcarlson$elm_text_editor$Editor$View$withTrue, $jxxcarlson$elm_text_editor$Editor$Keymap$decoder)),
							$elm$html$Html$Events$onMouseUp($jxxcarlson$elm_text_editor$Editor$Update$MouseUp),
							$elm$html$Html$Events$onDoubleClick($jxxcarlson$elm_text_editor$Editor$Update$SelectGroup),
							$jxxcarlson$elm_text_editor$Editor$View$onTripleClick($jxxcarlson$elm_text_editor$Editor$Update$SelectLine),
							$elm$html$Html$Attributes$tabindex(0)
						]),
					_List_fromArray(
						[
							$jxxcarlson$elm_text_editor$Editor$View$gutter(
							A2(
								$elm$core$Basics$max,
								100,
								$elm$core$List$length(lines) + 20)),
							$jxxcarlson$elm_text_editor$Editor$View$linesContainer(
							A2(
								$elm$core$List$indexedMap,
								A2($jxxcarlson$elm_text_editor$Editor$View$line, state.cursor, state.selection),
								lines))
						]))
				]));
	});
var $elm$virtual_dom$VirtualDom$lazy3 = _VirtualDom_lazy3;
var $elm$html$Html$Lazy$lazy3 = $elm$virtual_dom$VirtualDom$lazy3;
var $jxxcarlson$elm_text_editor$Editor$Update$AcceptReplacementText = function (a) {
	return {$: 'AcceptReplacementText', a: a};
};
var $jxxcarlson$elm_text_editor$Editor$View$acceptReplaceText = A5(
	$jxxcarlson$elm_text_editor$Editor$Widget$textField,
	130,
	$jxxcarlson$elm_text_editor$Editor$Update$AcceptReplacementText,
	'',
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'float', 'left')
		]),
	_List_fromArray(
		[
			$jxxcarlson$elm_text_editor$Editor$View$setHtmlId('replacement-box')
		]));
var $jxxcarlson$elm_text_editor$Editor$Update$AcceptSearchText = function (a) {
	return {$: 'AcceptSearchText', a: a};
};
var $jxxcarlson$elm_text_editor$Editor$View$acceptSearchText = A5(
	$jxxcarlson$elm_text_editor$Editor$Widget$textField,
	130,
	$jxxcarlson$elm_text_editor$Editor$Update$AcceptSearchText,
	'',
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'float', 'left')
		]),
	_List_fromArray(
		[
			$jxxcarlson$elm_text_editor$Editor$View$setHtmlId('editor-search-box')
		]));
var $jxxcarlson$elm_text_editor$Editor$View$dismissSearchPanel = A4(
	$jxxcarlson$elm_text_editor$Editor$Widget$lightRowButton,
	25,
	$jxxcarlson$elm_text_editor$Editor$Update$ToggleSearchPanel,
	'X',
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'float', 'left'),
			A2($elm$html$Html$Attributes$style, 'float', 'left')
		]));
var $lovasoa$elm_rolling_list$RollingList$toList = function (_v0) {
	var previous = _v0.previous;
	var next = _v0.next;
	return _Utils_ap(
		next,
		$elm$core$List$reverse(previous));
};
var $jxxcarlson$elm_text_editor$Editor$View$numberOfHitsDisplay = function (state) {
	var n = $elm$core$List$length(
		$lovasoa$elm_rolling_list$RollingList$toList(state.searchResults));
	var txt = $elm$core$String$fromInt(state.searchHitIndex + 1) + ('/' + $elm$core$String$fromInt(n));
	return A4(
		$jxxcarlson$elm_text_editor$Editor$Widget$rowButton,
		40,
		$jxxcarlson$elm_text_editor$Editor$Update$NoOp,
		txt,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'float', 'left')
			]));
};
var $jxxcarlson$elm_text_editor$Editor$Update$OpenReplaceField = {$: 'OpenReplaceField'};
var $jxxcarlson$elm_text_editor$Editor$View$openReplaceField = A4($jxxcarlson$elm_text_editor$Editor$Widget$rowButton, 25, $jxxcarlson$elm_text_editor$Editor$Update$OpenReplaceField, 'R', _List_Nil);
var $jxxcarlson$elm_text_editor$Editor$Update$ReplaceCurrentSelection = {$: 'ReplaceCurrentSelection'};
var $jxxcarlson$elm_text_editor$Editor$View$replaceTextButton = A4(
	$jxxcarlson$elm_text_editor$Editor$Widget$rowButton,
	70,
	$jxxcarlson$elm_text_editor$Editor$Update$ReplaceCurrentSelection,
	'Replace',
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'float', 'left')
		]));
var $jxxcarlson$elm_text_editor$Editor$View$searchBackwardButton = A4(
	$jxxcarlson$elm_text_editor$Editor$Widget$rowButton,
	30,
	$jxxcarlson$elm_text_editor$Editor$Update$RollSearchSelectionBackward,
	'<',
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'float', 'left')
		]));
var $jxxcarlson$elm_text_editor$Editor$View$searchForwardButton = A4(
	$jxxcarlson$elm_text_editor$Editor$Widget$rowButton,
	30,
	$jxxcarlson$elm_text_editor$Editor$Update$RollSearchSelectionForward,
	'>',
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'float', 'left')
		]));
var $jxxcarlson$elm_text_editor$Editor$View$searchTextButton = A4(
	$jxxcarlson$elm_text_editor$Editor$Widget$rowButton,
	60,
	$jxxcarlson$elm_text_editor$Editor$Update$NoOp,
	'Search',
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'float', 'left')
		]));
var $jxxcarlson$elm_text_editor$Editor$View$showIf = F2(
	function (flag, h) {
		return flag ? h : A2($elm$html$Html$div, _List_Nil, _List_Nil);
	});
var $jxxcarlson$elm_text_editor$Editor$View$searchPanel_ = function (state) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '595px'),
				A2($elm$html$Html$Attributes$style, 'padding-top', '5px'),
				A2($elm$html$Html$Attributes$style, 'height', '30px'),
				A2($elm$html$Html$Attributes$style, 'padding-left', '8px'),
				A2($elm$html$Html$Attributes$style, 'background-color', $jxxcarlson$elm_text_editor$Editor$Style$lightGray),
				A2($elm$html$Html$Attributes$style, 'opacity', '0.9'),
				A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
				A2($elm$html$Html$Attributes$style, 'float', 'left')
			]),
		_List_fromArray(
			[
				$jxxcarlson$elm_text_editor$Editor$View$searchTextButton,
				$jxxcarlson$elm_text_editor$Editor$View$acceptSearchText,
				$jxxcarlson$elm_text_editor$Editor$View$numberOfHitsDisplay(state),
				A2($jxxcarlson$elm_text_editor$Editor$View$showIf, !state.canReplace, $jxxcarlson$elm_text_editor$Editor$View$openReplaceField),
				A2($jxxcarlson$elm_text_editor$Editor$View$showIf, state.canReplace, $jxxcarlson$elm_text_editor$Editor$View$replaceTextButton),
				A2($jxxcarlson$elm_text_editor$Editor$View$showIf, state.canReplace, $jxxcarlson$elm_text_editor$Editor$View$acceptReplaceText),
				$jxxcarlson$elm_text_editor$Editor$View$searchForwardButton,
				$jxxcarlson$elm_text_editor$Editor$View$searchBackwardButton,
				$jxxcarlson$elm_text_editor$Editor$View$dismissSearchPanel
			]));
};
var $jxxcarlson$elm_text_editor$Editor$View$searchPanel = function (state) {
	return state.showSearchPanel ? $jxxcarlson$elm_text_editor$Editor$View$searchPanel_(state) : A2($elm$html$Html$div, _List_Nil, _List_Nil);
};
var $jxxcarlson$elm_text_editor$Editor$View$view = F3(
	function (attr, lines, state) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$jxxcarlson$elm_text_editor$Editor$View$showIf,
							state.showGoToLinePanel,
							$jxxcarlson$elm_text_editor$Editor$View$goToLinePanel(state)),
							A2(
							$jxxcarlson$elm_text_editor$Editor$View$showIf,
							state.showSearchPanel,
							$jxxcarlson$elm_text_editor$Editor$View$searchPanel(state)),
							A2(
							$jxxcarlson$elm_text_editor$Editor$View$showIf,
							!(state.showSearchPanel || state.showGoToLinePanel),
							A2($jxxcarlson$elm_text_editor$Editor$View$headerPanel, state, lines))
						])),
					A4($elm$html$Html$Lazy$lazy3, $jxxcarlson$elm_text_editor$Editor$View$innerView, attr, lines, state)
				]));
	});
var $jxxcarlson$elm_text_editor$Editor$view = F2(
	function (attr, _v0) {
		var data = _v0.a;
		return A3(
			$jxxcarlson$elm_text_editor$Editor$View$view,
			attr,
			$jxxcarlson$elm_text_editor$Buffer$lines(data.buffer),
			data.state);
	});
var $jxxcarlson$elm_text_editor$Editor$embedded = F2(
	function (editorConfig, editor) {
		var styleConfig = {editorHeight: editorConfig.height, editorWidth: editorConfig.width, fontProportion: editorConfig.fontProportion, lineHeight: editorConfig.lineHeight};
		var height_ = editorConfig.height - 37;
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					$jxxcarlson$elm_text_editor$Editor$Styles$editorStyles(styleConfig),
					A2(
					$elm$html$Html$map,
					editorConfig.editorMsg,
					A2(
						$jxxcarlson$elm_text_editor$Editor$view,
						$jxxcarlson$elm_text_editor$Editor$innerStyle(height_),
						editor))
				]));
	});
var $jxxcarlson$elm_text_editor$Editor$getWidth = function (_v0) {
	var data = _v0.a;
	return data.state.config.width;
};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $mdgriffith$elm_ui$Internal$Model$unstyled = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Unstyled, $elm$core$Basics$always);
var $mdgriffith$elm_ui$Element$html = $mdgriffith$elm_ui$Internal$Model$unstyled;
var $mdgriffith$elm_ui$Internal$Model$Px = function (a) {
	return {$: 'Px', a: a};
};
var $mdgriffith$elm_ui$Element$px = $mdgriffith$elm_ui$Internal$Model$Px;
var $author$project$Main$editor = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$px(
					$elm$core$Basics$round(
						$jxxcarlson$elm_text_editor$Editor$getWidth(model.editor))))
			]),
		$mdgriffith$elm_ui$Element$html(
			A2($jxxcarlson$elm_text_editor$Editor$embedded, $author$project$Main$editorConfig, model.editor)));
};
var $author$project$Main$ShowExample = {$: 'ShowExample'};
var $mdgriffith$elm_ui$Internal$Model$Button = {$: 'Button'};
var $mdgriffith$elm_ui$Internal$Model$Describe = function (a) {
	return {$: 'Describe', a: a};
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $mdgriffith$elm_ui$Internal$Model$NoAttribute = {$: 'NoAttribute'};
var $mdgriffith$elm_ui$Element$Input$hasFocusStyle = function (attr) {
	if (((attr.$ === 'StyleClass') && (attr.b.$ === 'PseudoSelector')) && (attr.b.a.$ === 'Focus')) {
		var _v1 = attr.b;
		var _v2 = _v1.a;
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$focusDefault = function (attrs) {
	return A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, attrs) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass('focusable');
};
var $mdgriffith$elm_ui$Element$Events$onClick = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onClick);
var $mdgriffith$elm_ui$Element$Input$enter = 'Enter';
var $mdgriffith$elm_ui$Element$Input$onKey = F2(
	function (desiredCode, msg) {
		var decode = function (code) {
			return _Utils_eq(code, desiredCode) ? $elm$json$Json$Decode$succeed(msg) : $elm$json$Json$Decode$fail('Not the enter key');
		};
		var isKey = A2(
			$elm$json$Json$Decode$andThen,
			decode,
			A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
		return $mdgriffith$elm_ui$Internal$Model$Attr(
			A2(
				$elm$html$Html$Events$preventDefaultOn,
				'keyup',
				A2(
					$elm$json$Json$Decode$map,
					function (fired) {
						return _Utils_Tuple2(fired, true);
					},
					isKey)));
	});
var $mdgriffith$elm_ui$Element$Input$onEnter = function (msg) {
	return A2($mdgriffith$elm_ui$Element$Input$onKey, $mdgriffith$elm_ui$Element$Input$enter, msg);
};
var $mdgriffith$elm_ui$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$cursor = $mdgriffith$elm_ui$Internal$Flag$flag(21);
var $mdgriffith$elm_ui$Element$pointer = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.cursorPointer);
var $mdgriffith$elm_ui$Element$Input$button = F2(
	function (attrs, _v0) {
		var onPress = _v0.onPress;
		var label = _v0.label;
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentCenterX + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.seButton + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.noTextSelection)))))),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$pointer,
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$Input$focusDefault(attrs),
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Button),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Internal$Model$Attr(
											$elm$html$Html$Attributes$tabindex(0)),
										function () {
											if (onPress.$ === 'Nothing') {
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Internal$Model$Attr(
														$elm$html$Html$Attributes$disabled(true)),
													attrs);
											} else {
												var msg = onPress.a;
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Element$Events$onClick(msg),
													A2(
														$elm$core$List$cons,
														$mdgriffith$elm_ui$Element$Input$onEnter(msg),
														attrs));
											}
										}()))))))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var $mdgriffith$elm_ui$Internal$Flag$borderColor = $mdgriffith$elm_ui$Internal$Flag$flag(28);
var $mdgriffith$elm_ui$Element$Border$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'border-color',
			clr));
};
var $mdgriffith$elm_ui$Internal$Model$PaddingStyle = F5(
	function (a, b, c, d, e) {
		return {$: 'PaddingStyle', a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Internal$Flag$padding = $mdgriffith$elm_ui$Internal$Flag$flag(2);
var $mdgriffith$elm_ui$Element$padding = function (x) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$padding,
		A5(
			$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
			'p-' + $elm$core$String$fromInt(x),
			x,
			x,
			x,
			x));
};
var $mdgriffith$elm_ui$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 'Rgba', a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Element$rgb = F3(
	function (r, g, b) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, r, g, b, 1);
	});
var $mdgriffith$elm_ui$Internal$Flag$borderRound = $mdgriffith$elm_ui$Internal$Flag$flag(17);
var $mdgriffith$elm_ui$Element$Border$rounded = function (radius) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderRound,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			'br-' + $elm$core$String$fromInt(radius),
			'border-radius',
			$elm$core$String$fromInt(radius) + 'px'));
};
var $mdgriffith$elm_ui$Internal$Flag$borderStyle = $mdgriffith$elm_ui$Internal$Flag$flag(11);
var $mdgriffith$elm_ui$Element$Border$solid = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$borderStyle, $mdgriffith$elm_ui$Internal$Style$classes.borderSolid);
var $mdgriffith$elm_ui$Internal$Model$SpacingStyle = F3(
	function (a, b, c) {
		return {$: 'SpacingStyle', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Flag$spacing = $mdgriffith$elm_ui$Internal$Flag$flag(3);
var $mdgriffith$elm_ui$Internal$Model$spacingName = F2(
	function (x, y) {
		return 'spacing-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y)));
	});
var $mdgriffith$elm_ui$Element$spacing = function (x) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$spacing,
		A3(
			$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
			A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, x),
			x,
			x));
};
var $mdgriffith$elm_ui$Internal$Model$Text = function (a) {
	return {$: 'Text', a: a};
};
var $mdgriffith$elm_ui$Element$text = function (content) {
	return $mdgriffith$elm_ui$Internal$Model$Text(content);
};
var $author$project$Main$exampleButton = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_Nil,
	A2(
		$mdgriffith$elm_ui$Element$Input$button,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Border$color(
				A3($mdgriffith$elm_ui$Element$rgb, 0, 1, 0)),
				$mdgriffith$elm_ui$Element$Border$solid,
				$mdgriffith$elm_ui$Element$Border$rounded(3),
				$mdgriffith$elm_ui$Element$Background$color(
				A3($mdgriffith$elm_ui$Element$rgb, 0.9, 0.9, 0.9)),
				$mdgriffith$elm_ui$Element$Font$color(
				A3($mdgriffith$elm_ui$Element$rgb, 0.9, 0.2, 0.2)),
				$mdgriffith$elm_ui$Element$spacing(5),
				$mdgriffith$elm_ui$Element$padding(5)
			]),
		{
			label: $mdgriffith$elm_ui$Element$text('Show an example!'),
			onPress: $elm$core$Maybe$Just($author$project$Main$ShowExample)
		}));
var $mdgriffith$elm_ui$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 'FontFamily', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$fontFamily = $mdgriffith$elm_ui$Internal$Flag$flag(5);
var $elm$core$String$toLower = _String_toLower;
var $mdgriffith$elm_ui$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 'Serif':
						return 'serif';
					case 'SansSerif':
						return 'sans-serif';
					case 'Monospace':
						return 'monospace';
					case 'Typeface':
						var name = font.a;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					case 'ImportFont':
						var name = font.a;
						var url = font.b;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					default:
						var name = font.a.name;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
				}
			}());
	});
var $mdgriffith$elm_ui$Element$Font$family = function (families) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontFamily,
		A2(
			$mdgriffith$elm_ui$Internal$Model$FontFamily,
			A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'ff-', families),
			families));
};
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var $mdgriffith$elm_ui$Element$link = F2(
	function (attrs, _v0) {
		var url = _v0.url;
		var label = _v0.label;
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$NodeName('a'),
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$Attr(
					$elm$html$Html$Attributes$href(url)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Internal$Model$Attr(
						$elm$html$Html$Attributes$rel('noopener noreferrer')),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentCenterX + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.link)))),
								attrs))))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var $mdgriffith$elm_ui$Internal$Model$Paragraph = {$: 'Paragraph'};
var $mdgriffith$elm_ui$Internal$Model$Fill = function (a) {
	return {$: 'Fill', a: a};
};
var $mdgriffith$elm_ui$Element$fill = $mdgriffith$elm_ui$Internal$Model$Fill(1);
var $mdgriffith$elm_ui$Element$paragraph = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asParagraph,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Paragraph),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$spacing(5),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Internal$Model$SansSerif = {$: 'SansSerif'};
var $mdgriffith$elm_ui$Element$Font$sansSerif = $mdgriffith$elm_ui$Internal$Model$SansSerif;
var $mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
	return {$: 'Typeface', a: a};
};
var $mdgriffith$elm_ui$Element$Font$typeface = $mdgriffith$elm_ui$Internal$Model$Typeface;
var $author$project$Main$githubLink = A2(
	$mdgriffith$elm_ui$Element$paragraph,
	_List_Nil,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$text('This is all open source. Take a look at '),
			A2(
			$mdgriffith$elm_ui$Element$link,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Font$color(
					A3($mdgriffith$elm_ui$Element$rgb, 0, 0, 1)),
					$mdgriffith$elm_ui$Element$Font$family(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$typeface('Monospace'),
							$mdgriffith$elm_ui$Element$Font$sansSerif
						]))
				]),
			{
				label: $mdgriffith$elm_ui$Element$text('the github repo.'),
				url: 'https://github.com/eelcoh/plantuml-generator'
			})
		]));
var $author$project$Main$ChangeIncludeTheme = function (a) {
	return {$: 'ChangeIncludeTheme', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AlignX = function (a) {
	return {$: 'AlignX', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Left = {$: 'Left'};
var $mdgriffith$elm_ui$Element$alignLeft = $mdgriffith$elm_ui$Internal$Model$AlignX($mdgriffith$elm_ui$Internal$Model$Left);
var $mdgriffith$elm_ui$Internal$Model$LivePolite = {$: 'LivePolite'};
var $mdgriffith$elm_ui$Element$Region$announce = $mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$LivePolite);
var $mdgriffith$elm_ui$Internal$Model$AsRow = {$: 'AsRow'};
var $mdgriffith$elm_ui$Internal$Model$asRow = $mdgriffith$elm_ui$Internal$Model$AsRow;
var $mdgriffith$elm_ui$Element$Input$applyLabel = F3(
	function (attrs, label, input) {
		if (label.$ === 'HiddenLabel') {
			var labelText = label.a;
			return A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asColumn,
				$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
				attrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[input])));
		} else {
			var position = label.a;
			var labelAttrs = label.b;
			var labelChild = label.c;
			var labelElement = A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				labelAttrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[labelChild])));
			switch (position.$) {
				case 'Above':
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						attrs,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
				case 'Below':
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						attrs,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				case 'OnRight':
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						attrs,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				default:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						attrs,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$CenterY = {$: 'CenterY'};
var $mdgriffith$elm_ui$Element$centerY = $mdgriffith$elm_ui$Internal$Model$AlignY($mdgriffith$elm_ui$Internal$Model$CenterY);
var $mdgriffith$elm_ui$Internal$Model$Label = function (a) {
	return {$: 'Label', a: a};
};
var $mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute = function (label) {
	if (label.$ === 'HiddenLabel') {
		var textLabel = label.a;
		return $mdgriffith$elm_ui$Internal$Model$Describe(
			$mdgriffith$elm_ui$Internal$Model$Label(textLabel));
	} else {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	}
};
var $mdgriffith$elm_ui$Element$Input$isHiddenLabel = function (label) {
	if (label.$ === 'HiddenLabel') {
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$onKeyLookup = function (lookup) {
	var decode = function (code) {
		var _v0 = lookup(code);
		if (_v0.$ === 'Nothing') {
			return $elm$json$Json$Decode$fail('No key matched');
		} else {
			var msg = _v0.a;
			return $elm$json$Json$Decode$succeed(msg);
		}
	};
	var isKey = A2(
		$elm$json$Json$Decode$andThen,
		decode,
		A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		A2($elm$html$Html$Events$on, 'keyup', isKey));
};
var $mdgriffith$elm_ui$Element$Input$space = ' ';
var $mdgriffith$elm_ui$Element$Input$tabindex = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$tabindex);
var $mdgriffith$elm_ui$Element$Input$checkbox = F2(
	function (attrs, _v0) {
		var label = _v0.label;
		var icon = _v0.icon;
		var checked = _v0.checked;
		var onChange = _v0.onChange;
		var attributes = _Utils_ap(
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Input$isHiddenLabel(label) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Element$spacing(6),
					$mdgriffith$elm_ui$Internal$Model$Attr(
					$elm$html$Html$Events$onClick(
						onChange(!checked))),
					$mdgriffith$elm_ui$Element$Region$announce,
					$mdgriffith$elm_ui$Element$Input$onKeyLookup(
					function (code) {
						return _Utils_eq(code, $mdgriffith$elm_ui$Element$Input$enter) ? $elm$core$Maybe$Just(
							onChange(!checked)) : (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$space) ? $elm$core$Maybe$Just(
							onChange(!checked)) : $elm$core$Maybe$Nothing);
					}),
					$mdgriffith$elm_ui$Element$Input$tabindex(0),
					$mdgriffith$elm_ui$Element$pointer,
					$mdgriffith$elm_ui$Element$alignLeft,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
				]),
			attrs);
		return A3(
			$mdgriffith$elm_ui$Element$Input$applyLabel,
			attributes,
			label,
			A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Internal$Model$Attr(
						A2($elm$html$Html$Attributes$attribute, 'role', 'checkbox')),
						$mdgriffith$elm_ui$Internal$Model$Attr(
						A2(
							$elm$html$Html$Attributes$attribute,
							'aria-checked',
							checked ? 'true' : 'false')),
						$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(label),
						$mdgriffith$elm_ui$Element$centerY,
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink)
					]),
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[
							icon(checked)
						]))));
	});
var $author$project$Main$switchOffButton = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$Border$color(
			A3($mdgriffith$elm_ui$Element$rgb, 0, 1, 0)),
			$mdgriffith$elm_ui$Element$Border$solid,
			$mdgriffith$elm_ui$Element$Border$rounded(3),
			$mdgriffith$elm_ui$Element$Background$color(
			A3($mdgriffith$elm_ui$Element$rgb, 0.9, 0.9, 0.9)),
			$mdgriffith$elm_ui$Element$Font$color(
			A3($mdgriffith$elm_ui$Element$rgb, 0.9, 0.2, 0.2)),
			$mdgriffith$elm_ui$Element$spacing(5),
			$mdgriffith$elm_ui$Element$padding(5)
		]),
	$mdgriffith$elm_ui$Element$text('Switch off'));
var $author$project$Main$switchOnButton = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$Border$color(
			A3($mdgriffith$elm_ui$Element$rgb, 0, 1, 0)),
			$mdgriffith$elm_ui$Element$Border$solid,
			$mdgriffith$elm_ui$Element$Border$rounded(3),
			$mdgriffith$elm_ui$Element$Background$color(
			A3($mdgriffith$elm_ui$Element$rgb, 0.9, 0.9, 0.9)),
			$mdgriffith$elm_ui$Element$Font$color(
			A3($mdgriffith$elm_ui$Element$rgb, 0.9, 0.2, 0.2)),
			$mdgriffith$elm_ui$Element$spacing(5),
			$mdgriffith$elm_ui$Element$padding(5)
		]),
	$mdgriffith$elm_ui$Element$text('Switch on'));
var $author$project$Main$icon = function (val) {
	return val ? $author$project$Main$switchOffButton : $author$project$Main$switchOnButton;
};
var $mdgriffith$elm_ui$Element$Input$Above = {$: 'Above'};
var $mdgriffith$elm_ui$Element$Input$Label = F3(
	function (a, b, c) {
		return {$: 'Label', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Element$Input$labelAbove = $mdgriffith$elm_ui$Element$Input$Label($mdgriffith$elm_ui$Element$Input$Above);
var $author$project$Main$includeTheme = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$Input$checkbox,
		_List_Nil,
		{
			checked: model.includeTheme,
			icon: $author$project$Main$icon,
			label: A2(
				$mdgriffith$elm_ui$Element$Input$labelAbove,
				_List_Nil,
				$mdgriffith$elm_ui$Element$text('Include monochrome theme')),
			onChange: $author$project$Main$ChangeIncludeTheme
		});
};
var $mdgriffith$elm_ui$Internal$Flag$fontWeight = $mdgriffith$elm_ui$Internal$Flag$flag(13);
var $mdgriffith$elm_ui$Element$Font$bold = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontWeight, $mdgriffith$elm_ui$Internal$Style$classes.bold);
var $author$project$Main$intro = A2(
	$mdgriffith$elm_ui$Element$paragraph,
	_List_Nil,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$text('This is a '),
			A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[$mdgriffith$elm_ui$Element$Font$bold]),
			$mdgriffith$elm_ui$Element$text('PlantUML Sequence Diagram generator')),
			$mdgriffith$elm_ui$Element$text('. Of course you can write them in PlantUML, but often i find i could use a much simpler way to express the sequence. So here it is.')
		]));
var $mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2(
	function (a, b) {
		return {$: 'OnlyDynamic', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2(
	function (a, b) {
		return {$: 'StaticRootAndDynamic', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$AllowHover = {$: 'AllowHover'};
var $mdgriffith$elm_ui$Internal$Model$Layout = {$: 'Layout'};
var $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
	backgroundColor: $elm$core$Maybe$Nothing,
	borderColor: $elm$core$Maybe$Nothing,
	shadow: $elm$core$Maybe$Just(
		{
			blur: 0,
			color: A4($mdgriffith$elm_ui$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			offset: _Utils_Tuple2(0, 0),
			size: 3
		})
};
var $mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 'HoverOption':
					var hoverable = opt.a;
					var _v4 = record.hover;
					if (_v4.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								hover: $elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 'FocusStyleOption':
					var focusStyle = opt.a;
					var _v5 = record.focus;
					if (_v5.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								focus: $elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _v6 = record.mode;
					if (_v6.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								mode: $elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			focus: function () {
				var _v0 = record.focus;
				if (_v0.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _v0.a;
					return focusable;
				}
			}(),
			hover: function () {
				var _v1 = record.hover;
				if (_v1.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$AllowHover;
				} else {
					var hoverable = _v1.a;
					return hoverable;
				}
			}(),
			mode: function () {
				var _v2 = record.mode;
				if (_v2.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$Layout;
				} else {
					var actualMode = _v2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			$elm$core$List$foldr,
			combine,
			{focus: $elm$core$Maybe$Nothing, hover: $elm$core$Maybe$Nothing, mode: $elm$core$Maybe$Nothing},
			options));
};
var $mdgriffith$elm_ui$Internal$Model$toHtml = F2(
	function (mode, el) {
		switch (el.$) {
			case 'Unstyled':
				var html = el.a;
				return html($mdgriffith$elm_ui$Internal$Model$asEl);
			case 'Styled':
				var styles = el.a.styles;
				var html = el.a.html;
				return A2(
					html,
					mode(styles),
					$mdgriffith$elm_ui$Internal$Model$asEl);
			case 'Text':
				var text = el.a;
				return $mdgriffith$elm_ui$Internal$Model$textElement(text);
			default:
				return $mdgriffith$elm_ui$Internal$Model$textElement('');
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = $mdgriffith$elm_ui$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _v0 = options.mode;
			if (_v0.$ === 'NoStaticStyleSheet') {
				return $mdgriffith$elm_ui$Internal$Model$OnlyDynamic(options);
			} else {
				return $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Internal$Model$toHtml,
			embedStyle,
			A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				attributes,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var $mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
	return {$: 'FontSize', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$fontSize = $mdgriffith$elm_ui$Internal$Flag$flag(4);
var $mdgriffith$elm_ui$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			$mdgriffith$elm_ui$Internal$Model$Typeface('Open Sans'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Helvetica'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Verdana'),
			$mdgriffith$elm_ui$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$bgColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0)),
				'background-color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontSize,
			$mdgriffith$elm_ui$Internal$Model$FontSize(20)),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontFamily,
			A2(
				$mdgriffith$elm_ui$Internal$Model$FontFamily,
				A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var $mdgriffith$elm_ui$Element$layoutWith = F3(
	function (_v0, attrs, child) {
		var options = _v0.options;
		return A3(
			$mdgriffith$elm_ui$Internal$Model$renderRoot,
			options,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass(
					A2(
						$elm$core$String$join,
						' ',
						_List_fromArray(
							[$mdgriffith$elm_ui$Internal$Style$classes.root, $mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single]))),
				_Utils_ap($mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)),
			child);
	});
var $mdgriffith$elm_ui$Element$layout = $mdgriffith$elm_ui$Element$layoutWith(
	{options: _List_Nil});
var $elm$html$Html$pre = _VirtualDom_node('pre');
var $author$project$SequenceDiagram$Renderer$withEol = function (str) {
	return str + '\n';
};
var $author$project$SequenceDiagram$Renderer$withIndent = function () {
	var indent = function (s) {
		return '    ' + s;
	};
	return $elm$core$List$map(indent);
}();
var $author$project$SequenceDiagram$Renderer$session = F2(
	function (participant_, stepLines_) {
		var deactivate = function (p) {
			return $author$project$SequenceDiagram$Renderer$withEol(
				$author$project$SequenceDiagram$Renderer$withEol('deactivate ' + p));
		};
		var activate = function (p) {
			return $author$project$SequenceDiagram$Renderer$withEol('activate ' + p);
		};
		return A2(
			$elm$core$List$cons,
			activate(participant_),
			_Utils_ap(
				$author$project$SequenceDiagram$Renderer$withIndent(stepLines_),
				_List_fromArray(
					[
						deactivate(participant_)
					])));
	});
var $elm$core$String$lines = _String_lines;
var $author$project$SequenceDiagram$Renderer$skinparam = A2(
	$elm$core$List$map,
	$author$project$SequenceDiagram$Renderer$withEol,
	$elm$core$String$lines(
		$author$project$SequenceDiagram$Renderer$withEol('skinparam shadowing false\n\nskinparam sequence {\n\n    ArrowColor #515151\n    ActorBorderColor #515151\n    LifeLineBorderColor #515151\n    LifeLineBackgroundColor #ddd\n    \n    ParticipantBorderColor #515151\n    ParticipantBackgroundColor white\n    ParticipantFontName Arial\n    ParticipantFontSize 17\n    ParticipantFontColor #515151\n    \n    ActorBackgroundColor white\n    ActorFontColor DeepSkyBlue\n    ActorFontSize 17\n    ActorFontName Aapex\n}\n    ')));
var $author$project$SequenceDiagram$Renderer$returnLine = F2(
	function (p1, p2) {
		return $author$project$SequenceDiagram$Renderer$withEol(p1 + (' --> ' + p2));
	});
var $author$project$SequenceDiagram$Renderer$returnTo = F3(
	function (showReturn, p1, p2) {
		return showReturn ? $elm$core$Maybe$Just(
			A2($author$project$SequenceDiagram$Renderer$returnLine, p1, p2)) : $elm$core$Maybe$Nothing;
	});
var $author$project$SequenceDiagram$Renderer$writeMaybeCaption = function (mCaption) {
	var mkCaption = function (c) {
		return ' ' + c;
	};
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		A2($elm$core$Maybe$map, mkCaption, mCaption));
};
var $author$project$SequenceDiagram$Renderer$writeStep = F3(
	function (showReturn, pFrom, _v0) {
		var pTo = _v0.a;
		var options = _v0.b;
		var mCaption = _v0.c;
		var steps = _v0.d;
		var to = ' -> ';
		var stepLine_ = $author$project$SequenceDiagram$Renderer$withEol(
			$author$project$SequenceDiagram$Renderer$withEol(
				pFrom + (to + (pTo + (':' + $author$project$SequenceDiagram$Renderer$writeMaybeCaption(mCaption))))));
		var returnLines_ = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				function (a) {
					return _List_fromArray(
						[a]);
				},
				A3($author$project$SequenceDiagram$Renderer$returnTo, showReturn, pTo, pFrom)));
		var stepLines_ = function (a) {
			return A2($elm$core$List$append, a, returnLines_);
		}(
			$elm$core$List$concat(
				A2(
					$elm$core$List$map,
					A2($author$project$SequenceDiagram$Renderer$writeStep, showReturn, pTo),
					steps)));
		return A2(
			$elm$core$List$cons,
			stepLine_,
			A2($author$project$SequenceDiagram$Renderer$session, pTo, stepLines_));
	});
var $author$project$SequenceDiagram$Renderer$toPlantUml = F3(
	function (showReturn, showTheme, _v0) {
		var name = _v0.a;
		var steps = _v0.b;
		var theme = showTheme ? $author$project$SequenceDiagram$Renderer$skinparam : _List_Nil;
		var steps_ = $elm$core$List$concat(
			A2(
				$elm$core$List$map,
				A2($author$project$SequenceDiagram$Renderer$writeStep, showReturn, name),
				steps));
		var body = A2($author$project$SequenceDiagram$Renderer$session, name, steps_);
		return $elm$core$String$concat(
			_Utils_ap(
				_List_fromArray(
					['@startuml\n\n']),
				_Utils_ap(
					theme,
					_Utils_ap(
						body,
						_List_fromArray(
							['@enduml\n'])))));
	});
var $author$project$Main$right = function (model) {
	var _v0 = model.sequence;
	if (_v0.$ === 'Err') {
		var e = _v0.a;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_Nil,
			$mdgriffith$elm_ui$Element$text(e));
	} else {
		var seq = _v0.a;
		return $mdgriffith$elm_ui$Element$html(
			A2(
				$elm$html$Html$pre,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						A3($author$project$SequenceDiagram$Renderer$toPlantUml, model.alwaysReturn, model.includeTheme, seq))
					])));
	}
};
var $mdgriffith$elm_ui$Element$row = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asRow,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentLeft + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $author$project$Main$ChangeAlwaysReturn = function (a) {
	return {$: 'ChangeAlwaysReturn', a: a};
};
var $author$project$Main$showReturn = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$Input$checkbox,
		_List_Nil,
		{
			checked: model.alwaysReturn,
			icon: $author$project$Main$icon,
			label: A2(
				$mdgriffith$elm_ui$Element$Input$labelAbove,
				_List_Nil,
				$mdgriffith$elm_ui$Element$text('Always show the return arrow')),
			onChange: $author$project$Main$ChangeAlwaysReturn
		});
};
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $author$project$Main$view = function (model) {
	return $elm$core$List$singleton(
		A2(
			$mdgriffith$elm_ui$Element$layout,
			_List_Nil,
			A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$spacing(20),
						$mdgriffith$elm_ui$Element$alignTop
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$spacing(30),
								$mdgriffith$elm_ui$Element$width(
								$mdgriffith$elm_ui$Element$px(600)),
								$mdgriffith$elm_ui$Element$padding(20),
								$mdgriffith$elm_ui$Element$Background$color(
								A3($mdgriffith$elm_ui$Element$rgb, 0.7, 0.7, 0.7)),
								$mdgriffith$elm_ui$Element$Font$color(
								A3($mdgriffith$elm_ui$Element$rgb, 0.2, 0.2, 0.2)),
								$mdgriffith$elm_ui$Element$alignTop
							]),
						_List_fromArray(
							[
								$author$project$Main$intro,
								$author$project$Main$githubLink,
								$author$project$Main$exampleButton,
								$author$project$Main$editor(model),
								$author$project$Main$showReturn(model),
								$author$project$Main$includeTheme(model)
							])),
						A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$spacing(20),
								$mdgriffith$elm_ui$Element$padding(20),
								$mdgriffith$elm_ui$Element$alignTop,
								$mdgriffith$elm_ui$Element$Background$color(
								A3($mdgriffith$elm_ui$Element$rgb, 0.9, 0.9, 0.9)),
								$mdgriffith$elm_ui$Element$Font$color(
								A3($mdgriffith$elm_ui$Element$rgb, 0.2, 0.2, 0.2))
							]),
						_List_fromArray(
							[
								$author$project$Main$right(model)
							]))
					]))));
};
var $author$project$Main$document = function (model) {
	return {
		body: $author$project$Main$view(model),
		title: 'platUml sequence diagram generator'
	};
};
var $jxxcarlson$elm_text_editor$Editor$Editor = function (a) {
	return {$: 'Editor', a: a};
};
var $jxxcarlson$elm_text_editor$Editor$History$History = function (a) {
	return {$: 'History', a: a};
};
var $jxxcarlson$elm_text_editor$Editor$History$empty = $jxxcarlson$elm_text_editor$Editor$History$History(
	{future: _List_Nil, past: _List_Nil});
var $lovasoa$elm_rolling_list$RollingList$fromList = function (l) {
	return {next: l, previous: _List_Nil};
};
var $jxxcarlson$elm_text_editor$Buffer$Buffer = function (a) {
	return {$: 'Buffer', a: a};
};
var $jxxcarlson$elm_text_editor$Buffer$fromString = function (str) {
	return $jxxcarlson$elm_text_editor$Buffer$Buffer(str);
};
var $jxxcarlson$elm_text_editor$Buffer$init = function (content) {
	return $jxxcarlson$elm_text_editor$Buffer$Buffer(content);
};
var $jinjor$elm_debounce$Debounce$Debounce = function (a) {
	return {$: 'Debounce', a: a};
};
var $jinjor$elm_debounce$Debounce$init = $jinjor$elm_debounce$Debounce$Debounce(
	{input: _List_Nil, locked: false});
var $jxxcarlson$elm_text_editor$Editor$transformConfig = function (c) {
	var multiplier = 1.64;
	var fontWidth = c.fontProportion * c.lineHeight;
	return {
		fontProportion: c.fontProportion,
		height: c.height,
		lineHeight: c.lineHeight,
		lineHeightFactor: c.lineHeightFactor,
		showInfoPanel: c.showInfoPanel,
		width: c.width,
		wrapOption: c.wrapOption,
		wrapParams: {
			maximumWidth: $elm$core$Basics$floor(((multiplier * c.width) / fontWidth) - 5),
			optimalWidth: $elm$core$Basics$floor(((multiplier * c.width) / fontWidth) - 10),
			stringWidth: $elm$core$String$length
		}
	};
};
var $jxxcarlson$elm_text_editor$Editor$init = F2(
	function (editorConfig, text) {
		return $jxxcarlson$elm_text_editor$Editor$Editor(
			{
				buffer: $jxxcarlson$elm_text_editor$Buffer$init(text),
				state: {
					canReplace: false,
					clipboard: '',
					config: $jxxcarlson$elm_text_editor$Editor$transformConfig(editorConfig),
					currentLine: $elm$core$Maybe$Nothing,
					cursor: A2($jxxcarlson$elm_text_editor$Position$Position, 0, 0),
					debounce: $jinjor$elm_debounce$Debounce$init,
					dragging: false,
					history: $jxxcarlson$elm_text_editor$Editor$History$empty,
					replacementText: '',
					savedBuffer: $jxxcarlson$elm_text_editor$Buffer$fromString(''),
					searchHitIndex: 0,
					searchResults: $lovasoa$elm_rolling_list$RollingList$fromList(_List_Nil),
					searchTerm: '',
					selectedText: $elm$core$Maybe$Nothing,
					selection: $elm$core$Maybe$Nothing,
					showGoToLinePanel: false,
					showHelp: true,
					showInfoPanel: editorConfig.showInfoPanel,
					showSearchPanel: false,
					topLine: 0
				}
			});
	});
var $author$project$Main$initModel = {
	alwaysReturn: true,
	currentString: $elm$core$Maybe$Nothing,
	editor: A2($jxxcarlson$elm_text_editor$Editor$init, $author$project$Main$editorConfig, ''),
	includeTheme: false,
	sequence: $elm$core$Result$Err('no sequence yet')
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$init = function (_v0) {
	return _Utils_Tuple2($author$project$Main$initModel, $elm$core$Platform$Cmd$none);
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Main$example = 'sequence user\n    browser: click\n        api: get this\n            database: read this\n        otherApi\n    browser: enter changes\n    browser: submit\n        api: post that\n            database: write that\n    ';
var $jxxcarlson$elm_text_editor$Buffer$toString = function (_v0) {
	var buffer = _v0.a;
	return buffer;
};
var $jxxcarlson$elm_text_editor$Editor$getSource = function (_v0) {
	var data = _v0.a;
	return $jxxcarlson$elm_text_editor$Buffer$toString(data.buffer);
};
var $jxxcarlson$elm_text_editor$Editor$Update$clearState = function (state) {
	return _Utils_update(
		state,
		{
			cursor: {column: 0, line: 0},
			dragging: false,
			replacementText: '',
			searchResults: $lovasoa$elm_rolling_list$RollingList$fromList(_List_Nil),
			searchTerm: '',
			selectedText: $elm$core$Maybe$Nothing,
			selection: $elm$core$Maybe$Nothing,
			topLine: 0
		});
};
var $jxxcarlson$elm_text_editor$Editor$clearState = function (_v0) {
	var data = _v0.a;
	return $jxxcarlson$elm_text_editor$Editor$Editor(
		_Utils_update(
			data,
			{
				state: $jxxcarlson$elm_text_editor$Editor$Update$clearState(data.state)
			}));
};
var $jxxcarlson$elm_text_editor$Editor$Wrap$Start = {$: 'Start'};
var $jxxcarlson$elm_text_editor$Editor$Wrap$InBlank = {$: 'InBlank'};
var $jxxcarlson$elm_text_editor$Editor$Wrap$InBlock = {$: 'InBlock'};
var $jxxcarlson$elm_text_editor$Editor$Wrap$InCode = {$: 'InCode'};
var $jxxcarlson$elm_text_editor$Editor$Wrap$InParagraph = {$: 'InParagraph'};
var $jxxcarlson$elm_text_editor$Editor$Wrap$BeginBlock = {$: 'BeginBlock'};
var $jxxcarlson$elm_text_editor$Editor$Wrap$Blank = {$: 'Blank'};
var $jxxcarlson$elm_text_editor$Editor$Wrap$CodeDelimiter = {$: 'CodeDelimiter'};
var $jxxcarlson$elm_text_editor$Editor$Wrap$EndBlock = {$: 'EndBlock'};
var $jxxcarlson$elm_text_editor$Editor$Wrap$Text = {$: 'Text'};
var $elm$core$String$trimLeft = _String_trimLeft;
var $jxxcarlson$elm_text_editor$Editor$Wrap$classifyLine = function (str) {
	var prefix = $elm$core$String$trimLeft(str);
	return (prefix === '') ? $jxxcarlson$elm_text_editor$Editor$Wrap$Blank : ((A2($elm$core$String$left, 3, prefix) === '```') ? $jxxcarlson$elm_text_editor$Editor$Wrap$CodeDelimiter : ((A2($elm$core$String$left, 2, prefix) === '$$') ? $jxxcarlson$elm_text_editor$Editor$Wrap$CodeDelimiter : ((A2($elm$core$String$left, 6, prefix) === '\\begin') ? $jxxcarlson$elm_text_editor$Editor$Wrap$BeginBlock : ((A2($elm$core$String$left, 4, prefix) === '\\end') ? $jxxcarlson$elm_text_editor$Editor$Wrap$EndBlock : $jxxcarlson$elm_text_editor$Editor$Wrap$Text))));
};
var $jxxcarlson$elm_text_editor$Editor$Wrap$BlockParagraph = {$: 'BlockParagraph'};
var $jxxcarlson$elm_text_editor$Editor$Wrap$CodeParagraph = {$: 'CodeParagraph'};
var $jxxcarlson$elm_text_editor$Editor$Wrap$TextParagraph = {$: 'TextParagraph'};
var $jxxcarlson$elm_text_editor$Editor$Wrap$joinLines = function (list) {
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$filter,
			function (s) {
				return s !== '';
			},
			$elm$core$List$reverse(list)));
};
var $jxxcarlson$elm_text_editor$Editor$Wrap$joinLinesForCode = function (list) {
	return A2(
		$elm$core$String$join,
		'\n',
		$elm$core$List$reverse(list));
};
var $jxxcarlson$elm_text_editor$Editor$Wrap$opDict = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(
			'NoOp',
			F2(
				function (s, d) {
					return d;
				})),
			_Utils_Tuple2(
			'StartParagraph',
			F2(
				function (s, d) {
					return _Utils_update(
						d,
						{
							currentParagraph: _List_fromArray(
								[s]),
							tick: d.tick + 1
						});
				})),
			_Utils_Tuple2(
			'AddToParagraph',
			F2(
				function (s, d) {
					return _Utils_update(
						d,
						{
							currentParagraph: A2($elm$core$List$cons, s, d.currentParagraph),
							tick: d.tick + 1
						});
				})),
			_Utils_Tuple2(
			'EndParagraph',
			F2(
				function (s, d) {
					return _Utils_update(
						d,
						{
							currentParagraph: _List_Nil,
							paragraphList: A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									$jxxcarlson$elm_text_editor$Editor$Wrap$TextParagraph,
									$jxxcarlson$elm_text_editor$Editor$Wrap$joinLines(d.currentParagraph)),
								d.paragraphList)
						});
				})),
			_Utils_Tuple2(
			'StartCodeFromBlank',
			F2(
				function (s, d) {
					return _Utils_update(
						d,
						{
							currentParagraph: _List_fromArray(
								[s]),
							paragraphList: A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									$jxxcarlson$elm_text_editor$Editor$Wrap$TextParagraph,
									$jxxcarlson$elm_text_editor$Editor$Wrap$joinLines(d.currentParagraph)),
								d.paragraphList),
							tick: d.tick + 1
						});
				})),
			_Utils_Tuple2(
			'StartCodeFromParagraph',
			F2(
				function (s, d) {
					return _Utils_update(
						d,
						{
							currentParagraph: _List_fromArray(
								[s]),
							paragraphList: A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									$jxxcarlson$elm_text_editor$Editor$Wrap$TextParagraph,
									$jxxcarlson$elm_text_editor$Editor$Wrap$joinLines(d.currentParagraph)),
								d.paragraphList),
							tick: d.tick + 1
						});
				})),
			_Utils_Tuple2(
			'StartCode',
			F2(
				function (s, d) {
					return _Utils_update(
						d,
						{
							currentParagraph: _List_fromArray(
								[s]),
							tick: d.tick + 1
						});
				})),
			_Utils_Tuple2(
			'AddToCode',
			F2(
				function (s, d) {
					return _Utils_update(
						d,
						{
							currentParagraph: A2($elm$core$List$cons, s, d.currentParagraph),
							tick: d.tick + 1
						});
				})),
			_Utils_Tuple2(
			'EndCode',
			F2(
				function (s, d) {
					return _Utils_update(
						d,
						{
							currentParagraph: _List_Nil,
							paragraphList: A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									$jxxcarlson$elm_text_editor$Editor$Wrap$CodeParagraph,
									$jxxcarlson$elm_text_editor$Editor$Wrap$joinLinesForCode(
										A2($elm$core$List$cons, s, d.currentParagraph))),
								d.paragraphList)
						});
				})),
			_Utils_Tuple2(
			'StartBlockFromBlank',
			F2(
				function (s, d) {
					return _Utils_update(
						d,
						{
							currentParagraph: _List_fromArray(
								[s]),
							paragraphList: A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									$jxxcarlson$elm_text_editor$Editor$Wrap$TextParagraph,
									$jxxcarlson$elm_text_editor$Editor$Wrap$joinLines(d.currentParagraph)),
								d.paragraphList),
							tick: d.tick + 1
						});
				})),
			_Utils_Tuple2(
			'StartBlockFromParagraph',
			F2(
				function (s, d) {
					return _Utils_update(
						d,
						{
							currentParagraph: _List_fromArray(
								[s]),
							paragraphList: A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									$jxxcarlson$elm_text_editor$Editor$Wrap$TextParagraph,
									$jxxcarlson$elm_text_editor$Editor$Wrap$joinLines(d.currentParagraph)),
								d.paragraphList),
							tick: d.tick + 1
						});
				})),
			_Utils_Tuple2(
			'StartBlock',
			F2(
				function (s, d) {
					return _Utils_update(
						d,
						{
							currentParagraph: _List_fromArray(
								[s]),
							tick: d.tick + 1
						});
				})),
			_Utils_Tuple2(
			'AddToBlock',
			F2(
				function (s, d) {
					return _Utils_update(
						d,
						{
							currentParagraph: A2($elm$core$List$cons, s, d.currentParagraph),
							tick: d.tick + 1
						});
				})),
			_Utils_Tuple2(
			'EndBlock',
			F2(
				function (s, d) {
					return _Utils_update(
						d,
						{
							currentParagraph: _List_Nil,
							paragraphList: A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									$jxxcarlson$elm_text_editor$Editor$Wrap$BlockParagraph,
									$jxxcarlson$elm_text_editor$Editor$Wrap$joinLinesForCode(
										A2($elm$core$List$cons, s, d.currentParagraph))),
								d.paragraphList)
						});
				}))
		]));
var $jxxcarlson$elm_text_editor$Editor$Wrap$op = function (opName) {
	return A2(
		$elm$core$Maybe$withDefault,
		F2(
			function (_v0, d) {
				return d;
			}),
		A2($elm$core$Dict$get, opName, $jxxcarlson$elm_text_editor$Editor$Wrap$opDict));
};
var $jxxcarlson$elm_text_editor$Editor$Wrap$nextStateAndAction = F2(
	function (line, state) {
		var _v0 = _Utils_Tuple2(
			state,
			$jxxcarlson$elm_text_editor$Editor$Wrap$classifyLine(line));
		_v0$18:
		while (true) {
			switch (_v0.a.$) {
				case 'InCode':
					switch (_v0.b.$) {
						case 'CodeDelimiter':
							var _v19 = _v0.a;
							var _v20 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$Start,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('EndCode'));
						case 'Blank':
							var _v21 = _v0.a;
							var _v22 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InCode,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('AddToCode'));
						case 'Text':
							var _v23 = _v0.a;
							var _v24 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InCode,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('AddToCode'));
						default:
							break _v0$18;
					}
				case 'InBlank':
					switch (_v0.b.$) {
						case 'Blank':
							var _v7 = _v0.a;
							var _v8 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InBlank,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('EndParagraph'));
						case 'Text':
							var _v9 = _v0.a;
							var _v10 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InParagraph,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('StartParagraph'));
						case 'CodeDelimiter':
							var _v11 = _v0.a;
							var _v12 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InCode,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('StartCodeFromBlank'));
						case 'BeginBlock':
							var _v25 = _v0.a;
							var _v26 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InBlock,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('StartBlockFromBlank'));
						default:
							break _v0$18;
					}
				case 'InParagraph':
					switch (_v0.b.$) {
						case 'Text':
							var _v1 = _v0.a;
							var _v2 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InParagraph,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('AddToParagraph'));
						case 'Blank':
							var _v3 = _v0.a;
							var _v4 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InBlank,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('EndParagraph'));
						case 'CodeDelimiter':
							var _v5 = _v0.a;
							var _v6 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InCode,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('StartCodeFromParagraph'));
						case 'BeginBlock':
							var _v27 = _v0.a;
							var _v28 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InBlock,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('StartBlockFromParagraph'));
						default:
							break _v0$18;
					}
				case 'Start':
					switch (_v0.b.$) {
						case 'Text':
							var _v13 = _v0.a;
							var _v14 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InParagraph,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('StartParagraph'));
						case 'CodeDelimiter':
							var _v15 = _v0.a;
							var _v16 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InCode,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('StartCode'));
						case 'Blank':
							var _v17 = _v0.a;
							var _v18 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$Start,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('NoOp'));
						case 'BeginBlock':
							var _v29 = _v0.a;
							var _v30 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InBlock,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('StartBlock'));
						default:
							break _v0$18;
					}
				default:
					switch (_v0.b.$) {
						case 'EndBlock':
							var _v31 = _v0.a;
							var _v32 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$Start,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('EndBlock'));
						case 'Blank':
							var _v33 = _v0.a;
							var _v34 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InBlock,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('AddToBlock'));
						case 'Text':
							var _v35 = _v0.a;
							var _v36 = _v0.b;
							return _Utils_Tuple2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$InBlock,
								$jxxcarlson$elm_text_editor$Editor$Wrap$op('AddToBlock'));
						default:
							break _v0$18;
					}
			}
		}
		return _Utils_Tuple2(
			$jxxcarlson$elm_text_editor$Editor$Wrap$Start,
			$jxxcarlson$elm_text_editor$Editor$Wrap$op('NoOp'));
	});
var $jxxcarlson$elm_text_editor$Editor$Wrap$nextState = F2(
	function (line, _v0) {
		var state = _v0.a;
		var data = _v0.b;
		var _v1 = A2($jxxcarlson$elm_text_editor$Editor$Wrap$nextStateAndAction, line, state);
		var newState = _v1.a;
		var action = _v1.b;
		return _Utils_Tuple2(
			newState,
			A2(action, line, data));
	});
var $jxxcarlson$elm_text_editor$Editor$Wrap$runFSM = function (str) {
	var lines = $elm$core$String$lines(str);
	var initialData = _Utils_Tuple2(
		$jxxcarlson$elm_text_editor$Editor$Wrap$Start,
		{currentParagraph: _List_Nil, paragraphList: _List_Nil, tick: 0});
	return $elm$core$List$reverse(
		A3($elm$core$List$foldl, $jxxcarlson$elm_text_editor$Editor$Wrap$nextState, initialData, lines).b.paragraphList);
};
var $elm$core$String$trim = _String_trim;
var $folkertdev$elm_paragraph$SymmetricList$last = function (_v0) {
	var y = _v0.a;
	var x = _v0.b;
	return (!$elm$core$List$isEmpty(x)) ? $elm$core$List$head(x) : $elm$core$List$head(y);
};
var $folkertdev$elm_paragraph$Paragraph$fold1 = F3(
	function (f, g, list) {
		if (!list.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!list.b.b) {
				var a = list.a;
				return $elm$core$Maybe$Just(
					g(a));
			} else {
				var a = list.a;
				var x = list.b;
				return A2(
					$elm$core$Maybe$map,
					function (xs) {
						return A2(f, a, xs);
					},
					A3($folkertdev$elm_paragraph$Paragraph$fold1, f, g, x));
			}
		}
	});
var $folkertdev$elm_paragraph$Paragraph$scan1 = F3(
	function (f, g, list) {
		var g_ = function (a) {
			return _List_fromArray(
				[
					g(a)
				]);
		};
		var f_ = F2(
			function (a, s) {
				if (!s.b) {
					return s;
				} else {
					var first = s.a;
					var rest = s.b;
					return A2(
						$elm$core$List$cons,
						A2(f, a, first),
						s);
				}
			});
		return A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A3($folkertdev$elm_paragraph$Paragraph$fold1, f_, g_, list));
	});
var $folkertdev$elm_paragraph$SymmetricList$SymmetricList = F2(
	function (a, b) {
		return {$: 'SymmetricList', a: a, b: b};
	});
var $folkertdev$elm_paragraph$SymmetricList$cons = F2(
	function (a, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return (!$elm$core$List$isEmpty(y)) ? A2(
			$folkertdev$elm_paragraph$SymmetricList$SymmetricList,
			A2($elm$core$List$cons, a, x),
			y) : A2(
			$folkertdev$elm_paragraph$SymmetricList$SymmetricList,
			_List_fromArray(
				[a]),
			x);
	});
var $folkertdev$elm_paragraph$SymmetricList$empty = A2($folkertdev$elm_paragraph$SymmetricList$SymmetricList, _List_Nil, _List_Nil);
var $folkertdev$elm_paragraph$SymmetricList$singleton = function (x) {
	return A2($folkertdev$elm_paragraph$SymmetricList$cons, x, $folkertdev$elm_paragraph$SymmetricList$empty);
};
var $folkertdev$elm_paragraph$Paragraph$startr = function (width) {
	return {
		candidates: $folkertdev$elm_paragraph$SymmetricList$singleton(
			{length: 0, waste: 0, width: 0}),
		length: 1,
		width: width
	};
};
var $folkertdev$elm_paragraph$Paragraph$ceildiv = F2(
	function (n, m) {
		return (((n + m) - 1) / m) | 0;
	});
var $folkertdev$elm_paragraph$SymmetricList$head = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	return (!$elm$core$List$isEmpty(x)) ? $elm$core$List$head(x) : $elm$core$List$head(y);
};
var $elm$core$Basics$pow = _Basics_pow;
var $folkertdev$elm_paragraph$Paragraph$single = function (p) {
	return !p.length;
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $folkertdev$elm_paragraph$SymmetricList$splitAt = F2(
	function (n, xs) {
		return _Utils_Tuple2(
			A2($elm$core$List$take, n, xs),
			A2($elm$core$List$drop, n, xs));
	});
var $folkertdev$elm_paragraph$SymmetricList$tail = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	var _v1 = A2(
		$folkertdev$elm_paragraph$SymmetricList$splitAt,
		($elm$core$List$length(y) / 2) | 0,
		y);
	var y0 = _v1.a;
	var y1 = _v1.b;
	if (!x.b) {
		return $folkertdev$elm_paragraph$SymmetricList$empty;
	} else {
		if (!x.b.b) {
			return A2(
				$folkertdev$elm_paragraph$SymmetricList$SymmetricList,
				$elm$core$List$reverse(y1),
				y0);
		} else {
			var rest = x.b;
			return A2($folkertdev$elm_paragraph$SymmetricList$SymmetricList, rest, y);
		}
	}
};
var $folkertdev$elm_paragraph$SymmetricList$uncons = function (symlist) {
	var _v0 = $folkertdev$elm_paragraph$SymmetricList$head(symlist);
	if (_v0.$ === 'Just') {
		var v = _v0.a;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(
				v,
				$folkertdev$elm_paragraph$SymmetricList$tail(symlist)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $folkertdev$elm_paragraph$SymmetricList$init = function (_v0) {
	var y = _v0.a;
	var x = _v0.b;
	var _v1 = A2(
		$folkertdev$elm_paragraph$SymmetricList$splitAt,
		($elm$core$List$length(y) / 2) | 0,
		y);
	var y0 = _v1.a;
	var y1 = _v1.b;
	if (!x.b) {
		return $folkertdev$elm_paragraph$SymmetricList$empty;
	} else {
		if (!x.b.b) {
			return A2(
				$folkertdev$elm_paragraph$SymmetricList$SymmetricList,
				y0,
				$elm$core$List$reverse(y1));
		} else {
			var rest = x.b;
			return A2($folkertdev$elm_paragraph$SymmetricList$SymmetricList, y, rest);
		}
	}
};
var $folkertdev$elm_paragraph$SymmetricList$unsnoc = function (symlist) {
	var _v0 = $folkertdev$elm_paragraph$SymmetricList$last(symlist);
	if (_v0.$ === 'Just') {
		var v = _v0.a;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(
				$folkertdev$elm_paragraph$SymmetricList$init(symlist),
				v));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $folkertdev$elm_paragraph$Paragraph$stepr = F3(
	function (options, w, state) {
		var tot_width = (w + 1) + state.width;
		var width_hd = function (p) {
			return (tot_width - p.width) - 1;
		};
		var waste = function (p) {
			return $folkertdev$elm_paragraph$Paragraph$single(p) ? 0 : (p.waste + A2(
				$elm$core$Basics$pow,
				options.optimalWidth - width_hd(p),
				2));
		};
		var tot_len = 1 + state.length;
		var old_width_hd = function (p) {
			return (state.width - p.width) - 1;
		};
		var _new = function (p) {
			return $folkertdev$elm_paragraph$Paragraph$single(p) ? {length: state.length, waste: 0, width: state.width} : {
				length: state.length,
				waste: p.width + A2(
					$elm$core$Basics$pow,
					options.optimalWidth - old_width_hd(p),
					2),
				width: state.width
			};
		};
		var k = F2(
			function (p, q) {
				var wq0 = width_hd(q);
				var wp0 = width_hd(p);
				var rq0 = (options.maximumWidth - wq0) + 1;
				return ($folkertdev$elm_paragraph$Paragraph$single(q) && (!p.width)) ? A2($elm$core$Basics$min, options.optimalWidth - wp0, rq0) : ($folkertdev$elm_paragraph$Paragraph$single(q) ? rq0 : A2(
					$elm$core$Basics$min,
					A2(
						$folkertdev$elm_paragraph$Paragraph$ceildiv,
						waste(p) - waste(q),
						2 * (wq0 - wp0)),
					rq0));
			});
		var discardBadCandidates = function (ps_pq) {
			discardBadCandidates:
			while (true) {
				var _v0 = $folkertdev$elm_paragraph$SymmetricList$unsnoc(ps_pq);
				if (_v0.$ === 'Nothing') {
					return ps_pq;
				} else {
					var _v1 = _v0.a;
					var ps_p = _v1.a;
					var q = _v1.b;
					var _v2 = $folkertdev$elm_paragraph$SymmetricList$last(ps_p);
					if (_v2.$ === 'Nothing') {
						return (_Utils_cmp(
							width_hd(q),
							options.maximumWidth) > 0) ? $folkertdev$elm_paragraph$SymmetricList$empty : ps_pq;
					} else {
						var p = _v2.a;
						if ((_Utils_cmp(
							waste(p),
							waste(q)) < 1) || (_Utils_cmp(
							width_hd(q),
							options.maximumWidth) > 0)) {
							var $temp$ps_pq = ps_p;
							ps_pq = $temp$ps_pq;
							continue discardBadCandidates;
						} else {
							return ps_pq;
						}
					}
				}
			}
		};
		var add = F2(
			function (p, qr_rs) {
				add:
				while (true) {
					var _default = A2($folkertdev$elm_paragraph$SymmetricList$cons, p, qr_rs);
					var _v3 = $folkertdev$elm_paragraph$SymmetricList$uncons(qr_rs);
					if (_v3.$ === 'Nothing') {
						return _default;
					} else {
						var _v4 = _v3.a;
						var q = _v4.a;
						var r_rs = _v4.b;
						var _v5 = $folkertdev$elm_paragraph$SymmetricList$head(r_rs);
						if (_v5.$ === 'Just') {
							var r = _v5.a;
							if (_Utils_cmp(
								A2(k, p, q),
								A2(k, q, r)) < 1) {
								var $temp$p = p,
									$temp$qr_rs = r_rs;
								p = $temp$p;
								qr_rs = $temp$qr_rs;
								continue add;
							} else {
								return _default;
							}
						} else {
							return _default;
						}
					}
				}
			});
		var _v6 = $folkertdev$elm_paragraph$SymmetricList$last(state.candidates);
		if (_v6.$ === 'Nothing') {
			return state;
		} else {
			var last = _v6.a;
			var input = A2(
				add,
				_new(last),
				state.candidates);
			var newCandidates = discardBadCandidates(input);
			return {candidates: newCandidates, length: tot_len, width: tot_width};
		}
	});
var $folkertdev$elm_paragraph$Paragraph$splitAt = F2(
	function (n, xs) {
		return _Utils_Tuple2(
			A2($elm$core$List$take, n, xs),
			A2($elm$core$List$drop, n, xs));
	});
var $folkertdev$elm_paragraph$Paragraph$tile = F2(
	function (words, _v0) {
		var wordLengths = _v0.a;
		var targetLength = _v0.b;
		if (!wordLengths.b) {
			return _List_Nil;
		} else {
			var m = wordLengths.a;
			var ms = wordLengths.b;
			var remainingSpace = targetLength - m;
			var _v2 = A2($folkertdev$elm_paragraph$Paragraph$splitAt, remainingSpace, words);
			var usedWords = _v2.a;
			var remainingWords = _v2.b;
			return A2(
				$elm$core$List$cons,
				usedWords,
				A2(
					$folkertdev$elm_paragraph$Paragraph$tile,
					remainingWords,
					_Utils_Tuple2(
						A2(
							$elm$core$List$drop,
							remainingSpace,
							A2($elm$core$List$cons, m, ms)),
						m)));
		}
	});
var $folkertdev$elm_paragraph$Paragraph$paragraph = F2(
	function (options, words) {
		var zs = A3(
			$folkertdev$elm_paragraph$Paragraph$scan1,
			$folkertdev$elm_paragraph$Paragraph$stepr(options),
			$folkertdev$elm_paragraph$Paragraph$startr,
			A2($elm$core$List$map, options.stringWidth, words));
		if (!zs.b) {
			return _List_Nil;
		} else {
			var first = zs.a;
			var rest = zs.b;
			var wordLengths = A2(
				$elm$core$List$filterMap,
				A2(
					$elm$core$Basics$composeL,
					A2(
						$elm$core$Basics$composeL,
						$elm$core$Maybe$map(
							function ($) {
								return $.length;
							}),
						$folkertdev$elm_paragraph$SymmetricList$last),
					function ($) {
						return $.candidates;
					}),
				zs);
			var targetLength = first.length;
			return A2(
				$folkertdev$elm_paragraph$Paragraph$tile,
				words,
				_Utils_Tuple2(wordLengths, targetLength));
		}
	});
var $folkertdev$elm_paragraph$Paragraph$do = F2(
	function (a, list) {
		if (!list.b) {
			return _List_fromArray(
				[_List_Nil]);
		} else {
			var first = list.a;
			var rest = list.b;
			var _break = F3(
				function (p, q, xs) {
					if (_Utils_eq(p, q)) {
						return A2($elm$core$List$cons, _List_Nil, xs);
					} else {
						if (!xs.b) {
							return A2(
								$elm$core$List$cons,
								A2($elm$core$List$cons, q, _List_Nil),
								_List_Nil);
						} else {
							var y = xs.a;
							var ys = xs.b;
							return A2(
								$elm$core$List$cons,
								A2($elm$core$List$cons, q, y),
								ys);
						}
					}
				});
			var start = F2(
				function (p, q) {
					return A3(
						_break,
						p,
						q,
						_List_fromArray(
							[_List_Nil]));
				});
			return A2(
				$elm$core$Maybe$withDefault,
				_List_fromArray(
					[_List_Nil]),
				A3(
					$folkertdev$elm_paragraph$Paragraph$fold1,
					_break(a),
					start(a),
					list));
		}
	});
var $folkertdev$elm_paragraph$Paragraph$paras = A2(
	$elm$core$Basics$composeL,
	$elm$core$List$filter(
		A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$List$isEmpty)),
	$folkertdev$elm_paragraph$Paragraph$do(_List_Nil));
var $folkertdev$elm_paragraph$Paragraph$parse = A2(
	$elm$core$Basics$composeL,
	A2(
		$elm$core$Basics$composeL,
		$folkertdev$elm_paragraph$Paragraph$paras,
		$elm$core$List$map($elm$core$String$words)),
	$elm$core$String$lines);
var $folkertdev$elm_paragraph$Paragraph$undo = function (a) {
	var insert = F2(
		function (xs, ys) {
			return _Utils_ap(
				xs,
				_Utils_ap(
					_List_fromArray(
						[a]),
					ys));
		});
	return A2(
		$elm$core$Basics$composeL,
		$elm$core$Maybe$withDefault(_List_Nil),
		A2($folkertdev$elm_paragraph$Paragraph$fold1, insert, $elm$core$Basics$identity));
};
var $folkertdev$elm_paragraph$Paragraph$unparas = $folkertdev$elm_paragraph$Paragraph$undo(_List_Nil);
var $folkertdev$elm_paragraph$Paragraph$lines = function (options) {
	return A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$List$map(
					$elm$core$String$join(' ')),
				$folkertdev$elm_paragraph$Paragraph$unparas),
			$elm$core$List$map(
				A2(
					$elm$core$Basics$composeL,
					$folkertdev$elm_paragraph$Paragraph$paragraph(options),
					$elm$core$List$concat))),
		$folkertdev$elm_paragraph$Paragraph$parse);
};
var $jxxcarlson$elm_text_editor$Editor$Wrap$wrapParagraph = F2(
	function (wrapParams, _v0) {
		var paragraphType = _v0.a;
		var str = _v0.b;
		switch (paragraphType.$) {
			case 'TextParagraph':
				return A2(
					$elm$core$String$join,
					'\n',
					A2($folkertdev$elm_paragraph$Paragraph$lines, wrapParams, str));
			case 'CodeParagraph':
				return str;
			default:
				return str;
		}
	});
var $jxxcarlson$elm_text_editor$Editor$Wrap$paragraphs = F2(
	function (wrapParams, str) {
		return A2(
			$elm$core$String$join,
			'\n\n',
			A2(
				$elm$core$List$map,
				A2(
					$elm$core$Basics$composeR,
					$jxxcarlson$elm_text_editor$Editor$Wrap$wrapParagraph(wrapParams),
					$elm$core$String$trim),
				A2(
					$elm$core$List$filter,
					function (_v0) {
						var t = _v0.a;
						var s = _v0.b;
						return s !== '';
					},
					$jxxcarlson$elm_text_editor$Editor$Wrap$runFSM(str + '\n'))));
	});
var $jxxcarlson$elm_text_editor$Editor$load = F3(
	function (wrapOption, content, editor) {
		var data = editor.a;
		var lineLengths = A2(
			$elm$core$List$map,
			$elm$core$String$length,
			$elm$core$String$lines(content));
		var maxLineLength = A2(
			$elm$core$Maybe$withDefault,
			1000,
			$elm$core$List$maximum(lineLengths));
		var config = data.state.config;
		var buffer = (_Utils_eq(wrapOption, $jxxcarlson$elm_text_editor$Editor$Config$DoWrap) && (_Utils_cmp(maxLineLength, config.wrapParams.maximumWidth) > 0)) ? $jxxcarlson$elm_text_editor$Buffer$fromString(
			A2($jxxcarlson$elm_text_editor$Editor$Wrap$paragraphs, config.wrapParams, content)) : $jxxcarlson$elm_text_editor$Buffer$fromString(content);
		var _v0 = $jxxcarlson$elm_text_editor$Editor$clearState(editor);
		var newData = _v0.a;
		return $jxxcarlson$elm_text_editor$Editor$Editor(
			_Utils_update(
				newData,
				{buffer: buffer}));
	});
var $elm$core$Platform$Cmd$map = _Platform_map;
var $elm$parser$Parser$deadEndsToString = function (deadEnds) {
	return 'TODO deadEndsToString';
};
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $author$project$SequenceDiagram$Model$Sequence = F2(
	function (a, b) {
		return {$: 'Sequence', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$Advanced$chompUntilEndOr = function (str) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v0 = A5(_Parser_findSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v0.a;
			var newRow = _v0.b;
			var newCol = _v0.c;
			var adjustedOffset = (newOffset < 0) ? $elm$core$String$length(s.src) : newOffset;
			return A3(
				$elm$parser$Parser$Advanced$Good,
				_Utils_cmp(s.offset, adjustedOffset) < 0,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: adjustedOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$chompUntilEndOr = $elm$parser$Parser$Advanced$chompUntilEndOr;
var $author$project$SequenceDiagram$Parser$Utils$eol = $elm$parser$Parser$chompUntilEndOr('\n');
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 'ExpectingKeyword', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$keyword = function (_v0) {
	var kwd = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(kwd);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, kwd, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return (_Utils_eq(newOffset, -1) || (0 <= A3(
				$elm$parser$Parser$Advanced$isSubChar,
				function (c) {
					return $elm$core$Char$isAlphaNum(c) || _Utils_eq(
						c,
						_Utils_chr('_'));
				},
				newOffset,
				s.src))) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$keyword = function (kwd) {
	return $elm$parser$Parser$Advanced$keyword(
		A2(
			$elm$parser$Parser$Advanced$Token,
			kwd,
			$elm$parser$Parser$ExpectingKeyword(kwd)));
};
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var $elm$parser$Parser$Advanced$end = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				$elm$core$String$length(s.src),
				s.offset) ? A3($elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$parser$Parser$Advanced$getCol = $elm$parser$Parser$Advanced$Parser(
	function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, s.col, s);
	});
var $elm$parser$Parser$getCol = $elm$parser$Parser$Advanced$getCol;
var $elm$parser$Parser$Advanced$getIndent = $elm$parser$Parser$Advanced$Parser(
	function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, s.indent, s);
	});
var $elm$parser$Parser$getIndent = $elm$parser$Parser$Advanced$getIndent;
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0.a;
			var _v1 = parse(s0);
			if (_v1.$ === 'Good') {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Advanced$spaces = $elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' ')) || (_Utils_eq(
			c,
			_Utils_chr('\n')) || _Utils_eq(
			c,
			_Utils_chr('\r')));
	});
var $elm$parser$Parser$spaces = $elm$parser$Parser$Advanced$spaces;
var $elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $eelcoh$parser_indent$Parser$Indent$indented = function (next) {
	var proceed = function (_v1) {
		var minimal = _v1.a;
		var actual = _v1.b;
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$andThen,
					function (_v0) {
						return next.ending;
					},
					$elm$parser$Parser$end),
					_Utils_eq(actual, minimal) ? next.exactly : ((_Utils_cmp(actual, minimal) > 0) ? next.larger : next.smaller)
				]));
	};
	return A2(
		$elm$parser$Parser$andThen,
		proceed,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F2(
						function (a, b) {
							return _Utils_Tuple2(a, b);
						})),
				A2($elm$parser$Parser$ignorer, $elm$parser$Parser$getIndent, $elm$parser$Parser$spaces)),
			$elm$parser$Parser$getCol));
};
var $elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $eelcoh$parser_indent$Parser$Indent$step = F2(
	function (parser, values) {
		var next = function (value_) {
			return $elm$parser$Parser$Loop(
				A2($elm$core$List$cons, value_, values));
		};
		var finish = $elm$parser$Parser$Done(
			$elm$core$List$reverse(values));
		return $eelcoh$parser_indent$Parser$Indent$indented(
			{
				ending: $elm$parser$Parser$succeed(finish),
				exactly: $elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							A2(
							$elm$parser$Parser$keeper,
							$elm$parser$Parser$succeed(next),
							parser),
							$elm$parser$Parser$succeed(finish)
						])),
				larger: $elm$parser$Parser$problem('I was looking for the next element but didn\'t find one.'),
				smaller: $elm$parser$Parser$succeed(finish)
			});
	});
var $elm$parser$Parser$Advanced$changeIndent = F2(
	function (newIndent, s) {
		return {col: s.col, context: s.context, indent: newIndent, offset: s.offset, row: s.row, src: s.src};
	});
var $elm$parser$Parser$Advanced$withIndent = F2(
	function (newIndent, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(
					A2($elm$parser$Parser$Advanced$changeIndent, newIndent, s0));
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						a,
						A2($elm$parser$Parser$Advanced$changeIndent, s0.indent, s1));
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$withIndent = $elm$parser$Parser$Advanced$withIndent;
var $eelcoh$parser_indent$Parser$Indent$list = function (parser) {
	var parser_ = A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		A2(
			$elm$parser$Parser$loop,
			_List_Nil,
			$eelcoh$parser_indent$Parser$Indent$step(parser)));
	var list_ = function (_v0) {
		var minimalIndent = _v0.a;
		var actualIndent = _v0.b;
		return (_Utils_cmp(actualIndent, minimalIndent) > 0) ? A2($elm$parser$Parser$withIndent, actualIndent, parser_) : $elm$parser$Parser$succeed(_List_Nil);
	};
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$andThen,
				list_,
				A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed(
								F2(
									function (a, b) {
										return _Utils_Tuple2(a, b);
									})),
							$elm$parser$Parser$spaces),
						$elm$parser$Parser$getIndent),
					$elm$parser$Parser$getCol)),
				A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(_List_Nil),
					$elm$parser$Parser$chompWhile(
						function (c) {
							return _Utils_eq(
								c,
								_Utils_chr(' '));
						})),
				$elm$parser$Parser$end)
			]));
};
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $author$project$SequenceDiagram$Parser$Utils$isStringLiteral = function (c) {
	return $elm$core$Char$isDigit(c) || ($elm$core$Char$isUpper(c) || $elm$core$Char$isLower(c));
};
var $author$project$SequenceDiagram$Parser$Utils$word = $elm$parser$Parser$getChompedString(
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed(_Utils_Tuple0),
		$elm$parser$Parser$chompWhile($author$project$SequenceDiagram$Parser$Utils$isStringLiteral)));
var $author$project$SequenceDiagram$Parser$participant = $author$project$SequenceDiagram$Parser$Utils$word;
var $author$project$SequenceDiagram$Parser$Utils$spaces = $elm$parser$Parser$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' '));
	});
var $elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $author$project$SequenceDiagram$Parser$Utils$is = F2(
	function (searched, _char) {
		return _Utils_eq(_char, searched);
	});
var $author$project$SequenceDiagram$Parser$Utils$isSpace = $author$project$SequenceDiagram$Parser$Utils$is(
	_Utils_chr(' '));
var $author$project$SequenceDiagram$Parser$Utils$space = $elm$parser$Parser$chompIf($author$project$SequenceDiagram$Parser$Utils$isSpace);
var $author$project$SequenceDiagram$Parser$Utils$spaces1 = A2(
	$elm$parser$Parser$ignorer,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed(_Utils_Tuple0),
		$author$project$SequenceDiagram$Parser$Utils$space),
	$author$project$SequenceDiagram$Parser$Utils$spaces);
var $author$project$SequenceDiagram$Model$Step = F4(
	function (a, b, c, d) {
		return {$: 'Step', a: a, b: b, c: c, d: d};
	});
var $author$project$SequenceDiagram$Parser$Utils$isColon = $author$project$SequenceDiagram$Parser$Utils$is(
	_Utils_chr(':'));
var $author$project$SequenceDiagram$Parser$Utils$colon = $elm$parser$Parser$chompIf($author$project$SequenceDiagram$Parser$Utils$isColon);
var $author$project$SequenceDiagram$Parser$Utils$isSentenceLiteral = function (c) {
	return $author$project$SequenceDiagram$Parser$Utils$isSpace(c) || ($elm$core$Char$isDigit(c) || ($elm$core$Char$isUpper(c) || $elm$core$Char$isLower(c)));
};
var $author$project$SequenceDiagram$Parser$Utils$sentence = $elm$parser$Parser$getChompedString(
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed(_Utils_Tuple0),
		$elm$parser$Parser$chompWhile($author$project$SequenceDiagram$Parser$Utils$isSentenceLiteral)));
var $author$project$SequenceDiagram$Parser$caption = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$author$project$SequenceDiagram$Parser$Utils$colon),
		$author$project$SequenceDiagram$Parser$Utils$spaces),
	$author$project$SequenceDiagram$Parser$Utils$sentence);
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v0 = thunk(_Utils_Tuple0);
			var parse = _v0.a;
			return parse(s);
		});
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $elm$core$Debug$log = _Debug_log;
var $elm$parser$Parser$Forbidden = {$: 'Forbidden'};
var $author$project$SequenceDiagram$Model$Async = {$: 'Async'};
var $author$project$SequenceDiagram$Parser$async = A2(
	$elm$parser$Parser$ignorer,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($author$project$SequenceDiagram$Model$Async),
		$author$project$SequenceDiagram$Parser$Utils$spaces),
	$elm$parser$Parser$keyword('async'));
var $author$project$SequenceDiagram$Parser$option = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[$author$project$SequenceDiagram$Parser$async]));
var $elm$parser$Parser$Advanced$revAlways = F2(
	function (_v0, b) {
		return b;
	});
var $elm$parser$Parser$Advanced$skip = F2(
	function (iParser, kParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$parser$Parser$Advanced$revAlways, iParser, kParser);
	});
var $elm$parser$Parser$Advanced$sequenceEndForbidden = F5(
	function (ender, ws, parseItem, sep, revItems) {
		var chompRest = function (item) {
			return A5(
				$elm$parser$Parser$Advanced$sequenceEndForbidden,
				ender,
				ws,
				parseItem,
				sep,
				A2($elm$core$List$cons, item, revItems));
		};
		return A2(
			$elm$parser$Parser$Advanced$skip,
			ws,
			$elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$Advanced$skip,
						sep,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							A2(
								$elm$parser$Parser$Advanced$map,
								function (item) {
									return $elm$parser$Parser$Advanced$Loop(
										A2($elm$core$List$cons, item, revItems));
								},
								parseItem))),
						A2(
						$elm$parser$Parser$Advanced$map,
						function (_v0) {
							return $elm$parser$Parser$Advanced$Done(
								$elm$core$List$reverse(revItems));
						},
						ender)
					])));
	});
var $elm$parser$Parser$Advanced$sequenceEndMandatory = F4(
	function (ws, parseItem, sep, revItems) {
		return $elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$Advanced$map,
					function (item) {
						return $elm$parser$Parser$Advanced$Loop(
							A2($elm$core$List$cons, item, revItems));
					},
					A2(
						$elm$parser$Parser$Advanced$ignorer,
						parseItem,
						A2(
							$elm$parser$Parser$Advanced$ignorer,
							ws,
							A2($elm$parser$Parser$Advanced$ignorer, sep, ws)))),
					A2(
					$elm$parser$Parser$Advanced$map,
					function (_v0) {
						return $elm$parser$Parser$Advanced$Done(
							$elm$core$List$reverse(revItems));
					},
					$elm$parser$Parser$Advanced$succeed(_Utils_Tuple0))
				]));
	});
var $elm$parser$Parser$Advanced$sequenceEndOptional = F5(
	function (ender, ws, parseItem, sep, revItems) {
		var parseEnd = A2(
			$elm$parser$Parser$Advanced$map,
			function (_v0) {
				return $elm$parser$Parser$Advanced$Done(
					$elm$core$List$reverse(revItems));
			},
			ender);
		return A2(
			$elm$parser$Parser$Advanced$skip,
			ws,
			$elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$Advanced$skip,
						sep,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							$elm$parser$Parser$Advanced$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$Advanced$map,
										function (item) {
											return $elm$parser$Parser$Advanced$Loop(
												A2($elm$core$List$cons, item, revItems));
										},
										parseItem),
										parseEnd
									])))),
						parseEnd
					])));
	});
var $elm$parser$Parser$Advanced$sequenceEnd = F5(
	function (ender, ws, parseItem, sep, trailing) {
		var chompRest = function (item) {
			switch (trailing.$) {
				case 'Forbidden':
					return A2(
						$elm$parser$Parser$Advanced$loop,
						_List_fromArray(
							[item]),
						A4($elm$parser$Parser$Advanced$sequenceEndForbidden, ender, ws, parseItem, sep));
				case 'Optional':
					return A2(
						$elm$parser$Parser$Advanced$loop,
						_List_fromArray(
							[item]),
						A4($elm$parser$Parser$Advanced$sequenceEndOptional, ender, ws, parseItem, sep));
				default:
					return A2(
						$elm$parser$Parser$Advanced$ignorer,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							A2(
								$elm$parser$Parser$Advanced$skip,
								sep,
								A2(
									$elm$parser$Parser$Advanced$skip,
									ws,
									A2(
										$elm$parser$Parser$Advanced$loop,
										_List_fromArray(
											[item]),
										A3($elm$parser$Parser$Advanced$sequenceEndMandatory, ws, parseItem, sep))))),
						ender);
			}
		};
		return $elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2($elm$parser$Parser$Advanced$andThen, chompRest, parseItem),
					A2(
					$elm$parser$Parser$Advanced$map,
					function (_v0) {
						return _List_Nil;
					},
					ender)
				]));
	});
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Advanced$sequence = function (i) {
	return A2(
		$elm$parser$Parser$Advanced$skip,
		$elm$parser$Parser$Advanced$token(i.start),
		A2(
			$elm$parser$Parser$Advanced$skip,
			i.spaces,
			A5(
				$elm$parser$Parser$Advanced$sequenceEnd,
				$elm$parser$Parser$Advanced$token(i.end),
				i.spaces,
				i.item,
				$elm$parser$Parser$Advanced$token(i.separator),
				i.trailing)));
};
var $elm$parser$Parser$Advanced$Forbidden = {$: 'Forbidden'};
var $elm$parser$Parser$Advanced$Mandatory = {$: 'Mandatory'};
var $elm$parser$Parser$Advanced$Optional = {$: 'Optional'};
var $elm$parser$Parser$toAdvancedTrailing = function (trailing) {
	switch (trailing.$) {
		case 'Forbidden':
			return $elm$parser$Parser$Advanced$Forbidden;
		case 'Optional':
			return $elm$parser$Parser$Advanced$Optional;
		default:
			return $elm$parser$Parser$Advanced$Mandatory;
	}
};
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 'Expecting', a: a};
};
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$sequence = function (i) {
	return $elm$parser$Parser$Advanced$sequence(
		{
			end: $elm$parser$Parser$toToken(i.end),
			item: i.item,
			separator: $elm$parser$Parser$toToken(i.separator),
			spaces: i.spaces,
			start: $elm$parser$Parser$toToken(i.start),
			trailing: $elm$parser$Parser$toAdvancedTrailing(i.trailing)
		});
};
var $author$project$SequenceDiagram$Parser$options = $elm$parser$Parser$sequence(
	{end: ']', item: $author$project$SequenceDiagram$Parser$option, separator: ',', spaces: $author$project$SequenceDiagram$Parser$Utils$spaces, start: '[', trailing: $elm$parser$Parser$Forbidden});
function $author$project$SequenceDiagram$Parser$cyclic$step() {
	var step_ = F2(
		function (participant_, _v2) {
			var options_ = _v2.a;
			var caption_ = _v2.b;
			var steps_ = _v2.c;
			return A4($author$project$SequenceDiagram$Model$Step, participant_, options_, caption_, steps_);
		});
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed(step_),
			$author$project$SequenceDiagram$Parser$participant),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($elm$core$Basics$identity),
						$author$project$SequenceDiagram$Parser$Utils$spaces1),
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$keeper,
								$elm$parser$Parser$succeed($elm$core$Basics$identity),
								$elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											$elm$parser$Parser$keeper,
											A2(
												$elm$parser$Parser$keeper,
												$elm$parser$Parser$succeed(
													F2(
														function (c, s) {
															return _Utils_Tuple3(
																_List_Nil,
																$elm$core$Maybe$Just(c),
																s);
														})),
												A2($elm$parser$Parser$ignorer, $author$project$SequenceDiagram$Parser$caption, $author$project$SequenceDiagram$Parser$Utils$spaces)),
											$author$project$SequenceDiagram$Parser$cyclic$stepEnd()),
											A2(
											$elm$parser$Parser$keeper,
											A2(
												$elm$parser$Parser$keeper,
												$elm$parser$Parser$succeed(
													F2(
														function (o, _v1) {
															var mC = _v1.a;
															var s = _v1.b;
															return _Utils_Tuple3(
																A2($elm$core$Debug$log, 'options', o),
																mC,
																s);
														})),
												A2($elm$parser$Parser$ignorer, $author$project$SequenceDiagram$Parser$options, $author$project$SequenceDiagram$Parser$Utils$spaces)),
											$elm$parser$Parser$oneOf(
												_List_fromArray(
													[
														A2(
														$elm$parser$Parser$keeper,
														$elm$parser$Parser$succeed($elm$core$Basics$identity),
														$elm$parser$Parser$oneOf(
															_List_fromArray(
																[
																	A2(
																	$elm$parser$Parser$keeper,
																	A2(
																		$elm$parser$Parser$keeper,
																		$elm$parser$Parser$succeed(
																			F2(
																				function (c, s) {
																					return _Utils_Tuple2(
																						$elm$core$Maybe$Just(c),
																						s);
																				})),
																		$author$project$SequenceDiagram$Parser$caption),
																	$author$project$SequenceDiagram$Parser$cyclic$stepEnd()),
																	A2(
																	$elm$parser$Parser$keeper,
																	$elm$parser$Parser$succeed(
																		function (s) {
																			return _Utils_Tuple2($elm$core$Maybe$Nothing, s);
																		}),
																	$author$project$SequenceDiagram$Parser$cyclic$stepEnd())
																])))
													])))
										]))),
								A2(
								$elm$parser$Parser$keeper,
								$elm$parser$Parser$succeed(
									function (s) {
										return _Utils_Tuple3(_List_Nil, $elm$core$Maybe$Nothing, s);
									}),
								$author$project$SequenceDiagram$Parser$cyclic$stepEnd())
							]))),
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						$elm$parser$Parser$succeed(
							F2(
								function (c, s) {
									return _Utils_Tuple3(
										_List_Nil,
										$elm$core$Maybe$Just(c),
										s);
								})),
						$author$project$SequenceDiagram$Parser$caption),
					$author$project$SequenceDiagram$Parser$cyclic$stepEnd()),
					A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed(
						function (s) {
							return _Utils_Tuple3(_List_Nil, $elm$core$Maybe$Nothing, s);
						}),
					$author$project$SequenceDiagram$Parser$cyclic$stepEnd())
				])));
}
function $author$project$SequenceDiagram$Parser$cyclic$stepEnd() {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$author$project$SequenceDiagram$Parser$Utils$eol),
				$eelcoh$parser_indent$Parser$Indent$list(
					$elm$parser$Parser$lazy(
						function (_v0) {
							return $author$project$SequenceDiagram$Parser$cyclic$step();
						}))),
				A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(_List_Nil),
				$elm$parser$Parser$end)
			]));
}
try {
	var $author$project$SequenceDiagram$Parser$step = $author$project$SequenceDiagram$Parser$cyclic$step();
	$author$project$SequenceDiagram$Parser$cyclic$step = function () {
		return $author$project$SequenceDiagram$Parser$step;
	};
	var $author$project$SequenceDiagram$Parser$stepEnd = $author$project$SequenceDiagram$Parser$cyclic$stepEnd();
	$author$project$SequenceDiagram$Parser$cyclic$stepEnd = function () {
		return $author$project$SequenceDiagram$Parser$stepEnd;
	};
} catch ($) {
	throw 'Some top-level definitions from `SequenceDiagram.Parser` are causing infinite recursion:\n\n  ┌─────┐\n  │    step\n  │     ↓\n  │    stepEnd\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $author$project$SequenceDiagram$Parser$sequence = function () {
	var proceed = function (participant_) {
		return A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed(
				$author$project$SequenceDiagram$Model$Sequence(participant_)),
			$eelcoh$parser_indent$Parser$Indent$list($author$project$SequenceDiagram$Parser$step));
	};
	return A2(
		$elm$parser$Parser$andThen,
		proceed,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($elm$core$Basics$identity),
						$elm$parser$Parser$spaces),
					$elm$parser$Parser$keyword('sequence')),
				$author$project$SequenceDiagram$Parser$Utils$spaces1),
			A2(
				$elm$parser$Parser$ignorer,
				A2($elm$parser$Parser$ignorer, $author$project$SequenceDiagram$Parser$participant, $author$project$SequenceDiagram$Parser$Utils$spaces),
				$author$project$SequenceDiagram$Parser$Utils$eol)));
}();
var $author$project$SequenceDiagram$Parser$parse = function (input) {
	var _v0 = A2($elm$parser$Parser$run, $author$project$SequenceDiagram$Parser$sequence, input);
	if (_v0.$ === 'Ok') {
		var s = _v0.a;
		return $elm$core$Result$Ok(s);
	} else {
		var d = _v0.a;
		return $elm$core$Result$Err(
			'Oops: ' + $elm$parser$Parser$deadEndsToString(d));
	}
};
var $author$project$Main$syncWithEditor = F3(
	function (model, editor_, cmd_) {
		var text = $jxxcarlson$elm_text_editor$Editor$getSource(editor_);
		var newSequence = $author$project$SequenceDiagram$Parser$parse(text);
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					currentString: $elm$core$Maybe$Just(text),
					editor: editor_,
					sequence: newSequence
				}),
			A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorMsg, cmd_));
	});
var $jxxcarlson$elm_text_editor$Buffer$Backward = {$: 'Backward'};
var $jxxcarlson$elm_text_editor$Buffer$Forward = {$: 'Forward'};
var $jxxcarlson$elm_text_editor$Position$addColumn = F2(
	function (amount, position) {
		return _Utils_update(
			position,
			{column: position.column + amount});
	});
var $jxxcarlson$elm_text_editor$Editor$Update$autoclose = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('[', ']'),
			_Utils_Tuple2('{', '}'),
			_Utils_Tuple2('(', ')'),
			_Utils_Tuple2('\"', '\"'),
			_Utils_Tuple2('\'', '\''),
			_Utils_Tuple2('`', '`')
		]));
var $jxxcarlson$elm_text_editor$Buffer$indexFromPosition = F2(
	function (buffer, position) {
		return (!position.line) ? $elm$core$Maybe$Just(position.column) : A2(
			$elm$core$Maybe$map,
			function (line) {
				return (line + position.column) + 1;
			},
			A2(
				$elm_community$list_extra$List$Extra$getAt,
				position.line - 1,
				A2($elm$core$String$indexes, '\n', buffer)));
	});
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $jxxcarlson$elm_text_editor$Buffer$between = F3(
	function (pos1, pos2, _v0) {
		var buffer = _v0.a;
		var _v1 = A2($jxxcarlson$elm_text_editor$Position$order, pos1, pos2);
		var start = _v1.a;
		var end = _v1.b;
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			A3(
				$elm$core$Maybe$map2,
				F2(
					function (startIndex, endIndex) {
						return A3($elm$core$String$slice, startIndex, endIndex, buffer);
					}),
				A2($jxxcarlson$elm_text_editor$Buffer$indexFromPosition, buffer, start),
				A2($jxxcarlson$elm_text_editor$Buffer$indexFromPosition, buffer, end)));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Err),
					A2(
						$elm$core$Task$andThen,
						A2(
							$elm$core$Basics$composeL,
							A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
							$elm$core$Result$Ok),
						task))));
	});
var $elm$browser$Browser$Dom$blur = _Browser_call('blur');
var $jxxcarlson$elm_text_editor$Editor$Update$blur = function (id) {
	return A2(
		$elm$core$Task$attempt,
		function (_v0) {
			return $jxxcarlson$elm_text_editor$Editor$Update$NoOp;
		},
		$elm$browser$Browser$Dom$blur(id));
};
var $jxxcarlson$elm_text_editor$Editor$Update$bottomLine = function (state) {
	return $elm$core$Basics$round(state.topLine + (state.config.height / state.config.lineHeight));
};
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.tail)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.tail, tail);
		return (notAppended < 0) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: $elm$core$Elm$JsArray$empty
		} : {nodeList: builder.nodeList, nodeListSize: builder.nodeListSize, tail: appended});
	});
var $elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					len - from,
					$elm$core$Array$shiftStep,
					$elm$core$Elm$JsArray$empty,
					A3(
						$elm$core$Elm$JsArray$slice,
						from - $elm$core$Array$tailIndex(len),
						$elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (node.$ === 'SubTree') {
							var subTree = node.a;
							return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2($elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					$elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2($elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return $elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
					var initialBuilder = {
						nodeList: _List_Nil,
						nodeListSize: 0,
						tail: A3(
							$elm$core$Elm$JsArray$slice,
							firstSlice,
							$elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						$elm$core$Array$builderToArray,
						true,
						A3($elm$core$List$foldl, $elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var $elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var sub = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _v0.a;
				return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
			}
		}
	});
var $elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (_v0.$ === 'SubTree') {
					var sub = _v0.a;
					var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (_v0.$ === 'SubTree') {
			var sub = _v0.a;
			var newSub = A3($elm$core$Array$sliceTree, shift - $elm$core$Array$shiftStep, endIdx, sub);
			return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				$elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				$elm$core$Array$SubTree(newSub),
				A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var $elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = $elm$core$Array$tailIndex(end);
				var depth = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$logBase,
						$elm$core$Array$branchFactor,
						A2($elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep);
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						$elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3($elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4($elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var $elm$core$Array$translateIndex = F2(
	function (index, _v0) {
		var len = _v0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var $elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2($elm$core$Array$translateIndex, to, array);
		var correctFrom = A2($elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : A2(
			$elm$core$Array$sliceLeft,
			correctFrom,
			A2($elm$core$Array$sliceRight, correctTo, array));
	});
var $jxxcarlson$elm_text_editor$Util$Array$last = function (array) {
	var length = $elm$core$Array$length(array);
	return A2(
		$elm$core$Maybe$map,
		function (a) {
			return _Utils_Tuple2(a, length - 1);
		},
		A2(
			$elm$core$Array$get,
			0,
			A3($elm$core$Array$slice, -1, length, array)));
};
var $jxxcarlson$elm_text_editor$Buffer$clampPosition = F3(
	function (direction, buffer, position) {
		var lines_ = $elm$core$Array$fromList(
			$jxxcarlson$elm_text_editor$Buffer$lines(buffer));
		if (position.line < 0) {
			return A2($jxxcarlson$elm_text_editor$Position$Position, 0, 0);
		} else {
			var _v0 = A2($elm$core$Array$get, position.line, lines_);
			if (_v0.$ === 'Just') {
				var line = _v0.a;
				if (_Utils_cmp(
					position.column,
					$elm$core$String$length(line)) > 0) {
					if (direction.$ === 'Forward') {
						return (_Utils_cmp(
							position.line,
							$elm$core$Array$length(lines_) - 1) < 0) ? A2($jxxcarlson$elm_text_editor$Position$Position, position.line + 1, 0) : position;
					} else {
						return A2(
							$jxxcarlson$elm_text_editor$Position$Position,
							position.line,
							$elm$core$String$length(line));
					}
				} else {
					if (position.column < 0) {
						return A2(
							$elm$core$Maybe$withDefault,
							A2($jxxcarlson$elm_text_editor$Position$Position, 0, 0),
							A2(
								$elm$core$Maybe$map,
								A2(
									$elm$core$Basics$composeR,
									$elm$core$String$length,
									$jxxcarlson$elm_text_editor$Position$Position(position.line - 1)),
								A2($elm$core$Array$get, position.line - 1, lines_)));
					} else {
						return position;
					}
				}
			} else {
				var _v2 = $jxxcarlson$elm_text_editor$Util$Array$last(lines_);
				if (_v2.$ === 'Just') {
					var _v3 = _v2.a;
					var line = _v3.a;
					var number = _v3.b;
					return A2(
						$jxxcarlson$elm_text_editor$Position$Position,
						number,
						$elm$core$String$length(line));
				} else {
					return A2($jxxcarlson$elm_text_editor$Position$Position, 0, 0);
				}
			}
		}
	});
var $jxxcarlson$elm_text_editor$Editor$Update$DebounceMsg = function (a) {
	return {$: 'DebounceMsg', a: a};
};
var $jinjor$elm_debounce$Debounce$Later = function (a) {
	return {$: 'Later', a: a};
};
var $jinjor$elm_debounce$Debounce$later = $jinjor$elm_debounce$Debounce$Later;
var $jxxcarlson$elm_text_editor$Editor$Update$debounceConfig = {
	strategy: $jinjor$elm_debounce$Debounce$later(300),
	transform: $jxxcarlson$elm_text_editor$Editor$Update$DebounceMsg
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$String$foldl = _String_foldl;
var $jxxcarlson$elm_text_editor$Buffer$indentSize = 2;
var $jxxcarlson$elm_text_editor$Buffer$deindentFrom = F2(
	function (_v0, _v1) {
		var line = _v0.line;
		var column = _v0.column;
		var buffer = _v1.a;
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(
				$jxxcarlson$elm_text_editor$Buffer$Buffer(buffer),
				column),
			A2(
				$elm$core$Maybe$map,
				function (lineStart) {
					var startChars = A3($elm$core$String$slice, lineStart, lineStart + $jxxcarlson$elm_text_editor$Buffer$indentSize, buffer);
					var startIndentChars = A3(
						$elm$core$String$foldl,
						F2(
							function (_char, count) {
								return _Utils_eq(
									_char,
									_Utils_chr(' ')) ? (count + 1) : count;
							}),
						0,
						startChars);
					return _Utils_Tuple2(
						$jxxcarlson$elm_text_editor$Buffer$Buffer(
							_Utils_ap(
								A3($elm$core$String$slice, 0, lineStart, buffer),
								A2($elm$core$String$dropLeft, lineStart + startIndentChars, buffer))),
						column - startIndentChars);
				},
				A2(
					$jxxcarlson$elm_text_editor$Buffer$indexFromPosition,
					buffer,
					A2($jxxcarlson$elm_text_editor$Position$Position, line, 0))));
	});
var $jxxcarlson$elm_text_editor$Buffer$deindentBetween = F3(
	function (pos1, pos2, buffer) {
		var _v0 = A2($jxxcarlson$elm_text_editor$Buffer$deindentFrom, pos1, buffer);
		var pos1Buffer = _v0.a;
		var pos1Column = _v0.b;
		var _v1 = A2($jxxcarlson$elm_text_editor$Buffer$deindentFrom, pos2, pos1Buffer);
		var pos2Buffer = _v1.a;
		var pos2Column = _v1.b;
		if ($elm$core$Basics$abs(pos1.line - pos2.line) > 1) {
			var _v2 = A2($jxxcarlson$elm_text_editor$Position$order, pos1, pos2);
			var start = _v2.a;
			var end = _v2.b;
			return _Utils_Tuple3(
				A3(
					$elm$core$List$foldl,
					function (line) {
						return A2(
							$elm$core$Basics$composeR,
							$jxxcarlson$elm_text_editor$Buffer$deindentFrom(
								{column: 0, line: line}),
							$elm$core$Tuple$first);
					},
					pos2Buffer,
					A2($elm$core$List$range, start.line + 1, end.line - 1)),
				pos1Column,
				pos2Column);
		} else {
			return _Utils_Tuple3(pos2Buffer, pos1Column, pos2Column);
		}
	});
var $elm$browser$Browser$Dom$focus = _Browser_call('focus');
var $jxxcarlson$elm_text_editor$Editor$Update$focus = function (id) {
	return A2(
		$elm$core$Task$attempt,
		function (_v0) {
			return $jxxcarlson$elm_text_editor$Editor$Update$NoOp;
		},
		$elm$browser$Browser$Dom$focus(id));
};
var $jxxcarlson$elm_text_editor$Buffer$None = {$: 'None'};
var $jxxcarlson$elm_text_editor$Buffer$NonWord = {$: 'NonWord'};
var $jxxcarlson$elm_text_editor$Buffer$Word = {$: 'Word'};
var $jxxcarlson$elm_text_editor$Buffer$isNonWordChar = A2(
	$elm$core$Basics$composeR,
	$elm$core$String$fromChar,
	function (a) {
		return A2($elm$core$String$contains, a, '/\\()\"\':,.;<>~!@#$%^&*|+=[]{}`?-…');
	});
var $jxxcarlson$elm_text_editor$Buffer$isWhitespace = A2(
	$elm$core$Basics$composeR,
	$elm$core$String$fromChar,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$String$trim,
		$elm$core$Basics$eq('')));
var $jxxcarlson$elm_text_editor$Buffer$isWordChar = function (_char) {
	return (!$jxxcarlson$elm_text_editor$Buffer$isNonWordChar(_char)) && (!$jxxcarlson$elm_text_editor$Buffer$isWhitespace(_char));
};
var $jxxcarlson$elm_text_editor$Position$nextColumn = $jxxcarlson$elm_text_editor$Position$addColumn(1);
var $jxxcarlson$elm_text_editor$Position$previousColumn = $jxxcarlson$elm_text_editor$Position$addColumn(-1);
var $elm$core$String$reverse = _String_reverse;
var $elm_community$string_extra$String$Extra$rightOfBack = F2(
	function (pattern, string) {
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Basics$add(
						$elm$core$String$length(pattern)),
					function (a) {
						return A2($elm$core$String$dropLeft, a, string);
					}),
				$elm$core$List$head(
					$elm$core$List$reverse(
						A2($elm$core$String$indexes, pattern, string)))));
	});
var $jxxcarlson$elm_text_editor$Buffer$groupHelp = F5(
	function (direction, consumedNewline, str, position, group) {
		var parts = function () {
			if (direction.$ === 'Forward') {
				return $elm$core$String$uncons(str);
			} else {
				return A2(
					$elm$core$Maybe$map,
					$elm$core$Tuple$mapSecond($elm$core$String$reverse),
					$elm$core$String$uncons(
						$elm$core$String$reverse(str)));
			}
		}();
		if (parts.$ === 'Just') {
			var _v1 = parts.a;
			var _char = _v1.a;
			var rest = _v1.b;
			var nextPosition = function (changeLine) {
				var _v3 = _Utils_Tuple2(direction, changeLine);
				if (_v3.a.$ === 'Forward') {
					if (_v3.b) {
						var _v4 = _v3.a;
						return A2($jxxcarlson$elm_text_editor$Position$Position, position.line + 1, 0);
					} else {
						var _v5 = _v3.a;
						return $jxxcarlson$elm_text_editor$Position$nextColumn(position);
					}
				} else {
					if (_v3.b) {
						var _v6 = _v3.a;
						return A2($elm$core$String$contains, '\n', rest) ? A2(
							$jxxcarlson$elm_text_editor$Position$Position,
							position.line - 1,
							$elm$core$String$length(
								A2($elm_community$string_extra$String$Extra$rightOfBack, '\n', rest))) : A2(
							$jxxcarlson$elm_text_editor$Position$Position,
							position.line - 1,
							$elm$core$String$length(rest));
					} else {
						var _v7 = _v3.a;
						return $jxxcarlson$elm_text_editor$Position$previousColumn(position);
					}
				}
			};
			var next = function (nextConsumedNewline) {
				return A4(
					$jxxcarlson$elm_text_editor$Buffer$groupHelp,
					direction,
					nextConsumedNewline,
					rest,
					nextPosition(
						!_Utils_eq(consumedNewline, nextConsumedNewline)));
			};
			switch (group.$) {
				case 'None':
					return _Utils_eq(
						_char,
						_Utils_chr('\n')) ? (consumedNewline ? position : A2(next, true, $jxxcarlson$elm_text_editor$Buffer$None)) : ($jxxcarlson$elm_text_editor$Buffer$isWhitespace(_char) ? A2(next, consumedNewline, $jxxcarlson$elm_text_editor$Buffer$None) : ($jxxcarlson$elm_text_editor$Buffer$isNonWordChar(_char) ? A2(next, consumedNewline, $jxxcarlson$elm_text_editor$Buffer$NonWord) : A2(next, consumedNewline, $jxxcarlson$elm_text_editor$Buffer$Word)));
				case 'Word':
					return (!$jxxcarlson$elm_text_editor$Buffer$isWordChar(_char)) ? position : A2(next, consumedNewline, $jxxcarlson$elm_text_editor$Buffer$Word);
				default:
					return $jxxcarlson$elm_text_editor$Buffer$isNonWordChar(_char) ? A2(next, consumedNewline, $jxxcarlson$elm_text_editor$Buffer$NonWord) : position;
			}
		} else {
			return position;
		}
	});
var $jxxcarlson$elm_text_editor$Buffer$groupEnd = F2(
	function (position, _v0) {
		var buffer = _v0.a;
		return A2(
			$elm$core$Maybe$withDefault,
			position,
			A2(
				$elm$core$Maybe$map,
				function (index) {
					return A5(
						$jxxcarlson$elm_text_editor$Buffer$groupHelp,
						$jxxcarlson$elm_text_editor$Buffer$Forward,
						false,
						A2($elm$core$String$dropLeft, index, buffer),
						position,
						$jxxcarlson$elm_text_editor$Buffer$None);
				},
				A2($jxxcarlson$elm_text_editor$Buffer$indexFromPosition, buffer, position)));
	});
var $jxxcarlson$elm_text_editor$Buffer$stringCharAt = F2(
	function (index, string) {
		return A2(
			$elm$core$Maybe$map,
			$elm$core$Tuple$first,
			$elm$core$String$uncons(
				A3($elm$core$String$slice, index, index + 1, string)));
	});
var $jxxcarlson$elm_text_editor$Buffer$charsAround = F2(
	function (index, string) {
		return _Utils_Tuple3(
			A2($jxxcarlson$elm_text_editor$Buffer$stringCharAt, index - 1, string),
			A2($jxxcarlson$elm_text_editor$Buffer$stringCharAt, index, string),
			A2($jxxcarlson$elm_text_editor$Buffer$stringCharAt, index + 1, string));
	});
var $jxxcarlson$elm_text_editor$Buffer$groupStart = F2(
	function (position, _v0) {
		var buffer = _v0.a;
		return A2(
			$elm$core$Maybe$withDefault,
			position,
			A2(
				$elm$core$Maybe$map,
				function (index) {
					return A5(
						$jxxcarlson$elm_text_editor$Buffer$groupHelp,
						$jxxcarlson$elm_text_editor$Buffer$Backward,
						false,
						A3($elm$core$String$slice, 0, index, buffer),
						position,
						$jxxcarlson$elm_text_editor$Buffer$None);
				},
				A2($jxxcarlson$elm_text_editor$Buffer$indexFromPosition, buffer, position)));
	});
var $elm_community$maybe_extra$Maybe$Extra$orElseLazy = F2(
	function (fma, mb) {
		if (mb.$ === 'Nothing') {
			return fma(_Utils_Tuple0);
		} else {
			return mb;
		}
	});
var $jxxcarlson$elm_text_editor$Buffer$tuple3MapAll = F2(
	function (fn, _v0) {
		var a1 = _v0.a;
		var a2 = _v0.b;
		var a3 = _v0.c;
		return _Utils_Tuple3(
			fn(a1),
			fn(a2),
			fn(a3));
	});
var $jxxcarlson$elm_text_editor$Buffer$tuple3CharsPred = function (pred) {
	return $jxxcarlson$elm_text_editor$Buffer$tuple3MapAll(
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Maybe$map(pred),
			$elm$core$Maybe$withDefault(false)));
};
var $jxxcarlson$elm_text_editor$Buffer$groupRange = F2(
	function (position, _v0) {
		var buffer = _v0.a;
		return A2(
			$elm$core$Maybe$andThen,
			function (index) {
				var chars = A2($jxxcarlson$elm_text_editor$Buffer$charsAround, index, buffer);
				var range = function (pred) {
					var _v2 = A2($jxxcarlson$elm_text_editor$Buffer$tuple3CharsPred, pred, chars);
					if (_v2.a) {
						if (_v2.b) {
							if (_v2.c) {
								return $elm$core$Maybe$Just(
									_Utils_Tuple2(
										A2(
											$jxxcarlson$elm_text_editor$Buffer$groupStart,
											position,
											$jxxcarlson$elm_text_editor$Buffer$Buffer(buffer)),
										A2(
											$jxxcarlson$elm_text_editor$Buffer$groupEnd,
											position,
											$jxxcarlson$elm_text_editor$Buffer$Buffer(buffer))));
							} else {
								return $elm$core$Maybe$Just(
									_Utils_Tuple2(
										A2(
											$jxxcarlson$elm_text_editor$Buffer$groupStart,
											position,
											$jxxcarlson$elm_text_editor$Buffer$Buffer(buffer)),
										$jxxcarlson$elm_text_editor$Position$nextColumn(position)));
							}
						} else {
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(
									A2(
										$jxxcarlson$elm_text_editor$Buffer$groupStart,
										position,
										$jxxcarlson$elm_text_editor$Buffer$Buffer(buffer)),
									position));
						}
					} else {
						if (_v2.b) {
							if (_v2.c) {
								return $elm$core$Maybe$Just(
									_Utils_Tuple2(
										position,
										A2(
											$jxxcarlson$elm_text_editor$Buffer$groupEnd,
											position,
											$jxxcarlson$elm_text_editor$Buffer$Buffer(buffer))));
							} else {
								return $elm$core$Maybe$Just(
									_Utils_Tuple2(
										position,
										$jxxcarlson$elm_text_editor$Position$nextColumn(position)));
							}
						} else {
							return $elm$core$Maybe$Nothing;
						}
					}
				};
				return A2(
					$elm_community$maybe_extra$Maybe$Extra$orElseLazy,
					function (_v1) {
						return range($jxxcarlson$elm_text_editor$Buffer$isNonWordChar);
					},
					range($jxxcarlson$elm_text_editor$Buffer$isWordChar));
			},
			A2($jxxcarlson$elm_text_editor$Buffer$indexFromPosition, buffer, position));
	});
var $jxxcarlson$elm_text_editor$Editor$Strings$help = '\n------------------------------------------\n               Key commands\n------------------------------------------\n\nNEW: ctrl-shift-S to sync with external\nwindow if the hosting app implements it.\nStill flaky.  Aslo: ctrl-shift-C to copy\ntext to the system keyboard, ctrl-shift-V\nto paste text from the system keyboard\nto the editor.  For now, Chrome only.\n\nShow help         ctrl-h         (Toggle)\nShow info panel   ctrl-shift-i   (Toggle)\n\nCursor\n------\n\nForward           right-arrow\nBackwards         left-arrow\nStart of line     option-left-arrow or Home\nEnd of line       option-right-arrow or End\n\nLine Up           up-arrow\nLine Down         down-arrow\n\nUp many lines     option up-arrow\nDown many lines   option down-arrow\n\nFirst line        ctrl-option up-arrow\nLast line         ctrl-option down-arrow\n\nGo to line        ctrl-g         (Toggle)\n\n\nSelection\n---------\nSelect word       Double-click\nSelect line       Triple-click\nSelect group      ctrl-d\nSelect all        ctrl-shift-a\n\nExtend selection  shift-arrow\n(up | down | left | right)\n\nCopy selection    ctrl-c\nCut selection     ctrl-x\nPaste selection   ctrl-v\n\nExternal copy-paste\n-------------------\n\n- ctrl-shift-C copies selected text to the\n  system clipboard.\n\n- ctrl-shift-V copies text from the system\n  clipboard and pastes the content to the\n  editor at current cursor.  The copied\n  text remains in the Editor clipboard.\n\nThe pasted text will be wrapped if the\nthe WrapOption is on.\n\nThis works in Chrome 79 but not Firefox.\nIn Chrome you have to respond to a permission\ndialog each time.  I\'ll see if this can\nbe reduced to once per session.\n\nText\n------------\n\nIndent            Tab\nDe-indent         shift-Tab\n\nWrap selection    ctrl-w\nWrap all          ctrl-shift-w\nToggle wrapping   ctrl-option-w\n\nTyping ctrl-shift-w at the end\nof a paragraph will wrap it.\n\nClear all         ctrl-option c\n\nSearch\n------\n\nSearch panel      ctrl-s (Toggle)\nReplace panel     ctrl-r (Toggle)\nNext search hit   ctrl-. (Think >)\nPrev search hit   ctrl-. (Think <)\n\nUndo/Redo\n----------\n\nUndo              ctrl-z\nRedo              ctrl-y\n\n';
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $jxxcarlson$elm_text_editor$Buffer$indentFrom = F2(
	function (_v0, _v1) {
		var line = _v0.line;
		var column = _v0.column;
		var buffer = _v1.a;
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(
				$jxxcarlson$elm_text_editor$Buffer$Buffer(buffer),
				column),
			A2(
				$elm$core$Maybe$map,
				function (lineStart) {
					var addIndentSize = $jxxcarlson$elm_text_editor$Buffer$indentSize - A2(
						$elm$core$Basics$modBy,
						$jxxcarlson$elm_text_editor$Buffer$indentSize,
						$elm$core$String$length(
							A3($elm$core$String$slice, lineStart, lineStart + column, buffer)));
					return _Utils_Tuple2(
						$jxxcarlson$elm_text_editor$Buffer$Buffer(
							_Utils_ap(
								A3($elm$core$String$slice, 0, lineStart + column, buffer),
								_Utils_ap(
									A2($elm$core$String$repeat, addIndentSize, ' '),
									A2($elm$core$String$dropLeft, lineStart + column, buffer)))),
						column + addIndentSize);
				},
				A2(
					$jxxcarlson$elm_text_editor$Buffer$indexFromPosition,
					buffer,
					A2($jxxcarlson$elm_text_editor$Position$Position, line, 0))));
	});
var $jxxcarlson$elm_text_editor$Buffer$indentBetween = F3(
	function (pos1, pos2, buffer) {
		var _v0 = A2($jxxcarlson$elm_text_editor$Position$order, pos1, pos2);
		var start = _v0.a;
		var end = _v0.b;
		return A3(
			$elm$core$List$foldl,
			function (line) {
				return A2(
					$elm$core$Basics$composeR,
					$jxxcarlson$elm_text_editor$Buffer$indentFrom(
						{column: 0, line: line}),
					$elm$core$Tuple$first);
			},
			buffer,
			A2($elm$core$List$range, start.line, end.line));
	});
var $elm_community$string_extra$String$Extra$replaceSlice = F4(
	function (substitution, start, end, string) {
		return _Utils_ap(
			A3($elm$core$String$slice, 0, start, string),
			_Utils_ap(
				substitution,
				A3(
					$elm$core$String$slice,
					end,
					$elm$core$String$length(string),
					string)));
	});
var $elm_community$string_extra$String$Extra$insertAt = F3(
	function (insert, pos, string) {
		return A4($elm_community$string_extra$String$Extra$replaceSlice, insert, pos, pos, string);
	});
var $jxxcarlson$elm_text_editor$Buffer$insert = F3(
	function (position, str, _v0) {
		var buffer = _v0.a;
		return $jxxcarlson$elm_text_editor$Buffer$Buffer(
			A2(
				$elm$core$Maybe$withDefault,
				buffer,
				A2(
					$elm$core$Maybe$map,
					function (index) {
						return A3($elm_community$string_extra$String$Extra$insertAt, str, index, buffer);
					},
					A2($jxxcarlson$elm_text_editor$Buffer$indexFromPosition, buffer, position))));
	});
var $elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return $elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var $jxxcarlson$elm_text_editor$Buffer$lastPosition = function (buffer) {
	return A2(
		$elm$core$Maybe$withDefault,
		A2($jxxcarlson$elm_text_editor$Position$Position, 0, 0),
		A2(
			$elm$core$Maybe$map,
			function (_v0) {
				var line = _v0.a;
				var index = _v0.b;
				return A2(
					$jxxcarlson$elm_text_editor$Position$Position,
					index,
					$elm$core$String$length(line));
			},
			$jxxcarlson$elm_text_editor$Util$Array$last(
				$elm$core$Array$fromList(
					$jxxcarlson$elm_text_editor$Buffer$lines(buffer)))));
};
var $jxxcarlson$elm_text_editor$Buffer$lineAt = F2(
	function (position, buffer) {
		return A2(
			$elm_community$list_extra$List$Extra$getAt,
			position.line,
			$jxxcarlson$elm_text_editor$Buffer$lines(buffer));
	});
var $jxxcarlson$elm_text_editor$Buffer$lineEnd = function (line) {
	return A2(
		$elm$core$Basics$composeR,
		$jxxcarlson$elm_text_editor$Buffer$lines,
		A2(
			$elm$core$Basics$composeR,
			$elm_community$list_extra$List$Extra$getAt(line),
			$elm$core$Maybe$map($elm$core$String$length)));
};
var $jxxcarlson$elm_text_editor$Editor$Update$load = F3(
	function (wrapOption, content, state) {
		var lineLengths = A2(
			$elm$core$List$map,
			$elm$core$String$length,
			$elm$core$String$lines(content));
		var maxLineLength = A2(
			$elm$core$Maybe$withDefault,
			1000,
			$elm$core$List$maximum(lineLengths));
		var config = state.config;
		var buffer = _Utils_eq(wrapOption, $jxxcarlson$elm_text_editor$Editor$Config$DoWrap) ? $jxxcarlson$elm_text_editor$Buffer$fromString(
			A2($jxxcarlson$elm_text_editor$Editor$Wrap$paragraphs, config.wrapParams, content)) : $jxxcarlson$elm_text_editor$Buffer$fromString(content);
		return _Utils_Tuple2(
			$jxxcarlson$elm_text_editor$Editor$Update$clearState(state),
			buffer);
	});
var $jxxcarlson$elm_text_editor$Buffer$nearWordChar = F2(
	function (position, _v0) {
		var buffer = _v0.a;
		return A2(
			$elm$core$Maybe$withDefault,
			false,
			A2(
				$elm$core$Maybe$andThen,
				function (index) {
					var previousChar = A2($jxxcarlson$elm_text_editor$Buffer$stringCharAt, index - 1, buffer);
					var currentChar = A2($jxxcarlson$elm_text_editor$Buffer$stringCharAt, index, buffer);
					return A2(
						$elm_community$maybe_extra$Maybe$Extra$orElseLazy,
						function (_v1) {
							return A2($elm$core$Maybe$map, $jxxcarlson$elm_text_editor$Buffer$isWordChar, currentChar);
						},
						A2($elm$core$Maybe$map, $jxxcarlson$elm_text_editor$Buffer$isWordChar, previousChar));
				},
				A2($jxxcarlson$elm_text_editor$Buffer$indexFromPosition, buffer, position)));
	});
var $jxxcarlson$elm_text_editor$Position$addLine = F2(
	function (amount, position) {
		return _Utils_update(
			position,
			{line: position.line + amount});
	});
var $jxxcarlson$elm_text_editor$Position$nextLine = $jxxcarlson$elm_text_editor$Position$addLine(1);
var $jxxcarlson$elm_text_editor$Position$previousLine = $jxxcarlson$elm_text_editor$Position$addLine(-1);
var $jinjor$elm_debounce$Debounce$Flush = function (a) {
	return {$: 'Flush', a: a};
};
var $jinjor$elm_debounce$Debounce$SendIfLengthNotChangedFrom = function (a) {
	return {$: 'SendIfLengthNotChangedFrom', a: a};
};
var $elm$core$Process$sleep = _Process_sleep;
var $jinjor$elm_debounce$Debounce$delayCmd = F2(
	function (delay, msg) {
		return A2(
			$elm$core$Task$perform,
			function (_v0) {
				return msg;
			},
			$elm$core$Process$sleep(delay));
	});
var $jinjor$elm_debounce$Debounce$length = function (_v0) {
	var input = _v0.a.input;
	return $elm$core$List$length(input);
};
var $jinjor$elm_debounce$Debounce$push = F3(
	function (config, a, _v0) {
		var d = _v0.a;
		var newDebounce = $jinjor$elm_debounce$Debounce$Debounce(
			_Utils_update(
				d,
				{
					input: A2($elm$core$List$cons, a, d.input)
				}));
		var selfCmd = function () {
			var _v1 = config.strategy;
			switch (_v1.$) {
				case 'Manual':
					var offset = _v1.a;
					return d.locked ? $elm$core$Platform$Cmd$none : A2(
						$jinjor$elm_debounce$Debounce$delayCmd,
						offset,
						$jinjor$elm_debounce$Debounce$Flush($elm$core$Maybe$Nothing));
				case 'Soon':
					var offset = _v1.a;
					var delay = _v1.b;
					return d.locked ? $elm$core$Platform$Cmd$none : A2(
						$jinjor$elm_debounce$Debounce$delayCmd,
						offset,
						$jinjor$elm_debounce$Debounce$Flush(
							$elm$core$Maybe$Just(delay)));
				default:
					var delay = _v1.a;
					return A2(
						$jinjor$elm_debounce$Debounce$delayCmd,
						delay,
						$jinjor$elm_debounce$Debounce$SendIfLengthNotChangedFrom(
							$jinjor$elm_debounce$Debounce$length(newDebounce)));
			}
		}();
		return _Utils_Tuple2(
			newDebounce,
			A2($elm$core$Platform$Cmd$map, config.transform, selfCmd));
	});
var $jxxcarlson$elm_text_editor$Editor$History$push = F2(
	function (entry, _v0) {
		var history = _v0.a;
		return $jxxcarlson$elm_text_editor$Editor$History$History(
			{
				future: _List_Nil,
				past: A2($elm$core$List$cons, entry, history.past)
			});
	});
var $jxxcarlson$elm_text_editor$Editor$Update$stateToSnapshot = F2(
	function (_v0, buffer) {
		var cursor = _v0.cursor;
		var selection = _v0.selection;
		return {buffer: buffer, cursor: cursor, selection: selection};
	});
var $jxxcarlson$elm_text_editor$Editor$Update$recordHistory = F3(
	function (oldState, oldBuffer, _v0) {
		var state = _v0.a;
		var buffer = _v0.b;
		var cmd = _v0.c;
		return _Utils_Tuple3(
			_Utils_update(
				state,
				{
					history: (!_Utils_eq(oldBuffer, buffer)) ? A2(
						$jxxcarlson$elm_text_editor$Editor$History$push,
						A2($jxxcarlson$elm_text_editor$Editor$Update$stateToSnapshot, oldState, oldBuffer),
						state.history) : state.history
				}),
			buffer,
			cmd);
	});
var $jxxcarlson$elm_text_editor$Editor$History$redo = F2(
	function (current, _v0) {
		var history = _v0.a;
		var _v1 = history.future;
		if (_v1.b) {
			var next = _v1.a;
			var future = _v1.b;
			return $elm$core$Maybe$Just(
				_Utils_Tuple2(
					$jxxcarlson$elm_text_editor$Editor$History$History(
						{
							future: future,
							past: A2($elm$core$List$cons, current, history.past)
						}),
					next));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $jxxcarlson$elm_text_editor$Buffer$removeBefore = F2(
	function (position, _v0) {
		var buffer = _v0.a;
		return $jxxcarlson$elm_text_editor$Buffer$Buffer(
			A2(
				$elm$core$Maybe$withDefault,
				buffer,
				A2(
					$elm$core$Maybe$map,
					function (index) {
						return _Utils_ap(
							A3(
								$elm$core$String$slice,
								0,
								A2($elm$core$Basics$max, 0, index - 1),
								buffer),
							A2($elm$core$String$dropLeft, index, buffer));
					},
					A2($jxxcarlson$elm_text_editor$Buffer$indexFromPosition, buffer, position))));
	});
var $jxxcarlson$elm_text_editor$Buffer$replace = F4(
	function (pos1, pos2, str, _v0) {
		var buffer = _v0.a;
		var _v1 = A2($jxxcarlson$elm_text_editor$Position$order, pos1, pos2);
		var start = _v1.a;
		var end = _v1.b;
		return $jxxcarlson$elm_text_editor$Buffer$Buffer(
			A2(
				$elm$core$Maybe$withDefault,
				buffer,
				A3(
					$elm$core$Maybe$map2,
					F2(
						function (startIndex, endIndex) {
							return _Utils_ap(
								A3($elm$core$String$slice, 0, startIndex, buffer),
								_Utils_ap(
									str,
									A2($elm$core$String$dropLeft, endIndex, buffer)));
						}),
					A2($jxxcarlson$elm_text_editor$Buffer$indexFromPosition, buffer, start),
					A2($jxxcarlson$elm_text_editor$Buffer$indexFromPosition, buffer, end))));
	});
var $lovasoa$elm_rolling_list$RollingList$current = A2(
	$elm$core$Basics$composeL,
	$elm$core$List$head,
	function ($) {
		return $.next;
	});
var $lovasoa$elm_rolling_list$RollingList$rollBack = function (rollingList) {
	var _v0 = rollingList.previous;
	if (!_v0.b) {
		var _v1 = $elm$core$List$reverse(rollingList.next);
		if (_v1.b) {
			var elem = _v1.a;
			var list = _v1.b;
			return {
				next: _List_fromArray(
					[elem]),
				previous: list
			};
		} else {
			return {next: _List_Nil, previous: _List_Nil};
		}
	} else {
		var element = _v0.a;
		var tail = _v0.b;
		return {
			next: A2($elm$core$List$cons, element, rollingList.next),
			previous: tail
		};
	}
};
var $jxxcarlson$elm_text_editor$Editor$Update$GotViewport = function (a) {
	return {$: 'GotViewport', a: a};
};
var $jxxcarlson$elm_text_editor$Editor$Update$adjustedLineHeight = F2(
	function (factor, lineHeight) {
		return factor * lineHeight;
	});
var $elm$browser$Browser$Dom$getViewportOf = _Browser_getViewportOf;
var $elm$browser$Browser$Dom$setViewportOf = _Browser_setViewportOf;
var $jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine = F3(
	function (lineHeightFactor, lineHeight, lineNumber) {
		var y = lineNumber * A2($jxxcarlson$elm_text_editor$Editor$Update$adjustedLineHeight, lineHeightFactor, lineHeight);
		var _v0 = y >= 0;
		if (_v0) {
			return A2(
				$elm$core$Task$attempt,
				function (info) {
					return $jxxcarlson$elm_text_editor$Editor$Update$GotViewport(info);
				},
				A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $elm$browser$Browser$Dom$getViewportOf('__inner_editor__');
					},
					A3($elm$browser$Browser$Dom$setViewportOf, '__inner_editor__', 0, y)));
		} else {
			return $elm$core$Platform$Cmd$none;
		}
	});
var $jxxcarlson$elm_text_editor$Editor$Update$rollSearchSelectionBackward = F2(
	function (state, buffer) {
		var searchResults_ = $lovasoa$elm_rolling_list$RollingList$rollBack(state.searchResults);
		var searchResultList = $lovasoa$elm_rolling_list$RollingList$toList(searchResults_);
		var maxSearchHitIndex = function (x) {
			return x - 1;
		}(
			$elm$core$List$length(searchResultList));
		var newSearchHitIndex = (!state.searchHitIndex) ? maxSearchHitIndex : (state.searchHitIndex - 1);
		var _v0 = $lovasoa$elm_rolling_list$RollingList$current(searchResults_);
		if (_v0.$ === 'Nothing') {
			return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
		} else {
			var _v1 = _v0.a;
			var cursor = _v1.a;
			var end = _v1.b;
			return _Utils_Tuple3(
				_Utils_update(
					state,
					{
						cursor: cursor,
						searchHitIndex: newSearchHitIndex,
						searchResults: searchResults_,
						selection: $elm$core$Maybe$Just(end)
					}),
				buffer,
				A3(
					$jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine,
					state.config.lineHeightFactor,
					state.config.lineHeight,
					A2($elm$core$Basics$max, 0, cursor.line - 5)));
		}
	});
var $lovasoa$elm_rolling_list$RollingList$roll = function (rollingList) {
	var _v0 = rollingList.next;
	if (!_v0.b) {
		return {
			next: $elm$core$List$reverse(rollingList.previous),
			previous: _List_Nil
		};
	} else {
		if (!_v0.b.b) {
			var element = _v0.a;
			return {
				next: $elm$core$List$reverse(
					A2($elm$core$List$cons, element, rollingList.previous)),
				previous: _List_Nil
			};
		} else {
			var element = _v0.a;
			var tail = _v0.b;
			return {
				next: tail,
				previous: A2($elm$core$List$cons, element, rollingList.previous)
			};
		}
	}
};
var $jxxcarlson$elm_text_editor$Editor$Update$rollSearchSelectionForward = F2(
	function (state, buffer) {
		var searchResults_ = $lovasoa$elm_rolling_list$RollingList$roll(state.searchResults);
		var searchResultList = $lovasoa$elm_rolling_list$RollingList$toList(searchResults_);
		var maxSearchHitIndex = function (x) {
			return x - 1;
		}(
			$elm$core$List$length(searchResultList));
		var newSearchHitIndex = (_Utils_cmp(state.searchHitIndex, maxSearchHitIndex) > -1) ? 0 : (state.searchHitIndex + 1);
		var _v0 = $lovasoa$elm_rolling_list$RollingList$current(searchResults_);
		if (_v0.$ === 'Nothing') {
			return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
		} else {
			var _v1 = _v0.a;
			var cursor = _v1.a;
			var end = _v1.b;
			return _Utils_Tuple3(
				_Utils_update(
					state,
					{
						cursor: cursor,
						searchHitIndex: newSearchHitIndex,
						searchResults: searchResults_,
						selection: $elm$core$Maybe$Just(end)
					}),
				buffer,
				A3(
					$jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine,
					state.config.lineHeightFactor,
					state.config.lineHeight,
					A2($elm$core$Basics$max, 0, cursor.line - 5)));
		}
	});
var $jxxcarlson$elm_text_editor$Editor$Search$searchHits = F2(
	function (key, lines_) {
		var width = $elm$core$String$length(key);
		var makePositions = function (_v1) {
			var line = _v1.a;
			var column = _v1.b;
			return _Utils_Tuple2(
				A2($jxxcarlson$elm_text_editor$Position$Position, line, column),
				A2($jxxcarlson$elm_text_editor$Position$Position, line, column + width));
		};
		var expand = function (_v0) {
			var i = _v0.a;
			var list = _v0.b;
			return A2(
				$elm$core$List$map,
				function (item) {
					return _Utils_Tuple2(i, item);
				},
				list);
		};
		return A2(
			$elm$core$List$map,
			makePositions,
			$elm$core$List$concat(
				A2(
					$elm$core$List$map,
					expand,
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (i, line) {
								return _Utils_Tuple2(
									i,
									A2($elm$core$String$indexes, key, line));
							}),
						lines_))));
	});
var $jxxcarlson$elm_text_editor$Editor$Search$search = F2(
	function (key, buffer) {
		return A2(
			$jxxcarlson$elm_text_editor$Editor$Search$searchHits,
			key,
			$jxxcarlson$elm_text_editor$Buffer$lines(buffer));
	});
var $jxxcarlson$elm_text_editor$Editor$Update$scrollToTextInternal = F3(
	function (str, state, buffer) {
		var searchResults = A2($jxxcarlson$elm_text_editor$Editor$Search$search, str, buffer);
		var _v0 = $elm$core$List$head(searchResults);
		if (_v0.$ === 'Nothing') {
			return _Utils_Tuple3(
				_Utils_update(
					state,
					{
						searchResults: $lovasoa$elm_rolling_list$RollingList$fromList(_List_Nil),
						searchTerm: str,
						selection: $elm$core$Maybe$Nothing
					}),
				buffer,
				$elm$core$Platform$Cmd$none);
		} else {
			var _v1 = _v0.a;
			var cursor = _v1.a;
			var end = _v1.b;
			return _Utils_Tuple3(
				_Utils_update(
					state,
					{
						cursor: cursor,
						searchHitIndex: 0,
						searchResults: $lovasoa$elm_rolling_list$RollingList$fromList(searchResults),
						searchTerm: str,
						selection: $elm$core$Maybe$Just(end)
					}),
				buffer,
				A3(
					$jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine,
					state.config.lineHeightFactor,
					state.config.lineHeight,
					A2($elm$core$Basics$max, 0, cursor.line - 5)));
		}
	});
var $jxxcarlson$elm_text_editor$Buffer$indexedFilterMap = F2(
	function (filter, list) {
		return A2(
			$elm$core$List$map,
			$elm$core$Tuple$first,
			A2(
				$elm$core$List$filter,
				function (_v0) {
					var k = _v0.a;
					var item = _v0.b;
					return filter(item);
				},
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (k, item) {
							return _Utils_Tuple2(k, item);
						}),
					list)));
	});
var $jxxcarlson$elm_text_editor$Buffer$selectIndexOfPrecedingParagraph = F2(
	function (str, end) {
		var blankLines_ = A2(
			$jxxcarlson$elm_text_editor$Buffer$indexedFilterMap,
			function (str_) {
				return str_ === '';
			},
			$elm$core$String$lines(str));
		var indexOfStart = $elm_community$list_extra$List$Extra$last(
			A2(
				$elm$core$List$filter,
				function (i) {
					return _Utils_cmp(i, end) < 0;
				},
				blankLines_));
		if (indexOfStart.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var i = indexOfStart.a;
			return $elm$core$Maybe$Just(i + 1);
		}
	});
var $jxxcarlson$elm_text_editor$Buffer$selectPreviousParagraph = F2(
	function (_v0, end) {
		var str = _v0.a;
		return A2(
			$elm$core$Maybe$map,
			function (line_) {
				return A2($jxxcarlson$elm_text_editor$Position$Position, line_, 0);
			},
			A2($jxxcarlson$elm_text_editor$Buffer$selectIndexOfPrecedingParagraph, str, end.line));
	});
var $jxxcarlson$elm_text_editor$Editor$Update$GotViewportForSync = F3(
	function (a, b, c) {
		return {$: 'GotViewportForSync', a: a, b: b, c: c};
	});
var $jxxcarlson$elm_text_editor$Editor$Update$jumpToHeightForSync = F3(
	function (cursor, selection, y) {
		return A2(
			$elm$core$Task$attempt,
			function (info) {
				return A3($jxxcarlson$elm_text_editor$Editor$Update$GotViewportForSync, cursor, selection, info);
			},
			A2(
				$elm$core$Task$andThen,
				function (_v0) {
					return $elm$browser$Browser$Dom$getViewportOf('__inner_editor__');
				},
				A3($elm$browser$Browser$Dom$setViewportOf, '__inner_editor__', 0, y)));
	});
var $jxxcarlson$elm_text_editor$Position$setColumn = F2(
	function (column, position) {
		return _Utils_update(
			position,
			{column: column});
	});
var $jxxcarlson$elm_text_editor$Editor$Update$verticalOffsetInSourceText = 60;
var $jxxcarlson$elm_text_editor$Editor$Update$sendLine = F2(
	function (state, buffer) {
		var y = A2($elm$core$Basics$max, 0, (state.config.lineHeight * state.cursor.line) - $jxxcarlson$elm_text_editor$Editor$Update$verticalOffsetInSourceText);
		var newCursor = A2($jxxcarlson$elm_text_editor$Position$setColumn, 0, state.cursor);
		var selection = function () {
			var _v0 = A2($jxxcarlson$elm_text_editor$Buffer$lineEnd, newCursor.line, buffer);
			if (_v0.$ === 'Just') {
				var n = _v0.a;
				return $elm$core$Maybe$Just(
					A2($jxxcarlson$elm_text_editor$Position$Position, newCursor.line, n));
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}();
		return _Utils_Tuple3(
			_Utils_update(
				state,
				{cursor: newCursor, selection: selection}),
			buffer,
			A3($jxxcarlson$elm_text_editor$Editor$Update$jumpToHeightForSync, newCursor, selection, y));
	});
var $jxxcarlson$elm_text_editor$Editor$Update$lift = function (f) {
	return function (is) {
		return _Utils_update(
			is,
			{
				config: f(is.config)
			});
	};
};
var $jxxcarlson$elm_text_editor$Editor$Config$setWrapOption = F2(
	function (wrapOption, config) {
		return _Utils_update(
			config,
			{wrapOption: wrapOption});
	});
var $jxxcarlson$elm_text_editor$Editor$Update$setWrapOption = F2(
	function (wrapOption, state) {
		return A2(
			$jxxcarlson$elm_text_editor$Editor$Update$lift,
			$jxxcarlson$elm_text_editor$Editor$Config$setWrapOption(wrapOption),
			state);
	});
var $jxxcarlson$elm_text_editor$Position$shift = F2(
	function (k, position) {
		var _v0 = (position.line + k) >= 0;
		if (_v0) {
			return _Utils_update(
				position,
				{line: position.line + k});
		} else {
			return _Utils_update(
				position,
				{line: 0});
		}
	});
var $jinjor$elm_debounce$Debounce$takeLast = F3(
	function (send, head, tail) {
		return _Utils_Tuple2(
			_List_Nil,
			send(head));
	});
var $jxxcarlson$elm_text_editor$Editor$History$undo = F2(
	function (current, _v0) {
		var history = _v0.a;
		var _v1 = history.past;
		if (_v1.b) {
			var previous = _v1.a;
			var past = _v1.b;
			return $elm$core$Maybe$Just(
				_Utils_Tuple2(
					$jxxcarlson$elm_text_editor$Editor$History$History(
						{
							future: A2($elm$core$List$cons, current, history.future),
							past: past
						}),
					previous));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $jxxcarlson$elm_text_editor$Editor$Update$Unload = function (a) {
	return {$: 'Unload', a: a};
};
var $jxxcarlson$elm_text_editor$Editor$Update$unload = function (s) {
	return A2(
		$elm$core$Task$perform,
		$jxxcarlson$elm_text_editor$Editor$Update$Unload,
		$elm$core$Task$succeed(s));
};
var $jinjor$elm_debounce$Debounce$update = F4(
	function (config, send, msg, _v0) {
		var d = _v0.a;
		switch (msg.$) {
			case 'NoOp':
				return _Utils_Tuple2(
					$jinjor$elm_debounce$Debounce$Debounce(d),
					$elm$core$Platform$Cmd$none);
			case 'Flush':
				var tryAgainAfter = msg.a;
				var _v2 = d.input;
				if (_v2.b) {
					var head = _v2.a;
					var tail = _v2.b;
					var selfCmd = function () {
						if (tryAgainAfter.$ === 'Just') {
							var delay = tryAgainAfter.a;
							return A2(
								$jinjor$elm_debounce$Debounce$delayCmd,
								delay,
								$jinjor$elm_debounce$Debounce$Flush(
									$elm$core$Maybe$Just(delay)));
						} else {
							return $elm$core$Platform$Cmd$none;
						}
					}();
					var _v3 = A2(send, head, tail);
					var input = _v3.a;
					var sendCmd = _v3.b;
					return _Utils_Tuple2(
						$jinjor$elm_debounce$Debounce$Debounce(
							_Utils_update(
								d,
								{input: input, locked: true})),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									sendCmd,
									A2($elm$core$Platform$Cmd$map, config.transform, selfCmd)
								])));
				} else {
					return _Utils_Tuple2(
						$jinjor$elm_debounce$Debounce$Debounce(
							_Utils_update(
								d,
								{locked: false})),
						$elm$core$Platform$Cmd$none);
				}
			default:
				var lastInputLength = msg.a;
				var _v5 = _Utils_Tuple2(
					_Utils_cmp(
						$elm$core$List$length(d.input),
						lastInputLength) < 1,
					d.input);
				if (_v5.a && _v5.b.b) {
					var _v6 = _v5.b;
					var head = _v6.a;
					var tail = _v6.b;
					var _v7 = A2(send, head, tail);
					var input = _v7.a;
					var cmd = _v7.b;
					return _Utils_Tuple2(
						$jinjor$elm_debounce$Debounce$Debounce(
							_Utils_update(
								d,
								{input: input})),
						cmd);
				} else {
					return _Utils_Tuple2(
						$jinjor$elm_debounce$Debounce$Debounce(d),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $jxxcarlson$elm_text_editor$Editor$Update$wrapBetween = F4(
	function (state, buffer, start, end) {
		var selectedText = A3($jxxcarlson$elm_text_editor$Buffer$between, start, end, buffer);
		var wrappedText = A2($jxxcarlson$elm_text_editor$Editor$Wrap$paragraphs, state.config.wrapParams, selectedText);
		var newBuffer = A4($jxxcarlson$elm_text_editor$Buffer$replace, start, end, wrappedText, buffer);
		var linesOfWrappedText = $elm$core$String$lines(wrappedText);
		var linesOfText = $elm$core$List$length(linesOfWrappedText);
		var lastLine = $elm_community$list_extra$List$Extra$last(linesOfWrappedText);
		var column = A2(
			$elm$core$Maybe$withDefault,
			0,
			A2($elm$core$Maybe$map, $elm$core$String$length, lastLine));
		var newCursor = _Utils_update(
			start,
			{column: column, line: (start.line + linesOfText) - 1});
		var newState = _Utils_update(
			state,
			{
				cursor: newCursor,
				selectedText: $elm$core$Maybe$Just(selectedText)
			});
		return _Utils_Tuple3(newState, newBuffer, $elm$core$Platform$Cmd$none);
	});
var $jxxcarlson$elm_text_editor$Editor$Update$update = F3(
	function (buffer, msg, state) {
		switch (msg.$) {
			case 'NoOp':
				return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
			case 'MouseDown':
				var position = msg.a;
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{cursor: position, dragging: true, selection: $elm$core$Maybe$Nothing}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'MouseOver':
				var position = msg.a;
				return state.dragging ? _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: position,
							selection: function () {
								var _v1 = state.selection;
								if (_v1.$ === 'Just') {
									var selection = _v1.a;
									return _Utils_eq(selection, position) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(selection);
								} else {
									return _Utils_eq(position, state.cursor) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(state.cursor);
								}
							}()
						}),
					buffer,
					$elm$core$Platform$Cmd$none) : _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
			case 'MouseUp':
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{dragging: false}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'CursorLeft':
				var newCursor = function () {
					var moveFrom = function () {
						var _v3 = state.selection;
						if (_v3.$ === 'Just') {
							var selection = _v3.a;
							return A2($jxxcarlson$elm_text_editor$Position$order, selection, state.cursor).a;
						} else {
							return state.cursor;
						}
					}();
					return A3(
						$jxxcarlson$elm_text_editor$Buffer$clampPosition,
						$jxxcarlson$elm_text_editor$Buffer$Backward,
						buffer,
						$jxxcarlson$elm_text_editor$Position$previousColumn(moveFrom));
				}();
				var cmd = function () {
					var _v2 = !_Utils_eq(state.cursor.line, newCursor.line);
					if (_v2) {
						return A3($jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine, state.config.lineHeightFactor, state.config.lineHeight, newCursor.line);
					} else {
						return $elm$core$Platform$Cmd$none;
					}
				}();
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{cursor: newCursor, selection: $elm$core$Maybe$Nothing}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'CursorRight':
				var newCursor = function () {
					var moveFrom = function () {
						var _v4 = state.selection;
						if (_v4.$ === 'Just') {
							var selection = _v4.a;
							return A2($jxxcarlson$elm_text_editor$Position$order, selection, state.cursor).b;
						} else {
							return state.cursor;
						}
					}();
					return A3(
						$jxxcarlson$elm_text_editor$Buffer$clampPosition,
						$jxxcarlson$elm_text_editor$Buffer$Forward,
						buffer,
						$jxxcarlson$elm_text_editor$Position$nextColumn(moveFrom));
				}();
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{cursor: newCursor, selection: $elm$core$Maybe$Nothing}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'CursorUp':
				var newCursor = function () {
					var moveFrom = function () {
						var _v5 = state.selection;
						if (_v5.$ === 'Just') {
							var selection = _v5.a;
							return A2($jxxcarlson$elm_text_editor$Position$order, selection, state.cursor).a;
						} else {
							return state.cursor;
						}
					}();
					return A3(
						$jxxcarlson$elm_text_editor$Buffer$clampPosition,
						$jxxcarlson$elm_text_editor$Buffer$Backward,
						buffer,
						$jxxcarlson$elm_text_editor$Position$previousLine(moveFrom));
				}();
				var scrollCmd = (_Utils_cmp(newCursor.line, state.topLine) < 0) ? A3($jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine, state.config.lineHeightFactor, state.config.lineHeight, newCursor.line) : $elm$core$Platform$Cmd$none;
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{cursor: newCursor, selection: $elm$core$Maybe$Nothing}),
					buffer,
					scrollCmd);
			case 'CursorDown':
				var newCursor = function () {
					var moveFrom = function () {
						var _v6 = state.selection;
						if (_v6.$ === 'Just') {
							var selection = _v6.a;
							return A2($jxxcarlson$elm_text_editor$Position$order, selection, state.cursor).b;
						} else {
							return state.cursor;
						}
					}();
					return A3(
						$jxxcarlson$elm_text_editor$Buffer$clampPosition,
						$jxxcarlson$elm_text_editor$Buffer$Backward,
						buffer,
						$jxxcarlson$elm_text_editor$Position$nextLine(moveFrom));
				}();
				var scrollCmd = (_Utils_cmp(
					newCursor.line,
					$jxxcarlson$elm_text_editor$Editor$Update$bottomLine(state)) > 0) ? A3($jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine, state.config.lineHeightFactor, state.config.lineHeight, newCursor.line) : $elm$core$Platform$Cmd$none;
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{cursor: newCursor, selection: $elm$core$Maybe$Nothing}),
					buffer,
					scrollCmd);
			case 'CursorToLineEnd':
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: function () {
								var moveFrom = function () {
									var _v8 = state.selection;
									if (_v8.$ === 'Just') {
										var selection = _v8.a;
										return A2($jxxcarlson$elm_text_editor$Position$order, selection, state.cursor).b;
									} else {
										return state.cursor;
									}
								}();
								var _v7 = A2($jxxcarlson$elm_text_editor$Buffer$lineEnd, moveFrom.line, buffer);
								if (_v7.$ === 'Just') {
									var column = _v7.a;
									return A2($jxxcarlson$elm_text_editor$Position$setColumn, column, state.cursor);
								} else {
									return A3($jxxcarlson$elm_text_editor$Buffer$clampPosition, $jxxcarlson$elm_text_editor$Buffer$Backward, buffer, state.cursor);
								}
							}(),
							selection: $elm$core$Maybe$Nothing
						}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'CursorToLineStart':
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: function () {
								var moveFrom = function () {
									var _v9 = state.selection;
									if (_v9.$ === 'Just') {
										var selection = _v9.a;
										return A2($jxxcarlson$elm_text_editor$Position$order, selection, state.cursor).a;
									} else {
										return state.cursor;
									}
								}();
								return A2($jxxcarlson$elm_text_editor$Position$setColumn, 0, moveFrom);
							}(),
							selection: $elm$core$Maybe$Nothing
						}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'CursorToGroupEnd':
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: A2($jxxcarlson$elm_text_editor$Buffer$groupEnd, state.cursor, buffer),
							selection: $elm$core$Maybe$Nothing
						}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'CursorToGroupStart':
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: A2($jxxcarlson$elm_text_editor$Buffer$groupStart, state.cursor, buffer),
							selection: $elm$core$Maybe$Nothing
						}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'Paste':
				var _v10 = state.selectedText;
				if (_v10.$ === 'Nothing') {
					return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
				} else {
					var text = _v10.a;
					var oldCursor = state.cursor;
					var lines_ = $elm$core$String$lines(text);
					var newColumn = function () {
						var _v11 = $elm_community$list_extra$List$Extra$last(lines_);
						if (_v11.$ === 'Just') {
							var str = _v11.a;
							return $elm$core$String$length(str);
						} else {
							return 0;
						}
					}();
					var linesOfText = $elm$core$List$length(lines_);
					var newLine = (oldCursor.line + linesOfText) - 1;
					var newCursor = A2($jxxcarlson$elm_text_editor$Position$Position, newLine, newColumn);
					return _Utils_Tuple3(
						_Utils_update(
							state,
							{cursor: newCursor}),
						A3($jxxcarlson$elm_text_editor$Buffer$insert, state.cursor, text, buffer),
						$elm$core$Platform$Cmd$none);
				}
			case 'PasteFromClipboard':
				return _Utils_Tuple3(
					state,
					A3($jxxcarlson$elm_text_editor$Buffer$insert, state.cursor, state.clipboard, buffer),
					$elm$core$Platform$Cmd$none);
			case 'CopyPasteClipboard':
				return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
			case 'WriteToSystemClipBoard':
				var _v12 = state.selection;
				if (_v12.$ === 'Nothing') {
					return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
				} else {
					var sel = _v12.a;
					var _v13 = A2($jxxcarlson$elm_text_editor$Position$order, sel, state.cursor);
					var start = _v13.a;
					var end = _v13.b;
					var selectedText = A3($jxxcarlson$elm_text_editor$Buffer$between, start, end, buffer);
					var newState = _Utils_update(
						state,
						{
							selectedText: $elm$core$Maybe$Just(selectedText)
						});
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(newState, buffer, $elm$core$Platform$Cmd$none));
				}
			case 'Insert':
				var string = msg.a;
				var _v14 = _Utils_Tuple2(
					state.selection,
					A2($elm$core$Dict$get, string, $jxxcarlson$elm_text_editor$Editor$Update$autoclose));
				if (_v14.a.$ === 'Just') {
					if (_v14.b.$ === 'Just') {
						var selection = _v14.a.a;
						var closing = _v14.b.a;
						var _v15 = A2($jxxcarlson$elm_text_editor$Position$order, selection, state.cursor);
						var start = _v15.a;
						var end = _v15.b;
						var wrapped = _Utils_ap(
							string,
							_Utils_ap(
								A3($jxxcarlson$elm_text_editor$Buffer$between, start, end, buffer),
								closing));
						return A3(
							$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
							state,
							buffer,
							_Utils_Tuple3(
								_Utils_update(
									state,
									{
										cursor: _Utils_eq(state.cursor.line, start.line) ? $jxxcarlson$elm_text_editor$Position$nextColumn(state.cursor) : state.cursor,
										selection: $elm$core$Maybe$Just(
											_Utils_eq(selection.line, start.line) ? $jxxcarlson$elm_text_editor$Position$nextColumn(selection) : selection)
									}),
								A4($jxxcarlson$elm_text_editor$Buffer$replace, start, end, wrapped, buffer),
								$elm$core$Platform$Cmd$none));
					} else {
						var selection = _v14.a.a;
						var _v16 = _v14.b;
						var _v17 = A2($jxxcarlson$elm_text_editor$Position$order, selection, state.cursor);
						var start = _v17.a;
						var end = _v17.b;
						return A3(
							$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
							state,
							buffer,
							_Utils_Tuple3(
								_Utils_update(
									state,
									{
										cursor: (string === '\n') ? {column: 0, line: start.line + 1} : $jxxcarlson$elm_text_editor$Position$nextColumn(start),
										selection: $elm$core$Maybe$Nothing
									}),
								A4($jxxcarlson$elm_text_editor$Buffer$replace, start, end, string, buffer),
								$elm$core$Platform$Cmd$none));
					}
				} else {
					var _v18 = _v14.a;
					var maybeClosing = _v14.b;
					var nearWordChar = A2($jxxcarlson$elm_text_editor$Buffer$nearWordChar, state.cursor, buffer);
					var insertString_ = (!nearWordChar) ? A2(
						$elm$core$Maybe$withDefault,
						string,
						A2(
							$elm$core$Maybe$map,
							$elm$core$Basics$append(string),
							maybeClosing)) : string;
					var insertString = (insertString_ === ' ') ? ((_Utils_cmp(
						A2(
							$elm$core$Maybe$withDefault,
							-1,
							A2(
								$elm$core$Maybe$map,
								$elm$core$String$length,
								A2($jxxcarlson$elm_text_editor$Buffer$lineAt, state.cursor, buffer))),
						state.config.wrapParams.optimalWidth) > 0) ? '\n' : insertString_) : insertString_;
					var _v19 = A3($jinjor$elm_debounce$Debounce$push, $jxxcarlson$elm_text_editor$Editor$Update$debounceConfig, insertString, state.debounce);
					var debounce = _v19.a;
					var debounceCmd = _v19.b;
					var newCursor = (insertString === '\n') ? {column: 0, line: state.cursor.line + 1} : $jxxcarlson$elm_text_editor$Position$nextColumn(state.cursor);
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							_Utils_update(
								state,
								{cursor: newCursor, debounce: debounce}),
							A3($jxxcarlson$elm_text_editor$Buffer$insert, state.cursor, insertString, buffer),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[debounceCmd]))));
				}
			case 'FirstLine':
				var cursor = {column: 0, line: 0};
				return A3(
					$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
					state,
					buffer,
					_Utils_Tuple3(
						_Utils_update(
							state,
							{cursor: cursor, selection: $elm$core$Maybe$Nothing}),
						buffer,
						A3($jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine, state.config.lineHeightFactor, state.config.lineHeight, cursor.line)));
			case 'AcceptLineNumber':
				var nString = msg.a;
				var _v20 = $elm$core$String$toInt(nString);
				if (_v20.$ === 'Nothing') {
					return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
				} else {
					var n_ = _v20.a;
					var lineNumber = A3(
						$elm$core$Basics$clamp,
						0,
						$elm$core$List$length(
							$jxxcarlson$elm_text_editor$Buffer$lines(buffer)) - 1,
						n_ - 1);
					var cursor = {column: 0, line: lineNumber};
					var selection = function () {
						var _v21 = A2($jxxcarlson$elm_text_editor$Buffer$lineEnd, cursor.line, buffer);
						if (_v21.$ === 'Just') {
							var column = _v21.a;
							return $elm$core$Maybe$Just(
								A2($jxxcarlson$elm_text_editor$Position$Position, cursor.line, column));
						} else {
							return $elm$core$Maybe$Nothing;
						}
					}();
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							_Utils_update(
								state,
								{cursor: cursor, selection: selection}),
							buffer,
							A3($jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine, state.config.lineHeightFactor, state.config.lineHeight, lineNumber)));
				}
			case 'AcceptSearchText':
				var str = msg.a;
				return A3($jxxcarlson$elm_text_editor$Editor$Update$scrollToTextInternal, str, state, buffer);
			case 'ScrollToSelection':
				var _v22 = msg.a;
				var start = _v22.a;
				var end = _v22.b;
				return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
			case 'RollSearchSelectionForward':
				return A2($jxxcarlson$elm_text_editor$Editor$Update$rollSearchSelectionForward, state, buffer);
			case 'RollSearchSelectionBackward':
				return A2($jxxcarlson$elm_text_editor$Editor$Update$rollSearchSelectionBackward, state, buffer);
			case 'AcceptReplacementText':
				var str = msg.a;
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{replacementText: str}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'ReplaceCurrentSelection':
				var _v23 = state.selection;
				if (_v23.$ === 'Nothing') {
					return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
				} else {
					var end = _v23.a;
					var newBuffer = A4($jxxcarlson$elm_text_editor$Buffer$replace, state.cursor, end, state.replacementText, buffer);
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						A2($jxxcarlson$elm_text_editor$Editor$Update$rollSearchSelectionForward, state, newBuffer));
				}
			case 'LastLine':
				var cursor = {
					column: 0,
					line: $elm$core$List$length(
						$jxxcarlson$elm_text_editor$Buffer$lines(buffer)) - 1
				};
				return A3(
					$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
					state,
					buffer,
					_Utils_Tuple3(
						_Utils_update(
							state,
							{cursor: cursor, selection: $elm$core$Maybe$Nothing}),
						buffer,
						A3($jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine, state.config.lineHeightFactor, state.config.lineHeight, cursor.line)));
			case 'RemoveCharAfter':
				var _v24 = state.selection;
				if (_v24.$ === 'Just') {
					var selection = _v24.a;
					var _v25 = A2($jxxcarlson$elm_text_editor$Position$order, selection, state.cursor);
					var start = _v25.a;
					var end = _v25.b;
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							_Utils_update(
								state,
								{cursor: start, selection: $elm$core$Maybe$Nothing}),
							A4($jxxcarlson$elm_text_editor$Buffer$replace, start, end, '', buffer),
							$elm$core$Platform$Cmd$none));
				} else {
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							state,
							A4(
								$jxxcarlson$elm_text_editor$Buffer$replace,
								state.cursor,
								$jxxcarlson$elm_text_editor$Position$nextColumn(state.cursor),
								'',
								buffer),
							$elm$core$Platform$Cmd$none));
				}
			case 'RemoveCharBefore':
				var _v26 = state.selection;
				if (_v26.$ === 'Just') {
					var selection = _v26.a;
					var _v27 = A2($jxxcarlson$elm_text_editor$Position$order, selection, state.cursor);
					var start = _v27.a;
					var end = _v27.b;
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							_Utils_update(
								state,
								{cursor: start, selection: $elm$core$Maybe$Nothing}),
							A4($jxxcarlson$elm_text_editor$Buffer$replace, start, end, '', buffer),
							$elm$core$Platform$Cmd$none));
				} else {
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							_Utils_update(
								state,
								{
									cursor: A3(
										$jxxcarlson$elm_text_editor$Buffer$clampPosition,
										$jxxcarlson$elm_text_editor$Buffer$Backward,
										buffer,
										$jxxcarlson$elm_text_editor$Position$previousColumn(state.cursor))
								}),
							A2($jxxcarlson$elm_text_editor$Buffer$removeBefore, state.cursor, buffer),
							$elm$core$Platform$Cmd$none));
				}
			case 'RemoveGroupAfter':
				var _v28 = state.selection;
				if (_v28.$ === 'Just') {
					var selection = _v28.a;
					var _v29 = A2($jxxcarlson$elm_text_editor$Position$order, selection, state.cursor);
					var start = _v29.a;
					var end = _v29.b;
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							_Utils_update(
								state,
								{cursor: start, selection: $elm$core$Maybe$Nothing}),
							A4($jxxcarlson$elm_text_editor$Buffer$replace, start, end, '', buffer),
							$elm$core$Platform$Cmd$none));
				} else {
					var end = A2($jxxcarlson$elm_text_editor$Buffer$groupEnd, state.cursor, buffer);
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							state,
							A4($jxxcarlson$elm_text_editor$Buffer$replace, state.cursor, end, '', buffer),
							$elm$core$Platform$Cmd$none));
				}
			case 'Copy':
				var _v30 = state.selection;
				if (_v30.$ === 'Nothing') {
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							_Utils_update(
								state,
								{selectedText: $elm$core$Maybe$Nothing}),
							buffer,
							$elm$core$Platform$Cmd$none));
				} else {
					var sel = _v30.a;
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						function () {
							var _v31 = A2($jxxcarlson$elm_text_editor$Position$order, sel, state.cursor);
							var start = _v31.a;
							var end = _v31.b;
							var selectedText = A3($jxxcarlson$elm_text_editor$Buffer$between, start, end, buffer);
							return _Utils_Tuple3(
								_Utils_update(
									state,
									{
										selectedText: $elm$core$Maybe$Just(selectedText)
									}),
								buffer,
								$elm$core$Platform$Cmd$none);
						}());
				}
			case 'Cut':
				var _v32 = state.selection;
				if (_v32.$ === 'Nothing') {
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							_Utils_update(
								state,
								{selectedText: $elm$core$Maybe$Nothing}),
							buffer,
							$elm$core$Platform$Cmd$none));
				} else {
					var sel = _v32.a;
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						function () {
							var _v33 = A2($jxxcarlson$elm_text_editor$Position$order, sel, state.cursor);
							var start = _v33.a;
							var end = _v33.b;
							var selectedText = A3($jxxcarlson$elm_text_editor$Buffer$between, start, end, buffer);
							return _Utils_Tuple3(
								_Utils_update(
									state,
									{
										selectedText: $elm$core$Maybe$Just(selectedText),
										selection: $elm$core$Maybe$Nothing
									}),
								A4($jxxcarlson$elm_text_editor$Buffer$replace, start, end, '', buffer),
								$elm$core$Platform$Cmd$none);
						}());
				}
			case 'RemoveGroupBefore':
				var _v34 = state.selection;
				if (_v34.$ === 'Just') {
					var selection = _v34.a;
					var _v35 = A2($jxxcarlson$elm_text_editor$Position$order, selection, state.cursor);
					var start = _v35.a;
					var end = _v35.b;
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							_Utils_update(
								state,
								{cursor: start, selection: $elm$core$Maybe$Nothing}),
							A4($jxxcarlson$elm_text_editor$Buffer$replace, start, end, '', buffer),
							$elm$core$Platform$Cmd$none));
				} else {
					var start = A2($jxxcarlson$elm_text_editor$Buffer$groupStart, state.cursor, buffer);
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							_Utils_update(
								state,
								{cursor: start}),
							A4($jxxcarlson$elm_text_editor$Buffer$replace, start, state.cursor, '', buffer),
							$elm$core$Platform$Cmd$none));
				}
			case 'Indent':
				var _v36 = state.selection;
				if (_v36.$ === 'Just') {
					var selection = _v36.a;
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							_Utils_update(
								state,
								{
									cursor: A2($jxxcarlson$elm_text_editor$Position$addColumn, $jxxcarlson$elm_text_editor$Buffer$indentSize, state.cursor),
									selection: $elm$core$Maybe$Just(
										A2($jxxcarlson$elm_text_editor$Position$addColumn, $jxxcarlson$elm_text_editor$Buffer$indentSize, selection))
								}),
							A3($jxxcarlson$elm_text_editor$Buffer$indentBetween, state.cursor, selection, buffer),
							$elm$core$Platform$Cmd$none));
				} else {
					var _v37 = A2($jxxcarlson$elm_text_editor$Buffer$indentFrom, state.cursor, buffer);
					var indentedBuffer = _v37.a;
					var indentedColumn = _v37.b;
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							_Utils_update(
								state,
								{
									cursor: A2($jxxcarlson$elm_text_editor$Position$setColumn, indentedColumn, state.cursor)
								}),
							indentedBuffer,
							$elm$core$Platform$Cmd$none));
				}
			case 'Deindent':
				var _v38 = state.selection;
				if (_v38.$ === 'Just') {
					var selection = _v38.a;
					var _v39 = A3($jxxcarlson$elm_text_editor$Buffer$deindentBetween, state.cursor, selection, buffer);
					var deindentedBuffer = _v39.a;
					var cursorColumn = _v39.b;
					var selectionColumn = _v39.c;
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							_Utils_update(
								state,
								{
									cursor: A2($jxxcarlson$elm_text_editor$Position$setColumn, cursorColumn, state.cursor),
									selection: $elm$core$Maybe$Just(
										A2($jxxcarlson$elm_text_editor$Position$setColumn, selectionColumn, selection))
								}),
							deindentedBuffer,
							$elm$core$Platform$Cmd$none));
				} else {
					var _v40 = A2($jxxcarlson$elm_text_editor$Buffer$deindentFrom, state.cursor, buffer);
					var deindentedBuffer = _v40.a;
					var deindentedColumn = _v40.b;
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						_Utils_Tuple3(
							_Utils_update(
								state,
								{
									cursor: A2($jxxcarlson$elm_text_editor$Position$setColumn, deindentedColumn, state.cursor)
								}),
							deindentedBuffer,
							$elm$core$Platform$Cmd$none));
				}
			case 'SelectUp':
				var cursor = A3(
					$jxxcarlson$elm_text_editor$Buffer$clampPosition,
					$jxxcarlson$elm_text_editor$Buffer$Backward,
					buffer,
					$jxxcarlson$elm_text_editor$Position$previousLine(state.cursor));
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: cursor,
							selection: _Utils_eq(
								state.selection,
								$elm$core$Maybe$Just(cursor)) ? $elm$core$Maybe$Nothing : ((_Utils_eq(state.selection, $elm$core$Maybe$Nothing) && (!_Utils_eq(state.cursor, cursor))) ? $elm$core$Maybe$Just(state.cursor) : state.selection)
						}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'SelectDown':
				var cursor = A3(
					$jxxcarlson$elm_text_editor$Buffer$clampPosition,
					$jxxcarlson$elm_text_editor$Buffer$Backward,
					buffer,
					$jxxcarlson$elm_text_editor$Position$nextLine(state.cursor));
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: cursor,
							selection: _Utils_eq(
								state.selection,
								$elm$core$Maybe$Just(cursor)) ? $elm$core$Maybe$Nothing : ((_Utils_eq(state.selection, $elm$core$Maybe$Nothing) && (!_Utils_eq(state.cursor, cursor))) ? $elm$core$Maybe$Just(state.cursor) : state.selection)
						}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'SelectLeft':
				var cursor = A3(
					$jxxcarlson$elm_text_editor$Buffer$clampPosition,
					$jxxcarlson$elm_text_editor$Buffer$Backward,
					buffer,
					$jxxcarlson$elm_text_editor$Position$previousColumn(state.cursor));
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: cursor,
							selection: _Utils_eq(
								state.selection,
								$elm$core$Maybe$Just(cursor)) ? $elm$core$Maybe$Nothing : ((_Utils_eq(state.selection, $elm$core$Maybe$Nothing) && (!_Utils_eq(state.cursor, cursor))) ? $elm$core$Maybe$Just(state.cursor) : state.selection)
						}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'SelectRight':
				var cursor = A3(
					$jxxcarlson$elm_text_editor$Buffer$clampPosition,
					$jxxcarlson$elm_text_editor$Buffer$Forward,
					buffer,
					$jxxcarlson$elm_text_editor$Position$nextColumn(state.cursor));
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: cursor,
							selection: _Utils_eq(
								state.selection,
								$elm$core$Maybe$Just(cursor)) ? $elm$core$Maybe$Nothing : ((_Utils_eq(state.selection, $elm$core$Maybe$Nothing) && (!_Utils_eq(state.cursor, cursor))) ? $elm$core$Maybe$Just(state.cursor) : state.selection)
						}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'SelectToLineStart':
				var cursor = A2($jxxcarlson$elm_text_editor$Position$setColumn, 0, state.cursor);
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: cursor,
							selection: _Utils_eq(
								state.selection,
								$elm$core$Maybe$Just(cursor)) ? $elm$core$Maybe$Nothing : ((_Utils_eq(state.selection, $elm$core$Maybe$Nothing) && (!_Utils_eq(state.cursor, cursor))) ? $elm$core$Maybe$Just(state.cursor) : state.selection)
						}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'SelectToLineEnd':
				var cursor = A2(
					$jxxcarlson$elm_text_editor$Position$setColumn,
					A2(
						$elm$core$Maybe$withDefault,
						state.cursor.line,
						A2($jxxcarlson$elm_text_editor$Buffer$lineEnd, state.cursor.line, buffer)),
					state.cursor);
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: cursor,
							selection: _Utils_eq(
								state.selection,
								$elm$core$Maybe$Just(cursor)) ? $elm$core$Maybe$Nothing : ((_Utils_eq(state.selection, $elm$core$Maybe$Nothing) && (!_Utils_eq(state.cursor, cursor))) ? $elm$core$Maybe$Just(state.cursor) : state.selection)
						}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'SelectToGroupStart':
				var cursor = A2($jxxcarlson$elm_text_editor$Buffer$groupStart, state.cursor, buffer);
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: cursor,
							selection: _Utils_eq(
								state.selection,
								$elm$core$Maybe$Just(cursor)) ? $elm$core$Maybe$Nothing : ((_Utils_eq(state.selection, $elm$core$Maybe$Nothing) && (!_Utils_eq(state.cursor, cursor))) ? $elm$core$Maybe$Just(state.cursor) : state.selection)
						}),
					buffer,
					A3($jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine, state.config.lineHeightFactor, state.config.lineHeight, cursor.line));
			case 'SelectToGroupEnd':
				var cursor = A2($jxxcarlson$elm_text_editor$Buffer$groupEnd, state.cursor, buffer);
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: cursor,
							selection: _Utils_eq(
								state.selection,
								$elm$core$Maybe$Just(cursor)) ? $elm$core$Maybe$Nothing : ((_Utils_eq(state.selection, $elm$core$Maybe$Nothing) && (!_Utils_eq(state.cursor, cursor))) ? $elm$core$Maybe$Just(state.cursor) : state.selection)
						}),
					buffer,
					A3($jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine, state.config.lineHeightFactor, state.config.lineHeight, cursor.line));
			case 'SelectAll':
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: $jxxcarlson$elm_text_editor$Buffer$lastPosition(buffer),
							selection: $elm$core$Maybe$Just(
								A2($jxxcarlson$elm_text_editor$Position$Position, 0, 0))
						}),
					buffer,
					A3($jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine, state.config.lineHeightFactor, state.config.lineHeight, 0));
			case 'SelectGroup':
				var range = A2($jxxcarlson$elm_text_editor$Buffer$groupRange, state.cursor, buffer);
				if (range.$ === 'Just') {
					var _v42 = range.a;
					var start = _v42.a;
					var end = _v42.b;
					return _Utils_Tuple3(
						_Utils_update(
							state,
							{
								cursor: end,
								selection: $elm$core$Maybe$Just(start)
							}),
						buffer,
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
				}
			case 'SelectLine':
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							cursor: A2(
								$elm$core$Maybe$withDefault,
								state.cursor,
								A2(
									$elm$core$Maybe$map,
									function (column) {
										return A2($jxxcarlson$elm_text_editor$Position$setColumn, column, state.cursor);
									},
									A2($jxxcarlson$elm_text_editor$Buffer$lineEnd, state.cursor.line, buffer))),
							selection: $elm$core$Maybe$Just(
								A2($jxxcarlson$elm_text_editor$Position$setColumn, 0, state.cursor))
						}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'SyncToSearchHit':
				return A2($jxxcarlson$elm_text_editor$Editor$Update$sendLine, state, buffer);
			case 'SendLine':
				return A2($jxxcarlson$elm_text_editor$Editor$Update$sendLine, state, buffer);
			case 'GotViewport':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var vp = result.a;
					var y = vp.viewport.y;
					var lineNumber = $elm$core$Basics$round(y / state.config.lineHeight);
					return _Utils_Tuple3(
						_Utils_update(
							state,
							{topLine: lineNumber}),
						buffer,
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
				}
			case 'GotViewportForSync':
				var cursor = msg.a;
				var selection = msg.b;
				var result = msg.c;
				if (result.$ === 'Ok') {
					var vp = result.a;
					var y = vp.viewport.y;
					var lineNumber = $elm$core$Basics$round(y / state.config.lineHeight);
					return _Utils_Tuple3(
						_Utils_update(
							state,
							{cursor: cursor, selection: selection, topLine: lineNumber}),
						buffer,
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
				}
			case 'Undo':
				var _v45 = A2(
					$jxxcarlson$elm_text_editor$Editor$History$undo,
					A2($jxxcarlson$elm_text_editor$Editor$Update$stateToSnapshot, state, buffer),
					state.history);
				if (_v45.$ === 'Just') {
					var _v46 = _v45.a;
					var history = _v46.a;
					var snapshot = _v46.b;
					return _Utils_Tuple3(
						_Utils_update(
							state,
							{cursor: snapshot.cursor, history: history, selection: snapshot.selection}),
						snapshot.buffer,
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
				}
			case 'Redo':
				var _v47 = A2(
					$jxxcarlson$elm_text_editor$Editor$History$redo,
					A2($jxxcarlson$elm_text_editor$Editor$Update$stateToSnapshot, state, buffer),
					state.history);
				if (_v47.$ === 'Just') {
					var _v48 = _v47.a;
					var history = _v48.a;
					var snapshot = _v48.b;
					return _Utils_Tuple3(
						_Utils_update(
							state,
							{cursor: snapshot.cursor, history: history, selection: snapshot.selection}),
						snapshot.buffer,
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
				}
			case 'ScrollUp':
				var k = msg.a;
				var newCursor = A2($jxxcarlson$elm_text_editor$Position$shift, -k, state.cursor);
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{cursor: newCursor, selection: $elm$core$Maybe$Nothing}),
					buffer,
					A3($jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine, state.config.lineHeightFactor, state.config.lineHeight, newCursor.line));
			case 'ScrollDown':
				var k = msg.a;
				var newCursor = A2($jxxcarlson$elm_text_editor$Position$shift, k, state.cursor);
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{cursor: newCursor, selection: $elm$core$Maybe$Nothing}),
					buffer,
					A3($jxxcarlson$elm_text_editor$Editor$Update$setEditorViewportForLine, state.config.lineHeightFactor, state.config.lineHeight, newCursor.line));
			case 'Clear':
				return A3(
					$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
					state,
					buffer,
					_Utils_Tuple3(
						state,
						$jxxcarlson$elm_text_editor$Buffer$init(''),
						$elm$core$Platform$Cmd$none));
			case 'WrapAll':
				return A3(
					$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
					state,
					buffer,
					_Utils_Tuple3(
						state,
						$jxxcarlson$elm_text_editor$Buffer$init(
							A2(
								$jxxcarlson$elm_text_editor$Editor$Wrap$paragraphs,
								state.config.wrapParams,
								$jxxcarlson$elm_text_editor$Buffer$toString(buffer))),
						$elm$core$Platform$Cmd$none));
			case 'WrapSelection':
				var _v49 = state.selection;
				if (_v49.$ === 'Nothing') {
					var selection = A2($jxxcarlson$elm_text_editor$Buffer$selectPreviousParagraph, buffer, state.cursor);
					if (selection.$ === 'Nothing') {
						return _Utils_Tuple3(state, buffer, $elm$core$Platform$Cmd$none);
					} else {
						var start = selection.a;
						return A3(
							$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
							state,
							buffer,
							A4($jxxcarlson$elm_text_editor$Editor$Update$wrapBetween, state, buffer, start, state.cursor));
					}
				} else {
					var sel = _v49.a;
					var _v51 = A2($jxxcarlson$elm_text_editor$Position$order, sel, state.cursor);
					var start = _v51.a;
					var end = _v51.b;
					return A3(
						$jxxcarlson$elm_text_editor$Editor$Update$recordHistory,
						state,
						buffer,
						A4($jxxcarlson$elm_text_editor$Editor$Update$wrapBetween, state, buffer, start, end));
				}
			case 'ToggleWrapping':
				return _Utils_eq(state.config.wrapOption, $jxxcarlson$elm_text_editor$Editor$Config$DoWrap) ? _Utils_Tuple3(
					A2($jxxcarlson$elm_text_editor$Editor$Update$setWrapOption, $jxxcarlson$elm_text_editor$Editor$Config$DontWrap, state),
					buffer,
					$elm$core$Platform$Cmd$none) : _Utils_Tuple3(
					A2($jxxcarlson$elm_text_editor$Editor$Update$setWrapOption, $jxxcarlson$elm_text_editor$Editor$Config$DoWrap, state),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'ToggleHelp':
				if (state.showHelp) {
					var _v52 = A3($jxxcarlson$elm_text_editor$Editor$Update$load, $jxxcarlson$elm_text_editor$Editor$Config$DontWrap, $jxxcarlson$elm_text_editor$Editor$Strings$help, state);
					var newState = _v52.a;
					var newBuffer = _v52.b;
					return _Utils_Tuple3(
						_Utils_update(
							newState,
							{savedBuffer: buffer, showHelp: false}),
						newBuffer,
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple3(
						_Utils_update(
							state,
							{
								savedBuffer: $jxxcarlson$elm_text_editor$Buffer$fromString(''),
								showHelp: true
							}),
						state.savedBuffer,
						$elm$core$Platform$Cmd$none);
				}
			case 'ToggleInfoPanel':
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{showInfoPanel: !state.showInfoPanel}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'ToggleGoToLinePanel':
				return state.showGoToLinePanel ? _Utils_Tuple3(
					_Utils_update(
						state,
						{showGoToLinePanel: false}),
					buffer,
					$jxxcarlson$elm_text_editor$Editor$Update$blur('line-number-input')) : _Utils_Tuple3(
					_Utils_update(
						state,
						{showGoToLinePanel: true}),
					buffer,
					$jxxcarlson$elm_text_editor$Editor$Update$focus('line-number-input'));
			case 'ToggleSearchPanel':
				return state.showSearchPanel ? _Utils_Tuple3(
					_Utils_update(
						state,
						{showSearchPanel: false}),
					buffer,
					$jxxcarlson$elm_text_editor$Editor$Update$blur('editor-search-box')) : _Utils_Tuple3(
					_Utils_update(
						state,
						{showSearchPanel: true}),
					buffer,
					$jxxcarlson$elm_text_editor$Editor$Update$focus('editor-search-box'));
			case 'ToggleReplacePanel':
				return state.showSearchPanel ? _Utils_Tuple3(
					_Utils_update(
						state,
						{canReplace: false, showSearchPanel: false}),
					buffer,
					$jxxcarlson$elm_text_editor$Editor$Update$blur('editor-search-box')) : _Utils_Tuple3(
					_Utils_update(
						state,
						{canReplace: true, showSearchPanel: true}),
					buffer,
					$jxxcarlson$elm_text_editor$Editor$Update$focus('editor-search-box'));
			case 'OpenReplaceField':
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{canReplace: true}),
					buffer,
					$elm$core$Platform$Cmd$none);
			case 'DebounceMsg':
				var msg_ = msg.a;
				var _v53 = A4(
					$jinjor$elm_debounce$Debounce$update,
					$jxxcarlson$elm_text_editor$Editor$Update$debounceConfig,
					$jinjor$elm_debounce$Debounce$takeLast($jxxcarlson$elm_text_editor$Editor$Update$unload),
					msg_,
					state.debounce);
				var debounce = _v53.a;
				var cmd = _v53.b;
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{debounce: debounce}),
					buffer,
					cmd);
			default:
				var str = msg.a;
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{debounce: state.debounce}),
					buffer,
					$elm$core$Platform$Cmd$none);
		}
	});
var $jxxcarlson$elm_text_editor$Editor$update = F2(
	function (msg, _v0) {
		var data = _v0.a;
		var _v1 = A3($jxxcarlson$elm_text_editor$Editor$Update$update, data.buffer, msg, data.state);
		var is = _v1.a;
		var b = _v1.b;
		var cmd = _v1.c;
		return _Utils_Tuple2(
			$jxxcarlson$elm_text_editor$Editor$Editor(
				{buffer: b, state: is}),
			cmd);
	});
var $author$project$Main$updateEditor = F3(
	function (model, editor_, cmd_) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{editor: editor_}),
			A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorMsg, cmd_));
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'EditorMsg':
				var editorMsg = msg.a;
				var _v1 = A2($jxxcarlson$elm_text_editor$Editor$update, editorMsg, model.editor);
				var newEditor = _v1.a;
				var editorCmd = _v1.b;
				var sourcetext = $elm$core$Maybe$Just(
					$jxxcarlson$elm_text_editor$Editor$getSource(newEditor));
				switch (editorMsg.$) {
					case 'Insert':
						var str = editorMsg.a;
						return A3($author$project$Main$updateEditor, model, newEditor, editorCmd);
					case 'Unload':
						var str = editorMsg.a;
						return A3($author$project$Main$syncWithEditor, model, newEditor, editorCmd);
					case 'WrapAll':
						return A3($author$project$Main$syncWithEditor, model, newEditor, editorCmd);
					case 'Cut':
						return A3($author$project$Main$syncWithEditor, model, newEditor, editorCmd);
					case 'Paste':
						return A3($author$project$Main$syncWithEditor, model, newEditor, editorCmd);
					case 'Undo':
						return A3($author$project$Main$syncWithEditor, model, newEditor, editorCmd);
					case 'Redo':
						return A3($author$project$Main$syncWithEditor, model, newEditor, editorCmd);
					case 'RemoveGroupAfter':
						return A3($author$project$Main$syncWithEditor, model, newEditor, editorCmd);
					case 'RemoveGroupBefore':
						return A3($author$project$Main$syncWithEditor, model, newEditor, editorCmd);
					case 'Indent':
						return A3($author$project$Main$syncWithEditor, model, newEditor, editorCmd);
					case 'Deindent':
						return A3($author$project$Main$syncWithEditor, model, newEditor, editorCmd);
					case 'Clear':
						return A3($author$project$Main$syncWithEditor, model, newEditor, editorCmd);
					case 'WrapSelection':
						return A3($author$project$Main$syncWithEditor, model, newEditor, editorCmd);
					default:
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{currentString: sourcetext, editor: newEditor}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorMsg, editorCmd));
				}
			case 'InputChange':
				var str = msg.a;
				var newSequence = $author$project$SequenceDiagram$Parser$parse(str);
				var newModel = _Utils_update(
					model,
					{
						currentString: $elm$core$Maybe$Just(str),
						sequence: newSequence
					});
				return _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
			case 'ChangeAlwaysReturn':
				var newVal = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{alwaysReturn: newVal}),
					$elm$core$Platform$Cmd$none);
			case 'ChangeIncludeTheme':
				var newVal = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{includeTheme: newVal}),
					$elm$core$Platform$Cmd$none);
			default:
				var newEditor = A3($jxxcarlson$elm_text_editor$Editor$load, $jxxcarlson$elm_text_editor$Editor$Config$DontWrap, $author$project$Main$example, model.editor);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							currentString: $elm$core$Maybe$Just($author$project$Main$example),
							editor: newEditor,
							sequence: $author$project$SequenceDiagram$Parser$parse($author$project$Main$example)
						}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Main$main = $elm$browser$Browser$document(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$document});
_Platform_export({'Main':{'init':$author$project$Main$main($elm$json$Json$Decode$value)(0)}});}(this));