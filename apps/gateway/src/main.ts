/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { readFileSync } from 'fs'

import { AppModule } from './app.module'
import { environment } from './environments/environment'

const certificates = {
  key: readFileSync('./server/private/localhost.key.pem'),
  cert: readFileSync('./server/private/localhost.cert.pem'),
}

async function bootstrap() {
  const httpsOptions = environment.certificate ? certificates : {}
  const app = await NestFactory.create(AppModule, { httpsOptions })
  const globalPrefix = 'gateway'
  app.setGlobalPrefix(globalPrefix)
  const port = process.env.PORT || 3333
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix)
  })
}

bootstrap()
