import "@/css/globals.css";
import "@/css/index.css";

import TeachableMachine from "./TeachableMachine";
import Scene from "./Scene";

const appContainer = document.getElementById("app")! as HTMLDivElement;

const scene = new Scene({
    container: appContainer,
});

const machine = new TeachableMachine({
    url: "/model",
    container: appContainer,
    onLoop: async (teachableMachine) => {
        const prediction = await teachableMachine.predict();

        // this.cube.rotation.x += 0.01;

        // 0: {className: 'Center', probability: 0.000301551102893427}
        // 1: {className: 'Expand', probability: 0.000038921974919503555}
        // 2: {className: 'Right Spin', probability: 0.0000704218473401852}
        // 3: {className: 'Left Spin', probability: 0.000039932790969032794}
        // 4: {className: 'Nothing', p
    },
});

await machine.load();
machine.core();
scene.core();
