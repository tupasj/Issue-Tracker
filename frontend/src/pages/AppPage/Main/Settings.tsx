import styled from 'styled-components';
import { useState, useRef } from 'react';
import { SettingsAdditional } from './SettingsAdditional';
import { SettingsPersonalization } from './SettingsPersonalization';
import { SettingsProjects } from './SettingsProjects';
import { SettingsModalDeleteProject } from './SettingsModalDeleteProject';

const Container = styled.div``;

const H2 = styled.h2`
  padding-top: 22px;
  font-weight: 600;
`;

const H3 = styled.h3`
  padding-top: 14px;
  padding-bottom: 8px;
  font-style: italic;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 48px;
`;

const DeleteProjectButton = styled.button`
  padding-top: 4px;
  padding-bottom: 4px;
  width: 125px;
  border-radius: 4px;
  background-color: #e9e9ed;
  color: #fb0a0a;
  border: 1px solid #9d9d9d;
  cursor: pointer;
  transition: transform 200ms;
  &:hover {
    background-color: #c4c2c2;
  }
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
  const [modalOpen, setModalOpen] = useState(false);
  const projectsRef: any = useRef(null);
  const personalizationRef: any = useRef(null);
  const additionalRef: any = useRef(null);

  const handleClick = () => {
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
      <H2>Danger zone</H2>
      <H3>Delete this project</H3>
      <DeleteProjectButton type="button" onClick={() => setModalOpen(true)}>
        Delete project
      </DeleteProjectButton>
      <SubmitButtonContainer>
        <SubmitButton type="submit" onClick={handleClick}>
          Save changes
        </SubmitButton>
        {changesApplied && <ChangesNotification>Changes applied</ChangesNotification>}
      </SubmitButtonContainer>
      <SettingsModalDeleteProject open={modalOpen} handleClose={() => setModalOpen(false)} />
    </Container>
  );
};
