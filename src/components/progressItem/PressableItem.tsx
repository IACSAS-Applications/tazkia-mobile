import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { PrimitiveType } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Avatar, TouchableRipple } from 'react-native-paper';
import Animated, { FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated';
import { Font } from '../../constants/Font';
import { SCREEN_WIDTH } from '../../constants/Screen';
import { useMessage } from '../../hooks/use-message';
import GlobalStyles from '../../styles/GlobalStyles';
import SegmentedProgress from '../segmented/SegmentedProgress';
import Text from './../Text';
import HStack from './../stack/HStack';
import VStack from './../stack/VStack';

type Props = {
  index: number;
  stepTitle: string;
  partTitleSize?: number;
  summaryKey: string;
  stepTitleSize: number;
  stepTitleWidth: number;
  summaryKeyProps?: Record<string, PrimitiveType>;
  subSummaryKey?: string;
  subSummaryProps?: Record<string, PrimitiveType>;
  subSummarySize?: number;
  inProgress: boolean;
  percentage: number;
  flexBasis?: number;
  progress?: string[];
  circularProgressRadius?: number;
  onPress(index: number): void;
};

function PressableItem(props: Props) {
  const { formatMessage } = useMessage();
  const completed = props.percentage === 100;

  return (
    <Animated.View entering={FadeInUp.delay(100 * props.index + 1)} style={{ marginBottom: 7 }}>
      <TouchableRipple onPress={() => props.onPress(props.index + 1)}>
        <HStack
          style={{
            ...styles.part,
            flexBasis: props.flexBasis,
            backgroundColor: props.inProgress ? (completed ? '#8de0b6' : '#dbf6e8') : '#f5fffa',
            minHeight: 40,
          }}
        >
          <Avatar.Text
            size={Font.size(30)}
            label={props.stepTitle}
            color="seagreen"
            labelStyle={{ fontSize: Font.size(props.stepTitleSize), fontWeight: '900' }}
            style={{
              ...styles.partNumber,
              backgroundColor: completed ? '#dffcef' : props.inProgress ? 'white' : '#c5f5c5',
              width: props.stepTitleWidth,
            }}
          />
          <VStack>
            <VStack spacing={2} center>
              <Text
                variant="bodyMedium"
                style={{
                  ...styles.partTitle,
                  fontSize: Font.size(props.partTitleSize ?? 12),
                }}
              >
                {formatMessage(props.summaryKey, props.summaryKeyProps)}
              </Text>
              {props.subSummaryKey && (
                <Animated.Text
                  entering={FadeInDown.delay(270 * props.index + 1)}
                  style={{ ...styles.partSubTitle, fontSize: Font.size(props.subSummarySize ?? 10) }}
                >
                  {formatMessage(props.subSummaryKey, props.subSummaryProps)}
                </Animated.Text>
              )}
            </VStack>
            <View style={{ paddingTop: 2 }}>
              <SegmentedProgress progress={props.progress} />
            </View>
          </VStack>
          {props.inProgress && (
            <Animated.View
              entering={FadeInLeft.delay(400).duration(300).springify().stiffness(300)}
              style={styles.partProgress}
            >
              {completed ? (
                <Icon name="check-all" size={25} color="seagreen" style={{ marginRight: 8 }} />
              ) : (
                <CircularProgress
                  value={props.percentage}
                  maxValue={100}
                  duration={600}
                  radius={props.circularProgressRadius}
                  valueSuffix="%"
                  inActiveStrokeColor={'#3cb371'}
                  inActiveStrokeOpacity={0.2}
                  progressValueStyle={styles.progress}
                />
              )}
            </Animated.View>
          )}
        </HStack>
      </TouchableRipple>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  partNumber: { left: 6, position: 'absolute', elevation: 1 },
  partProgress: { right: 5, position: 'absolute', fontSize: 30 },
  partTitle: { fontWeight: '900', textAlign: 'center', width: SCREEN_WIDTH - 150 },
  partSubTitle: { fontWeight: '700', color: '#708090', marginTop: -3 },
  progress: { color: 'green', fontWeight: '700', fontSize: 11 },
  part: {
    ...GlobalStyles.center,
    elevation: 6,
    borderRadius: 45,
    width: SCREEN_WIDTH - 8,
  },
});

export default PressableItem;
