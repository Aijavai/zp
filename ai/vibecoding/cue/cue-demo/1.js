/**
 * @func 根据用户id获取用户信息
 * @param {*} id 
 * @param {*} users 
 * @returns 
 */
async function getUserById(id, users) {
    return users.find(user => user.id === id)
}

// 根据邮箱获取用户
async function getUserByEmail(email, users) {
    return users.find(user => user.email === email)
}

// 根据用户名获取用户
async function getUserByUsername(username, users) {
    return users.find(user => user.username === username)
}