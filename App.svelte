<script lang="ts">
  import { ElevationData } from "$types/elevation";
  import { onMount } from "svelte";
  import Display from "./Components/Display.svelte";
  import Header from "./Components/Header.svelte";
  import Password from "./Components/Password.svelte";
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";
  import { UserName } from "$ts/stores/user";
  import Actions from "./Components/Actions.svelte";
  import Notice from "./Components/Notice.svelte";

  export let runtime: Runtime;

  let password: string;
  let id: number;
  let data: ElevationData;

  onMount(() => {
    runtime.data.subscribe((v) => (data = v));
    runtime.id.subscribe((v) => (id = v));
  });
</script>

{#if id && data}
  <Header {data} />
  <div class="top">
    <p class="what">{@html data.what}</p>
    <Display {data} />
    <Notice />
    <Password bind:password />
    <div class="login-status">
      <p class="whoami">Authorizing as {$UserName}</p>
      <button class="link settings">Security Settings</button>
    </div>
  </div>
  <Actions {data} {id} {password} {runtime} />
{/if}
