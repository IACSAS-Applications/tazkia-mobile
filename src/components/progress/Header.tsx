import { PrimitiveType } from 'react-intl';
import { StyleSheet } from 'react-native';
import { Font } from '../../constants/Font';
import { SCREEN_WIDTH } from '../../constants/Screen';
import ProgressLine from '../../domains/common/ProgressLine';
import { useMessage } from '../../hooks/use-message';
import { useGlobal } from '../../providers/AppProvider';
import GlobalStyles from '../../styles/GlobalStyles';
import Text from '../Text';
import HStack from '../stack/HStack';
import VStack from '../stack/VStack';
import Restart from './Restart';
import { ProgressStatus } from './progressStatus/ProgressStatus';

type Props = {
  titleKey: string;
  hasProgress: boolean;
  completed: boolean;
  maxDays: number;
  countProgress: number;
  lastDay: ProgressLine | undefined;
  titleKeyParams?: Record<string, PrimitiveType>;
  subTitleKey?: string;
  onRestart(): void;
};
export default function Header({ hasProgress, ...props }: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useGlobal();
  return (
    <HStack
      style={{
        ...styles.status,
        justifyContent: hasProgress ? 'space-between' : 'center',
      }}
    >
      <VStack style={{ ...GlobalStyles.center, width: SCREEN_WIDTH - (hasProgress ? 125 : 10) }}>
        <Text
          variant="bodyLarge"
          style={{
            fontWeight: '900',
            fontSize: Font.size(arabic ? 18 : 16),
            textAlign: hasProgress ? 'auto' : 'center',
            maxWidth: SCREEN_WIDTH - (hasProgress ? 150 : 0),
            color: 'teal',
          }}
        >
          {formatMessage(props.titleKey, props.titleKeyParams)}
        </Text>
        {props.subTitleKey && (
          <Text
            variant="bodySmall"
            style={{
              textAlign: hasProgress ? 'auto' : 'center',
              fontSize: Font.size(arabic ? 14 : 12),
            }}
          >
            {formatMessage(props.subTitleKey)}
          </Text>
        )}
      </VStack>
      <HStack style={GlobalStyles.center}>
        {props.completed && <Restart onClick={props.onRestart} />}
        {hasProgress && (
          <ProgressStatus
            last={props.lastDay}
            count={props.countProgress}
            maxDays={props.maxDays}
            completed={props.completed}
            activeStrokeWidth={8}
            valueMarginRight={-1}
            valueMarginLeft={2}
          />
        )}
      </HStack>
    </HStack>
  );
}

const styles = StyleSheet.create({
  status: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'stretch',
    alignSelf: 'stretch',
    verticalAlign: 'middle',
  },
});
