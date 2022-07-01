import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import SafeViewAndroid from '../components/SafeViewAndroid'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';



const HomeScreen = () => {
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View style={tw`bg-white h-full p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs"
          }}
        />

        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            }
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en"
          }}
          minLength={2}
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.description
            }))

            dispatch(setDestination(null))
          }}
          fetchDetails={true}
          placeholder='Where From?'
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
        />

        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create()