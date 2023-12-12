import Text from '../../../../components/Text';
import VStack from '../../../../components/stack/VStack';
import { Font } from '../../../../constants/Font';
import { useMessage } from '../../../../hooks/use-message';
import { TKeys } from '../../../../locales/constants';
import SunnahRuleTypeItem from './SunnahRuleTypeItem';

interface Props {
  type: TKeys;
  items: string[];
  showType: boolean;
  hasProgress: boolean;
}
export default function SunnahRuleTypes({ type, items, showType, hasProgress }: Props) {
  const { formatMessage } = useMessage();

  const count = items.length;
  if (count === 0) {
    return <></>;
  }

  const color = hasProgress ? 'green' : 'teal';

  return (
    <VStack spacing={5}>
      {count >= 1 && showType && (
        <Text variant="bodyLarge" style={{ fontWeight: '900', fontSize: Font.size(16), color }}>
          {formatMessage(type)}
        </Text>
      )}
      {items.map((item, index) => (
        <SunnahRuleTypeItem key={index} index={index} summary={formatMessage(item)} count={count} color={color} />
      ))}
    </VStack>
  );
}
