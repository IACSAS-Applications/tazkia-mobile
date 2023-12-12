import React from 'react';
import { Image, StyleSheet, ViewToken } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Text from '../../../components/Text';
import HStack from '../../../components/stack/HStack';
import VStack from '../../../components/stack/VStack';
import { Font } from '../../../constants/Font';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { Book } from '../../../domains/presentation/Book';
import GlobalStyles from '../../../styles/GlobalStyles';

type Props = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  book: Book;
  total: number;
};

export const FlatBook: React.FC<Props> = React.memo(({ book, viewableItems, total }) => {
  const rowStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value.filter((item) => item.isViewable).find((viewableItem) => viewableItem.item.id === book.id),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [{ scale: withTiming(isVisible ? 1 : 0.6) }],
    };
  }, []);

  return (
    <Animated.View
      style={[rowStyle, styles.row, { marginBottom: total === book.id ? 80 : 2, marginTop: book.id === 1 ? 15 : 7 }]}
    >
      <VStack spacing={10}>
        <Text variant="bodyMedium" style={styles.title}>
          {book.title}
        </Text>
        <HStack style={GlobalStyles.spaceBetween}>
          <Image source={book.image} style={styles.image} />
          <VStack style={{ width: '68%', paddingEnd: 5 }}>
            <Text variant="bodyMedium" style={styles.summary}>
              {book.summary}
            </Text>
            <Text variant="bodyMedium" style={styles.link}>
              {book.link}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  row: {
    elevation: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 7,
    marginHorizontal: 5,
    paddingTop: 15,
    paddingVertical: 1,
    paddingHorizontal: 10,
    width: SCREEN_WIDTH - 10,
  },
  title: { fontSize: Font.size(14), fontWeight: '900' },

  image: {
    width: 110,
    height: 160,
  },
  summary: {
    textAlign: 'justify',
    fontSize: Font.size(14),
  },
  link: {
    fontSize: Font.size(14),
  },
});
