"use client";
import { useEffect } from "react";
import useAppDispatch from "@/lib/hooks/appDispatch";
import useAppSelector from "@/lib/hooks/appSelector";
import { fetchHomePageData } from "@/lib/store/featureSlice";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    totalPopulation,
    changeInPopulation,
    lifeExpectancy,
    averageDensity,
    populationData,
    loading,
    error,
  } = useAppSelector((state) => state.yourSlice);

  useEffect(() => {
    dispatch(fetchHomePageData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-4 min-h-screen">
      <div className="flex flex-row gap-8">
        <div className="space-x-4 bg-gray-100 p-6 rounded-xl w-1/2">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-s">World Population</h2>
            <p className="text-2xl font-bold">
              {totalPopulation
                ? `${(totalPopulation / 1e9).toFixed(2).toLocaleString()}B`
                : "N/A"}
            </p>
          </div>
        </div>
        <div className="space-x-4 bg-gray-100 p-6 py-8 rounded w-1/2">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-s">Average Density</h2>
            <p className="text-2xl font-bold">
              {averageDensity ? `${averageDensity.toFixed(0)}p/sqft` : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div
        className="bg-gray-100 p-8 rounded-xl flex gap-9"
        style={{ minHeight: "72vh" }}
      >
        <div className="w-1/7 space-y-3 flex flex-col justify-center">
          <h2 className="text-xs">Total Population</h2>
          <p className="text-2xl font-bold">
            {totalPopulation
              ? `${(totalPopulation / 1e9).toFixed(2).toLocaleString()}B`
              : "N/A"}
          </p>

          <h2 className="text-xs">Change in last year</h2>
          <p className="text-2xl font-bold">
            {changeInPopulation
              ? `+${(changeInPopulation / 1e6).toFixed(0).toLocaleString()}M`
              : "N/A"}
          </p>

          <h2 className="text-xs">Life Expectancy at birth</h2>
          <p className="text-2xl font-bold">
            {lifeExpectancy ? `${lifeExpectancy.toFixed(0)} Yrs` : "N/A"}
          </p>

          <button className="bg-gradient-to-r from-blue-800 via-purple-500 to-pink-500 text-white text-sm py-2 rounded-full mt-4">
            Dive Deeper
          </button>
        </div>

        <div className="w-2/3 flex flex-col justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={populationData}>
              <defs>
                <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis
                tickFormatter={(tick) => {
                  return `${(tick / 1e9).toFixed(1)}B`;
                }}
              />
              <Tooltip formatter={(value) => (typeof value === 'number' ? `${(value / 1e9).toFixed(2)}B` : 'N/A')} />
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
        </div>
      </div>
    </div>
  );
};

export default Home;
