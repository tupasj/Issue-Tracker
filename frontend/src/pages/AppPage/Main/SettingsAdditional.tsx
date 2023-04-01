import styled from 'styled-components';
import { Input } from '@/components/Form';
import { Formik, Form } from 'formik';
import { userContext } from '@/context';
import { updateUserUsername } from '@/features/users';
import { SubformSubmitButton } from '@/components/Form';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const H2 = styled.h2`
  padding-top: 22px;
  font-weight: 600;
`;

const H3 = styled.h3`
  font-style: italic;
`;

type Props = {
  submitButtonRef: any;
};

interface Values {}

export const SettingsAdditional = ({ submitButtonRef }: Props) => {
  const { email } = userContext();
  const initialValues = {
    username: '',
    phoneNumber: '',
  };

  const handleSubmit = async (values: any) => {
    console.log('SettingsAdditional submit');
    console.log('values: ', values);
    if (values.username) {
      await updateUserUsername(email, values);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values)}>
      <Form>
        <Container>
          <H2>Add additional info</H2>
          <H3>Username</H3>
          <Input stacked={false} type="text" id="username" name="username" placeholder="Username" />
          <H3>Phone number</H3>
          <Input
            stacked={false}
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="123-45-678"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          />
        </Container>
        <SubformSubmitButton ref={submitButtonRef} />
      </Form>
    </Formik>
  );
};
