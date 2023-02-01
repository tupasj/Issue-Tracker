import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Container = styled.div`
  display: flex;
  border: 2px solid #f7faf9;
  border-radius: 4px;
`;

const SwitchLeft = styled.span<any>`
  background-color: ${(props) => (props.openActive ? 'var(--light-gray)' : 'var(--white)')};
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right-width: 1px;
  padding: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SwitchRight = styled.span<any>`
  background-color: ${(props) => (props.openActive ? 'var(--white)' : 'var(--light-gray)')};
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-left-width: 1px;
  padding: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

type Props = {
  issues: any;
  getIssues: () => any;
  openActive: boolean;
  setOpenActive: React.Dispatch<React.SetStateAction<any>>;
};

export const IssueSwitch = ({ issues, getIssues, openActive, setOpenActive }: Props) => {
  const navigate = useNavigate();
  let location = useLocation();
  const [allIssues, setAllIssues] = useState<any[]>(issues);

  const toggleSwitch = () => {
    if (openActive) {
      setOpenActive(false);
      navigate('/app/issues/closed');
    } else {
      setOpenActive(true);
      navigate('/app/issues/open');
    }
  };

  useEffect(() => {
    const getAllIssues = async () => {
      const allIssues = await getIssues();
      setAllIssues(allIssues);
    };
    getAllIssues();
  }, [location]);

  return (
    <Container>
      <SwitchLeft openActive={openActive} onClick={toggleSwitch}>
        Open ({allIssues.filter((issue: any) => issue.is_open === true).length})
      </SwitchLeft>
      <SwitchRight openActive={openActive} onClick={toggleSwitch}>
        Closed ({allIssues.filter((issue: any) => issue.is_open === false).length})
      </SwitchRight>
    </Container>
  );
};
