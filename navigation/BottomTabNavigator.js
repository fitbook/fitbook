import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import WorkoutScreen from '../screens/Workout';
import PostScreen from '../screens/Post';


const screens = {
    Home: {
        screen: HomeScreen
    },
    Post: {
        screen: PostScreen
    },
    Profile: {
        screen: ProfileScreen
    },
};

const config = {
    headerMode: 'none',
    initialRouteName: 'Home',
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
            } else if (routeName === 'Post') {
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
        tabBarOnPress: (data) => {
            // this is where the magic happens
            const { navigation, defaultHandler } = data;
            // we check to see if the navigation key is going to be on Tab3
            if (navigation.state.key === 'Post') {
                // if it is we show the ModalScreen by navigating to it
                navigation.navigate('ModalScreen');
            } else {
                // otherwise we call the defaultHandler and navigate to the tab we pressed
                defaultHandler(navigation.state.key);
            }
        }
    }),
    tabBarOptions: {
        showLabel: false,
        activeTintColor: 'black',
        inactiveTintColor: 'gray',

    },
};

const TabNavigator = createBottomTabNavigator(screens, config);

const stackScreens = {
    Tabs: {
        screen: TabNavigator
    },
    ModalScreen: {
        screen: PostScreen
    }
};

//we need to set the mode to be modal
const stackConfig = {
    headerMode: 'none',
    initialRouteName: 'Tabs',
    mode: 'modal'
};

const BottomTabNavigator = createStackNavigator(stackScreens, stackConfig);
export default createAppContainer(BottomTabNavigator);
