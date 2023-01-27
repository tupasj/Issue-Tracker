import styled from 'styled-components';

const Container = styled.div``;

const Option = styled.div`
  padding-bottom: 8px;
  color: var(--medium-gray);
`;

const OptionContent = styled.div`
  padding-bottom: 22px;
`;

export const IssueOptions = () => {
  return (
    <Container>
      <Option>Milestone</Option>
      <OptionContent>No milestone assigned</OptionContent>
      <Option>Labels</Option>
      <OptionContent>No labels added</OptionContent>
      <Option>Assignees</Option>
      <OptionContent>No users assigned to this Issue</OptionContent>
    </Container>
  );
};
