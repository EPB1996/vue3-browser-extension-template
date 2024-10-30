import './index.scss'

const contentScript = createContentScript()

chrome.storage.sync.get(['devoteam-extension-settings'], (result) => {
  const contentScriptVisible =
    result['devoteam-extension-settings'].content_script_settings.options
      .contentScriptVisability

  const contentScriptXPosition =
    result['devoteam-extension-settings'].content_script_settings.options
      .contentScriptXPosition
  const contentScriptYPosition =
    result['devoteam-extension-settings'].content_script_settings.options
      .contentScriptYPosition
  setPosition(contentScriptXPosition, contentScriptYPosition)
  setVisibility(contentScriptVisible)
})

chrome.storage.onChanged.addListener((changes) => {
  const contentScriptVisible =
    changes['devoteam-extension-settings'].newValue.content_script_settings
      .options.contentScriptVisability

  const contentScriptXPosition =
    changes['devoteam-extension-settings'].newValue.content_script_settings
      .options.contentScriptXPosition
  const contentScriptYPosition =
    changes['devoteam-extension-settings'].newValue.content_script_settings
      .options.contentScriptYPosition

  setPosition(contentScriptXPosition, contentScriptYPosition)

  setVisibility(contentScriptVisible)
})

function setPosition(x: any, y: any) {
  const menu = contentScript.querySelector('.menu') as HTMLDivElement
  const crxIframe = contentScript.querySelector('.crx-iframe') as HTMLDivElement

  const menuPadding = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--menu-padding')

  const menuSize = getComputedStyle(document.documentElement).getPropertyValue(
    '--menu-size'
  )

  if (x.selectedOption === 'left') {
    menu.style.left = menuPadding
    menu.style.right = 'auto'

    crxIframe.style.left = `calc(${menuPadding} + ${menuSize} / 1.5)`
    crxIframe.style.right = 'auto'
  } else if (x.selectedOption === 'right') {
    menu.style.right = menuPadding
    menu.style.left = 'auto'

    crxIframe.style.right = `calc(${menuPadding} + ${menuSize} / 1.5)`
    crxIframe.style.left = 'auto'
  }
  if (y.selectedOption === 'top') {
    menu.style.top = menuPadding
    menu.style.bottom = 'auto'

    crxIframe.style.top = `calc(${menuPadding} + ${menuSize} / 1.5)`
    crxIframe.style.bottom = 'auto'
  } else if (y.selectedOption === 'bottom') {
    menu.style.bottom = menuPadding
    menu.style.top = 'auto'

    crxIframe.style.bottom = `calc(${menuPadding} + ${menuSize} / 1.5)`
    crxIframe.style.top = 'auto'
  }
}

function setVisibility(contentScriptVisible: any) {
  if (contentScriptVisible.active === false) {
    if (contentScript) {
      contentScript.remove()
    }
  } else if (contentScriptVisible.active === true) {
    if (contentScript) {
      document.body?.append(contentScript)
    }
  }
}

function createContentScript() {
  const src = chrome.runtime.getURL('src/content-script/iframe/index.html')

  const button = new DOMParser().parseFromString(
    `<div class="menu"></div>`,
    'text/html'
  ).body.firstElementChild as HTMLDivElement

  button.style.backgroundImage = `url(${chrome.runtime.getURL('/icons/icon128.png')})`

  const iframe = new DOMParser().parseFromString(
    `<iframe class="crx-iframe" src="${src}"></iframe> 
 `,
    'text/html'
  ).body.firstElementChild as HTMLDivElement

  /*  button.onmouseover = () => {
    iframe.classList.add('show')
  }

  button.onmouseleave = () => {
    if (!iframe.matches(':hover')) {
      iframe.classList.remove('show')
    }
  }

  iframe.onmouseleave = () => {
    iframe.classList.remove('show')
  } */

  button.onclick = () => {
    iframe.classList.toggle('show')
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
