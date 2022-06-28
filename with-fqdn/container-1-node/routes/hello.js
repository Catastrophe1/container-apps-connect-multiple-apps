var express = require('express');
var router = express.Router();
const axios = require('axios').default;
const dotnetFQDN = 'dotnet-app-dapr.internal.salmoncliff-6322efe2.eastus.azurecontainerapps.io';

/* GET users listing. */
router.get('/', async  function(req, res, next) {

  if(dotnetFQDN != null)  {
    // Even though we use the FQDN, because both containers are in the 
    // same environment, traffic will not leave the environment.
    var data = await axios.get(`http://${dotnetFQDN}`);
    res.send(`${JSON.stringify(data.data)}`);
  }
  else {
    res.send('No DOTNET_FQDN env variable defined. Be sure to set an env variable for the dotnetApp FQDN')
  }

});

module.exports = router;
