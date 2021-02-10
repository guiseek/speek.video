import { createDelayTimeBuffer, createFadeBuffer } from './util/voice'

export class Voice {
  input: GainNode
  output: GainNode

  shiftDownBuffer: AudioBuffer
  shiftUpBuffer: AudioBuffer

  mod1: AudioBufferSourceNode
  mod2: AudioBufferSourceNode
  mod1Gain: GainNode
  mod2Gain: GainNode
  mod3Gain: GainNode
  mod4Gain: GainNode
  modGain1: GainNode
  modGain2: GainNode
  fade1: AudioBufferSourceNode
  fade2: AudioBufferSourceNode
  mix1: GainNode
  mix2: GainNode
  delay1: DelayNode
  delay2: DelayNode

  constructor(
    public context: AudioContext,
    public bufferTime: number = 0.1,
    public fadeTime: number = 0.05,
    public delayTime: number = 0.1
  ) {
    // this.context = context
    // Create nodes for the input and output of this "module".
    const input = context.createGain()
    const output = context.createGain()
    this.input = input
    this.output = output

    // Delay modulation.
    const mod1 = context.createBufferSource()
    const mod2 = context.createBufferSource()
    const mod3 = context.createBufferSource()
    const mod4 = context.createBufferSource()
    this.shiftDownBuffer = createDelayTimeBuffer(
      context,
      bufferTime,
      fadeTime,
      false
    )
    this.shiftUpBuffer = createDelayTimeBuffer(
      context,
      bufferTime,
      fadeTime,
      true
    )
    mod1.buffer = this.shiftDownBuffer
    mod2.buffer = this.shiftDownBuffer
    mod3.buffer = this.shiftUpBuffer
    mod4.buffer = this.shiftUpBuffer
    mod1.loop = true
    mod2.loop = true
    mod3.loop = true
    mod4.loop = true

    // for switching between oct-up and oct-down
    const mod1Gain = context.createGain()
    const mod2Gain = context.createGain()
    const mod3Gain = context.createGain()
    mod3Gain.gain.value = 0
    const mod4Gain = context.createGain()
    mod4Gain.gain.value = 0

    mod1.connect(mod1Gain)
    mod2.connect(mod2Gain)
    mod3.connect(mod3Gain)
    mod4.connect(mod4Gain)

    // Delay amount for changing pitch.
    const modGain1 = context.createGain()
    const modGain2 = context.createGain()

    const delay1 = context.createDelay()
    const delay2 = context.createDelay()
    mod1Gain.connect(modGain1)
    mod2Gain.connect(modGain2)
    mod3Gain.connect(modGain1)
    mod4Gain.connect(modGain2)
    modGain1.connect(delay1.delayTime)
    modGain2.connect(delay2.delayTime)

    // Crossfading.
    const fade1 = context.createBufferSource()
    const fade2 = context.createBufferSource()
    const fadeBuffer = createFadeBuffer(context, bufferTime, fadeTime)
    fade1.buffer = fadeBuffer
    fade2.buffer = fadeBuffer
    fade1.loop = true
    fade2.loop = true

    const mix1 = context.createGain()
    const mix2 = context.createGain()
    mix1.gain.value = 0
    mix2.gain.value = 0

    fade1.connect(mix1.gain)
    fade2.connect(mix2.gain)

    // Connect processing graph.
    input.connect(delay1)
    input.connect(delay2)
    delay1.connect(mix1)
    delay2.connect(mix2)
    mix1.connect(output)
    mix2.connect(output)

    // Start
    let t = context.currentTime + 0.05
    let t2 = t + bufferTime - fadeTime
    mod1.start(t)
    mod2.start(t2)
    mod3.start(t)
    mod4.start(t2)
    fade1.start(t)
    fade2.start(t2)

    this.mod1 = mod1
    this.mod2 = mod2
    this.mod1Gain = mod1Gain
    this.mod2Gain = mod2Gain
    this.mod3Gain = mod3Gain
    this.mod4Gain = mod4Gain
    this.modGain1 = modGain1
    this.modGain2 = modGain2
    this.fade1 = fade1
    this.fade2 = fade2
    this.mix1 = mix1
    this.mix2 = mix2
    this.delay1 = delay1
    this.delay2 = delay2

    this.setDelay(delayTime)
  }
  setDelay(delayTime: number) {
    this.modGain1.gain.setTargetAtTime(0.5 * delayTime, 0, 0.01)
    this.modGain2.gain.setTargetAtTime(0.5 * delayTime, 0, 0.01)
  }
  setPitchOffset(mult: number) {
    if (mult > 0) {
      // pitch up
      this.mod1Gain.gain.value = 0
      this.mod2Gain.gain.value = 0
      this.mod3Gain.gain.value = 1
      this.mod4Gain.gain.value = 1
    } else {
      // pitch down
      this.mod1Gain.gain.value = 1
      this.mod2Gain.gain.value = 1
      this.mod3Gain.gain.value = 0
      this.mod4Gain.gain.value = 0
    }
    this.setDelay(this.delayTime * Math.abs(mult))
  }
}
