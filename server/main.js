const App = require('./App.js');

const dotenv = require('dotenv');
const Connection = require('./Db/database.js');

dotenv.config();

dotenv.config({ path: './.env' });

const portNumber = process.env.PORT || 8000;

Connection()
  .then((res) => {
    App.listen(portNumber, () => {
      console.log(`  Server is running at port ${portNumber}`);
    });

    // App.on((err) => {
    //   console.log(`ERROR RUNNING ON SERVER : ${err.message}`);
    // });
  })
  .catch((err) => {
    console.log(`MongoDb Connection Error !! : ${err.message}`);
  });
