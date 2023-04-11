export class Reviewer {
    #id;
    #name;
    #username;
    #password;

    constructor(id, name, username, password) {
        this.#id = id;
        this.#name = name;
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

    get username() {
        return this.#username;
    }

    get password() {
        return this.#password;
    }

    // Setters
    set id(id) {
        this.#id = id;
    }

    set name(name) {
        this.#name = name;
    }

    set username(username) {
        this.#username = username;
    }

    set password(password) {
        this.#password = password;
    }

    // Methods
    toString() {
        return `Reviewer #${this.#id}: [Name: ${this.#name}], [Username: ${this.#username}]`;
    }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            username: this.#username,
            password: this.#password,
        }
    }
}