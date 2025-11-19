// Delay function used for animation speed
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Highlight a bar with a given color
export function highlight(bar, color) {
    bar.style.background = color;
}

// Update the height of a bar
export function updateHeight(bar, height) {
    bar.style.height = `${height}px`;
}

export const COLORS = {
    DEFAULT: "#4caf50",
    COMPARE: "red",
    SWAP: "orange",
    SORTED: "#2ecc71"
};
