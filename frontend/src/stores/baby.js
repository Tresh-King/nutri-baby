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
exports.useBabyStore = void 0;
var pinia_1 = require("pinia");
var vue_1 = require("vue");
exports.useBabyStore = (0, pinia_1.defineStore)('baby', function () {
    // Mock Initial Data
    var babyList = (0, vue_1.ref)([
        {
            babyId: 'b1',
            name: 'Baby A',
            nickname: 'Little A',
            gender: 'male',
            birthDate: '2024-01-01',
            avatarUrl: '',
            isDefault: true
        },
        {
            babyId: 'b2',
            name: 'Baby B',
            nickname: 'Little B',
            gender: 'female',
            birthDate: '2024-02-02',
            avatarUrl: '',
            isDefault: false
        }
    ]);
    var currentBaby = (0, vue_1.ref)(babyList.value[0] || null);
    var setCurrentBaby = function (id) {
        var baby = babyList.value.find(function (b) { return b.babyId === id; });
        if (baby) {
            currentBaby.value = baby;
        }
    };
    var addBaby = function (baby) {
        var newBaby = __assign(__assign({}, baby), { babyId: "b".concat(Date.now()) });
        babyList.value.push(newBaby);
        if (!currentBaby.value) {
            currentBaby.value = newBaby;
        }
        return newBaby;
    };
    var updateBaby = function (id, updates) {
        var _a;
        var index = babyList.value.findIndex(function (b) { return b.babyId === id; });
        if (index !== -1) {
            // Ensure babyId is preserved and not overwritten by undefined
            var updatedBaby = __assign(__assign({}, babyList.value[index]), updates);
            if (!updatedBaby.babyId)
                updatedBaby.babyId = id; // Fallback
            babyList.value[index] = updatedBaby;
            if (((_a = currentBaby.value) === null || _a === void 0 ? void 0 : _a.babyId) === id) {
                currentBaby.value = babyList.value[index];
            }
        }
    };
    var deleteBaby = function (id) {
        babyList.value = babyList.value.filter(function (b) { return b.babyId !== id; });
        if (currentBaby.value && currentBaby.value.babyId === id) {
            currentBaby.value = babyList.value[0] || null;
        }
    };
    return {
        babyList: babyList,
        currentBaby: currentBaby,
        setCurrentBaby: setCurrentBaby,
        addBaby: addBaby,
        updateBaby: updateBaby,
        deleteBaby: deleteBaby
    };
});
