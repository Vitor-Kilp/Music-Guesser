<script lang='ts'>
    export let currentTime: number
    export let videoDuration: number
    export let player: YT.Player
    export let playerReady: boolean

    let normalizedPercentage = 0;
    let isDragging = false
    function handleDragStart(
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	) {
		isDragging = true;
		handleSeek(event);
	}

	function handleDrag(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		if (isDragging) {
			handleSeek(event);
		}
	}

	function handleDragEnd(e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		isDragging = false;
	}

	function handleSeek(
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	) {
		const progressBar = event.currentTarget;
		const rect = progressBar.getBoundingClientRect();
		const clickX = event.clientX - rect.left;
		const progressBarWidth = progressBar.clientWidth;
		const newPercentage = (clickX / progressBarWidth) * 100;
		player.seekTo((newPercentage / 100) * videoDuration, true);
	}

	function formatTime(seconds: number) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);

		const formattedMinutes = String(minutes).padStart(2, '0');
		const formattedSeconds = String(remainingSeconds).padStart(2, '0');

		return `${formattedMinutes}:${formattedSeconds}`;
	}

    $: {
		if (playerReady)
			normalizedPercentage = Math.max(0, Math.min(100, (currentTime / videoDuration) * 100));
	}
</script>

<h1 class="text-lg whitespace-nowrap">{formatTime(currentTime)} / {formatTime(videoDuration)}</h1>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="w-1/2 h-4 border-2 border-gray-200 rounded-lg"
    on:click={handleSeek}
    on:mousedown={handleDragStart}
    on:mousemove={handleDrag}
    on:mouseup={handleDragEnd}
    on:mouseleave={handleDragEnd}
>
    <div
        class="transition-[width] bg-gray-200 h-full"
        style={`width: ${normalizedPercentage}%`}
    />
</div>