import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const path = "data/reviewers.json";

export async function createReviewer(reviewer) {
    const data = await fs.readFile(path);
    const reviewers = JSON.parse(data);

    reviewer.id = nanoid();

    reviewer = {
        ...reviewer,
        created: new Date()
    }

    reviewers.push(reviewer);
    await fs.writeFile(path, JSON.stringify(reviewers));
    
    return reviewer;
}

export async function readReviewers() {
    const data = await fs.readFile(path);
    let reviewers = JSON.parse(data);

    return reviewers;
}

export async function readReviewer(id) {
    const data = await fs.readFile(path);
    let reviewers = JSON.parse(data);

    return reviewers.find((r) => r.id === id);
}

export async function updateReviewer(id, body) {
    const data = await fs.readFile(path);
    let reviewers = JSON.parse(data);

    let reviewer = reviewers.find((r) => r.id === id);

    if(reviewer) {
        reviewer.name = body.name;
        reviewer.username = body.username;
        reviewer.password = body.password;

        await fs.writeFile(path, JSON.stringify(reviewers));
        return reviewer;
    }

    return null;
}

export async function deleteReviewer(id) {
    const data = await fs.readFile(path);
    const reviewers = JSON.parse(data);

    const index = reviewers.findIndex((r) => r.id === id);

    if(index >= 0) {
        const reviewer = reviewers[index];
        reviewers.splice(index, 1);

        await fs.writeFile(path, JSON.stringify(reviewers));
        return reviewer;
    }

    return null;
}