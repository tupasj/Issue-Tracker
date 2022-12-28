import styled from 'styled-components';
import { Field, ErrorMessage } from 'formik';
import { ErrorMessageText } from '@/components/Elements/Form';

const FormControl = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: start;
`;

const StyledField = styled(Field)`
  height: 32px;
  padding-left: 6px;
  padding-right: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorWrapper = styled.div`
  height: 15px;
`;

type Props = {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
};

export const Input = ({ type, id, name, placeholder }: Props) => {
  return (
    <>
      <FormControl>
        <StyledField type={type} id={id} name={name} placeholder={placeholder} />
      </FormControl>
      <ErrorWrapper>
        <ErrorMessage name={name} component={ErrorMessageText as any} />
      </ErrorWrapper>
    </>
  );
};
