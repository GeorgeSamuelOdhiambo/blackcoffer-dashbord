/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Button, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import ChartComponent from '../chart-component';
import PieChartComponent from '../pie-chart-component';


export default function AppView() {
  const [data, setData] = useState(null);
  const [nameFilter, setNameFilter] = useState();
  const [inputValue, setInputValue] = useState();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
        setFilteredData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filterOptions = ['end_year', 'topic', 'sector', 'region', 'pestle', 'source', 'country'];
  const onChangeHandler = () => {
    const filteredDatas = data.filter((item) => {
      if (nameFilter === 'end_year') {
        return String(item[nameFilter]).includes(String(inputValue));
      }
      const filterValue = String(item[nameFilter]).toLowerCase();
      const inputValueLowerCase = String(inputValue).toLowerCase();
      return filterValue.includes(inputValueLowerCase) || filterValue === inputValueLowerCase;
    });
    console.log(filteredDatas);
    setFilteredData(filteredDatas);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item>
          <FormControl variant="outlined" sx={{ minWidth: 250 }}>
            <InputLabel id="name-filter-label">Filter By</InputLabel>
            <Select
              labelId="name-filter-label"
              id="name-filter"
              value={nameFilter}
              onChange={(e) => {
                setNameFilter(e.target.value);
                setInputValue('');
              }}
              label="Name Filter"
            >
              <MenuItem value="">None</MenuItem>
              {filterOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            id="input-field"
            label="Input"
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={onChangeHandler}>
            Search
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid xs={12} md={12} lg={12}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Line Graph
          </Typography>
          <ChartComponent data={filteredData} type="line" />
        </Grid>
        <Grid xs={12} md={12} lg={12}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Bar Graph
          </Typography>
          <ChartComponent data={filteredData} type="bar" />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Doted Line Graph
          </Typography>
          <PieChartComponent data={filteredData} />
        </Grid>
      </Grid>
    </Container>
  );
}
