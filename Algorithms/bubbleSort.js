import { sleep, highlight, updateHeight, COLORS } from "../utils/ui.js";

export async function bubbleSort(array, speed) {
    const bars = document.getElementsByClassName("bar");
    let n = array.length;

    for (let i = 0; i < n - 1; i++) {

        for (let j = 0; j < n - i - 1; j++) {

            // Comparing
            highlight(bars[j], COLORS.COMPARE);
            highlight(bars[j + 1], COLORS.COMPARE);

            await sleep(speed);

            if (array[j] > array[j + 1]) {

                // Highlight swap
                highlight(bars[j], COLORS.SWAP);
                highlight(bars[j + 1], COLORS.SWAP);

                await sleep(speed);

                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                updateHeight(bars[j], array[j]);
                updateHeight(bars[j + 1], array[j + 1]);

                await sleep(speed);
            }

            // Reset back to default
            highlight(bars[j], COLORS.DEFAULT);
            highlight(bars[j + 1], COLORS.DEFAULT);
        }

        // Mark final element of this iteration as sorted
        highlight(bars[n - i - 1], COLORS.SORTED);
    }

    // mark final bar sorted
    highlight(bars[0], COLORS.SORTED);
}
