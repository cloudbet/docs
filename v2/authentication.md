The Cloudbet Odds API v2 uses Access JSON Web Tokens or [JWTs](https://jwt.io/) to allow secure access to the API. The Access JWT is a short-lived token, which must be generated programatically from a long-lived Refresh JWT.

## Notes

- You can generate the Refresh JWT from our Partner Website.
- The generated Access JWT is a token with a short-lived TTL, usually **1 day**.
- The Access JWT will be used for all `GET` endpoints in the Cloudbet Odds API v2.

## Generate an Access JWT

#### Sample API Request

> POST https://sports-api.cloudbet.com/pub/v2/players/access-token

#### Sample API Headers

- Authorization : Bearer `<REFRESH_JWT>` # please generate it through our Partner website
- Accept : `application/json`

#### Sample API Response

```json
{
  "token": "<ACCESS_JWT>",
  "expireAt": "<EXPIRE_AT_TIME>" // "2006-01-02T15:04:05Z07:00" (RFC3339)
}
```

#### Sample Requests in different formats

##### Example with `curl`

```bash
$ curl -H "Authorization: Bearer REFRESH_JWT" -H "Accept: application/json" -X POST https://sports-api.cloudbet.com/pub/v2/players/access-token
```

##### Example in `golang`

```go
package main
import (
	"fmt"
	"github.com/parnurzeal/gorequest"
)
func main() {
	refreshToken := "<REFRESH_JWT>"
	res, body, err := gorequest.New().
		Post("https://sports-api.cloudbet.com/pub/v2/players/access-token").
		Set("Authorization", fmt.Sprintf("Bearer %v", refreshToken)).
		Set("Accept", "application/json").
		SetDebug(true).
		End()
	fmt.Println(res, body, err)
}
```

##### Example in `python`

```py
import requests
import json

def get_access_token(refresh_token):
    response = requests.post(
        "https://sports-api.cloudbet.com/pub/v2/players/access-token",
        headers={"Authorization": "Bearer %s" % refresh_token},
    )
    access_token = response.json().get("token")
    return access_token

refresh_token = "<REFRESH_JWT>"
access_token = get_access_token(refresh_token)
print(access_token)
```

##### Example in `javascript`

```js
"use strict";
const fetch = require("node-fetch");

async function getAccessToken(refreshToken) {
  let request = await fetch(
    `https://sports-api.cloudbet.com/pub/v2/players/access-token`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${refreshToken}` }
    }
  );
  let response = await request;
  if (response.status === 200) {
    let responseObj = await request.json();
    return responseObj.token;
  } else {
    console.error(response);
    console.error("Something went wrong! Exiting..");
    process.exit(1);
  }
}

(async () => {
  let refreshToken = "<REFRESH_JWT>";
  let accessToken = await getAccessToken(refreshToken);
  console.log(accessToken);
})();
```

Our API expects the Access JWT to be included in all API requests to the server in an HTTP header that looks like the following:

`Authorization: Bearer <ACCESS_JWT>`

You must replace `ACCESS_JWT` with your own Access JWT. Example with sample Access JWT:

```
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IiIs.eyJleHAiOjE1NzM4MDIzODgsImlhdCI6.s_TMPgoHdSDTtrYuzM34zNFDOtTWI4V2SNyohbPr9yi6
```
