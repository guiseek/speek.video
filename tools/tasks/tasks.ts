import { exec } from 'child_process'

const exeek = async (cmd: string): Promise<any> => {
  return await new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) reject(error)
      resolve(stdout)
    })
  })
}

// export const npmCi = exeek('npm ci')

export const checkFormat = exeek('npm run format:write -- --exclude tools')

export const workspaceLint = exeek('npm run nx -- workspace-lint')

export const affectedLint = exeek('npm run affected:lint')

export const affectedTest = exeek('npm run affected:test')

export const affectedBuild = exeek('npm run affected:build')

export const createVersion = exeek('npm run version')
