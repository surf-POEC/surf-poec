fnmocLastRun = async () => {
  // function to parse fnmoc's dom
  // extract and return last forecast date
  
  const https = require('https');
  const fetch = require('node-fetch');
  console.log('setting url for fnmoc')
  remoteUrl = 'https://www.fnmoc.navy.mil/wxmap_cgi/cgi-bin/wxmap_DOD_area.cgi?area=fnmoc_atlantic&set=All';

  // const agent = new https.Agent({
  //   rejectUnauthorized: false
  // })
  // console.log('Agent :', agent)

  https.globalAgent.options.rejectUnauthorized = false
  console.log('globalAgent :', https.globalAgent)

  const resp = await fetch(remoteUrl)
  const val = await resp.text()
  const tmp = await val.split('dtg=')
  const date = await tmp[1].split('&')
  return date[0]
}

fnmocLastRun().then((date) => {
  console.log('date1 : ', date)
}).catch((err) => {
  console.error('Erreur: ', err)
})