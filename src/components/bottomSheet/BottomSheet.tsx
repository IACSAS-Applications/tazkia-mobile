import Icon from '@expo/vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, forwardRef, useImperativeHandle, useLayoutEffect, useMemo, useState } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SCREEN_HEIGHT } from '../../constants/Screen';
import GlobalStyles from '../../styles/GlobalStyles';

const BACKDROP_COLOR = 'rgba(0, 0, 0, 0.3)';
const OVERDRAG = 10;

export type BottomSheetRef = {
  open(): void;
  close(): void;
};
type BottomSheetProps = {
  children: ReactNode;
  content: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(function BottomSheet(props, ref) {
  const [isOpen, setOpen] = useState(false);
  const offset = useSharedValue(0);
  const AnimatedPressable = useMemo(() => Animated.createAnimatedComponent(Pressable), []);
  const navigation = useNavigation<any>();

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          toogle(true);
        },
        close() {
          toogle(false);
        },
      };
    },
    [],
  );

  function toogle(open: boolean) {
    setOpen(open);
    offset.value = 0;
  }

  const toggleSheet = () => {
    setOpen(!isOpen);
    offset.value = 0;
  };

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;
      const clamp = Math.max(-OVERDRAG, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < SCREEN_HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(SCREEN_HEIGHT, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  useLayoutEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: isOpen ? 'none' : 'flex' } });
  }, [isOpen]);

  return (
    <GestureHandlerRootView style={[styles.container, props.style]}>
      {props.children}
      {isOpen && (
        <>
          <AnimatedPressable style={styles.backdrop} entering={FadeIn} exiting={FadeOut} onPress={toggleSheet} />
          <GestureDetector gesture={pan}>
            <View style={[styles.sheet, translateY]}>
              <Icon name="horizontal-rule" size={45} onPress={toggleSheet} style={{ height: 40, marginTop: -12 }} />
              {props.content}
            </View>
          </GestureDetector>
        </>
      )}
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BACKDROP_COLOR,
  },
  sheet: {
    ...GlobalStyles.center,
    backgroundColor: '#eef5f1f7',
    width: '100%',
    position: 'absolute',
    bottom: -OVERDRAG * 6.5,
    paddingBottom: 55,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 10,
  },
});

export default BottomSheet;
