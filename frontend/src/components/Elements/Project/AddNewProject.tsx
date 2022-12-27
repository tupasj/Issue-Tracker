import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
`;

const NewProjectInput = styled.input`
  flex-grow: 1;
  border-bottom-left-radius: 2px;
  border-width: 1px;
  border-top-right-radius: 2px;
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
