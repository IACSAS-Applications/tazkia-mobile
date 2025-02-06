import { FC } from 'react';
import { Text as TextPaper, TextProps } from 'react-native-paper';

const Text: FC<TextProps<any>> = ({ children, variant = 'bodyMedium', ...props }) => {
  return <TextPaper {...props}>{children}</TextPaper>;
};

export default Text;
