import styled from 'styled-components';
import { useRef } from 'react';
import { SettingsAdditional } from './SettingsAdditional';
import { SettingsPersonalization } from './SettingsPersonalization';
import { SettingsProjects } from './SettingsProjects';

const Container = styled.div``;

const SubmitButton = styled.button`
  display: block;
  margin-top: 26px;
  padding: 6px;
  width: 150px;
  border-radius: 4px;
  background-color: var(--green);
  color: var(--white);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 200ms;
  &:hover {
    background-color: var(--dark-green);
  }
`;

export const Settings = () => {
  const projectsRef: any = useRef(null);
  const personalizationRef: any = useRef(null);
  const additionalRef: any = useRef(null);

  const handleClick = () => {
    console.log('Settings handleClick');
    projectsRef.current.click();
    personalizationRef.current.click();
    additionalRef.current.click();
  };

  return (
    <Container>
      <SettingsProjects submitButtonRef={projectsRef} />
      <SettingsPersonalization submitButtonRef={personalizationRef} />
      <SettingsAdditional submitButtonRef={additionalRef} />
      <SubmitButton type="submit" onClick={handleClick}>
        Save changes
      </SubmitButton>
    </Container>
  );
};
