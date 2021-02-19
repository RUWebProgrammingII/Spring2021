import * as constants from './constants';

export const getGameDeals = async () => {
  const result = await fetch(constants.DEALS_URL);
  if (!result.ok) { return {} };
  const deals = await result.json();
  const stores = await getStores();

  const storeGroup = {};

  deals.forEach(d => {
    if (!storeGroup[d.storeID]) {
      const currentStore = stores.find(s => s.storeID === d.storeID);
      storeGroup[d.storeID] = {
        ...currentStore,
        deals: []
      };
    }
    storeGroup[d.storeID].deals.push(d);
  });

  return storeGroup;
};

const getStores = async () => {
  const result = await fetch(constants.STORE_URL);
  if (!result.ok) { return []; }
  return result.json();
};
