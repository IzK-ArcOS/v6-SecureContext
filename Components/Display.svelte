<script lang="ts">
  import { ElevationData } from "$types/elevation";

  export let data: ElevationData;
</script>

<div class="display">
  <img src={data.image} alt={data.title} />
  <div class="context">
    <p class="title">{data.title}</p>
    <p class="description">{data.description}</p>
  </div>
</div>
