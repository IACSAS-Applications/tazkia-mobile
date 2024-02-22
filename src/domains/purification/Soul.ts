import { TKeys } from '../../locales/constants';
import ProgressLine from '../common/ProgressLine';

export type SoulPart = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type SoulPartLevel = 1 | 2 | 3 | 4;

export interface SoulPartProgress {
  level: SoulPartLevel;
  progress: ProgressLine[];
}

export default interface Soul {
  part: SoulPart;
  partProgress: SoulPartProgress[];
}

export const soulRules: Record<SoulPart, TKeys[]> = {
  1: [TKeys.PURIFICATION_SOUL_1_LEVEL_1, TKeys.PURIFICATION_SOUL_1_LEVEL_2, TKeys.PURIFICATION_SOUL_1_LEVEL_3],
  2: [
    TKeys.PURIFICATION_SOUL_2_LEVEL_1,
    TKeys.PURIFICATION_SOUL_2_LEVEL_2,
    TKeys.PURIFICATION_SOUL_2_LEVEL_3,
    TKeys.PURIFICATION_SOUL_2_LEVEL_4,
  ],
  3: [
    TKeys.PURIFICATION_SOUL_3_LEVEL_1,
    TKeys.PURIFICATION_SOUL_3_LEVEL_2,
    TKeys.PURIFICATION_SOUL_3_LEVEL_3,
    TKeys.PURIFICATION_SOUL_3_LEVEL_4,
  ],
  4: [
    TKeys.PURIFICATION_SOUL_4_LEVEL_1,
    TKeys.PURIFICATION_SOUL_4_LEVEL_2,
    TKeys.PURIFICATION_SOUL_4_LEVEL_3,
    TKeys.PURIFICATION_SOUL_4_LEVEL_4,
  ],
  5: [TKeys.PURIFICATION_SOUL_5_LEVEL_1, TKeys.PURIFICATION_SOUL_5_LEVEL_2, TKeys.PURIFICATION_SOUL_5_LEVEL_3],
  6: [TKeys.PURIFICATION_SOUL_6_LEVEL_1, TKeys.PURIFICATION_SOUL_6_LEVEL_2, TKeys.PURIFICATION_SOUL_6_LEVEL_3],
  7: [TKeys.PURIFICATION_SOUL_7_LEVEL_1, TKeys.PURIFICATION_SOUL_7_LEVEL_2, TKeys.PURIFICATION_SOUL_7_LEVEL_3],
  8: [
    TKeys.PURIFICATION_SOUL_8_LEVEL_1,
    TKeys.PURIFICATION_SOUL_8_LEVEL_2,
    TKeys.PURIFICATION_SOUL_8_LEVEL_3,
    TKeys.PURIFICATION_SOUL_8_LEVEL_4,
  ],
  9: [
    TKeys.PURIFICATION_SOUL_9_LEVEL_1,
    TKeys.PURIFICATION_SOUL_9_LEVEL_2,
    TKeys.PURIFICATION_SOUL_9_LEVEL_3,
    TKeys.PURIFICATION_SOUL_9_LEVEL_4,
    TKeys.PURIFICATION_SOUL_9_LEVEL_5,
  ],
  10: [TKeys.PURIFICATION_SOUL_10_LEVEL_1, TKeys.PURIFICATION_SOUL_10_LEVEL_2, TKeys.PURIFICATION_SOUL_10_LEVEL_3],
  11: [
    TKeys.PURIFICATION_SOUL_11_LEVEL_1,
    TKeys.PURIFICATION_SOUL_11_LEVEL_2,
    TKeys.PURIFICATION_SOUL_11_LEVEL_3,
    TKeys.PURIFICATION_SOUL_11_LEVEL_4,
    TKeys.PURIFICATION_SOUL_11_LEVEL_5,
  ],
  12: [TKeys.PURIFICATION_SOUL_12_LEVEL_1, TKeys.PURIFICATION_SOUL_12_LEVEL_2, TKeys.PURIFICATION_SOUL_12_LEVEL_3],
};

export const hasSubTitle: SoulPart[] = [5, 6];
