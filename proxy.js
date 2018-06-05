// This script create a server that loads urls
// and extracts data/dom
// and rewrites it as fetchable content
//  
// Written by J. Truffier (201805)
// modified by A. Nahon (201806)
//////////////////////////////////////////////////////////////////

const PORT = 3333

const http = require('http');
const nodeUrl = require('url');
const querystring = require('querystring');

http.createServer(function (req, res) {
  const reqUrl = nodeUrl.parse(req.url)
  const query = querystring.parse(reqUrl.query)
  console.log(query.idcampagne)

  let remoteUrl = "";

  if (query.buoy == "saintjean") {
    // url to fetch 'http://localhost:3333/?buoy=saintjean'
    console.log('setting url for wave buoy')
    remoteUrl = 'http://candhis.cetmef.developpement-durable.gouv.fr/campagne/inc-tempsreel.php?idcampagne=6c8349cc7260ae62e3b1396831a8398f';

  } else if (query.gauge == "lacanau") {
    // url to fetch 'http://localhost:3333/?gauge=lacanau'
    console.log('setting url for tides')
    remoteUrl = 'http://maree.info/134';

  }

  const remoteReq = http.request(remoteUrl, function (remoteRes) {
    res.writeHead(remoteRes.statusCode, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    });

    const remoteDataBuffer = []

    remoteRes.on('data', function (data) {
      remoteDataBuffer.push(data)
    })

    remoteRes.on('end', function () {
      let result
      // check if url concerns wave buoy or tide gauge and calls appropriate function
      if (query.buoy) {
        result = loadWaveData(remoteDataBuffer.join(''))
      } else if (query.gauge) {
        result = parseTideDom(remoteDataBuffer.join(''))
      }

      res.write(JSON.stringify(result))

      res.end()
    })

  }).on('error', function (err) {
    res.statusCode = 500;
    res.end();
  });

  req.pipe(remoteReq);

}).listen(PORT, () => {
  console.log(`Proxy launched on port: ${PORT}`)
});

function parseTideDom(data) {
  // function to parse maree.info's dom
  // should extract and return table content
  // const document = new JSDOM(data).window.document
  console.log(data)


  return [
    { hours: 10, val: 25 }
  ]
}

function loadWaveData(data) {
  console.log(data)


  return [
    { hours: 10, val: 25 }
  ]
}