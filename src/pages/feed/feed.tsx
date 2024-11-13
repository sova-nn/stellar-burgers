import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {loadFeedData, selectFeedData, selectIsLoading} from '../../slices/rootSlice';
import { getFeedsApi, TFeedsResponse } from '@api';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const data: TFeedsResponse = useSelector(selectFeedData);
  const isLoading = useSelector(selectIsLoading);
  const orders = data.orders || [];
  const loadItems = async () => {
    try {
      dispatch(loadFeedData());
      await getFeedsApi();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  if (!orders.length && isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={loadItems} />;
};
