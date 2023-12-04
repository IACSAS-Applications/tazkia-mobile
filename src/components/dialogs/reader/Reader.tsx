import { useMemo, useState } from 'react';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import ReaderItem from './ReaderItem';

type Props = {
  items: InvocationRepeat[];
};
export default function Reader({ items }: Props) {
  const [index, setIndex] = useState(0);
  const size = useMemo(() => items.length, []);
  const current = items[index];

  function handlePress() {
    if (index < size) {
      setIndex(index + 1);
    }
  }

  return <ReaderItem index={index + 1} value={current} total={size} onDone={handlePress} />;
}
