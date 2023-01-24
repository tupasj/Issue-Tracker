import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignsPost } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  background-color: white;
  padding: 14px;
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
  priority?: string;
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
  const convertTimestamp = (timestamp: string) => {
    const splitResult = timestamp.split('T');
    return splitResult[0];
  };

  const formattedTime = convertTimestamp(timePosted);

  return (
    <Container>
      <Title>{title}</Title>
      <Info>
        #{number} added {formattedTime} by {postedBy}{' '}
        {milestone && (
          <>
            <StyledFontAwesomeIcon icon={faSignsPost} />
            {milestone}
          </>
        )}
      </Info>
    </Container>
  );
};
