const request=require('request');
const geocode = (address,callback)=>{

    const myurl = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'_.json?access_token=pk.eyJ1IjoiYW51cmFnMTciLCJhIjoiY2tiemEzbzQ3MGx4bjJxbXI2amNtdjNubyJ9.9dzn2nTp10a4kvjauGsiJg&limit=1&language=en'
    console.log(myurl)
    request.post({ myurl,json:true },(error,{body}={})=>{
            if(error){
                callback('Unable to connect to ' + myurl + ' issue is ' + error,undefined)
            }else if(body.features!== undefined && body.features.length===0){
                callback('Unable to find location ',undefined)
            }else{
                callback(undefined,{
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })            }
        })

}

module.exports=geocode