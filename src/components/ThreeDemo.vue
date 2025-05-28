<!--
	ThreeDemo.vue
	-------------

	Shows off the library with a simple 3D scene at the top of the page.
-->
<template>

	<div 
		ref="containerEl" 
		class="three-demo"
		@mousemove="checkUnderCursor"
	>
		<br><br>
		
		<!-- shows tool tip text -->
		<div
			class="tooltip"
			:class="{ 'show': enableToolTip }"
			:style ="{
				left: toolTipPos.left + 'px',
				top: toolTipPos.top + 'px'
			}"
		>
			<span>{{ toolTipText }}</span>
		</div>

	</div>
</template>
<script setup>

// vue
import { ref, shallowRef, onMounted } from 'vue'

// app/misc JS
import DemoThreeScene from '@/js/DemoThreeScene';

// dom elements
const containerEl = ref(null);

// the JS logic to manipulate the 3D scene
let demoScene = null;

// position under cursor
const toolTipPos = shallowRef({
	left: 0,
	top: 0
});

// text to show
const toolTipText = ref('');

// true when visible
const enableToolTip = ref(false);

function checkUnderCursor(e){

	toolTipPos.value = {
		left: e.clientX - 10,
		top: e.clientY + 20
	};

	let results = demoScene.cursorRaycast(e);
	
	if(results==null){
		enableToolTip.value = false;
		return;
	}

	results == [...results];
	const firstResult = results[0];

	toolTipText.value = firstResult;
	enableToolTip.value = true;

}
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

		// reset stacking context
		position: relative;

		// shows info about the object when hovered
		.tooltip {

			// hidden by default
			opacity: 0;

			// fade in which shown
			transition: opacity 0.2s ease-in-out;
			&.show {
				opacity: 1;
			}

			// fixed position, moves with cursor
			position: absolute;

			// blurry dark bg
			background: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(5px);

			// nice rounded corners & spacing
			border-radius: 5px;
			padding: 7px 20px;

			// text styles
			color: white;
			font-family: monospace;
			font-weight: bolder;
			
		}// .tooltip
	}// .three-demo

</style>
