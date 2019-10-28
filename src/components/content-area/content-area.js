import React from "react";
import * as StaticDataUtil from "../../util/static-data-util";
import { useBlockState, useBlockDispatch } from "../block/block-context";

const ContentArea = ({ blockId }) => {
  console.log(`ContentArea blockId:${blockId}`);
  const activeItem = useBlockState()[blockId].parentAttrs.activeItem;
  const isReviewTabActive = useBlockState()[blockId].tabstrip.tabs['review']
    .isActive;
  return (
    <div>
      {isReviewTabActive
        ? "Review"
        : StaticDataUtil.getItemtextByItemId(activeItem)}
    </div>
  );
};

export default ContentArea;
