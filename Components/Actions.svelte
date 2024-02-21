<script lang="ts">
  import HtmlSpinner from "$lib/Components/HtmlSpinner.svelte";
  import { UserDataStore } from "$ts/stores/user";
  import { ElevationData, ElevationLevel } from "$types/elevation";

  export let data: ElevationData;
  export let password: string;
  export let approve: () => void;
  export let reject: () => void;
  export let loading = false;
</script>

<div class="actions">
  <div class="right">
    <button class="reject" on:click={reject}>Reject</button>
    {#if !$UserDataStore.sh.elevationDisabled}
      <button
        class="approve level-{ElevationLevel[data.level]}"
        on:click={approve}
        disabled={!$UserDataStore.sh.securityNoPassword && !password && !loading}
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
