import styled from 'styled-components';
import { Input } from '@/components/Form';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { userContext } from '@/context';
import { updateUserUsername, updateUserPhoneNumber } from '@/features/users';
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
  setChangesApplied: React.Dispatch<React.SetStateAction<boolean>>;
};

interface Values {}

export const SettingsAdditional = ({ submitButtonRef, setChangesApplied }: Props) => {
  const { email } = userContext();
  const initialValues = {
    username: '',
    phoneNumber: '',
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, 'Usernames must be a minimum of 2 characters.')
      .max(50, 'Usernames must not exceed 50 characters.'),
    phoneNumber: Yup.string().matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, {
      message: 'Invalid phone number format.',
    }),
  });

  const handleSubmit = async (values: any) => {
    if (values.username || values.phoneNumber) {
      console.log('SettingsAdditional submit');
      console.log('values: ', values);
      if (values.username) {
        await updateUserUsername(email, values);
        setChangesApplied(true);
      }
      if (values.phoneNumber) {
        await updateUserPhoneNumber(email, values);
        setChangesApplied(true);
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values) => handleSubmit(values)}
    >
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
            placeholder="123-456-7890"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          />
        </Container>
        <SubformSubmitButton ref={submitButtonRef} />
      </Form>
    </Formik>
  );
};
