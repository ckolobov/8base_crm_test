# 8base Test
## Server Setup

* Sign up 8base account;
* Install 8base CLI `npm install -g 8base`;
* Login using CLI `8base login`;
* Go to the server directory `cd server`;
* Select workspace `8base configure`;
* Install dependencies `npm install`;
* Deploy custom functions `8base deploy`;
* Import schema via `8base import -f=TEST_APP.JSON --data=false`. This will take aroud 2 minutes;

## Client Setup

* Go to the client directory `cd client`;
* Install dependencies `npm install`;
* Get 8base API endpoint for your account;
* Start app via `cross-env REACT_APP_8BASE_API_ENDPOINT=%YOUR_ENDPOINT% npm start`;
* Login to the app with your 8base credentials;
