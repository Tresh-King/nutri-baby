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
var form = (0, vue_1.reactive)({
    type: 'pee',
    poopColor: '',
    poopTexture: '',
    note: '',
    time: new Date()
});
var colors = [
    { value: 'yellow', label: 'Yellow', hex: '#FFD700' },
    { value: 'green', label: 'Green', hex: '#90EE90' },
    { value: 'brown', label: 'Brown', hex: '#8B4513' },
    { value: 'black', label: 'Black', hex: '#000000' }
];
var save = function () {
    if (!babyStore.currentBaby)
        return;
    recordStore.addRecord({
        babyId: babyStore.currentBaby.babyId,
        type: 'diaper',
        startTime: form.time.getTime(),
        detail: {
            diaperType: form.type,
            poopColor: form.poopColor,
            poopTexture: form.poopTexture,
            note: form.note
        }
    });
    element_plus_1.ElMessage.success('Saved successfully');
    router.back();
};
var __VLS_ctx = __assign(__assign({}, {}), {});
var ___VLS_components;
var ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "diaper-page" }));
/** @type {__VLS_StyleScopedClasses['diaper-page']} */ ;
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
var __VLS_20;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "Type",
}));
var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
        label: "Type",
    }], __VLS_functionalComponentArgsRest(__VLS_21), false));
var __VLS_25 = __VLS_23.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "type-selector" }));
/** @type {__VLS_StyleScopedClasses['type-selector']} */ ;
var __VLS_26;
/** @ts-ignore @type {typeof ___VLS_components.elRadioGroup | typeof ___VLS_components.ElRadioGroup} */
elRadioGroup;
// @ts-ignore
var __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    modelValue: (__VLS_ctx.form.type),
    size: "large",
}));
var __VLS_28 = __VLS_27.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.form.type),
        size: "large",
    }], __VLS_functionalComponentArgsRest(__VLS_27), false));
var __VLS_31 = __VLS_29.slots.default;
var __VLS_32;
/** @ts-ignore @type {typeof ___VLS_components.elRadioButton | typeof ___VLS_components.ElRadioButton} */
elRadioButton;
// @ts-ignore
var __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    label: "pee",
}));
var __VLS_34 = __VLS_33.apply(void 0, __spreadArray([{
        label: "pee",
    }], __VLS_functionalComponentArgsRest(__VLS_33), false));
var __VLS_37 = __VLS_35.slots.default;
// @ts-ignore
[form,];
var __VLS_35;
var __VLS_38;
/** @ts-ignore @type {typeof ___VLS_components.elRadioButton | typeof ___VLS_components.ElRadioButton} */
elRadioButton;
// @ts-ignore
var __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    label: "poop",
}));
var __VLS_40 = __VLS_39.apply(void 0, __spreadArray([{
        label: "poop",
    }], __VLS_functionalComponentArgsRest(__VLS_39), false));
var __VLS_43 = __VLS_41.slots.default;
// @ts-ignore
[];
var __VLS_41;
var __VLS_44;
/** @ts-ignore @type {typeof ___VLS_components.elRadioButton | typeof ___VLS_components.ElRadioButton} */
elRadioButton;
// @ts-ignore
var __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    label: "both",
}));
var __VLS_46 = __VLS_45.apply(void 0, __spreadArray([{
        label: "both",
    }], __VLS_functionalComponentArgsRest(__VLS_45), false));
var __VLS_49 = __VLS_47.slots.default;
// @ts-ignore
[];
var __VLS_47;
// @ts-ignore
[];
var __VLS_29;
// @ts-ignore
[];
var __VLS_23;
if (__VLS_ctx.form.type !== 'pee') {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    var __VLS_50 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    var __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
        label: "Color",
    }));
    var __VLS_52 = __VLS_51.apply(void 0, __spreadArray([{
            label: "Color",
        }], __VLS_functionalComponentArgsRest(__VLS_51), false));
    var __VLS_55 = __VLS_53.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "color-grid" }));
    /** @type {__VLS_StyleScopedClasses['color-grid']} */ ;
    var _loop_1 = function (color) {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign(__assign(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!(__VLS_ctx.form.type !== 'pee'))
                    return;
                __VLS_ctx.form.poopColor = color.value;
                // @ts-ignore
                [form, form, colors,];
            } }, { key: (color.value) }), { class: "color-item" }), { class: ({ active: __VLS_ctx.form.poopColor === color.value }) }));
        /** @type {__VLS_StyleScopedClasses['color-item']} */ ;
        /** @type {__VLS_StyleScopedClasses['active']} */ ;
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "color-circle" }, { style: ({ backgroundColor: color.hex }) }));
        /** @type {__VLS_StyleScopedClasses['color-circle']} */ ;
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (color.label);
        // @ts-ignore
        [form,];
    };
    for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.colors)); _i < _a.length; _i++) {
        var color = _a[_i][0];
        _loop_1(color);
    }
    // @ts-ignore
    [];
    var __VLS_53;
    var __VLS_56 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    var __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        label: "Texture",
    }));
    var __VLS_58 = __VLS_57.apply(void 0, __spreadArray([{
            label: "Texture",
        }], __VLS_functionalComponentArgsRest(__VLS_57), false));
    var __VLS_61 = __VLS_59.slots.default;
    var __VLS_62 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRadioGroup | typeof ___VLS_components.ElRadioGroup} */
    elRadioGroup;
    // @ts-ignore
    var __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
        modelValue: (__VLS_ctx.form.poopTexture),
    }));
    var __VLS_64 = __VLS_63.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.form.poopTexture),
        }], __VLS_functionalComponentArgsRest(__VLS_63), false));
    var __VLS_67 = __VLS_65.slots.default;
    var __VLS_68 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRadio | typeof ___VLS_components.ElRadio} */
    elRadio;
    // @ts-ignore
    var __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
        label: "watery",
    }));
    var __VLS_70 = __VLS_69.apply(void 0, __spreadArray([{
            label: "watery",
        }], __VLS_functionalComponentArgsRest(__VLS_69), false));
    var __VLS_73 = __VLS_71.slots.default;
    // @ts-ignore
    [form,];
    var __VLS_71;
    var __VLS_74 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRadio | typeof ___VLS_components.ElRadio} */
    elRadio;
    // @ts-ignore
    var __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({
        label: "paste",
    }));
    var __VLS_76 = __VLS_75.apply(void 0, __spreadArray([{
            label: "paste",
        }], __VLS_functionalComponentArgsRest(__VLS_75), false));
    var __VLS_79 = __VLS_77.slots.default;
    // @ts-ignore
    [];
    var __VLS_77;
    var __VLS_80 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elRadio | typeof ___VLS_components.ElRadio} */
    elRadio;
    // @ts-ignore
    var __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
        label: "hard",
    }));
    var __VLS_82 = __VLS_81.apply(void 0, __spreadArray([{
            label: "hard",
        }], __VLS_functionalComponentArgsRest(__VLS_81), false));
    var __VLS_85 = __VLS_83.slots.default;
    // @ts-ignore
    [];
    var __VLS_83;
    // @ts-ignore
    [];
    var __VLS_65;
    // @ts-ignore
    [];
    var __VLS_59;
}
var __VLS_86;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
var __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
    label: "Note",
}));
var __VLS_88 = __VLS_87.apply(void 0, __spreadArray([{
        label: "Note",
    }], __VLS_functionalComponentArgsRest(__VLS_87), false));
var __VLS_91 = __VLS_89.slots.default;
var __VLS_92;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
var __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    modelValue: (__VLS_ctx.form.note),
    type: "textarea",
    placeholder: "Optional note...",
}));
var __VLS_94 = __VLS_93.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.form.note),
        type: "textarea",
        placeholder: "Optional note...",
    }], __VLS_functionalComponentArgsRest(__VLS_93), false));
// @ts-ignore
[form,];
var __VLS_89;
var __VLS_97;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
var __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
    label: "Time",
}));
var __VLS_99 = __VLS_98.apply(void 0, __spreadArray([{
        label: "Time",
    }], __VLS_functionalComponentArgsRest(__VLS_98), false));
var __VLS_102 = __VLS_100.slots.default;
var __VLS_103;
/** @ts-ignore @type {typeof ___VLS_components.elDatePicker | typeof ___VLS_components.ElDatePicker} */
elDatePicker;
// @ts-ignore
var __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103(__assign({ modelValue: (__VLS_ctx.form.time), type: "datetime" }, { style: {} })));
var __VLS_105 = __VLS_104.apply(void 0, __spreadArray([__assign({ modelValue: (__VLS_ctx.form.time), type: "datetime" }, { style: {} })], __VLS_functionalComponentArgsRest(__VLS_104), false));
// @ts-ignore
[form,];
var __VLS_100;
var __VLS_108;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
var __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108(__assign(__assign({ 'onClick': {} }, { type: "primary", size: "large" }), { class: "submit-btn" })));
var __VLS_110 = __VLS_109.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { type: "primary", size: "large" }), { class: "submit-btn" })], __VLS_functionalComponentArgsRest(__VLS_109), false));
var __VLS_113;
var __VLS_114 = ({ click: {} },
    { onClick: (__VLS_ctx.save) });
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
var __VLS_115 = __VLS_111.slots.default;
// @ts-ignore
[save,];
var __VLS_111;
var __VLS_112;
// @ts-ignore
[];
var __VLS_17;
// @ts-ignore
[];
var __VLS_11;
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
