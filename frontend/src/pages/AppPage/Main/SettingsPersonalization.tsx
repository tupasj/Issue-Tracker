import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { Input } from '@/components/Form';
import { SubformSubmitButton } from '@/components/Form';

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

const StyledInput = styled(Input)`
  padding-left: 0px !important;
  padding-right: 0px !important;
`;

type Props = {
  submitButtonRef: any;
  setImageSelection: React.Dispatch<React.SetStateAction<any>>;
};

export const SettingsPersonalization = ({ submitButtonRef, setImageSelection }: Props) => {
  const initialValues = {};

  const handleSubmit = () => {
    console.log('SettingsPersonalization submit');
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Container>
          <H2>Personalization</H2>
          <H3>Change profile picture</H3>
          <input
            type="file"
            name="profile_image"
            onChange={(e: any) => setImageSelection(e.target.files[0])}
          />
          <H3>Change display name</H3>
          <div>
            <Field type="radio" id="username" name="display_name" value="username" />
            <label htmlFor="username">Username</label>
            <Field type="radio" id="name" name="display_name" value="name" />
            <label htmlFor="name">Name</label>
          </div>
        </Container>
        <SubformSubmitButton ref={submitButtonRef} />
      </Form>
    </Formik>
  );
};
