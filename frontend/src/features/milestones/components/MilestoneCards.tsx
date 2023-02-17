import styled from 'styled-components';
import { MilestoneCard } from './MilestoneCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

type Props = {
  milestones: any[];
};

export const MilestoneCards = ({ milestones }: Props) => {
  return (
    <Container>
      {milestones.map((milestone) => (
        <MilestoneCard
          key={milestone.id}
          id={milestone.id}
          title={milestone.title}
          isOpen={milestone.is_open}
        />
      ))}
    </Container>
  );
};
