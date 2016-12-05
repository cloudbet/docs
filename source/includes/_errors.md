# Errors

The Sports API uses the following error codes:

Error Code | Meaning
---------- | -------
400 | Bad Request -- Your request is malformed
401 | Unauthorized -- Your API key is wrong
404 | Not Found -- The specified object was not found
405 | Method Not Allowed -- You tried to access an object with an invalid method
406 | Not Acceptable -- You requested a format that isn't json or protobuf
429 | Too Many Requests -- You're exceeding your the request rate limit! Slow down!
500 | Internal Server Error -- We had a problem with our server. Try again later.
503 | Service Unavailable -- We're temporarially offline for maintanance. Please try again later.
