export function getMimeType(bytes: number) {
  switch (bytes) {
    case 0x89504e47:
      return 'image/png'
    case 0x47494638:
      return 'image/gif'
    case 0x25504446:
      return 'application/pdf'
    case 0x504b0304:
      return 'application/zip'
    case 0x00480140c040:
      return 'video/mp4'
    case 0x00480140c050:
      return 'video/quicktime'
  }
}

const getMimetype = (signature) => {
  switch (signature) {
    case '89504E47':
      return 'image/png'
    case '47494638':
      return 'image/gif'
    case '25504446':
      return 'application/pdf'
    case 'FFD8FFDB':
    case 'FFD8FFE0':
      return 'image/jpeg'
    case '3C3F786D':
      return 'image/svg+xml'
    case '504B0304':
      return 'application/zip'
    case '7BA2020':
      return 'application/json'
    case '0001C':
      return 'video/mp4'
    case '00014':
      return 'video/quicktime'
    default:
      return 'Unknown filetype'
  }
}

export function typeOfFile(
  file: File & { verifiedType?: string }
): Promise<File & { verifiedType?: string }> {
  const slice = file.slice(0, 4)
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.readAsArrayBuffer(slice)

    reader.addEventListener('load', () => {
      const buffer = reader.result as ArrayBuffer

      // const view = new DataView(buffer)
      // const magic = view.getUint32(0, false)
      // file.verifiedType = getMimeType(magic)

      const uint = new Uint8Array(buffer)
      const bytes = []
      uint.forEach((byte) => bytes.push(byte.toString(16)))
      const hex = (file.verifiedType = getMimetype(
        bytes.join('').toUpperCase()
      ))

      resolve(file)
    })
  })
}
