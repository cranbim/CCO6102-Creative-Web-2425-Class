// const userData=[
//     {username: 'user1', password: '123'},
//     {username: 'user2', password: '456'}
// ]

const mongoose=require('mongoose')
const {Schema, model} = mongoose

const userSchema= new Schema({
    username: {
        type: String,
        index: true,
        unique: true
    },
    password: String
})

const User = model('UsersCollection', userSchema)

async function newUser(username, password){
    let isUser=await findUser(username)
    console.log(isUser)
    if(!isUser){
        const user={
            username:username, 
            password:password
        }
        await User.create(user)
        .catch(err=>{
            console.log('Error:'+err)
            return false
        })
        return true
    }
    return false
}

// function newUser(username, password){
//     let isUser=findUser(username)
//     if(!isUser){
//         const user={
//             username: username,
//             password: password
//         }
//         userData.push(user)
//         return true
//     }
//     return false
// }

// function getUsers(){
//     return userData
// }

async function getUsers(){
    // return users
    let data=[]
    await User.find({})
        .exec()
        .then(mongoData=>{
            data=mongoData
        })
        .catch(err=>{
            console.log('Error:'+err)
        })
    return data
}

async function findUser(userToFind){
    // return users.find(user=>user.username==username)
    let user=null
    await User.findOne({username:userToFind}).exec()
        .then(dataFromMongo=>{
            user=dataFromMongo
        })
        .catch(err=>{
            console.log('error:'+err)
        })
    return user
}

// function findUser(username){
//     let foundUser=userData.find(user=>user.username==username)
//     return foundUser
// }

// function checkPassword(username, password){
//     let foundUser=findUser(username)
//     if(foundUser){
//         return foundUser.password==password
//     }
//     return false
// }

async function checkPassword(username, password){
    let user=await findUser(username)
    if(user){
        return user.password==password
    }
    return false
}

module.exports={
    newUser,
    getUsers,
    findUser,
    checkPassword
}