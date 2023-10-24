import { Avatar } from '@react-native-material/core';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Text from '../../components/Text';
import Sunnah from '../../domains/sunnahs/Sunnah';
import { useApplication } from '../../hooks/use-application';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import { SunnahsParamList, SunnahsScreenRouteProp, SunnahsStackNavigationProp } from '../../navigation/types';
import { useSnackbar } from '../../providers/SnackbarProvider';
import { capitalize } from '../../services/Helpers';
import { useStoreState } from '../../stores/hooks';
import SunnahPart from './SunnahPart';
import { sunnahsStages } from './common/Helper';
import SunnahRule from './common/SunnahRule';
import SunnahStepProgress from './common/SunnahStepProgress';
import { habitsRules } from './common/data';

export default function SunnahsProgressScreen() {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const { displaySnackbar } = useSnackbar();
  const [index, setIndex] = useState(0);

  const navigation = useNavigation<SunnahsStackNavigationProp>();
  const route = useRoute<SunnahsScreenRouteProp>();
  const sunnahs = useStoreState((state) => state.sunnahs.item);

  function handleAdd(route: keyof SunnahsParamList) {
    navigation.navigate(capitalize(route) as any);
  }

  function image(key: string) {
    const part = sunnahsStages.find((stage) => stage.route.toLowerCase() === key);
    return part ? part.imageSource : undefined;
  }

  function habitSummaryFormat(id: number): string {
    return formatMessage(`sunnahs.habits.${id}.title`);
  }

  function habitDescriptionFormat(sunnah: Sunnah): ReactNode {
    const rules = habitsRules[sunnah.id];
    const verbals = rules.verbal;
    const actionals = rules.actional;

    return <SunnahRule verbals={verbals} actionals={actionals} arabic={arabic} />;
  }

  function worshipSummaryFormat(id: number): string {
    return 'worship summary';
  }

  function worshipDescriptionFormat(): ReactNode {
    return <Text>worship description</Text>;
  }

  function truthsSummaryFormat(id: number): string {
    return 'truths summary';
  }

  function truthsDescriptionFormat(sunnah: Sunnah): ReactNode {
    return <Text>truths description</Text>;
  }

  if (!sunnahs) {
    return <></>;
  }

  const parts: SunnahPart[] = [
    {
      part: 'habits',
      items: sunnahs.habits,
      summaryFormatter: habitSummaryFormat,
      descriptionFormatter: habitDescriptionFormat,
    },
    {
      part: 'worship',
      items: sunnahs.worship,
      summaryFormatter: worshipSummaryFormat,
      descriptionFormatter: worshipDescriptionFormat,
    },
    {
      part: 'truths',
      items: sunnahs.truths,
      summaryFormatter: truthsSummaryFormat,
      descriptionFormatter: truthsDescriptionFormat,
    },
  ];

  const routes: any = useMemo(
    () =>
      parts.map((item, index) => ({
        key: item.part,
        title: `phase${index + 1}`,
        focusedIcon: `home-floor-${index + 1}`,
      })),
    [],
  );

  useEffect(() => {
    if (route.params && route.params.rule) {
      const message = formatMessage(TKeys.MESSAGE_ADDED_SUCCESSFULLY, { name: route.params.rule });
      displaySnackbar(message, 'success');
    }
  }, [route.params]);

  const scenes: Record<string, () => React.JSX.Element> = {};
  parts.forEach((part, index: number) => {
    scenes[part.part.toString()] = () => (
      <SunnahStepProgress
        key={index}
        index={index + 1}
        stage={part.part}
        items={part.items}
        summaryFormatter={part.summaryFormatter}
        descriptionFormatter={part.descriptionFormatter}
        onAdd={handleAdd}
      />
    );
  });

  const renderScene = BottomNavigation.SceneMap(scenes);

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      renderScene={renderScene}
      activeColor="green"
      renderLabel={({ route, color }) => (
        <Text
          variant="caption"
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            fontWeight: '900',
            color,
          }}
        >
          {formatMessage(route.title ? route.title : '')}
        </Text>
      )}
      renderIcon={({ route, focused }) => (
        <Avatar image={image(route.key)} size={focused ? 40 : 35} style={{ marginTop: -10 }} />
      )}
      onIndexChange={setIndex}
    />
  );
}
