import React, { FC, useState, useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Text } from '@visx/text';

type DataPoint = {
  month: string;
  value: number;
};

const initialData: DataPoint[] = [
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

const ChartPage: FC = () => {
  const [data, setData] = useState<DataPoint[]>(initialData);

  const width = 800;
  const height = 500;
  const margin = { top: 20, bottom: 40, left: 60, right: 20 };

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(d => d.month),
        padding: 0.4,
      }),
    [xMax, data],
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(d => d.value))],
      }),
    [yMax, data],
  );

  return (
    <div>
      <h1>Gráfico de Vendas</h1>
      {/* Campos de entrada para os valores */}
      {data.map((d, index) => (
        <div key={index}>
          <span>{d.month}: </span>
          <input
            type="number"
            value={d.value}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              if (!isNaN(newValue)) {
                const newData = [...data];
                newData[index].value = newValue;
                setData(newData);
              }
            }}
          />
        </div>
      ))}
      {/* Renderização do gráfico */}
      {width >= 10 && (
        <svg width={width} height={height}>
          <Group top={margin.top} left={margin.left}>
            {data.map(d => {
              const label = d.month;
              const barWidth = xScale.bandwidth();
              const barHeight = yMax - (yScale(d.value) ?? 0);
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
            {/* Resto das legendas e renderização do gráfico */}
            {xScale.domain().map((label, index) => {
              const barX = xScale(label)?.valueOf() || 0 + xScale.bandwidth() / 2;
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
            {yScale.ticks().map((tickValue, index) => {
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
      )}
    </div>
  );
};

export default ChartPage;
