<script lang="ts">
	import Project from './Project.svelte';
	import peachApp from '$lib/images/peach-app.png';
	import termQuote from '$lib/images/term-quote.png';
	import peachInsuranceNet from '$lib/images/peachinsurance-net.png';
	import jackThompsonNet from '$lib/images/jackthompson-net.png';
</script>

<div class="flex flex-col lg:flex-row w-full">
	<div class="fading-border edge-gradient p-6 lg:pr-32">
		<div
			class="mx-auto lg:sticky lg:top-1/2 lg:transform lg:-translate-y-1/2 prose prose-invert prose-sm lg:prose-md xl:prose-lg"
		>
			<h2>Project Log</h2>
			<p>
				Here are some of the things I've been working on that are worth noting. I may or may not add
				more prior work in the future, but I will continue to update this page with new projects
				going forward.
			</p>
		</div>
	</div>
	<div class="h-full flex flex-col gap-16 w-full grow md:pt-4 lg:pt-16">
		<Project
			image={jackThompsonNet}
			datetime="2023-04-26"
			title="jackthompson.net"
			url="https://jackthompson.net"
			description={`
My personal website, I wanted to play with AI technology so I integrated OpenAI's GPT to create a pseudo AI Avatar capable of answering visitors' questions in real-time. I'm currently utilizing 'gpt-3.5-turbo' and eagerly await the opportunity to upgrade to GPT-4 once it becomes available through the API. Also, send the conversations with the bot to Discord using their API. I found the API remarkably user-friendly and plan to explore more applications in the future. While my attempt to draw web design inspiration from Midjourney was not entirely successful, it did provide some interesting imagery I used on this website. I plan to continue to add to this site including adding a blog.
`}
			technologies={[
				{ name: 'Svelte', href: 'https://svelte.dev' },
				{ name: 'SvelteKit', href: 'https://kit.svelte.dev' },
				{ name: 'Tailwind CSS', href: 'https://tailwindcss.com' },
				{ name: 'OpenAI', href: 'https://platform.openai.com/docs/api-reference/chat' },
				{ name: 'Midjourney', href: 'https://midjourney.com' },
				{ name: 'Discord API', href: 'https://discord.com/developers/docs/intro' },
				{ name: 'Vercel', href: 'https://vercel.com' }
			]}
		/>

		<Project
			image={peachInsuranceNet}
			datetime="2023-03-27"
			title="peachinsurance.net"
			url="https://peachinsurance.net"
			description={`
The Peach Insurance Services website displays the PeachApp and Instant Term Quote app, offering a unified platform for clients. The site includes a contact form connected to the CRM, a Strapi CMS connected blog with relevant insights, and information about the company. This was a rewrite of the previous Gatsby based website and it felt much cleaner moving to SvelteKit.
`}
			technologies={[
				{ name: 'Svelte', href: 'https://svelte.dev' },
				{ name: 'SvelteKit', href: 'https://kit.svelte.dev' },
				{ name: 'Tailwind CSS', href: 'https://tailwindcss.com' },
				{ name: 'Pipedrive API', href: 'https://developers.pipedrive.com/docs/api/v1/' },
				{ name: 'Vercel', href: 'https://vercel.com' }
			]}
		/>
		<Project
			image={termQuote}
			datetime="2023-03-21"
			title="Instant Term Quote"
			url="https://www.peachinsurance.net/quote-criteria"
			description={`
The Instant Term Quote App, developed for Peach Insurance Services, allows clients to quickly obtain life insurance term quotes by entering their information. Featuring a straightforward interface, the app simplifies the quote retrieval process and supports collaboration between Peach Insurance Services and fee-only financial advisors. Additionally, the app connects to Peach Insurance's CRM API, enabling clients to submit their quote and contact information for follow-up if they choose to be contacted about their quote.
`}
			technologies={[
				{ name: 'Svelte', href: 'https://svelte.dev' },
				{ name: 'SvelteKit', href: 'https://kit.svelte.dev' },
				{ name: 'Tailwind CSS', href: 'https://tailwindcss.com' },
				{ name: 'Node', href: 'https://nodejs.org/en' },
				{ name: 'Pipedrive API', href: 'https://developers.pipedrive.com/docs/api/v1/' },
				{ name: 'AWS Lightsail', href: 'https://aws.amazon.com/lightsail/' },
				{ name: 'Vercel', href: 'https://vercel.com' }
			]}
		/>
		<Project
			image={peachApp}
			datetime="2022-08-26"
			title="PeachApp"
			url="https://app.peachinsurance.com"
			description={`
<p>A custom-built insurance application I developed for Peach Insurance Services to streamline the process of collecting client information. This enables the company to efficiently determine the best carriers for clients' Life, Disability, Long Term Care Insurance, and Annuities needs.</p>
<p>With a user-friendly interface, PeachApp intelligently adjusts its questions based on client input, minimizing redundancy when clients require multiple products. The app simplifies the insurance selection process and fosters collaboration between Peach Insurance Services and fee-only financial advisors, enhancing the overall client experience. A web application for insurance companies to manage their clients and policies.</p>
`}
			technologies={[
				{ name: 'Svelte', href: 'https://svelte.dev' },
				{ name: 'SvelteKit', href: 'https://kit.svelte.dev' },
				{ name: 'Tailwind CSS', href: 'https://tailwindcss.com' },
				{ name: 'PostgreSQL', href: 'https://www.postgresql.org' },
				{ name: 'Supabase', href: 'https://supabase.io' },
				{ name: 'Vercel', href: 'https://vercel.com' },
				{ name: 'Twilio', href: 'https://twilio.com' }
			]}
		/>
	</div>
</div>

<style lang="postcss">
	.edge-gradient {
		background: radial-gradient(
			55% 80% at 50% 100%,
			rgba(162, 58, 0, 0.15) 0%,
			rgba(255, 101, 15, 0) 100%
		);
	}

	@media (min-width: 1024px) {
		.edge-gradient {
			background: radial-gradient(
				80% 55% at 100% 50%,
				rgba(162, 58, 0, 0.15) 0%,
				rgba(255, 101, 15, 0) 100%
			);
		}
	}
	.fading-border {
		position: relative;
	}

	.fading-border::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		background-image: linear-gradient(
			to right,
			rgba(0, 0, 0, 0),
			rgba(162, 58, 0, 0.4),
			rgba(0, 0, 0, 0)
		);
		/* If you want to change the border color, replace rgba(162, 58, 0, 0.4) with your desired color */
	}

	@media (min-width: 1024px) {
		.fading-border::after {
			top: 0;
			right: 0;
			bottom: 0;
			left: auto;
			width: 1px;
			height: auto;
			background-image: linear-gradient(
				to top,
				rgba(0, 0, 0, 0),
				rgba(162, 58, 0, 0.4),
				rgba(0, 0, 0, 0)
			);
		}
	}
</style>
