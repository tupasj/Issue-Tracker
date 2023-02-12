import styled from 'styled-components';

const Container = styled.div`
  background-color: #f7faf9;
  position: absolute;
  right: -4px;
  padding: 8px;
  border-radius: 8px;
  top: 34px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);
`;

type Props = {
  dropdownActive: boolean;
  children: React.ReactNode;
};

export const Dropdown = ({ dropdownActive, children }: Props) => {
  return <>{dropdownActive ? <Container>{children}</Container> : <></>}</>;
};
