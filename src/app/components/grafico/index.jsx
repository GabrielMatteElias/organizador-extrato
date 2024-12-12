import { Pie, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Grafico({ chartData, chartType }) {
    const chartOptions = {
        plugins: {
            legend: {
                position: 'top', // Posiciona a legenda no topo                
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => {
                        const value = context.raw;
                        return `R$ ${value}`; // Adiciona o prefixo 'R$' no tooltip
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const renderChart = () => {
        switch (chartType) {
            case 1:
                return <Pie data={chartData} options={chartOptions} />;
            case 2:
                return <Doughnut data={chartData} options={chartOptions} />;
            default:
                return <p>Tipo de gráfico inválido</p>;
        }
    };

    return (
        <div style={{ width: '400px', height: '400px'}}>
            {renderChart()}
        </div>
    );
};