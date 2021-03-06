var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
/**
 * storage存储
 * @date 2020-07-06
 * @author phinney
 * @version 1.0
 */
var Storage = /** @class */ (function () {
    function Storage(proto) {
        if (![localStorage, sessionStorage].includes(proto)) {
            throw new Error('Arguments must be localStorage or sessionStorage!');
        }
        this.proto = proto;
    }
    Object.defineProperty(Storage.prototype, "size", {
        // 存储数据长度
        get: function () {
            return this.proto.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Storage.prototype, "keys", {
        // 存储数据名集合
        get: function () {
            return Object.keys(this.proto);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Storage.prototype, "values", {
        // 存储数据值集合
        get: function () {
            var _this = this;
            return Object.keys(this.proto).map(function (key) { return _this.get(key); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Storage.prototype, "entries", {
        // 存储数据键值对集合
        get: function () {
            var _this = this;
            return Object.keys(this.proto).map(function (key) { return [key, _this.get(key)]; });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 设置数据存储
     * @param key 数据名
     * @param val 数据值
     */
    Storage.prototype.set = function (key, val) {
        this.proto.setItem(key, JSON.stringify(val));
        return this;
    };
    /**
     * 获取数据存储
     * @param key 数据名
     */
    Storage.prototype.get = function (key) {
        var result = this.proto.getItem(key);
        try {
            result = JSON.parse(result);
        }
        catch (_a) { }
        return result;
    };
    /**
     * 是否包含某个数据存储
     * @param key 数据名
     */
    Storage.prototype.has = function (key) {
        return Reflect.has(this.proto, key);
    };
    /**
     * 删除数据存储
     * @param key 数据名
     */
    Storage.prototype.delete = function (key) {
        this.proto.removeItem(key);
    };
    /**
     * 清空数据存储
     * @param except 需要保留的数据存储
     */
    Storage.prototype.clear = function (except) {
        var _this = this;
        if (except) {
            this.keys.forEach(function (key) {
                if (!except.includes(key)) {
                    _this.delete(key);
                }
            });
        }
        else {
            this.proto.clear();
        }
    };
    /**
     * 数据存储循环
     * @param cb 回调函数
     */
    Storage.prototype.forEach = function (cb) {
        this.entries.forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            cb(key, value);
        });
    };
    return Storage;
}());
export { Storage };
// 长期本地存储
export var local = new Storage(localStorage);
// 短期本地存储
export var session = new Storage(sessionStorage);
