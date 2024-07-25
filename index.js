const express = require('express');
const { post } = require('request');
const request = require('request');
const app = express();

let consumerKey = "Your Consumer Key"
let consumerSecret = "Your COnsumer Secret"
let passKey = "Passkey"


//routes
app.get('/', (req, res) =>{
    res.send("Hello World")
})

app.get('/about', function (req, res) {
    let timeStamp = new Date()
    let year = timeStamp.getFullYear().toString()
    let month = "0" + (timeStamp.getMonth() +1)
    let date = timeStamp.getDate()
    let hours = timeStamp.getHours()
    let minutes = timeStamp.getMinutes()
    let seconds = timeStamp.getSeconds()
    let time = year+month+date+hours+minutes+seconds
    res.send(time)
})


app.get('/access_token', (req, res) =>{
    // access token
    let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
	let auth = Buffer.from(consumerKey + ':' + consumerSecret).toString('base64');
    let auths = Buffer.from('Basic' + ' ' + auth)
    //res.send(auths)
    request(
        {
            url:url,
            headers:{
                "Authorization": auths
            }
        },
        (error, response, body) => {
            if(error){
                console.log(error)
            }
            else{
                res.status(200).json(body)
            }
        }
    )
})

app.get('/simulate', (req, res) =>{
    let timeStamp = new Date()
    let year = timeStamp.getFullYear().toString()
    let month = "0" + (timeStamp.getMonth() +1)
    let date = timeStamp.getDate()
    let hours = timeStamp.getHours()
    let minutes = timeStamp.getMinutes()
    let seconds = timeStamp.getSeconds()
    let time = year+month+date+hours+minutes+seconds
    
    let shortcode = "7796062"
    
    let password = Buffer.from(shortcode+passKey+time).toString('base64')
    //let passWord = password.toString('base64')

   // res.send(time + '  ' + password)

    request({url: "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    method: 'POST',
    headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer add_bearer",
    },
    body: JSON.stringify({
        "BusinessShortCode": 174379,
        "Password": password,
        "Timestamp": time,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": 1,
        "PartyA": 254711907690,
        "PartyB": 174379,
        "PhoneNumber": 254711907690,
        "CallBackURL": "https://1194-119-13-66-108.ngrok.io",
        "AccountReference": "CompanyXLTD",
        "TransactionDesc": "Payment of X" 
    })
    },
    function(error, response, body){
        if(error){console.log(error)}
        res.status(200).json(body)
        console.log(time)
        console.log(password)
        console.log(body)
    }

    )
})


app.listen(8000, (err, live) => {
	if(err){
		console.error(err)
	}
	
	console.log("server is running on port 8000")
})

