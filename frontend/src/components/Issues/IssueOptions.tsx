import styled from 'styled-components';
import { Label } from '@/elements/Label';
const Container = styled.div``;

const Option = styled.div`
  padding-bottom: 8px;
  color: var(--medium-gray);
`;

const OptionContent = styled.div`
  padding-bottom: 22px;
`;

type Props = {
  labels: any[];
};

export const IssueOptions = ({ labels }: Props) => {
  return (
    <Container>
      <Option>Milestone</Option>
      <OptionContent>No milestone assigned</OptionContent>
      <Option>Labels</Option>
      <OptionContent>
        {labels.length > 0 ? (
          <div>
            {labels.map((label) => (
              <Label key={label.name} name={label.name} color={label.color} />
            ))}
          </div>
        ) : (
          <p>No labels added</p>
        )}
      </OptionContent>
      <Option>Assignees</Option>
      <OptionContent>No users assigned to this Issue</OptionContent>
    </Container>
  );
};
