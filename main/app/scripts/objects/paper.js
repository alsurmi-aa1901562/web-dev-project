export class Paper {
    #id;
    #title;
    #abstract;
    #authors;
    #pdfPath;

    constructor(id, title, abstract, authors, pdfPath) {
        this.#id = id;
        this.#title = title;
        this.#abstract = abstract;
        this.#authors = authors;
        this.#pdfPath = pdfPath;
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

    get authors() {
        return this.#authors;
    }

    get pdfPath() {
        return this.#pdfPath;
    }

    // Setters
    set id(id) {
        this.#id = id;
    }

    set title(title) {
        this.#title = title;
    }

    set abstract(abstract) {
        this.#abstract = abstract;
    }

    set authors(authors) {
        this.#authors = authors;
    }

    set pdfPath(pdfPath) {
        this.#pdfPath = pdfPath;
    }

    // Methods
    toString() {
        return `Paper #${this.#id}: [Title: ${this.#title}], [Abstract: ${this.#abstract}], [Authors: ${this.#authors}], [Path to Paper: ${this.#pdfPath}]`;
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            abstract: this.#abstract,
            authors: this.#authors,
            pdfPath: this.#pdfPath,
        }
    }
}