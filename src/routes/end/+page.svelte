<script lang="ts">
	import { guesses } from '$lib/stores/guesses';
	import LoadYTpreview from './LoadYTpreview.svelte';
</script>

<main class="text-gray-200 sm:p-24 p-4">
    <div class="flex flex-col w-full items-center gap-4 pb-6">
    <h1 class="text-5xl font-bold">Completed!</h1>
    <p class="text-lg font-medium">Of the total {$guesses.correct.length + $guesses.incorrect.length} songs, you got:</p>
</div>
	<div class="flex flex-row justify-between gap-x-10"> 
		<div class="flex flex-col items-center w-1/2 gap-6 bg-text-primary sm:p-8 p-2 rounded-md">
            <h1 class="text-2xl font-bold">{$guesses.correct.length} Right</h1>
			{#each $guesses.correct as guess, i}
                <LoadYTpreview {guess} id={i} />
			{/each}
		</div>
		<div class="flex flex-col items-center w-1/2 gap-6 bg-text-primary sm:p-8 p-2 rounded-md">
            <h1 class="text-2xl font-bold">{$guesses.incorrect.length} Wrong</h1>
			{#each $guesses.incorrect as guess, i}
            <LoadYTpreview {guess} id={i} />
			{/each}
            {#if $guesses.incorrect.length === 0}
            <h1  class="text-xl font-bold">Wow, you dind't miss a single one!</h1>
            {/if}
		</div>
	</div>
</main>
