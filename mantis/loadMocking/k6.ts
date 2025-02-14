// import http from "k6/http";
// import { sleep } from "k6";

// export let options = {
//   vus: 3,
//   duration: "30s",
// };

// export default function () {
//   http.get("http://express-api:3001/rps");
//   sleep(1);
// }

import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 3,  // Number of virtual users (simulating different users)
  duration: "30s",
};

const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
];

export default function () {
  let user = users[__VU % users.length]; // Assign users based on VU index

  let loginRes = http.post("http://express-api:3001/login", JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });

  check(loginRes, {
    "login successful": (res) => res.status === 200,
  });

  let token = loginRes.json("token"); // Extract token from response

  if (token) {
    let rpsRes = http.get("http://express-api:3001/rps", {
      headers: { Authorization: `Bearer ${token}` },
    });

    check(rpsRes, {
      "rps request successful": (res) => res.status === 200,
    });
  }

  sleep(1);
}
