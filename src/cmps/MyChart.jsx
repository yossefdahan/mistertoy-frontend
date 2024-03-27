import React, { useEffect, useState } from 'react';
import { RadialLinearScale, Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export function MyChart({ toys }) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Percentage of Toys in Stock by Label',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,

        }],
    })

    useEffect(() => {
        const labelCounts = toys.reduce((acc, toy) => {
            // if (toy.inStock) {
            toy.labels.forEach(label => {
                acc[label] = (acc[label] || 0) + 1

            })
            // }
            return acc
        }, {})

        const totalInStock = Object.values(labelCounts).reduce((sum, count) => sum + count, 0)
        const percentages = Object.values(labelCounts).map(count => (count / totalInStock) * 100)

        setChartData({
            labels: Object.keys(labelCounts),
            datasets: [{
                ...chartData.datasets[0],
                data: percentages,
            }],
        })
    }, [toys])

    return <Pie data={chartData} />
}