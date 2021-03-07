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
  }
}

export function typeOfFile(
  file: File & { verifiedType?: string }
): Promise<File> {
  const slice = file.slice(0, 4)
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.readAsArrayBuffer(slice)
    reader.addEventListener('load', () => {
      const buffer = reader.result as ArrayBuffer

      const view = new DataView(buffer)
      const magic = view.getUint32(0, false)

      file.verifiedType = getMimeType(magic)

      resolve(file)
    })
  })
}
