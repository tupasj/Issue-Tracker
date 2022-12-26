import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 4px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background-color: #fff;
  width: 25%;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 14px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.75);
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
`;

export const IssueSearchbar = () => {
  return (
    <Container>
      <StyledFontAwesomeIcon icon={faMagnifyingGlass} />
      <Input type="text" placeholder="Search Issues..." />
    </Container>
  );
};
