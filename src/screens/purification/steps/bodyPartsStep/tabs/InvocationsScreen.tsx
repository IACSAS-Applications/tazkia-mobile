import { Image, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import InvocationGoodManners from '../../../../../components/InvocationGoodManners';
import Text from '../../../../../components/Text';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import VStack from '../../../../../components/stack/VStack';
import { Color } from '../../../../../constants/Color';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import InvocationAccordion from '../../../common/InvocationAccordion';
import { purificationStyles } from '../../../common/Style';

export default function InvocationsScreen() {
  const { formatMessage } = useMessage();

  return (
    <ScrollViewLayout style={styles.root}>
      <Text variant="bodyMedium" style={styles.title}>
        {formatMessage(TKeys.INVOCATION_STEP_1)}
      </Text>
      <List.AccordionGroup>
        <InvocationAccordion id={1} titleKey={TKeys.INVOCATION_STEP_1_RULE_1_SUMMARY} duration={15}>
          <VStack spacing={10}>
            <Text variant="bodyMedium" style={styles.body}>
              {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_BODY)}
            </Text>
            <Text variant="bodyMedium" style={GlobalStyles.justify}>
              {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_DESC)}
            </Text>
            <VStack spacing={15}>
              <Text variant="bodySmall" style={styles.croyance}>
                {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_CROYANCE_1)}
              </Text>
              <Text variant="bodySmall" style={styles.croyance}>
                {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_CROYANCE_2)}
              </Text>
              <Text variant="bodySmall" style={styles.croyance}>
                {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_CROYANCE_3)}
              </Text>
            </VStack>
          </VStack>
        </InvocationAccordion>
        <InvocationAccordion id={2} titleKey={TKeys.INVOCATION_STEP_1_RULE_2} duration={15}>
          <Text variant="bodyMedium" style={GlobalStyles.justify}>
            {formatMessage(TKeys.INVOCATION_STEP_1_RULE_2_DESC)}
          </Text>
        </InvocationAccordion>
        <InvocationAccordion id={3} titleKey={TKeys.INVOCATION_STEP_1_RULE_3} duration={10}>
          <VStack spacing={10}>
            <Text variant="bodyMedium" style={GlobalStyles.justify}>
              {formatMessage(TKeys.INVOCATION_STEP_1_RULE_3_DESC)}
            </Text>
            <Image
              source={require('../../../../../../assets/img/purification/soul/mourakaba.png')}
              style={styles.image}
            />
          </VStack>
        </InvocationAccordion>
      </List.AccordionGroup>
      <InvocationGoodManners />
    </ScrollViewLayout>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: Color.backgroundColor, flex: 1 },
  title: { ...purificationStyles.title, color: 'seagreen' },
  body: { fontWeight: '900', textAlign: 'justify', color: 'seagreen' },
  croyance: { textAlign: 'justify', fontWeight: '700', color: '#ff6347' },
  image: { width: SCREEN_WIDTH - 100, aspectRatio: 1, borderRadius: 40 },
});
