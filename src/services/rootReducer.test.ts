import { rootReducer } from './rootReducer';
import { rootSlice } from '../slices/rootSlice';

describe('rootReducer', () => {
  it('Корректная инициализация rootReducer', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual({
      root: rootSlice.reducer(undefined, { type: '@@INIT' })
    });
  });

  it('Корректный вызов рандомного action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      root: rootSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })
    });
  });
});
