"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserStore = void 0;
var pinia_1 = require("pinia");
var vue_1 = require("vue");
exports.useUserStore = (0, pinia_1.defineStore)('user', function () {
    var isLoggedIn = (0, vue_1.ref)(true);
    var userInfo = (0, vue_1.ref)({
        id: 'u1',
        nickname: 'Test Parent',
        avatar: ''
    });
    var login = function () {
        isLoggedIn.value = true;
    };
    var logout = function () {
        isLoggedIn.value = false;
    };
    return {
        isLoggedIn: isLoggedIn,
        userInfo: userInfo,
        login: login,
        logout: logout
    };
});
