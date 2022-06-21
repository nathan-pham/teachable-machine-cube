import * as THREE from "three";

interface SceneProps {
    container?: HTMLDivElement;
}

export default class Scene {
    private container: HTMLDivElement | undefined;

    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;

    private cube!: THREE.Mesh;

    constructor({ container }: SceneProps) {
        if (container) {
            this.container = container;
        }

        this.initWorld();
    }

    get size() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        return {
            width,
            height,
            aspect: width / height,
        };
    }

    initWorld() {
        const { width, height, aspect } = this.size;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.container && this.container.appendChild(this.renderer.domElement);

        this.cube = this.createCube();
        this.scene.add(this.cube);
    }

    private createCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
        });
        const cube = new THREE.Mesh(geometry, material);

        return cube;
    }

    core() {
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.core.bind(this));
    }
}
