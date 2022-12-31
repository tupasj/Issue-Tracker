import styled from 'styled-components';

const Container = styled.div``;

const H2 = styled.h2`
  padding-top: 22px;
  font-weight: 600;
`;

const H3 = styled.h3`
  font-style: italic;
`;

const Input = styled.input`
  height: 32px;
  padding-left: 6px;
  padding-right: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  display: block;
  margin-top: 28px;
  padding: 6px;
  width: 150px;
  border-radius: 4px;
  background-color: #33a83a;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: transform 200ms;
  &:hover {
    background-color: #238629;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: start;
`;

export const SettingsPage = () => {
  return (
    <Container>
      <Form>
        <H2>Projects</H2>
        <H3>Join a project</H3>
        <Input type="text" placeholder="Enter project code..." />
        <H3>Delete a project</H3>
        <Input type="text" placeholder="Enter project name.." />
        <H2>Personalization</H2>
        <H3>Change profile picture</H3>
        <input
          type="file"
          id="profile_picture"
          name="profile_picture"
          accept="image/png, image/jpeg"
        />
        <H3>Change display name</H3>
        <div>
          <input type="radio" id="email" name="display_name" value="email" />
          <label htmlFor="email">Email</label>
          <input type="radio" id="username" name="display_name" value="username" />
          <label htmlFor="username">Username</label>
          <input type="radio" id="name" name="display_name" value="name" />
          <label htmlFor="name">Name</label>
        </div>
        <H2>Add additional info</H2>
        <H3>Username</H3>
        <Input type="text" placeholder="Username" />
        <H3>First and last name</H3>
        <Input type="text" placeholder="First name" />
        <Input type="text" placeholder="Last name" />
        <H3>Phone number</H3>
        <Input type="tel" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
        <SubmitButton>Save changes</SubmitButton>
      </Form>
    </Container>
  );
};
