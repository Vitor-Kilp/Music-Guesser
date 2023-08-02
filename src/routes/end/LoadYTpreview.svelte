<script lang="ts">
	import type { Video } from '$lib/types';

	export let id: number;
	export let guess: Video;
	let clicked = false;

	function handleKeyDown(
		e: KeyboardEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	) {
		if (e.code === 'Enter') clicked = true;
	}
</script>

{#if clicked}
	<div class="flex items-center justify-center relative pb-[56.25%] w-full h-0 max-w-[480px]">
		<iframe
			class="absolute top-0 left-0 w-full h-full rounded-md"
			src={`https://www.youtube.com/embed/${guess.id}?autoplay=1&mute=1`}
			title={guess.title}
			frameborder="0"
			allow="clipboard-write; encrypted-media; web-share; autoplay;"
			allowfullscreen
		/>
	</div>
{:else}
	<div
		role="button"
		tabindex={id}
		class="flex items-center justify-center relative"
		on:click={() => (clicked = true)}
		on:keydown={(e) => handleKeyDown(e)}
	>
		<h1 class="absolute left-3 top-3 max-w-[480px] text-lg font-semibold z-10 line-clamp-2">
			{guess.title}
		</h1>
		<svg
			class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:text-[#FF0000] transition-colors opacity-80 z-10"
			xmlns="http://www.w3.org/2000/svg"
			width="100"
			height="100"
			viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M23 9.71a8.5 8.5 0 0 0-.91-4.13a2.92 2.92 0 0 0-1.72-1A78.36 78.36 0 0 0 12 4.27a78.45 78.45 0 0 0-8.34.3a2.87 2.87 0 0 0-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 0 0 0 6.48a9.55 9.55 0 0 0 .3 2a3.14 3.14 0 0 0 .71 1.36a2.86 2.86 0 0 0 1.49.78a45.18 45.18 0 0 0 6.5.33c3.5.05 6.57 0 10.2-.28a2.88 2.88 0 0 0 1.53-.78a2.49 2.49 0 0 0 .61-1a10.58 10.58 0 0 0 .52-3.4c.04-.56.04-3.94.04-4.54ZM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08Z"
			/></svg
		>
		<img class="rounded-md" src={`https://i.ytimg.com/vi/${guess.id}/hqdefault.jpg`} alt="video" />
		<div
			class="absolute bg-gradient-to-b from-[#00000098] to-transparent h-full w-full max-w-[480px] rounded-md"
		/>
	</div>
{/if}

<style>
</style>
