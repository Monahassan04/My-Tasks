function calculateShipping(weight) {
    return new Promise((resolve, reject) => {
        if (weight <= 0) {
            reject("Invalid weight");
        } else {
            resolve(`Shipping cost: ${weight * 5}`);
        }
    });
}

calculateShipping(10)
    .then(cost => console.log(cost))
    .catch(error => console.log(error));