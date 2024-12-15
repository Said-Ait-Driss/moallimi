"use client"

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);



export default function AcademicLevelsStateChart({ state }: any) {
    const labels = state.map((item: any) => item.academicLevelName);
    const counts = state.map((item: any) => item.studentCount);


    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Students by Academic Level',
                data: counts,
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                hoverOffset: 4
            }
        ]
    };

    return (
        <div className="chart-container max-w-96 mx-auto mt-8">
            <Doughnut
                data={data}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: 'Students by Academic Level'
                        }
                    }
                }}
            />
        </div>
    );
}
