<script>
  import { UserDataStore } from "$ts/stores/user";
  export let password = "";
</script>

{#if !$UserDataStore.sh.securityNoPassword && !$UserDataStore.sh.elevationDisabled}
  <input
    type="password"
    bind:value={password}
    placeholder="Password"
    class="password-field"
  />
{/if}
