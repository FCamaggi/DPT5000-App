<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Calculator from '$lib/components/Calculator.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte'; // Asegúrate de importar el ThemeToggle

  let calculatorOpen = false;
  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  function toggleCalculator() {
    calculatorOpen = !calculatorOpen;
  }
</script>

<style global>
  /* Estilos corregidos para la calculadora */
  .calculator-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 350px;
    background: white;
    box-shadow: -2px 0 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 40;
    overflow-y: auto;
  }

  .calculator-closed {
    transform: translateX(100%);
  }

  .calculator-open {
    transform: translateX(0);
  }

  /* Asegurar que el nav tenga prioridad en z-index */
  nav {
    z-index: 50;
    position: relative;
  }

  /* Espaciado entre botones */
  .nav-buttons {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
</style>

{#if mounted}
  <main class="min-h-screen bg-background" transition:fade>
    <nav class="bg-surface p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold text-primary">DPT5000</h1>
        <div class="nav-buttons">
          <ThemeToggle /> <!-- Movemos el ThemeToggle aquí -->
          <button
            class="btn btn-primary"
            on:click={toggleCalculator}
            aria-expanded={calculatorOpen}
            aria-controls="calculator-sidebar"
          >
            {calculatorOpen ? 'Cerrar' : 'Calculadora PR'}
          </button>
        </div>
      </div>
    </nav>

    <slot />

    <!-- Calculadora Sidebar corregida -->
    <aside
      id="calculator-sidebar"
      class="calculator-sidebar {calculatorOpen ? 'calculator-open' : 'calculator-closed'}"
      aria-label="Calculadora PR"
    >
      <div class="flex justify-end p-4 sticky top-0 bg-white z-10">
        <button
          class="btn btn-circle btn-ghost"
          on:click={toggleCalculator}
          aria-label="Cerrar calculadora"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <Calculator />
    </aside>
  </main>
{/if}