import styled from 'styled-components';
import { Field, ErrorMessage } from 'formik';
import { ErrorMessageText } from '@/elements/Form';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 6px;
  padding-right: 6px;
  height: 32px;
`;

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

const SuccessMessage = styled.div`
  color: green;
`;

type Props = {
  stacked: boolean;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  pattern?: string;
  validate?: any;
  successText?: string;
};

export const Input = ({ stacked, type, id, name, placeholder, validate, successText }: Props) => {
  return (
    <>
      {stacked ? (
        <>
          <FormControl>
            <StyledField
              type={type}
              id={id}
              name={name}
              placeholder={placeholder}
              validate={validate}
            />
          </FormControl>
          <ErrorWrapper>
            <ErrorMessage name={name} component={ErrorMessageText as any} />
          </ErrorWrapper>
        </>
      ) : (
        <InputContainer>
          <StyledField
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            validate={validate}
          />
          <ErrorWrapper>
            <ErrorMessage name={name} component={ErrorMessageText as any} />
          </ErrorWrapper>
          <SuccessMessage>{successText}</SuccessMessage>
        </InputContainer>
      )}
    </>
  );
};
