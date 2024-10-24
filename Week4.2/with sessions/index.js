const express= require('express')
const app=express()
const path=require('path')

const posts=require('./models/posts.js')

const users=require('./models/users.js')
console.log(users.getUsers())


app.listen(3000, ()=>{
    console.log('listening on port 3000')
})

app.use(express.static('public'))

app.use(express.urlencoded({extended: false}))

const oneHour=60 * 60 *1000
const threeMinutes= 3*60*1000

const sessions=require('express-session')
const cookieParser=require('cookie-parser')

app.use(sessions({
    secret: "this is Dave's secret",
    saveUninitialized: true,
    cookie: {maxAge: threeMinutes},
    resave: false
}))

function checkLoggedIn(request, response, nextAction){
    if(request.session){
        if(request.session.username){
            console.log('valid user, come on in')
            nextAction()
        } else {
            request.session.destroy()
            console.log('imposter get out')
            response.sendFile(path.join(__dirname, '/views', 'notloggedin.html'))

        }
    }
}

app.get('/app', checkLoggedIn, (request, response)=>{
    response.sendFile(path.join(__dirname, '/views', 'app.html'))
})

app.get('/login', (request, response)=>{
    response.sendFile(path.join(__dirname, '/views', 'login.html'))
})

app.get('/register', (request, response)=>{
    response.sendFile(path.join(__dirname, '/views', 'register.html'))
})

app.post('/register', (request, response)=>{
    if(users.newUser(request.body.username, request.body.password)){
        response.sendFile(path.join(__dirname, '/views', 'login.html'))
        console.log(users.getUsers())
    } else {
        response.sendFile(path.join(__dirname, '/views', 'registration_failed.html'))
    }
})

app.post('/login', (request, response)=>{
   if(users.checkPassword(request.body.username, request.body.password)){
        console.log('valid user')
        request.session.user=request.body.username
        response.sendFile(path.join(__dirname, '/views', 'app.html'))
   } else {
        console.log('invalid user')
        response.sendFile(path.join(__dirname, '/views', 'notloggedin.html'))
   }
})


app.get('/logout', (request, response)=>{
    request.session.destroy()
    response.sendFile(path.join(__dirname, '/views', 'logout.html'))
})



app.get('/getposts', (request, response)=>{
    response.json({posts: posts.getLastNPosts(3).reverse()})
})

app.post('/newpost', (request, response)=>{
    // console.log(request.body.message)
    // let newPost={
    //     postid: posts.nextPostID++,
    //     user: 'user0',
    //     message: request.body.message
    // }
    // posts.postData.unshift(newPost)
    posts.addNewPost('userX', request.body.message)
    // console.log(posts.postData)
    response.sendFile(path.join(__dirname, '/views', 'app.html'))

})

