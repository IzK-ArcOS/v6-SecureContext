<script lang="ts">
  import HtmlSpinner from "$lib/Components/HtmlSpinner.svelte";
  import { ErrorIcon } from "$ts/images/dialog";
  import { GlobalDispatch } from "$ts/process/dispatch/global";
  import { createErrorDialog } from "$ts/process/error";
  import { Authenticate } from "$ts/server/user/auth";
  import { ProcessStack } from "$ts/stores/process";
  import { UserDataStore, UserName } from "$ts/stores/user";
  import { ElevationData, ElevationLevel } from "$types/elevation";
  import { Runtime } from "../ts/runtime";

  export let data: ElevationData;
  export let id: number;
  export let password: string;
  export let runtime: Runtime;

  let loading = false;

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

  async function reject() {
    GlobalDispatch.dispatch<[number]>("elevation-reject", [id]);

    exit();
  }

  function exit() {
    ProcessStack.kill(runtime.pid, true);
  }
</script>

<div class="actions">
  <div class="right">
    <button class="reject" on:click={reject}>Reject</button>
    {#if !$UserDataStore.sh.elevationDisabled}
      <button
        class="approve level-{ElevationLevel[data.level]}"
        on:click={approve}
        disabled={!$UserDataStore.sh.securityNoPassword &&
          !password &&
          !loading}
      >
        {#if loading}
          <HtmlSpinner height={16} />
        {:else}
          Approve
        {/if}
      </button>
    {/if}
  </div>
</div>
