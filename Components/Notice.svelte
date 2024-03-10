<script lang="ts">
  import { UserDataStore } from "$ts/stores/user";
</script>

<p class="notice" class:flex={$UserDataStore.sh.elevationDisabled}>
  {#if !$UserDataStore.sh.elevationDisabled}
    {#if !$UserDataStore.sh.securityNoPassword}
      To continue, type in your password, and then click <b>Approve</b>.
    {:else if $UserDataStore}
      To continue, click <b>Approve</b>.
    {/if}
  {:else}
    <span class="material-icons-round">report</span>
    <span>
      You can't continue because elevation is disabled. Click
      <b><i>Security Settings</i></b> to change this behaviour.
    </span>
  {/if}
</p>
