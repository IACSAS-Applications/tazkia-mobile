import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { PrimitiveType } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Avatar } from 'react-native-paper';
import { Color } from '../../constants/Color';
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
  arabic?: boolean;
  circularProgressRadius?: number;
  onPress(index: number): void;
};

function PressableItem({ inProgress, ...props }: Props) {
  const { formatMessage } = useMessage();
  const completed = props.percentage === 100;
  const speed = 150;
  const id = props.index + 1;

  return (
    <View style={{ marginBottom: 7 }} onTouchEnd={() => props.onPress(props.index + 1)}>
      <HStack
        style={{
          ...styles.part,
          flexBasis: props.flexBasis,
          backgroundColor: inProgress ? (completed ? '#8de0b6' : '#ccf3df') : 'white',
        }}
      >
        <Avatar.Text
          size={Font.size(30)}
          label={props.stepTitle}
          color={inProgress ? Color.idProgressColor : Color.idDefaultColor}
          labelStyle={{ fontSize: Font.size(props.stepTitleSize), fontWeight: '900' }}
          style={{
            ...styles.partNumber,
            backgroundColor: completed
              ? Color.idCompletedBgColor
              : inProgress
              ? Color.idProgressBgColor
              : Color.idDefaultBgColor,
            width: props.stepTitleWidth,
          }}
        />
        <VStack
          style={{
            ...GlobalStyles.center,
            flex: 4,
          }}
        >
          <VStack spacing={0} center>
            <Text
              variant="bodySmall"
              style={{
                ...styles.partTitle,
                fontSize: Font.size(props.partTitleSize ?? 10),
                paddingEnd: 5,
              }}
            >
              {formatMessage(props.summaryKey, props.summaryKeyProps)}
            </Text>
            {props.subSummaryKey && (
              <Text style={{ ...styles.partSubTitle, fontSize: Font.size(props.subSummarySize ?? 10) }}>
                {formatMessage(props.subSummaryKey, props.subSummaryProps)}
              </Text>
            )}
          </VStack>
          <View style={{ paddingTop: 4 }}>
            <SegmentedProgress progress={props.progress} />
          </View>
        </VStack>
        <HStack style={GlobalStyles.center}>
          <View style={{ width: (props.circularProgressRadius ?? 0) * 2 }}>
            {inProgress && (
              <View>
                {completed ? (
                  <Icon name="check-all" size={25} color="seagreen" style={{ marginRight: 8 }} />
                ) : (
                  <CircularProgress
                    value={props.percentage}
                    maxValue={100}
                    duration={600}
                    radius={props.circularProgressRadius}
                    valueSuffix={props.arabic ? '' : '%'}
                    valuePrefix={props.arabic ? '%' : ''}
                    inActiveStrokeColor={'#3cb371'}
                    inActiveStrokeOpacity={0.2}
                    activeStrokeWidth={5}
                    inActiveStrokeWidth={5}
                    valuePrefixStyle={{ marginRight: -4, marginLeft: 2, fontSize: 7, marginTop: -3 }}
                    valueSuffixStyle={{ marginLeft: -2, marginRight: 5 }}
                    progressValueStyle={styles.progress}
                  />
                )}
              </View>
            )}
          </View>
          <Icon name="unfold-more-horizontal" size={20} />
        </HStack>
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  partNumber: { elevation: 1 },
  partTitle: { fontFamily: 'Cairo', textAlign: 'center', paddingTop: 2 },
  partSubTitle: { fontWeight: '700', color: '#708090', marginTop: -3 },
  progress: { color: 'green', fontWeight: '700', fontSize: 10 },
  part: {
    elevation: 6,
    borderRadius: 45,
    width: SCREEN_WIDTH - 8,
    alignContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    paddingStart: 5,
    paddingEnd: 7,
    paddingVertical: 8,
  },
});

export default PressableItem;
