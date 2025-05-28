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
			{{ toolTipText }}
		</div>

		<!-- the input bar to test -->
		<div class="input-bar">
			
			<input 
				type="text"
				placeholder="Type a query here..."
				v-model="queryText"
				@keyup="demoScene.queryInput($event.target.value)"
			/>

			<div 
				class="clear-button"
				:class="{
					'show': queryText.length > 0
				}"
				@click="queryText=''; demoScene.queryInput('')"
			>
				<span>&#10005;</span>				
			</div>

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

const queryText = ref('');

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


/**
 * Update the tool tip text when cursor moves over the 3D scene.
 * 
 * @param e {MouseEvent} - the mouse event to check
 */
function checkUnderCursor(e){

	// get the location position over the element
	toolTipPos.value = {
		left: e.clientX - 10,
		top: e.clientY + 20
	};

	// ray cast under the cursor x/y & gtfo if nothing found
	let results = demoScene.cursorRaycast(e);
	if(results==null){
		enableToolTip.value = false;
		return;
	}

	// always get only first
	results == [...results];
	const firstResult = results[0];

	// set our tool tipe text
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

		// area on the bottom w/ input box
		.input-bar {

			// for debug
			/* border: 1px solid red; */

			position: absolute;
			bottom: 0px;
			width: 500px;
			height: 100px;
			left: 50%;
			transform: translateX(-50%);

			// the actual text box
			input {

				// nice full-width pill w/ shadow
				width: 100%;
				padding: 10px 20px;
				border-radius: 100px;
				border: 3px solid black;
				box-shadow: inset 3px 3px 8px rgba(0, 0, 0, 0.5);

				// spacing
				padding-right: 45px;

				// text styles
				font-family: monospace;
				font-size: 20px;

				&:active, &:focus {
					outline: 3px solid #00ABAE;
				}

			}// input

			// button to clear the input
			.clear-button {

				// not clickable and shrank until active
				transform: scale(0);
				pointer-events: none;
				transition: transform 0.2s ease-in-out;
				&.show {
					transform: scale(1);
					pointer-events: initial;
				}

				// fixed black circle on the right side
				position: absolute;
				top: 10px;
				right: 10px;
				width: 30px;
				height: 30px;
				border-radius: 50%;

				// clickable
				cursor: pointer;
				user-select: none;

				// center the text
				text-align: center;
				background: black;
				color: white;
				font-weight: bolder;
				span {
					position: relative;
					font-weight: inherit;
					top: 2px;
				}

				// light up red on hover
				&:hover {
					background: rgb(116, 11, 11);
				}

			}// .clear-button

		}// .input-bar

	}// .three-demo

</style>
