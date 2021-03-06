import React from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createStackNavigator, createAppContainer, NavigationActions } from 'react-navigation';
//import Icon from 'react-native-vector-icons/FontAwesome'
import SignUp from './SignUp'
import AuthFailedPop from './AuthFailedPop'
import { connect } from 'react-redux'
import firebase from 'firebase';
import { Icon } from 'react-native-elements'

import ForgotPassword from './ForgotPassword'

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

getState = data => {
  return {
      user: data
  }
}

class SignIn extends React.Component {

  state = {
    firstname: '',
    lastname: '',
    password: '',
    email: '',
    user: '',
    authFailed: false
  }
  
  constructor(props) {
    super(props)
    this.initializeFirebase()
  }

  initializeFirebase() {
    // Prevent reinitializing the app in snack.
    if (!firebase.apps.length) {
      return firebase.initializeApp(firebaseConfig);
    }
  }

  signIn(email, password) {
      email = email.replace(/\s+$/, '');
      console.log(email)
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.getUser(email))
      .then(() => {
        const { dispatch } = this.props
          console.log('sign in success')
          this.props.navigation.navigate('Main')
        }
      )
      .catch((error) => {
        console.log(error)
        this.setState({
          authFailed: true
        })
      })
  }

  forgotPassword(email) {
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => console.log('Email sended'))
    .catch((error) => {
        console.log(error)
    })
  }

  showDialog() {
    this.setState({authFailed: true});
  }

  closeDialog() {
      this.setState({authFailed: false});
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
    console.log(this.state.email)
  }

  goToSignUp() {
    this.navigation.navigate('SignUp')
  }

  updatePassword = (pwd) => {
    this.setState({
      password: pwd
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>


          <View style={styles.connexionContainer}>
            <Text style={styles.connexion}>Connexion</Text>

            <TouchableOpacity style={styles.buttonInscription} onPress={() => {this.props.navigation.navigate('SignUp')}}>
            <Text style={styles.inscription}>Inscription</Text>
            </TouchableOpacity>

          </View>

          <KeyboardAvoidingView style={styles.inputContainer} behavior="padding" enabled> 

            <TextInput style={styles.input} placeholder='Email' onChangeText={(v) => this.onChangeText('email', v)}
              returnKeyType ='next' onSubmitEditing={() => { this.passwordInput.focus(); }}
            />

            <TextInput ref={(password) => this.passwordInput = password} returnKeyType ='done' style={styles.input} placeholder='Mot de passe' secureTextEntry={true} onChangeText={(v) => this.updatePassword(v)}/>

            <TouchableOpacity style={styles.passwordButton} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text style={styles.passwordText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.connexionButton} onPress={() => this.signIn(this.state.email, this.state.password)}>
              <Icon name="check" size={30} type='font-awesome' color='#50B263'/>
              <Text style={styles.connexionText}>Connexion</Text>
            </TouchableOpacity>

          </KeyboardAvoidingView>

        <AuthFailedPop
          closeDialog={() => this.closeDialog()}
          isVisible={this.state.authFailed}
        />

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(getState)(SignIn)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  connexion: {
    marginLeft: 20,
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonInscription: {
    justifyContent: 'center'
  },
  inscription: {
    marginRight: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#BEC6C7'
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 30
  },
  connexionContainer: {
    //marginTop: 50,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  inputContainer: {

  },
  fbContainer: {

  },
  input: {
    borderColor: 'white',
    borderWidth: 1.0,
    borderBottomColor: '#50B263',
    padding: 10,
    marginHorizontal: 50,
    marginTop: 20,
    fontSize: 20
  },
  passwordButton:{
    alignSelf: 'center',
    marginTop: 15
  },
  connexionButton: {
    marginTop: 70,
    marginBottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 25,
    paddingHorizontal: 50,
    alignItems: 'center',
    paddingVertical: 15,
    shadowColor: '#BEC6C7',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 1.0
  },
  connexionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#50B263'
  },
  connexionWith: {
    marginTop: 40,
    alignSelf: 'center',
    color: '#605F5E',
    fontWeight: 'bold'
  },
  connexionWithFb: {
    backgroundColor: 'yellow',
    marginTop: 30,
    paddingHorizontal: 50,
    paddingVertical: 15,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 25,
    backgroundColor: '#3b5998',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 1.0,
    shadowColor: '#BEC6C7',

  },
  connexionFbText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white'
  }
});