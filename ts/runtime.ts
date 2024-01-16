import { AppRuntime } from "$ts/apps/runtime";
import { Process } from "$ts/process";
import { ArcSoundBus } from "$ts/soundbus";
import { ProcessStack } from "$ts/stores/process";
import { Store } from "$ts/writable";
import type { App, AppMutator } from "$types/app";
import { ElevationData } from "$types/elevation";
import { ReadableStore } from "$types/writable";

export class Runtime extends AppRuntime {
  public data: ReadableStore<ElevationData> = Store();
  public id: ReadableStore<number> = Store();

  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    const args = process.args;

    function stop() {
      ProcessStack.kill(process.pid)

      return this;
    }

    if (args.length < 2) return stop()

    const [id, data] = args as [string, ElevationData];

    if (typeof data != "object" || typeof id != "number") return stop();

    this.id.set(id);
    this.data.set(data);

    ArcSoundBus.playSound("arcos.dialog.info")
  }
}