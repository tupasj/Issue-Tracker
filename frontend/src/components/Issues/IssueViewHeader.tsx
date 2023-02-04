import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faCircleCheck, faGears } from '@fortawesome/free-solid-svg-icons';
import { convertTimestamp } from '@/utils/issueUtils';
import { IssuePriority } from '@/elements/Issue';

const Container = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: var(--medium-gray);
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: var(--black);
  }
`;

type Props = {
  currentIssue: any;
};

export const IssueViewHeader = ({ currentIssue }: Props) => {
  const formattedTime = convertTimestamp(currentIssue.createdAt);

  return (
    <Container>
      <TitleContainer>
        <div>
          <Title>{currentIssue.title}</Title>
          <SecondaryText>#{currentIssue.issue_number}</SecondaryText>
        </div>
        <StyledFontAwesomeIcon icon={faGears} />
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
          <Username>{currentIssue.postedBy}</Username> on {formattedTime}
        </AdditionalInfo>
      </TitleSecondaryContainer>
    </Container>
  );
};
