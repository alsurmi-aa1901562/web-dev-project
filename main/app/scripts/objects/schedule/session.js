export class Session {
    #id;
    #title;
    #location;
    #date;

    constructor(id, title, location, date) {
        this.#id = id;
        this.#title = title;
        this.#location = location;
        this.#date = date;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get location() {
        return this.#location;
    }

    get date() {
        return this.#date;
    }

    // Setters
    set id(id) {
        this.#id = id;
    }

    set title(title) {
        this.#title = title;
    }

    set location(location) {
        this.#location = location;
    }

    set date(date) {
        this.#date = date;
    }

    // Methods
    toString() {
        return `Session #${this.#id}: [Title: ${this.#title}], [Location: ${this.#location}], [Date: ${this.#date}]`;
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            location: this.#location,
            date: this.#date,
        }
    }
}