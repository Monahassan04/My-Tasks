function greaterThan(arr, val) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > val) result.push(arr[i]);
    }
    return result;
}