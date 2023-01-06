import styled from 'styled-components';
import { Project, AddNewProject } from '@/components/Elements/Project';

const Container = styled.div`
  position: absolute;
  top: 37px;
  width: 250px;
  padding: 4px;
  border-radius: 4px;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.25);
  border-style: solid;
  background-color: #f7faf9;
  z-index: -1;
`;

export const DropdownMenu = () => {
  return (
    <Container>
      {/* {numbers.map((item) => {
        return <Project key={item} />;
      })} */}
      <AddNewProject />
    </Container>
  );
};
