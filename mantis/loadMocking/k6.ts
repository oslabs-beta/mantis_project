import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 3,
  duration: "30s",
};

export default function () {
  http.get("http://express-api:3001/p90");
  sleep(1);
}
