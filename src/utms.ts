import Cookies from 'js-cookie'
import Router from 'next/router'

export function setUtmParamsToCookies(shallowRedirect = true) {
  const hasQueryParamsPattern = /.*\?\w+/
  if (!hasQueryParamsPattern.test(Router.asPath)) return null
  const urlParamsEntries = getUrlParamsAsEntries()
  const utmsEntries = urlParamsEntries.filter(validUtm(true))
  if (utmsEntries.length <= 0) return null

  const expires = oneWeek()
  Cookies.set('mesalva_utms', JSON.stringify(utmsEntries.toObject), { path: '/', expires })
  urlParamsEntries.forEach(([name, value]) => Cookies.set(name, value, { path: '/', expires }))
  const asPathWithoutUtms = getPathWithoutUtms(urlParamsEntries.filter(validUtm(false)))
  if(shallowRedirect) Router.push(asPathWithoutUtms, Router.pathname, { shallow: true })
}

function getUrlParamsAsEntries() {
  return Router.asPath
    .replace(/.*\?/, '')
    .split('&')
    .map(a => a.split('='))
}

function oneWeek() {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date
}

function getPathWithoutUtms(entries) {
  const path = Router.asPath.replace(/\?.*/, '')
  if (entries.length <= 0) return path
  return path + '?' + entries.map(([name, value]) => `${name}=${value}`).join('&')
}

function validUtm(valid) {
  const pattern = /^(utm_(content|medium|source|term|campaign|invited)|actionpay|conversion)/;
  return entry => pattern.test(entry[0]) === valid
}
