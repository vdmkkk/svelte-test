<script lang="ts">
  import GoogleMap from './GoogleMap.svelte';
  import Dropdown from '$lib/components/Dropdown.svelte';
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


  // ! DROPDOWN LOGIC

  let isOpen: number = -1;

  let options = [
    { id: '1', label: 'Option 1' },
    { id: '2', label: 'Option 2' },
    { id: '3', label: 'Option 3' },
  ];
  let selectedId = options[0]['id'];

  function handleSelect(event: CustomEvent) {
    selectedId = event.detail;
  }
  // ? DROPDOWN LOGIC
  
</script>

<main>
  <h1>Salut!</h1>
  <GoogleMap/>
  <h1>Your JWT is {data.JWT ? data.JWT : "empty"}!</h1>
  <button on:click={() => setCookie("JWT", Date.now().toString(), 30)}>Поставить новый JWT</button>
  <button on:click={() => deleteCookie("JWT")}>Очистить JWT</button>
  <Dropdown id={1} {isOpen} {options} bind:selectedId on:select={handleSelect} />
  <Dropdown id={2} {isOpen} {options} bind:selectedId on:select={handleSelect} />
</main>
