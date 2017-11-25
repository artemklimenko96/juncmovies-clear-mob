
import React from 'react';

import { AsyncStorage } from 'react-native';

//Config
import { SERVER_ELISA } from '../config/server';



export const FetchVideoUrl = function(id, props){
  console.log('loging attempting to fetch video url');
  console.log(props);
  fetch(SERVER_ELISA + '/rest/npvr/recordings/url/' + id + '?v=2&platform=ios&appVersion=1.0', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.user.access_token,
      }
  })
  .then((response) => response.json())
  .then((res) => {
    props.setVideoUrl(res.url);
   })
  .done()
};
