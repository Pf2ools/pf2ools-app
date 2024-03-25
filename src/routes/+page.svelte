<script>
	import { base } from '$app/paths';

	// TODO: Remove
	import { parser } from '$lib/dice';
	console.log(parser.parse('1d20'));
</script>

<svelte:head>
	<title>pf2ools</title>
</svelte:head>

<div class="container flex justify-center h-full">
	<div class="space-y-5">
		<ul class="list-disc">
			<li>
				<a class="anchor text-primary-500-400-token" href="{base}/backgrounds">Backgrounds</a>
			</li>
		</ul>
	</div>
</div>
