import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { SettingsProjects } from './SettingsProjects';
import { SettingsPersonalization } from './SettingsPersonalization';
import { SettingsAdditional } from './SettingsAdditional';

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

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: start;
`;

interface FormValues {}

export const Settings = () => {
  const initialValues = {};
  const validationSchema = Yup.object({});
  const handleSubmit = (values: FormValues) => {};

  let validationActive = false;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={validationActive}
      validateOnChange={validationActive}
      onSubmit={handleSubmit}
    >
      <StyledForm>
        <SettingsProjects />
        <SettingsPersonalization />
        <SettingsAdditional />
        <SubmitButton type="submit">Save changes</SubmitButton>
      </StyledForm>
    </Formik>
  );
};
