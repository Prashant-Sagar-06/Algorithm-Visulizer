import { sleep, highlight, updateHeight, COLORS } from "../utils/ui.js";

export async function quickSort(array, speed) {
    const bars = document.getElementsByClassName("bar");

    await quickSortHelper(array, 0, array.length - 1, bars, speed);

    // mark all bars sorted at the end
    for (let i = 0; i < bars.length; i++) {
        highlight(bars[i], COLORS.SORTED);
        await sleep(5);
    }
}

// ---------------- QUICK SORT HELPER ----------------
async function quickSortHelper(arr, low, high, bars, speed) {
    if (low < high) {
        let pivotIndex = await partition(arr, low, high, bars, speed);

        // left side recursion
        await quickSortHelper(arr, low, pivotIndex - 1, bars, speed);

        // right side recursion
        await quickSortHelper(arr, pivotIndex + 1, high, bars, speed);
    }
}

// ---------------- PARTITION FUNCTION ----------------
async function partition(arr, low, high, bars, speed) {
    let pivot = arr[high];
    let i = low - 1;

    // highlight pivot
    highlight(bars[high], "#e84393"); // pivot = pink

    for (let j = low; j < high; j++) {

        // highlight comparison
        highlight(bars[j], COLORS.COMPARE);
        await sleep(speed);

        if (arr[j] < pivot) {
            i++;

            // highlight swap
            highlight(bars[i], COLORS.SWAP);
            highlight(bars[j], COLORS.SWAP);
            await sleep(speed);

            // swap
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            // update heights
            updateHeight(bars[i], arr[i]);
            updateHeight(bars[j], arr[j]);

            await sleep(speed);
        }

        // reset j bar color after comparison
        highlight(bars[j], COLORS.DEFAULT);
    }

    // final pivot swap
    i++;

    highlight(bars[i], COLORS.SWAP);
    highlight(bars[high], COLORS.SWAP);
    await sleep(speed);

    let temp = arr[i];
    arr[i] = arr[high];
    arr[high] = temp;

    updateHeight(bars[i], arr[i]);
    updateHeight(bars[high], arr[high]);

    await sleep(speed);

    // set pivot position to sorted color
    highlight(bars[i], COLORS.SORTED);

    // reset old pivot space
    highlight(bars[high], COLORS.DEFAULT);

    return i;
}
