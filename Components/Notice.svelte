<script>
  import { UserDataStore } from "$ts/stores/user";
</script>

<p class="notice">
  {#if !$UserDataStore.sh.securityNoPassword}
    To continue, type in your password, and then click <b>Approve</b>.
  {:else}
    To continue, click <b>Approve</b>.
  {/if}
</p>
