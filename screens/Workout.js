import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

export default class Workout extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Workout</Text>
                <Button
                    title={'close modal'}
                    onPress={() => this.props.navigation.goBack()}
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
