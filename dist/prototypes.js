"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const setProto = (base, name, callback) => {
    if (base.prototype[name] !== undefined)
        return null;
    base.prototype[name] = callback;
    Object.defineProperty(base.prototype, name, { enumerable: false });
};

setProto(Array, 'last', function () {
    return this.length === 0 ? undefined : this[this.length - 1];
});
setProto(Array, 'unique', function () {
    return this.filter((item, pos) => this.indexOf(item) === pos);
});
setProto(Array, 'toObject', function () {
    const field = arguments[0];
    return this.reduce((result, item, index) => {
        const key = field ? item[field] : index;
        result[key] = item;
        return result;
    }, {});
});
setProto(Array, 'toObjectGrouped', function () {
    return this.reduce((result, item) => {
        const key = item[arguments[0]];
        if (!result[key])
            result[key] = [];
        result[key].push(item);
        return result;
    }, {});
});
Array.create = function () {
    return Array(arguments[0] || 0).fill(arguments[1], arguments[2], arguments[3]);
};
setProto(Number, 'padStart', function () {
    return this.toString().padStart(arguments[0], arguments[1] || '0');
});
Number.isNumeric = function isNumeric(n) {
    if (n === null)
        return false;
    return !Number.isNaN(Number(n)) || Number.isFinite(n);
};
const each = (obj, cb) => {
    for (let key in obj) {
        if (!obj.hasOwnProperty(key))
            continue;
        cb(key, obj[key]);
    }
};
setProto(Object, 'objectMap', function () {
    const interactor = arguments[0];
    const arr = [];
    each(this, (key, obj) => arr.push(interactor(obj, key)));
    return arr;
});
setProto(Object, 'objectReduce', function () {
    const interactor = arguments[0];
    let newObj = arguments[1] === undefined ? {} : arguments[1];
    let index = 0;
    each(this, (key, obj) => {
        newObj = interactor(newObj, obj, key, index++);
    });
    return newObj;
});
setProto(Object, 'mergeMutable', function () {
    each(arguments, (key, obj1) => {
        each(obj1, (name, obj2) => (this[name] = obj2));
    });
    return this;
});
setProto(Object, 'objectSize', function () {
    let size = 0;
    each(this, () => size++);
    return size;
});
setProto(Object, 'toQueryString', function () {
    const queryString = [];
    each(this, (name, obj) => {
        queryString.push(name + '=' + encodeURIComponent(obj));
    });
    if (queryString.length === 0)
        return '';
    return '?' + queryString.join('&');
});
setProto(Object, 'without', function () {
    if (arguments.length === 0)
        return this;
    const args = [...arguments];
    const newObj = {};
    each(this, (name, obj) => {
        if (!args.includes(name))
            newObj[name] = obj;
    });
    return newObj;
});
setProto(String, 'pluralize', function () {
    if (this.length === 0 || arguments[0] === 1 || this.substr(-1) === 's')
        return this;
    const variants = [
        { sufixMatch: 'm', numReplace: 1, sufixReplace: 'ns' },
        { sufixMatch: 'l', numReplace: 1, sufixReplace: 'is' },
        { sufixMatch: 'r', numReplace: 0, sufixReplace: 'res' },
        { sufixMatch: 'ão', numReplace: 2, sufixReplace: 'ões' },
    ];
    const match = variants.find(({ sufixMatch }) => this.match(new RegExp(`${sufixMatch}$`)));
    if (!match)
        return this + 's';
    return this.substr(0, this.length - match.sufixMatch.length) + match.sufixReplace;
});
setProto(String, 'crop', function () {
    if (!arguments[0])
        return this;
    const length = arguments[0];
    const extension = arguments[1] === undefined ? '...' : arguments[1];
    if (this.length > length)
        return this.substr(0, length) + extension;
    return this;
});
setProto(String, 'slugify', function () {
    const strSChar = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';
    const strNoSChars = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
    const str = this.toLowerCase()
        .replace(/\n/g, ' ')
        .replace(/ +/g, ' ')
        .trim();
    let newStr = '';
    for (let i = 0; i < str.length; i++) {
        if (strSChar.indexOf(str.charAt(i)) !== -1) {
            newStr += strNoSChars.substr(strSChar.search(str.substr(i, 1)), 1);
        }
        else {
            newStr += str.substr(i, 1);
        }
    }
    return newStr.replace(/[^a-zA-Z 0-9]/g, '').replace(/[ ]/g, '-');
});
setProto(String, 'ensureSlashStart', function () {
    if (this.match(/^\//))
        return this.toString();
    return `/${this}`;
});
setProto(String, 'toCamelCase', function () {
    const upperFirstLetter = arguments[0] === true;
    return this.replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index, xxx) {
        if (index > 0 && xxx.substr(index - 1, 1) === '$')
            return match;
        return +match === 0 ? '' : match[index === 0 && !upperFirstLetter ? 'toLowerCase' : 'toUpperCase']();
    });
});
setProto(String, 'toPascalCase', function () {
    return this.toCamelCase(true);
});
setProto(String, 'toJSONObject', function () {
    try {
        return JSON.parse(this);
    }
    catch (e) {
        return null;
    }
});
exports.setProto = setProto;
