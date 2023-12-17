import ProgressLine from '../domains/common/ProgressLine';
import BodyPart, { BodyPartType, BodyPartsOrder, PurificationStage, bodyParts } from '../domains/purification/BodyPart';
import Mind, { MindLevel, mindLevels } from '../domains/purification/Mind';
import Purification, { PurificationType } from '../domains/purification/Purification';
import Soul, { SoulPart, SoulPartLevel, soulRules } from '../domains/purification/Soul';
import { PURIFICATION_MAX_DAYS, mergeArray, progressPercentage2 } from '../services/Helpers';
import { useStoreActions, useStoreState } from '../stores/hooks';

export interface IPurification {
  purification: Purification | undefined;
  createBodyPart(part: BodyPartType, stage: PurificationStage): void;
  findBodyPart(part: BodyPartType): BodyPart | undefined;
  evaluateBodyPart(part: BodyPartType, stage: PurificationStage, errors: number[]): void;
  restartBodyPart(part: BodyPartType, stage: PurificationStage): void;
  createSoul(part: SoulPart, level: SoulPartLevel): void;
  findSoul(part: SoulPart, level?: SoulPartLevel): Soul | undefined;
  evaluateSoul(part: SoulPart, level: SoulPartLevel, checked: boolean): void;
  restartSoul(part: SoulPart, level: SoulPartLevel): void;
  createMind(level: MindLevel): void;
  findMind(level: MindLevel): Mind | undefined;
  evaluateMind(level: MindLevel, checked: boolean): void;
  restartMind(level: MindLevel): void;
  lastMindLevel(): Mind | undefined;
  hasProgress(type: PurificationType): boolean;
  globalPercentage(type: PurificationType): number | undefined;
}
export default function usePurification(): IPurification {
  const purification = useStoreState((state) => state.purification.item);
  const createOrUpdate = useStoreActions((actions) => actions.purification.createOrUpdate);
  const evaluateBodyPart = useStoreActions((actions) => actions.purification.evaluateBodyPart);
  const restartBodyPart = useStoreActions((actions) => actions.purification.restartBodyPart);
  const evaluateSoul = useStoreActions((actions) => actions.purification.evaluateSoul);
  const restartSoul = useStoreActions((actions) => actions.purification.restartSoul);
  const evaluateMind = useStoreActions((actions) => actions.purification.evaluateMind);
  const restartMind = useStoreActions((actions) => actions.purification.restartMind);
  const findBodyPart = useStoreState((actions) => actions.purification.findBodyPart);
  const findSoul = useStoreState((actions) => actions.purification.findSoul);
  const findMind = useStoreState((state) => state.purification.findByMind);
  const lastMindLevel = useStoreState((state) => state.purification.lastMindLevel);

  function createBodyPart(part: BodyPartType, stage: PurificationStage): void {
    const progress: Purification = getProgress();
    const dbBodyPart = progress.bodyParts.find((item) => item.name === part);
    const newLine: ProgressLine = { startDate: Date.now(), day: 0, errors: [], evaluated: false };

    if (dbBodyPart) {
      progress.bodyParts = progress.bodyParts.map((item) =>
        item.name === part ? { ...item, [stage]: [newLine] } : item,
      );
    } else {
      const newPart: BodyPart = { name: part, [stage]: [newLine] };
      progress.bodyParts.push(newPart);
    }
    progress.bodyParts = orderBodyParts(progress.bodyParts);
    createOrUpdate(progress);
  }

  function createSoul(part: SoulPart, level: SoulPartLevel): void {
    const progress: Purification = getProgress();
    const dbSoul = progress.soul.find((item) => item.part === part);
    const newLevel = { level, progress: [{ startDate: Date.now(), day: 0, evaluated: false, errors: [] }] };

    if (dbSoul) {
      dbSoul.partProgress.push(newLevel);
    } else {
      progress.soul.push({ part, partProgress: [newLevel] });
    }
    createOrUpdate(progress);
  }

  function createMind(level: MindLevel): void {
    const progress: Purification = getProgress();
    const dbMind = progress.mind.find((item) => item.level === level);
    const next = { startDate: Date.now(), day: 0, evaluated: false, errors: [] };

    if (dbMind) {
      dbMind.progress.push(next);
    } else {
      progress.mind.push({ level, progress: [next] });
    }
    createOrUpdate(progress);
  }

  function getProgress(): Purification {
    if (!purification) {
      return { id: 0, bodyParts: [], mind: [], soul: [] };
    }
    return purification;
  }

  function orderBodyParts(items: BodyPart[]) {
    return items.sort((a: BodyPart, b: BodyPart) => {
      if (BodyPartsOrder[a.name] < BodyPartsOrder[b.name]) {
        return -1;
      } else if (BodyPartsOrder[a.name] > BodyPartsOrder[b.name]) {
        return 1;
      }
      return 0;
    });
  }

  function hasProgress(type: PurificationType): boolean {
    return purification !== undefined && purification[type].length !== 0;
  }

  function globalPercentage(type: PurificationType): number | undefined {
    switch (type) {
      case 'bodyParts':
        return bodyPartGlobalPercentage();
      case 'mind':
        return mindGlobalPercentage();
      case 'soul':
        return soulGlobalPercentage();
    }
  }

  function bodyPartGlobalPercentage(): number | undefined {
    if (!purification) {
      return undefined;
    }
    const value = purification.bodyParts
      .map(({ cleaning, enlightenment }) => {
        let list: ProgressLine[] = mergeArray(cleaning, enlightenment);
        const sum = progressPercentage2(list, PURIFICATION_MAX_DAYS);
        return sum / list.length;
      })
      .reduce((accumulator, currentValue) => (accumulator + currentValue) / 2, 0);
    return value / bodyParts.length;
  }

  function mindGlobalPercentage(): number | undefined {
    if (!purification) {
      return undefined;
    }
    const value = purification.mind
      .map((level) => {
        let list: ProgressLine[] = level.progress;
        const sum = progressPercentage2(list, PURIFICATION_MAX_DAYS);
        return sum / list.length;
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return value / mindLevels.length;
  }

  function soulGlobalPercentage(): number | undefined {
    if (!purification) {
      return undefined;
    }
    const stages = Object.keys(soulRules).length;
    const value = purification.soul
      .map((stage) => {
        const stagePercentage = stage.partProgress
          .map((part) => {
            const sum = progressPercentage2(part.progress, PURIFICATION_MAX_DAYS);
            const size = soulRules[stage.part].length;
            return sum / size;
          })
          .reduce((accumulator, current) => accumulator + current, 0);
        return stagePercentage;
      })
      .reduce((accumulator, current) => accumulator + current, 0);
    return value / stages;
  }

  return {
    purification,
    hasProgress,
    findBodyPart,
    findMind,
    findSoul,
    createBodyPart,
    createMind,
    createSoul,
    evaluateBodyPart: (part, stage, errors) => evaluateBodyPart([part, stage, errors]),
    evaluateMind: (level, checked) => evaluateMind([level, checked]),
    evaluateSoul: (part, level, checked) => evaluateSoul([part, level, checked]),
    restartBodyPart: (part, stage) => restartBodyPart([part, stage]),
    restartSoul: (part, level) => restartSoul([part, level]),
    restartMind,
    lastMindLevel,
    globalPercentage,
  };
}
