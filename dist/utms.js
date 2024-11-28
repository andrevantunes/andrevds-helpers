"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUtmParamsToCookies = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
const router_1 = __importDefault(require("next/router"));
function setUtmParamsToCookies(shallowRedirect = true) {
    const hasQueryParamsPattern = /.*\?\w+/;
    if (!hasQueryParamsPattern.test(router_1.default.asPath))
        return null;
    const urlParamsEntries = getUrlParamsAsEntries();
    const utmsEntries = urlParamsEntries.filter(validUtm(true));
    if (utmsEntries.length <= 0)
        return null;
    const expires = oneWeek();
    js_cookie_1.default.set('mesalva_utms', JSON.stringify(utmsEntries.toObject), { path: '/', expires });
    urlParamsEntries.forEach(([name, value]) => js_cookie_1.default.set(name, value, { path: '/', expires }));
    const asPathWithoutUtms = getPathWithoutUtms(urlParamsEntries.filter(validUtm(false)));
    if (shallowRedirect)
        router_1.default.push(asPathWithoutUtms, router_1.default.pathname, { shallow: true });
}
exports.setUtmParamsToCookies = setUtmParamsToCookies;
function getUrlParamsAsEntries() {
    return router_1.default.asPath
        .replace(/.*\?/, '')
        .split('&')
        .map(a => a.split('='));
}
function oneWeek() {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
}
function getPathWithoutUtms(entries) {
    const path = router_1.default.asPath.replace(/\?.*/, '');
    if (entries.length <= 0)
        return path;
    return path + '?' + entries.map(([name, value]) => `${name}=${value}`).join('&');
}
function validUtm(valid) {
    const pattern = /^(utm_(content|medium|source|term|campaign|invited)|actionpay|conversion)/;
    return entry => pattern.test(entry[0]) === valid;
}
