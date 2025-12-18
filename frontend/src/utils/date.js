"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAge = exports.formatRelativeTime = exports.formatDate = void 0;
var dayjs_1 = require("dayjs");
var relativeTime_1 = require("dayjs/plugin/relativeTime");
require("dayjs/locale/zh-cn");
dayjs_1.default.extend(relativeTime_1.default);
dayjs_1.default.locale('zh-cn');
var formatDate = function (date, format) {
    if (format === void 0) { format = 'YYYY-MM-DD HH:mm:ss'; }
    return (0, dayjs_1.default)(date).format(format);
};
exports.formatDate = formatDate;
var formatRelativeTime = function (date) {
    return (0, dayjs_1.default)(date).fromNow();
};
exports.formatRelativeTime = formatRelativeTime;
var calculateAge = function (birthDate) {
    var birth = (0, dayjs_1.default)(birthDate);
    var now = (0, dayjs_1.default)();
    var diffMonths = now.diff(birth, 'month');
    if (diffMonths < 1) {
        var diffDays = now.diff(birth, 'day');
        return "".concat(diffDays, "\u5929");
    }
    else if (diffMonths < 12) {
        return "".concat(diffMonths, "\u4E2A\u6708");
    }
    else {
        var years = Math.floor(diffMonths / 12);
        var months = diffMonths % 12;
        return "".concat(years, "\u5C81").concat(months > 0 ? months + '个月' : '');
    }
};
exports.calculateAge = calculateAge;
