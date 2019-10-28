import React from "react";
import { useBlockState, useBlockDispatch } from "../block/block-context";
import * as StaticDataUtil from "../../util/static-data-util";
import * as ActionConstants from "../../util/ActionConstants";
import * as ActionUtil from "../../util/ActionUtil";

const Toolbar = ({ blockId }) => {
  console.log(`Toolbar`);
  const activeItem = useBlockState()[blockId].parentAttrs.activeItem;
  const toolsState = useBlockState()[blockId].items[activeItem].toolbar.tools;
  const navOptionsState = useBlockState()[blockId].navigation;
  const toolsAndNav = [];
  const dispatch = useBlockDispatch();
  for (const [key, value] of Object.entries(
    StaticDataUtil.getToolsByItemId(activeItem)
  )) {
    toolsAndNav.push(
      <Tool
        key={key}
        id={key}
        blockId={blockId}
        itemId={activeItem}
        styleClass={toolsState[key].isActive ? "tbbtnactv" : "tbbtn"}
        label={value.label}
        dispatch={dispatch}
        disabled={toolsState[key].isDisabled}
      ></Tool>
    );
  }

  for (const [key, value] of Object.entries(
    StaticDataUtil.getNavigationOptions()
  )) {
    toolsAndNav.push(
      <NavOption
        key={key}
        id={key}
        blockId={blockId}
        styleClass={"tbbtn"}
        label={value.label}
        dispatch={dispatch}
        disabled={
          navOptionsState[key].isDisabled ||
          navOptionsState[key].isDisabledByTool
        }
      ></NavOption>
    );
  }
  return <div className="tsbtnpd">{toolsAndNav}</div>;
};

const Tool = ({
  id,
  blockId,
  itemId,
  styleClass,
  label,
  dispatch,
  disabled
}) => {
  console.log(`Tool id ${id}`);
  return (
    <button
      id={id}
      className={styleClass}
      onClick={() =>
        dispatch(
          ActionUtil.getActionObject(ActionConstants.TOGGLE_TOOL, {
            toolId: id,
            itemId: itemId,
            blockId: blockId
          })
        )
      }
      disabled={disabled}
    >
      {label}
    </button>
  );
};

const NavOption = ({ id, blockId, styleClass, label, dispatch, disabled }) => {
  console.log(`NavOption id ${id}`);
  return (
    <button
      id={id}
      className={styleClass}
      onClick={() =>
        dispatch(
          ActionUtil.getActionObject(ActionConstants.TOGGLE_NAVGTN_OPTN, {
            navOptionId: id,
            blockId: blockId
          })
        )
      }
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Toolbar;
