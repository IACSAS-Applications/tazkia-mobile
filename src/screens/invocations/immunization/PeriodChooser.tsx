import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import Animated, { FadeInRight, FadeInUp, SlideInDown } from 'react-native-reanimated';
import Text from '../../../components/Text';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
import { Font } from '../../../constants/Font';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';
import { ImmunizationPeriod } from './data';

interface Props {
  onSelect(period: ImmunizationPeriod): void;
  onMetaSelect(): void;
}
export default function PeriodChooser(props: Props) {
  const { formatMessage } = useMessage();
  const periods = useMemo(
    () => [
      { name: 'morning', image: require('./../../../../assets/img/invocations/morning.png') },
      { name: 'evening', image: require('./../../../../assets/img/invocations/evening.png') },
    ],
    [],
  );

  return (
    <View style={GlobalStyles.center}>
      <Animated.View entering={FadeInUp.delay(700).duration(500).mass(15)}>
        <VStack spacing={5} style={GlobalStyles.center}>
          <Text variant="titleMedium" style={styles.topTitle}>
            {formatMessage(TKeys.INITIATION_TITLE)}
          </Text>
          <Text style={styles.contentText}>{formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_INITIATION)}</Text>
        </VStack>
      </Animated.View>
      <VStack style={styles.container} spacing={12}>
        <Animated.View
          entering={FadeInRight.delay(1200).duration(500).mass(80)}
          style={styles.introduction}
          onTouchEnd={props.onMetaSelect}
        >
          <Text variant="titleLarge" style={styles.introductionBody}>
            {formatMessage(TKeys.GENERAL_PRESENTATION_TITLE)}
          </Text>
        </Animated.View>
        {periods.map(({ name, image }, index) => (
          <Animated.View
            key={name}
            entering={SlideInDown.delay(100 * (index + 1))
              .duration(300 * (index + 1))
              .mass(1)
              .springify()}
            style={styles.pressable}
            onTouchEnd={() => props.onSelect(name as ImmunizationPeriod)}
          >
            <View style={styles.titleContainer}>
              <Avatar.Image source={image} size={60} style={styles.image} />
              <VStack style={styles.titleTop}>
                <Text variant="bodySmall" style={styles.title}>
                  {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_TITLE, { period: formatMessage(name) })}
                </Text>
                <Text variant="bodySmall" style={styles.subTitle}>
                  {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_SUB_TITLE)}
                </Text>
              </VStack>
            </View>
          </Animated.View>
        ))}
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.center,
    paddingTop: 10,
    paddingBottom: 30,
  },
  introduction: {
    ...GlobalStyles.circle,
    backgroundColor: 'teal',
    elevation: 8,
    width: SCREEN_WIDTH - 150,
    height: 45,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  introductionBody: {
    fontWeight: '900',
    textAlign: 'center',
    fontSize: Font.size(16),
    color: Color.flatItemNoneColor,
  },
  pressable: {
    ...GlobalStyles.circle,
    backgroundColor: Color.partProgressBgColor,
    elevation: 8,
    width: SCREEN_WIDTH - 30,
    alignItems: 'center',
    alignContent: 'stretch',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  titleContainer: {
    alignItems: 'center',
    alignContent: 'stretch',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 70,
  },
  titleTop: { ...GlobalStyles.center, marginLeft: 25 },
  title: { fontWeight: '900', fontSize: Font.size(16), paddingTop: 5 },
  subTitle: { fontWeight: '600', fontSize: Font.size(12) },
  image: { position: 'absolute', left: 6 },
  topTitle: {
    ...GlobalStyles.center,
    fontWeight: '900',
    fontSize: Font.size(19),
    paddingTop: 5,
    textShadowRadius: 8,
    color: 'teal',
  },
  contentText: {
    fontSize: Font.size(14),
    textAlign: 'justify',
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
