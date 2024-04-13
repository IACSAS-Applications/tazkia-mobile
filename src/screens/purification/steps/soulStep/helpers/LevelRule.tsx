import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Text from '../../../../../components/Text';
import Restart from '../../../../../components/progress/Restart';
import RuleProgress from '../../../../../components/progress/RuleProgress';
import Start from '../../../../../components/progress/Start';
import { ProgressStatus } from '../../../../../components/progress/progressStatus/ProgressStatus';
import HStack from '../../../../../components/stack/HStack';
import { Color } from '../../../../../constants/Color';
import { Font } from '../../../../../constants/Font';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { SoulPart, SoulPartLevel, soulRules } from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import useProgress from '../../../../../hooks/use-progress';
import usePurification from '../../../../../hooks/use-purification';
import { TKeys } from '../../../../../locales/constants';
import { useSnackbar } from '../../../../../providers/SnackbarProvider';
import { PURIFICATION_MAX_DAYS, isCompleted } from '../../../../../services/Helpers';

type Props = {
  part: SoulPart;
  index: number;
  levelKey: TKeys;
  opened: number | undefined;
  onSelect(level: number): void;
  onTouch(level: number): void;
  onRestart(): void;
  onEvaluate(part: SoulPart, level: number, checked: boolean): void;
  onHistory(progress: ProgressLine[], level: SoulPartLevel): void;
};

export default function LevelRule({ part, index, levelKey, ...props }: Props) {
  const { formatMessage } = useMessage();
  const [open, setOpen] = useState(false);
  const { findSoul } = usePurification();
  const { displaySnackbar } = useSnackbar();
  const current = findSoul(part, index as any);
  const progress = findSoulLevel();
  const progressProps = useProgress(progress, PURIFICATION_MAX_DAYS);

  function findSoulLevel(): ProgressLine[] | undefined {
    if (!current) {
      return undefined;
    }
    return current.partProgress.find((item) => item.level === index)?.progress;
  }

  function handleStart() {
    // Check if we can start start this level
    const value = findSoul(part);
    if (value) {
      const lastLevel = value.partProgress.at(value.partProgress.length - 1);
      if (lastLevel) {
        if (!isCompleted(lastLevel.progress, PURIFICATION_MAX_DAYS)) {
          displaySnackbar(formatMessage(TKeys.PURIFICATION_RULE_1, { level: lastLevel.level }), 'warning');
          return;
        }
        if (lastLevel.level !== index - 1 && lastLevel.level != soulRules[part].length) {
          displaySnackbar(formatMessage(TKeys.PURIFICATION_RULE_2, { level: lastLevel.level + 1 }), 'warning');
          return;
        }
      }
    }
    props.onSelect(index);
  }

  function handleTouch() {
    props.onTouch(index);
  }

  function handleEvaluate(checked: boolean) {
    props.onEvaluate(part, index, checked);
  }

  function handleHistory() {
    if (progress) {
      props.onHistory(progress, index as SoulPartLevel);
    }
  }

  function radius() {
    return current ? 30 : 20;
  }

  useEffect(() => {
    const toOpen = index === props.opened;
    if (toOpen !== open) {
      setOpen(toOpen);
    }
  }, [props.opened]);

  const showDetails = open || (progress && !progressProps.completed && (!props.opened || props.opened === index));

  return (
    <TouchableRipple
      onPress={handleTouch}
      style={{
        ...styles.container,
        borderBottomLeftRadius: current ? 30 : showDetails ? 15 : radius(),
        borderBottomRightRadius: current ? 30 : showDetails ? 15 : radius(),
        borderTopLeftRadius: radius(),
        borderTopRightRadius: radius(),
        backgroundColor: showDetails
          ? Color.active
          : current
          ? progressProps.completed
            ? Color.completed
            : Color.progress
          : Color.noProgress,
      }}
    >
      <View style={{ padding: 0, margin: 0 }}>
        <HStack style={styles.header}>
          <HStack spacing={10}>
            {!showDetails && <Icon name="unfold-more-horizontal" size={22} color="teal" />}
            <Text
              variant="bodyLarge"
              style={{
                ...styles.levelTitle,
                fontSize: Font.size(showDetails ? 16 : 14),
                paddingEnd: showDetails ? 14 : 0,
              }}
            >
              {formatMessage(TKeys.LEVEL, { value: index })}
            </Text>
          </HStack>
          <View>
            {!current ? (
              <Start onStart={handleStart} />
            ) : (
              <HStack>
                <ProgressStatus
                  last={progressProps.lastDay}
                  count={progressProps.countProgress}
                  maxDays={PURIFICATION_MAX_DAYS}
                  completed={progressProps.completed}
                  valueMarginRight={-2}
                  valueMarginLeft={-4}
                />
                {progressProps.completed && <Restart onClick={props.onRestart} />}
              </HStack>
            )}
          </View>
        </HStack>
        {showDetails && (
          <RuleProgress
            {...progressProps}
            summaryKey={levelKey}
            progress={progress}
            maxDays={PURIFICATION_MAX_DAYS}
            onEvaluate={handleEvaluate}
            onHistory={handleHistory}
          />
        )}
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 10,
    elevation: 4,
    padding: 0,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    padding: 5,
  },
  levelTitle: { fontFamily: 'ReemKufiFun', color: 'teal' },
});
