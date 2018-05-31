const http = require('http');
const nodeUrl = require('url');
const querystring = require('querystring');

http.createServer(function (req, res) {
  const reqUrl = nodeUrl.parse(req.url)
  const query = querystring.parse(reqUrl.query)
  console.log(query)
  const url = 'http://candhis.cetmef.developpement-durable.gouv.fr/campagne/inc-tempsreel.php?idcampagne=6c8349cc7260ae62e3b1396831a8398f';

  const newReq = http.request(url, function(newRes) {
    const headers = newRes.headers;

    headers['Access-Control-Allow-Origin'] = '*'

    res.writeHead(newRes.statusCode, headers);

    newRes.pipe(res);
  }).on('error', function(err) {
    res.statusCode = 500;
    res.end();
  });

  req.pipe(newReq);
}).listen(3333);