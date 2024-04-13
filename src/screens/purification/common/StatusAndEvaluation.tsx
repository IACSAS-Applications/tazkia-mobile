import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import Text from '../../../components/Text';
import ProgressInfos from '../../../components/progress/progressStatus/ProgressInfos';
import HStack from '../../../components/stack/HStack';
import { Font } from '../../../constants/Font';
import { isAndroid } from '../../../constants/Platform';
import ProgressLine from '../../../domains/common/ProgressLine';
import { useMessage } from '../../../hooks/use-message';
import { ProgressProps } from '../../../hooks/use-progress';
import { TKeys } from '../../../locales/constants';
import { useGlobal } from '../../../providers/AppProvider';
import GlobalStyles from '../../../styles/GlobalStyles';
import GridButton from './GridButton';

type Props = ProgressProps & {
  align: 'center' | 'space-between';
  progress: ProgressLine[] | undefined;
  maxDays: number;
  onEvaluate(): void;
  onHistory(): void;
};
export default function StatusAndEvaluation(props: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useGlobal();

  return (
    <HStack style={{ ...styles.progress, alignContent: props.align, justifyContent: props.align }}>
      {props.lastDay && (
        <ProgressInfos
          progress={props.progress}
          lastDay={props.lastDay}
          countDays={props.countDays}
          endDate={props.endDate}
          failed={props.failed}
          maxDays={props.maxDays}
        />
      )}
      <View style={{ ...GlobalStyles.center, flexDirection: arabic ? 'row' : 'column', gap: 3 }}>
        {!props.completed && (
          <Button
            mode="elevated"
            compact
            icon={() => <Icon name="check-circle" size={15} color="seagreen" />}
            uppercase={false}
            style={styles.evalBtn}
            onTouchStart={props.onEvaluate}
          >
            <Text
              variant="titleSmall"
              style={{ fontWeight: '500', fontSize: Font.size(arabic ? 15 : 11), color: 'seagreen' }}
            >
              {formatMessage(TKeys.PROGRESS_START_DAILY_EVALUATION)}
            </Text>
          </Button>
        )}
        {isAndroid && <GridButton small={!arabic} onShow={props.onHistory} />}
      </View>
    </HStack>
  );
}

const styles = StyleSheet.create({
  progress: {
    paddingHorizontal: 15,
    paddingTop: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  evalBtn: { elevation: 8, paddingVertical: 4 },
});
