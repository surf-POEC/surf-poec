const PORT = 3334

const https = require('https');
const http = require('http');
const nodeUrl = require('url');
const querystring = require('querystring');

const fetch = require('node-fetch');

const fs = require('fs');

// http.createServer(function (req, res) {
// const reqUrl = nodeUrl.parse(req.url)
// const query = querystring.parse(reqUrl.query)
// console.log(query.fnmoc)

// let remoteUrl = "";

const options = {
  cert: fs.readFileSync('./fnmocnavy.crt'),
  // requestCert: false,
  // rejectUnauthorized: false,
};

// if (query.fnmoc == "atne") {
// url to fetch 'http://localhost:3334/?fnmoc=atne'
console.log('setting url for fnmoc')
remoteUrl = 'https://www.fnmoc.navy.mil/wxmap_cgi/cgi-bin/wxmap_DOD_area.cgi?area=fnmoc_atlantic&set=All';
options.hostname = 'www.fnmoc.navy.mil';
options.port = 443;
options.path = '/wxmap_cgi/cgi-bin/wxmap_DOD_area.cgi?area=fnmoc_atlantic&set=All';
// options.method = 'GET';
// }

const agent = new https.Agent({
  rejectUnauthorized: false
})

let date = [];
const setDAte = async (date) => {

  const resp = await fetch(remoteUrl, { agent })
  const val = await resp.text()
  // console.log('val: ', val)
  const tmp = await val.split('dtg=')
  console.log('tmp ', tmp[1])
  date = await tmp[1].split('&')
  console.log('date : ', date[0])
  return date
}

let toto = setDAte(date);
console.log('date0 : ', toto)
//.then((error) => { console.log('error', error) })

// const remoteReq = https.request(options, function (remoteRes) {

//   console.log(query.fnmoc)
//   res.writeHead(remoteRes.statusCode, {
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'application/json'
//   });

//   const remoteDataBuffer = []

//   remoteRes.on('data', function (data) {

//     remoteDataBuffer.push(data)
//   })

//   remoteRes.on('end', function () {
//     const result = readFnmocDate(remoteDataBuffer.join(''))

//     res.write(JSON.stringify(result))

//     res.end()
//   })

// }).on('error', function (err) {
//   res.statusCode = 500;
//   res.end();
// });

// req.pipe(date) ;

// })

// // .listen(PORT, () => {
//   console.log(`Proxy launched on port: ${PORT}`)
// });

function readFnmocDate(data) {
  // function to parse fnmoc's dom
  // should extract and return date
  console.log('data :', data)


  return [
    { date: data }
  ]
}