const path=require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

const app = express()
const port= process.env.PORT || 3000

// Define paths for Express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))

// Setup static directory to serve
app.use(express.static(publicDir))


app.get('',(req,res)=>{
    // render allows us to render one of our views
    res.render('index',{
        title: 'Weather App',
        name: 'Jovana'
    })
})

app.get('/about',(req,res)=>{
    // render allows us to render one of our views
    res.render('about',{
        title: 'About',
        name: 'Jovana'
    })
})


app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'Hello!',
        name: 'Jovana'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longtitude, place}={}) => {
        if(error){
            return res.send({
                error
            })
        }
    
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            
            res.send({
                forecast:forecastData,
                location: place,
                address:req.query.address
            })
        })
    })
    
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: 'Error 404',
        message: 'Help article not found.',
        name: 'Jovana'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: 'Error 404',
        message: 'Help article not found.',
        name: 'Jovana'
    })
})

//This app.get has to come last
app.get('*',(req,res)=>{
    res.render('error',{
        title: 'Error 404',
        message: 'Page not found.',
        name: 'Jovana'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})
