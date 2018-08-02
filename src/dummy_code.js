module.exports = `function PermutationsWithRepetition(n, as) {
	this.n = n;
	this.as = as;
}

PermutationsWithRepetition.prototype.init = function () {
	return this.as.length > 0 ? (
		this.fold(this.curry(this.cartesianProduct)(this.as), this.replicate(this.n, this.as))
	) : [];
};

PermutationsWithRepetition.prototype.cartesianProduct = function (xs, ys) {
	return [].concat.apply([], xs.map(function (x) {
		return [].concat.apply([], ys.map(function (y) {
			return [
				[x].concat(y)
			];
		}));
	}));
};

PermutationsWithRepetition.prototype.fold = function (f, xs) {
	return (xs.length > 0) ?
		xs.slice(1)
		.reduce(f, xs[0]) : [];
}
PermutationsWithRepetition.prototype.replicate = function (n, a) {
	var v = [a],
		o = [];
	if (n < 1) return o;
	while (n > 1) {
		if (n & 1) o = o.concat(v);
		n >>= 1;
		v = v.concat(v);
	}
	return o.concat(v);
};

PermutationsWithRepetition.prototype.curry = function (f) {
	return function (a) {
		return function (b) {
			return f(a, b);
		};
	};
};

function test(x) {
	return JSON.stringify(x);
}; //, null, 2);

const pwr = new PermutationsWithRepetition(2, [1, 2, 3])

console.log("TEST: " + test(pwr.init()));
//--> [[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[3,1],[3,2],[3,3]]`