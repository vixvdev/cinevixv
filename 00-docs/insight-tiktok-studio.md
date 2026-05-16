Integrating TikTok login and using the TikTok API in React and Node.js app using OAuth 2.0.
Mayur Tanwani
Mayur Tanwani

Follow
10 min read
·
Jun 26, 2023
77


3



Oauth 2.0 is wildly used feature in the web world, but it might be a bit tricky at first. Most of the popular social media apps/websites and even many popular payment gateways use Oauth 2.0 for accessing their APIs. So in this tutorial, I’ll show you how to get started with Oauth 2.0 by using it in our react node app. Even though, this article particularly focuses on integrating tiktok in react/node app, but this still tutorial might still be bit useful to you if you are trying to implement Oauth 2.0 for some different App and using some different coding language for it.

First things first, before even getting to the coding part, you would need to register your app to tiktok’s developer portal. Until your app does get approved, you will keep on getting redirect url issue. Tiktok sends an authorization code to our redirect url which we need later to get access token, so to get authorization token, you’ll need an approved tiktok app.

Here’s how you can register your app and submit it for approval.

Step 1) Go to tiktok’s developer portal https://developers.tiktok.com/ and create an account.

Step 2) Go to manage apps, and click on connect and app. Here we will register out app. You can see the client key and client secret that tiktok provides us. Copy paste it and keep it somewhere safe.

Step 3) In configuration add profile picture of an app. Also add app name, app category and app description. Make sure to give a legitimate app name. An app name like “App084741” would be rejected.

Step 4) Select the platform that you are building this app for. If you want to build an web app then turn on “configure for web” option. You can turn on multiple options too. For this tutorial, we will only select configure for web app option. After turning on configure for web, tiktok will ask you for a legitimate website url. If you have a website then enter it’s link in the input field.

Step 5) Now on the left side panel, you will see a product section. Click on “+Add products there” and add Login Kit and Tiktok API to our app. Login kit would let us authorize the user who’s logging in from our app and we can use Tiktok API to access their posts, profile information and details.

Step 6) Once you add Login Kit to our app, Tiktok would ask us for Terms of Service URL , Privacy Policy URL and a Redirect URI. All of these need to be legitimate URLs which are starting with “https”.

Step 7) Once you have entered all of these things, Submit your app for review. Status of your app would now change from “staging” to “under review”

Tiktok might take 1–3 days to approve or reject you app. If your app is approved, the status of your app would change to Live in Production.

Press enter or click to view image in full size

Here’s what our approved app look like.
Here’s an overview of what the whole Oauth 2.0 in tiktok is like,

We will create a sign in url in backend, send that url to frontend and then redirect the user to tiktok login using that url.
In response when the user successfully logs in to tiktok through our link, he will be redirected to the redirect url along with an authorization code.
We will obtain that code in frontend of our app, send it to backend. In backend we would decode that code, and we would hit an tiktok api along with the code that we just received and other parameters.
In the response of that api we will get an access token. Now we can use that access token to hit other apis and get user’s data and posts information.
Let’s being the coding part now,

Step 1) Create a folder. Name it whatever you want, I am naming it tiktok

step 2) In that folder create two new folders, frontend and backend

step 3) cd to the frontend folder and create a react app there using this command, “npx create-react-app .”

This will create a react app. The “.” in the code creates the app in our current directory which is frontend.

step 4) Now we will need some packages in our front-end, which are axios and react-router-dom so install that using this command

“npm install axios react-router-dom”

step 5) We will need to create two components in our app. One component from which we would click on the “tiktok” button and other component is where we would get redirected after the authentication from tiktok is done. We would get our authorization code in that component.

The final folder structure of our frontend would look like,


Step 6) Now it’s time to configure our backend. Remember in step 2 we created a backend folder too. Go to the backend directory and run the following command,

“npm init -y”

Step 7) After running this command there would be a package.json in our backend folder. Create an index.js file there.

step 8) We would need some dependencies in our backend, so install them using this command,

“npm install express cors querystring axios express-session cookie-parser nodemon”

Get Mayur Tanwani’s stories in your inbox
Join Medium for free to get updates from this writer.

Enter your email
Subscribe

Remember me for faster sign in

So now we have the folder structure of both backend and frontend set up.

step 9) Set up backend by adding following code to it

const express = require("express");
const querystring = require("querystring");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser());


app.listen(4000, ()=>{console.log("server is running on port 4000"}
We can now start the app using the command “nodemon index.js”

We are using nodemon to start our app as it saves us from restarting our backend again and again and it restarts server on it own if we commit any changes to the app.

Step 10) Coming to frontend, we will now need to setup the routes of our app, for that add the following code to App.js in the src folder of our frontend directory.

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Redirect from "./components/Redirect";
function App() {
   return (
      <div className="App">
       <BrowserRouter>
         <Routes>
           <Route>
             <Route exact path="/" element={<Home />}></Route>
             <Route exact path="/redirect" element={<Redirect />}></Route>
           </Routes>
       </BrowserRouter>
      </div>
  );
}

export default App;
Step 11) Now open another terminal and run the react code using “npm start” command.

We have now our routes set up. Now we need to make following changes in Home.js component of out react app.

import React from "react";
import axios from "axios";

const Home = () => {
  const request_token = async () => {
    const response = await axios.get("http://localhost:4000/oauth");
    window.location.href = `${response.data.url}`;
  };
return (
    <div>
      <div>
        <button onClick={request_token}>Tik tok</button>
      </div>
    </div>
  );
};
export default Home;
In this code, When a user clicks on “Tiktok” button, we are hitting an backend api which we created. What that backend api is supposed to do is create a tiktok login url for us. When that api creates a login url for us, we get that url as response.data.url and we are then redirecting the user to tiktok login using our url.

The code snippet for backend code which creates a url for us looks like,

app.get("/oauth", (req, res) => {
  const csrfState = Math.random().toString(36).substring(2);
  res.cookie("csrfState", csrfState, { maxAge: 60000 });
    let url = "https://www.tiktok.com/v2/auth/authorize/";
    // the following params need to be in `application/x-www-form-urlencoded` format.
    url += "?client_key=<your client key>";
    url += "&scope=user.info.basic,user.info.profile,user.info.stats,video.list";
    url += "&response_type=code";
    url +=
    "&redirect_uri=<your redirect uri>";
    url += "&state=" + csrfState;
  res.json({ url: url });
});
In this code, we are creating url by giving the required parameters to it. Parameters required in this url are client key, make sure to enter your client key in place of “<your client key>” in this code. We will also add the scope in this url, scopes specify the things that user is giving us access to. so if we need user’s basic info and video list and other things, we would need to add it to the scopes. Response_type would always be “code” as we want the authorization code in response. State could be anything you want. Here we are creating a csrfstate with some code, but if we give state=state, then that would have worked too.

We are creating a url in this code and sending it to frontend. When user clicks on the “tiktok” button in front end, he will get redirected to tiktok’s login page.

Press enter or click to view image in full size

This prompt would open up when user click on “tiktok” button
When a user signs in, they would be shown a prompt of this kind.

Press enter or click to view image in full size

Once a user authorizes, the user would then be redirected to our redirect page along with a code like this,

Press enter or click to view image in full size

Step 12) We would now need to get that code from the url. User is redirected to the “/redirect” route of our app. The component which is rendering that redirect route is Redirect.js, so we need to get code in that component. Use the following code to obtain the authorization code from URL and then use that code to hit the tiktok api to get access token in the backend, In this code we are using useeffect. as soon as the user redirects to this route and this component gets rendered, useeffect will run, it will obtain code from the url and then it will send that code to backend using axios.post method.

import React from "react";
import { useEffect } from "react";
import axios from "axios";

const Redirect= () => {
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');
    axios.post("http://localhost:4000/tiktokaccesstoken", {
    code: code,
    });
  }, []);
  
  return <div>Redirect page</div>;
};

export default Redirect;
This is what code for our /tiktokaccesstoken looks like

app.post("/tiktokaccesstoken", async (req, res) => {
  try {
    const { code } = req.body;
    const decode = decodeURI(code);
    const tokenEndpoint = "https://open.tiktokapis.com/v2/oauth/token/";
    const params = {
    client_key: "< Your client key>",
    client_secret: "<Your client secret>",
    code: decode,
    grant_type: "authorization_code",
    redirect_uri:
    "<your redirect uri>",
  };
  const response = await axios.post(
  tokenEndpoint,
  querystring.stringify(params),
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
  }
  );
  console.log("response>>>>>>>", response.data);
  res.send(response.data);
  } catch (error) {
  console.error("Error during callback:", error.message);
  res.status(500).send("An error occurred during the login process.");
  }
});
In this code, we are getting the authorization code that we received in redirect url, we are sending that code to backend. In backend we are getting that code in req.body.code. We are using destructuring to get the code from req.body. We are then decoding that code. Then we are using that decoded code along with other params like client key and client secret and redirect uri to send a request to tiktok’s get token (https://open.tiktokapis.com/v2/oauth/token/) endpoint.

If everything goes well, we will see an response like this when we console response.data like I am doing in this code.

response>>>>>>> {
  access_token: 'act.cb8a485fe6a6adafa64hyfdfa2UWMyRQfBFMn6fWUR9kAVlYlFaG3Z!5678',
  expires_in: 86400,
  open_id: '_000LTI54yhdfjhgwEREWT-kNsKQ_qC8I1bn4WkJ',
  refresh_expires_in: 31536000,
  refresh_token: 'rft.5b5e0fb3dfg45tgw4e8f93ef5PSc0orGyoamRzwyjMCi4qfgVE0Vd!5734',
  scope: 'user.info.basic,video.list,user.info.profile,user.info.stats',
  token_type: 'Bearer'
}
Step 13) Now instead of making an another api route in our backend code, I am just checking if response.data.access_token exists after running the API that we ran above. And if response.data.access_token exists, then we will use that access token to get the videos of user by hitting another tiktok api’s endpoint(https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,duration,cover_image_url,embed_link). So here the edited /tiktokaccesstoken code,

app.post("/tiktokaccesstoken", async (req, res) => {
try {
  const { code } = req.body;
  const decode = decodeURI(code);
  const tokenEndpoint = "https://open.tiktokapis.com/v2/oauth/token/";
  const params = {
  client_key: "<your client id>",
  client_secret: "<your client secret>",
  code: decode,
  grant_type: "authorization_code",
  redirect_uri:
  "<your redirect uri>",
  };

  const response = await axios.post(
    tokenEndpoint,
    querystring.stringify(params),
    {
      headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
      },
    }
  );
  if (response.data.access_token) {
    const allvideosdata = await axios.post(
      "https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,duration,cover_image_url,embed_link",
      {
        max_count: 20,
      },
      {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
        "Content-Type": "application/json",
        },
      }
    );
    
    console.log(allvideosdata.data.data.videos);//Lists all videos of user along with other details
    res.send(allvideosdata.data.data.videos)
    }
} catch (error) {
    console.error("Error during callback:", error.message);
    res.status(500).send("An error occurred during the login process.");
}
});
When this code finally runs, we can get all videos of the user in allvideosdata.data.data.videos. We can now use those videos in our front end as we wish.

Here’s what our final backend code looks like —

const express = require("express");
const querystring = require("querystring");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/oauth", (req, res) => {
  const csrfState = Math.random().toString(36).substring(2);
  res.cookie("csrfState", csrfState, { maxAge: 60000 });
    let url = "https://www.tiktok.com/v2/auth/authorize/";
    // the following params need to be in `application/x-www-form-urlencoded` format.
    url += "?client_key=<your client key>";
    url += "&scope=user.info.basic,user.info.profile,user.info.stats,video.list";
    url += "&response_type=code";
    url +=
    "&redirect_uri=<your redirect uri>";
    url += "&state=" + csrfState;
  res.json({ url: url });
});

app.post("/tiktokaccesstoken", async (req, res) => {
try {
  const { code } = req.body;
  const decode = decodeURI(code);
  const tokenEndpoint = "https://open.tiktokapis.com/v2/oauth/token/";
  const params = {
  client_key: "<your client id>",
  client_secret: "<your client secret>",
  code: decode,
  grant_type: "authorization_code",
  redirect_uri:
  "<your redirect uri>",
  };

  const response = await axios.post(
    tokenEndpoint,
    querystring.stringify(params),
    {
      headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
      },
    }
  );
  if (response.data.access_token) {
    const allvideosdata = await axios.post(
      "https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,duration,cover_image_url,embed_link",
      {
        max_count: 20,
      },
      {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
        "Content-Type": "application/json",
        },
      }
    );
    
    console.log(allvideosdata.data.data.videos);//Lists all videos of user along with other details
    res.send(allvideosdata.data.data.videos)
    }
} catch (error) {
    console.error("Error during callback:", error.message);
    res.status(500).send("An error occurred during the login process.");
}
});

app.listen(4000, ()=>{console.log("server is running on port 4000"}
I hope this tutorial is of some help to you. If you have any questions, just comment here or message me.

Tiktokapi
Nodejs
React
Integration
Ti̇ktok
77


3


Mayur Tanwani
Written by Mayur Tanwani
6 followers
·
1 following

Follow
Responses (3)
Unknown user
Write a response

What are your thoughts?

Cancel
Respond
ALex Antonica
ALex Antonica

May 29, 2025


github link pls 🙏
Reply

kuuhaku
kuuhaku

Aug 10, 2024


Step 6) Once you add Login Kit to our app, Tiktok would ask us for Terms of Service URL , Privacy Policy URL and a Redirect URI. All of these need to be legitimate URLs which are starting with “https”.