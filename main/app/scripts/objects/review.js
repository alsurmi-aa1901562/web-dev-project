export class Review {
    #id;
    #paper;
    #reviewers;
    #score;
    #status;

    constructor(id, paper, reviewers, score, status) {
        this.#id = id;
        this.#paper = paper;
        this.#reviewers = reviewers;
        this.#score = score;
        this.#status = status;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get paper() {
        return this.#paper;
    }

    get reviewers() {
        return this.#reviewers;
    }

    get score() {
        return this.#score;
    }

    get status() {
        return this.#status;
    }

    // Setters
    set id(id) {
        this.#id = id;
    }

    set paper(paper) {
        this.#paper = paper;
    }

    set reviewers(reviewers) {
        this.#reviewers = reviewers;
    }

    set score(score) {
        this.#score = score;
    }

    set status(status) {
        this.#status = status;
    }

    // Methods
    toString() {
        return `Review #${this.#id}: [Paper: ${this.#paper}], [Assigned Reviewers: ${this.#reviewers}], [Score: ${this.#score}], [Status: ${this.#status}]`;
    }

    toJSON() {
        return {
            id: this.#id,
            paper: this.#paper,
            reviewers: this.#reviewers,
            score: this.#score,
            status: this.#status,
        }
    }
}