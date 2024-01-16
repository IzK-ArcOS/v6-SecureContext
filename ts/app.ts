import { DefaultIcon } from "$ts/images/apps";
import { Runtime } from "./runtime";
import AppSvelte from "../App.svelte";
import { App } from "$types/app";
import { SecureIcon } from "$ts/images/general";

export const SecureContext: App = {
  metadata: {
    name: "Secure Context",
    description: "Asks for confirmation to perform dangerous tasks",
    author: "The ArcOS Team",
    version: "1.0.0",
    icon: SecureIcon
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "SecureContext",
  size: { w: 385, h: 360 },
  minSize: { w: 385, h: 360 },
  maxSize: { w: 385, h: 360 },
  pos: { x: 40, y: 40 },
  state: {
    minimized: false,
    maximized: false,
    headless: false,
    fullscreen: false,
    resizable: false
  },
  controls: {
    minimize: false,
    maximize: false,
    close: false
  },
  singleInstance: true,
}