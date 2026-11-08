import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '3dt82du8',
    dataset: 'production'
  },
  // Editors sign in at https://sba-website.sanity.studio
  studioHost: 'sba-website',
  deployment: {
    appId: 'lp3152jteo3mkb6ykg4txjcw',
    autoUpdates: true,
  },
})
