import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import {deviceWidth, moderateScale} from '../../utils/helper';
import {Colors} from '../../utils/colors';
import {Movie} from '../../redux/movieSlice';
import {IMAGE_BASE_URL} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';

type Props = {
  movie: Movie;
};

export const MovieComponent = ({movie}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('MovieDetails', {movie: movie})}>
      <Image
        source={{
          uri: IMAGE_BASE_URL + movie?.poster_path,
        }}
        style={styles.poster}
      />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {movie?.title}
        </Text>
        <Text style={styles.dateWithNoMargin}>Release Date:</Text>
        <Text style={styles.date}>{movie?.release_date}</Text>
        <Text style={styles.date}>
          Rating: {movie?.vote_average?.toFixed(1)}/10
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (deviceWidth - moderateScale(30)) / 2,
    height: Platform.OS === 'android' ? moderateScale(450) : moderateScale(400),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.lightBlue,
    marginRight: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  poster: {
    width: '100%',
    height: '70%',
    borderRadius: moderateScale(10),
  },
  details: {
    padding: moderateScale(5),
  },
  name: {
    color: Colors.black,
    fontSize: moderateScale(15),
    fontWeight: '500',
    marginBottom: moderateScale(10),
  },
  date: {
    color: Colors.black,
    fontSize: moderateScale(15),
    marginBottom: moderateScale(10),
  },
  dateWithNoMargin: {
    color: Colors.black,
    fontSize: moderateScale(15),
  },
});
