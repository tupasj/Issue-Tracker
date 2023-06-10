import styled from 'styled-components';
import { PieChart, Pie, Cell } from 'recharts';
import { Key } from './Key';
import { LoadingPlaceholder } from '@/elements';

const Container = styled.div`
  box-shadow: 0px 0px 1px 1px var(--light-gray);
`;

const Title = styled.div`
  padding-top: 18px;
  text-align: center;
  font-weight: 600;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

interface PieData {
  name: string;
  value: number;
}

type Props = {
  title: string;
  data: PieData[];
  colors: string[];
  issuesLoading: boolean;
  chartDataLoading: boolean;
};

const RADIAN = Math.PI / 180;
// @ts-ignore
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const Chart = ({ title, data, colors, issuesLoading, chartDataLoading }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      {issuesLoading ? (
        <LoadingPlaceholder />
      ) : (
        <>
          {!chartDataLoading ? (
            <FlexContainer>
              <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
              {data[0] && colors[0] && <Key data={data} colors={colors} />}
            </FlexContainer>
          ) : (
            <NoDataContainer>No data available</NoDataContainer>
          )}
        </>
      )}
    </Container>
  );
};
