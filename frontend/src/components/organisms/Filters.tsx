import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import Typography from "../atoms/Typography";
import ButtonRegular from "../molecules/ButtonRegular";
import ButtonFilter from "../molecules/ButtonFilter";
import { types } from "taggr-shared";

const Wrapper = styled.div`
  padding: 1rem;

  height: calc(100% - 2rem);
  width: 250px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;

  box-shadow: 0 0 8px #ccc;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: white;

  border-radius: 6px;

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  /* Enable scroll-behavior, but hide scroll-bar */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-auto-flow: row;

  grid-template-columns: repeat(2, auto);
  grid-gap: 1rem;
`;

const FooterDivider = styled.div`
  margin: auto auto 1rem;

  height: 4px;
  width: 80%;

  background: linear-gradient(70.98deg, #ff96ad 9.38%, #feaf85 91.67%);

  border-radius: 4px;
`;

const EMPTY_EPOCH_TIME = null;
const ACTIVE_TAGS = {
  // What
  people: false,
  animals: false,
  vehicles: false,
  food: false,
  drinks: false,
  sports: false,
  // Emotions
  happy: false,
  sad: false,
  surprise: false,
  fear: false,
  anger: false,
  disgust: false,
};

type EpochDate = number | null;

type Props = {
  onFilterChange: ({ fromDate, toDate, tags }: types.Filters) => void;
};

const Filters = ({ onFilterChange }: Props) => {
  const [fromDate, setFromDate] = useState<EpochDate>(EMPTY_EPOCH_TIME);
  const [toDate, setToDate] = useState<EpochDate>(EMPTY_EPOCH_TIME);

  const [activeTags, setActiveTags] = useState({ ...ACTIVE_TAGS });

  const fromDateChange = (epochDate: EpochDate) => {
    setFromDate(epochDate);

    triggerSearch({
      fromDate: epochDate,
      toDate: toDate,
      tags: activeTags,
    });
  };

  const toDateChange = (epochDate: EpochDate) => {
    setToDate(epochDate);

    triggerSearch({
      fromDate: fromDate,
      toDate: epochDate,
      tags: activeTags,
    });
  };

  const tagChange = (name: keyof typeof ACTIVE_TAGS) => {
    const newTags = {
      ...activeTags,
      [name]: !activeTags[name],
    };

    setActiveTags(newTags);

    // search on each change
    triggerSearch({
      fromDate: fromDate,
      toDate: toDate,
      tags: newTags,
    });
  };

  const triggerSearch = ({
    fromDate,
    toDate,
    tags,
  }: {
    fromDate: EpochDate;
    toDate: EpochDate;
    tags: typeof ACTIVE_TAGS;
  }) => {
    const activeTagsAsList: types.Tag[] = [];
    Object.keys(tags).forEach((key) => {
      if (tags[key as types.Tag]) {
        activeTagsAsList.push(key as types.Tag);
      }
    });

    onFilterChange({
      fromDate,
      toDate,
      tags: activeTagsAsList,
    });
  };

  const resetState = () => {
    setFromDate(EMPTY_EPOCH_TIME);
    setToDate(EMPTY_EPOCH_TIME);

    // toggle false all filter items
    const resetFilters = { ...activeTags };
    Object.keys(resetFilters).forEach((key) => {
      resetFilters[key as keyof typeof ACTIVE_TAGS] = false;
    });
    setActiveTags(resetFilters);

    triggerSearch({
      fromDate: EMPTY_EPOCH_TIME,
      toDate: EMPTY_EPOCH_TIME,
      tags: { ...ACTIVE_TAGS },
    });
  };

  return (
    <Wrapper>
      <Typography variant="h5" style={{ marginBottom: "1rem" }}>
        Filters
      </Typography>
      <Body>
        <List component="nav">
          {/* WHEN */}
          <ListItem>
            <ListItemText primary="⏰ Time Range" />
          </ListItem>
          <List component="div">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ListItem>
                <DatePicker
                  label="From date"
                  value={fromDate}
                  onChange={(date: Date | null) => {
                    const epochDate = date ? date.getTime() : EMPTY_EPOCH_TIME;
                    fromDateChange(epochDate);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ width: 250 }} {...params} />
                  )}
                />
              </ListItem>
              <ListItem>
                <DatePicker
                  label="To date"
                  value={toDate}
                  onChange={(date: Date | null) => {
                    const epochDate = date ? date.getTime() : EMPTY_EPOCH_TIME;
                    toDateChange(epochDate);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ width: 250 }} {...params} />
                  )}
                />
              </ListItem>
            </LocalizationProvider>

            {/* <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="To date"
                      format="dd/MM/yyyy"
                      value={toDate}
                      onChange={(date) => {
                        const epochDate = date
                          ? date.getTime()
                          : EMPTY_EPOCH_TIME;
                        toDateChange(epochDate);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      style={{ marginTop: 0 }}
                    /> */}
            {/* </TimeSelectoGrid> */}
            {/* </MuiPickersUtilsProvider> */}
          </List>
          {/* WHAT */}
          <ListItem>
            <ListItemText primary="🔮 Subjects" />
          </ListItem>
          <List component="div" disablePadding>
            <ListItem>
              <ButtonGrid>
                <ButtonFilter
                  text={"🧑 People"}
                  active={activeTags.people}
                  onClick={() => tagChange("people")}
                />
                <ButtonFilter
                  text={"🐶 Animals"}
                  active={activeTags.animals}
                  onClick={() => tagChange("animals")}
                />
                <ButtonFilter
                  text={"🚗 Vehicles"}
                  active={activeTags.vehicles}
                  onClick={() => tagChange("vehicles")}
                />
                <ButtonFilter
                  text={"🍔 Food"}
                  active={activeTags.food}
                  onClick={() => tagChange("food")}
                />
                <ButtonFilter
                  text={"🍺 Drinks"}
                  active={activeTags.drinks}
                  onClick={() => tagChange("drinks")}
                />
                <ButtonFilter
                  text={"🏀 Sports"}
                  active={activeTags.sports}
                  onClick={() => tagChange("sports")}
                />
              </ButtonGrid>
            </ListItem>
          </List>
        </List>
      </Body>
      <FooterDivider />
      <ButtonRegular
        text={"✨ Clear filters"}
        onClick={resetState}
        style={{
          background: "#1976d2",
        }}
      />
    </Wrapper>
  );
};

export default Filters;
