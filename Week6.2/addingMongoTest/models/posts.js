const mongoose=require('mongoose')
const {Schema, model} = mongoose

const postSchema= new Schema({
    user: String,
    message: String,
    likes: Number,
    time: Date,
})

const Posts = model('PostsCollection', postSchema)

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

function addNewPost(user, message){
    // let newPost={
    //     postid: nextPostID++,
    //     user: user,
    //     message: message
    // }
    // postData.push(newPost)
    // console.log(postData)
    let newPost={
        user: user,
        message: message,
        likes: 0,
        time: Date.now()
    }
    Posts.create(newPost)
        .catch(err=>{
            console.log("Error: "+err)
        })
}

async function getAllPosts(){
    // return postData
    let data=[]
    await Posts.find({})
        .exec()
        .then(mongoData=>{
            data=mongoData
            console.log(data)
        })
        
    return data
}

async function getLastNPosts(n=3){
    // return postData.slice(-n)
    let data=[]
    await Posts.find({})
        .sort({'time': -1})
        .limit(n)
        .exec()
        .then(mongoData=>{
            data=mongoData
            console.log(data)
        })
        
    return data
}

function likePost(){

}

module.exports={
    addNewPost,
    getAllPosts,
    getLastNPosts,
    likePost
}