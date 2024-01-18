<script lang="ts">
  import { UserDataStore, UserName } from "$ts/stores/user";
  import { ElevationData } from "$types/elevation";
  import { onMount } from "svelte";
  import Actions from "./Components/Actions.svelte";
  import Display from "./Components/Display.svelte";
  import Header from "./Components/Header.svelte";
  import Notice from "./Components/Notice.svelte";
  import Password from "./Components/Password.svelte";
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";
  import { ErrorIcon } from "$ts/images/dialog";
  import { createErrorDialog } from "$ts/process/error";
  import { GlobalDispatch } from "$ts/process/dispatch/global";
  import { Authenticate } from "$ts/server/user/auth";
  import { ProcessStack } from "$ts/stores/process";

  export let runtime: Runtime;

  let password: string;
  let id: number;
  let data: ElevationData;
  let loading = false;

  onMount(() => {
    runtime.data.subscribe((v) => (data = v));
    runtime.id.subscribe((v) => (id = v));
  });

  async function reject() {
    GlobalDispatch.dispatch<[number]>("elevation-reject", [id]);

    exit();
  }

  async function approve() {
    loading = true;
    const valid =
      $UserDataStore.sh.securityNoPassword ||
      (await Authenticate($UserName, password, false));

    loading = false;

    if (!valid) {
      createErrorDialog(
        {
          title: "Authentication failed",
          message:
            "The password you entered is incorrect. Please try typing it again.",
          sound: "arcos.dialog.error",
          image: ErrorIcon,
          buttons: [
            {
              caption: "Okay",
              action() {},
              suggested: true,
            },
          ],
        },
        runtime.pid,
        true
      );
      return;
    }

    GlobalDispatch.dispatch<[number]>("elevation-accept", [id]);

    exit();
  }

  function exit() {
    ProcessStack.kill(runtime.pid, true);
  }
</script>

{#if id && data}
  <Header {data} />
  <div class="top">
    <p class="what">{@html data.what}</p>
    <Display {data} />
    <Notice />
    <Password bind:password {approve} />
    <div class="login-status">
      <p class="whoami">Authorizing as {$UserName}</p>
      <button class="link settings">Security Settings</button>
    </div>
  </div>
  <Actions {data} {password} {approve} {reject} {loading} />
{/if}
