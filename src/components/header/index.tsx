import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
  Keyboard,
} from 'react-native';
import {moderateScale} from '../../utils/helper';
import {Colors} from '../../utils/colors';
import {IconComponent} from '../iconComponent';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {Icons} from '../../utils/icons';

type Props = {
  title: string;
  icon: IconProp;
  onChangeText: (text: string) => void;
  searchValue: string;
};

export const Header = ({title, icon, onChangeText, searchValue}: Props) => {
  const [isInputVisible, setInputVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isInputVisible ? 0 : -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() =>
      isInputVisible ? inputRef?.current?.focus() : Keyboard.dismiss(),
    );
  }, [isInputVisible, slideAnim]);

  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
    onChangeText?.('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <IconComponent
          icon={icon}
          size={moderateScale(25)}
          color={Colors.white}
        />
        <Text style={styles.heading}>{title}</Text>
      </View>
      <TouchableOpacity onPress={toggleInputVisibility}>
        <IconComponent
          icon={Icons.search}
          size={moderateScale(25)}
          color={Colors.white}
        />
      </TouchableOpacity>

      <Animated.View
        style={[styles.inputContainer, {transform: [{translateY: slideAnim}]}]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={searchValue}
          placeholder="Search for movies..."
          placeholderTextColor={Colors.grey}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          style={styles.closeInputButton}
          onPress={toggleInputVisibility}>
          <IconComponent icon={Icons.close} size={moderateScale(25)} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkBlue,
    justifyContent: 'space-between',
    position: 'relative',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: Colors.white,
    fontSize: moderateScale(20),
    fontWeight: '500',
    marginLeft: moderateScale(10),
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    padding: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    borderTopWidth: moderateScale(1),
    borderTopColor: Colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: moderateScale(40),
    borderColor: Colors.grey,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    color: Colors.black,
    width: '90%',
  },
  closeInputButton: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
