<script lang="ts">
	import { draw } from 'svelte/transition';

	export let player: YT.Player
	export let volume: number;
	let prevVolume = 50;
    let input: HTMLInputElement;

	function handleMuteUnmute() {
		if (volume > 0) {
			prevVolume = volume;
			volume = 0;
		} else {
			volume = prevVolume;
		}
	}

    $: {
        if (input) {
            input.style.background = `linear-gradient(to right, rgb(229 231 235) ${volume}%, transparent ${volume}%)`;
        }
    }

	function handleVolumeChange() {
		if (!player) return;

		player.setVolume(volume);
	}

	$: volume, handleVolumeChange();
</script>

<div class="flex gap-5 items-center">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={handleMuteUnmute}
		class="flex items-center justify-center relative w-[36px] h-[24px]"
	>
		{#if volume === 0}
			<svg
				class="absolute"
				xmlns="http://www.w3.org/2000/svg"
				width="36"
				height="36"
				viewBox="0 0 24 24"
				><path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M11 5L6 9H2v6h4l5 4V5zm11 4l-6 6m0-6l6 6"
					in:draw={{ duration: 100, delay: 100 }}
					out:draw={{ delay: 1, duration: 100 }}
				/></svg
			>
		{:else if volume < 25}
			<svg
				class="absolute"
				xmlns="http://www.w3.org/2000/svg"
				width="36"
				height="36"
				viewBox="0 0 24 24"
				><path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M11 5L6 9H2v6h4l5 4V5z"
					in:draw={{ duration: 100 }}
					out:draw={{ delay: 100, duration: 100 }}
				/></svg
			>
		{:else if volume < 75}
			<svg
				class="absolute"
				xmlns="http://www.w3.org/2000/svg"
				width="36"
				height="36"
				viewBox="0 0 24 24"
				><path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M11 5L6 9H2v6h4l5 4V5zm4.54 3.46a5 5 0 0 1 0 7.07"
					in:draw={{ duration: 100 }}
					out:draw={{ delay: 100, duration: 100 }}
				/></svg
			>
		{:else}
			<svg
				class="absolute"
				xmlns="http://www.w3.org/2000/svg"
				width="36"
				height="36"
				viewBox="0 0 24 24"
				><path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M11 5L6 9H2v6h4l5 4V5zm4.54 3.46a5 5 0 0 1 0 7.07m3.53-10.6a10 10 0 0 1 0 14.14"
					in:draw={{ duration: 100 }}
					out:draw={{ delay: 100, duration: 100 }}
				/></svg
			>
		{/if}
	</div>
	<input bind:this={input} type="range" bind:value={volume} max="100" min="0" step="1">
</div>

<style>
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
        border-radius: 0.5rem;
        width: 8rem;
		cursor: pointer;
	}

	input[type='range']::-webkit-slider-runnable-track {
		border: 2px solid rgb(229 231 235);
		border-radius: 0.5rem;
		height: 1rem;
	}

	input[type='range']::-moz-range-track {
		border: 2px solid rgb(229 231 235);
		border-radius: 0.5rem;
		height: 1rem;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		margin-top: -4px;
		background-color: transparent;
		height: 0.5rem;
		width: 0.5rem;
	}
	input[type='range']::-moz-range-thumb {
		appearance: none;
		margin-top: -4px;
		background-color: transparent;
		height: 0.5rem;
		width: 0.5rem;
	}
</style>
