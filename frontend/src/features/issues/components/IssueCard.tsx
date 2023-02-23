import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignsPost } from '@fortawesome/free-solid-svg-icons';
import { getPriorityColor, convertTimestamp } from '@/utils/issueUtils';
import { Label } from '@/elements/Label';

const Container = styled.div`
  display: flex;
  gap: 8px;
  padding: 14px;
  border-radius: 4px;
  background-color: var(--white);
  box-shadow: inset 8px 0 ${(props) => props.color};
  cursor: pointer;
  &:hover {
    background-color: var(--extra-light-gray);
  }
`;

const Title = styled.div`
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
`;

const Info = styled.div`
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.5);
  cursor: text;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-left: 6px;
`;

const LabelsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

type Props = {
  title: string;
  number: number;
  timePosted: string;
  milestone?: string;
  priority: string;
  postedBy: string;
  routeOpenStatus: string;
  labels: any[];
  milestoneId?: string;
  isOpen: any;
};

export const IssueCard = ({
  title,
  number,
  timePosted,
  milestone,
  priority,
  postedBy,
  routeOpenStatus,
  labels,
  milestoneId,
  isOpen,
}: Props) => {
  const navigate = useNavigate();
  let { milestonesOpenStatus } = useParams();
  const priorityColor = getPriorityColor(priority);
  const formattedTime = convertTimestamp(timePosted);

  const handleClick = () => {
    if (milestonesOpenStatus) {
      const milestoneIdInt = parseInt(milestoneId as string);
      const openStatus = isOpen ? 'open' : 'closed';
      navigate(
        `/app/milestones/${milestonesOpenStatus}/${milestoneIdInt}/issues/${openStatus}/${number}`
      );
    } else {
      navigate(`/app/issues/${routeOpenStatus}/${number}`);
    }
  };

  return (
    <Container color={priorityColor} onClick={handleClick}>
      <div>
        <Title>{title}</Title>
        <Info>
          #{number} posted on {formattedTime} by {postedBy}
          {milestone && (
            <>
              <StyledFontAwesomeIcon icon={faSignsPost} />
              {milestone}
            </>
          )}
        </Info>
      </div>
      <LabelsContainer>
        {labels &&
          labels.map((label) => <Label key={label.name} name={label.name} color={label.color} />)}
      </LabelsContainer>
    </Container>
  );
};
