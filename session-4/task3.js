function sendVerificationEmail(email) {
    return new Promise((resolve) => {
        console.log("Sending verification email...");
        setTimeout(() => {
            resolve("Email sent successfully");
        }, 1000);
    });
}

async function registerUser(name, email) {
    try {
        if (!name || !email) {
            throw new Error("Invalid input");
        }
        await sendVerificationEmail(email);
        return "User registered successfully";
    } catch (error) {
        return error.message;
    }
}

registerUser("Esraa", "esraa@gmail.com")
    .then(result => console.log(result));