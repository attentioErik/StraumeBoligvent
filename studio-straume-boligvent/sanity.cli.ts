import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '41btjoop',
    dataset: 'production'
  },
  studioHost: 'straume-boligvent',
  deployment: {
    autoUpdates: true,
    appId: 'pn9dyr34cys8k5thjseluiyw',
  }
})
