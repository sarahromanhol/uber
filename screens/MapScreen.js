import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation()
  return (
    // <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
    <View>

      <TouchableOpacity
      onPress={() => navigation.navigate('HomeScreen')}
      style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
      >
        <Icon name="menu"/>
      </TouchableOpacity>

      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name='NavigateCard'
            component={NavigateCard}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='RideOptionsCard'
            component={RideOptionsCard}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </View>
    </View>


    // </SafeAreaView>

  )
}

export default MapScreen

const styles = StyleSheet.create({})