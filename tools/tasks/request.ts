import { checkFormat, affectedLint, affectedTest, affectedBuild } from './tasks'
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
  ],
  {
    /* options */
    concurrent: false,
    exitOnError: true,
  }
)

tasks.run(null).then(console.log).catch(console.error)
