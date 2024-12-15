'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);



export default function UsersStateChart({ state }: any) {
    const labels = state.map((item: any) => item.classTitle);
    const counts = state.map((item: any) => item.studentCount);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Students by Classe',
                data: counts,
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                hoverOffset: 4
            }
        ]
    };

    return (
        <div className="chart-container max-w-96 mx-auto mt-8">
            <Pie
                data={data}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: 'Users Gained between 2016-2020'
                        }
                    }
                }}
            />
        </div>
    );
}
