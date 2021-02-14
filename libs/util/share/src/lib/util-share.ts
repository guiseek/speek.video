import { platform } from './utils/platform'
import { ShareTool, Share } from './types'

navigator.share = (navigator as any).share ?? share

export function share(data: Share, tool: ShareTool) {
  return new Promise((resolve, reject) => {
    resolve(utilShare(data, tool))
  })
}

export function utilShare(data: Share, tool: ShareTool) {
  const { text, url, title, hashtags } = data
  const isDesktop = !(platform.ios || platform.android)
  const payload = text + ': ' + url
  switch (tool) {
    case 'copy': {
      return navigator.clipboard.writeText(url)
    }
    case 'email': {
      return window.open('mailto:' + '' + '?subject=' + title + '&body=' + url)
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
