import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#4fc1e9'
  },
  backgroundImage2: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 204, 1, 0.8)'
  },
  calendar: {
    height: 100,
    marginTop: 60,
    width: Dimensions.get('window').width,
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center',
    backgroundColor: 'rgba(28, 96, 202, 0.2)'
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    marginTop: -100,
    transform: [{ scale: 0.75 }],
  },
  mealListContainer: {
    height: 100
  },
  mealList: {
    margin: 10,
  },
  mealItem: {
    width: Dimensions.get('window').width*0.45,
    height: 100
  },
  mealContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  mealContainerText: {
    padding: 20
  },
  mealChangeList: {
    marginTop: 10
  },
  mealChangeItem: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    padding: 10
  },
  mealChangeItemTextContainer: {
    marginLeft: 20
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -120,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  moviesContainer: {
    marginTop: -5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    paddingTop: 10,
    
    backgroundColor: '#4fc1e9'
  },
  tabContainer: {
    width: Dimensions.get('window').width,
    flexDirection:'row',
    backgroundColor: '#4fc1e9'
  },
  tab1: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  tab2: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  tabLineContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: '#4fc1e9',
    paddingBottom: 0,
    

  },
  underline: {
    height: 3,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width/4,
  },
});

export default styles;