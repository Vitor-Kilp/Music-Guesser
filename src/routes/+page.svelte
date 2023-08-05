<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import LoadingThreeDots from './guessing/LoadingThreeDots.svelte';
	import { counterVideo } from '$lib/stores/counter';

	let playlistID = '';
	let playlistLink = '';
	let status = '';
	let loading = false
	function handleSubmit() {
		loading = true
		try {
			const url = new URL(playlistLink);
			const playlistParam = url.searchParams.get('list');

			console.log(playlistParam)
			if (playlistParam) {
				status = '';
				goto(`/load-playlist?list=${playlistParam}`);
			} else {
				status = 'Link invalid, please make sure the link is of a Youtube playlist';
				loading = false
			}
		} catch (error) {
			status = 'Link invalid, please make sure the input is a valid link';
			loading = false
		}
	}
</script>

<main class="text-gray-300 sm:p-24 p-4 pt-20">
	<div class="flex flex-col w-full h-[70vh] items-center justify-around gap-4 text-center text-lg">
		<h1 class="text-4xl font-bold">Welcome to <span class="text-primary">Song Guesser!</span></h1>
		<p class="text-xl">
			Can you guess the correct song names from a YouTube playlist? Then, give it a try! <br><br><span class="text-base"> For it to work, please ensure that the playlist is set to public.<br> Additionally, it is recommended to have a playlist containing at least 4 songs.</span>
		</p>
		<form class="flex flex-col gap-4 w-full justify-center" on:submit|preventDefault>
			<div class="flex h-12 justify-center">
				{#if status.length > 0}
					<h1 in:fly class="text-2xl">{status}</h1>
				{/if}
				{#if loading}
				<LoadingThreeDots />
				{/if}
				{#if $counterVideo.total !== $counterVideo.current}
					<a href="/guessing" class="italic">Continue last session</a>
				{/if}
			</div>
			<div class="flex gap-4 justify-center">
				<input
					class="bg-text-primary p-3 rounded-md outline-none focus:ring-primary focus:ring-1 w-1/2 text-lg"
					type="text"
					placeholder="Youtube Playlist Link"
					bind:value={playlistLink}
				/>
				<button
					class="p-3 bg-primary rounded-md shadow-none hover:shadow-md hover:shadow-primary/50 transition-shadow text-lg"
					on:click={handleSubmit}>Submit</button
				>
			</div>
			<div>
				<a
					href="/load-playlist?list=PLSe2qq_NhxeN1ipe5TUAC0xXJtpkCXHpF"
					class="hover:underline cursor-pointer"
					>Don't have a playlist in hand? Here, you can test with this one!</a
				>
			</div>
		</form>
	</div>
</main>

<style>
</style>
