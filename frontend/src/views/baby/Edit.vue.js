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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var icons_vue_1 = require("@element-plus/icons-vue");
var element_plus_1 = require("element-plus");
var route = (0, vue_router_1.useRoute)();
var router = (0, vue_router_1.useRouter)();
var babyStore = (0, baby_1.useBabyStore)();
var formRef = (0, vue_1.ref)();
var isEdit = (0, vue_1.computed)(function () { return !!route.params.id; });
var loading = (0, vue_1.ref)(false);
var submitting = (0, vue_1.ref)(false);
var formData = (0, vue_1.reactive)({
    name: '',
    nickname: '',
    gender: 'male',
    birthDate: '',
    avatarUrl: ''
});
var rules = (0, vue_1.reactive)({
    name: [
        { required: true, message: 'Please input baby name', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: 'Please select gender', trigger: 'change' },
    ],
    birthDate: [
        { required: true, message: 'Please pick a date', trigger: 'change' },
    ],
});
(0, vue_1.onMounted)(function () {
    if (isEdit.value) {
        var id_1 = route.params.id;
        var baby = babyStore.babyList.find(function (b) { return b.babyId === id_1; });
        if (baby) {
            formData.name = baby.name;
            formData.nickname = baby.nickname || '';
            formData.gender = baby.gender;
            formData.birthDate = baby.birthDate;
            formData.avatarUrl = baby.avatarUrl || '';
        }
        else {
            element_plus_1.ElMessage.error('Baby not found');
            router.push('/baby/list');
        }
    }
});
var goBack = function () { return router.back(); };
var handleUploadAvatar = function () {
    element_plus_1.ElMessage.info('Avatar upload mock: success');
    formData.avatarUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
};
var submitForm = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!formRef.value)
                    return [2 /*return*/];
                return [4 /*yield*/, formRef.value.validate(function (valid, fields) {
                        if (valid) {
                            submitting.value = true;
                            // Simulate API call
                            setTimeout(function () {
                                if (isEdit.value) {
                                    babyStore.updateBaby(route.params.id, formData);
                                    element_plus_1.ElMessage.success('Baby updated successfully');
                                }
                                else {
                                    babyStore.addBaby(formData);
                                    element_plus_1.ElMessage.success('Baby created successfully');
                                }
                                submitting.value = false;
                                router.push('/baby/list');
                            }, 500);
                        }
                        else {
                            console.log('error submit!', fields);
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var __VLS_ctx = __assign(__assign({}, {}), {});
var ___VLS_components;
var ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "baby-edit-page" }));
/** @type {__VLS_StyleScopedClasses['baby-edit-page']} */ ;
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
    { onClick: (__VLS_ctx.goBack) });
var __VLS_7 = __VLS_3.slots.default;
// @ts-ignore
[icons_vue_1.Back, goBack,];
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
(__VLS_ctx.isEdit ? 'Edit Baby' : 'Add Baby');
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
    ref: "formRef",
    model: (__VLS_ctx.formData),
    rules: (__VLS_ctx.rules),
    labelPosition: "top",
}));
var __VLS_16 = __VLS_15.apply(void 0, __spreadArray([{
        ref: "formRef",
        model: (__VLS_ctx.formData),
        rules: (__VLS_ctx.rules),
        labelPosition: "top",
    }], __VLS_functionalComponentArgsRest(__VLS_15), false));
__VLS_asFunctionalDirective(___VLS_directives.vLoading)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.loading) }), null, null);
var __VLS_19 = {};
var __VLS_21 = __VLS_17.slots.default;
var __VLS_22;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
var __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    label: "Avatar",
}));
var __VLS_24 = __VLS_23.apply(void 0, __spreadArray([{
        label: "Avatar",
    }], __VLS_functionalComponentArgsRest(__VLS_23), false));
var __VLS_27 = __VLS_25.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: (__VLS_ctx.handleUploadAvatar) }, { class: "avatar-uploader" }));
/** @type {__VLS_StyleScopedClasses['avatar-uploader']} */ ;
var __VLS_28;
/** @ts-ignore @type {typeof ___VLS_components.elAvatar | typeof ___VLS_components.ElAvatar} */
elAvatar;
// @ts-ignore
var __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    size: (80),
    src: (__VLS_ctx.formData.avatarUrl || ''),
    icon: "UserFilled",
}));
var __VLS_30 = __VLS_29.apply(void 0, __spreadArray([{
        size: (80),
        src: (__VLS_ctx.formData.avatarUrl || ''),
        icon: "UserFilled",
    }], __VLS_functionalComponentArgsRest(__VLS_29), false));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "upload-text" }));
/** @type {__VLS_StyleScopedClasses['upload-text']} */ ;
// @ts-ignore
[isEdit, formData, formData, rules, vLoading, loading, handleUploadAvatar,];
var __VLS_25;
var __VLS_33;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
var __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    label: "Name",
    prop: "name",
}));
var __VLS_35 = __VLS_34.apply(void 0, __spreadArray([{
        label: "Name",
        prop: "name",
    }], __VLS_functionalComponentArgsRest(__VLS_34), false));
var __VLS_38 = __VLS_36.slots.default;
var __VLS_39;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
var __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    modelValue: (__VLS_ctx.formData.name),
    placeholder: "Baby Name",
}));
var __VLS_41 = __VLS_40.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.formData.name),
        placeholder: "Baby Name",
    }], __VLS_functionalComponentArgsRest(__VLS_40), false));
// @ts-ignore
[formData,];
var __VLS_36;
var __VLS_44;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
var __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    label: "Nickname",
    prop: "nickname",
}));
var __VLS_46 = __VLS_45.apply(void 0, __spreadArray([{
        label: "Nickname",
        prop: "nickname",
    }], __VLS_functionalComponentArgsRest(__VLS_45), false));
var __VLS_49 = __VLS_47.slots.default;
var __VLS_50;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
var __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    modelValue: (__VLS_ctx.formData.nickname),
    placeholder: "Nickname (Optional)",
}));
var __VLS_52 = __VLS_51.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.formData.nickname),
        placeholder: "Nickname (Optional)",
    }], __VLS_functionalComponentArgsRest(__VLS_51), false));
// @ts-ignore
[formData,];
var __VLS_47;
var __VLS_55;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
var __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    label: "Gender",
    prop: "gender",
}));
var __VLS_57 = __VLS_56.apply(void 0, __spreadArray([{
        label: "Gender",
        prop: "gender",
    }], __VLS_functionalComponentArgsRest(__VLS_56), false));
var __VLS_60 = __VLS_58.slots.default;
var __VLS_61;
/** @ts-ignore @type {typeof ___VLS_components.elRadioGroup | typeof ___VLS_components.ElRadioGroup} */
elRadioGroup;
// @ts-ignore
var __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    modelValue: (__VLS_ctx.formData.gender),
}));
var __VLS_63 = __VLS_62.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.formData.gender),
    }], __VLS_functionalComponentArgsRest(__VLS_62), false));
var __VLS_66 = __VLS_64.slots.default;
var __VLS_67;
/** @ts-ignore @type {typeof ___VLS_components.elRadio | typeof ___VLS_components.ElRadio} */
elRadio;
// @ts-ignore
var __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
    label: "male",
}));
var __VLS_69 = __VLS_68.apply(void 0, __spreadArray([{
        label: "male",
    }], __VLS_functionalComponentArgsRest(__VLS_68), false));
var __VLS_72 = __VLS_70.slots.default;
// @ts-ignore
[formData,];
var __VLS_70;
var __VLS_73;
/** @ts-ignore @type {typeof ___VLS_components.elRadio | typeof ___VLS_components.ElRadio} */
elRadio;
// @ts-ignore
var __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
    label: "female",
}));
var __VLS_75 = __VLS_74.apply(void 0, __spreadArray([{
        label: "female",
    }], __VLS_functionalComponentArgsRest(__VLS_74), false));
var __VLS_78 = __VLS_76.slots.default;
// @ts-ignore
[];
var __VLS_76;
// @ts-ignore
[];
var __VLS_64;
// @ts-ignore
[];
var __VLS_58;
var __VLS_79;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
var __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
    label: "Birth Date",
    prop: "birthDate",
}));
var __VLS_81 = __VLS_80.apply(void 0, __spreadArray([{
        label: "Birth Date",
        prop: "birthDate",
    }], __VLS_functionalComponentArgsRest(__VLS_80), false));
var __VLS_84 = __VLS_82.slots.default;
var __VLS_85;
/** @ts-ignore @type {typeof ___VLS_components.elDatePicker | typeof ___VLS_components.ElDatePicker} */
elDatePicker;
// @ts-ignore
var __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85(__assign({ modelValue: (__VLS_ctx.formData.birthDate), type: "date", placeholder: "Select Birth Date", format: "YYYY-MM-DD", valueFormat: "YYYY-MM-DD" }, { style: {} })));
var __VLS_87 = __VLS_86.apply(void 0, __spreadArray([__assign({ modelValue: (__VLS_ctx.formData.birthDate), type: "date", placeholder: "Select Birth Date", format: "YYYY-MM-DD", valueFormat: "YYYY-MM-DD" }, { style: {} })], __VLS_functionalComponentArgsRest(__VLS_86), false));
// @ts-ignore
[formData,];
var __VLS_82;
var __VLS_90;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
var __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({}));
var __VLS_92 = __VLS_91.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_91), false));
var __VLS_95 = __VLS_93.slots.default;
var __VLS_96;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
var __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96(__assign(__assign({ 'onClick': {} }, { type: "primary", loading: (__VLS_ctx.submitting) }), { style: {} })));
var __VLS_98 = __VLS_97.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { type: "primary", loading: (__VLS_ctx.submitting) }), { style: {} })], __VLS_functionalComponentArgsRest(__VLS_97), false));
var __VLS_101;
var __VLS_102 = ({ click: {} },
    { onClick: (__VLS_ctx.submitForm) });
var __VLS_103 = __VLS_99.slots.default;
(__VLS_ctx.isEdit ? 'Save Changes' : 'Create Baby');
// @ts-ignore
[isEdit, submitting, submitForm,];
var __VLS_99;
var __VLS_100;
var __VLS_104;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
var __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104(__assign({ 'onClick': {} }, { style: {} })));
var __VLS_106 = __VLS_105.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { style: {} })], __VLS_functionalComponentArgsRest(__VLS_105), false));
var __VLS_109;
var __VLS_110 = ({ click: {} },
    { onClick: (__VLS_ctx.goBack) });
var __VLS_111 = __VLS_107.slots.default;
// @ts-ignore
[goBack,];
var __VLS_107;
var __VLS_108;
// @ts-ignore
[];
var __VLS_93;
// @ts-ignore
[];
var __VLS_17;
// @ts-ignore
[];
var __VLS_11;
// @ts-ignore
var __VLS_20 = __VLS_19;
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
