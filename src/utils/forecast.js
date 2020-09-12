const request=require('request')

const forecast = (latitude,longitude,callback)=>{

    const myurl = 'http://api.weatherstack.com/forecast?access_key=196d9d2b5dfbd78bae0206e6687d4455&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+''
    console.log(myurl)
    request({ myurl,json:true },(error,{body}={})=>{
            if(error){
                callback('Unable to connect to ' + myurl + ' issue is ' + error,undefined)
            }else if(body.error!== undefined ){
                callback(body.error.info,undefined)
            }else{
                callback(undefined,{
                    location: body.location.name,
                    mintemp: body.forecast,
                    maxtemp: body.forecast.maxtemp,
                    sunshine: body.forecast.sunhour
                })
            }
        })

}

module.exports=forecast