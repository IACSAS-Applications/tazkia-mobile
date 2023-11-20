import usePurification from '../../../../hooks/use-purification';
import TabNavigator from '../../common/TabNavigator';
import HomeScreen from './tabs/HomeScreen';
import InvocationsScreen from './tabs/InvocationsScreen';
import PresentationScreen from './tabs/PresentationScreen';
import SunnahsTruthsScreen from './tabs/SunnahsTruthsScreen';

export default function SoulScreen() {
  const { hasSoulProgress } = usePurification();
  return (
    <TabNavigator
      hasProgress={hasSoulProgress}
      presentationComponent={PresentationScreen}
      purificationComponent={HomeScreen}
      invocationComponent={InvocationsScreen}
      sunnahsComponent={SunnahsTruthsScreen}
    />
  );
}
