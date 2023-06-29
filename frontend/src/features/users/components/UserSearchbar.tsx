import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { getUsers } from '../api';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 4px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background-color: var(--white);
  width: 25%;
  @media (max-width: 640px) {
    width: 50%;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 14px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.75);
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
`;

type Props = {
  users: any[];
  setUsers: React.Dispatch<React.SetStateAction<any>>;
  currentProject?: any;
};

export const UserSearchbar = ({ users, setUsers, currentProject }: Props) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = async (e: any) => {
    const enterKey = e.keyCode === 13;
    const click = e.type === 'click';

    if (enterKey || click) {
      const retrievedUsers = await getUsers(currentProject);
      const inputTextIgnoreCase = new RegExp(inputText, 'i');
      // Filter for display name that passes the regex test
      setUsers(retrievedUsers.filter((user: any) => inputTextIgnoreCase.test(user.display_name)));
    }
  };

  return (
    <Container>
      <StyledFontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSubmit} />
      <Input
        type="text"
        placeholder="Search someone..."
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => handleSubmit(e)}
      />
    </Container>
  );
};
