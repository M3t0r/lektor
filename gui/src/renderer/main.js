'use strict'

import { openProjectScreen } from './openproject'
import rendererentrypoints from '../common/rendererentrypoints'

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
  case rendererentrypoints.openProjectScreen:
  default:
    openProjectScreen(document.getElementById('app'), args.arguments)
    break
}
