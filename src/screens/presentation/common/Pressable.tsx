import { useNavigation } from '@react-navigation/native';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, View } from 'react-native';
import Text from '../../../components/Text';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
import { Font } from '../../../constants/Font';
import { useMessage } from '../../../hooks/use-message';
import { PresentationParamList } from '../../../navigation/types';
import { useGlobal } from '../../../providers/AppProvider';
import GlobalStyles from '../../../styles/GlobalStyles';

export interface Part {
  route: keyof PresentationParamList;
  description: string;
  imageSource: ImageSourcePropType;
}

interface Props {
  index: number;
  item: Part;
  nameTextSize?: number;
  descriptionTextSize?: number;
  style?: StyleProp<any>;
}
export default function Pressable({ index, item, nameTextSize, descriptionTextSize, ...props }: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useGlobal();
  const navigation = useNavigation<any>();

  function handlePress() {
    navigation.navigate(item.route as any);
  }

  return (
    <View style={{ ...props.style, backgroundColor: Color.partDefaultBgColor }} onTouchStart={handlePress}>
      <VStack style={styles.container} spacing={8}>
        <Image source={item.imageSource} style={styles.img} />
        <Text
          style={{
            fontFamily: 'ReemKufiFun',
            fontSize: Font.size(descriptionTextSize ?? arabic ? 14 : 13),
            textAlign: 'center',
          }}
        >
          {formatMessage(item.description)}
        </Text>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -20,
    width: '95%',
    backfaceVisibility: 'hidden',
  },
  img: {
    width: 90,
    height: 90,
    ...GlobalStyles.circle,
  },
});
