import { useEffect, useState } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import Text from '../../../../../components/Text';
import { ProgressStatus } from '../../../../../components/progress/progressStatus/ProgressStatus';
import { Color } from '../../../../../constants/Color';
import { Font } from '../../../../../constants/Font';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import BodyPart, { BodyPartType, PurificationStage } from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import useProgress from '../../../../../hooks/use-progress';
import usePurification from '../../../../../hooks/use-purification';
import { TKeys } from '../../../../../locales/constants';
import { useGlobal } from '../../../../../providers/AppProvider';
import { PURIFICATION_MAX_DAYS } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { findStage, isFullyCompleted } from '../common/Helper';

interface BodyPartItemProps {
  id: number;
  part: BodyPartType;
  selected: BodyPartType | undefined;
  imageSource: ImageSourcePropType;
  onPress: (part: BodyPartType) => void;
}
export default function BodyPartItem({ id, part, imageSource, ...props }: BodyPartItemProps) {
  const { formatMessage } = useMessage();
  const { arabic } = useGlobal();
  const { purification, findBodyPart } = usePurification();

  const [current, setCurrent] = useState<BodyPart | undefined>(findBodyPart(part));
  const inProgress = current !== undefined;
  const completed = inProgress && isFullyCompleted(current);
  const backgroundColor = inProgress ? (completed ? '#8de0b6' : '#ccf3df') : '#f5fffa';
  const fadeSpeed = 200 * id;

  const statusOf = (stage: PurificationStage) => {
    const progress = findStage(current, stage);
    const progressProps = useProgress(progress, PURIFICATION_MAX_DAYS);
    return (
      <ProgressStatus
        last={progressProps.lastDay}
        count={progressProps.countProgress}
        maxDays={PURIFICATION_MAX_DAYS}
        completed={progressProps.completed}
        radius={14}
        progressValueFontSize={8}
        activeStrokeWidth={3}
        hideRepeat
      />
    );
  };

  useEffect(() => {
    setCurrent(findBodyPart(part));
  }, [props.selected, purification]);

  const labelVariant = `label${arabic ? 'Large' : 'Small'}`;
  const stageStyle = { color: 'black', fontSize: arabic ? 12 : 7, paddingHorizontal: arabic ? 2 : 0 };
  const space = arabic ? 15 : 1;

  return (
    <View style={{ ...styles.container, backgroundColor }} onTouchStart={() => props.onPress(part)}>
      <Avatar.Image size={50} style={styles.typeAvatar} source={imageSource} />
      <Avatar.Text
        size={25}
        style={{ ...styles.idAvatar, backgroundColor: completed ? '#dffcef' : inProgress ? 'white' : '#c5f5c5' }}
        labelStyle={{ fontSize: Font.size(12), fontWeight: '900' }}
        color="seagreen"
        label={id.toString()}
      />
      <Text
        variant="bodyMedium"
        style={{
          ...styles.partName,
          color: completed ? Color.flatItemNoneBgColor : 'black',
          fontSize: arabic ? 16 : 13,
        }}
      >
        {formatMessage(`purification.body-parts.${part}`)}
      </Text>

      {inProgress && (
        <>
          {current.enlightenment && (
            <View style={[styles.stage, { right: space }]}>
              <Text variant={labelVariant as any} style={stageStyle}>
                {formatMessage(TKeys.BUTTON_ENLIGHTENMENT)}
              </Text>
              {statusOf('enlightenment')}
            </View>
          )}
          {current.cleaning && (
            <View style={[styles.stage, { left: space }]}>
              <Text variant={labelVariant as any} style={stageStyle}>
                {formatMessage(TKeys.BUTTON_CLEANING)}
              </Text>
              {statusOf('cleaning')}
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.center,
    width: (SCREEN_WIDTH - 20) / 2,
    height: 97,
    borderRadius: 30,
    elevation: 6,
  },
  id: { fontWeight: 'bold' },
  partName: { fontFamily: 'ReemKufiFun', marginTop: 3, lineHeight: 30 },
  typeAvatar: { marginTop: -16 },
  idAvatar: { marginTop: -8, backgroundColor: 'red' },
  stage: {
    ...GlobalStyles.center,
    position: 'absolute',
    top: 36,
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  text: { color: 'teal' },
});
