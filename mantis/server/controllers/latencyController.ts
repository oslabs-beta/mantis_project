import axios from 'axios';
import { Endpoint } from '../models/endpointModel';

export async function updateLatencyMetrics() {
  try {
    // 1) Query Prometheus for the latest p50, p90, p99
    // Below is just a placeholder example of a PromQL query
    // that fetches your latencies for a given endpoint label.
    const prometheusUrl = 'http://prometheus:9090/api/v1/query';
    const endpointName = 'get-mocking1'; // or dynamically discovered
    const query = `histogram_quantile(0.5, sum(rate(http_request_duration_seconds_bucket{endpoint="${endpointName}"}[1m])) by (le))`;

    // 2) Make the request to Prometheus
    const { data } = await axios.get(prometheusUrl, {
      params: { query },
    });

    // 3) Extract p50/p90/p99 from the Prometheus response
    // This structure depends on how the metrics are labeled
    const p50 = /* parse from data.result */;
    const p90 = /* parse from data.result */;
    const p99 = /* parse from data.result */;

    // If you can’t extract anything meaningful, stop here:
    if (!p50 || !p90 || !p99) {
      console.log('No valid latency data returned, skipping DB update...');
      return;
    }

    // 4) Upsert into Mongo
    // Typically we match by endpoint name + method
    await Endpoint.findOneAndUpdate(
      { name: endpointName, method: 'GET' },
      {
        $push: {
          // add a new latencyStats entry at the current time
          latencyStats: {
            timestamp: new Date(),
            p50,
            p90,
            p99
          }
        }
      },
      { upsert: true } // create if doesn't exist
    );
  } catch (err) {
    console.error('Error updating latency metrics:', err);
  }
}