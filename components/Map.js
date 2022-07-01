import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import tw from 'twrnc';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const ref = useRef(null);
  const dispatch = useDispatch();

  const onMapReadyHandler = useCallback(() => {
    ref?.current?.fitToElements([origin, destination], {
      animated: true,
    });
  }, [ref]);

  useEffect(() => {

    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?
      units=imperial&origins=${origin.description}&destinations=
      ${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      ).then((res) => res.json())
        .then(data => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        })
    }

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY])


  return (
    <MapView
      ref={ref}
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >

      {origin && destination && (
        <MapViewDirections
          origin={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          destination={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeColor="hotpink"
          strokeWidth={3}
          onReady={onMapReadyHandler}
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier='origin'
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier='destination'
        />
      )}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})