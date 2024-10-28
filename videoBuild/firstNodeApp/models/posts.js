let nextPostID=2
const postData=[
    {
        postid: 0,
        user: 'user1',
        message: "Hi It's Thursday"
    },
    {
        postid: 1,
        user: 'user2',
        message: "I'm hungry"
    }
]

function getRecentPosts(n=3){
    return postData.slice(-n)
}

function addNewPost(username, message){
    let newPost={
        postId: nextPostID++,
        user: username,
        message: message
    }
    postData.push(newPost)
}

function likePost(){
    
}

module.exports={
    getRecentPosts,
    addNewPost
}