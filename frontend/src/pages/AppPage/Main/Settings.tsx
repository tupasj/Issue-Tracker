import styled from 'styled-components';
import { useState, useEffect, useRef, ReactNode, forwardRef } from 'react';
import { v4 } from 'uuid';
import { ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from '@/lib/firebase';
import { userContext } from '@/context';
import { getUserProfileImage, updateUserProfileImage } from '@/features/users';
import { SettingsAdditional } from './SettingsAdditional';
import { SettingsPersonalization } from './SettingsPersonalization';
import { SettingsProjects } from './SettingsProjects';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: start;
`;

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

  const handleClick = () => {
    console.log('Settings handleClick');
    projectsRef.current.click();
    personalizationRef.current.click();
  };

  return (
    <div>
      <SettingsProjects submitButtonRef={projectsRef} />
      <SettingsPersonalization submitButtonRef={personalizationRef} />
      <button type="submit" onClick={handleClick}>
        Submit all
      </button>
    </div>
  );
};
