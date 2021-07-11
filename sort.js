let array = [];

newArray();

function newArray() {
    let size = parseInt(document.getElementById('size').value);
    if(size<array.length){
    document.getElementById('array').innerHTML = "";
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.random() * 100)
        document.getElementById('array').innerHTML += "<div id='" + i + "' class='element' style='height:" + array[i] + "%; width: calc(100% / " + size + ")'></div>";
    }
    }else{
        for (let i = 0; i < array.length; i++) {
            document.getElementById(i).style.width = "calc(100.0% /"  + size + ")";
        }
        for (let i = array.length; i < size; i++) {
            array.push(Math.random() * 100)
            document.getElementById('array').innerHTML += "<div id='" + i + "' class='element' style='height:" + array[i] + "%; width: calc(100.0% / " + size + ")'></div>";
        }
    }
}

function randomize() {
    for (let i = 0; i < array.length; i++) {
        swap(Math.floor(Math.random() * array.length),Math.floor(Math.random() * array.length));
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
            await mergeSort(0, array.length-1);
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
                swap(j - 1, j);
                await sleep(10)
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
        swap(max, j - 1);
        await sleep(10)
    }
}

async function mergeSort(low, high) {
    if(low >= high) {
        return
    }
    let mid =Math.floor((high-low)/2) + low;
    await mergeSort(low, mid)
    await mergeSort(mid + 1, high)
    await merge(array, low , mid , high)
}

async function merge(arr, l, m, r)
{
    let n1 = m - l + 1;
    let n2 = r - m;

    // Create temp arrays
    let L = new Array(n1);
    let R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (let j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    let i = 0;

    // Initial index of second subarray
    let j = 0;

    // Initial index of merged subarray
    let k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            document.getElementById(k).style.height = L[i] + "%";
            await sleep(10)
            arr[k] = L[i];
            i++;
        }
        else {
            document.getElementById(k).style.height = R[j] + "%";
            await sleep(10)
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        document.getElementById(k).style.height = L[i] + "%";
        await sleep(10)
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        document.getElementById(k).style.height = R[j] + "%";
        await sleep(10)
        arr[k] = R[j];
        j++;
        k++;
    }
}

function swap(i, j) {
    document.getElementById(i).style.height = array[j] + "%";
    document.getElementById(j).style.height = array[i] + "%";
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function set(i, val) {
    document.getElementById(i).style.height = val + "%";
    array[i] = val;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
