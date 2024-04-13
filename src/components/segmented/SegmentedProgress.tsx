import { View } from 'react-native';
import HStack from '../stack/HStack';
import SegmentedItem from './SegmentedItem';

type Props = {
  progress: string[] | undefined;
};
export default function SegmentedProgress({ progress }: Props) {
  if (!progress) {
    return <></>;
  }
  progress = progress.sort();
  const size = progress.length;

  return (
    <HStack spacing={0} center>
      {progress.map((item, index) => (
        <View key={index}>
          <SegmentedItem label={item} roundedStart={index === 0} roundedEnd={index === size - 1} />
        </View>
      ))}
    </HStack>
  );
}
