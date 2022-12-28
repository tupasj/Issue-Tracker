import styled from 'styled-components';

const Container = styled.div``;

const H2 = styled.h2`
  font-weight: 600;
`;

const H3 = styled.h3`
  font-style: italic;
`;

export const SettingsPage = () => {
  return (
    <Container>
      <H2>Projects</H2>
      <H3>Join a project</H3>
      <input type="text" placeholder="Enter project code..." />
      <H3>Delete a project</H3>
      <H2>User</H2>
      <H3>Change profile picture</H3>
      <H3>Change display name</H3>
      <H3>Add phone number</H3>
      <input type="tel" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
    </Container>
  );
};
