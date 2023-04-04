import styled from 'styled-components';
import { useState, useRef } from 'react';
import { SettingsAdditional } from './SettingsAdditional';
import { SettingsPersonalization } from './SettingsPersonalization';
import { SettingsProjects } from './SettingsProjects';

const Container = styled.div``;

const SubmitButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 26px;
`;

const SubmitButton = styled.button`
  display: block;
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

const ChangesNotification = styled.span`
  font-style: italic;
  font-size: 0.95rem;
`;

export const Settings = () => {
  const [changesApplied, setChangesApplied] = useState(false);
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
      <SettingsProjects setChangesApplied={setChangesApplied} submitButtonRef={projectsRef} />
      <SettingsPersonalization
        setChangesApplied={setChangesApplied}
        submitButtonRef={personalizationRef}
      />
      <SettingsAdditional setChangesApplied={setChangesApplied} submitButtonRef={additionalRef} />
      <SubmitButtonContainer>
        <SubmitButton type="submit" onClick={handleClick}>
          Save changes
        </SubmitButton>
        {changesApplied && <ChangesNotification>Changes applied</ChangesNotification>}
      </SubmitButtonContainer>
    </Container>
  );
};
