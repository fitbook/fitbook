import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';

class Profile extends React.Component {
    state = {
        user: this.props.firebase.getCurrentUser()
    };
    render() {
        return (
            <View style={styles.container}>
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default withFirebaseHOC(Profile);
