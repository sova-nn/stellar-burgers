import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { loadIngridient, selectItem } from '../../slices/rootSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredientData = useSelector(selectItem);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(loadIngridient(params?.id || ''));
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
