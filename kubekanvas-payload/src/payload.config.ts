import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { migrations } from './migrations' 
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Check if we are currently building inside the isolated Docker compilation phase
const isDockerBuild = process.env.IS_DOCKER_BUILD === 'true'

// Dynamically construct the URI only when running in production
const connectionString = isDockerBuild
  ? 'postgresql://db-not-needed-during-build:5432/build'
  : `postgresql://${process.env.DB_USER || 'payload_user'}:${process.env.DB_PASSWORD || 'password'}@${process.env.DB_HOST || '127.0.0.1'}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'payload_prod'}`

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
      // 🚀 Dynamically point to whatever your folder is named inside app/(payload)/
      importMapFile: path.resolve(dirname, `app/(payload)/cms/importMap.js`), 
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: defaultLexical,
  
  // DYNAMIC ADAPTER: Uses the constructed connection string cleanly
  db: postgresAdapter({
    pool: {
      connectionString,
      connectionTimeoutMillis: isDockerBuild ? 1 : undefined,
    },
    push: false, 
    prodMigrations: migrations, 
    migrationDir: path.resolve(dirname, 'migrations'), 
  }),
  
  collections: [Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins,
  secret: process.env.PAYLOAD_SECRET || 'BUILD_PHASE_DUMMY_SECRET',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = process.env.CRON_SECRET
        if (!secret) return false
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})