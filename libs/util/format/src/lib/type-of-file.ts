export function typeOfFile(
  file: File & { verifiedType?: string }
): Promise<File> {
  const slice = file.slice(0, 4)
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.readAsArrayBuffer(slice)
    reader.addEventListener('load', ({ target }) => {
      const view = new DataView(target.result as ArrayBuffer)

      switch (view.getUint32(0, false)) {
        case 0x89504e47: {
          file.verifiedType = 'image/png'
          break
        }
        case 0x47494638: {
          file.verifiedType = 'image/gif'
          break
        }
        case 0x25504446: {
          file.verifiedType = 'application/pdf'
          break
        }
        case 0x504b0304: {
          file.verifiedType = 'application/zip'
          break
        }
      }
      resolve(file)
    })
  })
}
