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

// title, number, timePosted, postedBy, isOpen, milestone.

export const Issue = () => {
  return (
    <Container>
      <Title>Issue title</Title>
      <Info>
        #2 added 4 days ago by username <StyledFontAwesomeIcon icon={faSignsPost} /> milestone name
      </Info>
    </Container>
  );
};
