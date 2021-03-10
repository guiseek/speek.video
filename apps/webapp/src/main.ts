import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { environment } from './environments/environment'
import { WebApplication, WithContext } from 'schema-dts'
import { enableProdMode } from '@angular/core'
import { AppModule } from './app/app.module'

const p: WithContext<WebApplication> = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Speek - Simples e seguro',
  about: 'Crie um link para conversar e pronto.',
  description:
    'Sua ligação funciona pessoa pra pessoa, sem servidores, sem persistência, direto ao ponto.',
  additionalType: 'Liberdade em áudio e vídeo',
  url: 'https://speek.video',
}

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err))
