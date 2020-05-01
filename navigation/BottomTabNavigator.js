import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import WorkoutScreen from '../screens/Workout';

const BottomTabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
    },
    Workout: {
      screen: WorkoutScreen,
    },
    Profile: {
        screen: ProfileScreen,
    },
}, {
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            let iconName;
            let size = 25;
            let style = {};
            let color = tintColor;
            if (routeName === 'Home') {
                iconName = 'md-home';
            } else if (routeName === 'Profile') {
                iconName = 'md-person';
            } else if (routeName === 'Workout') {
                iconName = 'md-add-circle';
                size = 48;
                style = {
                    shadowColor: "#E9446A",
                    shadowOffset: { width:0, height: 0 },
                    shadowRadius: 10,
                    shadowOpacity: 0.3,
                };
                color = "#E9446A";
            }
            return (
                <Ionicons
                    name={iconName}
                    size={horizontal ? 20 : size}
                    color={color}
                    style={style}
                />
            );
        },
    }),
    tabBarOptions: {
        showLabel: false,
        activeTintColor: 'black',
        inactiveTintColor: 'gray',

    },

});

export default BottomTabNavigator;
