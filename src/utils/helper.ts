import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 390;
const guidelineBaseHeight = 850;

const scale = (size: number) => (deviceWidth / guidelineBaseWidth) * size;
const verticalScale = (size: number) =>
  (deviceHeight / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.25): number =>
  size + (scale(size) - size) * factor;

const [deviceWidth, deviceHeight] = [width, height];
export {moderateScale, verticalScale, deviceWidth, deviceHeight, scale};
