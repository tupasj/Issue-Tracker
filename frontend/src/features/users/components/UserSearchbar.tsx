import styled from 'styled-components';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 4px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background-color: var(--white);
  width: 25%;
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
  users?: any[];
  setUsers?: React.Dispatch<React.SetStateAction<any>>;
};

export const UserSearchbar = ({ users, setUsers }: Props) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    // setUsers(users.filter((user: any) => user.display_name.includes(inputText)));
    console.log('new users: ', users);
  };

  const handleKeydownSubmit = (e: any) => {
    if (e.keyCode === 13) {
      //   setUsers(users.filter((user: any) => user.display_name.includes(inputText)));
      console.log('new users: ', users);
    }
  };

  return (
    <Container>
      <StyledFontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSubmit} />
      <Input
        type="text"
        placeholder="Search someone..."
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => handleKeydownSubmit(e)}
      />
    </Container>
  );
};
