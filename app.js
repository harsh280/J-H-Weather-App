const express=require("express");
const https=require("https");
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html");
});
app.use(express.static("public"));

app.post("/",function(req,res){
	const query = req.body.cityName;
	const unit = "metric";
    const apikey="4f06a229718f181366a8a13951c49d3d";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&mode=HTML&units="+unit+"#";
	https.get(url,function(response){
		response.on("data",function(data){
			const weatherData=JSON.parse(data);
		    const temp=weatherData.main.temp;
		    const icon = weatherData.weather[0].icon;
		    const weatherDes = weatherData.weather[0].description;
		    const mintemp=weatherData.main.temp_min;
		    const maxtemp=weatherData.main.temp_max;
		    const humi=weatherData.main.humidity;
		    const press=weatherData.main.pressure;
		    const ws=weatherData.wind.speed;
		    const vis=weatherData.visibility;
		    res.setHeader("Content-Type", "text/html");
		    res.write("<h1><u>"+query+" Weather Report.</u></h1><br><h3>&#x2022; Temperature in "+query+" is "+temp+"&#8451;."+"</h3><br><h3>&#x2022; The weather description is "+weatherDes+".</h3><br><h3>&#x2022; Maximum Temperature "+maxtemp+"&#8451;.</h3><br><h3>&#x2022; Minimum Temperature "+mintemp+"&#8451;.</h3><br><h3>&#x2022; Atmospheric Pressure "+press+"(hPa).</h3><br><h3>&#x2022; Humidity "+humi+"%.</h3><br><h3>&#x2022; Wind Speed is "+ws+"(m/s).</h3><br><h3>&#x2022; Visibility is "+vis+".</h3>");
		    const iconurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
		    res.write("<img src="+iconurl+">");
		    res.send();
		});
	});
})

https://api.openweathermap.org/data/2.5/weather?q=london&appid=4f06a229718f181366a8a13951c49d3d&mode=HTML&units=metric#




app.listen(process.env.PORT||4000,function(){
});
