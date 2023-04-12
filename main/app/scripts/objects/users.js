export class Users {
    #authors;
    #reviewers;
    #organizers;

    constructor(authors, reviewers, organizers) {
        this.#authors = authors;
        this.#reviewers = reviewers;
        this.#organizers = organizers;
    }

    // Getters
    get authors() {
        return this.#authors;
    }

    get reviewers() {
        return this.#reviewers;
    }

    get organizers() {
        return this.#organizers;
    }

    // Settors
    set authors(authors) {
        this.#authors = authors;
    }

    set reviewers(reviewers) {
        this.#reviewers = reviewers;
    }

    set organizers(organizers) {
        this.#organizers = organizers;
    }

    // Methods
    toString() {
        return `[Authors: {${this.#authors}}, [Reviewers: {${this.#reviewers}}], [Organizers: {${this.#organizers}}]`;
    }

    toJSON() {
        return {
            authors: this.#authors,
            reviewers: this.#reviewers,
            organizers: this.#organizers
        }
    }
}