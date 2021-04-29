import { AlertConfig } from '@speek/ui/components'

export const alert: Partial<Record<PermissionState, AlertConfig>> = {
  prompt: {
    type: 'info',
    header: 'Permissões',
    body: `
  Iremos pedir que conceda permissão de acesso para câmera e microfone,
  para que tenha uma boa experiência com o aplicativo, tudo bem?
`,
  },
  denied: {
    type: 'warn',
    header: 'Permissões',
    body: `
  Parece que o aplicativo está sem permissão de acesso a sua câmera,
  verifique as permissões e tente novamente, por favor.
`,
  },
}
