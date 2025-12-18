"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_router_1 = require("vue-router");
var routes = [
    {
        path: '/',
        component: function () { return Promise.resolve().then(function () { return require('../layout/MainLayout.vue'); }); },
        children: [
            {
                path: '',
                name: 'Home',
                component: function () { return Promise.resolve().then(function () { return require('../views/Home.vue'); }); },
            },
            {
                path: 'timeline',
                name: 'Timeline',
                component: function () { return Promise.resolve().then(function () { return require('../views/Timeline.vue'); }); },
            },
            {
                path: 'statistics',
                name: 'Statistics',
                component: function () { return Promise.resolve().then(function () { return require('../views/Statistics.vue'); }); },
            },
            {
                path: 'user',
                name: 'User',
                component: function () { return Promise.resolve().then(function () { return require('../views/User.vue'); }); },
            },
            {
                path: 'baby/list',
                name: 'BabyList',
                component: function () { return Promise.resolve().then(function () { return require('../views/baby/List.vue'); }); },
            },
            {
                path: 'baby/edit/:id?',
                name: 'BabyEdit',
                component: function () { return Promise.resolve().then(function () { return require('../views/baby/Edit.vue'); }); },
            },
            {
                path: 'record/feeding',
                name: 'FeedingRecord',
                component: function () { return Promise.resolve().then(function () { return require('../views/record/Feeding.vue'); }); },
            },
            /*
            {
                path: 'record/sleep',
                name: 'SleepRecord',
                component: () => import('../views/record/Sleep.vue'),
            },
            {
                path: 'record/diaper',
                name: 'DiaperRecord',
                component: () => import('../views/record/Diaper.vue'),
            }
            */
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: function () { return Promise.resolve().then(function () { return require('../views/Login.vue'); }); },
    }
];
var router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(),
    routes: routes,
});
exports.default = router;
