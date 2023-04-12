export class Author {
    #id;
    #fname;
    #lname;
    #email;
    #affiliation;
    #isPresentor;
    #username;
    #password;
    
    constructor(id, fname, lname, email, affiliation, isPresentor, username, password) {
        this.#id = id;
        this.#fname = fname;
        this.#lname = lname;
        this.#email = email;
        this.#affiliation = affiliation;
        this.#isPresentor = isPresentor;
        this.#username = username;
        this.#password = password;
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
    set id(id) {
        this.#id = id;
    }

    set fname(fname) {
        this.#fname = fname;
    }

    set lname(lname) {
        this.#lname = lname;
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
        return `Author #${this.#id}: [First Name: ${this.#fname}], [Last Name: ${this.#lname}], [Email: ${this.#email}], [Presentor: ${this.#isPresentor}], [Username: ${this.#username}]`;
    }

    toJSON() {
        return {
            id: this.#id,
            fname: this.#fname,
            lname: this.#lname,
            email: this.#email,
            isPresentor: this.#isPresentor,
            username: this.#username,
            password: this.#password,
        }
    }
}