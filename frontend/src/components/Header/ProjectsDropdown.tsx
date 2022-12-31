import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Project, AddNewProject } from '@/components/Elements/Project';
import { TooltipWrapper } from '@/components/Elements/Text';

const Container = styled.div`
  cursor: pointer;
  position: relative;
  z-index: 4;
  width: 262px;
`;

const CurrentProject = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 14px;
  padding-right: 14px;
  justify-content: center;
  background-color: #f7faf9;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, 0.25);
`;

const ProjectName = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const DropdownMenuContainer = styled.div`
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

const DropdownMenu = () => {
  const numbers: number[] = [1, 2, 3, 4];

  return (
    <DropdownMenuContainer>
      {numbers.map((item) => {
        return <Project key={item} />;
      })}
      <AddNewProject />
    </DropdownMenuContainer>
  );
};

export const ProjectsDropdown = () => {
  const [dropdownActive, setDropdownActive] = useState(false);

  const toggleDropdown = () => {
    if (!dropdownActive) {
      setDropdownActive(true);
    } else if (dropdownActive) {
      setDropdownActive(false);
    }
  };

  return (
    <Container>
      <CurrentProject onClick={toggleDropdown}>
        <ProjectName>
          <TooltipWrapper text="Project name">Project name</TooltipWrapper>
        </ProjectName>
        <FontAwesomeIcon icon={faAngleDown} />
      </CurrentProject>
      {dropdownActive && <DropdownMenu />}
    </Container>
  );
};
