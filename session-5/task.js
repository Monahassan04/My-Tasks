class Phone {
    constructor(brand, price) {
        this.brand = brand;
        this.price = price;
    }

    call() {
        console.log(`${this.brand} is calling...`);
    }
}

const phone1 = new Phone("Samsung", 30000);
const phone2 = new Phone("Apple", 45000);

phone1.call();
phone2.call();


class User {
    static count = 0;

    constructor(name) {
        this.name = name;
        User.count++;
    }

    greet() {
        console.log(`Hello ${this.name}`);
    }

    static sayHello() {
        console.log("Hello from User class");
    }
}

const user1 = new User("Esraa");
const user2 = new User("Ahmed");
const user3 = new User("Sara");

console.log(User.count);
User.sayHello();


class User {
    constructor(userName, userId, userEmail) {
        this.userName = userName;
        this.userId = userId;
        this.userEmail = userEmail;
    }

    login(password) {
        console.log(`${this.userName} logged in using ${password}`);
    }

    sendMessage(message) {
        console.log(`${this.userName}: ${message}`);
    }
}

class Admin extends User {
    constructor(userName, userId, userEmail, permissions) {
        super(userName, userId, userEmail);
        this.permissions = permissions;
    }

    deleteUser() {
        console.log("User deleted");
    }
}

const admin = new Admin("Esraa", 101, "esraa@mail.com", ["read", "write", "delete"]);
admin.login("admin123");
admin.deleteUser();

class Animal {
    speak() {
        console.log("Generic animal sound");
    }
}

class Cat extends Animal {
    speak() {
        console.log("Meow");
    }
}

class Cow extends Animal {
    speak() {
        console.log("Moo");
    }
}

class Dog extends Animal {
    speak() {
        console.log("Woof");
    }
}

const animals = [new Animal(), new Cat(), new Cow(), new Dog()];
animals.forEach((animal) => {
    animal.speak();
});

class EmailService {
    
    send(email, message) {
        this.#connectSMTP();
        this.#validateEmail(email);
        console.log(`Sending "${message}" to ${email}`);
    }

    
    #connectSMTP() {
        console.log("Connected to SMTP server");
    }

    #validateEmail(email) {
        console.log(`Validated ${email}`);
    }
}

const emailer = new EmailService();

emailer.send("esraa@mail.com", "Welcome!");