import React from "react";
import { useBlockState, useBlockDispatch } from "../block/block-context";
import * as StaticDataUtil from "../../util/static-data-util";
import * as ActionConstants from "../../util/ActionConstants";
import * as ActionUtil from "../../util/ActionUtil";

const Navigation = ({ blockId }) => {
  console.log(`Navigation`);
  const navOptionsState = useBlockState()[blockId].navigation;
  const toolsAndNav = [];
  const dispatch = useBlockDispatch();
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
  return <span className="tsbtnpd">{toolsAndNav}</span>;
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

export default Navigation;
