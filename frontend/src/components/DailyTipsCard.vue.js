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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var __VLS_props = defineProps({
    tips: {
        type: Array,
        default: function () { return []; }
    },
    maxDisplay: {
        type: Number,
        default: 10
    }
});
var __VLS_emit = defineEmits(['tip-click']);
var getPriorityType = function (priority) {
    switch (priority) {
        case 'high': return 'danger';
        case 'medium': return 'warning';
        default: return 'info';
    }
};
var __VLS_ctx = __assign(__assign(__assign(__assign(__assign({}, {}), {}), {}), {}), {});
var ___VLS_components;
var ___VLS_directives;
var __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ class: "daily-tips-card" }, { shadow: "hover" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ class: "daily-tips-card" }, { shadow: "hover" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['daily-tips-card']} */ ;
var __VLS_6 = __VLS_3.slots.default;
{
    var __VLS_7 = __VLS_3.slots.header;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "card-header" }));
    /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
var _loop_1 = function (tip) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.$emit('tip-click', tip);
            // @ts-ignore
            [tips, $emit,];
        } }, { key: (tip.id) }), { class: "tip-item" }));
    /** @type {__VLS_StyleScopedClasses['tip-item']} */ ;
    var __VLS_8 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elTag | typeof ___VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    var __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(__assign({ type: (__VLS_ctx.getPriorityType(tip.priority)), size: "small" }, { class: "tip-type" })));
    var __VLS_10 = __VLS_9.apply(void 0, __spreadArray([__assign({ type: (__VLS_ctx.getPriorityType(tip.priority)), size: "small" }, { class: "tip-type" })], __VLS_functionalComponentArgsRest(__VLS_9), false));
    /** @type {__VLS_StyleScopedClasses['tip-type']} */ ;
    var __VLS_13 = __VLS_11.slots.default;
    (tip.type);
    // @ts-ignore
    [getPriorityType,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "tip-title" }));
    /** @type {__VLS_StyleScopedClasses['tip-title']} */ ;
    (tip.title);
    // @ts-ignore
    [];
};
var __VLS_11;
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.tips)); _i < _a.length; _i++) {
    var tip = _a[_i][0];
    _loop_1(tip);
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    emits: {},
    props: {
        tips: {
            type: Array,
            default: function () { return []; }
        },
        maxDisplay: {
            type: Number,
            default: 10
        }
    },
});
exports.default = {};
