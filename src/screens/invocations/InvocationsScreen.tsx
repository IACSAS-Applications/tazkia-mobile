import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import Text from '../../components/Text';
import BottomSheet, { BottomSheetRef } from '../../components/bottomSheet/BottomSheet';
import SimpleDialog, { SimpleDialogRef } from '../../components/dialogs/SimpleDialog';
import VStack from '../../components/stack/VStack';
import { Color } from '../../constants/Color';
import { Font } from '../../constants/Font';
import { SCREEN_WIDTH } from '../../constants/Screen';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import { useGlobal } from '../../providers/AppProvider';
import GlobalStyles from '../../styles/GlobalStyles';
import PeriodChooser from './immunization/PeriodChooser';
import { ImmunizationPeriod } from './immunization/data';

export default function InvocationsScreen() {
  const ref = useRef<BottomSheetRef>(null);
  const dialogRef = useRef<SimpleDialogRef>(null);
  const { formatMessage } = useMessage();
  const { arabic } = useGlobal();
  const navigation = useNavigation<any>();
  const [content, setContent] = useState<ReactNode>();

  const parts = useMemo(
    () => [
      {
        route: 'Immunization',
        name: TKeys.INVOCATION_IMMUNIZATION_TITLE,
        image: require('./../../../assets/img/presentation/books/altahsin.png'),
      },
      {
        route: 'Jewels',
        name: TKeys.INVOCATION_JEWELS_TITLE,
        image: require('./../../../assets/img/presentation/books/jawaher.png'),
      },
      {
        route: 'Overflow',
        name: TKeys.INVOCATION_OVERFLOW_TITLE,
        image: require('./../../../assets/img/presentation/books/alfayd_alrahmani.png'),
      },
      {
        route: 'Ahzabs',
        name: TKeys.INVOCATION_AHZABS_TITLE,
        image: require('./../../../assets/img/presentation/books/ahzabs.png'),
      },
    ],
    [],
  );

  function handleIntroductionClick() {
    dialogRef.current?.open(TKeys.INVOCATIONS_IMMUNIZATION_INTRODUCTION, TKeys.GENERAL_PRESENTATION_TITLE);
  }

  function handlePress(route: string) {
    if (route === 'Immunization') {
      setContent(<PeriodChooser onSelect={handlePeriodSelect} onMetaSelect={handleIntroductionClick} />);
      ref.current?.open();
    } else {
      navigation.navigate(route);
    }
  }

  function handlePeriodSelect(period: ImmunizationPeriod) {
    navigation.navigate('Immunization', { period });
    ref.current?.close();
  }

  return (
    <BottomSheet ref={ref} content={content}>
      <VStack spacing={15} style={styles.container}>
        {parts.map((item, index: number) => (
          <View key={index} style={styles.part} onTouchStart={() => handlePress(item.route)}>
            {item.image && <Avatar.Image source={item.image} size={95} style={styles.image} />}
            <View style={styles.summary}>
              <Text
                variant="bodyMedium"
                style={{ ...styles.summaryLabel, fontSize: Font.size(arabic ? 16 : 14), color: 'black' }}
              >
                {formatMessage(item.name)}
              </Text>
            </View>
          </View>
        ))}
      </VStack>
      <SimpleDialog ref={dialogRef} />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.center,
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: Color.backgroundColor,
  },
  part: {
    backgroundColor: Color.partDefaultBgColor,
    width: SCREEN_WIDTH - 10,
    elevation: 6,
    borderRadius: 100,
    paddingVertical: 10,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'justify',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: { backgroundColor: 'white', position: 'absolute', left: 4 },
  summary: {
    ...GlobalStyles.center,
    left: 28,
    width: '80%',
  },
  summaryLabel: {
    fontFamily: 'ReemKufiFun',
    flexBasis: 90,
    marginBottom: -6,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    verticalAlign: 'middle',
    paddingHorizontal: 20,
  },
});
