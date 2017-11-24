import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, AsyncStorage, Animated, Keyboard, Easing, FlatList, ScrollView, Image, ImageBackground, InteractionManager, Dimensions, TouchableOpacity, } from 'react-native';

//Styles
import styles from './styles';

//Component
import DrawerComponent from '../../modules/drawer';

//Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/userAction'

//UI
import { Title, TextInput, Tile, Button, Text, Caption, View as ViewShoutem, NavigationBar, Divider, Subtitle, Spinner, } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome';





function mapStateToProps(state) {
  return {
    user: state.userReducer.user
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
      bgLoaded:false,
      movies: [
        {
          name: '123',
          image: '../../images/movie1.jpeg'
        },
        {
          name: '123',
          image: '../../images/movie2.jpeg'
        },
        {
          name: '123',
          image: '../../images/movie3.jpeg'
        },
        {
          name: '123',
          image: '../../images/movie4.jpeg'
        },
        {
          name: '123',
          image: '../../images/movie5.jpeg'
        },
      ]
    }
    this.tabLineOffsetX = new Animated.Value(Dimensions.get('window').width*0.125);
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
          this.setState({interactionsComplete: true});
    });
  }
  openMoview = () => {
    const { navigate } = this.props.navigation;
    navigate('Movie');
  }
  onScroll = (e) => {
    if(e.nativeEvent.contentOffset.x > Dimensions.get('window').width*0.5) {
      Animated.spring(this.tabLineOffsetX, { toValue: Dimensions.get('window').width*0.625, }).start();
    }
    else {
      Animated.spring(this.tabLineOffsetX, { toValue: Dimensions.get('window').width*0.125, }).start();
    }
  }
  render() {
     const drawerStyles = {
        drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, backgroundColor: '#fff'},
        main: {paddingLeft: 3},
      }
      console.log(this.state);
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
                  <TouchableOpacity onPress={this.openMoview} style={{backgroundColor: '#0a77a0', borderRadius: 40, width: 200, padding: 15, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>JOIN</Text>
                  </TouchableOpacity>

                </View>
                </View>
          </View>
           : 
           <View  key={`view_loading`} style={styles.spinnerContainer}>
             <Spinner />
           </View>}
           </View>    
           <View>
           <View style={styles.tabContainer}>
                <View style={styles.tab1}>
                   <Text style={{color: '#fff'}}>In the air</Text>
                </View>
                <View style={styles.tab2}>
                    <Text style={{color: '#fff'}}>Starting soon</Text>
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
                  {this.state.mainImageLoaded && this.state.bgLoaded &&
                  <FlatList
                    data={this.state.movies}
                    bounces={false}
                    renderItem={({item, index}) => 
                      <View style={{margin: 10,  width: Dimensions.get('window').width * 0.4}} key={`moview_${index}`}>
                        <Image
                          style={{
                            width: Dimensions.get('window').width * 0.4,
                            height: Dimensions.get('window').height * 0.35,
                            borderRadius: 10
                          }}
                          source={require('../../images/movie4.jpeg')}
                        />
                      </View>}
                    style={styles.planList}
                    horizontal={false}
                    numColumns={2}
                  />}
                </View>
                </View>
                <View style={styles.moviesContainer}>
                
                <View style={{flexDirection: 'row'}}>
                  {this.state.mainImageLoaded && this.state.bgLoaded &&
                  <FlatList
                    data={this.state.movies}
                    renderItem={({item, index}) => 
                      <View style={{margin: 10,  width: Dimensions.get('window').width * 0.4}} key={`moview_${index}`}>
                        <Image
                          style={{
                            width: Dimensions.get('window').width * 0.4,
                            height: Dimensions.get('window').height * 0.35,
                            borderRadius: 10
                          }}
                          source={require('../../images/movie5.jpeg')}
                        />
                      </View>}
                    style={styles.planList}
                    horizontal={false}
                    numColumns={2}
                  />}
                </View>
                </View>
                </ScrollView>
          </ScrollView>
        </View>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);