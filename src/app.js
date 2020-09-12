const express =require('express')
const path = require('path')
const hbs =require('hbs')
const request = require('request')
console.log(path.join(__dirname,'../public'))
const publicDirPath = path.join(__dirname,'../public')
const viewpaths = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000
app.set('view engine','hbs')
app.set('views',viewpaths)
app.use(express.static(publicDirPath))
hbs.registerPartials(partialsPath)

//default
app.get('',(req,res)=>{
     res.render('index',{
         title: 'Weather App',
         name: 'Anurag',
         author:'Anurag'
     })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'Please provide search term'
        })
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('/help',(req,res)=>{
     res.render('help',{
         message:'Anurag at your service sir',
        title:'Help',
    author:'Anurag'}
         )
})

app.get('/about',(req,res)=>{
    //res.send([{message:'It is about Pattu sir'},{message:'It is only about Pattu'}])
    res.render('about',{
        source:'/img/download.png',
        title: 'About',
        author:'Anurag'
    })
 })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide address term'
        })
    }
    const address =req.query.address
   // if()
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibWFwYW51cmFnbWlzaHJhMDgiLCJhIjoiY2tlcjg0c21qNGFzbTJ6bHRtbGF1Mmk5NiJ9.kCZVkP6k_UDV26F2ZQsfLg'
    var latitude='';
    var longitude='';
request({url: url2,json: true},(error,response,body)=>{
    console.log('Calling mapbox '+ url2);
    console.log("First response " + JSON.stringify(response))
    if(error){
        return res.send({
            error:'Please search another location'
        })
    }else{
        console.log('Body211 ==>' + JSON.stringify(response.body))
        if(!response.body.features[0]){
            return res.send({
                error:'Not a valid search ' + address
            })
        }        
        console.log('Body211 ==>' + JSON.stringify(response.body.features[0].geometry.coordinates[0]))
        console.log('Body212 ==>' + JSON.stringify(response.body.features[0].geometry.coordinates[1]))
        latitude = JSON.stringify(response.body.features[0].geometry.coordinates[0])
        longitude= JSON.stringify(response.body.features[0].geometry.coordinates[1])
        console.log('latitude' +latitude + 'longitude '+ longitude)
        console.log('latitude out ' +latitude + 'longitude out '+ longitude)
var url3 = 'http://api.weatherstack.com/current?access_key=c96535adda3427fabb10a1c781fcb2f7&query='+latitude+','+longitude

request({url: url3,json: true},(error,response,body)=>{
    
    console.log('Calling weather stack ' + url3);

    if(error){
        console.log('Error ==>' + error)
        return  res.send({
            error:err
         })
    }else{        
        if(response.body.error){
            return  res.send({            
                error:response.body.error.info
                
             })

        }else{
            console.log('Final response ==> ' +JSON.stringify(response.body))
            return  res.send({            
                description:response.body.current.weather_descriptions[0],
                timezoneid:response.body.location.timezone_id,
                windspeed:response.body.current.wind_speed,
                winddirection:response.body.current.wind_dir,
                time:response.body.current.observation_time
             })
        }        
    }

})
    }
})
   /* geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return  res.send({
                      error:'Error =>'+ error
                    })
        }    
        //console.log('Data=>'+JSON.stringify(data))
        forecast(latitude,longitude,(error,data)=>{
            if(error){
                return  res.send({
                    error:'Error =>'+ error
                  })
            }        
            return  res.send({
                data:'Data=>'+ JSON.stringify(data)
             })
         })
     })  */ 
})

app.get('/help/*',(req,res)=>{
    //res.send('Help not found on the topic')
    res.render('error',{
        title:'Requested Data not found!!',
        author:'Anurag',
        errormessage:'Help topic not found'
    })
})


app.get('*',(req,res)=>{
    res.render('error',{
        title:'Page Data not found!!',
        author:'Anurag',
        errormessage:'Page not found'
    })
})


app.listen(port,()=>{
    console.log('server is up on port ' + port + '!!')
})