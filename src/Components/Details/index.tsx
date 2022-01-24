import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  Image
} from 'react-native';
import { Anime } from '../../Server/Data';

interface DetailsProps extends ViewProps {
  anime: Anime
}

const Details = ({ anime, ...rest }: DetailsProps) => {
  return (
    <View {...rest} style={styles.container}>
      <Image
        source={{ uri: anime.image }}
        style={styles.posterImage}
      />
      <Text style={styles.title}>{anime?.title}</Text>
      <Text style={{textAlign: 'center', fontSize: 15, marginBottom: 25}}>({anime?.original_title})</Text>
      <Text style={styles.description}>{anime?.description}</Text>
      <View style={styles.areaDetails}>
        <Text style={styles.sub}>Director:</Text>
        <Text style={styles.text}>{anime?.director}</Text>
        <Text style={styles.sub}>Producer:</Text>
        <Text style={styles.text}>{anime?.producer}</Text>
        <Text style={styles.sub}>Release Date:</Text>
        <Text style={styles.text}>{anime?.release_date}</Text>
        <Text style={styles.sub}>Running Time:</Text>
        <Text style={styles.text}>{anime?.running_time}</Text>
        <Text style={styles.sub}>Score:</Text>
        <Text style={styles.text}>{anime?.rt_score}</Text>
      </View>

    </View>
  );
}

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  description: {
    fontSize: 18,
    paddingHorizontal: 15,
    textAlign: 'justify'
  },
  areaDetails: {
    paddingHorizontal: 15,
  },
  sub: {
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  posterImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    margin: 0,
    marginBottom: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  }
})