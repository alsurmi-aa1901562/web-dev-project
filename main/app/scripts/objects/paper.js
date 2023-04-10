import {nanoid} from nanoid;

export class Paper {
    #id;
    #title;
    #abstract;
    #contributedAuthors;
    #paperPDFPath;

    constructor(title, abstract, contributedAuthors, paperPDFPath) {
        this.#id = nanoid();
        this.#title = title;
        this.#abstract = abstract;
        this.#contributedAuthors = contributedAuthors;
        this.#paperPDFPath = paperPDFPath;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get abstract() {
        return this.#abstract;
    }

    get contributedAuthors() {
        return this.#contributedAuthors;
    }

    get paperPDFPath() {
        return this.#paperPDFPath;
    }

    // Setters
    set title(title) {
        this.#title = title;
    }

    set abstract(abstract) {
        this.#abstract = abstract;
    }

    set contributedAuthors(contributedAuthors) {
        this.#contributedAuthors = contributedAuthors;
    }

    set paperPDFPath(paperPDFPath) {
        this.#paperPDFPath = paperPDFPath;
    }

    // Methods
    toString() {
        return `Paper #${this.#id}: [Title: ${this.#title}], [Abstract: ${this.#abstract}], [Contributed Authors: ${this.#contributedAuthors}], [Path to Paper: ${this.#paperPDFPath}]`;
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            abstract: this.#abstract,
            contributedAuthors: this.#contributedAuthors,
            paperPDFPath: this.#paperPDFPath,
        }
    }
}