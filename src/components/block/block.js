import React from 'react';
import TabStrip from '../../components/tab-strip/tab-strip';
import { useAssessmentState } from '../assessment/assessment-context';
import ToolBar from '../../components/toolbar/toolbar';
import Navigation from '../../components/navigation/navigation';
import ContentArea from '../../components/content-area/content-area';

const Block = () => {
  console.log('Block');
  const blockId = useAssessmentState().activeBlock;
  return (
    <>
      <div>{blockId}</div>
      <div><ToolBar blockId={blockId}/><Navigation blockId={blockId}/></div>
      <TabStrip blockId={blockId} />
      <ContentArea blockId={blockId}/>
    </>
  );
};

export default Block;
