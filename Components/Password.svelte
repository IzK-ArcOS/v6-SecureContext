<script lang="ts">
  import { UserDataStore } from "$ts/stores/user";

  export let password = "";
  export let approve: () => void;

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
    />
  </form>
{/if}
