import { TIngredient } from '@utils-types';

export const getStoreItems = (ingredients: TIngredient[]) => {
  const buns: TIngredient[] = [];
  const mains: TIngredient[] = [];
  const sauces: TIngredient[] = [];

  ingredients.forEach((el) => {
    switch (el.type) {
      case 'bun':
        buns.push(el);
        break;
      case 'main':
        mains.push(el);
        break;
      default:
        sauces.push(el);
    }
  });

  return [buns, mains, sauces];
};
