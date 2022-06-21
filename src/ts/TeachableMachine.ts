import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";

const app = document.getElementById("app")!;

interface TeachableMachineProps {
    url: string;
    container: HTMLDivElement;
    onPredict?: (machine: TeachableMachine) => Promise<void>;
}

export default class TeachableMachine {
    private url: string;
    private container: HTMLDivElement;

    private model!: tmImage.CustomMobileNet;
    private webcam!: tmImage.Webcam;

    constructor({ url, container, onPredict }: TeachableMachineProps) {
        this.url = url;
        this.container = container;

        if (onPredict) {
            this.onPredict = onPredict;
        }
    }

    async onPredict(_: TeachableMachine) {}

    async predict() {
        return this.model.predict(this.webcam.canvas);
    }

    async core() {
        this.webcam.update();
        await this.onPredict(this);
        window.requestAnimationFrame(this.core.bind(this));
    }

    async loadModel() {
        const modelURL = `${this.url}/model.json`;
        const metadataURL = `${this.url}/metadata.json`;

        return tmImage.load(modelURL, metadataURL);
    }

    async loadWebcam() {
        const webcam = new tmImage.Webcam(200, 200, true);

        await webcam.setup();
        await webcam.play();

        return webcam;
    }

    async load() {
        this.model = await this.loadModel();
        this.webcam = await this.loadWebcam();

        this.container.appendChild(this.webcam.canvas);
    }
}
