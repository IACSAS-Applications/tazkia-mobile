import { View } from 'react-native';
import { Avatar, Divider } from 'react-native-paper';
import { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import Text from '../../../../components/Text';
import HStack from '../../../../components/stack/HStack';
import { Font } from '../../../../constants/Font';
import { SCREEN_WIDTH } from '../../../../constants/Screen';
import { useGlobal } from '../../../../providers/AppProvider';
import GlobalStyles from '../../../../styles/GlobalStyles';

interface Props {
  index: number;
  summary: string;
  count: number;
  color: string;
}
export default function SunnahRuleTypeItem({ index, summary, count, color }: Props) {
  const { arabic } = useGlobal();
  const fade = arabic ? FadeInRight : FadeInLeft;

  return (
    <View style={{ paddingHorizontal: 7 }}>
      <HStack spacing={5} style={{ ...GlobalStyles.center, paddingHorizontal: 5 }}>
        {count > 1 && (
          <Avatar.Text
            label={(index + 1) as any}
            size={16}
            style={{ backgroundColor: color, opacity: 0.9 }}
            labelStyle={{ fontWeight: '900', fontSize: Font.size(9) }}
          />
        )}
        <Text variant="bodySmall" style={{ textAlign: 'justify', width: SCREEN_WIDTH - 40, paddingHorizontal: 1 }}>
          {summary}
        </Text>
      </HStack>
      {count > 1 && index < count - 1 && <Divider />}
    </View>
  );
}
