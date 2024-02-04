import 'server-only';

interface Dictionary {
  [key: string]: () => Promise<any>;
}

const dictionaries: Dictionary = {
  en: () => import('../dictionaries/en.json' as any).then((module) => module.default),
  ar: () => import('../dictionaries/ar.json' as any).then((module) => module.default)
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
