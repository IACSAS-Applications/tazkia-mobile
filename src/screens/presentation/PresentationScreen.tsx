import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import PressableStep, { Part } from '../../components/PressableStep';
import VStack from '../../components/stack/VStack';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';

export default function PresentationScreen() {
  const { width } = useWindowDimensions();
  const parts: Part[] = useMemo(
    () => [
      {
        description: TKeys.PRESENTATION_CENTER_TITLE,
        route: 'Center',
        imageSource: require('./../../../assets/img/presentation/center.jpg'),
      },
      {
        description: TKeys.PRESENTATION_CHEIKH_TITLE,
        route: 'Cheikh',
        imageSource: require('./../../../assets/img/presentation/cheikh.png'),
      },
      {
        description: TKeys.PRESENTATION_APPROACH_TITLE,
        route: 'Approach',
        imageSource: require('./../../../assets/img/presentation/manhaj.jpg'),
      },
      {
        description: TKeys.PRESENTATION_BOOKS_TITLE,
        route: 'Books',
        imageSource: require('./../../../assets/img/presentation/library.jpg'),
      },
    ],
    [],
  );

  return (
    <VStack style={styles.container} spacing={18}>
      {parts.map((item: Part, index: number) => (
        <Animated.View key={index} entering={FadeIn.delay(300 * index)} style={{ ...styles.part, width: width - 70 }}>
          <PressableStep item={item} index={index} />
        </Animated.View>
      ))}
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: { ...GlobalStyles.container, backgroundColor: '#dcdcf730' },
  part: {
    paddingVertical: 10,
    backgroundColor: '#f5fffa',
    borderRadius: 15,
    elevation: 6,
  },
});
