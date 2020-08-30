'use strict'

// placeholder until we integrate the i18n from the lektor JS library
export const i18n = {
  trans (key) {
    return {
      OPEN_PROJECT_TITLE: 'Open a Lektor project',
      NEW_PROJECT_TITLE: 'Create a Lektor project',
      OPEN_EXISTING_PROJECT: 'Open an existing project',
      LEKTOR_PROJECT: 'Lektor Project',
      ALL_FILES: 'All Files'
    }[key]
  }
}
