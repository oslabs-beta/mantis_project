import axios from "axios";
import { Point } from "@influxdata/influxdb-client";
import { influxDB, writeApi } from "../server";

export async function updateLatencyMetrics() {
  try {
    // 1) Query Prometheus for the latest p50, p90, p99
    // Below is just a placeholder example of a PromQL query
    // that fetches your latencies for a given endpoint label.
    const prometheusUrl = 'http://prometheus:9090/api/v1/query';
    
    // const prometheusUrl = 'https://demo.promlabs.com'
    // const prometheusUrl = "https://demo.promlabs.com/prometheus/api/v1/query";
    const endpointName = "get-mocking1"; // or dynamically discovered
    const query = `histogram_quantile(0.5, sum(rate(http_request_duration_seconds_bucket{endpoint="${endpointName}"}[1m])) by (le))`;
    // const query = "up";

    // 2) Make the request to Prometheus
    const { data } = await axios.get(prometheusUrl, {
      params: { query },
    });

    // 3) Extract p50/p90/p99 from the Prometheus response
    // This structure depends on how the metrics are labeled
    // const p50 = /* parse from data.result */;
    // const p90 = /* parse from data.result */;
    // const p99 = /* parse from data.result */;

    if (data.status !== "success") {
      console.log("No valid data returned from the PromLabs demo.");
      return;
    }

    const results = data.data.result;

    if (!Array.isArray(results) || results.length === 0) {
      console.log("No valid data in result array.");
      return;
    }

    // Let's just pick the first metric and read its value
    const firstVal = results[0].value; // e.g. [1686152991.238, "1"]
    const numericVal = parseFloat(firstVal[1]); // convert "1" to number

    // If you can’t extract anything meaningful, stop here:
    // if (!p50 || !p90 || !p99) {
    //   console.log('No valid latency data returned, skipping DB update...');
    //   return;
    // }

    // 4) Upsert into InfluxDb
    const point = new Point("api_performance")
      .tag("endpoint", endpointName)
      .floatField("latency_ms", numericVal);

    writeApi.writePoint(point);
    await writeApi.flush();

    return numericVal;
    
  } catch (err) {
    console.error("Error updating latency metrics:", err);
  }
}
