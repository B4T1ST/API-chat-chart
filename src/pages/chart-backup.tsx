import { FC, useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Text } from '@visx/text';

// Simulação de array de dados
const salesData = [
  { month: 'Jan', value: 1500 },
  { month: 'Fev', value: 2200 },
  { month: 'Mar', value: 1800 },
  { month: 'Abr', value: 2400 },
  { month: 'Mai', value: 2800 },
  { month: 'Jun', value: 2100 },
  { month: 'Jul', value: 2600 },
  { month: 'Ago', value: 2900 },
  { month: 'Set', value: 3200 },
  { month: 'Out', value: 2700 },
  { month: 'Nov', value: 3100 },
  { month: 'Dez', value: 3500 },
];

// Definindo o tipo de dados
type SalesData = {
  month: string;
  value: number;
};

const Chart: FC = () => {
    // Definindo largura e altura do gráfico
  const width = 800;
  const height = 500;
  // Definindo margens
  const margin = { top: 20, bottom: 40, left: 60, right: 20 };

  // Utilizando os dados de salesData
  const data = salesData;

  // Funções para acessar os dados
  const getLabel = (d: SalesData) => d.month;
  const getValue = (d: SalesData) => d.value;

  // Configurando as escalas x e y
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Criando escala x utilizando scaleBand
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getLabel),
        padding: 0.4,
      }),
    [xMax, data],
  );

  // Criando escala y utilizando scaleLinear
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getValue))],
      }),
    [yMax, data],
  );

  // Renderização do componente do gráfico
  return width < 10 ? null : (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        {data.map((d: SalesData) => {
          const label = getLabel(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getValue(d)) ?? 0);
          const barX = xScale(label);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${label}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
            />
          );
        })}
        {/* Legendas no eixo x */}
        {data.map((d: SalesData) => {
          const label = getLabel(d);
          const barX = (xScale(label)?.valueOf() ?? 0) + xScale.bandwidth() / 2;

          const barY = yMax + 10; // Espaçamento entre a legenda e o eixo x
          return (
            <Text
              key={`label-${label}`}
              x={barX}
              y={barY}
              dy=".33em"
              fontSize={10}
              textAnchor="middle"
              fill="#333"
            >
              {label}
            </Text>
          );
        })}
        {/* Legendas no eixo y */}
        {yScale.ticks().map((tickValue) => {
          const tickX = -10; // Espaçamento entre a legenda e o eixo y
          const tickY = yScale(tickValue);
          return (
            <Text
              key={`tick-${tickValue}`}
              x={tickX}
              y={tickY}
              dy=".33em"
              fontSize={10}
              textAnchor="end"
              fill="#333"
            >
              {tickValue}
            </Text>
          );
        })}
      </Group>
    </svg>
  );
};

export default Chart;