import styled from 'styled-components';
import { Input } from '@/components/Form';

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

export const SettingsAdditional = () => {
  return (
    <Container>
      <H2>Add additional info</H2>
      <H3>Username</H3>
      <Input stacked={false} type="text" id="username" name="username" placeholder="Username" />
      <H3>Phone number</H3>
      <Input
        stacked={false}
        type="tel"
        id="phone_number"
        name="phone_number"
        placeholder="123-45-678"
        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
      />
    </Container>
  );
};
