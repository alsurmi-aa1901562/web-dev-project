export class Schedule {
    #id;
    #date;
    #sessions;

    constructor(id, date, sessions) {
        this.#id = id;
        this.#date = date;
        this.#sessions = sessions;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get date() { 
        return this.#date;
    }

    get sessions() {
        return this.#sessions;
    }

    // Setters
    set id(id) {
        this.#id = id;
    }

    set date(date) {
        this.#date = date;
    }

    set sessions(sessions) {
        this.#sessions = sessions;
    }

    // Methods
    toString() {
        return `Schedule #${this.#id}: [Date: ${this.#date}], [Sessions: ${this.#sessions}]`;
    }

    toJSON() {
        return {
            id: this.#id,
            date: this.#date,
            sessions: this.#sessions
        }
    }
      
}