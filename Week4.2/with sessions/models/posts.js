let nextPostID=2
let postData=[
    {
        postid:0,
        user: 'user1',
        message: 'Looking forward to tonight'
    },{
        postid:1,
        user: 'user2',
        message: 'It is Thursday'
    }

]

function addNewPost(user, message){
    let newPost={
        postid: nextPostID++,
        user: user,
        message: message
    }
    postData.push(newPost)
    console.log(postData)
}

function getAllPosts(){
    return postData
}

function getLastNPosts(n=3){
    return postData.slice(-n)
}

function likePost(){

}

module.exports={
    addNewPost,
    getAllPosts,
    getLastNPosts,
    likePost
}