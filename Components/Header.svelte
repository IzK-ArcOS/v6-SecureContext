<script lang="ts">
  import { ElevationLevelIcons } from "$ts/stores/elevation";
  import { ElevationData, ElevationLevel } from "$types/elevation";

  export let data: ElevationData;
</script>

<div class="header level-{ElevationLevel[data.level]}">
  <img src={ElevationLevelIcons[data.level]} alt={ElevationLevel[data.level]} />
  <p>ArcOS Secure Context</p>
</div>
