import { Test, TestingModule } from '@nestjs/testing'
import { SignalingGateway } from './signaling.gateway'
import { AppLogger } from '../app.logger'

describe('SignalingGateway', () => {
  let gateway: SignalingGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppLogger, SignalingGateway],
    }).compile()

    gateway = module.get<SignalingGateway>(SignalingGateway)
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })
})
