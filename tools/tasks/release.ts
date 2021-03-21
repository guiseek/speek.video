#!/bin/node

import {
  // npmCi,
  checkFormat,
  affectedLint,
  affectedTest,
  affectedBuild,
  createVersion,
} from './tasks'
import { Listr } from 'listr2'

interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>(
  [
    {
      title: 'Check Format',
      task: async () => await checkFormat,
    },
    {
      title: 'Affected',
      task: async (ctx, task) =>
        task.newListr((parent) => [
          {
            title: 'Lint',
            task: async () => await affectedLint,
          },
          {
            title: 'Test',
            task: async () => await affectedTest,
          },
          {
            title: 'Build',
            task: async () => await affectedBuild,
          },
        ]),
    },
    {
      title: 'Version',
      task: async () => await createVersion,
    },
  ],
  {
    /* options */
    concurrent: false,
    exitOnError: true,
  }
)

tasks.run(null).then(console.log).catch(console.error)

// echo Check Format
// npm run format:check

// echo Lint Workspace & Code
// npm run nx -- workspace-lint && npm run affected:lint -- --all

// echo Unit Tests
// npm run affected:test -- --all

// echo Build, Release on GitHub & Publish to NPM
// npm run release
