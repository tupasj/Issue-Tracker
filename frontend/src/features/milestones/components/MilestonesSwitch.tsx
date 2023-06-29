import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { projectsContext } from '@/context';
import { getMilestones } from '@/features/milestones';

const Container = styled.div`
  display: flex;
  border: 2px solid #f7faf9;
  border-radius: 4px;
`;

const SwitchLeft = styled.span<any>`
  background-color: ${(props) =>
    props.openStatus === 'open' ? 'var(--light-gray)' : 'var(--white)'};
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right-width: 1px;
  padding: 4px;
  font-size: 0.75rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SwitchRight = styled.span<any>`
  background-color: ${(props) =>
    props.openStatus === 'open' ? 'var(--white)' : 'var(--light-gray)'};
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-left-width: 1px;
  padding: 4px;
  font-size: 0.75rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

type Props = {
  milestones: any;
};

export const MilestoneSwitch = ({ milestones }: Props) => {
  let { milestonesOpenStatus }: any = useParams();
  const navigate = useNavigate();
  let location = useLocation();
  const [allMilestones, setAllMilestones] = useState<any[]>(milestones);
  const { currentProject } = projectsContext();

  const toggleSwitch = () => {
    if (milestonesOpenStatus === 'open') {
      navigate('/app/milestones/closed');
    } else {
      navigate('/app/milestones/open');
    }
  };

  useEffect(() => {
    const getAllMilestones = async () => {
      const allMilestones = await getMilestones(currentProject);
      setAllMilestones(allMilestones);
    };
    getAllMilestones();
  }, [location]);

  return (
    <Container>
      <SwitchLeft openStatus={milestonesOpenStatus} onClick={toggleSwitch}>
        Open ({allMilestones.filter((milestone: any) => milestone.is_open === true).length})
      </SwitchLeft>
      <SwitchRight openStatus={milestonesOpenStatus} onClick={toggleSwitch}>
        Closed ({allMilestones.filter((milestone: any) => milestone.is_open === false).length})
      </SwitchRight>
    </Container>
  );
};
