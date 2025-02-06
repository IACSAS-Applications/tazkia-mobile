import { ReactNode } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

export type StackProps = ViewProps & {
  children: ReactNode;
  spacing?: number;
  flexDirection?: 'column' | 'row';
  center?: boolean;
  style?: StyleProp<ViewStyle> | undefined;
};
export default function Stack({ style, flexDirection = 'row', spacing, center, children, ...props }: StackProps) {
  let styles: StyleProp<any> = [{ flexDirection, gap: spacing }];
  if (center) {
    styles = [{ alignItems: 'center', justifyContent: 'center' }, styles];
  }

  return (
    <View style={[styles, style]} {...props}>
      {children}
    </View>
  );
}
