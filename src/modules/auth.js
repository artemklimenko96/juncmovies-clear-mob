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
import { SERVER } from '../config/server';
import Hash from 'sha256';



export const Auth = function(state, props){
  //console.log('loging attempting to log in');
  //console.log(props);
  const { navigate } = props.navigation;
  //navigate('Main')
  fetch(SERVER + '/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: state.username,
        password: state.password
      })
  })
  .then((response) => response.json())
  .then((res) => {
    //console.log(res);
    // res = JSON.parse(res); 
    // if (res.status.status === 'success') {
    //   let data = {
    //     username: state.username,
    //     password: state.password
    //   };
    //   data = JSON.stringify(data); 
    //   AsyncStorage.setItem('user', data);
      let respn = JSON.parse(res.data.data); 
      props.userLogin(respn);
      navigate('Main')
    //}
   })
  .done()
};
