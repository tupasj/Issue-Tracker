import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignsPost } from '@fortawesome/free-solid-svg-icons';
import { UserProfileImage } from '@/features/users';
import { Label, TooltipWrapper } from '@/elements';

const Container = styled.div``;

const MilestonesContainer = styled.div``;

const LabelsContainer = styled.div``;

const AssigneesContainer = styled.div``;

const AssigneesWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

type ItemProps = {
  changes?: any;
  emptyTextPlaceholder: string;
  labels?: any[];
  assignees?: any[];
};

const Milestones = ({ changes, emptyTextPlaceholder }: ItemProps) => {
  return (
    <MilestonesContainer>
      {changes && changes.title !== 'none' ? (
        <div>
          <FontAwesomeIcon icon={faSignsPost} />
          <span> {changes.title}</span>
        </div>
      ) : (
        <div>{emptyTextPlaceholder}</div>
      )}
    </MilestonesContainer>
  );
};

const Labels = ({ emptyTextPlaceholder, labels }: ItemProps) => {
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

const Assignees = ({ emptyTextPlaceholder, assignees }: ItemProps) => {
  return (
    <AssigneesContainer>
      {assignees![0] ? (
        <AssigneesWrapper>
          {assignees!.map((assignee: any) => (
            <TooltipWrapper text={assignee.email} additionalText="">
              <UserProfileImage key={assignee.email} user={assignee} />
            </TooltipWrapper>
          ))}
        </AssigneesWrapper>
      ) : (
        <div>{emptyTextPlaceholder}</div>
      )}
    </AssigneesContainer>
  );
};

type Props = {
  title: string;
  emptyTextPlaceholder: string;
  changes: any;
  labels?: any[];
  assignees?: any[];
};

export const IssueOptionItems = ({
  title,
  emptyTextPlaceholder,
  changes,
  labels,
  assignees,
}: Props) => {
  let items;
  if (title === 'Milestone') {
    items = <Milestones emptyTextPlaceholder={emptyTextPlaceholder} changes={changes} />;
  } else if (title === 'Labels') {
    items = (
      <Labels emptyTextPlaceholder={emptyTextPlaceholder} changes={changes} labels={labels} />
    );
  } else if (title === 'Assignees') {
    items = <Assignees emptyTextPlaceholder={emptyTextPlaceholder} assignees={assignees} />;
  }

  return <Container>{items}</Container>;
};
