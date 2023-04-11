import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const path = "data/authors.json"

export async function createAuthor(author) {
    const data = await fs.readFile(path);
    const authors = JSON.parse(data);

    author.id = nanoid();

    author = {
        ...author,
        created: new Date()
    }

    authors.push(author);

    await fs.writeFile(path, JSON.stringify(authors));

    return author;
}

export async function readAuthors(type) {
    const data = await fs.readFile(path);
    let authors = JSON.parse(data);

    if(type) {
        if(type === null || type ==="null") {
            authors = authors.filter((a) => a.username === null);
        }
        else {
            authors = authors.filter((a) => a.username != null);
        }
    }
    

    return authors;
}

export async function readAuthor(id) {
    const data = await fs.readFile(path);
    let authors = JSON.parse(data);

    return authors.find((a) => a.id === id);
}

export async function updateAuthor(id, body) {
    const data = await fs.readFile(path);
    let authors = JSON.parse(data);

    let author = authors.find((a) => a.id === id);

    if(author) {
        author.name = body.name;
        author.email = body.email;
        author.isPresentor = body.isPresentor;
        author.username = body.username;
        author.password = body.password;
        await fs.writeFile(path, JSON.stringify(authors));
        return author;
    }

    return null;
}

export async function deleteAuthor(id) {
    const data = await fs.readFile(path);
    const authors = JSON.parse(data);

    const index = authors.findIndex((a) => a.id === id);

    if(index) {
        const author = authors[index];
        authors.splice(index, 1);
        await fs.writeFile(path, JSON.stringify(authors));
        return author;
    }
    return null;
}
