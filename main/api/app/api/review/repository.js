import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const path = "data/review.json";

export async function createReview(review) {
    const data = await fs.readFile(path);
    const reviews = JSON.parse(data);

    review.id = nanoid();

    review = {
        ...review,
        created: new Date()
    }

    reviews.push(review);
    await fs.writeFile(path, JSON.stringify(reviews));
    
    return review;
}

export async function readReviews() {
    const data = await fs.readFile(path);
    let reviews = JSON.parse(data);

    return reviews;
}

export async function readReview(id) {
    const data = await fs.readFile(path);
    let reviews = JSON.parse(data);

    return reviews.find((r) => r.id === id);
}

export async function updateReview(id, body) {
    const data = await fs.readFile(path);
    let reviews = JSON.parse(data);

    let review = reviews.find((r) => r.id === id);

    if(review) {
        review.name = body.name;
        review.paper = body.paper;
        review.reviewers = body.reviewers;
        review.score = body.score;
        review.status = body.status;

        await fs.writeFile(path, JSON.stringify(reviews));
        return review;
    }

    return null;
}

export async function deleteReview(id) {
    const data = await fs.readFile(path);
    const reviews = JSON.parse(data);

    const index = reviews.findIndex((r) => r.id === id);

    if(index >= 0) {
        const review = reviews[index];
        console.log(review)
        reviews.splice(index, 1);

        await fs.writeFile(path, JSON.stringify(reviews));
        return review;
    }

    return null;
}