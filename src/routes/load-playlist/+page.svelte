<script lang="ts">
	import { playlistData } from '$lib/stores/playlistStore';
	import type { PageServerData } from './$types';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import CopiedModal from './CopiedModal.svelte';
	import { guesses } from '$lib/stores/guesses';
	import { counterVideo } from '$lib/stores/counter';
	import { goto } from '$app/navigation';

	export let data: PageServerData;
	let showModal = false;
	let modalText = 'Copied Link!';
	let showVideos = false;
	let videosLength = data.playlistData.videos.length;

	playlistData.set(data.playlistData.videos);

	function handleDelete(index: number) {
		playlistData.update((data) => {
			data.splice(index, 1);
			return data;
		});
	}

	function handleCopy() {
		navigator.clipboard
			.writeText($page.url.href)
			.then(() => {
				showModal = true;
			})
			.catch(() => {
				showModal = true;
				modalText = 'Failed to copy link,\n please try copying directly from url bar';
			});
	}

	function handleGuessLengh(e: Event & { readonly submitter: HTMLElement | null; }) {
		e.preventDefault()
		console.log(videosLength)
		if ($playlistData.length > videosLength) {
			playlistData.update((data) => {
				data.sort(() => Math.random() - 0.5);
				return data.slice(0, videosLength);
			});
		} else if ($playlistData.length <= videosLength) {
			playlistData.update((_) => {
				const tmpArray = [...data.playlistData.videos];
				tmpArray.sort(() => Math.random() - 0.5);
				return tmpArray.slice(0, videosLength);
			});
		}

	}
	function handleStart() {
		guesses.set({correct: [], incorrect: []})
		counterVideo.set({total: $playlistData.length, skipped: 0, current: 0})
		goto("/guessing")
	}
</script>

<main class="text-gray-200 sm:p-24 p-2">
	<div class="flex flex-col w-full justify-center items-center gap-10 pb-6">
		<h1 class="text-4xl font-bold">{data.playlistData.info?.items[0].snippet.title}</h1>
		<h1 class="text-2xl">Total number of available videos: {data.playlistData.videos.length}</h1>
		<form class="flex gap-4 items-center" on:submit={handleGuessLengh}>
			<h1 class="text-lg">Number of videos that you want to guess:</h1>
			<input class="bg-text-primary rounded-md p-1" type="number" max={`${data.playlistData.videos.length}`} min="4" bind:value={videosLength} />
			<button class="bg-primary p-1 px-2 rounded-md shadow-none hover:shadow-md hover:shadow-primary/50 transition-colors ease-in-out duration-500">Set</button>
		</form>
		<div class="flex flex-wrap w-full justify-around text-2xl gap-5">
			<button
				class="bg-primary p-3 shadow-none hover:shadow-md hover:shadow-primary/50 transition-colors ease-in-out duration-500 rounded-md w-[170px]"
				on:click={() => (showVideos = !showVideos)}>{showVideos ? 'Hide' : 'Show'} playlist</button
			>
			<button
				on:click={handleCopy}
				class="bg-primary p-3 shadow-none hover:shadow-md hover:shadow-primary/50 transition-colors ease-in-out duration-500 rounded-md"
			>
				Share Playlist
			</button>
			<button
				class="bg-primary p-3 shadow-none hover:shadow-md hover:shadow-primary/50 transition-colors ease-in-out duration-500 rounded-md"
				on:click={handleStart}
				>Start Guessing</button
			>
		</div>
	</div>
	{#if showVideos}
		<div in:fly={{ delay: 400 }} out:fly class="flex flex-col justify-center gap-y-3">
			{#each $playlistData as video, i}
				<div class="flex justify-between p-3 bg-text-primary rounded-md">
					<h1 class="text-lg">{video.title}</h1>
					<button class="hover:text-primary transition-colors" on:click={() => handleDelete(i)}
						>Remove</button
					>
				</div>
			{/each}
		</div>
	{:else}
		<div in:fly={{ duration: 300, delay: 0 }} out:fly class="bg-text-primary rounded-md w-full p-3">
			<h1 class="text-center">
				The contents of the playlist will be shown here<br />
				Current number of videos: {$playlistData.length}
			</h1>
		</div>
	{/if}
</main>

<CopiedModal bind:showModal>
	<div
		class="absolute flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-text-primary p-4 text-lg font-semibold rounded-md whitespace-nowrap"
	>
		{modalText}
	</div>
</CopiedModal>
