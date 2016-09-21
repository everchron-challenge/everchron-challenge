const PUSH    = '$push';
const UNSHIFT = '$unshift';
const SPLICE  = '$splice';
const SET     = '$set';
const MERGE   = '$merge';
const APPLY   = '$apply';

const COMMANDS = {
    [PUSH]    : true,
    [UNSHIFT] : true,
    [SPLICE]  : true,
    [SET]     : true,
    [MERGE]   : true,
    [APPLY]   : true,
};

function copy(x) {
    if (Array.isArray(x)) {
        return x.concat();
    } else if (x && typeof x === 'object') {
        return Object.assign(new x.constructor(), x);
    } else {
        return x;
    }
}

function hasOwnProperty(obj, prop) {
    return ({}).hasOwnProperty.call(obj, prop);
}

function update(currentState, commands) {
    var newState = copy(currentState);

    if (hasOwnProperty(commands, PUSH)) {
        for (var i = 0; i < commands[PUSH].length; i++) {
            newState.push(commands[PUSH][i]);
        };
    }

    if (hasOwnProperty(commands, UNSHIFT)) {
        for (var i = 0; i < commands[UNSHIFT].length; i++) {
            newState.unshift(commands[UNSHIFT][i]);
        };
    }

    if (hasOwnProperty(commands, SPLICE)) {
        for (var i = 0; i < commands[SPLICE].length; i++) {
            var args = commands[SPLICE][i];
            [].splice.apply(newState, args);
        };
    }

    if (hasOwnProperty(commands, SET)) {
        return commands[SET];
    }

    if (hasOwnProperty(commands, MERGE)) {
        Object.assign(newState, commands[MERGE]);
    }

    if (hasOwnProperty(commands, APPLY)) {
        newState = commands[APPLY](newState);
    }

    for (var c in commands) {
        if (!(hasOwnProperty(COMMANDS, c) && COMMANDS[c])) {
            newState[c] = update(newState[c], commands[c]);
        }
    }

    return newState;
};

module.exports = update;
