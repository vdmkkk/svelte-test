<script lang="ts">
  import GoogleMap from './GoogleMap.svelte';
  export let data;

  function setCookie(name: string, value: string, daysToExpire: number) {
    const d = new Date();
    d.setTime(d.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
  }

  function deleteCookie(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }
  
</script>

<main>
  <h1>Salut!</h1>
  <GoogleMap/>
  <h1>Your JWT is {data.JWT ? data.JWT : "empty"}!</h1>
  <button on:click={() => setCookie("JWT", Date.now().toString(), 30)}>Поставить новый JWT</button>
  <button on:click={() => deleteCookie("JWT")}>Очистить JWT</button>
</main>
