<script lang='ts'>
    import { draw } from 'svelte/transition';
    export let videoPaused: boolean
</script>

{#if videoPaused}
<svg
    class="absolute"
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    ><g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        ><circle cx="12" cy="12" r="10" /><path
            in:draw={{ duration: 200, delay: 200 }}
            out:draw={{ duration: 200 }}
            d="m10 8l6 4l-6 4V8z"
        /></g
    ></svg
>
{:else}
<svg
    class="absolute"
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    ><g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        ><circle cx="12" cy="12" r="10" /><path
            in:draw={{ duration: 200, delay: 200 }}
            out:draw={{ duration: 200 }}
            d="M10 15V9m4 6V9"
        /></g
    ></svg
>
{/if}