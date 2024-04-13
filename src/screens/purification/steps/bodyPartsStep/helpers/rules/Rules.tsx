import { BodyPartType, PurificationStage } from '../../../../../../domains/purification/BodyPart';

import { useMemo, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import VStack from '../../../../../../components/stack/VStack';
import { useMessage } from '../../../../../../hooks/use-message';
import { useGlobal } from '../../../../../../providers/AppProvider';
import { rules } from '../../common/data';
import Rule from './Rule';
import { ShowingMode } from './RulesDialog';

type Props = {
  mode: ShowingMode;
  part: BodyPartType;
  step: PurificationStage;
  onChange(errors: number[]): void;
};
export default function Rules({ mode, part, step, ...props }: Props) {
  const ref = useRef<number[]>([]);
  const { formatMessage } = useMessage();
  const { arabic } = useGlobal();
  const items: string[] = useMemo(() => rules[part][step], []);
  const size = items.length;
  const fade = arabic ? FadeInRight : FadeInLeft;

  function handleClick(id: number, checked: boolean) {
    ref.current = checked ? [...ref.current, id] : ref.current.filter((item) => item !== id);
    props.onChange(ref.current);
  }

  return (
    <ScrollView>
      <VStack>
        {items.map((rule: string, index: number) => (
          <View key={index}>
            <Rule
              mode={mode}
              id={index + 1}
              item={formatMessage(rule)}
              isLast={index === size - 1}
              onClick={handleClick}
            />
          </View>
        ))}
      </VStack>
    </ScrollView>
  );
}
