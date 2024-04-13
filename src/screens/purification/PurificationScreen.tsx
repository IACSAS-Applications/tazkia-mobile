import { lowerFirst } from 'lodash';
import { useMemo, useRef, useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import Text from '../../components/Text';
import SimpleDialog, { SimpleDialogRef } from '../../components/dialogs/SimpleDialog';
import HStack from '../../components/stack/HStack';
import VStack from '../../components/stack/VStack';
import { Color } from '../../constants/Color';
import { Font } from '../../constants/Font';
import { PurificationType } from '../../domains/purification/Purification';
import { useMessage } from '../../hooks/use-message';
import usePurification from '../../hooks/use-purification';
import { TKeys } from '../../locales/constants';
import { PURIFICATION_MAX_DAYS, progressPercentage2 } from '../../services/Helpers';
import GlobalStyles from '../../styles/GlobalStyles';
import { Part, actions, purificationStages } from './common/Helper';
import PressableProgress from './common/PressableProgress';

export default function PurificationScreen() {
  const ref = useRef<SimpleDialogRef>(null);
  const { formatMessage } = useMessage();
  const [open, setOpen] = useState<boolean>(false);
  const { purification, hasProgress } = usePurification();
  const parts: Part[] = useMemo(() => purificationStages, []);
  const actionKeys: Record<string, TKeys | TKeys[]> = useMemo(() => actions, []);

  function handleAction(key: TKeys) {
    ref.current?.open(actionKeys[key], key);
  }

  function handeSendReport() {
    let report = '';
    if (purification) {
      report = `*My mensual report :* \n\n\n`;
      const bodyParts = purification.bodyParts;
      if (bodyParts.length > 0) {
        report = `${report}*> ${formatMessage(TKeys.PURIFICATION_BODYPART_TITLE)} :*\n\n`;
        bodyParts.forEach((part, index) => {
          report = `${report}*${index + 1}. ${formatMessage(`purification.body-parts.${part.name}`)} :*\n`;
          if (part.cleaning) {
            report = `${report}- _${formatMessage(`purification.bodypart.cleaning`)}_ : ${progressPercentage2(
              part.cleaning,
              PURIFICATION_MAX_DAYS,
            )} %\n`;
          }
          if (part.enlightenment) {
            report = `${report}- _${formatMessage(`purification.bodypart.enlightenment`)}_ : ${progressPercentage2(
              part.enlightenment,
              PURIFICATION_MAX_DAYS,
            )} %\n`;
          }
          report = `${report}\n`;
        });
      }
      const minds = purification.mind;
      if (minds.length > 0) {
        report = `\n\n${report}*> ${formatMessage(TKeys.PURIFICATION_MIND_TITLE)} :*\n\n`;
        minds.forEach((mind) => {
          report = `${report}*- ${formatMessage(TKeys.LEVEL, {
            value: mind.level,
          })} :* ${progressPercentage2(mind.progress, PURIFICATION_MAX_DAYS)} %\n`;
        });
      }
    }
    Linking.openURL(`whatsapp://send?text=${encodeURIComponent(report)}&phone=+33610680003`);
  }

  return (
    <>
      <VStack style={styles.container} spacing={15}>
        <VStack style={styles.top} spacing={2}>
          <HStack style={GlobalStyles.center} spacing={2}>
            <Text style={styles.title}>
              {formatMessage(TKeys.PURIFICATION_TITLE)}
              {' : '}
            </Text>
            <Text style={styles.title}>{formatMessage(TKeys.PURIFICATION_TITLE_SUB)}</Text>
          </HStack>
          <Text style={styles.sourat}>{formatMessage(TKeys.SOURAT_A3LA)}</Text>
        </VStack>
        <VStack spacing={17}>
          {parts.map((item: Part, index: number) => (
            <PressableProgress
              key={index}
              item={item}
              index={index}
              hasProgress={hasProgress(lowerFirst(item.route) as PurificationType)}
            />
          ))}
        </VStack>
      </VStack>
      <FAB.Group
        open={open}
        icon={open ? 'window-close' : 'view-list'}
        actions={[
          {
            icon: 'gift',
            label: formatMessage(TKeys.DEDICATION),
            size: 'small',
            labelStyle: styles.action,
            onPress: () => handleAction(TKeys.DEDICATION),
          },
          {
            icon: 'script-text',
            label: formatMessage(TKeys.GENERAL_PRESENTATION_TITLE),
            labelStyle: styles.action,
            size: 'small',
            onPress: () => handleAction(TKeys.GENERAL_PRESENTATION_TITLE),
          },
          {
            icon: 'timeline-clock',
            label: formatMessage(TKeys.INVOCATION_NIVEAU_TITLE),
            labelStyle: styles.action,
            size: 'small',
            onPress: () => handleAction(TKeys.INVOCATION_NIVEAU_TITLE),
          },
          {
            icon: 'tag-arrow-down',
            label: formatMessage(TKeys.SUNNAHS_DESCRIPTION),
            labelStyle: styles.action,
            size: 'small',
            onPress: () => handleAction(TKeys.SUNNAHS_DESCRIPTION),
          },
          {
            icon: 'seal-variant',
            label: formatMessage(TKeys.CONCLUSION),
            labelStyle: styles.action,
            size: 'small',
            onPress: () => handleAction(TKeys.CONCLUSION),
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
        visible={true}
        variant="primary"
        fabStyle={{ ...GlobalStyles.center, width: 45, aspectRatio: 1 }}
        style={styles.fab}
      />
      <SimpleDialog ref={ref} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: Color.backgroundColor,
  },
  top: {
    ...GlobalStyles.center,
    marginTop: -20,
  },
  title: {
    color: 'black',
    fontSize: Font.size(17),
    fontFamily: 'ReemKufiFun',
  },
  sourat: {
    textAlign: 'center',
    fontSize: Font.size(12),
    fontFamily: 'AmiriQuran',
    color: 'seagreen',
    backgroundColor: '#66cdaa0d',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    opacity: 0.9,
    lineHeight: 19,
  },
  fab: { right: -5, bottom: -5, position: 'absolute' },
  action: { fontSize: 20, fontFamily: 'ReemKufiFun', textShadowRadius: 5, lineHeight: 25 },
});
