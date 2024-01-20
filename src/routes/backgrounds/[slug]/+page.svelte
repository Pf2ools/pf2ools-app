<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	goto(data.goto);
</script>

<svelte:head>
	<meta name="description" content={data.hash} />
	<meta name="og:description" content={data.hash} />
	<meta property="og:title" content={data.hash} />
</svelte:head>
