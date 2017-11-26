import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, AsyncStorage, Keyboard, Easing, FlatList, ScrollView, Image, ImageBackground, InteractionManager, Dimensions, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native';


import SocketIOClient from 'socket.io-client';

import * as Animatable from 'react-native-animatable';

//Styles
import styles from './styles';

import { FetchVideoUrl } from '../../modules/fetchVideoUrl';

//Component
import DrawerComponent from '../../modules/drawer';

//Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/userAction'

//UI
import { Title, TextInput, Tile, Button, Text, Caption, View as ViewShoutem, NavigationBar, Divider, Subtitle, Spinner, } from '@shoutem/ui';
import Video from 'react-native-video';

import Icon from 'react-native-vector-icons/FontAwesome';
import { SERVER } from '../../config/server';

import Spinnerr from 'react-native-spinkit';



function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    video: state.userReducer.video,
    selectedVideo: state.userReducer.selectedVideo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}


class Movie extends Component {
  static navigationOptions = { title: 'Movie', header: null };

  constructor(props) {
    super(props);
    this.state = {
      interactionsComplete: false,
      msg: [
        
      ],
      hidden: false,
      message: ''
    }
    this.socket = SocketIOClient(SERVER);
  }
  componentWillUnmount() {

  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
          this.setState({interactionsComplete: true});
    });
    this.socket.emit('room', this.props.selectedVideo.programId);
    this.socket.on('message', (data) => {
      let msgs = this.state.msg;
      msgs.push({
        id: msgs.length,
        text: data
      });
      if(msgs.length > 10) {
        msgs.shift();
      }
      this.setState({
        msg: msgs,
      });
    });
    
    //this.player.presentFullscreenPlayer()
  }
  sendMsg = () => {
    if(this.state.message !== '') { 
      //console.log(this.state.message);
      // let msgs = this.state.msg;
      // msgs.push({
      //   id: msgs.length,
      //   text: this.state.message
      // });
      // this.setState({
      //   msg: msgs,
      //   message: ''
      // });
      this.setState({
        message: ''
      });
      this.socket.emit('message', this.state.message);
    }
  }

  render() {
    
    //console.log(this.props);
      return (
         
       <View style={styles.container}>
            <StatusBar
              backgroundColor="#4fc1e9"
              barStyle="light-content"
              hidden={true}
            />
          <Image blurRadius={2} source={{uri: this.props.selectedVideo.images.poster.widescreen.xLarge}} style={styles.backgroundImage2} />
          <View  style={[styles.backgroundImage2, {
            justifyContent: 'center',
            alignItems: 'center'
          }]}>
            <Spinnerr style={styles.spinner} isVisible={true} size={50} type={'Bounce'} color={'#fff'}/> 
            <Text style={{color: '#fff'}}>Loading...</Text> 
          </View>
          {this.props.video != '' && 
              <Video
                ref={(ref) => {
                  this.player = ref
                }}  
                resizeMode='cover'
                source={{uri: this.props.video, type: 'm3u8', cache: true }}
                style={styles.backgroundVideo}
                //onLoadStart={()=>console.log('Loadin started!')}    
                //onError={(e)=> console.log(e)}
                hls={true}
              />
              }
           
                
           
          <ScrollView
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={200}
            stickyHeaderIndices={[1]}
            keyboardShouldPersistTaps={'always'}
          >
            <View>
            <TouchableOpacity onPress={() => this.setState({hidden: !this.state.hidden})} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, position: 'absolute', top: 0, left: 0}}> 
              <View></View>
            </TouchableOpacity>
              {this.state.interactionsComplete ?
                <View style={{width: Dimensions.get('window').width, padding: 10, paddingBottom: 70, height: Dimensions.get('window').height, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                     {!this.state.hidden && this.state.msg.length > 0 && this.state.msg.map((item, index) => (
                        <Animatable.View style={{backgroundColor: 'rgba(79,193,233,' + 0.05*index + ')', padding: 10, borderRadius: 15, marginBottom: 5}}>
                          <Text style={{ color: 'rgba(255,255,225,' + 0.1*index + ')',}}>{item.text}</Text> 
                        </Animatable.View>
                     ))}
                    <View style={{position: 'absolute', flexDirection: 'row', bottom: 10, left:10, width: Dimensions.get('window').width}}>
                      <View style={{backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 50, width: Dimensions.get('window').width*0.8, justifyContent: 'center', alignItems: 'center',}}>
                      <TextInput
                        style={{alignItems: 'flex-start', color: '#fff', justifyContent: 'flex-start', backgroundColor: 'rgba(255,255,255,0)',  width: Dimensions.get('window').width*0.7}}
                        onChangeText={(text) => this.setState({message: text})}
                        value={this.state.message}
                        />
                      </View>
                      <TouchableOpacity onPress={this.sendMsg} style={{padding: 10, marginTop: 5, backgroundColor: 'transparent'}}><Icon name="paper-plane" style={{fontSize: 30, color: '#fff'}} /></TouchableOpacity>
                    </View>
                </View>
            : 
                <View style={styles.spinnerContainer}>
                  <Spinner />
                </View>}
            </View>    

          </ScrollView>
        </View>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);