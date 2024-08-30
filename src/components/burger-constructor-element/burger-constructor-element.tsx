import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useSelector } from 'react-redux';
import {
  selectConstructorItems,
  setConstructorItem
} from '../../slices/rootSlice';
import { useDispatch } from '../../services/store';
import { TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const data = useSelector(selectConstructorItems);
    const ingredients = data.ingredients;

    const makeNewItem = (type: string) => {
      const updatedIngredient = Object.assign({}, ingredient);
      updatedIngredient._id = uuidv4();
      const arr: TIngredient[] = Array.from(ingredients);
      arr.splice(index, 1);

      switch (type) {
        case 'down':
          arr.splice(index + 1, 0, updatedIngredient);
          return arr;
        case 'up':
          arr.splice(index - 1, 0, updatedIngredient);
          return arr;
        default:
          return arr;
      }
    };

    const handleMoveDown = () => {
      dispatch(
        setConstructorItem({
          type: 'reloadIngridients',
          data: { ...data, ingredients: makeNewItem('down') }
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        setConstructorItem({
          type: 'reloadIngridients',
          data: { ...data, ingredients: makeNewItem('up') }
        })
      );
    };

    const handleClose = () => {
      dispatch(
        setConstructorItem({
          type: 'reloadIngridients',
          data: { ...data, ingredients: makeNewItem('delete') }
        })
      );
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
