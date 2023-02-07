import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  const [loading, setLoading] = useState(true);
  const [keyData, setKeyData] = useState<any[]>(data);

  useEffect(() => {
    const updatedKeyData = data;
    for (let i = 0; i < keyData.length; i++) {
      updatedKeyData[i].color = colors[i];
    }
    setKeyData(updatedKeyData);
  }, []);

  useEffect(() => {
    if (keyData[0].color) {
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      {loading ? (
        <></>
      ) : (
        <>
          {keyData.map((item: any) => {
            return (
              <FlexContainer>
                <ColoredCircle key={item.color} color={item.color} />
                <span key={item.name}>{item.name}</span>
              </FlexContainer>
            );
          })}
        </>
      )}
    </Container>
  );
};
