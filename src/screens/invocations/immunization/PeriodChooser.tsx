import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';
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
      { name: 'morning', image: require('./../../../../assets/img/invocations/morning.jpg') },
      { name: 'evening', image: require('./../../../../assets/img/invocations/evening.jpg') },
    ],
    [],
  );

  return (
    <View style={GlobalStyles.center}>
      <View>
        <Text variant="titleLarge" style={[styles.topTitle, styles.bookTitle]}>
          {formatMessage(TKeys.INVOCATION_IMMUNIZATION_TITLE)}
        </Text>
      </View>
      <VStack spacing={1} style={GlobalStyles.center}>
        <View style={styles.introduction} onTouchEnd={props.onMetaSelect}>
          <Text variant="titleLarge" style={styles.introductionBody}>
            {formatMessage(TKeys.GENERAL_PRESENTATION_TITLE)}
          </Text>
        </View>
        <View>
          <Text variant="titleLarge" style={[styles.topTitle, styles.initiation]}>
            {formatMessage(TKeys.INITIATION_TITLE)}
          </Text>
          <Text style={styles.contentText}>{formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_INITIATION)}</Text>
        </View>
      </VStack>

      <VStack style={styles.container} spacing={12}>
        {periods.map(({ name, image }, index) => (
          <View key={name} style={styles.pressable} onTouchEnd={() => props.onSelect(name as ImmunizationPeriod)}>
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
          </View>
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
  bookTitle: { fontSize: Font.size(20), marginBottom: 15, fontFamily: 'AmiriQuran' },
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
  title: { fontFamily: 'ReemKufiFun', fontSize: Font.size(16), paddingTop: 5 },
  subTitle: { fontFamily: 'AmiriQuran', fontSize: Font.size(12), lineHeight: 20 },
  image: { position: 'absolute', left: 6 },
  topTitle: {
    ...GlobalStyles.center,
    paddingTop: 5,
    textShadowRadius: 8,
    color: 'teal',
  },
  initiation: { fontSize: Font.size(16), marginTop: 10 },
  contentText: {
    fontSize: Font.size(14),
    textAlign: 'justify',
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
