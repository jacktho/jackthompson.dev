<script lang="ts">
	export let image: string;
	export let title: string;
	export let description: string;
	export let technologies: { name: string; href?: string }[];
	export let url: string = '';
	export let datetime: string = '';

	function formatDate(inputDate: string): string {
		const dateObj = new Date(inputDate);

		// Use toLocaleString to format the entire date string
		const formattedDate = dateObj.toLocaleString('en-US', {
			month: 'short',
			day: '2-digit',
			year: 'numeric'
		});

		return formattedDate;
	}
</script>

<div class="relative mx-auto lg:mx-0 px-6 xl:px-10">
	<div
		class="flex lg:absolute lg:left-0 lg:w-32 lg:-ml-32 py-6 lg:p-0 lg:justify-end gap-1 text-gray-300 lg:text-amber-500"
	>
		{#if datetime}
			<time class="text-xs text-right" {datetime}>{formatDate(datetime)}</time>
		{/if}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-4 hidden lg:block"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
			/>
		</svg>
	</div>
	<div class="prose prose-invert prose-sm lg:prose-md xl:prose-lg">
		<img class="rounded-xl" alt={title + ' screenshot'} src={image} />
		<h2>{title}</h2>
		<p>
			{@html description}
		</p>
		<h3 class="flex gap-3">
			<svg class="w-3" viewBox="0 0 16 16" aria-hidden="true"
				><path
					fill="#d97706"
					d="M5.338 9.805c.11.418.439.747.857.857C7.282 10.948 8 11.44 8 12s-.718 1.052-1.805 1.338c-.418.11-.747.439-.857.857C5.052 15.281 4.56 16 4 16s-1.052-.718-1.338-1.805a1.205 1.205 0 0 0-.856-.857C.718 13.052 0 12.56 0 12s.718-1.052 1.806-1.338c.417-.11.746-.439.856-.857C2.948 8.718 3.441 8 4 8c.56 0 1.052.718 1.338 1.805Z"
				/><path
					fill="#f59e0b"
					d="M12.717 2.432c.1.42.43.75.85.852C15.026 3.633 16 4.27 16 5s-.975 1.367-2.432 1.716c-.42.101-.75.432-.851.852C12.367 9.025 11.729 10 11 10c-.729 0-1.367-.975-1.716-2.432-.101-.42-.431-.75-.851-.852C6.975 6.367 6 5.73 6 5c0-.73.975-1.367 2.433-1.717.42-.1.75-.43.85-.85C9.634.974 10.272 0 11 0c.73 0 1.367.975 1.717 2.432Z"
				/></svg
			> Technology
		</h3>
		<ul>
			{#each technologies as { name, href }}
				<li>
					{#if href}
						<a {href}>{name}</a>
					{:else}
						{name}
					{/if}
				</li>
			{/each}
		</ul>
		{#if url}
			<a href={url} class="flex gap-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-3"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
					/>
				</svg>
				{url}
			</a>
		{/if}
	</div>
</div>
