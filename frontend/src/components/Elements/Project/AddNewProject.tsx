import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
`;

const NewProjectInput = styled.input`
  flex-grow: 1;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 1.25rem;
  padding: 4px;
`;

export const AddNewProject = () => {
  return (
    <Container>
      <NewProjectInput type="text" placeholder="Create new project..." />
      <StyledFontAwesomeIcon icon={faPlus} />
    </Container>
  );
};
