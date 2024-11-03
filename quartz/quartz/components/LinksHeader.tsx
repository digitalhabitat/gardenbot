import { QuartzComponentConstructor } from "./types"
 import style from "./styles/linksHeader.scss"

interface Options {
  links: Record<string, string>
}

export default (() => {
  function LinksHeader() {
    return (
      <div id="links-header-container">
        <div id="links-header">
            <a class="links-header-item" href="/gardenbot">
            Intro</a>     
            <a class="links-header-item" href="/gardenbot/systems/wire-system/wire-system">
            Wiring</a>      
            <a class="links-header-item" href="/gardenbot/systems/localization-sysytem/gnss-rtk/usb-gnss-setup">
            RTK GNSS</a>
            <a class="links-header-item" href="/gardenbot//systems/power-system/power-system">
            Power System</a>
            <a class="links-header-item" href="/gardenbot//systems/computer-system/computer-system">
            Computer System</a>
        </div>
        <hr></hr>
      </div>
    )
  }

  LinksHeader.css = style
  return LinksHeader
}) satisfies QuartzComponentConstructor