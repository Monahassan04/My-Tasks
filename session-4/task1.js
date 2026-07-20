const products = {
    1: "Laptop",
    2: "Phone",
    3: "Tablet"
};

function getProduct(id) {
    return new Promise((resolve, reject) => {
        const product = products[id];
        if (product) {
            resolve(product);
        } else {
            reject("Product not found");
        }
    });
}

getProduct(2)
    .then(product => console.log(product))
    .catch(error => console.log(error));