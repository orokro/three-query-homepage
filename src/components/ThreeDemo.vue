<!--
	ThreeDemo.vue
	-------------

	Shows off the library with a simple 3D scene at the top of the page.
-->
<template>

	<div 
		ref="containerEl"
		class="three-demo"
	>
		<h1>Three.js Demo</h1>
		<p>This is a simple Three.js scene to demonstrate the library.</p>
	</div>
</template>
<script setup>

// vue
import { ref, onMounted } from 'vue'

// dom elements
const containerEl = ref(null);

// threeJS stuffs
import ThreeQuery from 'three-query';

// stuffs from our library
let $ = null;
let details = {};

// set up ThreeJS on mounted
onMounted(()=>{

	// build default scene from our Lib!
	const container = containerEl.value
	const { scene, lights, cube, camera, renderer } = ThreeQuery.createScene(container, {
		autoSize: true,
		autoRender: true,
		addCube: true,
		addLights: true,
		addControls: false,
	});

	// disable the background
	renderer.setClearColor(0x000000, 0);

	// save to our globals
	$ = new ThreeQuery(scene);
	details = {
		scene,
		lights,
		cube,
		container,
		camera
	};

	window.details = details;

});

</script>
<style lang="scss" scoped>

	// main outer box
	.three-demo {

		// for debug
		border: 1px solid red;

		// fill screen, but not fixed
		width: 100vw;
		height: 100vh;
		
	}// .three-demo

</style>
