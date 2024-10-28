//Basic setup of Node as a web server
const express=require('express')
const app=express()
const PORT=3000
const path=require('path')

app.listen(PORT, ()=>{
    console.log('listening on port:'+PORT)
})

//serve files to incloing browser requests from the public folder
app.use(express.static('public'))

//allows Express to pick up form data from the url
app.use(express.urlencoded({extended: false}))

//imports and setup for using sessions
const cookieParser=require('cookie-parser')
const sessions=require('express-session')

app.use(cookieParser())

const threeMinutes=3 * 60 *1000
const oneHour=60 * 60 * 1000

app.use(sessions({
    secret: 'this is a scret dont tell anyone',
    cookie: {maxAge: threeMinutes},
    saveUninitilized: true,
    resave: false
}))

//Our gatekeeper function, nextAction will only execute if the browser has
// a valid, unexpired session cookie with a valid username
function checkLoggedIn(request, response, nextAction){
    if(request.session){
        if(request.session.username){
            nextAction()
        } else {
            request.session.destroy()
             response.sendFile(path.join(__dirname, './views','notloggedin.html'))
        }
    }
}

//listen for /app get requests and check logeed in status with sessions
app.get('/app', checkLoggedIn, (request, response)=>{
    response.sendFile(path.join(__dirname, './views','app.html'))
})

//import our user model
const userData=require('./models/users.js')

app.get('/register',(request, response)=>{
    response.sendFile(path.join(__dirname, './views','register.html'))
})

// handle registration form posting to /register
app.post('/register', (request, response)=>{
    let givenUsername=request.body.username
    let givenPassword=request.body.password
    if(userData.addNewUser(givenUsername, givenPassword)){
        console.log('registration successful')
        response.sendFile(path.join(__dirname, './views','login.html'))
    } else {
        console.log('registration failed')
        response.sendFile(path.join(__dirname, './views','registration_failed.html'))
    }
})

app.get('/login',(request, response)=>{
    response.sendFile(path.join(__dirname, './views','login.html'))
})

// handle registration form posting to /register
//if successful create a new session cookie with username
app.post('/login', (request, response)=>{
    let givenUsername=request.body.username
    let givenPassword=request.body.password
    if(userData.checkPassword(givenUsername, givenPassword)){
        console.log('these match come on in')
        request.session.username=givenUsername
        response.sendFile(path.join(__dirname, './views','app.html'))
    } else {
        console.log('imposter, get out')
        request.session.destroy()
        response.sendFile(path.join(__dirname, './views','login_failed.html'))
    }
})

app.get('/logout',(request, response)=>{
    response.sendFile(path.join(__dirname, './views','logout.html'))
})

app.post('/logout',(request, response)=>{
    request.session.destroy()
    response.sendFile(path.join(__dirname, './views','notloggedin.html'))
})

// import our posts model
const postData=require('./models/posts.js')


app.get('/data',(request, response)=>{
    response.json({posts:postData.getRecentPosts(3).reverse()})
})

app.post('/newpost',(request, response)=>{
    console.log(request.body)
    postData.addNewPost(request.session.username, request.body.message)
    response.sendFile(path.join(__dirname, './views','app.html'))
})