import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'

class Home extends Component {
  state = {
    user: this.props.firebase.getCurrentUser()
  };
  handleSignout = async () => {
    try {
      await this.props.firebase.signOut();
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Text>{ this.state.user.email }</Text>
        <Button
          title='Signout'
          onPress={this.handleSignout}
          titleStyle={{
            color: '#F57C00'
          }}
          type='clear'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default withFirebaseHOC(Home);
