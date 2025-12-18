"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_i18n_1 = require("vue-i18n");
var messages = {
    en: {
        message: {
            hello: 'hello world'
        }
    },
    zh: {
        message: {
            hello: '你好'
        }
    }
};
var i18n = (0, vue_i18n_1.createI18n)({
    locale: 'zh',
    fallbackLocale: 'en',
    messages: messages,
});
exports.default = i18n;
