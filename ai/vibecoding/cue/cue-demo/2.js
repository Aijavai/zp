const users = [
    {
        id: 1,
        username: 'trae',
        email: 'trae@example.com',
        password: '123456',
    },
    {
        id: 2,
        username: 'trae2',
        email: 'trae2@example.com',
        password: '123456',
    },
]

console.log(users.find(user => user.id === 1));
