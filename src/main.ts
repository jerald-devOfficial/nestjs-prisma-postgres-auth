import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // set the port to 5000 since 3000 maybe used by the client apps
  await app.listen(5000)
}
bootstrap()
