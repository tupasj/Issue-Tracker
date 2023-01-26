import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { convertTimestamp } from '@/utils/issueUtils';
import { IssueComments } from '@/components/Issues';
import { IssuePriority } from '@/elements/Issue';

const Container = styled.div``;

const TitleContainer = styled.div`
  font-size: 2rem;
  margin-bottom: 8px;
`;

const Title = styled.span`
  font-weight: 600;
`;

const SecondaryText = styled.span`
  padding-left: 4px;
  font-weight: 400;
  color: var(--medium-gray);
`;

const TitleSecondaryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.25;
`;

const IssueOpenStatus = styled.div<any>`
  padding: 6px;
  border-radius: 18px;
  text-align: center;
  color: var(--white);
  background-color: ${(props) => (props.closed ? 'var(--medium-gray)' : 'var(--green)')};
`;

const AdditionalInfo = styled.div`
  color: var(--medium-gray);
`;

const Username = styled.span`
  color: var(--black);
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: var(--light-gray);
  margin-top: 14px;
  margin-bottom: 14px;
`;

type Props = {
  issues: any[];
};

export const IssueView = ({ issues }: Props) => {
  let { issueNumber } = useParams();

  const filterResult = issues.filter((issue) => issue.issue_number == issueNumber);
  const currentIssue = filterResult[0];
  console.log('currentIssue: ', currentIssue);

  const formattedTime = convertTimestamp(currentIssue.createdAt);

  return (
    <Container>
      <TitleContainer>
        <Title>{currentIssue.title}</Title>
        <SecondaryText>#{currentIssue.issue_number}</SecondaryText>
      </TitleContainer>
      <TitleSecondaryContainer>
        {currentIssue.is_open ? (
          <IssueOpenStatus>
            <FontAwesomeIcon icon={faForward} /> Open
          </IssueOpenStatus>
        ) : (
          <IssueOpenStatus closed>
            <FontAwesomeIcon icon={faCircleCheck} /> Closed
          </IssueOpenStatus>
        )}
        <AdditionalInfo>
          Priority: <IssuePriority priority={currentIssue.priority} /> | Posted by{' '}
          <Username>{currentIssue.posted_by}</Username> on {formattedTime}
        </AdditionalInfo>
      </TitleSecondaryContainer>
      <Divider />
      <IssueComments
        originalPoster={currentIssue.posted_by}
        postedTime={formattedTime}
        description={currentIssue.description}
      />
    </Container>
  );
};
