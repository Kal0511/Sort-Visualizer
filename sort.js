let array = [];

newArray();

function updateSize(val) {
    document.getElementById('displaySize').innerHTML = "Array Size: " + val;
}

function newArray() {
    let size = parseInt(document.getElementById('size').value);
    if (size < array.length) {
        document.getElementById('array').innerHTML = "";
        array = [];
        for (let i = 0; i < size; i++) {
            // array.push(Math.random() * 100)
            array.push(100 * i / size);
            // document.getElementById('array').innerHTML += "<div id='" + i + "' class='element' style='height:" + array[i] + "%; width: calc(100% / " + size + ")'></div>";
            document.getElementById('array').innerHTML += "<div id='" + i + "' class='element' style='height:" + array[i] + "%;'></div>";
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            document.getElementById(i).style.height = "calc(" + 100 * i / size + "%)";
        }
        for (let i = array.length; i < size; i++) {
            //array.push(Math.random() * 100)
            array.push(100 * i / size);
            // document.getElementById('array').innerHTML += "<div id='" + i + "' class='element' style='height:" + array[i] + "%; width: calc(100.0% / " + size + ")'></div>";
            document.getElementById('array').innerHTML += "<div id='" + i + "' class='element' style='height:" + array[i] + "%;'></div>";
        }
    }
}

function randomize() {
    for (let i = 0; i < array.length; i++) {
        swap(Math.floor(Math.random() * array.length), Math.floor(Math.random() * array.length));
    }
}

async function sort() {
    document.getElementById("sort").disabled = true;
    document.getElementById("sortType").disabled = true;
    document.getElementById("size").disabled = true;
    document.getElementById("newArray").disabled = true;
    switch (parseInt(document.getElementById('sortType').value)) {
        case 0:
            await bubble();
            break
        case 1:
            await selection();
            break
        case 2:
            await mergeSort(0, array.length - 1);
            break
    }
    document.getElementById("sort").disabled = false;
    document.getElementById("sortType").disabled = false;
    document.getElementById("size").disabled = false;
    document.getElementById("newArray").disabled = false;
}

async function bubble() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i; j++) {
            if (array[j - 1] > array[j]) {
                await swap(j - 1, j);
            }
        }
    }
}

async function selection() {
    for (let i = 0; i < array.length - 1; i++) {
        let max = 0;
        let j;
        for (j = 0; j < array.length - i; j++) {
            if (array[j] > array[max]) {
                max = j;
            }
        }
        await swap(max, j - 1);
    }
}

async function mergeSort(low, high) {
    if (low >= high) {
        return
    }
    let mid = Math.floor((high - low) / 2) + low;
    await mergeSort(low, mid)
    await mergeSort(mid + 1, high)
    await merge(array, low, mid, high)
}

async function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (let j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    let i = 0;

    let j = 0;

    let k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            document.getElementById(k).style.height = L[i] + "%";
            await sleep(10)
            arr[k] = L[i];
            i++;
        } else {
            document.getElementById(k).style.height = R[j] + "%";
            await sleep(10)
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        document.getElementById(k).style.height = L[i] + "%";
        await sleep(10)
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        document.getElementById(k).style.height = R[j] + "%";
        await sleep(10)
        arr[k] = R[j];
        j++;
        k++;
    }
}

async function swap(i, j) {
    document.getElementById(i).style.background = "red";
    document.getElementById(j).style.background = "green";
    await sleep(10)
    document.getElementById(i).style.height = array[j] + "%";
    document.getElementById(j).style.height = array[i] + "%";
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    document.getElementById(i).style.background = "var(--bar)";
    document.getElementById(j).style.background = "var(--bar)";
}

function set(i, val) {
    document.getElementById(i).style.height = val + "%";
    array[i] = val;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
