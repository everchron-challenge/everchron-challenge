function throttle(func, delay) {
    var args;
    var timer;
    var lastTime;
    return function() {
        if (!lastTime || new Date() - lastTime >= delay) {
            func.apply(this, arguments);
        } else if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, delay - (new Date() - lastTime) + 1);
        }
        args = arguments;
        lastTime = new Date();
    }
};

module.exports = throttle;
