<script lang="ts">
	import { playlistData } from '$lib/stores/playlistStore';
	import { guesses } from '$lib/stores/guesses';
	import {counterVideo} from "$lib/stores/counter"
	import { onMount, onDestroy } from 'svelte';
	import type { Video } from '$lib/types';
	import VolumeSlider from './VolumeSlider.svelte';
	import LoadingThreeDots from './LoadingThreeDots.svelte';
	import PlayPauseButton from './PlayPauseButton.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import RightWrongGuess from './RightWrongGuess.svelte';
	import GuessOptions from './GuessOptions.svelte';
	import { goto } from '$app/navigation';

	let videoPaused = true;
	let videoDuration: number;
	let currentTime: number;
	let playerReady = false;
	let player: YT.Player;
	let selectedOption: string | null = null;
	let options: Video[];
	let currentVideo: Video;
	let choiceMade = false;
	let volume = 50;
	let videoBind: HTMLDivElement;

	function getOptions() {
		// Create a temp array to sort and create options from
		const tempArray = [...$playlistData];

		// Remove current video from playlist data
		tempArray.pop();

		const shuffledArr = tempArray.sort(() => Math.random() - 0.5);
		const options = shuffledArr.slice(0, 3);
		options.push(currentVideo);

		// If options dosent have 4 elements yet add from wrong guesses, else from right guesses
		let i = 0;
		while (options.length < 4 && (i < $guesses.incorrect.length || i < $guesses.correct.length)) {
			const newOption = $guesses.incorrect.at(i);
			if (newOption !== undefined) {
				options.push(newOption);
			} else {
				const newOption2 = $guesses.correct.at(i);
				if (newOption2 !== undefined) {
					options.push(newOption2);
				}
			}
			i++;
		}

		return options.sort(() => Math.random() - 0.5);
	}

	function load() {
		currentVideo = $playlistData.at(-1) || { id: '', title: '', description: '', thumbnail: '' };

		if (currentVideo.id.length === 0) goto('/end');

		player = new YT.Player('player', {
			height: '100%',
			width: '100%',
			videoId: currentVideo.id,
			playerVars: { autoplay: 0 },
			events: {
				onReady: onPlayerReady
			}
		});
		choiceMade = false;
		options = getOptions();
	}

	onMount(() => {
		if (window.YT && window.YT.Player) {
			playlistData.update((data) => data.sort(() => Math.random() - 0.5));
			load();
		} else {
			console.log("2")
			playlistData.update((data) => data.sort(() => Math.random() - 0.5));
			(window as any).onYouTubeIframeAPIReady = load;
		}
	});

	function onPlayerReady() {
		videoDuration = player.getDuration();

		// If the video was blocked skip it
		if (videoDuration === 0) {
			counterVideo.update(data => {data.skipped += 1; return data})
			handleNext();
		}

		currentTime = player.getCurrentTime();
		setInterval(() => {
			if (playerReady) currentTime = player.getCurrentTime();
		}, 1000);
		playerReady = true;
	}

	function handlePlayPause() {
		if (videoPaused) {
			player.playVideo();
			videoPaused = false;
		} else {
			player.pauseVideo();
			videoPaused = true;
		}
	}

	onDestroy(() => {
		if (player) player.destroy();
	});

	function handleNext() {
		playlistData.update((data) => {
			data.pop();
			return data;
		});
		counterVideo.update(data => {data.current += 1; return data})
		videoPaused = true;
		playerReady = false;
		currentVideo = $playlistData.at(-1) || { id: '', title: '', description: '', thumbnail: '' };
		player.destroy();
		selectedOption = null;
		load();
	}

	function handleOptionSubmit() {
		if (selectedOption === currentVideo.id) {
			guesses.update((data) => {
				data.correct.push(currentVideo);
				return data;
			});
			choiceMade = true;
		} else {
			guesses.update((data) => {
				data.incorrect.push(currentVideo);
				return data;
			});
			choiceMade = true;
		}
	}
</script>

<svelte:head>
	<script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<main class="text-gray-300 sm:p-24 p-4 pt-20 h-screen">
	<div class="flex flex-col items-center justify-center h-full w-full">
		<h1 class="text-lg font-semibold p-1">{$counterVideo.current} / {$counterVideo.total}</h1>
		<div class="max-w-[800px] h-full w-full">
			<div class="flex pb-[56.25%] w-full h-0 relative">
				<div
					class="transition-opacity absolute top-0 left-0 w-full h-full ease-in-out-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] duration-1000 opacity-0 pointer-events-none invisible"
					bind:this={videoBind}
					class:show-video={choiceMade}
				>
					<div id="player" class="w-full rounded-md" />
				</div>
				<div
					class="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
					class:hide-video={choiceMade}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 320 512"
						><path
							fill="currentColor"
							d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1a87.983 87.983 0 0 0-40.4 74v1.5c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128h-32C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80a40 40 0 1 0 0 80z"
						/></svg
					>
					<!--
				<h1 class="whitespace-nowrap text-lg font-semibold">What's the name of the song?</h1>-->
				</div>
			</div>
		</div>
		<RightWrongGuess bind:currentVideo bind:selectedOption bind:choiceMade />
		<div class="flex flex-col">
			{#if !playerReady}
				<LoadingThreeDots />
			{:else}
				<div class="w-full flex h-24 justify-center items-center gap-5">
					<button
						on:click={handlePlayPause}
						class="flex w-[36px] h-[36px] transition-all ease-in-out relative"
					>
						<PlayPauseButton bind:videoPaused />
					</button>
					<ProgressBar bind:videoDuration bind:currentTime bind:player bind:playerReady />
					<VolumeSlider bind:volume bind:player />
				</div>
				<GuessOptions bind:choiceMade bind:options bind:selectedOption bind:currentVideo />
				<div class="flex justify-center items-center mt-5 font-semibold">
					{#if !choiceMade}
						<button
							class="bg-primary p-3 shadow-none hover:shadow-md hover:shadow-primary/50 transition-colors ease-in-out duration-500 rounded-md disabled:bg-secondary disabled:shadow-none"
							on:click={handleOptionSubmit}
							disabled={selectedOption === null}>Confirm</button
						>
					{:else}
						<button
							class="bg-primary py-3 w-[82px] shadow-none hover:shadow-md hover:shadow-primary/50 transition-colors ease-in-out duration-500 rounded-md disabled:bg-secondary disabled:shadow-none"
							on:click={handleNext}>Next</button
						>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</main>

<style postcss>
	.hide-video {
		opacity: 0%;
		pointer-events: none;
	}
	.show-video {
		opacity: 100%;
		pointer-events: all;
		visibility: visible;
	}
</style>
