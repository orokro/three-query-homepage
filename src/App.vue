<!--
	App.vue
	-------

	Main base component for the site/app.
-->
<template>

	<!-- box that renders 3D objects & interactively lets you test queries -->
	<a id="demo"/>
	<ThreeDemo />

	<!-- overview video -->
	<a id="overview"/>
	<SectionHeader>Overview</SectionHeader>
	<br><br>
	<div align="center" style="min-height: 60vh;">
		<iframe
			width="80%"
			style="width: 80%; aspect-ratio: 16/9;"
			src="https://www.youtube.com/embed/J8BhTWo7HK4?si=CUQ_pKWe_Kg3wNRh"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	</div>

	<!-- markdown parsed & rendered from the readme -->
	<a id="get"/>
	<SectionHeader>Get</SectionHeader>
	<br><br>
	<div class="get-box">

		<h2>Install in your Project:</h2>
	
		<br><br>
		<h3>With NPM:</h3>	
		<pre class="code">npm install three-query</pre>
		Then...
		<pre class="code">import ThreeQuery from 'three-query';</pre>


		<br><br>
		<h3>Or use a CDN:</h3>
		<a href="https://unpkg.com/three-query@latest/dist/three-query.global.js" target="_blank">
			<pre class="code">https://unpkg.com/three-query@latest/dist/three-query.global.js</pre>
		</a>
		Then...
		<pre class="code">import ThreeQuery from 'https://unpkg.com/three-query@latest/dist/three-query.global.js';</pre>
		Or...
		<pre class="code">&lt;script src="https://unpkg.com/three-query@latest/dist/three-query.global.js"&gt;&lt;/script&gt;</pre>
		
		<br><br>
		<h2>Check out ThreeQuery over here:</h2>
		<div class="row">

			<div class="box">
				<div>
					Find it on
					<a href="https://www.npmjs.com/package/three-query?activeTab=readme" target="_blank">NPM:</a>
				</div>
				<a href="https://www.npmjs.com/package/three-query?activeTab=readme" target="_blank">
					<img class="site-logo" src="/npm_logo.png" alt="NPM Logo" height="70px"/>
				</a>
			</div>

			<div class="box">
				<div>
					Find it on
					<a href="https://github.com/orokro/ThreeQuery" target="_blank">GitHub:</a>
				</div>
				<a href="https://github.com/orokro/ThreeQuery" target="_blank">
					<img class="site-logo" src="/github_logo.png" alt="GitHub Logo" height="100px"/>
				</a>
			</div>

		</div>

	</div>

	<!-- markdown parsed & rendered from the readme -->
	<a id="docs"/>
	<SectionHeader>Docs</SectionHeader>
	<br><br>
	<TheDocs />

	<!-- bar long the top w/ links and whatnot -->
	<Header/>

	<br><br>
	<br><br>
	<br><br>
</template>
<script setup>

// vue
import { ref } from 'vue';

// components
import Header from './components/Header.vue';
import TheDocs from './components/TheDocs.vue';
import ThreeDemo from './components/ThreeDemo.vue';
import SectionHeader from './components/SectionHeader.vue';
import MDBox from './components/MDBox.vue';

</script>

<style lang="scss">

	header {
		line-height: 1.5;
	}

	.logo {
		display: block;
		margin: 0 auto 2rem;
	}

	@media (min-width: 1024px) {
		header {
			display: flex;
			place-items: center;
			padding-right: calc(var(--section-gap) / 2);
		}

		.logo {
			margin: 0 2rem 0 0;
		}

		header .wrapper {
			display: flex;
			place-items: flex-start;
			flex-wrap: wrap;
		}
	}

	// add gradient & titled images to main page background
	body {

		/* background: linear-gradient(#5e5e5e, #000);
		background-position: fixed; */

		overflow-x: clip;

		// use pseudo element to add a vertical gradient that doesn't scroll with content
		&::before {

			// required content to make pseudo element work
			content: "";

			// fill screen
			position: fixed;
			inset: 0px 0px 0px 0px;
			width: 100vw;
			height: 100vh;

			// just a nice gradient
			background: linear-gradient(#AAA, #000);

			// always on bottom, no interaction
			z-index: -1;
			pointer-events: none;	
		}
	
		// use another pseudo element to add a tiled background image
		// that doesn't scroll with content
		&::after {

			// required content to make pseudo element work
			content: "";
			opacity: 0.33;
			// fill screen
			position: fixed;
			inset: 0px 0px 0px 0px;
			/* width: 100vw;*/
			height: 100vh; 

			// tiled background image over the screen
			background-image: url('img/bg_tiles.png');
			background-size: 150px;
			background-repeat: repeat;
			background-position: center;

			// always on bottom, no interaction
			z-index: -1;
			pointer-events: none;	

		}// &::after

	}// body

	.get-box {

		background: white;

		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;

		.row {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			gap: 20px;

			.box {
				flex: 1 1 calc(50% - 20px);
				background: #f0f0f0;
				border-radius: 10px;
				padding: 20px;
				text-align: center;

				// Center content inside the box
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text-align: center;

				.site-logo {
					margin-top: 20px;
				}

			}// .box

		}// .row

	}// .get-box

	

</style>
