import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';
import InvocationGoodManners from '../../../../../components/InvocationGoodManners';
import Text from '../../../../../components/Text';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import VStack from '../../../../../components/stack/VStack';
import { Color } from '../../../../../constants/Color';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import InvocationAccordion from '../../../common/InvocationAccordion';
import { purificationStyles } from '../../../common/Style';

import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function InvocationsScreen() {
  const { formatMessage } = useMessage();

  const AnimatedImageWithText = ({ imageSource, text }: { imageSource: any; text: string }) => {
    const opacity = useSharedValue(0);

    useEffect(() => {
      const fadeIn = () => {
        opacity.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) });
      };

      const fadeOut = () => {
        opacity.value = withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) });
      };

      fadeIn();
      setTimeout(() => {
        fadeOut();
      }, 5000); // 5 seconds delay
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
      return { opacity: opacity.value };
    });

    return (
      <View style={[styles.animatedContainer, animatedStyle]}>
        <Animated.Image source={imageSource} style={[styles.animatedImage, animatedStyle]} />
        <Text style={[styles.animatedText, animatedStyle]}>
          <Text variant="bodySmall" style={styles.croyance}>
            {text}
          </Text>
        </Text>
      </View>
    );
  };

  const items = [
    {
      text: formatMessage(TKeys.INVOCATION_STEP_2_RULE_2_CROYANCE_1),
      imageSource: require('../../../../../../assets/img/purification/dikr_haylala/haylala_1.png'),
    },
    {
      text: formatMessage(TKeys.INVOCATION_STEP_2_RULE_2_CROYANCE_2),
      imageSource: require('../../../../../../assets/img/purification/dikr_haylala/haylala_2.png'),
    },
    {
      text: formatMessage(TKeys.INVOCATION_STEP_2_RULE_2_CROYANCE_3),
      imageSource: require('../../../../../../assets/img/purification/dikr_haylala/haylala_3.png'),
    },
    // Add more items as needed
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <ScrollViewLayout style={styles.root}>
      <Text variant="bodyMedium" style={styles.title}>
        {formatMessage(TKeys.INVOCATION_STEP_2)}
      </Text>
      <List.AccordionGroup>
        <InvocationAccordion id={1} titleKey={TKeys.INVOCATION_STEP_2_RULE_1} duration={5}>
          <Text variant="bodySmall" style={GlobalStyles.justify}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_1_DESC)}
          </Text>
        </InvocationAccordion>
        <InvocationAccordion id={2} titleKey={TKeys.INVOCATION_STEP_2_RULE_2} duration={30}>
          <VStack spacing={10}>
            <AnimatedImageWithText text={items[currentIndex].text} imageSource={items[currentIndex].imageSource} />
          </VStack>
        </InvocationAccordion>
        <InvocationAccordion id={3} titleKey={TKeys.INVOCATION_STEP_2_RULE_3} duration={20}>
          <Text variant="bodySmall" style={GlobalStyles.justify}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_3_DESC)}
          </Text>
        </InvocationAccordion>
        <InvocationAccordion id={4} titleKey={TKeys.INVOCATION_STEP_2_RULE_4} duration={15}>
          <Text variant="bodySmall" style={GlobalStyles.justify}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_4_DESC)}
          </Text>
        </InvocationAccordion>
      </List.AccordionGroup>
      <InvocationGoodManners />
    </ScrollViewLayout>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: Color.backgroundColor, flex: 1 },
  title: { ...purificationStyles.title, color: 'seagreen' },
  body: { fontWeight: '900', textAlign: 'justify', color: 'seagreen' },
  croyance: { textAlign: 'justify', color: '#00773c' },
  animatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedImage: {
    width: 300,
    height: 400,
    marginBottom: 10,
    borderRadius: 2,
  },
  animatedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'seagreen',
  },
});
