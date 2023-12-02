import { BodyPartType, PurificationStage } from '../../../../../../domains/purification/BodyPart';

import { useMemo, useRef } from 'react';
import { ScrollView } from 'react-native';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import VStack from '../../../../../../components/stack/VStack';
import { useApplication } from '../../../../../../hooks/use-application';
import { useMessage } from '../../../../../../hooks/use-message';
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
  const { arabic } = useApplication();
  const items: string[] = useMemo(() => rules[part][step], []);
  const size = items.length;
  const fade = arabic ? FadeInRight : FadeInLeft;

  function handleClick(id: number, checked: boolean) {
    ref.current = checked ? [...ref.current, id] : ref.current.filter((item) => item !== id);
    props.onChange(ref.current);
  }

  return (
    <ScrollView>
      <VStack spacing={mode === 'show' ? 5 : 0} style={{ paddingVertical: 20 }}>
        {items.map((rule: string, index: number) => (
          <Animated.View key={index} entering={fade.delay(100 * index).duration((100 * (index + 1)) / 2)}>
            <Rule
              mode={mode}
              id={index + 1}
              item={formatMessage(rule)}
              isLast={index === size - 1}
              onClick={handleClick}
            />
          </Animated.View>
        ))}
      </VStack>
    </ScrollView>
  );
}
