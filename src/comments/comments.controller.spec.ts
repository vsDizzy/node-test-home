import { INestApplication, ValidationPipe } from '@nestjs/common'
import {
  getModelToken,
  MongooseModule,
  MongooseModuleOptions
} from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { ErrorInterceptor } from '../../src/interceptors/error.interceptor'
import { CommentsModule } from './comments.module'
import { CommentsRepository } from './comments.repository'

describe('CommentsController', () => {
  let app: INestApplication

  beforeAll(async () => {
    const tm = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: (): MongooseModuleOptions => ({
            uri: 'mongodb://localhost:27017/th',
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
          })
        }),
        CommentsModule
      ]
    })
      .overrideProvider(getModelToken('Comment'))
      .useValue({ init: async () => ({}) })
      .overrideProvider(CommentsRepository)
      .useValue({
        get: async () => ({ r: 'ee' }),
        update: () => ({ r: 'ok' })
      })
      .compile()
    app = tm.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    app.useGlobalInterceptors(new ErrorInterceptor())
    await app.init()
  })

  it('get comment', () => {
    return request(app.getHttpServer())
      .get('/comments/aaa/bbb')
      .expect(200)
  })

  it('not found', () => {
    return request(app.getHttpServer())
      .get('/comm^%ents/aaa/bbb')
      .expect(404)
  })

  it('moderate request', () => {
    return request(app.getHttpServer())
      .patch('/comments/aaa/bbb')
      .send({ status: 'declined' })
      .expect(200)
  })

  it('bad moderate request', () => {
    return request(app.getHttpServer())
      .patch('/comments/aaa/bbb')
      .send({ status: true })
      .expect(400)
  })

  afterAll(async () => {
    await app.close()
  })
})
