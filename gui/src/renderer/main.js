'use strict'

import { openProjectScreen } from './openproject'
import rendererentrypoints from '../common/rendererentrypoints'
import { rejectAfter } from '../common/utils'

function parseArguments () {
  const hash = window.location.hash
  if (hash && hash.startsWith('#')) {
    return JSON.parse(decodeURIComponent(hash.slice(1)))
  } else {
    return {}
  }
}

const args = {
  entryPoint: rendererentrypoints.openProjectScreen,
  arguments: {},

  ...parseArguments()
}

switch (args.entryPoint) {
  case rendererentrypoints.waitForAdminBootup:
    waitForAdminBootup(10)
    break
  case rendererentrypoints.openProjectScreen:
  default:
    openProjectScreen(document.getElementById('app'), args.arguments)
    break
}

function waitForAdminBootup(n) {
  if (n == 0) {
    document.write("Lektor server did not start yet. You could try to reload this page or wait.")
  }
  document.write(" . ")
  setTimeout(waitForAdminBootup, 250, n-1);
}
