import React, { ReactNode, forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
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
};

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(function BottomSheet(props, ref) {
  const [isOpen, setOpen] = useState(false);
  const offset = useSharedValue(0);
  const AnimatedPressable = useMemo(() => Animated.createAnimatedComponent(Pressable), []);

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          setOpen(true);
          offset.value = 0;
        },
        close() {
          setOpen(false);
          offset.value = 0;
        },
      };
    },
    [],
  );

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

  return (
    <GestureHandlerRootView style={styles.container}>
      {props.children}
      {isOpen && (
        <>
          <AnimatedPressable style={styles.backdrop} entering={FadeIn} exiting={FadeOut} onPress={toggleSheet} />
          <GestureDetector gesture={pan}>
            <Animated.View
              style={[styles.sheet, translateY]}
              entering={SlideInDown.springify().damping(15)}
              exiting={SlideOutDown}
            >
              <IconButton icon="arrow-down-bold" mode="contained-tonal" onPress={toggleSheet} />
              {props.content}
            </Animated.View>
          </GestureDetector>
        </>
      )}
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0e275',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BACKDROP_COLOR,
    zIndex: 1,
  },
  sheet: {
    ...GlobalStyles.center,
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    bottom: -OVERDRAG * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
});

export default BottomSheet;
