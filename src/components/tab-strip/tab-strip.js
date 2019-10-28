import React from 'react';
import '../../styles.css';
import * as StaticDataUtil from '../../util/static-data-util';
import { useBlockState, useBlockDispatch } from '../block/block-context';
import * as ActionConstants from '../../util/ActionConstants';
import * as ActionUtil from '../../util/ActionUtil';

const TabStrip = ({ blockId }) => {
  console.log(`TabStrip blockId:${blockId}`);
  const staticTabStripData = StaticDataUtil.getTabStripData(blockId);
  const tabs = staticTabStripData.byIds;
  const tabsState = useBlockState()[blockId].tabstrip.tabs;
  const tabItems = [];
  const dispatch = useBlockDispatch();
  for (const [key, value] of Object.entries(tabs)) {
    const tabState = tabsState[key];
    tabItems.push(
      <Tab
        key={key}
        blockId={blockId}
        tabId={key}
        disabled={tabState.isDisabled}
        tabCls={tabState.isActive ? 'tsbtnactv' : 'tsbtn'}
        tabLbl={value.label}
        dispatch={dispatch}
      ></Tab>
    );
  }
  return <div className='tsbtnpd'>{tabItems}</div>;
};

const Tab = ({ blockId, tabId, disabled, tabCls, tabLbl, dispatch }) => {
  console.log(`Tab tabId:${tabId}`);
  return (
    <button
      id={tabId}
      className={tabCls}
      disabled={disabled}
      onClick={() =>
        dispatch(
          ActionUtil.getActionObject(ActionConstants.TAB_SELECTED, {
            tabId: tabId,
            blockId: blockId
          })
        )
      }
    >
      {tabLbl}
    </button>
  );
};

export default TabStrip;
