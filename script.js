// ================= IMPORTS =================
import { sleep, highlight, updateHeight, COLORS } from "./utils/ui.js";
import { bubbleSort } from "./algorithms/bubbleSort.js";
import { mergeSort } from "./algorithms/mergeSort.js";
import { quickSort } from "./Algorithms/quickSort.js";
import { insertionSort } from "./Algorithms/insertionSort.js";




// ================= GLOBAL VARIABLES =================
let array = [];
let arraySize = 50;
let speed = 150;

// UI elements
const barsContainer = document.getElementById("bars");
const sizeSlider = document.getElementById("sizeSlider");
const speedSlider = document.getElementById("speedSlider");
const generateBtn = document.getElementById("generateBtn");
const startBtn = document.getElementById("startBtn");


// ================= ARRAY GENERATION =================
function generateArray(size = arraySize) {
    array = [];
    barsContainer.innerHTML = "";

    for (let i = 0; i < size; i++) {
        let height = Math.floor(Math.random() * 300) + 10;
        array.push(height);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${height}px`;

        barsContainer.appendChild(bar);
    }
}


// ================= SLIDERS =================
sizeSlider.addEventListener("input", e => {
    arraySize = e.target.value;
    generateArray(arraySize);
});

speedSlider.addEventListener("input", e => {
    speed = 310 - e.target.value;   // faster when slider is high
});


// ================= SLEEP HELPER =================
async function wait() {
    await sleep(speed);
}


// ================= UI FREEZE DURING SORT =================
function disableUI(state) {
    generateBtn.disabled = state;
    startBtn.disabled = state;
    sizeSlider.disabled = state;
    speedSlider.disabled = state;
    document.getElementById("algoSelect").disabled = state;
}


// ================= SORTING LAUNCHER =================
startBtn.addEventListener("click", async () => {
    const algo = document.getElementById("algoSelect").value;

    disableUI(true);
    if (algo === "bubble") {
        await bubbleSort(array, speed);
    }
    else if (algo === "merge") {
        await mergeSort(array, speed);
    }
    else if (algo === "quick") {
        await quickSort(array, speed);
    }
    else if (algo === "insertion") {
    await insertionSort(array, speed);
    }
    else {
        alert("Algorithm not implemented yet!");
    }


    disableUI(false);
});


// ================= BUTTON: GENERATE ARRAY =================
generateBtn.addEventListener("click", () => {
    generateArray(arraySize);
});


// ================= INITIAL LOAD =================
generateArray(arraySize);


// =========================================================
//                   NAVBAR (MOBILE) TOGGLE 
// =========================================================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
}

// For About Page Navbar (same function)
const navToggleAbout = document.getElementById("navToggleAbout");
const navLinksAbout = document.getElementById("navLinksAbout");

if (navToggleAbout && navLinksAbout) {
    navToggleAbout.addEventListener("click", () => {
        navLinksAbout.classList.toggle("open");
    });
}


// =========================================================
//                   DARK MODE TOGGLE
// =========================================================
const THEME_KEY = "av-theme";

function applyTheme(theme) {
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

// Load saved theme
const savedTheme =
    localStorage.getItem(THEME_KEY) ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

applyTheme(savedTheme);

// Toggle dark mode
const themeToggles = document.querySelectorAll("#themeToggle, #themeToggleAbout, .btn-toggle");

themeToggles.forEach(btn => {
    btn?.addEventListener("click", e => {
        e.preventDefault();

        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");

        themeToggles.forEach(b => (b.textContent = isDark ? "☀️" : "🌙"));
    });
});

