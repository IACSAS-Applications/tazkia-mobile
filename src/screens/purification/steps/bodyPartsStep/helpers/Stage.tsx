import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import Text from '../../../../../components/Text';

import { useEffect, useState } from 'react';
import Restart from '../../../../../components/progress/Restart';
import Start from '../../../../../components/progress/Start';
import ProgressInfos from '../../../../../components/progress/progressStatus/ProgressInfos';
import { ProgressStatus } from '../../../../../components/progress/progressStatus/ProgressStatus';
import HStack from '../../../../../components/stack/HStack';
import VStack from '../../../../../components/stack/VStack';
import { Color } from '../../../../../constants/Color';
import { Font } from '../../../../../constants/Font';
import { isAndroid } from '../../../../../constants/Platform';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { BodyPartType, PurificationStage } from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import useProgress from '../../../../../hooks/use-progress';
import usePurification from '../../../../../hooks/use-purification';
import { TKeys } from '../../../../../locales/constants';
import { arabic } from '../../../../../locales/messages/arabic';
import { useGlobal } from '../../../../../providers/AppProvider';
import { useSnackbar } from '../../../../../providers/SnackbarProvider';
import { PURIFICATION_MAX_DAYS, isCompleted } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import GridButton from '../../../common/GridButton';
import { findStage } from '../common/Helper';

type Props = {
  part: BodyPartType;
  stage: PurificationStage;
  opened: PurificationStage | undefined;
  onStart(stage: PurificationStage): void;
  onOpen(stage: PurificationStage): void;
  onShowRules(stage: PurificationStage): void;
  onRestart(stage: PurificationStage): void;
  onEvaluate(stage: PurificationStage): void;
  onHistory(progress: ProgressLine[]): void;
};
export default function Stage({ part, stage, ...props }: Props) {
  const { formatMessage } = useMessage();
  const { displaySnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const { locale } = useGlobal();
  const { findBodyPart } = usePurification();

  const current = findBodyPart(part);
  const progress = findStage(current, stage);
  const hasProgress = progress !== undefined;
  const progressProps = useProgress(progress, PURIFICATION_MAX_DAYS);
  const cleaning = stage === 'cleaning';
  const iconName = cleaning ? 'allergy' : 'lightbulb-on';
  const iconColor = !progressProps.completed ? Color.flatItemNoneBgColor : cleaning ? '#4b0082' : '#32cd32';

  function handleStart() {
    const canStart = cleaning || (current && isCompleted(current.cleaning, PURIFICATION_MAX_DAYS));
    if (canStart) {
      props.onStart(stage);
    } else {
      displaySnackbar(formatMessage(TKeys.PURIFICATION_BODYPART_ALERT), 'warning');
    }
  }

  function handleRestart() {
    props.onRestart(stage);
  }

  function handleTouch() {
    if (hasProgress) {
      if (!open) {
        props.onOpen(stage);
      }
    } else {
      props.onShowRules(stage);
    }
  }

  function handleClick() {
    if (progressProps.completed) {
      props.onShowRules(stage);
    } else {
      props.onEvaluate(stage);
    }
  }

  function handleHistory() {
    if (progress) {
      props.onHistory(progress);
    }
  }

  useEffect(() => {
    const toOpen = stage === props.opened;
    if (toOpen !== open) {
      setOpen(toOpen);
    }
  }, [props.opened]);

  const showDetails = open || (hasProgress && !progressProps.completed && (!props.opened || props.opened === stage));

  return (
    <View
      style={{
        ...styles.container,
        elevation: showDetails ? 0.5 : 5,
        backgroundColor: showDetails
          ? Color.active
          : hasProgress
          ? progressProps.completed
            ? Color.completed
            : Color.progress
          : Color.noProgress,
      }}
      onTouchStart={handleTouch}
    >
      <HStack style={styles.header}>
        <HStack spacing={10} style={GlobalStyles.center}>
          <Icon name={iconName} size={22} color={Color.flatItemNoneBgColor} />
          <HStack style={styles.stageTitle} spacing={10}>
            <Text
              variant="bodySmall"
              style={{
                paddingTop: 2,
                fontSize: Font.size((showDetails ? 13 : 12) + (arabic ? 3 : 0) - (locale === 'id' ? 4 : 0)),
                color: Color.flatItemNoneBgColor,
                fontFamily: 'Cairo',
                lineHeight: 20,
                flex: 12,
              }}
            >
              {formatMessage(`purification.bodypart.${stage}`)}
            </Text>
            {!showDetails && <Icon name="unfold-more-horizontal" size={20} color="black" />}
          </HStack>
        </HStack>
        <View>
          {!hasProgress ? (
            <Start
              onStart={handleStart}
              disabled={!(cleaning || (current && isCompleted(current.cleaning, PURIFICATION_MAX_DAYS)))}
            />
          ) : (
            <HStack style={GlobalStyles.center} spacing={2}>
              <ProgressStatus
                last={progressProps.lastDay}
                count={progressProps.countProgress}
                maxDays={PURIFICATION_MAX_DAYS}
                completed={progressProps.completed}
                activeStrokeWidth={10}
                valueMarginLeft={2}
                valueMarginRight={-1}
                valuePrefixSize={10}
              />
              {progressProps.completed && <Restart onClick={handleRestart} />}
            </HStack>
          )}
        </View>
      </HStack>
      {showDetails && (
        <View style={styles.footer}>
          <VStack style={GlobalStyles.center} spacing={5}>
            {hasProgress && (
              <HStack spacing={25}>
                <Button
                  mode={progressProps.completed ? 'text' : 'elevated'}
                  icon={() => (
                    <Icon name={progressProps.completed ? 'view-list' : 'check-circle'} size={20} color={iconColor} />
                  )}
                  uppercase={false}
                  style={styles.btn}
                  labelStyle={{ ...styles.btnLabel, color: iconColor }}
                  onTouchStart={handleClick}
                >
                  {formatMessage(
                    progressProps.completed
                      ? `${stage}.bodypart.disciplinary-system`
                      : TKeys.PROGRESS_START_DAILY_EVALUATION,
                  )}
                </Button>
              </HStack>
            )}
            <Divider style={styles.divider} />
            {progressProps.lastDay && (
              <HStack style={GlobalStyles.center} spacing={20}>
                <ProgressInfos
                  progress={progress}
                  lastDay={progressProps.lastDay}
                  countDays={progressProps.countDays}
                  endDate={progressProps.endDate}
                  failed={progressProps.failed}
                  maxDays={PURIFICATION_MAX_DAYS}
                />
                {isAndroid && <GridButton onShow={handleHistory} />}
              </HStack>
            )}
          </VStack>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 20,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 30,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 5,
  },
  stageTitle: {
    alignContent: 'stretch',
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: '900',
    width: SCREEN_WIDTH - 160,
    paddingTop: 2,
  },
  footer: { paddingVertical: 2 },
  divider: { backgroundColor: '#2e8b57', width: '100%', marginVertical: 5 },
  btnLabel: { fontWeight: '900', fontSize: Font.size(15) },
  btn: { paddingVertical: 4, backgroundColor: '#fffafa' },
});
