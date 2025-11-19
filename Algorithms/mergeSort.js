import { sleep, highlight, updateHeight, COLORS } from "../utils/ui.js";

export async function mergeSort(array, speed) {
    const bars = document.getElementsByClassName("bar");
    await mergeSortHelper(array, 0, array.length - 1, bars, speed);
}

async function mergeSortHelper(array, left, right, bars, speed) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    await mergeSortHelper(array, left, mid, bars, speed);
    await mergeSortHelper(array, mid + 1, right, bars, speed);
    await merge(array, left, mid, right, bars, speed);
}

async function merge(array, left, mid, right, bars, speed) {
    let i = left;
    let j = mid + 1;
    let temp = [];

    while (i <= mid && j <= right) {

        // highlight comparing bars
        highlight(bars[i], COLORS.COMPARE);
        highlight(bars[j], COLORS.COMPARE);
        await sleep(speed);

        if (array[i] <= array[j]) {
            temp.push(array[i]);
            highlight(bars[i], COLORS.SWAP);
            i++;
        } else {
            temp.push(array[j]);
            highlight(bars[j], COLORS.SWAP);
            j++;
        }

        await sleep(speed);

        // reset colors
        resetRange(bars, left, right);
    }

    while (i <= mid) {
        temp.push(array[i]);
        highlight(bars[i], COLORS.SWAP);
        await sleep(speed);
        i++;
    }

    while (j <= right) {
        temp.push(array[j]);
        highlight(bars[j], COLORS.SWAP);
        await sleep(speed);
        j++;
    }

    // Put temp back into original array
    for (let k = left; k <= right; k++) {
        array[k] = temp[k - left];
        updateHeight(bars[k], array[k]);
        highlight(bars[k], COLORS.SORTED);
        await sleep(speed);
    }
}

// Reset all bars in range to default
function resetRange(bars, left, right) {
    for (let i = left; i <= right; i++) {
        bars[i].style.background = COLORS.DEFAULT;
    }
}
