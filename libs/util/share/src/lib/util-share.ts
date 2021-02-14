import { getLang } from './lang'
import { ShareConfig, ShareTool, Share } from './types'
import { platform } from './utils/platform'

navigator.share = (navigator as any).share ?? share

export function share(data: Share, tool: ShareTool, lang: string = getLang()) {
  return new Promise((resolve, reject) => {
    resolve(utilShare(data, tool, lang))
  })
}

export function utilShare(
  data: Share,
  tool: ShareTool,
  lang: string = getLang()
) {
  const { text, url, title, hashtags } = data
  const isDesktop = !(platform.ios || platform.android)
  const payload = text + ': ' + url

  const fbId = ''

  switch (tool) {
    case 'copy': {
      return navigator.clipboard.writeText(url)
    }
    case 'print': {
      // to ensure it has been closed and the user has a clean view of the page
      return setTimeout((_) => {
        self.print()
      }, 500)
    }
    case 'email': {
      return window.open('mailto:' + '' + '?subject=' + title + '&body=' + url)
    }
    case 'sms': {
      // window.open(toolsUrls.sms(title + ': \n' + url));
      return (location.href = `sms:${lang}?&body=${title}: ${url}`)
      // window.open("sms:"+''+'?subject='+title+'&body='+url);
    }
    case 'messenger': {
      window.open(
        'http://www.facebook.com/dialog/send?' +
          'app_id=' +
          fbId +
          '&display=popup' +
          '&href=' +
          encodeURIComponent(url) +
          '&link=' +
          encodeURIComponent(url) +
          '&redirect_uri=' +
          encodeURIComponent(url) +
          '&quote=' +
          encodeURIComponent(text)
      )

      break
    }
    case 'facebook': {
      return window.open(
        'https://www.facebook.com/sharer/sharer.php?' +
          'u=' +
          encodeURIComponent(url) +
          '&quote=' +
          encodeURIComponent(text)
      )
    }
    case 'whatsapp': {
      return window.open(
        (isDesktop
          ? 'https://api.whatsapp.com/send?text='
          : 'whatsapp://send?text=') + encodeURIComponent(text + '\n' + url)
      )
    }
    case 'twitter': {
      return window.open(
        `http://twitter.com/share?text=${text}&url=${url}&hashtags=${
          hashtags || ''
        }`
      )
    }
    case 'linkedin': {
      return window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}&source=LinkedIn`
      )
    }
    case 'telegram': {
      return window.open(
        isDesktop
          ? 'https://telegram.me/share/msg?url=' + url + '&text=' + text
          : 'tg://msg?text=' + payload
      )
    }
  }
}

// /**
//  * Type definition
//  */
// declare global {
//   interface Window {
//     Skype: {
//       initialize: ({ apiKey: string }, fn1: Function, fn2: Function) => void
//     }
//     loadSkypeWebSdkAsync: Function
//   }
// }
