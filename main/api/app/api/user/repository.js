import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const path = "data/users.json";

export async function createUser(user) {
    const data = await fs.readFile(path);
    const users = JSON.parse(data);

    user.id = nanoid();

    user = {
        ...user,
        created: new Date()
    }

    users.push(user);
    await fs.writeFile(path, JSON.stringify(users));
    
    return user;
}

export async function readUsers(type) {
    const data = await fs.readFile(path);
    let users = JSON.parse(data);

    if(type === null || type === "null" || !type){
        return users;
    }
    
    users = users.filter((u) => u.role === type);
    return users;
}

export async function readUser(id) {
    const data = await fs.readFile(path);
    const users = JSON.parse(data);
    console.log(id);
    console.log(typeof id);

    return users.find((u) => u.id.toString() === id);
}

export async function updateUser(id, body) {
    const data = await fs.readFile(path);
    let users = JSON.parse(data);

    let user = users.find((u) => u.id.toString() === id);

    if(user) {
        user.fname = body.fname;
        user.lname = body.lname;
        user.email = body.email;
        user.password = body.password;
        user.role = body.role.toLowerCase();

        await fs.writeFile(path, JSON.stringify(users));
        return user;
    }

    return null;
}

export async function deleteUser(id) {
    const data = await fs.readFile(path);
    let users = JSON.parse(data);

    const index = users.findIndex((u) => u.id.toString() === id);

    if(index >= 0) {
        const user = users[index];
        users.splice(index, 1);

        await fs.writeFile(path, JSON.stringify(users));
        return user;
    }
}

