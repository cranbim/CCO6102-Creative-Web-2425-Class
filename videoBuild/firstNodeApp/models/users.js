// const userData=[
//     {
//         username: 'user1',
//         password: '123'
//     },
//     {
//         username: 'user2',
//         password: '456'
//     }
// ]

const mongoose=require('mongoose')
const {Schema, model} = mongoose

const userSchema = new Schema({
    username: String,
    password: String
})

const userData = model('User', userSchema)

async function checkUser(givenUser){
    // return userData.find(user=>user.username==givenUser)
    let matchedUser=null
    matchedUser= await userData.findOne({username:givenUser})
    return matchedUser
}

async function checkPassword(givenUser, givenPassword){
    let matchedUser=await checkUser(givenUser)
    if(matchedUser){
        return givenPassword==matchedUser.password
    }
    console.log('no such user')
    return false
}

async function addNewUser(givenUser, givenPassword){
    if(await checkUser(givenUser)){
        return false
    } else {
        let newUser={
            username: givenUser,
            password: givenPassword
        }
        // userData.push(newUser)
        userData.create(newUser)
        .catch(err=>{
            console.log("Error: "+err)
        })
        return true
    }
}


module.exports={
    checkUser,
    checkPassword,
    addNewUser
}