import { useNavigation } from '@react-navigation/native';
import { lowerFirst } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Text from '../../../components/Text';
import HStack from '../../../components/stack/HStack';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
import { Font } from '../../../constants/Font';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { PurificationType } from '../../../domains/purification/Purification';
import { useMessage } from '../../../hooks/use-message';
import usePurification from '../../../hooks/use-purification';
import { useGlobal } from '../../../providers/AppProvider';
import GlobalStyles from '../../../styles/GlobalStyles';
import { Part } from './Helper';

interface Props {
  index: number;
  item: Part;
  hasProgress: boolean;
}
export default function PressableProgress({ index, item, hasProgress }: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useGlobal();
  const [progress, setProgress] = useState<number>();
  const { purification, globalPercentage } = usePurification();
  const type = useMemo(() => lowerFirst(item.route) as PurificationType, []);
  const navigation = useNavigation<any>();

  function handlePress() {
    navigation.navigate(item.route as any);
  }

  useEffect(() => {
    const value = globalPercentage(type);
    setProgress(hasProgress ? value : undefined);
  }, [hasProgress, purification]);

  return (
    <View
      style={{
        ...styles.part,
        backgroundColor: progress !== undefined ? '#ccf3df' : Color.partDefaultBgColor,
      }}
      onTouchStart={handlePress}
    >
      <VStack style={styles.container} spacing={1}>
        <HStack style={GlobalStyles.center}>
          <Image source={item.imageSource} style={{ ...styles.img, marginRight: progress !== undefined ? -96.5 : 0 }} />
          {progress !== undefined && (
            <CircularProgress
              value={progress ?? 0}
              maxValue={100}
              duration={800}
              radius={52}
              valueSuffix={arabic ? '' : '%'}
              valuePrefix={arabic ? '%' : ''}
              progressValueStyle={styles.ps}
              inActiveStrokeColor="#3cb371"
              activeStrokeWidth={9}
              inActiveStrokeWidth={10}
              valuePrefixStyle={styles.vp}
              valueSuffixStyle={styles.vs}
              inActiveStrokeOpacity={0.2}
            />
          )}
        </HStack>
        <Text style={{ fontSize: Font.size(arabic ? 9 : 11), textAlign: 'center', fontFamily: 'Cairo', color: 'teal' }}>
          {formatMessage(item.name)}
        </Text>
        <Text
          style={{
            fontFamily: 'ReemKufiFun',
            fontSize: Font.size(arabic ? 15 : 13),
            textAlign: 'center',
          }}
        >
          {formatMessage(item.description)}
        </Text>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -20,
    width: '95%',
    backfaceVisibility: 'hidden',
  },
  img: {
    width: 90,
    height: 90,
    ...GlobalStyles.circle,
  },
  part: {
    width: SCREEN_WIDTH - 130,
    paddingVertical: 5,
    borderRadius: 25,
    elevation: 6,
  },
  vp: {
    fontSize: 8,
    marginTop: 0,
    marginEnd: 5,
    fontWeight: '900',
    backgroundColor: '#e7e9ebde',
  },
  vs: {
    fontSize: 8,
    marginTop: 0,
    marginEnd: 5,
    fontWeight: '900',
    backgroundColor: '#e7e9ebde',
  },
  ps: {
    marginStart: -6,
    fontWeight: '900',
    color: 'teal',
    marginTop: 0,
    fontSize: 13,
    padding: 1,
    backgroundColor: '#e7e9ebe8',
    borderRadius: 50,
  },
});
