import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
// import { readFileSync } from 'fs'
import { AppLogger } from './app.logger'

import { AppModule } from './app.module'
// import { environment } from './environments/environment'

// const certificates = {
//   key: readFileSync('./server/private/localhost.key.pem'),
//   cert: readFileSync('./server/private/localhost.cert.pem'),
// }

async function bootstrap() {
  // const httpsOptions = environment.certificate ? certificates : {}
  const app = await NestFactory.create(AppModule, { logger: new AppLogger() })

  const globalPrefix = 'gateway'

  app.setGlobalPrefix(globalPrefix)

  await app.listen(process.env.PORT || 3333, async () => {
    Logger.log(`Listening at ${await app.getUrl()}/${globalPrefix}`)
  })
}

bootstrap()
