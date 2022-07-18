var express = require('express');
var router = express.Router();
const axios = require('axios').default;
const dotnetFQDN = process.env.DOTNET_FQDN;

/* GET users listing. */
router.get('/', async  function(req, res, next) {

  if(dotnetFQDN != null)  {
    // Even though we use the FQDN, because both containers are in the 
    // same environment, traffic will not leave the environment.
    var t = process.hrtime();
    var data = await axios.get(`http://${dotnetFQDN}`);
    t = process.hrtime(t);
    res.send(`${JSON.stringify(data.data) + JSON.stringify(t)}`);
  }
  else {
    res.send('No DOTNET_FQDN env variable defined. Be sure to set an env variable for the dotnetApp FQDN')
  }

});

module.exports = router;
