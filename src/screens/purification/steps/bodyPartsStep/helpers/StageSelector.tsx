import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOutDown } from 'react-native-reanimated';
import Text from '../../../../../components/Text';
import ConfirmRestartDialog, { ConfirmRestartDialogRef } from '../../../../../components/dialogs/ConfirmRestartDialog';
import ProgressDialog, { ProgressDialogRef } from '../../../../../components/dialogs/ProgressDialog';
import VStack from '../../../../../components/stack/VStack';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { BodyPartType, PurificationStage } from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import { PURIFICATION_MAX_DAYS } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { findPartImageSource } from '../common/Helper';
import Stage from './Stage';
import RulesDialog, { RulesDialogRef } from './rules/RulesDialog';

type Props = {
  part: BodyPartType | undefined;
  onStart(stage: PurificationStage): void;
  onRestart(stage: PurificationStage): void;
  onEvaluate(stage: PurificationStage, errors: number[]): void;
};
export default function StageSelector({ part, ...props }: Props) {
  const stageRef = useRef<PurificationStage>();
  const rulesDialogRef = useRef<RulesDialogRef>(null);
  const restartRef = useRef<ConfirmRestartDialogRef>(null);
  const progressDialogRef = useRef<ProgressDialogRef>(null);
  const { formatMessage } = useMessage();
  const [openedStage, setOpenedStage] = useState<PurificationStage>();
  const imageSource = findPartImageSource(part);

  function handleOpen(stage: PurificationStage) {
    setOpenedStage(stage);
  }

  function handleShowRules(stage: PurificationStage) {
    if (part) {
      rulesDialogRef.current?.show(part, stage);
    }
  }

  function handleShowEvaluate(stage: PurificationStage) {
    if (part) {
      rulesDialogRef.current?.evaluate(part, stage);
    }
  }

  function handleRestart(stage: PurificationStage) {
    stageRef.current = stage;
    restartRef.current?.open();
  }

  const handleEvaluate = useCallback(
    (errors: number[]) => {
      if (openedStage) {
        props.onEvaluate(openedStage, errors);
      }
    },
    [openedStage],
  );

  function handleConfirm(confirm: boolean) {
    if (confirm && stageRef.current) {
      props.onRestart(stageRef.current);
      setOpenedStage(undefined);
    }
    restartRef.current?.close();
  }

  const handleHistory = useCallback(
    (progress: ProgressLine[]) => {
      if (openedStage && part) {
        progressDialogRef.current?.open(
          formatMessage(`purification.body-parts.${part}`),
          undefined,
          formatMessage(`purification.bodypart.${openedStage}`),
          progress,
          PURIFICATION_MAX_DAYS,
        );
      }
    },
    [openedStage],
  );

  if (!part) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <VStack style={styles.header} spacing={2}>
        {imageSource && (
          <Animated.Image source={imageSource} entering={FadeIn} exiting={FadeOutDown} style={styles.image} />
        )}
        <Text style={styles.partName}>{formatMessage(`purification.body-parts.${part}`)}</Text>
      </VStack>
      <VStack spacing={10}>
        {['cleaning', 'enlightenment'].map((stage, index) => (
          <Stage
            key={index}
            part={part}
            stage={stage as any}
            opened={openedStage}
            onStart={props.onStart}
            onOpen={handleOpen}
            onShowRules={handleShowRules}
            onRestart={handleRestart}
            onEvaluate={handleShowEvaluate}
            onHistory={handleHistory}
          />
        ))}
      </VStack>
      <RulesDialog ref={rulesDialogRef} onEvaluate={handleEvaluate} />
      <ConfirmRestartDialog ref={restartRef} onConfirm={handleConfirm} />
      <ProgressDialog ref={progressDialogRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    width: SCREEN_WIDTH,
    paddingBottom: 30,
  },
  header: {
    paddingVertical: 5,
  },
  image: {
    ...GlobalStyles.circle,
    width: 90,
    height: 90,
  },
  partName: { ...GlobalStyles.center, fontFamily: 'ReemKufiFun', lineHeight: 30, fontSize: 20 },
});
