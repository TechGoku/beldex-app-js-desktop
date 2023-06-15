'use strict'

const globalObject = global
const globalPromiseKey = 'MyMoneroLibAppBridge_Singleton.electron'
if (typeof globalObject[globalPromiseKey] === 'undefined' || !globalObject[globalPromiseKey]) {
  globalObject[globalPromiseKey] = require('@bdxi/beldex-app-bridge')({ asmjs: false })
}

module.exports = globalObject[globalPromiseKey]
