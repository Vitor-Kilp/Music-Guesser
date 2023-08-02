<script lang="ts">
	import type { Video } from '$lib/types';
	import { draw } from 'svelte/transition';

	export let options: Video[];
	export let choiceMade: boolean;
	export let selectedOption: string | null;
	export let currentVideo: Video;
	let group: Video;
</script>

<div class="flex flex-wrap justify-center font-semibold gap-4">
	{#each options as option, i}
		<div
			class="flex items-center w-48 h-16 bg-primary transition-shadow shadow-none ease-in-out rounded-md hover:shadow-md hover:shadow-primary/50"
		>
			<input
				id={`option-${i}`}
				type="radio"
				class="hidden"
				disabled={choiceMade}
				bind:group
				value={option.id}
				on:change={(e) => (selectedOption = e.currentTarget.value)}
			/>
			<label
				for={`option-${i}`}
				class="w-48 flex items-center justify-between rounded-md group relative cursor-pointer"
				class:correct-checkbox={choiceMade && option.id === currentVideo.id}
				class:wrong-checkbox={choiceMade && option.id !== currentVideo.id}
			>
				<small class="text-base text-center line-clamp-2 w-36 max-h-16 p-1">
					{option.title}
				</small>
				<p
					class="text-base bg-primary pointer-events-none rounded-md max-h-fit w-36 top-20 text-center absolute bottom-0 group-hover:opacity-80 transition-opacity ease-in-out delay-700 opacity-0 hover:delay-0"
					class:tooltip-delay={true}
				>
					{option.title}
				</p>
				<div class="flex items-center justify-center w-12 h-16 rounded-r-md relative">
					{#if selectedOption === option.id}
						<svg
							class="absolute"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							><g
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path
									d="M22 4L12 14.01l-3-3"
									in:draw={{ duration: 200, delay: 200 }}
									out:draw={{ duration: 200 }}
								/></g
							></svg
						>
					{:else}
						<svg
							class="absolute"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							><circle
								cx="12"
								cy="12"
								r="10"
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								in:draw={{ duration: 300 }}
							/></svg
						>
					{/if}
				</div>
			</label>
		</div>
	{/each}
</div>

<style>
	.correct-checkbox {
		background-color: #c3073f;
	}
	.wrong-checkbox {
		background-color: #4e4e50;
	}
</style>
