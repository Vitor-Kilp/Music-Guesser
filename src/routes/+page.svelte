<script lang="ts">
	import { goto } from '$app/navigation';

	let playlistID = '';
	let playlistLink = '';
	let status = '';

	function handleSubmit() {
		try {
			const url = new URL(playlistLink);
			const playlistParam = url.searchParams.get('list');

			if (playlistParam) {
				status = '';
				goto(`/load-playlist?list=${playlistParam}`);
			} else {
				status = 'Link invalid, please make sure the link is of a Youtube playlist';
			}
		} catch (error) {
			status = 'Link invalid, please make sure the input is a valid link';
		}
	}
</script>

<main class="text-gray-300 sm:p-24 p-4 pt-20">
	<div class="flex flex-col w-full h-[70vh] items-center justify-around gap-4 text-center text-lg">
		<h1 class="text-4xl font-bold">Welcome to <span class="text-primary">Song Guesser!</span></h1>
		<p class="text-xl">
			This is an automated tool to try and guess songs names from an Youtube playlist.<br /> The playlist
			must be public for it to work, and problably should have more than 4 songs.
		</p>
		<form class="flex flex-col gap-4 w-full justify-center" on:submit|preventDefault>
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

		{#if status.length > 0}
			<h1 class="text-2xl">{status}</h1>
		{/if}
	</div>
</main>

<style>
</style>
