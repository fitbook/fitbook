import React from 'react'
import {StyleSheet} from 'react-native'
import { Text } from 'react-native-elements'

const AppLogo = () => (
    <Text style={styles.title}>fitbook</Text>
);

export default AppLogo

const styles = StyleSheet.create({
    title: {
        fontSize: 48,
        fontWeight: 'bold',
    }
});