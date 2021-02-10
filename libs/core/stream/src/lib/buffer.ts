export function createFadeBuffer(
  context: AudioContext,
  activeTime: number,
  fadeTime: number
) {
  const length1 = activeTime * context.sampleRate
  const length2 = (activeTime - 2 * fadeTime) * context.sampleRate
  const length = length1 + length2
  const buffer = context.createBuffer(1, length, context.sampleRate)
  const p = buffer.getChannelData(0)

  const fadeLength = fadeTime * context.sampleRate

  const fadeIndex1 = fadeLength
  const fadeIndex2 = length1 - fadeLength

  // 1st part of cycle
  for (let i = 0; i < length1; ++i) {
    let value: number

    if (i < fadeIndex1) {
      value = Math.sqrt(i / fadeLength)
    } else if (i >= fadeIndex2) {
      value = Math.sqrt(1 - (i - fadeIndex2) / fadeLength)
    } else {
      value = 1
    }

    p[i] = value
  }

  // 2nd part
  for (let i = length1; i < length; ++i) {
    p[i] = 0
  }

  return buffer
}

export function createDelayTimeBuffer(
  context: AudioContext,
  activeTime: number,
  fadeTime: number,
  shiftUp: boolean
) {
  const length1 = activeTime * context.sampleRate
  const length2 = (activeTime - 2 * fadeTime) * context.sampleRate
  const length = length1 + length2
  const buffer = context.createBuffer(1, length, context.sampleRate)
  const p = buffer.getChannelData(0)

  // 1st part of cycle
  for (let i = 0; i < length1; ++i) {
    if (shiftUp)
      // This line does shift-up transpose
      p[i] = (length1 - i) / length
    // This line does shift-down transpose
    else p[i] = i / length1
  }

  // 2nd part
  for (let i = length1; i < length; ++i) {
    p[i] = 0
  }

  return buffer
}
