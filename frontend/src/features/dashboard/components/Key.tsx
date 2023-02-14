import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 4px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ColoredCircle = styled.span`
  display: inline-block;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

type Props = {
  data: any[];
  colors: string[];
};

export const Key = ({ data, colors }: Props) => {
  const [keyData, setKeyData] = useState<any[]>(data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add color property to each element in the keyData array
    const updatedKeyData = data;
    for (let i = 0; i < keyData.length; i++) {
      updatedKeyData[i].color = colors[i];
    }
    setKeyData(updatedKeyData);
  }, []);

  useEffect(() => {
    if (keyData[0].name && keyData[0].color) {
      setLoading(false);
    }
  }, [keyData]);

  return (
    <Container>
      {loading === false &&
        keyData.map((item: any) => {
          return (
            <FlexContainer key={item.name}>
              <ColoredCircle color={item.color} />
              <span>{item.name}</span>
            </FlexContainer>
          );
        })}
    </Container>
  );
};
