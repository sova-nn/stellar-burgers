import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from '../../services/store';

import { Preloader } from '@ui';
import {
  isAuthCheckedSelector,
  loadUser,
  userDataSelector
} from '../../slices/rootSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector); // завершена ли загрузка данных о пользовател
  const user = useSelector(userDataSelector); // данные о пользователе
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (!isAuthChecked) {
    // прелоадер, чтобы занять пользователя в ожидании чекаута
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    // редирект при остутствии данных в хранилище
    return <Navigate replace to='/login' state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
