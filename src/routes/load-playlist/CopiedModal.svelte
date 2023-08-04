<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	export let showModal: boolean;

</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
{#if showModal}
	<div
		role="dialog"
		class="p-4 flex justify-center top-0 right-0 left-0 bottom-0 fixed bg-[#00000023] text-gray-200 transition-colors"
        transition:fade
		on:click={() => (showModal = false)}
	>
		<div in:fly={{ y: 50 }} out:fly={{ y: 50 }}>
			<slot />
		</div>
	</div>
{/if}
