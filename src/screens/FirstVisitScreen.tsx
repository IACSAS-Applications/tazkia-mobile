import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import Text from '../components/Text';
import LanguageSelector from '../components/header/settings/language/LanguageSelector';
import { langFlags } from '../components/header/settings/language/LanguageSetting';
import ScreenLayout from '../components/layout/ScreenLayout';
import HStack from '../components/stack/HStack';
import VStack from '../components/stack/VStack';
import { useMessage } from '../hooks/use-message';
import { localesTranslation } from '../locales';
import { TKeys } from '../locales/constants';
import { useGlobal } from '../providers/AppProvider';
import GlobalStyles from '../styles/GlobalStyles';

export default function FirstVisitScreen() {
  const { locale, isSystemLanguageSupported, setLocale, setFirstVisitDate } = useGlobal();
  const { formatMessage } = useMessage();
  const [chooseLanguage, setChooseLanguage] = useState<boolean>(!isSystemLanguageSupported);

  function handlePressYes() {
    if (locale) {
      setLocale(locale);
    }
    init();
  }

  function handlePressNo() {
    setChooseLanguage(true);
  }

  function handleLanguageChange() {
    init();
  }

  function init() {
    setFirstVisitDate(Date.now());
  }

  if (!locale || chooseLanguage === undefined) {
    return <></>;
  }

  return (
    <ScreenLayout>
      <VStack spacing={15} style={{ paddingHorizontal: 15 }}>
        <VStack spacing={15} style={GlobalStyles.center}>
          <Avatar.Image source={require('./../../assets/img/presentation/manhaj1.jpg')} size={200} />
          <Text variant="headlineSmall" style={{ fontWeight: '900', textAlign: 'center' }}>
            {formatMessage(TKeys.WELCOME)}
          </Text>
          {isSystemLanguageSupported ? (
            <Text variant="bodyLarge" style={{ color: 'green' }}>
              {formatMessage(TKeys.SETTINGS_LANGUAGE_DEFAULT, {
                lang: formatMessage(`language.${localesTranslation[locale].key}`),
              })}
            </Text>
          ) : (
            <>
              <Text variant="headlineMedium" style={{ color: 'red' }}>
                نعتذر، لغة هاتفكم غير مدعومة
              </Text>
              <Text variant="headlineSmall">المرجو اختيار لغة أخرى من بين القائمة التالية :</Text>
            </>
          )}
        </VStack>
        <View style={GlobalStyles.center}>
          {chooseLanguage ? (
            <LanguageSelector flags={langFlags} all color="black" onChange={handleLanguageChange} />
          ) : (
            <HStack style={{ ...GlobalStyles.center }} spacing={10}>
              <Button
                mode="contained"
                buttonColor="green"
                icon={() => <Icon name="thumb-up-outline" size={20} color="white" />}
                onPress={handlePressYes}
              >
                {formatMessage(TKeys.BUTTON_YES)}
              </Button>
              <Button
                mode="contained"
                buttonColor="grey"
                icon={() => <Icon name="thumb-down-outline" size={20} color="white" />}
                onPress={handlePressNo}
              >
                {formatMessage(TKeys.BUTTON_NO)}
              </Button>
            </HStack>
          )}
        </View>
      </VStack>
    </ScreenLayout>
  );
}
