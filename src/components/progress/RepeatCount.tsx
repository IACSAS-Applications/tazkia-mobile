import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { isDirectionRTL } from '../../services/Helpers';
import Text from '../Text';

interface Props {
  count: number;
  color?: string;
}
export default function RepeatCount({ count, color = 'orange' }: Props) {
  if (count === 0) {
    return <></>;
  }
  const isRTL = isDirectionRTL();
  const margin = count < 10 ? 8 : 5;
  const marginRight = isRTL ? margin : 15;
  const marginLeft = isRTL ? 15 : margin;
  return (
    <View style={{ marginBottom: -15 }}>
      <Text variant="labelSmall" style={{ ...styles.text, marginRight, marginLeft }}>
        {count}
      </Text>
      <Icon name="reload" size={45} color={color} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 12, fontWeight: '700', marginBottom: -30, textAlign: 'center' },
  icon: { marginTop: -1, opacity: 0.5 },
});
