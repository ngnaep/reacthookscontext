import React from "react";
import Block from "../block/block";
import { BlockProvider } from "../block/block-context";

function Assessment() {
  console.log("Assessment");
  return (
    <>
      <BlockProvider>
        <Block />
      </BlockProvider>
    </>
  );
}
export default Assessment;
