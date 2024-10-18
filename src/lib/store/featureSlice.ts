import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface PopulationData {
  year: string;
  value: number;
}

interface TableData {
  country: string;
  population: number;
  density: number;
  growthRate: number;
  lifeExpectancy: number;
}

interface PopulationState {
  totalPopulation: number | null;
  changeInPopulation: number | null;
  lifeExpectancy: number | null;
  averageDensity: number | null;
  populationData: PopulationData[];
  availableYears: string[];
  tableData: TableData[];
  loading: boolean;
  error: string | null;
}

const initialState: PopulationState = {
  totalPopulation: null,
  changeInPopulation: null,
  lifeExpectancy: null,
  averageDensity: null,
  populationData: [],
  availableYears: [],
  tableData: [],
  loading: false,
  error: null,
};

// Fetch population data for the homepage
export const fetchHomePageData = createAsyncThunk('population/fetchHomePageData', async () => {
  const response = await fetch(
    "https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?date=2020:2023&format=json"
  );
  const data = await response.json();
  const populationData = data[1].map((item: { date: string; value: number }) => ({
    year: item.date,
    value: item.value,
  }));

  const totalPopulation = populationData[0]?.value || null;
  const changeInPopulation = populationData[0]?.value - populationData[1]?.value || null;

  const densityResponse = await fetch(
    `https://api.worldbank.org/v2/country/WLD/indicator/EN.POP.DNST?date=1960:2021&format=json`
  );
  const densityData = await densityResponse.json();
  const averageDensity = densityData[1][0]?.value || "N/A";

  const lifeExpectancyResponse = await fetch(
    `https://api.worldbank.org/v2/country/WLD/indicator/SP.DYN.LE00.IN?date=1960:2021&format=json`
  );
  const lifeExpectancyData = await lifeExpectancyResponse.json();
  const lifeExpectancy = lifeExpectancyData[1][0]?.value || "N/A";

  return {
    totalPopulation,
    changeInPopulation,
    lifeExpectancy,
    averageDensity,
    populationData,
  };
});

// Fetch population data dynamically based on selected options for the population page
export const fetchPopulationData = createAsyncThunk(
  'population/fetchPopulationData',
  async ({
    selectedOption,
    timeRange,
  }: {
    selectedOption: string;
    timeRange: number;
  }) => {
    let indicator = '';
    switch (selectedOption) {
      case 'Population':
        indicator = 'SP.POP.TOTL';
        break;
      case 'Growth Rate':
        indicator = 'SP.POP.GROW';
        break;
      case 'Life Expectancy':
        indicator = 'SP.DYN.LE00.IN';
        break;
      case 'Population Density':
        indicator = 'EN.POP.DNST';
        break;
      default:
        indicator = 'SP.POP.TOTL';
    }

    const currentYear = 2023;
    const startYear = currentYear - timeRange;

    if (isNaN(startYear) || startYear < 1960) {
      throw new Error("Invalid year range");
    }

    const response = await fetch(
      `https://api.worldbank.org/v2/country/WLD/indicator/${indicator}?date=${startYear}:${currentYear}&format=json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const data = await response.json();
    const populationData = data[1].map((item: { date: string; value: number }) => ({
      year: item.date,
      value: item.value,
    }));

    return {
      populationData,
    };
  }
);

// Fetch table data dynamically by year
export const fetchTableDataByYear = createAsyncThunk(
  'population/fetchTableDataByYear',
  async (year: string) => {
    const response = await fetch(
      `https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?date=${year}&format=json`
    );
    const data = await response.json();

    return {
      availableYears: data[1].map((item: { date: string }) => item.date),
      tableData: data[1].map((item: { country: { value: string }; value: number }) => ({
        country: item.country.value,
        population: item.value,
        density: 100, // Mock data, adjust based on real API response
        growthRate: 1.5, // Mock data
        lifeExpectancy: 70, // Mock data
      })),
    };
  }
);

const populationSlice = createSlice({
  name: 'population',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomePageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomePageData.fulfilled, (state, action: PayloadAction<{
        totalPopulation: number | null;
        changeInPopulation: number | null;
        lifeExpectancy: number | null;
        averageDensity: number | null;
        populationData: PopulationData[];
      }>) => {
        state.loading = false;
        state.totalPopulation = action.payload.totalPopulation;
        state.changeInPopulation = action.payload.changeInPopulation;
        state.lifeExpectancy = action.payload.lifeExpectancy;
        state.averageDensity = action.payload.averageDensity;
        state.populationData = action.payload.populationData;
      })
      .addCase(fetchHomePageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch homepage data";
      })
      .addCase(fetchPopulationData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopulationData.fulfilled, (state, action: PayloadAction<{ populationData: PopulationData[] }>) => {
        state.loading = false;
        state.populationData = action.payload.populationData;
      })
      .addCase(fetchTableDataByYear.fulfilled, (state, action) => {
        state.availableYears = action.payload.availableYears;
        state.tableData = action.payload.tableData;
      })
      .addCase(fetchPopulationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch population data";
      });
  },
});

export default populationSlice.reducer;
