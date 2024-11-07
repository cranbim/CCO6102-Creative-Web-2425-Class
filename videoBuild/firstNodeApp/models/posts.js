// let nextPostID=2
// const postData=[
//     {
//         postid: 0,
//         user: 'user1',
//         message: "Hi It's Thursday"
//     },
//     {
//         postid: 1,
//         user: 'user2',
//         message: "I'm hungry"
//     }
// ]

const mongoose=require('mongoose')
const {Schema, model} = mongoose

const postSchema = new Schema({
    user: String,
    message: String,
    time: Date,
    likes: Number
})

const postData = model('PostItem', postSchema)

async function getRecentPosts(n=3){
    // return postData.slice(-n)
    let data=[]
    await postData.find({})
        .sort({time: -1})
        .limit(n)
        .exec()
        .then(mongoData=>{
            console.log(mongoData)
            data=mongoData
        })
    return data
}

async function addNewPost(username, message){
    let newPost={
        user: username,
        message: message,
        time: Date.now(),
        likes: 0
    }
    // postData.push(newPost)
    await postData.create(newPost)
        .catch(err=>{
            console.log("Error: "+err)
        })
}

function likePost(){
    
}

module.exports={
    getRecentPosts,
    addNewPost
}