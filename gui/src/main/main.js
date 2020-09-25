'use strict'

import { app, BrowserWindow, webContents, dialog, ipcMain } from 'electron'

import * as path from 'path'
import { format as formatUrl } from 'url'

import { openProject } from './project'

import rendererentrypoints from '../common/rendererentrypoints'
import { lektorProjectFilter } from '../common/filedialoghelpers'
import { i18n } from '../common/i18n'

const main = () => {
  app.on('ready', () => {
    app.on('open-file', (event, filePath) => {
      event.preventDefault()
      console.log(filePath)
    })

    app.on('activate', () => {
      // When a user (re-)activates the app by clicking on it again, and we don't
      // have any windows open, we can prompt the user to open a project again.
      if (
        BrowserWindow.getAllWindows().length +
          webContents.getAllWebContents().length ===
        0
      ) {
        createOpenProjectWindow()
      }
    })

    createOpenProjectWindow()
  })

  app.on('window-all-closed', () => {
    // On non-macOS platforms the app is expected to terminate without open
    // windows.
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  ipcMain.handle('open-dialog', async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)

    const result = await dialog.showOpenDialog(window, {
      filters: lektorProjectFilter,
      properties: ['openFile']
    })

    if (!result.canceled) {
      console.log("Opening", result.filePaths)
      openProject(result.filePaths[0])
    }

    return result
  })
}

export function getRendererIndexHTMLURL (entryPoint, args) {
  const argument = encodeURIComponent(
    JSON.stringify({
      entryPoint: entryPoint,
      arguments: args
    })
  )
  if (module.hot) {
    // when hotloading, load the page from the webpack development server
    return formatUrl({
      protocol: 'http',
      hostname: 'localhost',
      port: process.env.ELECTRON_WEBPACK_WDS_PORT,
      slashes: true,
      hash: argument
    })
  } else {
    return formatUrl({
      protocol: 'file',
      pathname: path.join(__dirname, 'index.html'),
      slashes: true,
      hash: argument
    })
  }
}

function createOpenProjectWindow () {
  const window = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    center: true,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    webPreferences: { enableRemoteModule: false, nodeIntegration: true },

    title: i18n.trans('OPEN_PROJECT_TITLE') + ' — Lektor'
  })

  // window.on('page-title-updated', (event) => {
  //   event.preventDefault() // keep the title we've set
  // })

  // and load the index.html of the app.
  window.loadURL(
    getRendererIndexHTMLURL(rendererentrypoints.openProjectScreen)
  )

  window.webContents.on('did-finish-load', () => {
    window.show()
  })
}

// set up main event-loop hooks and open first window
main()
