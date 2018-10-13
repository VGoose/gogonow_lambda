
function findClosestIndex(x, arr, start, end) {
	if(typeof x !== 'number') {
		throw new Error('First argument must be a number.');
	}
	if(!Array.isArray(arr) || arr.length === 0) {
		throw new Error('Second argument must be a non-empty, sorted array.');
	}
	if(typeof start !== 'number') {
		start = null;
	} 
	if(typeof end !== 'number') {
		end = null;
	}
	let _end = end || arr.length;
	let _start = start || 0;
	var index = Math.floor((_end + _start) / 2)
	let getVal = (obj) => {
		return obj.eDist;
	}
	let value = getVal(arr[index])

	if (value === x){
		return index;
	}
	if((_end - _start) === 1) {
		index = diff(getVal(arr[_start]), x) < diff(getVal(arr[_end]), x) ? 
			_start : _end;
		return index;

	}
	if(value < x) {
		_start = index;
		return findClosestIndex(x, arr, _start, _end);
	}else if(value > x) {
		_end = index;
		return findClosestIndex(x, arr, _start, _end);
	}
}
function diff(a, b) {
	return Math.abs(a - b);
}

function getEuclideanDist(a, b) {
	let _a = parseFloat(a),
		_b = parseFloat(b);
	if(!_a || !b) {
		throw new Error('Both arguments must be numbers');
	}

	let result = Math.sqrt(_a**2 + _b**2);
	return result;
}

module.exports = {
	getEuclideanDist,
	diff
}