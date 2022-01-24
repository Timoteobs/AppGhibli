import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Animated,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { getAnimes, Anime } from '../../Server/Data';
import { LinearGradient } from 'expo-linear-gradient';
import { Modalize } from 'react-native-modalize';
import Details from '../Details';

const { width, height } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const BACKDROP_HEIGHT = height * 0.6;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Backdrop = ({ animes, scrollX }) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
      <FlatList
        data={animes}
        keyExtractor={(item) => item.id + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.title) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: item.movie_banner }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', '#1C93C0']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
}

const Home: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [animeSelected, setAimeSelected] = useState<Anime>();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const modalizeRef = React.useRef<Modalize>(null);

  const onOpen = (item: Anime) => {
    modalizeRef.current?.open();
    setAimeSelected(item);
  };

  const onClose = () => {
    modalizeRef.current?.close();
  }

  useEffect(() => {
    const getItem = async () => {
      const data = await getAnimes();
      setAnimes([{ id: 'left-spacer' }, ...data, { id: 'right-spacer' }]);
    }
    getItem();
  }, []);

  return (
    <View style={styles.container}>
      <Backdrop animes={animes} scrollX={scrollX} />
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={animes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        snapToAlignment='start'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {

          if (!item.title) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ]
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp'
          })
          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 34,
                  transform: [{ translateY }]
                }}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.posterImage}
                />
                <Text style={{ fontSize: 24, color: "#000" }} numberOfLines={1}>
                  {item.original_title_romanised}
                </Text>
                <Text style={{ fontSize: 16, color: "#000" }} numberOfLines={1}>
                  {item.original_title}
                </Text>
                <Text style={{ fontSize: 12, color: "#000" }} numberOfLines={4}>
                  {item.description}
                </Text>
                <TouchableOpacity style={styles.buttom} onPress={() => { onOpen(item) }}>
                  <Text style={{ color: '#fff' }}>Detalhes</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          )
        }}
      />

      <Modalize
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        snapPoint={height - 50}
        withHandle={false}
        ref={modalizeRef}
        childrenStyle={{marginBottom: 20}}
      >
        <Details
          anime={animeSelected}
        />
        <View style={{marginHorizontal: 15}}>
          <TouchableOpacity style={styles.buttom} onPress={() => { onClose() }}>
            <Text style={{ color: '#fff' }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttom: {
    width: '100%',
    backgroundColor: '#1C93C0',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 24
  },
  container: {
    flex: 1,
    backgroundColor: '#1C93C0'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});