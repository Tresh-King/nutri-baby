"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRecordStore = void 0;
var pinia_1 = require("pinia");
var vue_1 = require("vue");
exports.useRecordStore = (0, pinia_1.defineStore)('record', function () {
    // Single list for all records
    var records = (0, vue_1.ref)([]);
    var addRecord = function (record) {
        var newRecord = __assign(__assign({}, record), { id: "r".concat(Date.now()) });
        records.value.unshift(newRecord);
        return newRecord;
    };
    var getRecentRecord = function (babyId, type) {
        // This requires a 'category' field or inferring from type.
        // Let's simplify and just append to the list.
        return records.value.find(function (r) { return r.babyId === babyId; });
    };
    return {
        records: records,
        addRecord: addRecord,
        getRecentRecord: getRecentRecord
    };
});
