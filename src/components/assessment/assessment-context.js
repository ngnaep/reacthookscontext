import React from 'react';
import { assessment } from '../../state.json';
import * as ActionConstants from '../../util/ActionConstants';

const AssessmentStateContext = React.createContext();
const AssessmentDispatchContext = React.createContext();

const initialState = assessment;

function assessmentReducer(state, action) {
  console.log('assessmentReducer');

  switch (action.type) {
    case ActionConstants.TAB_SELECTED: {
      return state;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AssessmentProvider({ children }) {
  const [assessmentState, dispatch] = React.useReducer(
    assessmentReducer,
    initialState
  );
  console.log(
    `AssessmentProvider assessmentState: ${JSON.stringify(assessmentState)}`
  );
  return (
    <AssessmentStateContext.Provider value={assessmentState}>
      <AssessmentDispatchContext.Provider value={dispatch}>
        {children}
      </AssessmentDispatchContext.Provider>
    </AssessmentStateContext.Provider>
  );
}

function useAssessmentState() {
  console.log('useAssessmentState');
  const context = React.useContext(AssessmentStateContext);
  if (context === undefined) {
    throw new Error(
      'useAssessmentState must be used within a AssessmentProvider'
    );
  }
  return context;
}

function useAssessmentDispatch() {
  console.log('useAssessmentDispatch');
  const context = React.useContext(AssessmentDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useAssessmentDispatch must be used within a AssessmentProvider'
    );
  }
  return context;
}

export { AssessmentProvider, useAssessmentState, useAssessmentDispatch };
