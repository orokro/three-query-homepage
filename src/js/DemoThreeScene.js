/*
	DemoThreeScene.js
	-----------------

	Sets up the scene with all the floating objects using three-query & three.js.

	Also provides code to manage the particle system & the ability for the UI to test the Query system
*/

// threeJS stuffs
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import ThreeQuery from 'three-query';

// our app classes
import { Floater } from './Floater.js';

// main export
export default class DemoThreeScene {

	/**
	 * Constructor for the DemoThreeScene class.
	 * 
	 * @param {HTMLElement} parentContainerElement - The parent container element where the scene will be rendered.	
	 */
	constructor(parentContainerElement) {

		// save where we'll mount
		this.container = parentContainerElement;

		// our array of floaters after we've set up the scene
		// (floaters = classes to make objects float around)
		this.floaters = [];

		// continue constructor in our async init method
		this.init();

		
	}	

	/**
	 * Async initialization
	 */
	async init(){

		// build the scene with our floating 3D objects and all that
		await this.buildScene();
		
		// set up our floaters now that the scene is built
		await this.setupFloaters();
	}


	/**
	 * Sets up the ThreeJS scene / loads objects / etc
	 */
	async buildScene() {

		// build default scene from our Lib!
		const { scene, lights, cube, camera, renderer } = ThreeQuery.createScene(
			this.container, 
			{
				autoSize: true,
				autoRender: true,
				addCube: false,
				addLights: true,
				addControls: false,
				onRender: () => {
					this.render();
				}
			}
		);

		// adjust our lights
		lights.ambientLight.intensity = 2.5;
		lights.directionalLight.intensity = 6.5;

		// adjust our fov a bit
		camera.fov = 45;

		// disable the background
		renderer.setClearColor(0x000000, 0);

		// save to our globals
		this.tq = new ThreeQuery(scene);
		this.$ = this.tq.$.bind(this.tq);
		this.sceneDetails = {
			scene,
			lights,
			cube,
			renderer,
			camera
		};

		// make a re-usable loader for the glb files.
		// this will automatically scan the object
		const gltfLoader = new GLTFLoader();
		this.tq.addLoader('glb', async (filePath) => {
			const obj = await gltfLoader.loadAsync(filePath);
			return obj.scene;
		});

		// load our demo shapes & add 'em to the scene
		const obj = await this.tq.loadGeometry('glb', '/demo_shapes.glb');
		scene.add(obj);

		// scale up our base size
		const scale = 2.0;
		this.$('#demo-shapes').scale(scale, scale, scale);

		// make the base group a bit bigger
		window.tq = this.tq;
		window.$ = this.$;
		window.sceneDetails = this.sceneDetails;
	}


	/**
	 * Sets up the floaters in the scene
	 */
	async setupFloaters() {

		// #demo-shapes is the empty group holding the children to float
		const rootContainer = this.$('#demo-shapes').object();
		const items = rootContainer.children;

		// make a floater for each
		for(const item of items ) {

			const newFloater = new Floater(item, {

				// bob speed in seconds (random range)
				bobSpeed: [0.25, 0.5], 

				// phase offset (random range)
				bobPhaseOffset: [0, Math.PI * 2],

				// bob amplitude (random range)
				bobAmplitude: [0.01, 0.05],

				// rotation speed in seconds (random range)
				rotSpeed: [0.5, 1.5],
			});

			// add to our array
			this.floaters.push(newFloater);

		}// next item
	}


	/**
	 * Called every render
	 */
	render(){

		// update all the floaters
		this.floaters.map(floater => floater.update());
		
	}

}
