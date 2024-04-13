import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { memo } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { Font } from '../constants/Font';
import { SCREEN_WIDTH } from '../constants/Screen';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import { useGlobal } from '../providers/AppProvider';
import GlobalStyles from '../styles/GlobalStyles';
import Text from './Text';
import HStack from './stack/HStack';
import VStack from './stack/VStack';

function InvocationGoodManners() {
  const { formatMessage } = useMessage();
  const { arabic } = useGlobal();
  const fade = arabic ? FadeInRight : FadeInLeft;

  return (
    <VStack
      spacing={15}
      style={{
        ...GlobalStyles.center,
        marginVertical: 20,
        backgroundColor: 'white',
        paddingVertical: 15,
        borderRadius: 20,
        width: SCREEN_WIDTH - 20,
      }}
    >
      <HStack style={GlobalStyles.center} spacing={15}>
        <Icon name="seal" size={30} color="lightseagreen" />
        <Text variant="bodyLarge" style={{ fontSize: Font.size(arabic ? 15 : 13), fontWeight: '900', color: 'teal' }}>
          {formatMessage(TKeys.INVOCATION_GOOD_MANNERS_TITLE)}
        </Text>
      </HStack>
      <VStack spacing={3}>
        {Array.from({ length: 4 }, (_, i) => i).map((id) => (
          <View key={id} style={{ ...GlobalStyles.centerAlign, flexDirection: 'row', gap: 15 }}>
            <Avatar.Text
              label={(id + 1).toString()}
              size={20}
              style={{ backgroundColor: 'teal' }}
              labelStyle={{ fontWeight: '900', color: 'white' }}
            />
            <Text
              variant="bodySmall"
              style={{
                width: SCREEN_WIDTH - 80,
                color: 'black',
              }}
            >
              {formatMessage(`invocation.good-manners_${id + 1}`)}
            </Text>
          </View>
        ))}
      </VStack>
    </VStack>
  );
}

export default memo(InvocationGoodManners);
