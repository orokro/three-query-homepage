<!--
	Header.vue
	----------

	Simple header for the page including anchor links that animate to the sections below.
-->
<template>

	<!-- main header box -->
	<div class="header">

		<!-- gradient -->
		<div class="bg-horizontal-gradient"/>

		<!-- the entire logo will link to github cuz why not -->
		<a 
			class="github-link"
			href="https://github.com/orokro/ThreeQuery"
			target="_blank"
		>

			<!-- logo -->
			<div class="logo-circle box-bg-color">
				<img 
					class="logo" 
					src="/logo.png"
					alt="Logo"
					width="100%"
					height="100%"
				/>
			</div>

			<!-- logo text -->
			<h1 class="logo-text box-bg-color">
				<span>
					ThreeQuery
				</span>
			</h1>

			<!-- box w/ github logo & text -->
			<div class="github-box">
				<img 
					src="/img/github_icon.png"
					alt="GitHub"
					height="17px"
				/>
				<span>on GitHub</span>
			</div>
		</a>

		<!-- links bar -->
		<div 
			ref="navItems"
			class="nav-container box-bg-color"
		>
			<div 
				ref="navHighlight"
				class="nav-highlight"
				:style="{
					left: highlightDimensions.left, 
					width: highlightDimensions.width
				}"
			/>

			<!-- loop to generate links -->
			<div 
				v-for="link in links"
				:key="link.slug"
				:class="`nav-item ${link.slug} ${currentLink === link.slug ? 'active' : ''}`"
				@click="gotoLink(link.slug)"
			>
				<span>{{ link.label }}</span>
			</div>
		</div>

	</div>

</template>
<script setup>

// vue
import { ref, onMounted, onUnmounted, computed } from 'vue';

// elements
const navItems = ref([]);
const navHighlight = ref(null);

// the size & position of our dynamic highlight element
const hlLeftPos = ref(0);
const hlWidth = ref(0);

// store currently selected link
const currentLink = ref('demo');

// our link details
const links = [
	{ slug: 'demo', label: 'Demo' },
	{ slug: 'overview', label: 'Overview' },
	{ slug: 'get', label: 'Get' },
	{ slug: 'docs', label: 'Docs' }
];


/**
 * Goes to the link
 * 
 * @param linkSlugName {string} - the slug name of the link to highlight
 */
function gotoLink(linkSlugName) {

	// save our slunk
	// currentLink.value = linkSlugName;
	window.location.hash = `#${linkSlugName}`;
}


// dynamically compute the left/width of the highlight
const highlightDimensions = computed(() => {

	try {
		// get the parent container dom element
		const containerEl = navItems.value;

		// find the DOM element to move to
		const containerRect = containerEl.getBoundingClientRect();
		const targetEl = containerEl.querySelector(`.${currentLink.value}`);
		const targetRect = targetEl.getBoundingClientRect();

		// compute local left and width
		const left = targetRect.left - containerRect.left;
		const width = targetRect.width;

		return {
			left:  `${left}px`,
			width: `${width}px`
		};
	}catch(e){
		return {
			left: '0px',
			width: '0px'
		}
	}
});


let observer;

onMounted(() => {

	observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
			currentLink.value = entry.target.id;
			}
		});
	}, {
		rootMargin: '10% 0px -40% 0px',
		threshold: 1 // Trigger when 60% of the section is visible
	});

	links.forEach(link => {
		const slug = link.slug;
		const el = document.getElementById(slug);
		if (el)
			observer.observe(el);
	});
});


onUnmounted(() => {

	if (observer)
		observer.disconnect();
});


</script>
<style lang="scss" scoped>

	// outer most box
	.header {

		// disable text highlighting
		user-select: none;

		// fixed on top
		position: fixed;
		inset: 0px 0px auto 0px;
		height: 80px;

		// dark blur background
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10px);

		border-bottom: 3px solid rgba(0, 0, 0, 0.2);

		// gradient background
		.bg-horizontal-gradient {

			// fill container, same as .header
			position: absolute;
			inset: 0px 0px 0px 0px;

			/* background: linear-gradient(
				to right,
				rgba(0, 0, 0, 0.3) 0%,
				rgba(0, 0, 0, 0.3) 20%,
				rgba(0, 0, 0, 0.1) 40%,
				rgba(0, 0, 0, 0.0) 100%
			); */

		}// .bg-horizontal-gradient

		// common bg color
		.box-bg-color {
			background: rgba(0, 0, 0, 0.5);
		}

		// fixed on top-left
		.logo-circle {

			// fixed on top-left
			position: absolute;
			top: 5px;
			left: 5px;
			
			// black circle
			width: 65px;
			height: 65px;
			border-radius: 50% 50% 5px 50%;
			
			padding: 8px;

			// logo image
			.logo {
				
				// don't allow it to be dragged
				user-select: none;
				-webkit-user-drag: none;
				
			}// .logo

		}// .logo-circle

		// text that says "ThreeQuery" next to the logo
		.logo-text {

			// fixed position next to logo image
			position: absolute;
			bottom: 7px;
			left: 74px;
			height: 40px;

			// pretty corners
			border-radius: 5px 5px 40px 5px;

			// spacing
			padding: 0px 20px 0px 5px;

			// text styles
			color: white;
			font-weight: bolder;
			font-style: italic;

			span {
				position: relative;
				top: -6px;
				font-weight: inherit;
			}

		}// .logo-text

		// clickable box to goto git hob, above / part of the logo
		.github-box {

			// for debug
			/* border: 1px solid red; */

			// fixed above the logo
			position: absolute;
			top: 9px;
			left: 78px;
			height: 22px;
			width: 120px;

			// padding for logo on left
			padding: 0px 0px 0px 21px;

			color: #EFEFEF;

			// the logo image
			img {
				position: absolute;
				top: 0px;
				left: 0px;
			}

			span {
				font-weight: inherit;
				position: relative;
				top: -4px;
			}

			&:hover {
				color: white;
				font-weight: bolder;
			}

		}// .github-box

		// nav bar links flex layout
		.nav-container {

			// fixed near the logo
			position: absolute;
			bottom: 8px;
			left: 263px;
			height: 40px;

			// fancy styles
			border-radius: 40px 5px;

			display: flex;
			overflow: hidden;

			/* background: #f0f0f0; */
			padding: 10px 0;
			justify-content: center;

			// nav buttons
			.nav-item {

				// layout & spacing
				padding: 0px 20px;
				position: relative;
				z-index: 1;


				&:nth-child(2) {
					padding-left: 20px;
				}
				&:last-child {
					padding-right: 25px;
				}
				// appear clickable
				cursor: pointer;
				
				// text styles
				color: #0fc9cc;
				font-weight: bold;
				transition: color 0.3s ease;

				span {
					position: relative;
					top: -3px;
					font-weight: inherit;
				}// span

				&:hover, &.active {
					color: white;
					font-weight: bolder;
				}
				
			}// .nav-item
			
			// highlight to slide left & right when nave selected
			.nav-highlight {

				// fixed bos
				position: absolute;

				// fill box
				top: 0px;
				bottom: 0px;
				left: 0px;
				width: 82.5px;

				// nice teal styles
				background: #00ABAE;

				// same shape as .nav-container
				border-radius: 40px 5px;

				transition: all 0.3s ease;
				z-index: 0;

			}// .nav-highlight
			
		}// .nav-container

	}// .header
	
</style>
