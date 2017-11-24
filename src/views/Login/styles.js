import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(28, 96, 202, 0.7)'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 204, 1, 0.8)'
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
  backgroundImage2: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  content: {
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'transparent',
  },
   inputTop: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    padding: 10,
    marginTop: 7,
    backgroundColor: 'rgba(255,255,255,1)',
    borderBottomColor: '#999',
    borderBottomWidth: 1
  },
  inputBottom: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  forget: {
    color: '#fff',
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#fff",
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  inputContainer: {
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 40
  },
  logo: {
    marginTop: -100,
    transform: [{ scale: 0.75 }],
  },
});

export default styles;