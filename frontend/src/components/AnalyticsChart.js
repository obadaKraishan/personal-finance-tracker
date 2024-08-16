import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AnalyticsChart = ({ data, title, type = 'line' }) => {
    const ChartComponent = type === 'bar' ? Bar : Line;

    return (
        <Card className="analytics-chart-card">
            <CardContent>
                <Typography variant="h6" gutterBottom>{title}</Typography>
                <ChartComponent data={data} />
            </CardContent>
        </Card>
    );
};

export default AnalyticsChart;
