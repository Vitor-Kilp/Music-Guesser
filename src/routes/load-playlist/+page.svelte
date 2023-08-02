<script lang="ts">
	import { playlistData } from '$lib/stores/playlistStore';
	import { flip } from 'svelte/animate';

	import type { PageServerData } from './$types';
	import { fly } from 'svelte/transition';

	export let data: PageServerData;
	let showVideos = false;
	playlistData.set(data.playlistData.videos);

	function handleDelete(index: number) {
		playlistData.update((data) => {
			data.splice(index, 1);
			return data;
		});
	}
</script>

<main class="text-gray-200 sm:p-24 p-2">
	<div class="flex flex-col w-full justify-center items-center gap-6 pb-6">
		<h1 class="text-4xl font-bold">{data.playlistData.info?.items[0].snippet.title}</h1>
		<h1 class="text-2xl">Total number of videos: {$playlistData.length}</h1>
		<div class="flex w-full justify-around text-2xl">
			<button
				class="bg-primary p-3 shadow-none hover:shadow-md hover:shadow-primary/50 transition-colors ease-in-out duration-500 rounded-md "
				on:click={() => (showVideos = !showVideos)}>Show playlist</button
			>
			<a
				class="bg-primary p-3 shadow-none hover:shadow-md hover:shadow-primary/50 transition-colors ease-in-out duration-500 rounded-md"
				href="/guessing">Start Guessing</a
			>
		</div>
	</div>
	{#if showVideos}
		<div in:fly out:fly class="flex flex-col justify-center gap-y-3">
			{#each $playlistData as video, i}
				<div class="flex justify-between p-3 bg-text-primary rounded-md">
					<h1 class="text-lg">{video.title}</h1>
					<button class="hover:text-primary transition-colors" on:click={() => handleDelete(i)}
						>Remove</button
					>
				</div>
			{/each}
		</div>{/if}
</main>
