<script lang="ts">
  import { ErrorIcon } from "$ts/images/dialog";
  import { GlobalDispatch } from "$ts/process/dispatch/global";
  import { createErrorDialog } from "$ts/process/error";
  import { Authenticate } from "$ts/server/user/auth";
  import { ProcessStack } from "$ts/stores/process";
  import { UserDataStore, UserName } from "$ts/stores/user";
  import Actions from "./Components/Actions.svelte";
  import Display from "./Components/Display.svelte";
  import Header from "./Components/Header.svelte";
  import Notice from "./Components/Notice.svelte";
  import Password from "./Components/Password.svelte";
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";

  export let runtime: Runtime;

  const { id, data } = runtime;

  let password: string;
  let loading = false;

  async function reject() {
    GlobalDispatch.dispatch<[number]>("elevation-reject", [$id]);

    exit();
  }

  async function approve() {
    if (loading) return; // Prevent spamming

    loading = true;

    const valid =
      $UserDataStore.sh.securityNoPassword ||
      (await Authenticate($UserName, password, false));

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
              action() {
                loading = false;
              },
              suggested: true,
            },
          ],
        },
        runtime.pid,
        true
      );
      return;
    }

    GlobalDispatch.dispatch<[number]>("elevation-accept", [$id]);

    exit();
  }

  function exit() {
    ProcessStack.kill(runtime.pid, true);
  }
</script>

{#if $id && $data}
  <Header data={$data} />
  <div class="top">
    <p class="what">{@html $data.what}</p>
    <Display data={$data} />
    <Notice />
    <Password bind:password bind:loading {approve} />
    <div class="login-status">
      <p class="whoami">Authorizing as {$UserName}</p>
      <button class="link settings">Security Settings</button>
    </div>
  </div>
  <Actions data={$data} {password} {approve} {reject} {loading} />
{/if}
