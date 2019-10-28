import React from 'react';
import TabStrip from '../../components/tab-strip/tab-strip';
import { useAssessmentState } from '../assessment/assessment-context';
import ToolBar from '../../components/toolbar/toolbar';
import ContentArea from '../../components/content-area/content-area';

const Block = () => {
  console.log('Block');
  const blockId = useAssessmentState().activeBlock;
  return (
    <>
      <div>{blockId}</div>
      <ToolBar blockId={blockId}></ToolBar>
      <TabStrip blockId={blockId} />
      <ContentArea blockId={blockId}/>
    </>
  );
};

export default Block;
