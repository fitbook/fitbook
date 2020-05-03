import React from 'react';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';
import UserPermissions from "../utilities/UserPermissions";
import * as ImagePicker from 'expo-image-picker';

class Profile extends React.Component {
    state = {
        user: []
    };

    unsubscribe = null;

    componentDidMount = async() => {
        const user = await this.props.firebase.getCurrentUser();
        this.setState({ user });
        this.unsubscribe = user;
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    handlePickAvatar = async () => {
        await UserPermissions.getCameraPermission();

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({ user: {...this.state.user, avatar: result.uri } });
            this.props.firebase.setUserAvatar(result.uri);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{marginTop: 64, alignItems: "center"}}>
                    <View style={styles.avatarContainer}>
                        <Image
                            style={styles.avatar}
                            source={
                                this.state.user.avatar
                                ? { uri: this.state.user.avatar }
                                : require("../assets/avatar.png")
                            }
                        />
                    </View>
                    <Text style={styles.name}>{this.state.user.name}</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.state}>
                        <Text style={styles.statAmount}>21</Text>
                        <Text style={styles.statTitle}>Posts</Text>
                    </View>
                    <View style={styles.state}>
                        <Text style={styles.statAmount}>981</Text>
                        <Text style={styles.statTitle}>Followers</Text>
                    </View>
                    <View style={styles.state}>
                        <Text style={styles.statAmount}>21</Text>
                        <Text style={styles.statTitle}>Following</Text>
                    </View>
                </View>
                <Button
                    title='Log out'
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
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity: 0.4,
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 64,
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: "600",
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 32,
    },
    stat: {
        alignItems: "center",
        flex: 1,
    },
    statAmount: {
        color: "#4F566D",
        fontSize: 18,
        fontWeight: "300",
    },
    statTitle: {
        color: "#C3C5CD",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4
    }
});

export default withFirebaseHOC(Profile);
