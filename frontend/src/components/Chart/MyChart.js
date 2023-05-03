import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const opts = {
  tooltips: {
      intersect: false,
      mode: "index"
  },
  responsive: true,
  maintainAspectRatio: false
};
  
const MyChart = (props) => (
  
  <Line data={props} options={opts} />
)

export default MyChart;