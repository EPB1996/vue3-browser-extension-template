import './index.scss'

const contentScript = createContentScript()

chrome.storage.sync.get(['showContentScript'], (result) => {
  if (result.showContentScript.active === false) {
    if (contentScript) {
      contentScript.remove()
    }
  } else if (result.showContentScript.active === true) {
    if (contentScript) {
      document.body?.append(contentScript)
    }
  }
})

chrome.storage.onChanged.addListener((changes) => {
  for (const [key, value] of Object.entries(changes)) {
    if (key === 'showContentScript' && value.newValue.active === false) {
      if (contentScript) {
        contentScript.remove()
      }
    } else if (key === 'showContentScript' && value.newValue.active === true) {
      if (contentScript) {
        document.body?.append(contentScript)
      }
    }
  }
})

function createContentScript() {
  const src = chrome.runtime.getURL('src/content-script/iframe/index.html')

  const button = new DOMParser().parseFromString(
    `<div class="menu"></div>`,
    'text/html'
  ).body.firstElementChild as HTMLDivElement

  button.style.backgroundImage = `url(${chrome.runtime.getURL('src/assets/images/logo.jpg')})`

  const iframe = new DOMParser().parseFromString(
    `<iframe class="crx-iframe" src="${src}"></iframe> 
 `,
    'text/html'
  ).body.firstElementChild as HTMLDivElement

  button.onmouseover = () => {
    iframe.classList.add('show')
  }

  button.onmouseleave = () => {
    if (!iframe.matches(':hover')) {
      iframe.classList.remove('show')
    }
  }

  iframe.onmouseleave = () => {
    iframe.classList.remove('show')
  }

  const menu = new DOMParser().parseFromString(`<div ></div>`, 'text/html').body
    .firstElementChild as HTMLDivElement

  menu.appendChild(button)
  menu.appendChild(iframe)
  return menu
}

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}
