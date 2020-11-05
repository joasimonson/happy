import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import MapView, { MapEvent, Marker } from 'react-native-maps'

import mapMarkerImg from '../../images/map-marker.png'

const SelectMapPosition: React.FC = () => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const { navigate } = useNavigation()

  function handleNextStep() {
    navigate('OrphanageData', { position })
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate)
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -28.3304323,
          longitude: -49.0351485,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >

        {!!position.latitude && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{ latitude: position.latitude, longitude: position.longitude }} />
        )}
      </MapView>

      {!!position.latitude && (
        <RectButton
          style={styles.nextButton}
          onPress={handleNextStep}
        >
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },

  nextButton: {
    alignItems: 'center',
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    bottom: 40,
    height: 56,
    justifyContent: 'center',
    left: 24,
    position: 'absolute',
    right: 24
  },

  nextButtonText: {
    color: '#fff',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16
  }
})

export default SelectMapPosition