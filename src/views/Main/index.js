import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Share, AsyncStorage, Animated, Keyboard, Easing, FlatList, ScrollView, Image, ImageBackground, InteractionManager, Dimensions, TouchableOpacity, } from 'react-native';

//Styles
import styles from './styles';

import * as Animatable from 'react-native-animatable';


//Modules

import { FetchRecordings } from '../../modules/fetchRecordings';

import TimePicker from 'react-native-simple-time-picker';

//Component
import DrawerComponent from '../../modules/drawer';

import { FetchVideoUrl } from '../../modules/fetchVideoUrl';

//Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/userAction'




//UI
import { Title, TextInput, Tile, Button, Text, Caption, View as ViewShoutem, NavigationBar, Divider, Subtitle, Spinner, } from '@shoutem/ui';
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/FontAwesome';


import Spinnerr from 'react-native-spinkit';


function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    recordings: state.userReducer.recordings,
    selectVideo: state.userReducer.selectVideo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}


class Login extends Component {
  static navigationOptions = { title: 'Main', header: null };

  constructor(props) {
    super(props);
    this.state = {
      interactionsComplete: false,
      mainImageLoaded: false,
      visibleModal: false,
      bgLoaded:false,
      slide: 1,
      selectedHours: 0,
      selectedMinutes: 0
    }
    this.tabLineOffsetX = new Animated.Value(Dimensions.get('window').width*0.045);
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
          this.setState({interactionsComplete: true});
    });
    FetchRecordings(this.props);
    
  }


  selectVideo = (i) => {
    this.props.setSelectedVideo(this.props.recordings.recorded[i]);
    FetchVideoUrl(this.props.recordings.recorded[i].programId, this.props);
    const { navigate } = this.props.navigation;
    navigate('Movie');
  }

  openMoview = () => {
    const { navigate } = this.props.navigation;
    navigate('Movie');
  }
  shareMovie = (i) => {
    //console.log(this.props.recordings);
    //console.log(i);
    Share.share({
      message: 'Wanna  wathc a movie? ' + this.props.recordings.recorded[i].name,
      url: 'www.juncmovies.com',
      title: 'Juncmovies'
    }, {
      tintColor: '#4fc1e9'
    })
  }
  onScroll = (e) => {
    //console.log(e.nativeEvent.contentOffset.x+' - - ' + Dimensions.get('window').width);
    if((e.nativeEvent.contentOffset.x > Dimensions.get('window').width*0.55) && (e.nativeEvent.contentOffset.x < Dimensions.get('window').width*1.55)) {
      Animated.spring(this.tabLineOffsetX, { toValue: Dimensions.get('window').width*0.37, }).start();
      this.setState({
        slide: 2
      });
    }
    if(e.nativeEvent.contentOffset.x > Dimensions.get('window').width*1.55) {
      Animated.spring(this.tabLineOffsetX, { toValue: Dimensions.get('window').width*0.7055, }).start();
      this.setState({
        slide: 3
      });
    }
    if(e.nativeEvent.contentOffset.x < Dimensions.get('window').width*0.55) {
      Animated.spring(this.tabLineOffsetX, { toValue: Dimensions.get('window').width*0.045, }).start();
      this.setState({
        slide: 1
      });
    }
  }
  render() {
     const drawerStyles = {
        drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, backgroundColor: '#fff'},
        main: {paddingLeft: 3},
      }
      //console.log(this.state);
      return (
         
       <View style={styles.container}>
            <StatusBar
              backgroundColor="#4fc1e9"
              barStyle="light-content"
              hidden={true}
            />
            {1>2 &&<NavigationBar
              leftComponent={<TouchableOpacity onPress={() => this._drawer.open()} style={{padding: 10}}><Icon name="bars" style={{color: '#e5b700'}} /></TouchableOpacity>}
              centerComponent={<Title>DUMMY</Title>}
            />}
        <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          
        >
          <View>
            {this.state.interactionsComplete ?
            <View  key={`view_main`}>
                
                <Image
                        style={{
                          width: Dimensions.get('window').width,
                          height: Dimensions.get('window').height * 0.6,
                        }}
                        onLoad={()=>this.setState({mainImageLoaded: true})}
                        source={require('../../images/movie1.jpeg')}
                />
                <Image
                        style={{
                          width: Dimensions.get('window').width,
                          height: Dimensions.get('window').height * 0.6,
                          position: 'absolute',
                          top: 0,
                          left: 0
                        }}
                        onLoad={()=>this.setState({bgLoaded: true})}
                        source={require('../../images/top_bg.png')}
                />
                <View style={{
                          position: 'absolute',
                          top:0,
                          left: 0,
                        }}>
                  <View style={{padding: 20}}>
                    <Text style={{fontSize: 40, color: '#fff', fontFamily: 'knewave'}}>HOT</Text>
                    <Text style={{fontSize: 40, color: '#fff', fontFamily: 'knewave'}}>RIGHT NOW</Text>
                    <Text style={{fontSize: 40, color: '#fff', fontFamily: 'Bevan', textDecorationLine: 'underline'}}>Fight Club</Text>
                  </View>
                  
                  <View styleName="horizontal" style={{marginTop: 50, justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width,}}>
                  <Animatable.View animation="pulse"  iterationCount="infinite"> 
                  <TouchableOpacity onPress={this.openMoview} style={{backgroundColor: '#0a77a0', borderRadius: 40, width: 200, padding: 15, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>JOIN</Text>
                  </TouchableOpacity>
                  </Animatable.View>

                </View>
                </View>
          </View>
           : 
           <View  style={[styles.backgroundImage2, {
            justifyContent: 'center',
            alignItems: 'center'
          }]}>
            <Spinnerr style={styles.spinner} isVisible={true} size={50} type={'Bounce'} color={'#fff'}/> 
            <Text style={{color: '#fff'}}>Loading...</Text> 
          </View>}
           </View>    
           <View>
           <View style={styles.tabContainer}>
                <View style={styles.tab1}>
                   <Text style={{color: '#fff', fontSize: 12}}>Discover</Text>
                </View>
                <View style={styles.tab1}>
                   <Text style={{color: '#fff', fontSize: 12}}>Watch now</Text>
                </View>
                <View style={styles.tab2}>
                    <Text style={{color: '#fff', fontSize: 12}}>Starting soon</Text>
                </View>
            </View>
          
            <View style={styles.tabLineContainer}>
                <Animated.View style={[styles.underline, {
                  left: this.tabLineOffsetX
                }]}>
                </Animated.View>
              </View>
              </View>
              <ScrollView 
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={1}
                onScroll={this.onScroll}
              >
                              <View style={styles.moviesContainer}>
                
                <View style={{flexDirection: 'row'}}>
                  {this.state.mainImageLoaded && this.state.bgLoaded && this.state.slide == 1 && this.props.recordings.recorded.length > 0 &&
                  <FlatList
                    data={this.props.recordings.recorded}
                    bounces={false}
                    renderItem={({item, index}) => 
                    <Animatable.View animation="bounceIn" delay={300+index*100}> 
                      <TouchableOpacity style={{margin: 10,  width: Dimensions.get('window').width * 0.4}} key={`moview_${index}`} onLongPress ={()=>{
                        this.shareMovie(index);
                     }}>
                        <Image
                          style={{
                            width: Dimensions.get('window').width * 0.4,
                            height: Dimensions.get('window').height * 0.35,
                            borderRadius: 10
                          }}
                          source={{uri: item.images.poster.widescreen.xLarge}}
                        />
                      </TouchableOpacity></Animatable.View>}
                    style={styles.planList}
                    horizontal={false}
                    numColumns={2}
                  />}
                </View>
                </View>
               <View style={styles.moviesContainer}>
                
                <View style={{flexDirection: 'row'}}>
                  {this.state.mainImageLoaded && this.state.bgLoaded && this.state.slide == 2 &&  this.props.recordings.recorded.length > 0 &&
                  <FlatList
                    data={this.props.recordings.recorded}
                    bounces={false}
                    renderItem={({item, index}) => 
                    <Animatable.View animation="bounceIn" delay={300+index*100}> 
                      <TouchableOpacity style={{margin: 10,  width: Dimensions.get('window').width * 0.4}} key={`moview_${index}`} onPress={() => this.selectVideo(index)}>
                        <Image
                          style={{
                            width: Dimensions.get('window').width * 0.4,
                            height: Dimensions.get('window').height * 0.35,
                            borderRadius: 10
                          }}
                          source={{uri: item.images.poster.widescreen.xLarge}}
                        />
                      </TouchableOpacity></Animatable.View>}
                    style={styles.planList}
                    horizontal={false}
                    numColumns={2}
                  />}
                </View>
                </View>
                <View style={styles.moviesContainer}>
                
                <View style={{flexDirection: 'row'}}>
                  {this.state.mainImageLoaded && this.state.bgLoaded && this.state.slide == 3 &&  this.props.recordings.recorded.length > 0 &&
                  <FlatList
                    data={this.props.recordings.recorded}
                    bounces={false}
                    renderItem={({item, index}) => 
                    <Animatable.View animation="bounceIn" delay={300+index*100}> 
                      <TouchableOpacity style={{margin: 10,  width: Dimensions.get('window').width * 0.4}} key={`moview_${index}`} onPress={() => this.selectVideo(index)}>
                        <Image
                          style={{
                            width: Dimensions.get('window').width * 0.4,
                            height: Dimensions.get('window').height * 0.35,
                            borderRadius: 10
                          }}
                          source={{uri: item.images.poster.widescreen.xLarge}}
                        />
                      </TouchableOpacity></Animatable.View>}
                    style={styles.planList}
                    horizontal={false}
                    numColumns={2}
                  />}
                </View>
                </View>
                </ScrollView>
          </ScrollView>
          <Modal
            isVisible={false}
            backdropColor={'#000'}
            backdropOpacity={0}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
            animationIn={"bounceIn"}  
            animationOut={"fadeOut"}  

           >
            <View style={{ height: Dimensions.get('window').height*0.3, backgroundColor: '#fff', padding: 20, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{color: '#4fc1e9'}}>Set up your movie</Text>
            </View>
          </Modal>
        </View>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);