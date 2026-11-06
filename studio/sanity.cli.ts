import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '9yq6wer6',
    dataset: 'production'
  },
  // Editors sign in at https://sba-legal-consult.sanity.studio
  studioHost: 'sba-legal-consult',
  deployment: {
    appId: 'yuchuwacsz1mmovxpd5h2wjm',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
