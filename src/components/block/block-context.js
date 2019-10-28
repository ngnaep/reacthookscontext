import React from "react";
import { block } from "../../state.json";
import * as ActionConstants from "../../util/ActionConstants";
import * as StaticDataUtil from "../../util/static-data-util";

const BlockStateContext = React.createContext();
const BlockDispatchContext = React.createContext();

const initialState = block;

function blockReducer(state, action) {
  console.log(`invoked blockReducer with action ${JSON.stringify(action)}`);
  const newState = { ...state };
  switch (action.type) {
    case ActionConstants.TAB_SELECTED: {
      const activeTabId = state[action.payload.blockId].tabstrip.activeTabId;
      const activatedTabId = action.payload.tabId;
      const blockId = action.payload.blockId;
      if (activeTabId === activatedTabId) {
        console.log("tab not changed");
        return state;
      } else {
        console.log("tab changed");
        newState[blockId].tabstrip.activeTabId = activatedTabId;
        newState[blockId].tabstrip.tabs[activeTabId].isActive = false;
        newState[blockId].tabstrip.tabs[activatedTabId].isActive = true;
        if (activatedTabId === "review") {
          newState[blockId].navigation.next.isDisabled = true;
          newState[blockId].navigation.previous.isDisabled = false;
        } else {
          newState[blockId].parentAttrs.activeItem =
            state[blockId].tabstrip.tabs[activatedTabId].itemId;
          newState[blockId].navigation.previous.isDisabled =
            StaticDataUtil.getTabIndex(blockId, activatedTabId) === 0;
          newState[blockId].navigation.next.isDisabled = false;
        }
        return newState;
      }
    }
    case ActionConstants.TOGGLE_TOOL: {
      return toggleTool(state, newState, action);
    }
    case ActionConstants.TOGGLE_NAVGTN_OPTN: {
      const blockId = action.payload.blockId;
      const navOptionId = action.payload.navOptionId;
      const activeTabId = state[action.payload.blockId].tabstrip.activeTabId;
      const activeTabIndex = StaticDataUtil.getTabIndex(blockId, activeTabId);
      const nextTabIndex =
        navOptionId === "previous" ? activeTabIndex - 1 : activeTabIndex + 1;
      const nextTab = StaticDataUtil.getTabAtIndex(blockId, nextTabIndex);
      newState[blockId].tabstrip.activeTabId = nextTab;
      newState[blockId].tabstrip.tabs[activeTabId].isActive = false;
      newState[blockId].tabstrip.tabs[nextTab].isActive = true;
      if (nextTab === "review") {
        newState[blockId].navigation.next.isDisabled = true;
        newState[blockId].navigation.previous.isDisabled = false;
      } else {
        newState[blockId].parentAttrs.activeItem =
          state[blockId].tabstrip.tabs[nextTab].itemId;
        newState[blockId].navigation.previous.isDisabled =
          StaticDataUtil.getTabIndex(blockId, nextTab) === 0;
        newState[blockId].navigation.next.isDisabled = false;
      }
      return newState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function toggleTool(state, newState, action) {
  const blockId = action.payload.blockId;
  const itemId = action.payload.itemId;
  const toolId = action.payload.toolId;
  const currentState =
    state[blockId].items[itemId].toolbar.tools[toolId].isActive;
  newState[blockId].items[itemId].toolbar.tools[
    toolId
  ].isActive = !currentState;
  if (toolId === "pencil") {
    StaticDataUtil.getTabIdsByBlockId(blockId).map(tabId => {
      newState[blockId].tabstrip.tabs[tabId].isDisabled = !currentState;
    });
    StaticDataUtil.getNavigationOptionIdsByBlockId(blockId).map(option => {
      newState[blockId].navigation[option].isDisabledByTool = !currentState;
    });
    StaticDataUtil.getToolIdsByItemId(itemId)
      .filter(itemId => itemId !== toolId)
      .map(toolId => {
        newState[blockId].items[itemId].toolbar.tools[
          toolId
        ].isDisabled = !currentState;
      });
  }
  return newState;
}

function BlockProvider({ children }) {
  const [blockState, dispatch] = React.useReducer(blockReducer, initialState);
  console.log(`BlockProvider blockState: ${JSON.stringify(blockState)}`);
  return (
    <BlockStateContext.Provider value={blockState}>
      <BlockDispatchContext.Provider value={dispatch}>
        {children}
      </BlockDispatchContext.Provider>
    </BlockStateContext.Provider>
  );
}

function useBlockState() {
  console.log("useBlockState");
  const context = React.useContext(BlockStateContext);
  if (context === undefined) {
    throw new Error("useBlockState must be used within a BlockProvider");
  }
  return context;
}

function useBlockDispatch() {
  console.log("useBlockDispatch");
  const context = React.useContext(BlockDispatchContext);
  if (context === undefined) {
    throw new Error("useBlockDispatch must be used within a BlockProvider");
  }
  return context;
}

export { BlockProvider, useBlockState, useBlockDispatch };
