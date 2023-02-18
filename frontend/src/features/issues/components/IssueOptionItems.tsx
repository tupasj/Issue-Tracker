import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignsPost } from '@fortawesome/free-solid-svg-icons';
import { Label } from '@/elements/Label';

const Container = styled.div``;

const MilestonesContainer = styled.div``;

const LabelsContainer = styled.div``;

const AssigneesContainer = styled.div``;

type ItemProps = {
  changes: any;
  emptyTextPlaceholder: string;
  labels?: any[];
};

const Milestones = ({ changes, emptyTextPlaceholder }: ItemProps) => {
  return (
    <MilestonesContainer>
      {changes && changes !== 'none' ? (
        <div>
          <FontAwesomeIcon icon={faSignsPost} />
          <span> {changes}</span>
        </div>
      ) : (
        <div>{emptyTextPlaceholder}</div>
      )}
    </MilestonesContainer>
  );
};

const Labels = ({ changes, emptyTextPlaceholder, labels }: ItemProps) => {
  const labelsArray = labels as any;

  return (
    <LabelsContainer>
      {labelsArray[0] ? (
        <div>
          {labelsArray.map((item: any) => (
            <Label key={item.name} name={item.name} color={item.color} />
          ))}
        </div>
      ) : (
        <div>{emptyTextPlaceholder}</div>
      )}
    </LabelsContainer>
  );
};

const Assignees = () => {
  return <AssigneesContainer>assignees</AssigneesContainer>;
};

type Props = {
  title: string;
  emptyTextPlaceholder: string;
  changes: any;
  labels?: any[];
};

export const IssueOptionItems = ({ title, emptyTextPlaceholder, changes, labels }: Props) => {
  let items;
  if (title === 'Milestone') {
    items = <Milestones emptyTextPlaceholder={emptyTextPlaceholder} changes={changes} />;
  } else if (title === 'Labels') {
    items = (
      <Labels emptyTextPlaceholder={emptyTextPlaceholder} changes={changes} labels={labels} />
    );
  } else if (title === 'Assignees') {
    items = <Assignees />;
  }

  return <Container>{items}</Container>;
};
