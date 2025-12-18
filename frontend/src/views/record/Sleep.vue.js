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
var record_1 = require("@/stores/record");
var baby_1 = require("@/stores/baby");
var element_plus_1 = require("element-plus");
var router = (0, vue_router_1.useRouter)();
var recordStore = (0, record_1.useRecordStore)();
var babyStore = (0, baby_1.useBabyStore)();
var isSleeping = (0, vue_1.ref)(false);
var sleepType = (0, vue_1.ref)('nap');
var startTime = (0, vue_1.ref)(0);
var elapsedSeconds = (0, vue_1.ref)(0);
var timerInterval = null;
var formattedDuration = (0, vue_1.computed)(function () {
    var h = Math.floor(elapsedSeconds.value / 3600).toString().padStart(2, '0');
    var m = Math.floor((elapsedSeconds.value % 3600) / 60).toString().padStart(2, '0');
    var s = (elapsedSeconds.value % 60).toString().padStart(2, '0');
    return "".concat(h, ":").concat(m, ":").concat(s);
});
var startSleep = function () {
    isSleeping.value = true;
    startTime.value = Date.now();
    timerInterval = window.setInterval(function () {
        elapsedSeconds.value = Math.floor((Date.now() - startTime.value) / 1000);
    }, 1000);
};
var endSleep = function () {
    if (!babyStore.currentBaby)
        return;
    clearInterval(timerInterval);
    timerInterval = null;
    isSleeping.value = false;
    recordStore.addRecord({
        babyId: babyStore.currentBaby.babyId,
        type: 'sleep',
        startTime: startTime.value,
        endTime: Date.now(),
        detail: {
            sleepType: sleepType.value
        }
    });
    element_plus_1.ElMessage.success('Sleep recorded');
    router.back();
};
(0, vue_1.onUnmounted)(function () {
    if (timerInterval)
        clearInterval(timerInterval);
});
// Manual Entry
var showManual = (0, vue_1.ref)(false);
var manualForm = (0, vue_1.reactive)({
    type: 'nap',
    startTime: new Date(),
    endTime: new Date()
});
var saveManual = function () {
    if (!babyStore.currentBaby)
        return;
    if (manualForm.startTime >= manualForm.endTime) {
        element_plus_1.ElMessage.warning('End time must be after start time');
        return;
    }
    recordStore.addRecord({
        babyId: babyStore.currentBaby.babyId,
        type: 'sleep',
        startTime: manualForm.startTime.getTime(),
        endTime: manualForm.endTime.getTime(),
        detail: {
            sleepType: manualForm.type
        }
    });
    showManual.value = false;
    element_plus_1.ElMessage.success('Recorded successfully');
    router.back();
};
var __VLS_ctx = __assign(__assign({}, {}), {});
var ___VLS_components;
var ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "sleep-page" }));
/** @type {__VLS_StyleScopedClasses['sleep-page']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "page-header" }));
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
var __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ 'onClick': {} }, { link: true, icon: (__VLS_ctx.Back) })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { link: true, icon: (__VLS_ctx.Back) })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_5;
var __VLS_6 = ({ click: {} },
    { onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.router.back();
            // @ts-ignore
            [icons_vue_1.Back, router,];
        } });
var __VLS_7 = __VLS_3.slots.default;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
var __VLS_8;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
var __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(__assign({ class: "status-card" }, { class: ({ 'is-sleeping': __VLS_ctx.isSleeping }) })));
var __VLS_10 = __VLS_9.apply(void 0, __spreadArray([__assign({ class: "status-card" }, { class: ({ 'is-sleeping': __VLS_ctx.isSleeping }) })], __VLS_functionalComponentArgsRest(__VLS_9), false));
/** @type {__VLS_StyleScopedClasses['status-card']} */ ;
/** @type {__VLS_StyleScopedClasses['is-sleeping']} */ ;
var __VLS_13 = __VLS_11.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "status-content" }));
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "icon" }));
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
(__VLS_ctx.isSleeping ? '💤' : '👀');
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "text" }));
/** @type {__VLS_StyleScopedClasses['text']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
(__VLS_ctx.isSleeping ? 'Baby is Sleeping' : 'Baby is Awake');
if (__VLS_ctx.isSleeping) {
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.formattedDuration);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
// @ts-ignore
[isSleeping, isSleeping, isSleeping, isSleeping, formattedDuration,];
var __VLS_11;
if (!__VLS_ctx.isSleeping) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "action-section" }));
    /** @type {__VLS_StyleScopedClasses['action-section']} */ ;
    var __VLS_14 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elForm | typeof ___VLS_components.ElForm} */
    elForm;
    // @ts-ignore
    var __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
        labelPosition: "top",
    }));
    var __VLS_16 = __VLS_15.apply(void 0, __spreadArray([{
            labelPosition: "top",
        }], __VLS_functionalComponentArgsRest(__VLS_15), false));
    var __VLS_19 = __VLS_17.slots.default;
    var __VLS_20 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        label: "Sleep Type",
    }));
    var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
            label: "Sleep Type",
        }], __VLS_functionalComponentArgsRest(__VLS_21), false));
    var __VLS_25 = __VLS_23.slots.default;
    var __VLS_26 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRadioGroup | typeof ___VLS_components.ElRadioGroup} */
    elRadioGroup;
    // @ts-ignore
    var __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
        modelValue: (__VLS_ctx.sleepType),
        size: "large",
    }));
    var __VLS_28 = __VLS_27.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.sleepType),
            size: "large",
        }], __VLS_functionalComponentArgsRest(__VLS_27), false));
    var __VLS_31 = __VLS_29.slots.default;
    var __VLS_32 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRadioButton | typeof ___VLS_components.ElRadioButton} */
    elRadioButton;
    // @ts-ignore
    var __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        label: "nap",
    }));
    var __VLS_34 = __VLS_33.apply(void 0, __spreadArray([{
            label: "nap",
        }], __VLS_functionalComponentArgsRest(__VLS_33), false));
    var __VLS_37 = __VLS_35.slots.default;
    // @ts-ignore
    [isSleeping, sleepType,];
    var __VLS_35;
    var __VLS_38 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRadioButton | typeof ___VLS_components.ElRadioButton} */
    elRadioButton;
    // @ts-ignore
    var __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
        label: "night",
    }));
    var __VLS_40 = __VLS_39.apply(void 0, __spreadArray([{
            label: "night",
        }], __VLS_functionalComponentArgsRest(__VLS_39), false));
    var __VLS_43 = __VLS_41.slots.default;
    // @ts-ignore
    [];
    var __VLS_41;
    // @ts-ignore
    [];
    var __VLS_29;
    // @ts-ignore
    [];
    var __VLS_23;
    var __VLS_44 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    var __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44(__assign(__assign({ 'onClick': {} }, { type: "primary", size: "large" }), { class: "action-btn" })));
    var __VLS_46 = __VLS_45.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { type: "primary", size: "large" }), { class: "action-btn" })], __VLS_functionalComponentArgsRest(__VLS_45), false));
    var __VLS_49 = void 0;
    var __VLS_50 = ({ click: {} },
        { onClick: (__VLS_ctx.startSleep) });
    /** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
    var __VLS_51 = __VLS_47.slots.default;
    // @ts-ignore
    [startSleep,];
    var __VLS_47;
    var __VLS_48;
    var __VLS_52 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elDivider | typeof ___VLS_components.ElDivider} */
    elDivider;
    // @ts-ignore
    var __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
    var __VLS_54 = __VLS_53.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_53), false));
    var __VLS_57 = __VLS_55.slots.default;
    // @ts-ignore
    [];
    var __VLS_55;
    var __VLS_58 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    var __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58(__assign(__assign({ 'onClick': {} }, { size: "large" }), { class: "action-btn" })));
    var __VLS_60 = __VLS_59.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { size: "large" }), { class: "action-btn" })], __VLS_functionalComponentArgsRest(__VLS_59), false));
    var __VLS_63 = void 0;
    var __VLS_64 = ({ click: {} },
        { onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!(!__VLS_ctx.isSleeping))
                    return;
                __VLS_ctx.showManual = true;
                // @ts-ignore
                [showManual,];
            } });
    /** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
    var __VLS_65 = __VLS_61.slots.default;
    // @ts-ignore
    [];
    var __VLS_61;
    var __VLS_62;
    // @ts-ignore
    [];
    var __VLS_17;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "action-section" }));
    /** @type {__VLS_StyleScopedClasses['action-section']} */ ;
    var __VLS_66 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    var __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66(__assign(__assign({ 'onClick': {} }, { type: "success", size: "large" }), { class: "action-btn" })));
    var __VLS_68 = __VLS_67.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { type: "success", size: "large" }), { class: "action-btn" })], __VLS_functionalComponentArgsRest(__VLS_67), false));
    var __VLS_71 = void 0;
    var __VLS_72 = ({ click: {} },
        { onClick: (__VLS_ctx.endSleep) });
    /** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
    var __VLS_73 = __VLS_69.slots.default;
    // @ts-ignore
    [endSleep,];
    var __VLS_69;
    var __VLS_70;
}
var __VLS_74;
/** @ts-ignore @type {typeof ___VLS_components.elDialog | typeof ___VLS_components.ElDialog} */
elDialog;
// @ts-ignore
var __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({
    modelValue: (__VLS_ctx.showManual),
    title: "Log Past Sleep",
    width: "90%",
}));
var __VLS_76 = __VLS_75.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.showManual),
        title: "Log Past Sleep",
        width: "90%",
    }], __VLS_functionalComponentArgsRest(__VLS_75), false));
var __VLS_79 = __VLS_77.slots.default;
var __VLS_80;
/** @ts-ignore @type {typeof ___VLS_components.elForm | typeof ___VLS_components.ElForm} */
elForm;
// @ts-ignore
var __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    labelPosition: "top",
}));
var __VLS_82 = __VLS_81.apply(void 0, __spreadArray([{
        labelPosition: "top",
    }], __VLS_functionalComponentArgsRest(__VLS_81), false));
var __VLS_85 = __VLS_83.slots.default;
var __VLS_86;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
var __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
    label: "Type",
}));
var __VLS_88 = __VLS_87.apply(void 0, __spreadArray([{
        label: "Type",
    }], __VLS_functionalComponentArgsRest(__VLS_87), false));
var __VLS_91 = __VLS_89.slots.default;
var __VLS_92;
/** @ts-ignore @type {typeof ___VLS_components.elRadioGroup | typeof ___VLS_components.ElRadioGroup} */
elRadioGroup;
// @ts-ignore
var __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    modelValue: (__VLS_ctx.manualForm.type),
}));
var __VLS_94 = __VLS_93.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.manualForm.type),
    }], __VLS_functionalComponentArgsRest(__VLS_93), false));
var __VLS_97 = __VLS_95.slots.default;
var __VLS_98;
/** @ts-ignore @type {typeof ___VLS_components.elRadioButton | typeof ___VLS_components.ElRadioButton} */
elRadioButton;
// @ts-ignore
var __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
    label: "nap",
}));
var __VLS_100 = __VLS_99.apply(void 0, __spreadArray([{
        label: "nap",
    }], __VLS_functionalComponentArgsRest(__VLS_99), false));
var __VLS_103 = __VLS_101.slots.default;
// @ts-ignore
[showManual, manualForm,];
var __VLS_101;
var __VLS_104;
/** @ts-ignore @type {typeof ___VLS_components.elRadioButton | typeof ___VLS_components.ElRadioButton} */
elRadioButton;
// @ts-ignore
var __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
    label: "night",
}));
var __VLS_106 = __VLS_105.apply(void 0, __spreadArray([{
        label: "night",
    }], __VLS_functionalComponentArgsRest(__VLS_105), false));
var __VLS_109 = __VLS_107.slots.default;
// @ts-ignore
[];
var __VLS_107;
// @ts-ignore
[];
var __VLS_95;
// @ts-ignore
[];
var __VLS_89;
var __VLS_110;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
var __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
    label: "Start Time",
}));
var __VLS_112 = __VLS_111.apply(void 0, __spreadArray([{
        label: "Start Time",
    }], __VLS_functionalComponentArgsRest(__VLS_111), false));
var __VLS_115 = __VLS_113.slots.default;
var __VLS_116;
/** @ts-ignore @type {typeof ___VLS_components.elDatePicker | typeof ___VLS_components.ElDatePicker} */
elDatePicker;
// @ts-ignore
var __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116(__assign({ modelValue: (__VLS_ctx.manualForm.startTime), type: "datetime" }, { style: {} })));
var __VLS_118 = __VLS_117.apply(void 0, __spreadArray([__assign({ modelValue: (__VLS_ctx.manualForm.startTime), type: "datetime" }, { style: {} })], __VLS_functionalComponentArgsRest(__VLS_117), false));
// @ts-ignore
[manualForm,];
var __VLS_113;
var __VLS_121;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
var __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
    label: "End Time",
}));
var __VLS_123 = __VLS_122.apply(void 0, __spreadArray([{
        label: "End Time",
    }], __VLS_functionalComponentArgsRest(__VLS_122), false));
var __VLS_126 = __VLS_124.slots.default;
var __VLS_127;
/** @ts-ignore @type {typeof ___VLS_components.elDatePicker | typeof ___VLS_components.ElDatePicker} */
elDatePicker;
// @ts-ignore
var __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127(__assign({ modelValue: (__VLS_ctx.manualForm.endTime), type: "datetime" }, { style: {} })));
var __VLS_129 = __VLS_128.apply(void 0, __spreadArray([__assign({ modelValue: (__VLS_ctx.manualForm.endTime), type: "datetime" }, { style: {} })], __VLS_functionalComponentArgsRest(__VLS_128), false));
// @ts-ignore
[manualForm,];
var __VLS_124;
// @ts-ignore
[];
var __VLS_83;
{
    var __VLS_132 = __VLS_77.slots.footer;
    var __VLS_133 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    var __VLS_134 = __VLS_asFunctionalComponent(__VLS_133, new __VLS_133(__assign({ 'onClick': {} })));
    var __VLS_135 = __VLS_134.apply(void 0, __spreadArray([__assign({ 'onClick': {} })], __VLS_functionalComponentArgsRest(__VLS_134), false));
    var __VLS_138 = void 0;
    var __VLS_139 = ({ click: {} },
        { onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.showManual = false;
                // @ts-ignore
                [showManual,];
            } });
    var __VLS_140 = __VLS_136.slots.default;
    // @ts-ignore
    [];
    var __VLS_136;
    var __VLS_137;
    var __VLS_141 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    var __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141(__assign({ 'onClick': {} }, { type: "primary" })));
    var __VLS_143 = __VLS_142.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "primary" })], __VLS_functionalComponentArgsRest(__VLS_142), false));
    var __VLS_146 = void 0;
    var __VLS_147 = ({ click: {} },
        { onClick: (__VLS_ctx.saveManual) });
    var __VLS_148 = __VLS_144.slots.default;
    // @ts-ignore
    [saveManual,];
    var __VLS_144;
    var __VLS_145;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_77;
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
