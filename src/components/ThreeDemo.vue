<!--
	ThreeDemo.vue
	-------------

	Shows off the library with a simple 3D scene at the top of the page.
-->
<template>

	<div ref="containerEl" class="three-demo">
		<h1>Three.js Demo</h1>
		<p>This is a simple Three.js scene to demonstrate the library.</p>
	</div>
</template>
<script setup>

// vue
import { ref, onMounted } from 'vue'

// app/misc JS
import DemoThreeScene from '@/js/DemoThreeScene';

// dom elements
const containerEl = ref(null);

let demoScene = null;

// set up ThreeJS on mounted
onMounted(async () => {

	demoScene = new DemoThreeScene(containerEl.value);
});


</script>
<style lang="scss" scoped>

	// main outer box
	.three-demo {

		// for debug
		/* border: 1px solid red; */

		// fill screen, but not fixed
		width: 100vw;
		height: 100vh;

	}// .three-demo

</style>
