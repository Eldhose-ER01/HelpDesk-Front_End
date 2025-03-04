import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { FaUsers } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import axios from "axios";
import { adminApi } from "../../Api/Api";

export default function AdminChart() {
  const [users, setUsers] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [userChartData, setUserChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Users"],
      },
      yaxis: {
        title: {
          text: "Count",
        },
      },
      fill: {
        opacity: 1,
      },
      colors: ["#008FFB"], // Blue color for users
    },
  });

  const [ticketChartData, setTicketChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Tickets"],
      },
      yaxis: {
        title: {
          text: "Count",
        },
      },
      fill: {
        opacity: 1,
      },
      colors: ["#00E396"], // Green color for tickets
    },
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`${adminApi}/findchart`);
      if (response.data.success) {
        setUsers(response.data.finddata.length); 
        setTickets(response.data.Tikets.length); 

        // Update User Chart Data
        setUserChartData((prevState) => ({
          ...prevState,
          series: [
            {
              name: "Users",
              data: [response.data.finddata.length],
            },
          ],
        }));

        // Update Ticket Chart Data
        setTicketChartData((prevState) => ({
          ...prevState,
          series: [
            {
              name: "Tickets",
              data: [response.data.Tikets.length],
            },
          ],
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between mt-7 mr-56">
        <div className="h-32 w-64 bg-white shadow-xl text-xl font-bold pt-3 pl-3 text-center">
          <div className="mt-7 flex pl-7 items-center">
            <FaUsers style={{ fontSize: "3em", color: "green" }} />
            <div className="pl-14 text-lg">
              Total Users
              <p>{users}</p>
            </div>
          </div>
        </div>

        <div className="h-32 w-64 bg-white shadow-xl text-xl font-bold pt-3 pl-3 text-center">
          <div className="mt-7 flex pl-7 items-center">
            <FaChartBar style={{ fontSize: "3em", color: "orange" }} />
            <div className="pl-8 text-lg">
              Total Tickets
              <p className="text-2xl text-sky-700">{tickets}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10 ">
        <div className="w-1/2 pr-5 mr-64">
          <h2 className="text-xl font-medium mb-5">User Count</h2>
          <ReactApexChart
            options={userChartData.options}
            series={userChartData.series}
            type="bar"
            height={350}
          />
        </div>

        <div className="w-1/2 pl-5 mr-52">
          <h2 className="text-xl font-medium mb-5 ">Ticket Count</h2>
          <ReactApexChart
            options={ticketChartData.options}
            series={ticketChartData.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}