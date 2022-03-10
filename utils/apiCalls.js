import axios from "axios";
import qs from "qs";
import base64 from 'react-native-base64'
import { CLIENT_ID, CLIENT_SECRET } from "./constants";

// Code taken from Spotify documentation and https://gist.github.com/donstefani/70ef1069d4eab7f2339359526563aab2

export const getAccessToken = async (setterFn) => {
  const BASE64_ENCODED_AUTH_CODE = base64.encode(CLIENT_ID + ':' + CLIENT_SECRET);
  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${BASE64_ENCODED_AUTH_CODE}`
    }
  };
  const data = {
    grant_type: 'client_credentials',
  };

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    );
    console.log(response.data.access_token);
    setterFn(response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
};

export const getSuggestedSongs = (setterFn, query, token) => {
  const spaceSubbedQuery = query.replace(" ", "%20");
  console.log("spaceSubbedQuery: "+spaceSubbedQuery);
  axios(`https://api.spotify.com/v1/search?q=${spaceSubbedQuery}&type=track&limit=4`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      setterFn(response.data);
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};