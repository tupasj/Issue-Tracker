import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignsPost } from '@fortawesome/free-solid-svg-icons';
import { getPriorityColor, convertTimestamp } from '@/utils/issueUtils';

const Container = styled.div`
  display: flex;
  background-color: #fff;
  padding: 14px;
  border-radius: 4px;
  box-shadow: inset 8px 0 ${(props) => props.color};
  cursor: pointer;
  &:hover {
    background-color: #fafafa;
  }
`;

const Title = styled.div`
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  &:hover {
    color: #1d4ed8;
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

type Props = {
  title: string;
  description?: string;
  number: number;
  timePosted: string;
  postedBy: string;
  isOpen: boolean;
  milestone?: string;
  priority: string;
};

export const IssueCard = ({
  title,
  description,
  number,
  timePosted,
  postedBy,
  isOpen,
  milestone,
  priority,
}: Props) => {
  const navigate = useNavigate();
  const priorityColor = getPriorityColor(priority);
  const formattedTime = convertTimestamp(timePosted);

  return (
    <Container color={priorityColor} onClick={() => navigate(`/app/issues/${number}`)}>
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
    </Container>
  );
};
