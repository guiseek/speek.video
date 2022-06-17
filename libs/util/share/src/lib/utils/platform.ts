const android = navigator.userAgent.match(/Android/i)
const ios = navigator.userAgent.match(/iPhone|iPad|iPod/i)
const mac = navigator.userAgent.match(/iPhone|iPad|iPod|Macintosh/i) // Test if mac to use ios/mac share icon on title, used to invoke the familiary concept.

export const platform = {
  android,
  ios,
  mac,
}
