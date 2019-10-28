import * as staticUIData from "../static.json";

export const getBlockData = blockId => staticUIData.blocks.byIds[blockId];

export const getTabStripData = blockId => getBlockData(blockId).tabstrip;

export const getItemsData = () => staticUIData.items;

export const getItemtextByItemId = itemId => {
  return getItemsData().itemById[itemId].content.text;
};

export const getTools = () => staticUIData.tools.byIds;

export const getToolIdsByItemId = itemId => {
  return getItemsData().itemById[itemId].tools;
};

function filterFromObject(data, requiredKeys) {
  return requiredKeys.reduce(
    (result, key) =>
      data[key] !== undefined
        ? Object.assign(result, { [key]: data[key] })
        : result,
    {}
  );
}

export const getToolsByItemId = itemId => {
  return filterFromObject(getTools(), getToolIdsByItemId(itemId));
};

export const getNavigationOptions = () => staticUIData.navigation.byIds;

export const getTabIndex = (blockId, tabId) =>
  getTabStripData(blockId).allIds.indexOf(tabId);

export const getTabAtIndex = (blockId, tabIndex) =>
  getTabStripData(blockId).allIds[tabIndex];

export const getTabIdsByBlockId = blockId => getTabStripData(blockId).allIds;

export const getNavigationOptionIdsByBlockId = blockId =>
  getBlockData(blockId).navigationOptions;
