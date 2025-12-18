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
// import DailyTipsCard from '@/components/DailyTipsCard.vue'
var date_1 = require("@/utils/date");
var router = (0, vue_router_1.useRouter)();
// const userStore = useUserStore() // Mock: not used yet
// const babyStore = useBabyStore() // Mock: not used yet
// Mock Data
var upcomingVaccines = (0, vue_1.ref)(['Hepatitis B (2nd Dose) due on 2025-01-15']);
var todayTips = (0, vue_1.ref)([
    { id: '1', title: 'Start tummy time today!', description: '', type: 'Activity', priority: 'high' },
    { id: '2', title: 'Watch for sleep cues.', description: '', type: 'Sleep', priority: 'medium' }
]);
var todayStats = (0, vue_1.ref)({
    breastfeedingCount: 5,
    bottleFeedingCount: 2,
    totalMilk: 240,
    sleepDurationMinutes: 720,
    diaperCount: 6
});
var lastFeedingTime = (0, vue_1.computed)(function () {
    return (0, date_1.formatRelativeTime)(new Date(Date.now() - 1000 * 60 * 120)); // 2 hours ago
});
var formatSleepDuration = function (minutes) {
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    return h > 0 ? "".concat(h, "h ").concat(m, "m") : "".concat(m, "m");
};
// Actions
var goToVaccine = function () { return router.push('/vaccine'); };
var handleTipClick = function (tip) { return console.log('Tip clicked', tip); };
var handleFeeding = function () { return router.push('/record/feeding'); };
var handleSleep = function () { return router.push('/record/sleep'); };
var handleDiaper = function () { return router.push('/record/diaper'); };
var handleGrowth = function () { return router.push('/record/growth'); };
var __VLS_ctx = __assign(__assign({}, {}), {});
var ___VLS_components;
var ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "home-page" }));
/** @type {__VLS_StyleScopedClasses['home-page']} */ ;
if (__VLS_ctx.upcomingVaccines.length > 0) {
    var __VLS_0 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elAlert | typeof ___VLS_components.ElAlert} */
    elAlert;
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign(__assign({ 'onClick': {} }, { title: (__VLS_ctx.upcomingVaccines[0]), type: "warning", showIcon: true, closable: (false) }), { class: "vaccine-banner" })));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { title: (__VLS_ctx.upcomingVaccines[0]), type: "warning", showIcon: true, closable: (false) }), { class: "vaccine-banner" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
    var __VLS_5 = void 0;
    var __VLS_6 = ({ click: {} },
        { onClick: (__VLS_ctx.goToVaccine) });
    /** @type {__VLS_StyleScopedClasses['vaccine-banner']} */ ;
    var __VLS_3;
    var __VLS_4;
}
var __VLS_7;
/** @ts-ignore @type {typeof ___VLS_components.elRow | typeof ___VLS_components.ElRow} */
elRow;
// @ts-ignore
var __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    gutter: (20),
}));
var __VLS_9 = __VLS_8.apply(void 0, __spreadArray([{
        gutter: (20),
    }], __VLS_functionalComponentArgsRest(__VLS_8), false));
var __VLS_12 = __VLS_10.slots.default;
var __VLS_13;
/** @ts-ignore @type {typeof ___VLS_components.elCol | typeof ___VLS_components.ElCol} */
elCol;
// @ts-ignore
var __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    xs: (24),
    sm: (16),
}));
var __VLS_15 = __VLS_14.apply(void 0, __spreadArray([{
        xs: (24),
        sm: (16),
    }], __VLS_functionalComponentArgsRest(__VLS_14), false));
var __VLS_18 = __VLS_16.slots.default;
var __VLS_19;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
var __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19(__assign(__assign({ 'onClick': {} }, { class: "last-feeding-card" }), { shadow: "hover" })));
var __VLS_21 = __VLS_20.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { class: "last-feeding-card" }), { shadow: "hover" })], __VLS_functionalComponentArgsRest(__VLS_20), false));
var __VLS_24;
var __VLS_25 = ({ click: {} },
    { onClick: (__VLS_ctx.handleFeeding) });
/** @type {__VLS_StyleScopedClasses['last-feeding-card']} */ ;
var __VLS_26 = __VLS_22.slots.default;
{
    var __VLS_27 = __VLS_22.slots.header;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "card-header" }));
    /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    var __VLS_28 = void 0;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    var __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        link: true,
    }));
    var __VLS_30 = __VLS_29.apply(void 0, __spreadArray([{
            link: true,
        }], __VLS_functionalComponentArgsRest(__VLS_29), false));
    var __VLS_33 = __VLS_31.slots.default;
    // @ts-ignore
    [upcomingVaccines, upcomingVaccines, goToVaccine, handleFeeding,];
    var __VLS_31;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feeding-content" }));
/** @type {__VLS_StyleScopedClasses['feeding-content']} */ ;
var __VLS_34;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
var __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    size: (20),
}));
var __VLS_36 = __VLS_35.apply(void 0, __spreadArray([{
        size: (20),
    }], __VLS_functionalComponentArgsRest(__VLS_35), false));
var __VLS_39 = __VLS_37.slots.default;
var __VLS_40;
/** @ts-ignore @type {typeof ___VLS_components.Mug} */
icons_vue_1.Mug;
// @ts-ignore
var __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
var __VLS_42 = __VLS_41.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_41), false));
// @ts-ignore
[];
var __VLS_37;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "feeding-time" }));
/** @type {__VLS_StyleScopedClasses['feeding-time']} */ ;
(__VLS_ctx.lastFeedingTime);
// @ts-ignore
[lastFeedingTime,];
var __VLS_22;
var __VLS_23;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "section-title" }));
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
var __VLS_45;
/** @ts-ignore @type {typeof ___VLS_components.elRow | typeof ___VLS_components.ElRow} */
elRow;
// @ts-ignore
var __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    gutter: (10),
}));
var __VLS_47 = __VLS_46.apply(void 0, __spreadArray([{
        gutter: (10),
    }], __VLS_functionalComponentArgsRest(__VLS_46), false));
var __VLS_50 = __VLS_48.slots.default;
var __VLS_51;
/** @ts-ignore @type {typeof ___VLS_components.elCol | typeof ___VLS_components.ElCol} */
elCol;
// @ts-ignore
var __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
    xs: (12),
    sm: (6),
}));
var __VLS_53 = __VLS_52.apply(void 0, __spreadArray([{
        xs: (12),
        sm: (6),
    }], __VLS_functionalComponentArgsRest(__VLS_52), false));
var __VLS_56 = __VLS_54.slots.default;
var __VLS_57;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
var __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57(__assign({ shadow: "never" }, { class: "stat-card" })));
var __VLS_59 = __VLS_58.apply(void 0, __spreadArray([__assign({ shadow: "never" }, { class: "stat-card" })], __VLS_functionalComponentArgsRest(__VLS_58), false));
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
var __VLS_62 = __VLS_60.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "stat-value" }));
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
(__VLS_ctx.todayStats.breastfeedingCount);
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "stat-label" }));
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
// @ts-ignore
[todayStats,];
var __VLS_60;
// @ts-ignore
[];
var __VLS_54;
var __VLS_63;
/** @ts-ignore @type {typeof ___VLS_components.elCol | typeof ___VLS_components.ElCol} */
elCol;
// @ts-ignore
var __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
    xs: (12),
    sm: (6),
}));
var __VLS_65 = __VLS_64.apply(void 0, __spreadArray([{
        xs: (12),
        sm: (6),
    }], __VLS_functionalComponentArgsRest(__VLS_64), false));
var __VLS_68 = __VLS_66.slots.default;
var __VLS_69;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
var __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69(__assign({ shadow: "never" }, { class: "stat-card" })));
var __VLS_71 = __VLS_70.apply(void 0, __spreadArray([__assign({ shadow: "never" }, { class: "stat-card" })], __VLS_functionalComponentArgsRest(__VLS_70), false));
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
var __VLS_74 = __VLS_72.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "stat-value" }));
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
(__VLS_ctx.todayStats.bottleFeedingCount);
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "stat-label" }));
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
(__VLS_ctx.todayStats.totalMilk);
// @ts-ignore
[todayStats, todayStats,];
var __VLS_72;
// @ts-ignore
[];
var __VLS_66;
var __VLS_75;
/** @ts-ignore @type {typeof ___VLS_components.elCol | typeof ___VLS_components.ElCol} */
elCol;
// @ts-ignore
var __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
    xs: (12),
    sm: (6),
}));
var __VLS_77 = __VLS_76.apply(void 0, __spreadArray([{
        xs: (12),
        sm: (6),
    }], __VLS_functionalComponentArgsRest(__VLS_76), false));
var __VLS_80 = __VLS_78.slots.default;
var __VLS_81;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
var __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81(__assign({ shadow: "never" }, { class: "stat-card" })));
var __VLS_83 = __VLS_82.apply(void 0, __spreadArray([__assign({ shadow: "never" }, { class: "stat-card" })], __VLS_functionalComponentArgsRest(__VLS_82), false));
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
var __VLS_86 = __VLS_84.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "stat-value" }));
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
(__VLS_ctx.formatSleepDuration(__VLS_ctx.todayStats.sleepDurationMinutes));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "stat-label" }));
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
// @ts-ignore
[todayStats, formatSleepDuration,];
var __VLS_84;
// @ts-ignore
[];
var __VLS_78;
var __VLS_87;
/** @ts-ignore @type {typeof ___VLS_components.elCol | typeof ___VLS_components.ElCol} */
elCol;
// @ts-ignore
var __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
    xs: (12),
    sm: (6),
}));
var __VLS_89 = __VLS_88.apply(void 0, __spreadArray([{
        xs: (12),
        sm: (6),
    }], __VLS_functionalComponentArgsRest(__VLS_88), false));
var __VLS_92 = __VLS_90.slots.default;
var __VLS_93;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
var __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93(__assign({ shadow: "never" }, { class: "stat-card" })));
var __VLS_95 = __VLS_94.apply(void 0, __spreadArray([__assign({ shadow: "never" }, { class: "stat-card" })], __VLS_functionalComponentArgsRest(__VLS_94), false));
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
var __VLS_98 = __VLS_96.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "stat-value" }));
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
(__VLS_ctx.todayStats.diaperCount);
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "stat-label" }));
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
// @ts-ignore
[todayStats,];
var __VLS_96;
// @ts-ignore
[];
var __VLS_90;
// @ts-ignore
[];
var __VLS_48;
// @ts-ignore
[];
var __VLS_16;
var __VLS_99;
/** @ts-ignore @type {typeof ___VLS_components.elCol | typeof ___VLS_components.ElCol} */
elCol;
// @ts-ignore
var __VLS_100 = __VLS_asFunctionalComponent(__VLS_99, new __VLS_99({
    xs: (24),
    sm: (8),
}));
var __VLS_101 = __VLS_100.apply(void 0, __spreadArray([{
        xs: (24),
        sm: (8),
    }], __VLS_functionalComponentArgsRest(__VLS_100), false));
var __VLS_104 = __VLS_102.slots.default;
var __VLS_105;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
var __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105(__assign({ class: "quick-actions" }, { shadow: "never" })));
var __VLS_107 = __VLS_106.apply(void 0, __spreadArray([__assign({ class: "quick-actions" }, { shadow: "never" })], __VLS_functionalComponentArgsRest(__VLS_106), false));
/** @type {__VLS_StyleScopedClasses['quick-actions']} */ ;
var __VLS_110 = __VLS_108.slots.default;
{
    var __VLS_111 = __VLS_108.slots.header;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "card-header" }));
    /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "action-grid" }));
/** @type {__VLS_StyleScopedClasses['action-grid']} */ ;
var __VLS_112;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
var __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112(__assign({ 'onClick': {} }, { type: "primary", circle: true, size: "large" })));
var __VLS_114 = __VLS_113.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "primary", circle: true, size: "large" })], __VLS_functionalComponentArgsRest(__VLS_113), false));
var __VLS_117;
var __VLS_118 = ({ click: {} },
    { onClick: (__VLS_ctx.handleFeeding) });
var __VLS_119 = __VLS_115.slots.default;
var __VLS_120;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
var __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({}));
var __VLS_122 = __VLS_121.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_121), false));
var __VLS_125 = __VLS_123.slots.default;
var __VLS_126;
/** @ts-ignore @type {typeof ___VLS_components.Mug} */
icons_vue_1.Mug;
// @ts-ignore
var __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({}));
var __VLS_128 = __VLS_127.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_127), false));
// @ts-ignore
[handleFeeding,];
var __VLS_123;
// @ts-ignore
[];
var __VLS_115;
var __VLS_116;
var __VLS_131;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
var __VLS_132 = __VLS_asFunctionalComponent(__VLS_131, new __VLS_131(__assign({ 'onClick': {} }, { type: "success", circle: true, size: "large" })));
var __VLS_133 = __VLS_132.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "success", circle: true, size: "large" })], __VLS_functionalComponentArgsRest(__VLS_132), false));
var __VLS_136;
var __VLS_137 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSleep) });
var __VLS_138 = __VLS_134.slots.default;
var __VLS_139;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
var __VLS_140 = __VLS_asFunctionalComponent(__VLS_139, new __VLS_139({}));
var __VLS_141 = __VLS_140.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_140), false));
var __VLS_144 = __VLS_142.slots.default;
var __VLS_145;
/** @ts-ignore @type {typeof ___VLS_components.Moon} */
icons_vue_1.Moon;
// @ts-ignore
var __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({}));
var __VLS_147 = __VLS_146.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_146), false));
// @ts-ignore
[handleSleep,];
var __VLS_142;
// @ts-ignore
[];
var __VLS_134;
var __VLS_135;
var __VLS_150;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
var __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150(__assign({ 'onClick': {} }, { type: "warning", circle: true, size: "large" })));
var __VLS_152 = __VLS_151.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "warning", circle: true, size: "large" })], __VLS_functionalComponentArgsRest(__VLS_151), false));
var __VLS_155;
var __VLS_156 = ({ click: {} },
    { onClick: (__VLS_ctx.handleDiaper) });
var __VLS_157 = __VLS_153.slots.default;
var __VLS_158;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
var __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({}));
var __VLS_160 = __VLS_159.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_159), false));
var __VLS_163 = __VLS_161.slots.default;
var __VLS_164;
/** @ts-ignore @type {typeof ___VLS_components.ToiletPaper} */
icons_vue_1.ToiletPaper;
// @ts-ignore
var __VLS_165 = __VLS_asFunctionalComponent(__VLS_164, new __VLS_164({}));
var __VLS_166 = __VLS_165.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_165), false));
// @ts-ignore
[handleDiaper,];
var __VLS_161;
// @ts-ignore
[];
var __VLS_153;
var __VLS_154;
var __VLS_169;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
var __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169(__assign({ 'onClick': {} }, { type: "info", circle: true, size: "large" })));
var __VLS_171 = __VLS_170.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "info", circle: true, size: "large" })], __VLS_functionalComponentArgsRest(__VLS_170), false));
var __VLS_174;
var __VLS_175 = ({ click: {} },
    { onClick: (__VLS_ctx.handleGrowth) });
var __VLS_176 = __VLS_172.slots.default;
var __VLS_177;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
var __VLS_178 = __VLS_asFunctionalComponent(__VLS_177, new __VLS_177({}));
var __VLS_179 = __VLS_178.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_178), false));
var __VLS_182 = __VLS_180.slots.default;
var __VLS_183;
/** @ts-ignore @type {typeof ___VLS_components.TrendCharts} */
icons_vue_1.TrendCharts;
// @ts-ignore
var __VLS_184 = __VLS_asFunctionalComponent(__VLS_183, new __VLS_183({}));
var __VLS_185 = __VLS_184.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_184), false));
// @ts-ignore
[handleGrowth,];
var __VLS_180;
// @ts-ignore
[];
var __VLS_172;
var __VLS_173;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "action-labels" }));
/** @type {__VLS_StyleScopedClasses['action-labels']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
// @ts-ignore
[];
var __VLS_108;
// @ts-ignore
[];
var __VLS_102;
// @ts-ignore
[];
var __VLS_10;
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
