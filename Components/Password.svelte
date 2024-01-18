<script lang="ts">
  import { UserDataStore } from "$ts/stores/user";

  export let password = "";
  export let approve: () => void;
  export let loading: boolean;

  function submit(e: SubmitEvent) {
    e.preventDefault();

    approve();
  }
</script>

{#if !$UserDataStore.sh.securityNoPassword && !$UserDataStore.sh.elevationDisabled}
  <form on:submit={submit} class="password-form">
    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      class="password-field"
      disabled={loading}
    />
  </form>
{/if}
