import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const path = "data/papers.json";

export async function createPaper(paper) {
    const data = await fs.readFile(path);
    const papers = JSON.parse(data);

    paper.id = nanoid();

    paper = {
        ...paper,
        created: new Date()
    }

    papers.push(paper);
    await fs.writeFile(path, JSON.stringify(papers));
    
    return paper;
}

export async function readPapers() {
    const data = await fs.readFile(path);
    let papers = JSON.parse(data);

    return papers;
}

export async function readPaper(id) {
    const data = await fs.readFile(path);
    let papers = JSON.parse(data);

    return papers.find((p) => p.id === id);
}

export async function updatePaper(id, body) {
    const data = await fs.readFile(path);
    let papers = JSON.parse(data);

    let paper = papers.find((p) => p.id === id);

    if(paper) {
        paper.title = body.title;
        paper.abstract = body.abstract;
        paper.contributedAuthors = body.contributedAuthors;
        paper.paperPDFPath = body.paperPDFPath;

        await fs.writeFile(path, JSON.stringify(papers));
        return paper;
    }

    return null;
}

export async function deletePaper(id) {
    const data = await fs.readFile(path);
    const papers = JSON.parse(data);

    const index = papers.findIndex((r) => r.id === id);

    if(index >= 0) {
        const paper = papers[index];
        papers.splice(index, 1);

        await fs.writeFile(path, JSON.stringify(papers));
        return paper;
    }

    return null;
}
