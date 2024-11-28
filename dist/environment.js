"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isServer = exports.isClient = void 0;
exports.isClient = () => typeof window !== 'undefined';
exports.isServer = () => !exports.isClient();
