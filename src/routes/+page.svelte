<script lang="ts">
    import { goto } from "$app/navigation";

	let playlistID = '';
    let playlistLink = ''
    let status = ''

    function handleSubmit() {
        try {
            const url = new URL(playlistLink);
            const playlistParam = url.searchParams.get("list")

        if (playlistParam) {
            status = ""
            goto(`/load-playlist?list=${playlistParam}`)
        } else {
            status = "Link invalid, please make sure the link is of a Youtube playlist"
        }
        } catch (error) {
            status = "Link invalid, please make sure the input is a valid link"
        } 
    }

</script>

<main class="text-gray-300">
	<div class="flex flex-col w-full h-screen items-center justify-center gap-4">
		<h1 class="text-3xl">Enter the link of a public Youtube playlist:</h1>
        <form class="flex gap-4 w-full justify-center" on:submit|preventDefault >
        <input class="bg-text-primary p-3 rounded-md outline-none focus:ring-primary focus:ring-1 w-1/4 text-lg" type="text" placeholder="Playlist Link" bind:value={playlistLink}>
        <button class="p-3 bg-primary rounded-md shadow-none hover:shadow-md hover:shadow-primary/50 transition-shadow text-lg" on:click={handleSubmit}>Submit</button>
        {#if status.length > 0}
        <h1 class="text-2xl">{status}</h1>
        {/if}
    </form>
	</div>
</main>

<style>
</style>
