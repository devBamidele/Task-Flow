import { Dimensions, ScaledSize } from 'react-native';

const { width, height }: ScaledSize = Dimensions.get('window');

const guidelineBaseWidth: number = 393;
const guidelineBaseHeight: number = 851;

const horizontalScale = (size: number): number => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number): number => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor: number = 0.5): number => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };
