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

		// build the scene with our floating 3D objects and all that
		this.buildScene();
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
	 * Called every render
	 */
	render(){

	}
}
