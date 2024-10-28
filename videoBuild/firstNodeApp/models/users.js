const userData=[
    {
        username: 'user1',
        password: '123'
    },
    {
        username: 'user2',
        password: '456'
    }
]

function checkUser(givenUser){
    return userData.find(user=>user.username==givenUser)
}

function checkPassword(givenUser, givenPassword){
    let matchedUser=checkUser(givenUser)
    if(matchedUser){
        return givenPassword==matchedUser.password
    }
    console.log('no such user')
    return false
}

function addNewUser(givenUser, givenPassword){
    if(checkUser(givenUser)){
        return false
    } else {
        let newUser={
            username: givenUser,
            password: givenPassword
        }
        userData.push(newUser)
        return true
    }
}


module.exports={
    checkUser,
    checkPassword,
    addNewUser
}