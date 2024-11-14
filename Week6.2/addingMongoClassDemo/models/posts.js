// let nextPostID=2
// let postData=[
//     {
//         postid:0,
//         user: 'user1',
//         message: 'Looking forward to tonight'
//     },{
//         postid:1,
//         user: 'user2',
//         message: 'It is Thursday'
//     }

// ]

const mongoose=require('mongoose')
const {Schema, model} = mongoose

const postSchema=new Schema({
    user: String,
    message: String,
    likes: Number,
    time: Date
})

const postData=model('MyPosts', postSchema)


function addNewPost(user, message){
    let newPost={
        user: user,
        message: message,
        likes: 0,
        time: Date.now()
    }
    // postData.push(newPost)
    postData.create(newPost)
        .catch(err=>{
            console.log("error: "+err)
        })
    console.log(postData)
}

async function getAllPosts(){
    let foundData=[]
    postData.find({})
        .then(mongoData=>{
            foundData=mongoData
        })
    return foundData
}

async function getLastNPosts(n=3){
    let foundData=[]
    await postData.find({})
        .sort({'time':-1})
        .limit(n)
        .exec()
        .then(mongoData=>{
            // console.log("posts.js found posts")
            // console.log(mongoData)
            foundData=mongoData
        })
    return foundData
}

function likePost(){

}

module.exports={
    addNewPost,
    getAllPosts,
    getLastNPosts,
    likePost
}