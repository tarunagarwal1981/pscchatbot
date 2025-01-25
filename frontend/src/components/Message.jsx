import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Message = ({ message }) => {
  const renderChart = (chartData) => {
    if (!chartData) return null;

    switch (chartData.type) {
      case 'line':
        return (
          <Box mt={4}>
            <LineChart width={600} height={300} data={chartData.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </Box>
        );

      case 'bar':
        return (
          <Box mt={4}>
            <BarChart width={600} height={300} data={chartData.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </Box>
        );

      case 'pie':
        return (
          <Box mt={4}>
            <PieChart width={400} height={400}>
              <Pie
                data={chartData.data}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      display="flex"
      justifyContent={message.type === 'user' ? 'flex-end' : 'flex-start'}
    >
      <Box
        maxW="80%"
        bg={
          message.type === 'user'
            ? 'blue.500'
            : message.type === 'error'
            ? 'red.500'
            : 'white'
        }
        color={
          message.type === 'user' || message.type === 'error'
            ? 'white'
            : 'black'
        }
        p={4}
        borderRadius="lg"
        shadow="md"
      >
        <Text>{message.content}</Text>
        {message.chartData && renderChart(message.chartData)}
      </Box>
    </Box>
  );
};

export default Message;
