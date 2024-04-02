import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import '../Dashboard.css';
// Import the necessary components from Chart.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const diseasesData = {
    "Blood Pressure": {
        chartType: "Bar",
        data: {
            labels: ['Systolic', 'Diastolic'],
            datasets: [{
                label: 'Blood Pressure (mmHg)',
                data: [120, 80],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            }],
        },
    },
    "Glucose Levels": {
        chartType: "Pie",
        data: {
            labels: ['Normal', 'High'],
            datasets: [{
                label: 'Glucose Levels (mmol/L)',
                data: [5.5, 7.2],
                backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            }],
        },
    },
    "Cholesterol Levels": {
        chartType: "Bar",
        data: {
            labels: ['LDL', 'HDL'],
            datasets: [{
                label: 'Cholesterol (mg/dL)',
                data: [100, 60],
                backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(255, 159, 64, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1,
            }],
        },
    },

    "Heart Rate": {
        chartType: "Bar",
        data: {
            labels: ['Resting', 'Active'],
            datasets: [{
                label: 'Heart Rate (beats per minute)',
                data: [70, 150],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            }],
        },
    },
    "BMI": {
        chartType: "Pie",
        data: {
            labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
            datasets: [{
                label: 'BMI Categories',
                data: [5, 50, 30, 15],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
            }],
        },
    },
    "Vitamin D": {
        chartType: "Pie",
        data: {
            labels: ['Adequate', 'Insufficiency', 'Deficiency'],
            datasets: [{
                label: 'Vitamin D (ng/mL)',
                data: [20, 15, 5],
                backgroundColor: ['rgba(255, 215, 0, 0.2)', 'rgba(255, 165, 0, 0.2)', 'rgba(255, 69, 0, 0.2)'],
                borderColor: ['rgba(255, 215, 0, 1)', 'rgba(255, 165, 0, 1)', 'rgba(255, 69, 0, 1)'],
                borderWidth: 1,
            }],
        },
    },
    "Obesity": {
        chartType: "Bar",
        data: {
            labels: ['BMI'],
            datasets: [{
                label: 'Body Mass Index',
                data: [28],
                backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgba(255, 159, 64, 1)'],
                borderWidth: 1,
            }],
        },
    },
    "Asthma": {
        chartType: "Pie",
        data: {
            labels: ['Controlled', 'Uncontrolled'],
            datasets: [{
                label: 'Asthma Control',
                data: [75, 25],
                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            }],
        },
    },
    "Arthritis": {
        chartType: "Bar",
        data: {
            labels: ['Pain Severity'],
            datasets: [{
                label: 'Arthritis Pain (0-10 Scale)',
                data: [6],
                backgroundColor: ['rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(153, 102, 255, 1)'],
                borderWidth: 1,
            }],
        },
    },
    "Depression": {
        chartType: "Pie",
        data: {
            labels: ['Mild', 'Moderate', 'Severe'],
            datasets: [{
                label: 'Depression Severity',
                data: [30, 50, 20],
                backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            }],
        },
    },
    "Kidney Disease": {
        chartType: "Bar",
        data: {
            labels: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5'],
            datasets: [{
                label: 'Chronic Kidney Disease Stage',
                data: [10, 20, 40, 20, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
            }],
        },
    },

    //    for dummy diseases
};

const Dashboard = () => {
    const [selectedDisease, setSelectedDisease] = useState("Blood Pressure");

    const renderChart = () => {
        const disease = diseasesData[selectedDisease];
        if (disease.chartType === "Bar") {
            return <Bar data={disease.data} />;
        } else if (disease.chartType === "Pie") {
            return <Pie data={disease.data} />;
        }
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                {Object.keys(diseasesData).map((disease) => (
                    <button key={disease} onClick={() => setSelectedDisease(disease)}>
                        {disease}
                    </button>
                ))}
            </div>
            <div className="main-content">
                <p>Selected Category: {selectedDisease}</p>
                <div className="chart-container">
                    {renderChart()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
