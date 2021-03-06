import React, { Component } from 'react'
import {FlatList, Image, StyleSheet, Text, View} from 'react-native'
import { withFirebaseHOC } from '../config/Firebase'
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

class Home extends Component {
  state = {
    posts: [],
  };

  componentDidMount(){
      this.props.firebase.getPosts().then(ref => {
          this.setState({ posts: ref });
      }).catch(error => {
          console.log(error);
      })
  }

  handleSignout = async () => {
    try {
      await this.props.firebase.signOut();
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  };

  renderPost = post => {
    return (
      <View style={styles.feedItem}>
          <Image source={post.avatar} style={styles.avatar}/>
          <View style={{flex: 1}}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View>
                    <Text style={styles.name}>{post.name}</Text>
                    <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                </View>

                  <Ionicons name="ios-more" size={24} color="#73788B"/>
              </View>

              <Text style={styles.post}>{post.text}</Text>

              <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover"></Image>

              <View style={{ flexDirection: "row"}}>
                  <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{ marginRight: 16}}/>
                  <Ionicons name="ios-chatbubbles" size={24} color="#73788B" style={{ marginRight: 16}}/>
              </View>
          </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Feed</Text>
        </View>

          <FlatList
              style={styles.feed}
              data={this.state.posts}
              renderItem={({ item }) => this.renderPost(item)}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
        backgroundColor: "#EFECF4",
  },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500",
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16,
    },
    name: {
      fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    timestamp: {
      fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4,
    },
    post: {
      marginTop: 16,
        fontSize: 14,
        color: "#838899"
    },
    postImage: {
      width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16,
    }
});

export default withFirebaseHOC(Home);
