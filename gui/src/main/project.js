'use strict'

import { spawn } from 'child_process'

import { BrowserWindow } from 'electron'

import { getRendererIndexHTMLURL } from './main'
import rendererentrypoints from '../common/rendererentrypoints'

const lektorBinary = 'lektor';
const bindIP = '127.0.0.1';

export function openProject (projectFilePath) {
  const randomPort = getRandomPortNumber();
  const lektorArguments = [
    '--project',
    projectFilePath,
    'server',
    '--host',
    bindIP,
    '--port',
    "" + randomPort
  ];
  const lektorProcess = spawn(lektorBinary, lektorArguments)

  lektorProcess.stderr.on('data', data => {
    console.error(projectFilePath, "stderr: " + data)
    if (data.indexOf(" * Running on") == 0) {
      window.loadURL("http://" + bindIP + ":" + randomPort + "/admin/root/edit")
    }
  })
  lektorProcess.stdout.on('data', data => {
    console.log(projectFilePath, "stdout: " + data)
  })

  const window = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    center: true,
    webPreferences: { enableRemoteModule: false, nodeIntegration: true },

    title: 'Lektor'
  })

  window.loadURL(getRendererIndexHTMLURL(rendererentrypoints.waitForAdminBootup))

  window.setRepresentedFilename(projectFilePath)

  window.webContents.on('did-finish-load', () => {
    window.show()
  })

  window.on('close', () => {
    lektorProcess.kill()
  })
}

function getRandomPortNumber() {
  // IANA suggested range for dynamic ports is 49152 to 65535
  return Math.floor(Math.random() * 5000 + 50000);
}
