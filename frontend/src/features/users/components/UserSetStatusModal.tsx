import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { BasicModal } from '@/components/UI';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 215px;
  padding: 12px;
`;

const Title = styled.div`
  text-align: center;
  font-weight: bold;
`;

const RadioInput = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  &:hover {
    background-color: var(--light-gray);
    cursor: pointer;
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
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

type Props = {
  modalOpen: boolean;
  handleClose: () => void;
};

export const UserSetStatusModal = ({ modalOpen, handleClose }: Props) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: '#ffffff',
    boxShadow: 4,
    borderRadius: 2,
  };

  const initialValues = {
    status: '',
  };

  const handleSubmit = async (values: any) => {
    if (values.status) {
      console.log('values: ', values);
    }
  };

  return (
    <BasicModal modalOpen={modalOpen} handleClose={handleClose} styling={style}>
      <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values)}>
        <Form>
          <Container>
            <Title>Set status</Title>
            <RadioInput>
              <Field type="radio" id="available" name="status" value="available" />
              <label htmlFor="available">Available</label>
            </RadioInput>
            <RadioInput>
              <Field type="radio" id="away" name="status" value="away" />
              <label htmlFor="away">Away</label>
            </RadioInput>
            <RadioInput>
              <Field type="radio" id="busy" name="status" value="busy" />
              <label htmlFor="busy">Busy</label>
            </RadioInput>
            <SubmitButtonContainer>
              <SubmitButton>Save changes</SubmitButton>
            </SubmitButtonContainer>
          </Container>
        </Form>
      </Formik>
    </BasicModal>
  );
};
