import { createContext, useContext } from 'react';

interface IssuesContextInterface {
  issues: any[];
  setIssues: React.Dispatch<React.SetStateAction<any>>;
  getIssues: () => any;
}

export const IssuesContext = createContext<IssuesContextInterface | null>(null);

export const issuesContext = () => {
  const issuesCtx = useContext(IssuesContext);

  if (!issuesCtx) {
    throw new Error('useIssues has to be used within <IssuesContext.Provider>');
  }

  return issuesCtx;
};
