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

// dom elements
const containerEl = ref(null);

// threeJS stuffs
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import ThreeQuery from 'three-query';

// stuffs from our library
let tq = null;
let $ = null;
let details = {};

// set up ThreeJS on mounted
onMounted(async () => {

	buildScene();
});


async function buildScene(){

	// build default scene from our Lib!
	const container = containerEl.value
	const { scene, lights, cube, camera, renderer } = ThreeQuery.createScene(container, {
		autoSize: true,
		autoRender: true,
		addCube: false,
		addLights: true,
		addControls: false,
	});

	// adjust our lights
	lights.ambientLight.intensity = 2.5;
	lights.directionalLight.intensity = 6.5;

	// adjust our fov a bit
	camera.fov = 45;

	// disable the background
	renderer.setClearColor(0x000000, 0);

	// save to our globals
	tq = new ThreeQuery(scene);
	$ = tq.$.bind(tq);
	details = {
		scene,
		lights,
		cube,
		container,
		camera
	};

	// make a re-usable loader for the glb files.
	// this will automatically scan the object
	const gltfLoader = new GLTFLoader();
	tq.addLoader('glb', async (filePath) => {
		const obj = await gltfLoader.loadAsync(filePath);
		return obj.scene;
	});

	// load our demo shapes & add 'em to the scene
	const obj = await tq.loadGeometry('glb', '/demo_shapes.glb');
	scene.add(obj);

	// scale up our base size
	const scale = 2.0;
	$('#demo-shapes').scale(scale, scale, scale);

	// make the base group a bit bigger
	window.tq = tq;
	window.$ = $;
	window.details = details;
}


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
