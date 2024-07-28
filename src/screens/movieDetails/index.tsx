import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Movie} from '../../redux/movieSlice';
import {Colors} from '../../utils/colors';
import {IMAGE_BASE_URL} from '../../utils/constants';
import {moderateScale} from '../../utils/helper';
import {IconComponent} from '../../components';
import {Icons} from '../../utils/icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';

type Props = {
  route: {
    params: {
      movie: Movie;
    };
  };
};

export const MovieDetails = ({route}: Props) => {
  const {movie} = route?.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.pop()}>
        <IconComponent icon={Icons.backIcon} size={moderateScale(25)} />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <Image
          source={{uri: IMAGE_BASE_URL + movie.poster_path}}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.subtitle}>{movie.release_date}</Text>
          <Text style={styles.description}>{movie.overview}</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: '100%',
    height: moderateScale(500),
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  detailsContainer: {
    padding: moderateScale(15),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
  },
  subtitle: {
    fontSize: moderateScale(18),
    color: Colors.darkGrey,
    marginBottom: moderateScale(15),
  },
  description: {
    fontSize: moderateScale(16),
    color: Colors.black,
    lineHeight: moderateScale(24),
  },
  backIcon: {
    position: 'absolute',
    width: moderateScale(40),
    height: moderateScale(40),
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(30),
    top: moderateScale(5),
    left: moderateScale(5),
    zIndex: 1,
  },
});
