export type Translations = Record<TKeys, string>;
export const GLOBAL_LANGUAGE = 'global.language';

export enum TKeys {
  APPLICATION_TITLE_PRIMARY = 'application.title.primary',
  APPLICATION_TITLE_SECONDARY = 'application.title.secondary',
  PRESENTATION_CENTER = 'home.presentation.center',
  STEP = 'step',
  STEP_1 = 'step1',
  STEP_2 = 'step2',
  STEP_3 = 'step3',
  PURIFICATION_BODYPART_TITLE = 'purification.bodypart.title',
  PURIFICATION_BODYPART_DESCRIPTION = 'purification.bodypart.description',
  PURIFICATION_MIND_TITLE = 'purification.mind.title',
  PURIFICATION_SOUL_TITLE = 'purification.soul.title',
  PURIFICATION_BODY_PARTS_EYE = 'purification.body-parts.eye',
  PURIFICATION_BODY_PARTS_EYE_1 = 'purification.body-parts.eye_1',
  PURIFICATION_BODY_PARTS_EYE_2 = 'purification.body-parts.eye_2',
  PURIFICATION_BODY_PARTS_HANDS = 'purification.body-parts.hands',
  PURIFICATION_BODY_PARTS_HANDS_1 = 'purification.body-parts.hands_1',
  PURIFICATION_BODY_PARTS_HANDS_2 = 'purification.body-parts.hands_2',
  PURIFICATION_BODY_PARTS_TONGUE = 'purification.body-parts.tongue',
  PURIFICATION_BODY_PARTS_TONGUE_1 = 'purification.body-parts.tongue_1',
  PURIFICATION_BODY_PARTS_TONGUE_2 = 'purification.body-parts.tongue_2',
  PURIFICATION_BODY_PARTS_EAR = 'purification.body-parts.ear',
  PURIFICATION_BODY_PARTS_EAR_1 = 'purification.body-parts.ear_1',
  PURIFICATION_BODY_PARTS_EAR_2 = 'purification.body-parts.ear_2',
  PURIFICATION_BODY_PARTS_BELLY = 'purification.body-parts.belly',
  PURIFICATION_BODY_PARTS_BELLY_1 = 'purification.body-parts.belly_1',
  PURIFICATION_BODY_PARTS_BELLY_2 = 'purification.body-parts.belly_2',
  PURIFICATION_BODY_PARTS_FEET = 'purification.body-parts.feet',
  PURIFICATION_BODY_PARTS_FEET_1 = 'purification.body-parts.feet_1',
  PURIFICATION_BODY_PARTS_FEET_2 = 'purification.body-parts.feet_2',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS = 'purification.body-parts.private-parts',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_1 = 'purification.body-parts.private-parts_1',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_2 = 'purification.body-parts.private-parts_2',
  PURIFICATION_BODYPART_DISCIPLINARY_SYSTEM = 'cleaning.bodypart.disciplinary-system',
  PURIFICATION_BODYPART_POSITIVE_USAGE = 'enlightenment.bodypart.disciplinary-system',

  // Eye rules
  PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_1 = 'purification.body-parts.eye.cleaning.rule-1',
  PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_2 = 'purification.body-parts.eye.cleaning.rule-2',
  PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_3 = 'purification.body-parts.eye.cleaning.rule-3',
  PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_4 = 'purification.body-parts.eye.cleaning.rule-4',
  PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_5 = 'purification.body-parts.eye.cleaning.rule-5',
  PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_1 = 'purification.body-parts.eye.enlightenment.rule-1',
  PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_2 = 'purification.body-parts.eye.enlightenment.rule-2',
  PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_3 = 'purification.body-parts.eye.enlightenment.rule-3',
  PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_4 = 'purification.body-parts.eye.enlightenment.rule-4',
  PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_5 = 'purification.body-parts.eye.enlightenment.rule-5',
  PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_6 = 'purification.body-parts.eye.enlightenment.rule-6',

  // Hands rules
  PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_1 = 'purification.body-parts.hands.cleaning.rule-1',
  PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_2 = 'purification.body-parts.hands.cleaning.rule-2',
  PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_3 = 'purification.body-parts.hands.cleaning.rule-3',
  PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_4 = 'purification.body-parts.hands.cleaning.rule-4',
  PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_5 = 'purification.body-parts.hands.cleaning.rule-5',
  PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_6 = 'purification.body-parts.hands.cleaning.rule-6',

  // Tongue rules
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_1 = 'purification.body-parts.tongue.cleaning.rule-1',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_2 = 'purification.body-parts.tongue.cleaning.rule-2',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_3 = 'purification.body-parts.tongue.cleaning.rule-3',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_4 = 'purification.body-parts.tongue.cleaning.rule-4',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_5 = 'purification.body-parts.tongue.cleaning.rule-5',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_6 = 'purification.body-parts.tongue.cleaning.rule-6',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_7 = 'purification.body-parts.tongue.cleaning.rule-7',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_8 = 'purification.body-parts.tongue.cleaning.rule-8',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_9 = 'purification.body-parts.tongue.cleaning.rule-9',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_10 = 'purification.body-parts.tongue.cleaning.rule-10',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_11 = 'purification.body-parts.tongue.cleaning.rule-11',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_12 = 'purification.body-parts.tongue.cleaning.rule-12',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_13 = 'purification.body-parts.tongue.cleaning.rule-13',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_14 = 'purification.body-parts.tongue.cleaning.rule-14',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_15 = 'purification.body-parts.tongue.cleaning.rule-15',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_16 = 'purification.body-parts.tongue.cleaning.rule-16',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_17 = 'purification.body-parts.tongue.cleaning.rule-17',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_18 = 'purification.body-parts.tongue.cleaning.rule-18',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_19 = 'purification.body-parts.tongue.cleaning.rule-19',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_20 = 'purification.body-parts.tongue.cleaning.rule-20',

  LANGUAGE_ARABIC = 'language.arabic',
  LANGUAGE_FRENCH = 'language.french',
  LANGUAGE_ENGLISH = 'language.english',
  LANGUAGE_INDONESIAN = 'language.indonesian',
  BUTTON_CLOSE = 'button.close',
  BUTTON_ADD = 'button.add',
  BUTTON_SAVE = 'button.save',
  BUTTON_CLEANING = 'button.cleaning',
  BUTTON_ENLIGHTENMENT = 'button.enlightenment',
  MENU_HOME = 'menu.home',
  MENU_PURIFICATION = 'menu.purification',
  MENU_SUNNAHS = 'menu.sunnahs',
  MENU_INVOCATIONS = 'menu.invocations',
  MENU_SETTINGS = 'menu.settings',
  SETTINGS_LANGUAGE = 'settings.app-language',
  SETTINGS_RESET = 'settings.reset',
  PROGRESS_TITLE = 'progress.title',
  PROGRESS_START_DATE = 'progress.start-date',
  PROGRESS_END_DATE = 'progress.end-date',
  PROGRESS_SUCCESSFUL_DAYS = 'progress.successful-days',
  PROGRESS_FAILED_ATTEMPTS = 'progress.failed-attempts',
  PROGRESS_FAILED_ATTEMPTS_RULE = 'progress.failed-attempts.rule',
  PROGRESS_START_DAILY_EVALUATION = 'progress.start-daily-evaluation',
  PROGRESS_EVALUATION_MESSAGE = 'progress.daily-evaluation.message',
}
