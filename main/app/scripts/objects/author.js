import {nanoid} from nanoid;

export class Author {
    #id;
    #name;
    #email;
    #isPresentor;
    #username;
    #password;

    constructor(name, email, isPresentor) {
        this.#id = nanoid();
        this.#name = name;
        this.#email = email;
        this.#isPresentor = isPresentor;
    }

    constructor(name, email, isPresentor, username, password) {
        this.#id = nanoid();
        this.#name = name;
        this.#email = email;
        this.#isPresentor = isPresentor;
        this.#username = username;
        this.#password = password;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get email() {
        return this.#email;
    }

    get isPresentor() {
        return this.#isPresentor;
    }

    get username() {
        return this.#username;
    }

    get password() {
        return this.#password;
    }

    // Setters
    set name(name) {
        this.#name = name;
    }

    set email(email) {
        this.#email = email;
    }

    set isPresentor(isPresentor) {
        this.#isPresentor = isPresentor;
    }

    set username(username) {
        this.#username = username;
    }

    set password(password) {
        this.#password = password;
    }

    // Methods
    toString() {
        return `Author #${this.#id}: [Name: ${this.#name}], [Email: ${this.#email}], [Presentor: ${this.#isPresentor}], [Username: ${this.#username}]`;
    }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            email: this.#email,
            isPresentor: this.#isPresentor,
            username: this.#username,
            password: this.#password,
        }
    }
}