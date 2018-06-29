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

  let remoteUrl = "";

  if (query.buoy == "saintjean") {
    // url to fetch 'http://localhost:3333/?buoy=saintjean'
    console.log('setting url for wave buoy :', query.buoy)
    remoteUrl = 'http://candhis.cetmef.developpement-durable.gouv.fr/campagne/inc-tempsreel.php?idcampagne=6c8349cc7260ae62e3b1396831a8398f';
  } else if (query.buoy == "capferret") {
    // url to fetch 'http://localhost:3333/?buoy=capferret'
    console.log('setting url for wave buoy :', query.buoy)
    // remoteUrl = 'http://candhis.cetmef.developpement-durable.gouv.fr/campagne/inc-tempsreel.php?idcampagne=b6d767d2f8ed5d21a44b0e5886680cb9';
    remoteUrl = 'http://candhis.cetmef.developpement-durable.gouv.fr/campagne/inc-tempsreel.php?idcampagne=b6d767d2f8ed5d21a44b0e5886680cb9';
  } else if (query.gauge == "lacanau") {
    // url to fetch 'http://localhost:3333/?gauge=lacanau'
    console.log('setting url for tides at :', query.gauge)
    remoteUrl = 'http://maree.info/134';

  }

  let remoteReq;

  if (query.buoy || query.gauge) {

    remoteReq = http.request(remoteUrl, function (remoteRes) {
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

  } else if (query.fnmoc == 'atn') {

    console.log('setting url for fnmoc')
    remoteUrl = 'https://www.fnmoc.navy.mil/wxmap_cgi/cgi-bin/wxmap_DOD_area.cgi?area=fnmoc_atlantic&set=All';

    const https = require('https');
    https.globalAgent.options.rejectUnauthorized = false
    
    remoteReq = https.request(remoteUrl, function (remoteRes) {
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
        result = fnmocLastRun(remoteDataBuffer.join(''))

        res.write(JSON.stringify(result))

        res.end()
      })

    }).on('error', function (err) {
      res.statusCode = 500;
      res.end();
    });

  }

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

function loadWaveData(remoteData) {

  // function that parses the table containing candhis wave data
  // console.log(remoteData)
  let date = [];
  let waves = {
    h13: [],
    hmax: [],
    t13: [],
    dirP: [],
    spread: [],
  }
  let waterTemp = [];

  let dates = remoteData.split('<td align="center" nowrap="NOWRAP">')
  for (let i = 1; i < dates.length; i++) {
    let params = dates[i].split('</td>\n\t\t\t<td align="center">')
    date.push(params[0]);
    waves.h13.push(params[1]);
    waves.hmax.push(params[2])
    waves.t13.push(params[3])
    waves.dirP.push(params[4])
    waves.spread.push(params[5])
    params = params[6].split('\r\n</td>\n\t\t</tr>\n\t')
    waterTemp.push(params[0])
  }

  return [
    // { hours: 10, val: 25 }
    { date, waves, waterTemp }
  ]

}

function fnmocLastRun(remoteData) {
  // function to parse fnmoc's dom
  // extract and return last forecast date

  let tmp = remoteData.split('dtg=')
  let date = tmp[1].split('&')
  date = date[0]
  return [
    { date }
  ]
}