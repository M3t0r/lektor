'use strict'

import { ipcRenderer } from 'electron'

import { i18n } from '../common/i18n'

export function openProjectScreen (mount_element) {
  const openButton = document.createElement('button')
  openButton.innerHTML = i18n.trans('OPEN_EXISTING_PROJECT')
  openButton.onclick = () => {
    ipcRenderer.invoke('open-dialog').then((result) => {
      if (!result.canceled) {
        console.log(result.filePaths)
        window.close()
      }
    })
  }
  mount_element.appendChild(openButton)
}
