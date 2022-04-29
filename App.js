/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  Dimensions,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  View,
  Animated,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;
const images = [
  'https://images.unsplash.com/photo-1650896602771-2555bc1e1fb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1650793039336-808955e86912?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1650564365557-b987ac5d219e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM0fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1506076177893-89d54794ef41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z29hdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1631019553258-043d88ef767b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGxpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1534759846116-5799c33ce22a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hlZXRhaCUyMHJ1bm5pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
];

const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
  avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
    Math.random() * 40,
  )}.jpg`,
}));


function App() {
  const scrollx=React.useRef(new Animated.Value(0)).current;
 
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={data}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={item => item.key}
        onScroll={Animated.event([{nativeEvent:{contentOffset:{x:scrollx}}}] ,{
          useNativeDriver:true,
        })}
        renderItem={({item, index}) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const translateX = scrollx.interpolate({
            inputRange,
            outputRange: [-width*.7, 0, width*.6],
          
          });
          const rotateAvatar=scrollx.interpolate({
            inputRange,
            outputRange: ['-90deg', '0deg', '360deg'],
          })

          const scaleAvatar=scrollx.interpolate({
            inputRange,
            outputRange: [0, 2, 0],
          })
          return (
            <View
              style={{width, justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  borderRadius: 18,
                  borderWidth: 2,
                  shadowColor: '#171717',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: .5,
                  shadowRadius: 30,
                  borderRadius: 18,
                  padding: 12,
                
                  backgroundColor: 'white',
                  
                }}>
                <View
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    backgroundColor: '#000',
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: 14,
                  }}>
                  <Animated.Image
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      resizeMode: 'cover',
                      transform: [{translateX:translateX},{rotateY:rotateAvatar}],
                    }}
                    source={{uri: item.photo}}
                  />
                </View>
                <Animated.Image
                  source={{uri: item.avatar_url}}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    borderWidth: 6,
                    borderColor: 'white',
                    position: 'absolute',
                    bottom: -30,
                    right: 60,
                    transform: [{rotateY:rotateAvatar},{scale:scaleAvatar}],
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
