import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Key } from './Key';
import { LoadingPlaceholder } from '@/elements';

const Container = styled.div`
  margin: 8px;
  box-shadow: 0px 0px 1px 1px var(--light-gray);
`;

const Title = styled.div`
  padding-top: 18px;
  text-align: center;
  font-weight: 600;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledPieChart = styled(PieChart)`
  display: flex;
  justify-content: center;
  align-items: center;
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

type ResponsiveChartProps = {
  windowWidth: number;
  data: PieData[];
  colors: string[];
};

const ResponsiveChart = ({ windowWidth, data, colors }: ResponsiveChartProps) => {
  if (windowWidth <= 640) {
    return (
      <StyledPieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={70}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </StyledPieChart>
    );
  } else {
    return (
      <StyledPieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </StyledPieChart>
    );
  }
};

export const Chart = ({ title, data, colors, issuesLoading, chartDataLoading }: Props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResizeWindow = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, [windowWidth]);

  return (
    <Container>
      <Title>{title}</Title>
      {issuesLoading ? (
        <LoadingPlaceholder />
      ) : (
        <>
          {!chartDataLoading ? (
            <FlexContainer>
              <ResponsiveChart windowWidth={windowWidth} data={data} colors={colors} />
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
