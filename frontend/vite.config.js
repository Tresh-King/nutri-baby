"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_vue_1 = require("@vitejs/plugin-vue");
var vite_2 = require("unplugin-auto-import/vite");
var vite_3 = require("unplugin-vue-components/vite");
var resolvers_1 = require("unplugin-vue-components/resolvers");
var path_1 = require("path");
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [
        (0, plugin_vue_1.default)(),
        (0, vite_2.default)({
            resolvers: [(0, resolvers_1.ElementPlusResolver)()],
        }),
        (0, vite_3.default)({
            resolvers: [(0, resolvers_1.ElementPlusResolver)()],
        }),
    ],
    resolve: {
        alias: {
            '@': path_1.default.resolve(__dirname, 'src'),
        },
    },
});
