import React from 'react';
import { Line } from 'react-chartjs-2';
import Card from '../components/Card';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ResultPage = () => {
    const savedResponseString = localStorage.getItem("data");
    let savedResponse = null;
    let lowTariffHoursGraph = [];

    // Data variables
    let energySavings = '';
    let predictedConsumption = '';
    let predictedSolar = '';
    let remainingConsumption = '';
    let peakTariffHour = '';

    // Parse savedResponse and safely extract data
    if (savedResponseString) {
        try {
            savedResponse = JSON.parse(savedResponseString);
            const result = savedResponse?.result || {};

            lowTariffHoursGraph = result?.low_tariff_hours || [];
            energySavings = result?.energy_savings || '';
            predictedConsumption = result?.predicted_energy_consumption || '';
            predictedSolar = result?.predicted_solar_energy || '';
            remainingConsumption = result?.remaining_consumption || '';
            peakTariffHour = result?.peak_tariff_hour || '';
        } catch (error) {
            console.error("Error parsing savedResponse:", error);
        }
    }

    console.log("Saved response:", savedResponse);
    console.log("Low tariff hours:", lowTariffHoursGraph);

    // Create an array for dynamic card mapping
    const dataArray = [
        { title: "Energy Savings", number: energySavings },
        { title: "Predicted Energy Consumption", number: predictedConsumption },
        { title: "Predicted Solar Energy", number: predictedSolar },
        { title: "Remaining Consumption", number: remainingConsumption },
        { title: "Peak Tariff Hour", number: peakTariffHour }
    ];

    // Prepare the data for the line chart
    const labels = Array.from({ length: 24 }, (_, i) => i + 1); // X-axis: 1 to 24
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Tariff Hours',
                data: lowTariffHoursGraph,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Energy Consumption - Tariff Hours'
                
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hours'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Relative Tariff Values'
                }
            }
        }
    };

    return (
        <div className="p-6">

            {/* Render cards dynamically by mapping over the dataArray */}
            <div className="w-[75%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 mx-auto h-auto border-[1px] shadow-xl p-8">
                {dataArray.map((item, index) => (
                    <Card key={index} title={item.title} number={item.number} />
                ))}
            </div>

            {/* Line chart for low_tariff_hours */}
            <div className="w-[75%] mx-auto h-auto border-[1px] shadow-xl p-8">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default ResultPage;
