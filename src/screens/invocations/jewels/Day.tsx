import { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Divider } from 'react-native-paper';
import { FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated';
import Text from '../../../components/Text';
import HStack from '../../../components/stack/HStack';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
import { Font } from '../../../constants/Font';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';

interface Props {
  day: number;
  partNumbers: number;
  onInfo(title: TKeys, summary: TKeys): void;
}
function Day({ day, partNumbers, onInfo }: Props) {
  const { formatMessage } = useMessage();
  const [isOpen, setOpen] = useState(false);

  const baseKey = `invocations.jewels`;
  const first = day === 0;
  const last = day === 8;
  const titleKey = first ? TKeys.GENERAL_PRESENTATION_TITLE : last ? TKeys.CONCLUSION : `${baseKey}.day.${day}.title`;
  const summaryKey = first ? `${baseKey}.introduction` : last ? TKeys.INVOCATIONS_JEWELS_CONCLUSION : '';
  const fade = first ? FadeInDown : last ? FadeInUp : FadeInLeft;

  function handlePress() {
    if (first || last) {
      onInfo(titleKey as TKeys, summaryKey as TKeys);
    } else {
      setOpen(!isOpen);
    }
  }

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor:
            first || last ? Color.flatItemNoneBgColor : isOpen ? Color.progress : Color.partDefaultBgColor,
          marginTop: first || last ? 8 : 3,
          marginBottom: first || last ? 8 : 3,
        },
      ]}
      onTouchEnd={handlePress}
    >
      <HStack style={{ ...GlobalStyles.center, paddingHorizontal: 5 }}>
        {!first && !last && <Avatar.Text label={day.toString()} size={22} style={styles.id} color="white" />}
        <HStack style={{ ...styles.container, paddingVertical: first || last ? 1 : 4 }}>
          {!first && !last && (
            <Text
              style={{
                ...styles.title,
                color: first || last ? 'white' : 'black',
                fontSize: Font.size(18),
                flex: 5,
              }}
            >
              {formatMessage(`day.${day}`)}
            </Text>
          )}
          <Text
            style={{
              ...styles.title,
              color: first || last ? 'white' : 'teal',
              fontSize: Font.size(isOpen ? 17 : 16),
              flex: 15,
            }}
          >
            {formatMessage(titleKey)}
          </Text>
        </HStack>
      </HStack>
      {isOpen && (
        <View style={styles.main}>
          {Array.from({ length: partNumbers }, (_, i) => i + 1).map((part) => (
            <VStack key={`${day}_${part}`} spacing={25} style={styles.box}>
              <Text variant="bodyMedium" style={styles.partTitle}>
                {formatMessage(`${baseKey}.day.${day}.part.${part}.title`)}
              </Text>
              <Text variant="bodyMedium" style={styles.summary}>
                {formatMessage(`${baseKey}.day.${day}.part.${part}.summary`)}
              </Text>
              <Text variant="bodyMedium" style={styles.body}>
                {formatMessage(`${baseKey}.day.${day}.part.${part}.body`)}
              </Text>
              {part !== partNumbers && <Divider style={styles.divider} />}
            </VStack>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    ...GlobalStyles.center,
    marginHorizontal: 10,
    paddingVertical: 8,
    elevation: 10,
    borderRadius: 25,
    gap: 15,
  },
  main: { ...GlobalStyles.center, flexDirection: 'column', gap: 10, paddingVertical: 15 },
  box: { ...GlobalStyles.center, paddingHorizontal: 10, marginHorizontal: 10 },
  title: {
    textAlign: 'center',
    color: 'teal',
    fontFamily: 'ReemKufiFun',
  },
  partTitle: {
    backgroundColor: '#66cdaa21',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    fontSize: Font.size(20),
    textAlign: 'center',
    fontFamily: 'ReemKufiFun',
    color: 'teal',
  },
  summary: {
    ...GlobalStyles.justify,
    fontSize: Font.size(16),
    fontFamily: 'Cairo',
  },
  body: { ...GlobalStyles.justify, fontSize: Font.size(18), lineHeight: 26 },
  id: { elevation: 2, backgroundColor: '#3db371', flex: 1.2, marginStart: 2 },
  container: { ...GlobalStyles.center, flex: 15, marginHorizontal: 10 },
  divider: { width: SCREEN_WIDTH - 100, height: 1, marginVertical: 10 },
});

export default memo(Day);
