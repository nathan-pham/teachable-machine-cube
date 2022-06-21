import "@/css/globals.css";
import "@/css/index.css";

import TeachableMachine from "./TeachableMachine";

const machine = new TeachableMachine({
    url: "/model",
    container: document.getElementById("app")! as HTMLDivElement,
    onPredict: async (teachableMachine) => {
        const prediction = await teachableMachine.predict();

        // [className: "Center"
        // probability: 0.0000055458258430007845]
    },
});

await machine.load();
machine.core();
