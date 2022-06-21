import "@/css/globals.css";
import "@/css/index.css";

import TeachableMachine from "./TeachableMachine";
import Scene from "./Scene";

// create Three.js Scene
const appContainer = document.getElementById("app")! as HTMLDivElement;
const scene = new Scene({ container: appContainer });
scene.core();

interface Prediction {
    className: string;
    probability: number;
}

// initialize Teachable Machine
const machine = new TeachableMachine({
    url: "/model",
    onLoop: async (teachableMachine) => {
        const prediction = (await teachableMachine.predict()).reduce(
            (acc: Prediction, curr: Prediction): Prediction =>
                acc.probability > curr.probability ? acc : curr
        );

        switch (prediction.className) {
            case "Left Spin":
            case "Right Spin":
                scene.targetRotation[1] += 0.1;
                break;

            case "Expand":
                scene.targetScale = 5;
                break;

            case "Center":
                scene.targetScale = 1;
                scene.targetRotation = [0, 0, 0];
                break;
        }
    },
});

await machine.load();
machine.core();
