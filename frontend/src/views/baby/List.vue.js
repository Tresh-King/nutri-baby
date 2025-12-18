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
var baby_1 = require("@/stores/baby");
var date_1 = require("@/utils/date");
var icons_vue_1 = require("@element-plus/icons-vue");
var element_plus_1 = require("element-plus");
var router = (0, vue_router_1.useRouter)();
var babyStore = (0, baby_1.useBabyStore)();
var babyList = (0, vue_1.computed)(function () { return babyStore.babyList; });
var currentBabyId = (0, vue_1.computed)(function () { var _a; return (_a = babyStore.currentBaby) === null || _a === void 0 ? void 0 : _a.babyId; });
var isCurrentBaby = function (id) { return currentBabyId.value === id; };
var goToAdd = function () { return router.push('/baby/edit'); };
var handleSelect = function (id) {
    babyStore.setCurrentBaby(id);
    element_plus_1.ElMessage.success('Switched current baby');
    // Optional: redirect back to home
    // router.push('/') 
};
var handleEdit = function (id) {
    router.push("/baby/edit/".concat(id));
};
var handleDelete = function (id) {
    element_plus_1.ElMessageBox.confirm('Are you sure you want to delete this baby profile? This cannot be undone.', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
    }).then(function () {
        babyStore.deleteBaby(id);
        element_plus_1.ElMessage.success('Deleted successfully');
    }).catch(function () { });
};
var handleInvite = function (id) {
    element_plus_1.ElMessage.info("Invite feature for baby ".concat(id, " coming soon"));
};
var __VLS_ctx = __assign(__assign({}, {}), {});
var ___VLS_components;
var ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "baby-list-page" }));
/** @type {__VLS_StyleScopedClasses['baby-list-page']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "page-header" }));
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
var __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ 'onClick': {} }, { type: "primary" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "primary" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_5;
var __VLS_6 = ({ click: {} },
    { onClick: (__VLS_ctx.goToAdd) });
var __VLS_7 = __VLS_3.slots.default;
var __VLS_8;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
var __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
var __VLS_10 = __VLS_9.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_9), false));
var __VLS_13 = __VLS_11.slots.default;
var __VLS_14;
/** @ts-ignore @type {typeof ___VLS_components.Plus} */
icons_vue_1.Plus;
// @ts-ignore
var __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({}));
var __VLS_16 = __VLS_15.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_15), false));
// @ts-ignore
[goToAdd,];
var __VLS_11;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
var __VLS_19;
/** @ts-ignore @type {typeof ___VLS_components.elRow | typeof ___VLS_components.ElRow} */
elRow;
// @ts-ignore
var __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    gutter: (20),
}));
var __VLS_21 = __VLS_20.apply(void 0, __spreadArray([{
        gutter: (20),
    }], __VLS_functionalComponentArgsRest(__VLS_20), false));
var __VLS_24 = __VLS_22.slots.default;
var _loop_1 = function (baby) {
    var __VLS_25 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elCol | typeof ___VLS_components.ElCol} */
    elCol;
    // @ts-ignore
    var __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        xs: (24),
        sm: (12),
        md: (8),
        key: (baby.babyId),
    }));
    var __VLS_27 = __VLS_26.apply(void 0, __spreadArray([{
            xs: (24),
            sm: (12),
            md: (8),
            key: (baby.babyId),
        }], __VLS_functionalComponentArgsRest(__VLS_26), false));
    var __VLS_30 = __VLS_28.slots.default;
    var __VLS_31 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
    elCard;
    // @ts-ignore
    var __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31(__assign(__assign({ class: "baby-card" }, { class: ({ 'active-card': __VLS_ctx.isCurrentBaby(baby.babyId) }) }), { shadow: "hover" })));
    var __VLS_33 = __VLS_32.apply(void 0, __spreadArray([__assign(__assign({ class: "baby-card" }, { class: ({ 'active-card': __VLS_ctx.isCurrentBaby(baby.babyId) }) }), { shadow: "hover" })], __VLS_functionalComponentArgsRest(__VLS_32), false));
    /** @type {__VLS_StyleScopedClasses['baby-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['active-card']} */ ;
    var __VLS_36 = __VLS_34.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.handleSelect(baby.babyId);
            // @ts-ignore
            [babyList, isCurrentBaby, handleSelect,];
        } }, { class: "card-content" }));
    /** @type {__VLS_StyleScopedClasses['card-content']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "baby-avatar" }));
    /** @type {__VLS_StyleScopedClasses['baby-avatar']} */ ;
    var __VLS_37 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elAvatar | typeof ___VLS_components.ElAvatar} */
    elAvatar;
    // @ts-ignore
    var __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
        size: (60),
        src: (baby.avatarUrl || ''),
        icon: (__VLS_ctx.UserFilled),
    }));
    var __VLS_39 = __VLS_38.apply(void 0, __spreadArray([{
            size: (60),
            src: (baby.avatarUrl || ''),
            icon: (__VLS_ctx.UserFilled),
        }], __VLS_functionalComponentArgsRest(__VLS_38), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "baby-info" }));
    /** @type {__VLS_StyleScopedClasses['baby-info']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "name-row" }));
    /** @type {__VLS_StyleScopedClasses['name-row']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "name" }));
    /** @type {__VLS_StyleScopedClasses['name']} */ ;
    (baby.name);
    if (baby.nickname) {
        var __VLS_42 = void 0;
        /** @ts-ignore @type {typeof ___VLS_components.elTag | typeof ___VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        var __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
            size: "small",
        }));
        var __VLS_44 = __VLS_43.apply(void 0, __spreadArray([{
                size: "small",
            }], __VLS_functionalComponentArgsRest(__VLS_43), false));
        var __VLS_47 = __VLS_45.slots.default;
        (baby.nickname);
        // @ts-ignore
        [icons_vue_1.UserFilled,];
    }
    if (baby.isDefault) {
        var __VLS_48 = void 0;
        /** @ts-ignore @type {typeof ___VLS_components.elTag | typeof ___VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        var __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
            size: "small",
            type: "warning",
        }));
        var __VLS_50 = __VLS_49.apply(void 0, __spreadArray([{
                size: "small",
                type: "warning",
            }], __VLS_functionalComponentArgsRest(__VLS_49), false));
        var __VLS_53 = __VLS_51.slots.default;
        // @ts-ignore
        [];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "meta-row" }));
    /** @type {__VLS_StyleScopedClasses['meta-row']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (baby.gender === 'male' ? 'Boy' : 'Girl');
    var __VLS_54 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elDivider | typeof ___VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    var __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
        direction: "vertical",
    }));
    var __VLS_56 = __VLS_55.apply(void 0, __spreadArray([{
            direction: "vertical",
        }], __VLS_functionalComponentArgsRest(__VLS_55), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.calculateAge(baby.birthDate));
    if (__VLS_ctx.isCurrentBaby(baby.babyId)) {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "check-icon" }));
        /** @type {__VLS_StyleScopedClasses['check-icon']} */ ;
        var __VLS_59 = void 0;
        /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
        elIcon;
        // @ts-ignore
        var __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
            color: "#67C23A",
            size: (24),
        }));
        var __VLS_61 = __VLS_60.apply(void 0, __spreadArray([{
                color: "#67C23A",
                size: (24),
            }], __VLS_functionalComponentArgsRest(__VLS_60), false));
        var __VLS_64 = __VLS_62.slots.default;
        var __VLS_65 = void 0;
        /** @ts-ignore @type {typeof ___VLS_components.CircleCheckFilled} */
        icons_vue_1.CircleCheckFilled;
        // @ts-ignore
        var __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({}));
        var __VLS_67 = __VLS_66.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_66), false));
        // @ts-ignore
        [isCurrentBaby, date_1.calculateAge,];
    }
    var __VLS_70 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elDivider | typeof ___VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    var __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70(__assign({ class: "card-divider" })));
    var __VLS_72 = __VLS_71.apply(void 0, __spreadArray([__assign({ class: "card-divider" })], __VLS_functionalComponentArgsRest(__VLS_71), false));
    /** @type {__VLS_StyleScopedClasses['card-divider']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "card-actions" }));
    /** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
    var __VLS_75 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elButtonGroup | typeof ___VLS_components.ElButtonGroup} */
    elButtonGroup;
    // @ts-ignore
    var __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({}));
    var __VLS_77 = __VLS_76.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_76), false));
    var __VLS_80 = __VLS_78.slots.default;
    var __VLS_81 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    var __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81(__assign({ 'onClick': {} }, { size: "small", icon: (__VLS_ctx.Edit) })));
    var __VLS_83 = __VLS_82.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { size: "small", icon: (__VLS_ctx.Edit) })], __VLS_functionalComponentArgsRest(__VLS_82), false));
    var __VLS_86 = void 0;
    var __VLS_87 = ({ click: {} },
        { onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.handleEdit(baby.babyId);
                // @ts-ignore
                [icons_vue_1.Edit, handleEdit,];
            } });
    var __VLS_88 = __VLS_84.slots.default;
    // @ts-ignore
    [];
    var __VLS_89 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    var __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89(__assign({ 'onClick': {} }, { size: "small", icon: (__VLS_ctx.Delete), type: "danger", plain: true })));
    var __VLS_91 = __VLS_90.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { size: "small", icon: (__VLS_ctx.Delete), type: "danger", plain: true })], __VLS_functionalComponentArgsRest(__VLS_90), false));
    var __VLS_94 = void 0;
    var __VLS_95 = ({ click: {} },
        { onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.handleDelete(baby.babyId);
                // @ts-ignore
                [icons_vue_1.Delete, handleDelete,];
            } });
    var __VLS_96 = __VLS_92.slots.default;
    // @ts-ignore
    [];
    var __VLS_97 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    var __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97(__assign({ 'onClick': {} }, { size: "small", icon: (__VLS_ctx.Share), plain: true })));
    var __VLS_99 = __VLS_98.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { size: "small", icon: (__VLS_ctx.Share), plain: true })], __VLS_functionalComponentArgsRest(__VLS_98), false));
    var __VLS_102 = void 0;
    var __VLS_103 = ({ click: {} },
        { onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.handleInvite(baby.babyId);
                // @ts-ignore
                [icons_vue_1.Share, handleInvite,];
            } });
    var __VLS_104 = __VLS_100.slots.default;
    // @ts-ignore
    [];
    // @ts-ignore
    [];
    // @ts-ignore
    [];
    // @ts-ignore
    [];
    // @ts-ignore
    [];
};
var __VLS_45, __VLS_51, __VLS_62, __VLS_84, __VLS_85, __VLS_92, __VLS_93, __VLS_100, __VLS_101, __VLS_78, __VLS_34, __VLS_28;
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.babyList)); _i < _a.length; _i++) {
    var baby = _a[_i][0];
    _loop_1(baby);
}
// @ts-ignore
[];
var __VLS_22;
if (__VLS_ctx.babyList.length === 0) {
    var __VLS_105 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elEmpty | typeof ___VLS_components.ElEmpty} */
    elEmpty;
    // @ts-ignore
    var __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
        description: "No babies added yet",
    }));
    var __VLS_107 = __VLS_106.apply(void 0, __spreadArray([{
            description: "No babies added yet",
        }], __VLS_functionalComponentArgsRest(__VLS_106), false));
}
// @ts-ignore
[babyList,];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
