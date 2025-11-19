import { sleep, highlight, updateHeight , COLORS } from "./utils/ui.js";
import { bubbleSort } from "./Algorithms/bubbleSort.js";
import { mergeSort } from "./Algorithms/mergeSort.js";


let array = []; // global array
let arraySize = 50; // default size
let speed = 150; // default speed

// Select elements
const barsContainer = document.getElementById("bars");
const sizeSlider = document.getElementById("sizeSlider");
const speedSlider = document.getElementById("speedSlider");

// Generate a new random array
function generateArray(size = arraySize) {
    array = [];
    barsContainer.innerHTML = ""; // clear old bars

    for (let i = 0; i < size; i++) {
        let value = Math.floor(Math.random() * 300) + 10; // bar height

        array.push(value);

        // Create bar element
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;

        barsContainer.appendChild(bar);
    }
}

// Handle size change
sizeSlider.addEventListener("input", e => {
    arraySize = e.target.value;
    generateArray(arraySize);
});

// Handle speed change
speedSlider.addEventListener("input", e => {
    speed = 310 - e.target.value; // lower = fast, higher = slow
});

// Wrapper for sleep with speed
async function wait() {
    await sleep(speed);
}

// Button: Generate Array
document.getElementById("generateBtn").addEventListener("click", () => {
    generateArray(arraySize);
});

// Button: Start Sorting 
document.getElementById("startBtn").addEventListener("click", async () => {
    const algo = document.getElementById("algoSelect").value;

    disableUI(true);

    if (algo === "bubble") {
        await bubbleSort(array, speed);
    }
    else if (algo === "merge") {
        await mergeSort(array, speed);
    }
    else {
        alert("This algorithm is not implemented yet!");
    }


    disableUI(false);
});

function disableUI(state) {
    document.getElementById("generateBtn").disabled = state;
    document.getElementById("startBtn").disabled = state;
    document.getElementById("sizeSlider").disabled = state;
    document.getElementById("speedSlider").disabled = state;
    document.getElementById("algoSelect").disabled = state;
}


// Initial load
generateArray(arraySize);
