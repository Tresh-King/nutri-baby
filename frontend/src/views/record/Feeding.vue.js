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
var feedingType = (0, vue_1.ref)('breast');
var recordTime = (0, vue_1.ref)(new Date());
// Breast Form
var breastForm = (0, vue_1.reactive)({
    side: 'left',
    leftDuration: 0,
    rightDuration: 0
});
// Timer Logic
var timerRunning = (0, vue_1.ref)(false);
var startTime = (0, vue_1.ref)(0);
var elapsedSeconds = (0, vue_1.ref)(0);
var timerInterval = null;
var formattedTime = (0, vue_1.computed)(function () {
    var m = Math.floor(elapsedSeconds.value / 60).toString().padStart(2, '0');
    var s = (elapsedSeconds.value % 60).toString().padStart(2, '0');
    return "".concat(m, ":").concat(s);
});
var startTimer = function () {
    if (timerRunning.value)
        return;
    startTime.value = Date.now() - (elapsedSeconds.value * 1000);
    timerRunning.value = true;
    timerInterval = window.setInterval(function () {
        elapsedSeconds.value = Math.floor((Date.now() - startTime.value) / 1000);
    }, 1000);
};
var stopTimer = function () {
    if (!timerRunning.value)
        return;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timerRunning.value = false;
    // Distribute time
    var minutes = Math.ceil(elapsedSeconds.value / 60);
    if (breastForm.side === 'left')
        breastForm.leftDuration += minutes;
    else if (breastForm.side === 'right')
        breastForm.rightDuration += minutes;
    else {
        var half = Math.ceil(minutes / 2);
        breastForm.leftDuration += half;
        breastForm.rightDuration += half;
    }
    // Reset timer display for next session (optional, or keep it?)
    // keeping it allows user to see what they just recorded
};
(0, vue_1.onUnmounted)(function () {
    if (timerInterval)
        clearInterval(timerInterval);
});
// Bottle Form
var bottleForm = (0, vue_1.reactive)({
    type: 'formula',
    amount: 60,
    unit: 'ml'
});
// Food Form
var foodForm = (0, vue_1.reactive)({
    name: '',
    note: ''
});
var saveRecord = function () {
    if (!babyStore.currentBaby) {
        element_plus_1.ElMessage.error('No baby selected');
        return;
    }
    var record = {
        babyId: babyStore.currentBaby.babyId,
        type: feedingType.value,
        startTime: recordTime.value.getTime(),
        detail: {}
    };
    if (feedingType.value === 'breast') {
        if (breastForm.leftDuration === 0 && breastForm.rightDuration === 0) {
            element_plus_1.ElMessage.warning('Please record duration');
            return;
        }
        record.detail = __assign({}, breastForm);
    }
    else if (feedingType.value === 'bottle') {
        record.detail = __assign({}, bottleForm);
    }
    else {
        if (!foodForm.name) {
            element_plus_1.ElMessage.warning('Please enter food name');
            return;
        }
        record.detail = __assign({}, foodForm);
    }
    recordStore.addRecord(record);
    element_plus_1.ElMessage.success('Saved successfully');
    router.back();
};
var __VLS_ctx = __assign(__assign({}, {}), {});
var ___VLS_components;
var ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feeding-page" }));
/** @type {__VLS_StyleScopedClasses['feeding-page']} */ ;
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
var __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(__assign({ class: "form-card" })));
var __VLS_10 = __VLS_9.apply(void 0, __spreadArray([__assign({ class: "form-card" })], __VLS_functionalComponentArgsRest(__VLS_9), false));
/** @type {__VLS_StyleScopedClasses['form-card']} */ ;
var __VLS_13 = __VLS_11.slots.default;
var __VLS_14;
/** @ts-ignore @type {typeof ___VLS_components.elTabs | typeof ___VLS_components.ElTabs} */
elTabs;
// @ts-ignore
var __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14(__assign({ modelValue: (__VLS_ctx.feedingType) }, { class: "feeding-tabs" })));
var __VLS_16 = __VLS_15.apply(void 0, __spreadArray([__assign({ modelValue: (__VLS_ctx.feedingType) }, { class: "feeding-tabs" })], __VLS_functionalComponentArgsRest(__VLS_15), false));
/** @type {__VLS_StyleScopedClasses['feeding-tabs']} */ ;
var __VLS_19 = __VLS_17.slots.default;
var __VLS_20;
/** @ts-ignore @type {typeof ___VLS_components.elTabPane | typeof ___VLS_components.ElTabPane} */
elTabPane;
// @ts-ignore
var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "Breast",
    name: "breast",
}));
var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
        label: "Breast",
        name: "breast",
    }], __VLS_functionalComponentArgsRest(__VLS_21), false));
var __VLS_25 = __VLS_23.slots.default;
{
    var __VLS_26 = __VLS_23.slots.label;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "tab-label" }));
    /** @type {__VLS_StyleScopedClasses['tab-label']} */ ;
    // @ts-ignore
    [feedingType,];
}
// @ts-ignore
[];
var __VLS_23;
var __VLS_27;
/** @ts-ignore @type {typeof ___VLS_components.elTabPane | typeof ___VLS_components.ElTabPane} */
elTabPane;
// @ts-ignore
var __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
    label: "Bottle",
    name: "bottle",
}));
var __VLS_29 = __VLS_28.apply(void 0, __spreadArray([{
        label: "Bottle",
        name: "bottle",
    }], __VLS_functionalComponentArgsRest(__VLS_28), false));
var __VLS_32 = __VLS_30.slots.default;
{
    var __VLS_33 = __VLS_30.slots.label;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "tab-label" }));
    /** @type {__VLS_StyleScopedClasses['tab-label']} */ ;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_30;
var __VLS_34;
/** @ts-ignore @type {typeof ___VLS_components.elTabPane | typeof ___VLS_components.ElTabPane} */
elTabPane;
// @ts-ignore
var __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    label: "Solids",
    name: "food",
}));
var __VLS_36 = __VLS_35.apply(void 0, __spreadArray([{
        label: "Solids",
        name: "food",
    }], __VLS_functionalComponentArgsRest(__VLS_35), false));
var __VLS_39 = __VLS_37.slots.default;
{
    var __VLS_40 = __VLS_37.slots.label;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "tab-label" }));
    /** @type {__VLS_StyleScopedClasses['tab-label']} */ ;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_37;
// @ts-ignore
[];
var __VLS_17;
var __VLS_41;
/** @ts-ignore @type {typeof ___VLS_components.elForm | typeof ___VLS_components.ElForm} */
elForm;
// @ts-ignore
var __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41(__assign({ labelPosition: "top" }, { class: "record-form" })));
var __VLS_43 = __VLS_42.apply(void 0, __spreadArray([__assign({ labelPosition: "top" }, { class: "record-form" })], __VLS_functionalComponentArgsRest(__VLS_42), false));
/** @type {__VLS_StyleScopedClasses['record-form']} */ ;
var __VLS_46 = __VLS_44.slots.default;
if (__VLS_ctx.feedingType === 'breast') {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    var __VLS_47 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    var __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
        label: "Side",
    }));
    var __VLS_49 = __VLS_48.apply(void 0, __spreadArray([{
            label: "Side",
        }], __VLS_functionalComponentArgsRest(__VLS_48), false));
    var __VLS_52 = __VLS_50.slots.default;
    var __VLS_53 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRadioGroup | typeof ___VLS_components.ElRadioGroup} */
    elRadioGroup;
    // @ts-ignore
    var __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
        modelValue: (__VLS_ctx.breastForm.side),
        size: "large",
    }));
    var __VLS_55 = __VLS_54.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.breastForm.side),
            size: "large",
        }], __VLS_functionalComponentArgsRest(__VLS_54), false));
    var __VLS_58 = __VLS_56.slots.default;
    var __VLS_59 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRadioButton | typeof ___VLS_components.ElRadioButton} */
    elRadioButton;
    // @ts-ignore
    var __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
        label: "left",
    }));
    var __VLS_61 = __VLS_60.apply(void 0, __spreadArray([{
            label: "left",
        }], __VLS_functionalComponentArgsRest(__VLS_60), false));
    var __VLS_64 = __VLS_62.slots.default;
    // @ts-ignore
    [feedingType, breastForm,];
    var __VLS_62;
    var __VLS_65 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRadioButton | typeof ___VLS_components.ElRadioButton} */
    elRadioButton;
    // @ts-ignore
    var __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
        label: "right",
    }));
    var __VLS_67 = __VLS_66.apply(void 0, __spreadArray([{
            label: "right",
        }], __VLS_functionalComponentArgsRest(__VLS_66), false));
    var __VLS_70 = __VLS_68.slots.default;
    // @ts-ignore
    [];
    var __VLS_68;
    var __VLS_71 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRadioButton | typeof ___VLS_components.ElRadioButton} */
    elRadioButton;
    // @ts-ignore
    var __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
        label: "both",
    }));
    var __VLS_73 = __VLS_72.apply(void 0, __spreadArray([{
            label: "both",
        }], __VLS_functionalComponentArgsRest(__VLS_72), false));
    var __VLS_76 = __VLS_74.slots.default;
    // @ts-ignore
    [];
    var __VLS_74;
    // @ts-ignore
    [];
    var __VLS_56;
    // @ts-ignore
    [];
    var __VLS_50;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "timer-section" }));
    /** @type {__VLS_StyleScopedClasses['timer-section']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "timer-display" }));
    /** @type {__VLS_StyleScopedClasses['timer-display']} */ ;
    (__VLS_ctx.formattedTime);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "timer-controls" }));
    /** @type {__VLS_StyleScopedClasses['timer-controls']} */ ;
    if (!__VLS_ctx.timerRunning) {
        var __VLS_77 = void 0;
        /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
        elButton;
        // @ts-ignore
        var __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77(__assign(__assign({ 'onClick': {} }, { type: "primary", size: "large", circle: true, icon: (__VLS_ctx.VideoPlay) }), { class: "timer-btn play-btn" })));
        var __VLS_79 = __VLS_78.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { type: "primary", size: "large", circle: true, icon: (__VLS_ctx.VideoPlay) }), { class: "timer-btn play-btn" })], __VLS_functionalComponentArgsRest(__VLS_78), false));
        var __VLS_82 = void 0;
        var __VLS_83 = ({ click: {} },
            { onClick: (__VLS_ctx.startTimer) });
        /** @type {__VLS_StyleScopedClasses['timer-btn']} */ ;
        /** @type {__VLS_StyleScopedClasses['play-btn']} */ ;
        var __VLS_80;
        var __VLS_81;
    }
    else {
        var __VLS_84 = void 0;
        /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
        elButton;
        // @ts-ignore
        var __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84(__assign(__assign({ 'onClick': {} }, { type: "danger", size: "large", circle: true, icon: (__VLS_ctx.VideoPause) }), { class: "timer-btn pause-btn" })));
        var __VLS_86 = __VLS_85.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { type: "danger", size: "large", circle: true, icon: (__VLS_ctx.VideoPause) }), { class: "timer-btn pause-btn" })], __VLS_functionalComponentArgsRest(__VLS_85), false));
        var __VLS_89 = void 0;
        var __VLS_90 = ({ click: {} },
            { onClick: (__VLS_ctx.stopTimer) });
        /** @type {__VLS_StyleScopedClasses['timer-btn']} */ ;
        /** @type {__VLS_StyleScopedClasses['pause-btn']} */ ;
        var __VLS_87;
        var __VLS_88;
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "timer-status" }));
    /** @type {__VLS_StyleScopedClasses['timer-status']} */ ;
    (__VLS_ctx.timerRunning ? 'Recording...' : 'Ready');
    var __VLS_91 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRow | typeof ___VLS_components.ElRow} */
    elRow;
    // @ts-ignore
    var __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({
        gutter: (20),
    }));
    var __VLS_93 = __VLS_92.apply(void 0, __spreadArray([{
            gutter: (20),
        }], __VLS_functionalComponentArgsRest(__VLS_92), false));
    var __VLS_96 = __VLS_94.slots.default;
    var __VLS_97 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elCol | typeof ___VLS_components.ElCol} */
    elCol;
    // @ts-ignore
    var __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
        span: (12),
    }));
    var __VLS_99 = __VLS_98.apply(void 0, __spreadArray([{
            span: (12),
        }], __VLS_functionalComponentArgsRest(__VLS_98), false));
    var __VLS_102 = __VLS_100.slots.default;
    var __VLS_103 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    var __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({
        label: "Left (min)",
    }));
    var __VLS_105 = __VLS_104.apply(void 0, __spreadArray([{
            label: "Left (min)",
        }], __VLS_functionalComponentArgsRest(__VLS_104), false));
    var __VLS_108 = __VLS_106.slots.default;
    var __VLS_109 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elInputNumber | typeof ___VLS_components.ElInputNumber} */
    elInputNumber;
    // @ts-ignore
    var __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({
        modelValue: (__VLS_ctx.breastForm.leftDuration),
        min: (0),
        step: (1),
    }));
    var __VLS_111 = __VLS_110.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.breastForm.leftDuration),
            min: (0),
            step: (1),
        }], __VLS_functionalComponentArgsRest(__VLS_110), false));
    // @ts-ignore
    [breastForm, formattedTime, timerRunning, timerRunning, icons_vue_1.VideoPlay, startTimer, icons_vue_1.VideoPause, stopTimer,];
    var __VLS_106;
    // @ts-ignore
    [];
    var __VLS_100;
    var __VLS_114 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elCol | typeof ___VLS_components.ElCol} */
    elCol;
    // @ts-ignore
    var __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
        span: (12),
    }));
    var __VLS_116 = __VLS_115.apply(void 0, __spreadArray([{
            span: (12),
        }], __VLS_functionalComponentArgsRest(__VLS_115), false));
    var __VLS_119 = __VLS_117.slots.default;
    var __VLS_120 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    var __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({
        label: "Right (min)",
    }));
    var __VLS_122 = __VLS_121.apply(void 0, __spreadArray([{
            label: "Right (min)",
        }], __VLS_functionalComponentArgsRest(__VLS_121), false));
    var __VLS_125 = __VLS_123.slots.default;
    var __VLS_126 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elInputNumber | typeof ___VLS_components.ElInputNumber} */
    elInputNumber;
    // @ts-ignore
    var __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
        modelValue: (__VLS_ctx.breastForm.rightDuration),
        min: (0),
        step: (1),
    }));
    var __VLS_128 = __VLS_127.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.breastForm.rightDuration),
            min: (0),
            step: (1),
        }], __VLS_functionalComponentArgsRest(__VLS_127), false));
    // @ts-ignore
    [breastForm,];
    var __VLS_123;
    // @ts-ignore
    [];
    var __VLS_117;
    // @ts-ignore
    [];
    var __VLS_94;
}
if (__VLS_ctx.feedingType === 'bottle') {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    var __VLS_131 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    var __VLS_132 = __VLS_asFunctionalComponent(__VLS_131, new __VLS_131({
        label: "Milk Type",
    }));
    var __VLS_133 = __VLS_132.apply(void 0, __spreadArray([{
            label: "Milk Type",
        }], __VLS_functionalComponentArgsRest(__VLS_132), false));
    var __VLS_136 = __VLS_134.slots.default;
    var __VLS_137 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRadioGroup | typeof ___VLS_components.ElRadioGroup} */
    elRadioGroup;
    // @ts-ignore
    var __VLS_138 = __VLS_asFunctionalComponent(__VLS_137, new __VLS_137({
        modelValue: (__VLS_ctx.bottleForm.type),
    }));
    var __VLS_139 = __VLS_138.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.bottleForm.type),
        }], __VLS_functionalComponentArgsRest(__VLS_138), false));
    var __VLS_142 = __VLS_140.slots.default;
    var __VLS_143 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRadio | typeof ___VLS_components.ElRadio} */
    elRadio;
    // @ts-ignore
    var __VLS_144 = __VLS_asFunctionalComponent(__VLS_143, new __VLS_143({
        label: "formula",
    }));
    var __VLS_145 = __VLS_144.apply(void 0, __spreadArray([{
            label: "formula",
        }], __VLS_functionalComponentArgsRest(__VLS_144), false));
    var __VLS_148 = __VLS_146.slots.default;
    // @ts-ignore
    [feedingType, bottleForm,];
    var __VLS_146;
    var __VLS_149 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRadio | typeof ___VLS_components.ElRadio} */
    elRadio;
    // @ts-ignore
    var __VLS_150 = __VLS_asFunctionalComponent(__VLS_149, new __VLS_149({
        label: "breast-milk",
    }));
    var __VLS_151 = __VLS_150.apply(void 0, __spreadArray([{
            label: "breast-milk",
        }], __VLS_functionalComponentArgsRest(__VLS_150), false));
    var __VLS_154 = __VLS_152.slots.default;
    // @ts-ignore
    [];
    var __VLS_152;
    // @ts-ignore
    [];
    var __VLS_140;
    // @ts-ignore
    [];
    var __VLS_134;
    var __VLS_155 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    var __VLS_156 = __VLS_asFunctionalComponent(__VLS_155, new __VLS_155({
        label: "Amount",
    }));
    var __VLS_157 = __VLS_156.apply(void 0, __spreadArray([{
            label: "Amount",
        }], __VLS_functionalComponentArgsRest(__VLS_156), false));
    var __VLS_160 = __VLS_158.slots.default;
    var __VLS_161 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
    elInput;
    // @ts-ignore
    var __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({
        modelValue: (__VLS_ctx.bottleForm.amount),
        modelModifiers: { number: true, },
        type: "number",
        placeholder: "Amount",
    }));
    var __VLS_163 = __VLS_162.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.bottleForm.amount),
            modelModifiers: { number: true, },
            type: "number",
            placeholder: "Amount",
        }], __VLS_functionalComponentArgsRest(__VLS_162), false));
    var __VLS_166 = __VLS_164.slots.default;
    {
        var __VLS_167 = __VLS_164.slots.append;
        var __VLS_168 = void 0;
        /** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
        elSelect;
        // @ts-ignore
        var __VLS_169 = __VLS_asFunctionalComponent(__VLS_168, new __VLS_168(__assign({ modelValue: (__VLS_ctx.bottleForm.unit) }, { style: {} })));
        var __VLS_170 = __VLS_169.apply(void 0, __spreadArray([__assign({ modelValue: (__VLS_ctx.bottleForm.unit) }, { style: {} })], __VLS_functionalComponentArgsRest(__VLS_169), false));
        var __VLS_173 = __VLS_171.slots.default;
        var __VLS_174 = void 0;
        /** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
        elOption;
        // @ts-ignore
        var __VLS_175 = __VLS_asFunctionalComponent(__VLS_174, new __VLS_174({
            label: "ml",
            value: "ml",
        }));
        var __VLS_176 = __VLS_175.apply(void 0, __spreadArray([{
                label: "ml",
                value: "ml",
            }], __VLS_functionalComponentArgsRest(__VLS_175), false));
        var __VLS_179 = void 0;
        /** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
        elOption;
        // @ts-ignore
        var __VLS_180 = __VLS_asFunctionalComponent(__VLS_179, new __VLS_179({
            label: "oz",
            value: "oz",
        }));
        var __VLS_181 = __VLS_180.apply(void 0, __spreadArray([{
                label: "oz",
                value: "oz",
            }], __VLS_functionalComponentArgsRest(__VLS_180), false));
        // @ts-ignore
        [bottleForm, bottleForm,];
        var __VLS_171;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_164;
    // @ts-ignore
    [];
    var __VLS_158;
}
if (__VLS_ctx.feedingType === 'food') {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    var __VLS_184 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    var __VLS_185 = __VLS_asFunctionalComponent(__VLS_184, new __VLS_184({
        label: "Food Name",
    }));
    var __VLS_186 = __VLS_185.apply(void 0, __spreadArray([{
            label: "Food Name",
        }], __VLS_functionalComponentArgsRest(__VLS_185), false));
    var __VLS_189 = __VLS_187.slots.default;
    var __VLS_190 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
    elInput;
    // @ts-ignore
    var __VLS_191 = __VLS_asFunctionalComponent(__VLS_190, new __VLS_190({
        modelValue: (__VLS_ctx.foodForm.name),
        placeholder: "e.g. Cereal, Apple Puree",
    }));
    var __VLS_192 = __VLS_191.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.foodForm.name),
            placeholder: "e.g. Cereal, Apple Puree",
        }], __VLS_functionalComponentArgsRest(__VLS_191), false));
    // @ts-ignore
    [feedingType, foodForm,];
    var __VLS_187;
    var __VLS_195 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    var __VLS_196 = __VLS_asFunctionalComponent(__VLS_195, new __VLS_195({
        label: "Note",
    }));
    var __VLS_197 = __VLS_196.apply(void 0, __spreadArray([{
            label: "Note",
        }], __VLS_functionalComponentArgsRest(__VLS_196), false));
    var __VLS_200 = __VLS_198.slots.default;
    var __VLS_201 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
    elInput;
    // @ts-ignore
    var __VLS_202 = __VLS_asFunctionalComponent(__VLS_201, new __VLS_201({
        modelValue: (__VLS_ctx.foodForm.note),
        type: "textarea",
        rows: (3),
        placeholder: "Baby's reaction...",
    }));
    var __VLS_203 = __VLS_202.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.foodForm.note),
            type: "textarea",
            rows: (3),
            placeholder: "Baby's reaction...",
        }], __VLS_functionalComponentArgsRest(__VLS_202), false));
    // @ts-ignore
    [foodForm,];
    var __VLS_198;
}
var __VLS_206;
/** @ts-ignore @type {typeof ___VLS_components.elDivider | typeof ___VLS_components.ElDivider} */
elDivider;
// @ts-ignore
var __VLS_207 = __VLS_asFunctionalComponent(__VLS_206, new __VLS_206({}));
var __VLS_208 = __VLS_207.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_207), false));
var __VLS_211;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
var __VLS_212 = __VLS_asFunctionalComponent(__VLS_211, new __VLS_211({
    label: "Time",
}));
var __VLS_213 = __VLS_212.apply(void 0, __spreadArray([{
        label: "Time",
    }], __VLS_functionalComponentArgsRest(__VLS_212), false));
var __VLS_216 = __VLS_214.slots.default;
var __VLS_217;
/** @ts-ignore @type {typeof ___VLS_components.elDatePicker | typeof ___VLS_components.ElDatePicker} */
elDatePicker;
// @ts-ignore
var __VLS_218 = __VLS_asFunctionalComponent(__VLS_217, new __VLS_217(__assign({ modelValue: (__VLS_ctx.recordTime), type: "datetime", placeholder: "Select date and time" }, { style: {} })));
var __VLS_219 = __VLS_218.apply(void 0, __spreadArray([__assign({ modelValue: (__VLS_ctx.recordTime), type: "datetime", placeholder: "Select date and time" }, { style: {} })], __VLS_functionalComponentArgsRest(__VLS_218), false));
// @ts-ignore
[recordTime,];
var __VLS_214;
var __VLS_222;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
var __VLS_223 = __VLS_asFunctionalComponent(__VLS_222, new __VLS_222(__assign(__assign({ 'onClick': {} }, { type: "primary", size: "large" }), { class: "submit-btn" })));
var __VLS_224 = __VLS_223.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { type: "primary", size: "large" }), { class: "submit-btn" })], __VLS_functionalComponentArgsRest(__VLS_223), false));
var __VLS_227;
var __VLS_228 = ({ click: {} },
    { onClick: (__VLS_ctx.saveRecord) });
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
var __VLS_229 = __VLS_225.slots.default;
// @ts-ignore
[saveRecord,];
var __VLS_225;
var __VLS_226;
// @ts-ignore
[];
var __VLS_44;
// @ts-ignore
[];
var __VLS_11;
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
