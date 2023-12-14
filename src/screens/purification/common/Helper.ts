import { Part } from '../../../components/PressableStep';
import { TKeys } from '../../../locales/constants';

export const purificationStages: Part[] = [
  {
    route: 'BodyParts',
    name: TKeys.PHASE_1,
    description: TKeys.PURIFICATION_BODYPART_TITLE,
    imageSource: require('./../../../../assets/img/purification/step1.png'),
  },
  {
    route: 'Mind',
    name: TKeys.PHASE_2,
    description: TKeys.PURIFICATION_MIND_TITLE,
    imageSource: require('./../../../../assets/img/purification/step2.jpg'),
  },
  {
    route: 'Soul',
    name: TKeys.PHASE_3,
    description: TKeys.PURIFICATION_SOUL_TITLE,
    imageSource: require('./../../../../assets/img/purification/step3.jpg'),
  },
];

export const actions = {
  [TKeys.DEDICATION]: TKeys.PURIFICATION_DEDICATION,
  [TKeys.GENERAL_PRESENTATION_TITLE]: TKeys.PURIFICATION_PRESENTATION,
  [TKeys.INVOCATION_NIVEAU_TITLE]: [TKeys.INVOCATION_NIVEAU_1, TKeys.INVOCATION_NIVEAU_2, TKeys.INVOCATION_NIVEAU_3],
  [TKeys.CONCLUSION]: TKeys.PURIFICATION_CONCLUSION,
};
