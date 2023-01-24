import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignsPost } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  background-color: white;
  padding: 14px;
  border-radius: 4px;
  box-shadow: inset 8px 0 ${(props) => props.color};
`;

const Title = styled.div`
  font-weight: 600;
  line-height: 1.5;
`;

const Info = styled.div`
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.5);
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

export const Issue = ({
  title,
  description,
  number,
  timePosted,
  postedBy,
  isOpen,
  milestone,
  priority,
}: Props) => {
  let priorityColor = '#fff';
  if (priority === 'high') {
    priorityColor = '#DC2626';
  } else if (priority === 'medium') {
    priorityColor = '#F97316';
  } else if (priority === 'low') {
    priorityColor = '#FBBF24';
  }

  const convertTimestamp = (timestamp: string) => {
    const splitResult = timestamp.split('T');
    return splitResult[0];
  };

  const formattedTime = convertTimestamp(timePosted);

  return (
    <Container color={priorityColor}>
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
