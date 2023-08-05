<script lang='ts'>
	import type { Video } from "$lib/types";

    export let choiceMade: boolean
    export let selectedOption: string | null
    export let currentVideo: Video
</script>

{#if choiceMade && selectedOption === currentVideo.id}
<div class="flex h-12 items-center justify-center pt-4 gap-2">
    <h1 class="text-3xl font-bold">Correct!</h1>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        ><g
            fill="none"
            stroke="currentColor" 
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            ><path d="m9 11l3 3L22 4" /><path
                d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
            /></g
        ></svg
    >
</div>
{:else if choiceMade && selectedOption !== currentVideo.id}
<div class="flex h-12 items-center justify-center pt-4 gap-2">
    <h1 class="text-3xl font-bold">Wrong</h1>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        ><g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            ><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path
                d="m15 9l-6 6m0-6l6 6"
            /></g
        ></svg
    >
</div>
{:else}
<div class="h-[48px]">
</div>
{/if}