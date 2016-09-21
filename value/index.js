function isFunction(func) {
    return func && Object.prototype.toString.call(func) == '[object Function]';
}

function value(v) {
    if (isFunction(v)) {
        return value(v());
    } else {
        return v;
    }
};

module.exports = value;

