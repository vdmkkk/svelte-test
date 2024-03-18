<script lang="ts">
  let count: number = 0;

  function increment(): void {
    count += 1;
  }

  function decrement(): void {
    count -= 1;
  }
</script>

<button on:click={decrement}>-</button>
<span>{count}</span>
<button on:click={increment}>+</button>

<style>
  span {
    margin: 0 1rem;
  }
</style>
