/**
*
* Auth Modul for login authorizing user's credential with server
* If credential are OK dispatchin userLogin action
* SERVER is et in src/config/server
*
*/
import React from 'react';

import { AsyncStorage } from 'react-native';

//Config
import { SERVER_ELISA } from '../config/server';
import Hash from 'sha256';



export const FetchRecordings = function(props){
  //console.log('loging attempting to fetch recordings');
  //console.log(props);
  fetch(SERVER_ELISA + '/rest/npvr/recordings/all?v=2&platform={}&appVersion={}&includeMetadata=true', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.user.access_token,
      }
  })
  .then((response) => response.json())
  .then((res) => {
    //console.log(res);
    props.setUserRecordings(res.recordings);
   })
  .done()
};
