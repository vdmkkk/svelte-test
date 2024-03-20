<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Burger from '$lib/assets/icons/burger.svg';
    import ArrowUp from '$lib/assets/icons/arrow up.svg?raw';
    import RadioOn from '$lib/assets/icons/radio on.svg';
    import RadioOff from '$lib/assets/icons/radio off.svg';
    
    export let id: number;
    export let options: { id: string; label: string }[] = [];
    export let selectedId: string = '';
    export let isOpen: number;
  
    const dispatch = createEventDispatcher();
  
    function selectOption(optionId: string) {
      isOpen = -1;
      dispatch('select', optionId);
    }
  </script>
  
  <div class="dropdown">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class={isOpen == id ? 'selected' : 'selectedNoFocus'} on:click={() => (isOpen == id ? isOpen = -1 : isOpen = id)}>
        {options.find(option => option.id === selectedId)?.label}
        <div class={isOpen == id ? "arrowDown" : "arrowUp"}>
            {@html ArrowUp}
        </div>
        
    </div>
        {#if isOpen == id}
        <ul>
            {#each options as option}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li on:click={() => selectOption(option.id)}>{option.label}</li>
            {/each}
        </ul>
        {/if}
    </div>
  
  <style>
    .dropdown {
      position: relative;
      display: inline-block;
      width: 200px;
    }
    ul {
      position: absolute;
      list-style-type: none;
      padding: 0;
      margin: 0;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
      z-index: 1;
      background-color: white;
    }
    li {
      padding: 8px;
      cursor: pointer;
    }
    li:hover {
      background-color: #f0f0f0;
    }
    .selected, .selectedNoFocus {
      padding: 8px;
      cursor: pointer;
      background-color: white;
      border: 2px solid #FFCF08;
      border-radius: 15px;
      display: flex;
      flex-direction: row;
    }

    .selectedNoFocus {
        border: 3px solid #A7A7A7;
    }

    @keyframes arrowUpAnim {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(180deg);
        }
    }

    @keyframes arrowDownAnim {
        from {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
    .arrowUp, .arrowDown {
      /* margin-left: 18px; */
      animation: arrowUpAnim .15s linear forwards;
    }

    .arrowDown {
        animation: arrowDownAnim .15s linear forwards;
    }
  </style>
  