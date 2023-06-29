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
  @media (max-width: 640px) {
    width: 57%;
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
  issues: any;
  setIssues: React.Dispatch<React.SetStateAction<any>>;
};

export const IssueSearchbar = ({ issues, setIssues }: Props) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    setIssues(issues.filter((issue: any) => issue.title.includes(inputText)));
    console.log('new issues: ', issues);
  };

  const handleKeydownSubmit = (e: any) => {
    if (e.keyCode === 13) {
      setIssues(issues.filter((issue: any) => issue.title.includes(inputText)));
      console.log('new issues: ', issues);
    }
  };

  return (
    <Container>
      <StyledFontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSubmit} />
      <Input
        type="text"
        placeholder="Search Issues..."
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => handleKeydownSubmit(e)}
      />
    </Container>
  );
};
