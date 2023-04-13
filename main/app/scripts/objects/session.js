// TODO: DEFINE WHAT THIS EVENT IS... Wait for the completion of the organizer page.
export class Event {
    #id;
    #title;
    #location;
    #date;

    constructor(id, date, location, title) {
        this.#id = id;
        this.#date = date;
        this.#location = location;
        this.#title = title;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get date() {
        return this.#date;
    }

    get location() { 
        return this.#location;
    }

    get title() {
        return this.#title;
    }

    // Setters
    set id(id) { 
        this.#id = id;
    }

    set date(date) {
        this.#date = date;
    }

    set location(location) {
        this.#location = location;
    }

    set title(title) {
        this.#title = title;
    }

    // Methods
    toString() {
        return `Event #${this.#id}: [Date: ${this.#date}], [Location: ${this.#location}], [Title: ${this.#title}]`;
    }

    toJSON() {
        return {
            id: this.#id,
            date: this.#date,
            location: this.#location,
            title: this.#title
        }
    }

}