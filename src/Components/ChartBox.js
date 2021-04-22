import React from "react";
import Chart from "chart.js/auto";
import axios from "axios";


let style = {width: "200px"}
class ChartBox extends React.Component {
  state = {
    dates: [],
    values: [],
    filter: {
      startDate: '',
      endDate: '',
      currency: '',
    }
  };

  componentDidUpdate = async () => {
    try {
      const response = await axios.get(
        "https://api.coindesk.com/v1/bpi/historical/close.json"
      );

      console.log(response);

      this.setState({
        dates: Object.keys(response.data.bpi),
        values: Object.values(response.data.bpi),
      });

      this.renderChart();
    } catch (err) {
      console.error(err);
    }
  };

  renderChart = () => {
    const ctx = document.getElementById("chart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: this.state.dates,
        datasets: [
          {
            label: "Bitcoin Price",
            data: this.state.values,
            borderColor: ["#ff00ff"],
            backgroundColor: ["#ff00ff"],
            
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  handleChange = (event) => {
    const clone = { ...this.state };

    clone.filter = { ...clone.filter, [event.target.name]: event.target.value };

    this.setState({ ...clone});
  }

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <div className="form-group">
          <label>Starting date</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            onChange={this.handleChange}
            value={this.state.filter.startDate}
          />
        </div>

        <div className="form-group">
          <label>Ending date</label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            onChange={this.handleChange}
            value={this.state.filter.endDate}
          />
        </div>
        <canvas id="chart" width="200px"></canvas>
      </div>
    );
  }
}

export default ChartBox;
