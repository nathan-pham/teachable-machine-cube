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

    public targetScale: number = 1;
    public targetRotation: number[] = [0, 0, 0];

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

        return new THREE.Mesh(geometry, material);
    }

    core() {
        this.renderer.render(this.scene, this.camera);

        this.cube.scale.set(
            THREE.MathUtils.lerp(this.cube.scale.x, this.targetScale, 0.1),
            THREE.MathUtils.lerp(this.cube.scale.y, this.targetScale, 0.1),
            THREE.MathUtils.lerp(this.cube.scale.z, this.targetScale, 0.1)
        );

        // prettier-ignore
        this.cube.rotation.set(
            THREE.MathUtils.lerp(this.cube.rotation.x, this.targetRotation[0], 0.1),
            THREE.MathUtils.lerp(this.cube.rotation.y, this.targetRotation[1], 0.1),
            THREE.MathUtils.lerp(this.cube.rotation.z, this.targetRotation[2], 0.1)
        );

        requestAnimationFrame(this.core.bind(this));
    }
}
