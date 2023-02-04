const getPriorityColor = (priority: string) => {
  if (priority === 'high') {
    return 'var(--red)';
  } else if (priority === 'medium') {
    return 'var(--orange)';
  } else if (priority === 'low') {
    return 'var(--yellow)';
  } else {
    return 'var(--white)';
  }
};

const convertTimestamp = (timestamp: string) => {
  const formattedTime = timestamp.split('T');
  return formattedTime[0];
};

const getCurrentIssue = (issues: any[], routerParamsIssueNumber: any) => {
  const filterResult = issues.filter((issue) => issue.issue_number == routerParamsIssueNumber);
  const currentIssue = filterResult[0];
  return currentIssue;
};

const makeUpdatedIssues = (issues: any[], updatedIssue: any) => {
  const updatedIssues = issues.map((issue) => {
    if (issue.issue_number === updatedIssue.issue_number) {
      return {
        ...updatedIssue,
      };
    } else {
      return issue;
    }
  });
  return updatedIssues;
};

export { getPriorityColor, convertTimestamp, getCurrentIssue, makeUpdatedIssues };
