<script lang="ts">
  import { OpenSettingsPage } from "$apps/Settings/ts/main";
  import { TrayIconOpened } from "$apps/Shell/ts/stores";
  import { changeTrayIconImage } from "$apps/Shell/ts/tray";
  import { TrayIcon } from "$apps/Shell/types/tray";
  import { GetUserElevation } from "$ts/elevation";
  import { SecurityHighIcon, SecurityLowIcon, SecurityMediumIcon } from "$ts/images/general";
  import { LockIcon } from "$ts/images/power";
  import { ElevationEnableNoPassword } from "$ts/stores/elevation";
  import { ProcessStack } from "$ts/stores/process";
  import { UserDataStore, UserDataStore as user } from "$ts/stores/user";
  import { ReadableStore } from "$types/writable";
  import { onMount } from "svelte";

  export let icon: TrayIcon;
  export let openedTray: ReadableStore<string>;

  async function togglePassword() {
    if (!$user.sh.securityNoPassword) {
      const elevated = await GetUserElevation(ElevationEnableNoPassword(), ProcessStack);

      if (!elevated) return;

      $user.sh.securityNoPassword = true;

      return;
    }

    $user.sh.securityNoPassword = false;
  }

  onMount(() => {
    let previousState = "";

    user.subscribe((v) => {
      const state = v.sh.bypassElevation
        ? SecurityHighIcon
        : v.sh.elevationDisabled
          ? LockIcon
          : v.sh.securityNoPassword
            ? SecurityMediumIcon
            : SecurityLowIcon;

      if (state == previousState) return;

      previousState = state;

      changeTrayIconImage(icon.identifier, state);
    });
  });

  function settings() {
    $TrayIconOpened = false;
    $openedTray = "";
    OpenSettingsPage("security");
  }
</script>

<div class="top">
  {#if !$UserDataStore.sh.bypassElevation}
    <div class="setting" class:disabled={$user.sh.elevationDisabled || $user.sh.bypassElevation}>
      <button
        disabled={$user.sh.elevationDisabled || $user.sh.bypassElevation}
        class="material-icons-round"
        class:suggested={!$user.sh.securityNoPassword}
        on:click={togglePassword}
      >
        vpn_key
      </button>
      <p class="caption">Password</p>
    </div>
    <div class="setting" class:disabled={$user.sh.bypassElevation}>
      <button
        disabled={$user.sh.bypassElevation}
        class="material-icons-round"
        class:suggested={$user.sh.elevationDisabled}
        on:click={() => ($user.sh.elevationDisabled = !$user.sh.elevationDisabled)}
      >
        lock
      </button>
      <p class="caption">Lockdown</p>
    </div>
  {:else}
    <div class="disabled-notice">
      <p>Elevation is disabled!</p>
      <button class="suggested" on:click={settings}>Open settings</button>
    </div>
  {/if}
</div>
<div class="bottom">
  <img
    src={$user.sh.bypassElevation
      ? SecurityHighIcon
      : $user.sh.elevationDisabled
        ? LockIcon
        : $user.sh.securityNoPassword
          ? SecurityMediumIcon
          : SecurityLowIcon}
    alt=""
  />
  <div class="sep" />
  <span
    >{$user.sh.bypassElevation
      ? "At risk!"
      : $user.sh.elevationDisabled
        ? "In lockdown"
        : $user.sh.securityNoPassword
          ? "Mildly insecure"
          : "All is good"}
  </span>
</div>

<style>
  div.top {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    max-height: 98px;
  }

  div.setting {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  div.setting button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 70px;
    height: 35px;
    background-color: var(--button-glass-bg);
    font-size: 16px;
    min-width: unset !important;
  }

  div.setting button:hover {
    background-color: var(--button-glass-hover-bg);
  }

  div.setting button:active {
    background-color: var(--button-glass-active-bg);
  }

  div.setting p {
    margin: 0;
    opacity: 0.5;
  }

  div.setting.disabled {
    opacity: 0.7;
  }

  div.setting button:disabled {
    filter: grayscale();
  }

  div.bottom {
    background-color: var(--button-glass-active-bg);
    height: 50px;
    border-top: var(--button-glass-hover-bg) 1px solid;
    display: flex;
    gap: 10px;
    padding: 13px;
    margin-top: 1px;
    align-items: center;
  }

  div.bottom div.sep {
    width: 1px;
    height: 20px;
    background-color: var(--button-glass-hover-bg);
  }

  div.top div.disabled-notice {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
  }
</style>
