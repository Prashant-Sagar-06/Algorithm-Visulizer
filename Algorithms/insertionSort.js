import { sleep, highlight, updateHeight, COLORS } from "../utils/ui.js";

export async function insertionSort(array, speed) {
    const bars = document.getElementsByClassName("bar");

    for (let i = 1; i < array.length; i++) {

        let key = array[i];
        let j = i - 1;

        // highlight the key bar
        highlight(bars[i], COLORS.COMPARE);
        await sleep(speed);

        while (j >= 0 && array[j] > key) {
            // highlight comparing bars
            highlight(bars[j], COLORS.SWAP);
            await sleep(speed);

            // shift to right
            array[j + 1] = array[j];
            updateHeight(bars[j + 1], array[j + 1]);
            await sleep(speed);

            // reset color
            highlight(bars[j], COLORS.DEFAULT);

            j--;
        }

        // final placement of key
        array[j + 1] = key;
        updateHeight(bars[j + 1], key);

        // highlight proper placement
        highlight(bars[j + 1], COLORS.SORTED);
        await sleep(speed);

        // reset all bars except sorted ones
        for (let k = 0; k <= i; k++) {
            highlight(bars[k], COLORS.SORTED);
        }
    }

    // final full sorted color
    for (let k = 0; k < array.length; k++) {
        highlight(bars[k], COLORS.SORTED);
        await sleep(10);
    }
}
