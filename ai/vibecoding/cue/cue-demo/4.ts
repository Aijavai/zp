type User = { 
    id: string;
    name: string;
    email: string;
    status: 'ACTIVE' | 'INACTIVE';
}

async function getUserById(id: string, users:User[]) {
    const user = await users.find(user => user.id === id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}