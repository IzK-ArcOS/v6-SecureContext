import { SecureIcon } from "$ts/images/general";
import { isServiceRunning } from "$ts/service/interact";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { Runtime } from "./runtime";

export const SecureContext: App = {
  metadata: {
    name: "Secure Context",
    description: "Asks for confirmation to perform dangerous tasks",
    author: "The ArcOS Team",
    version: "1.0.0",
    icon: SecureIcon,
    hidden: true,
    appGroup: "internal",
    noCloseAccelerator: true,
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "SecureContext",
  size: { w: 385, h: 370 },
  minSize: { w: 385, h: 370 },
  maxSize: { w: 385, h: 370 },
  pos: { x: 40, y: 40 },
  state: {
    minimized: false,
    maximized: false,
    headless: false,
    fullscreen: false,
    resizable: false,
  },
  controls: {
    minimize: false,
    maximize: false,
    close: false,
  },
  singleInstance: true,
  spawnCondition: () => isServiceRunning("ElevationService"),
};
