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
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var icons_vue_1 = require("@element-plus/icons-vue");
var route = (0, vue_router_1.useRoute)();
var activeRoute = (0, vue_1.computed)(function () { return route.path; });
var __VLS_ctx = __assign(__assign({}, {}), {});
var ___VLS_components;
var ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "common-layout" }));
/** @type {__VLS_StyleScopedClasses['common-layout']} */ ;
var __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elContainer | typeof ___VLS_components.ElContainer} */
elContainer;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_5 = __VLS_3.slots.default;
var __VLS_6;
/** @ts-ignore @type {typeof ___VLS_components.elHeader | typeof ___VLS_components.ElHeader} */
elHeader;
// @ts-ignore
var __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6(__assign({ class: "app-header" })));
var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([__assign({ class: "app-header" })], __VLS_functionalComponentArgsRest(__VLS_7), false));
/** @type {__VLS_StyleScopedClasses['app-header']} */ ;
var __VLS_11 = __VLS_9.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "logo" }));
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "header-actions" }));
/** @type {__VLS_StyleScopedClasses['header-actions']} */ ;
var __VLS_9;
var __VLS_12;
/** @ts-ignore @type {typeof ___VLS_components.elMain | typeof ___VLS_components.ElMain} */
elMain;
// @ts-ignore
var __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12(__assign({ class: "app-main" })));
var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([__assign({ class: "app-main" })], __VLS_functionalComponentArgsRest(__VLS_13), false));
/** @type {__VLS_StyleScopedClasses['app-main']} */ ;
var __VLS_17 = __VLS_15.slots.default;
var __VLS_18;
/** @ts-ignore @type {typeof ___VLS_components.routerView | typeof ___VLS_components.RouterView} */
routerView;
// @ts-ignore
var __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
var __VLS_20 = __VLS_19.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_19), false));
var __VLS_15;
var __VLS_23;
/** @ts-ignore @type {typeof ___VLS_components.elFooter | typeof ___VLS_components.ElFooter} */
elFooter;
// @ts-ignore
var __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23(__assign({ class: "app-footer mobile-only" })));
var __VLS_25 = __VLS_24.apply(void 0, __spreadArray([__assign({ class: "app-footer mobile-only" })], __VLS_functionalComponentArgsRest(__VLS_24), false));
/** @type {__VLS_StyleScopedClasses['app-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-only']} */ ;
var __VLS_28 = __VLS_26.slots.default;
var __VLS_29;
/** @ts-ignore @type {typeof ___VLS_components.elMenu | typeof ___VLS_components.ElMenu} */
elMenu;
// @ts-ignore
var __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29(__assign({ defaultActive: (__VLS_ctx.activeRoute), mode: "horizontal", ellipsis: (false), router: true }, { class: "mobile-nav" })));
var __VLS_31 = __VLS_30.apply(void 0, __spreadArray([__assign({ defaultActive: (__VLS_ctx.activeRoute), mode: "horizontal", ellipsis: (false), router: true }, { class: "mobile-nav" })], __VLS_functionalComponentArgsRest(__VLS_30), false));
/** @type {__VLS_StyleScopedClasses['mobile-nav']} */ ;
var __VLS_34 = __VLS_32.slots.default;
var __VLS_35;
/** @ts-ignore @type {typeof ___VLS_components.elMenuItem | typeof ___VLS_components.ElMenuItem} */
elMenuItem;
// @ts-ignore
var __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    index: "/",
}));
var __VLS_37 = __VLS_36.apply(void 0, __spreadArray([{
        index: "/",
    }], __VLS_functionalComponentArgsRest(__VLS_36), false));
var __VLS_40 = __VLS_38.slots.default;
var __VLS_41;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
var __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({}));
var __VLS_43 = __VLS_42.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_42), false));
var __VLS_46 = __VLS_44.slots.default;
var __VLS_47;
/** @ts-ignore @type {typeof ___VLS_components.House} */
icons_vue_1.House;
// @ts-ignore
var __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({}));
var __VLS_49 = __VLS_48.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_48), false));
// @ts-ignore
[activeRoute,];
var __VLS_44;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
// @ts-ignore
[];
var __VLS_38;
var __VLS_52;
/** @ts-ignore @type {typeof ___VLS_components.elMenuItem | typeof ___VLS_components.ElMenuItem} */
elMenuItem;
// @ts-ignore
var __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    index: "/timeline",
}));
var __VLS_54 = __VLS_53.apply(void 0, __spreadArray([{
        index: "/timeline",
    }], __VLS_functionalComponentArgsRest(__VLS_53), false));
var __VLS_57 = __VLS_55.slots.default;
var __VLS_58;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
var __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({}));
var __VLS_60 = __VLS_59.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_59), false));
var __VLS_63 = __VLS_61.slots.default;
var __VLS_64;
/** @ts-ignore @type {typeof ___VLS_components.Timer} */
icons_vue_1.Timer;
// @ts-ignore
var __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({}));
var __VLS_66 = __VLS_65.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_65), false));
// @ts-ignore
[];
var __VLS_61;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
// @ts-ignore
[];
var __VLS_55;
var __VLS_69;
/** @ts-ignore @type {typeof ___VLS_components.elMenuItem | typeof ___VLS_components.ElMenuItem} */
elMenuItem;
// @ts-ignore
var __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
    index: "/statistics",
}));
var __VLS_71 = __VLS_70.apply(void 0, __spreadArray([{
        index: "/statistics",
    }], __VLS_functionalComponentArgsRest(__VLS_70), false));
var __VLS_74 = __VLS_72.slots.default;
var __VLS_75;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
var __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({}));
var __VLS_77 = __VLS_76.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_76), false));
var __VLS_80 = __VLS_78.slots.default;
var __VLS_81;
/** @ts-ignore @type {typeof ___VLS_components.PieChart} */
icons_vue_1.PieChart;
// @ts-ignore
var __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({}));
var __VLS_83 = __VLS_82.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_82), false));
// @ts-ignore
[];
var __VLS_78;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
// @ts-ignore
[];
var __VLS_72;
var __VLS_86;
/** @ts-ignore @type {typeof ___VLS_components.elMenuItem | typeof ___VLS_components.ElMenuItem} */
elMenuItem;
// @ts-ignore
var __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
    index: "/user",
}));
var __VLS_88 = __VLS_87.apply(void 0, __spreadArray([{
        index: "/user",
    }], __VLS_functionalComponentArgsRest(__VLS_87), false));
var __VLS_91 = __VLS_89.slots.default;
var __VLS_92;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
var __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({}));
var __VLS_94 = __VLS_93.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_93), false));
var __VLS_97 = __VLS_95.slots.default;
var __VLS_98;
/** @ts-ignore @type {typeof ___VLS_components.User} */
icons_vue_1.User;
// @ts-ignore
var __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({}));
var __VLS_100 = __VLS_99.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_99), false));
// @ts-ignore
[];
var __VLS_95;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
// @ts-ignore
[];
var __VLS_89;
// @ts-ignore
[];
var __VLS_32;
// @ts-ignore
[];
var __VLS_26;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
