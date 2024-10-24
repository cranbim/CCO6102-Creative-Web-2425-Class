const userData=[
    {username: 'user1', password: '123'},
    {username: 'user2', password: '456'}
]

function newUser(username, password){
    let isUser=findUser(username)
    if(!isUser){
        const user={
            username: username,
            password: password
        }
        userData.push(user)
        return true
    }
    return false
}

function getUsers(){
    return userData
}

function findUser(username){
    let foundUser=userData.find(user=>user.username==username)
    return foundUser
}

function checkPassword(username, password){
    let foundUser=findUser(username)
    if(foundUser){
        return foundUser.password==password
    }
    return false
}

module.exports={
    newUser,
    getUsers,
    findUser,
    checkPassword
}