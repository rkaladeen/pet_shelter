const express = require('express'),
         port = 8000,
      DB_NAME = "pets",
           bp = require('body-parser'),
          app = express();

app.use(bp.json());
app.use(express.static(__dirname + "/client/dist/client"));

require('./server/utils/dbcon')(DB_NAME);
require('./server/utils/routes')(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});