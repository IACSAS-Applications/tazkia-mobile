import { StyleSheet } from 'react-native';

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
});

export default GlobalStyles;
