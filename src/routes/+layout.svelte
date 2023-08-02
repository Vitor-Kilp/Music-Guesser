<script lang="ts">
	import './styles.css';
</script>

<svelte:head>
	<title>Song Gueeser</title>
</svelte:head>

<nav class="flex items-center justify-between text-gray-200 fixed w-full h-16 bg-text-primary px-12">
	<div class="flex items-center gap-x-3">
		<h1 class="font-bold text-3xl">Song Guesser</h1>
		<svg
			class="text-primary"
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 24 24"
			><g
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="3"><circle cx="8" cy="18" r="4" /><path d="M12 18V2l7 4" /></g
			></svg
		>
	</div>
	<div>
		<a class="text-lg font-semibold" href="/">Home</a>
	</div>
</nav>
<slot />

<style>
</style>
