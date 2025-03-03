<script lang="ts">
  import { fade } from 'svelte/transition';

  let weight = 0;
  let reps = 0;
  let selectedFormula: 'brzycki' | 'epley' | 'lombardi' | 'oconner' = 'brzycki';

  const formulas = {
    epley: (w: number, r: number) => w * (1 + 0.0333 * r),
    brzycki: (w: number, r: number) => w * (36 / (37 - r)),
    lombardi: (w: number, r: number) => w * Math.pow(r, 0.1),
    oconner: (w: number, r: number) => w * (1 + 0.025 * r)
  } as const;

  const formulaNames: Record<keyof typeof formulas, string> = {
    epley: 'Epley',
    brzycki: 'Brzycki',
    lombardi: 'Lombardi',
    oconner: "O'Conner"
  };

  $: pr = weight && reps ? Math.round(formulas[selectedFormula](weight, reps) * 100) / 100 : 0;
</script>

<div class="p-4 space-y-6" transition:fade>
  <h2 class="text-2xl font-bold text-primary">Calculadora PR</h2>
  
  <div class="form-control">
    <label class="label" for="weight">
      <span class="label-text">Peso (kg)</span>
    </label>
    <input
      type="number"
      id="weight"
      bind:value={weight}
      class="input input-bordered w-full"
      min="0"
      step="0.5"
    />
  </div>

  <div class="form-control">
    <label class="label" for="reps">
      <span class="label-text">Repeticiones</span>
    </label>
    <input
      type="number"
      id="reps"
      bind:value={reps}
      class="input input-bordered w-full"
      min="0"
      step="1"
    />
  </div>

  <div class="form-control">
    <label class="label" for="formula">
      <span class="label-text">Fórmula</span>
    </label>
    <select
      id="formula"
      bind:value={selectedFormula}
      class="select select-bordered w-full"
    >
      {#each Object.entries(formulaNames) as [value, name]}
        <option value={value}>{name}</option>
      {/each}
    </select>
  </div>

  <div class="card bg-primary text-primary-content">
    <div class="card-body">
      <h3 class="card-title">PR Estimado</h3>
      <p class="text-3xl font-bold">{pr} kg</p>
    </div>
  </div>
</div>