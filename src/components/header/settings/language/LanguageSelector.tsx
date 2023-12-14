import { useMemo } from 'react';
import { Divider } from 'react-native-paper';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage';
import Animated, { FadeInUp, SlideOutDown } from 'react-native-reanimated';
import { localesTranslation } from '../../../../locales';
import { SupportedLocale } from '../../../../locales/types';
import { useGlobal } from '../../../../providers/AppProvider';
import LanguageOption from './LanguageOption';

interface LanguageSelectorProps {
  flags: Record<SupportedLocale, AvatarImageSource>;
  color?: string;
  all?: boolean;
  onChange?: () => void;
}

export default function LanguageSelector({ flags, color, all, onChange }: LanguageSelectorProps) {
  const { locale, setLocale } = useGlobal();
  const languageKeys = useMemo(() => Object.keys(localesTranslation) as SupportedLocale[], []);
  const keys = all ? languageKeys : languageKeys.filter((item) => locale !== item);

  function handleChange(value: SupportedLocale) {
    setLocale(value);
    if (onChange) {
      onChange();
    }
  }

  return (
    <Animated.View entering={FadeInUp.duration(10).springify()} exiting={SlideOutDown} style={{ paddingVertical: 10 }}>
      <Animated.FlatList
        data={keys}
        renderItem={({ item }) => (
          <LanguageOption icon={flags[item]} value={item} color={color} onChange={handleChange} />
        )}
        ItemSeparatorComponent={Divider}
        alwaysBounceVertical={false}
        style={{ backgroundColor: 'transparent', marginLeft: 35, maxHeight: 275 }}
      />
    </Animated.View>
  );
}
