import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { Color } from '../../../constants/Color';
import { Font } from '../../../constants/Font';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';
import Text from '../../Text';
import HStack from '../../stack/HStack';

export type ReaderItemProps = {
  index: number;
  value: InvocationRepeat;
  total: number;
  onCompleted(): void;
};
export default function ReaderItem({ index, total, value, ...props }: ReaderItemProps) {
  const [count, setCount] = useState(0);
  const { formatMessage } = useMessage();
  const offset = useSharedValue(0);
  const countStyle = useAnimatedStyle(() => ({ transform: [{ translateY: offset.value }] }));
  const last = index === total + 1;

  function handlePress() {
    if (value.repeat > 1) {
      offset.value = withSequence(withTiming(50), withTiming(5));
    }

    const next = count + 1;
    setCount(next === value.repeat ? 0 : next);

    if (next === value.repeat) {
      props.onCompleted();
    }
  }

  if (count === value.repeat) {
    return <></>;
  }

  return (
    <View
      style={{ ...styles.touchable, backgroundColor: last ? Color.partProgressBgColor : Color.partDefaultBgColor }}
      onTouchStart={handlePress}
    >
      <Text
        variant="titleMedium"
        style={{
          ...styles.summary,
          color: last ? Color.idProgressColor : 'black',
          lineHeight: 30,
          fontSize: Font.size(index < 39 ? 20 : 18),
        }}
      >
        {formatMessage(value.key)}
      </Text>
      {!last && (
        <View style={styles.footer}>
          <HStack style={GlobalStyles.spaceBetween}>
            <Text style={{ ...styles.tag, backgroundColor: Color.tagGreenLight }}>{`${index}/${total}`}</Text>
            {count > 0 && value.repeat > 1 && (
              <View style={[GlobalStyles.center, countStyle]}>
                <Avatar.Text
                  label={count.toString()}
                  size={40}
                  style={styles.counter}
                  labelStyle={styles.counterLabel}
                />
              </View>
            )}
            <Text style={{ ...styles.tag, backgroundColor: Color.completed }}>
              {formatMessage(value.repeat > 1 ? TKeys.TIMES_COUNT_PLURAL : TKeys.TIMES_COUNT, {
                times: value.repeat,
              })}
            </Text>
          </HStack>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  progress: { height: 10 },
  touchable: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  summary: {
    ...GlobalStyles.center,
    textAlign: 'justify',
    marginHorizontal: 10,
    paddingTop: 5,
  },
  tag: {
    ...GlobalStyles.circle,
    fontSize: Font.size(15),
    paddingHorizontal: 15,
    marginHorizontal: 0,
    alignSelf: 'center',
    fontWeight: '800',
  },
  footer: {
    marginHorizontal: 1,
    position: 'absolute',
    justifyContent: 'center',
    top: 5,
    flex: 1,
    height: 35,
    width: '90%',
  },
  counter: {
    backgroundColor: 'teal',
  },
  counterLabel: { fontWeight: '800' },
});
