// import express from 'express';
// // import mongoose from 'mongoose';
// import { updateLatencyMetrics } from './controllers/latencyController';
// // import { updateErrorMetrics } from './controllers/errorController';
// // import { updateTrafficMetrics } from './controllers/trafficController';

// // Updated MongoDB Atlas connection string and client options
// // const uri = "mongodb+srv://<user>:<password>@mantis.e8mxe.mongodb.net/?retryWrites=true&w=majority&appName=mantis";
// const clientOptions = { 
//   serverApi: { version: '1', strict: true, deprecationErrors: true } 
// };

// async function startServer() {
//   try {
//     // Connect to MongoDB Atlas using the provided connection string and options
//     // await mongoose.connect(uri, clientOptions);
//     // Ping the database to ensure a successful connection
//     // await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. Successfully connected to MongoDB Atlas!");

//     const app = express();

//     // If you're not exposing routes yet, that's fine—
//     // you can run scheduled tasks or watchers here:
//     setInterval(async () => {
//       await updateLatencyMetrics();
//       // await updateErrorMetrics();
//       // await updateTrafficMetrics();
//     }, 15_000); // e.g. run every 15 seconds

//     // Start listening if you want a REST server:
//     app.listen(3000, () => {
//       console.log('Server is running on port 3000');
//     });
//   } catch (err) {
//     console.error('Error starting server:', err);
//     process.exit(1);
//   }
// }

// startServer().catch(err => console.error(err));

import express from 'express';
import { InfluxDB, WriteApi, Point } from '@influxdata/influxdb-client';

const INFLUX_URL = 'http://influxdb:8086';
const INFLUX_TOKEN = 'supersecret';
const ORG = 'MainOrg';
const BUCKET = 'myBucket';

const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
const writeApi = influxDB.getWriteApi(ORG, BUCKET, 'ns');

const app = express();
app.use(express.json());

app.post('/track-metrics', async (req, res) => {
  try {
    const { endpoint, latency, status } = req.body;

    const point = new Point('api_performance')
      .tag('endpoint', endpoint)
      .floatField('latency_ms', latency)
      .intField('status_code', status);

    writeApi.writePoint(point);
    await writeApi.flush();

    res.status(200).send('Metric saved');
  } catch (error) {
    console.error('Error writing to InfluxDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
