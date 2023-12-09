import { StyleSheet } from 'react-native';
import { Color } from '../constants/Color';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/Screen';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rounded: {
    borderRadius: 10,
  },
  circle: { borderRadius: 100 },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  centerAlign: { alignItems: 'center' },
  description: {
    marginTop: 15,
    fontSize: 17,
    fontWeight: '900',
    alignSelf: 'center',
  },
  spaceBetween: {
    alignContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  closeFab: {
    borderRadius: 100,
    position: 'absolute',
    left: 15,
    bottom: 15,
    backgroundColor: Color.flatItemNoneBgColor,
    opacity: 0.6,
  },
  defaultDialog: { maxHeight: 0.8 * SCREEN_HEIGHT, width: SCREEN_WIDTH - 30, marginLeft: 15, backgroundColor: 'white' },
});

export default GlobalStyles;
