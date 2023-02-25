import styled from 'styled-components';

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

export const SettingsPersonalization = () => {
  return (
    <Container>
      <H2>Personalization</H2>
      <H3>Change profile picture</H3>
      <input type="file" id="profile_image" name="profile_image" accept="image/png, image/jpeg" />
      <H3>Change display name</H3>
      <div>
        <input type="radio" id="username" name="display_name" value="username" />
        <label htmlFor="username">Username</label>
        <input type="radio" id="name" name="display_name" value="name" />
        <label htmlFor="name">Name</label>
      </div>
    </Container>
  );
};
