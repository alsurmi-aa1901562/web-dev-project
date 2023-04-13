export class Users {
    #id;
    #fname;
    #lname;
    #email;
    #password;
    #role;

    constructor(id, fname, lname, email, password, role) {
        this.#id = id;
        this.#fname = fname;
        this.#lname = lname;
        this.#email = email;
        this.#password = password;
        this.#role = role;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get fname() {
        return this.#fname;
    }

    get lname() {
        return this.#lname;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    get role() {
        return this.#role;
    }

    // Settors
    set id(id) {
        this.#id = id;
    }

    set fname(firstName) {
        this.#fname = firstName;
    }

    set lname(lastName) {
        this.#lname = lastName;
    }

    set email(email){
        this.#email = email;
    }

    set password(password) {
        this.#password = password;
    }

    set role(role) {
        this.#role = role;
    }

    // Methods
    toString() {
        return `USER #${this.#id}: [First Name: ${this.#fname}], [Last Name: ${this.#lname}], [Email: ${this.#email}], [Password: ${this.#password}], [Role: ${this.#role}]`;
    }

    toJSON() {
        return {
            "id": this.#id,
            "fname": this.#fname,
            "lname": this.#lname,
            "email": this.#email,
            "password": this.#password,
            "role": this.#role
        }
    }
}