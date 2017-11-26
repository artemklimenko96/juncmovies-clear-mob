import React, { Component } from 'react';
import { View, StatusBar, Image, StyleSheet, AsyncStorage, Keyboard, Easing, Text as TextReact,  } from 'react-native';

//Styles
import styles from './styles';


//Modules
import { Auth } from '../../modules/auth';


//Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/userAction'

//UI
import { Title, TextInput, Button, TouchableOpacity, Text, Caption, View as ViewShoutem, Overlay} from '@shoutem/ui';
import Hash from 'sha256';


function mapStateToProps(state) {
  return {
    test: 'test'
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}


class Login extends Component {
  static navigationOptions = { title: 'Login', header: null };

  constructor(props) {
    super(props);
    this.state = {
      username: 'junction3',
      password: 'ihyty7bu'
    }
  }
  signup = () => {
    const { navigate } = this.props.navigation;
    navigate('Signup');
  }
  login = () => {
    const { navigate } = this.props.navigation;
    let data = {
      username: this.state.username,
      password: this.state.password
    };
    //console.log(data);
    Auth(data, this.props);
    //navigate('Main');
    Keyboard.dismiss();
  }
  render() {
      return (
       <View style={styles.container}>
          <StatusBar
            backgroundColor="#4fc1e9"
            barStyle="light-content"
            hidden={true}
          />
           <Image source={require('../../images/login_bg.jpeg')} style={styles.backgroundImage2} />
           
          <View style={styles.backgroundImage}>
              
              <View  style={{justifyContent: 'center', alignItems: 'center'}}>
                <TextReact style={{fontFamily: 'knewave', color: '#fff', fontSize: 50}}>JUNCMOVIES</TextReact>
                <View style={styles.inputContainer}>
                  <TextInput 
                    placeholder={'Username'}
                    value={this.state.username}
                    onChangeText={(text) => this.setState({username: text})}
                    underlineColorAndroid='rgba(255,255,255, 0.6)'
                    style={{color: '#4B4B4B', width: 300, marginBottom: 20}} 
                    placeholderTextColor='#ffffff'
                  />
                  <TextInput 
                    placeholder={'Password'}
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    underlineColorAndroid='rgba(255,255,255, 1)'
                    style={{color: '#4B4B4B', width: 300,}}
                    placeholderTextColor='#ffffff'
                    secureTextEntry
                  />
                </View>
                <View styleName="horizontal" style={{margin: 15, marginTop: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity style={{backgroundColor: '#0a77a0', borderRadius: 40, width: 300, padding: 20, justifyContent: 'center', alignItems: 'center'}} onPress={this.login}>
                    <Text style={{color: '#fff'}}>LOGIN</Text>
                  </TouchableOpacity>

                </View>
              </View>
          </View>
         
        </View>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);