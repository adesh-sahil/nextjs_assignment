"use client";
import React, { useEffect, useState } from "react";
import useAppDispatch from "@/lib/hooks/appDispatch";
import useAppSelector from "@/lib/hooks/appSelector";
import {
  fetchPopulationData,
  fetchTableDataByYear,
} from "@/lib/store/featureSlice";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const PopulationPage = () => {
  const dispatch = useAppDispatch();
  const {
    populationData,
    lifeExpectancy,
    averageDensity,
    loading,
    error,
    availableYears,
    tableData,
  } = useAppSelector((state) => state.yourSlice);
  const [selectedOption, setSelectedOption] = useState("Population");
  const [timeRange, setTimeRange] = useState(5);
  const [selectedYear, setSelectedYear] = useState("2023");

  useEffect(() => {
    if (!isNaN(timeRange)) {
      dispatch(fetchPopulationData({ selectedOption, timeRange }));
    }
  }, [dispatch, selectedOption, timeRange]);

  useEffect(() => {
    dispatch(fetchTableDataByYear(selectedYear));
  }, [dispatch, selectedYear]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimeRange = parseInt(e.target.value, 10);
    setTimeRange(newTimeRange);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const formatYAxis = (tick: number) => {
    if (selectedOption === "Population") {
      return `${(tick / 1e9).toFixed(2)}B`;
    } else if (selectedOption === "Growth Rate") {
      return `${tick}%`;
    } else if (selectedOption === "Life Expectancy") {
      return `${tick} yrs`;
    } else {
      return tick.toString(); 
    }
  };

  const formatTooltip = (value: number) => {
    if (selectedOption === "Population") {
      return `${(value / 1e9).toFixed(2)}B`;
    } else if (selectedOption === "Growth Rate") {
      return `${value.toFixed(2)}%`;
    } else if (selectedOption === "Life Expectancy") {
      return `${value.toFixed(2)} yrs`;
    } else {
      return value.toFixed(2);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <select
          className="border border-gray-300 p-2 rounded-xl"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="Population">Population</option>
          <option value="Growth Rate">Growth Rate</option>
          <option value="Life Expectancy">Life Expectancy</option>
          <option value="Population Density">Population Density</option>
        </select>

        <select
          className="border border-gray-300 py-2 px-4 rounded-xl"
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          <option value="5">5 Years</option>
          <option value="10">10 Years</option>
          <option value="20">20 Years</option>
          <option value="50">50 Years</option>
          <option value="100">100 Years</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={populationData}>
            <defs>
              <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip formatter={formatTooltip} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorPop)"
              dot={{ r: 6 }}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}

      <div className="flex justify-end mt-6">
        <select
          className="border border-gray-300 py-2 px-4 rounded-xl"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Country</th>
              <th className="px-4 py-2 border-b">Population</th>
              <th className="px-4 py-2 border-b">Density</th>
              <th className="px-4 py-2 border-b">Growth Rate</th>
              <th className="px-4 py-2 border-b">Life Expectancy</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-center align-middle">
                  {row.country}
                </td>
                <td className="px-4 py-2 border-b text-center align-middle">
                  {row.population}
                </td>
                <td className="px-4 py-2 border-b text-center align-middle">
                  {averageDensity ? `${averageDensity.toFixed(0)}` : "N/A"}
                </td>
                <td className="px-4 py-2 border-b text-center align-middle">
                  {row.growthRate}
                </td>
                <td className="px-4 py-2 border-b text-center align-middle">
                  {lifeExpectancy ? `${lifeExpectancy.toFixed(0)} Yrs` : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopulationPage;
