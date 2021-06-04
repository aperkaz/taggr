import React, { useState } from 'react';
import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

// Test
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import Typography from '../atoms/Typography';
import ButtonRegular from '../molecules/ButtonRegular';
import ButtonFilter from '../molecules/ButtonFilter';

// TODONOW: fix TS issues here

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

const TimeSelectoGrid = styled.div`
  margin: 0 1rem 1rem;

  display: grid;
  justify-content: start;
  grid-auto-flow: row;

  grid-template-columns: repeat(1, auto);
  grid-gap: 1rem;
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

type Props = {
  onFilterChange: ({
    fromDate,
    toDate,
    tags
  }: {
    fromDate: any;
    toDate: any;
    tags: any;
  }) => void;
};

const Filters = ({ onFilterChange }: Props) => {
  const [isWhenOpen, setIsWhenOpen] = useState(true);

  const handleClick = () => {
    // setIsWhenOpen(!isWhenOpen);
  };
  //
  const [fromDate, setFromDate] = useState(EMPTY_EPOCH_TIME);
  const [toDate, setToDate] = useState(EMPTY_EPOCH_TIME);

  const [activeTags, setActiveTags] = useState({
    // When - date pickers keep their own state
    // morning: false,
    // night: false,
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
    disgust: false
  });

  const fromDateChange = (epochDate: any) => {
    setFromDate(epochDate);

    triggerSearch({
      fromDate: epochDate,
      toDate: toDate,
      tags: activeTags
    });
  };

  const toDateChange = (epochDate) => {
    setToDate(epochDate);

    triggerSearch({
      fromDate: fromDate,
      toDate: epochDate,
      tags: activeTags
    });
  };

  const tagChange = (name) => {
    const newTags = {
      ...activeTags,
      [name]: !activeTags[name]
    };

    setActiveTags(newTags);

    // search on each change
    triggerSearch({
      fromDate: fromDate,
      toDate: toDate,
      tags: newTags
    });
  };

  const triggerSearch = ({ fromDate, toDate, tags }) => {
    const activeTagsAsList = [];
    Object.keys(tags).forEach((key) => {
      if (tags[key]) {
        activeTagsAsList.push(key);
      }
    });

    onFilterChange({
      fromDate,
      toDate,
      tags: activeTagsAsList
    });
  };

  const resetState = () => {
    setFromDate(EMPTY_EPOCH_TIME);
    setToDate(EMPTY_EPOCH_TIME);

    // toggle false all filter items
    const resetFilters = { ...activeTags };
    Object.keys(resetFilters).forEach((key) => {
      resetFilters[key] = false;
    });
    setActiveTags(resetFilters);

    triggerSearch({
      fromDate: EMPTY_EPOCH_TIME,
      toDate: EMPTY_EPOCH_TIME,
      tags: []
    });
  };

  return (
    <Wrapper>
      <Typography variant="h5" style={{ marginBottom: '1rem' }}>
        Filters
      </Typography>
      <Body>
        <List component="nav">
          {/* WHEN */}
          <ListItem button onClick={handleClick}>
            <ListItemText primary="⏰ Time Range" />
            {/* {isWhenOpen ? <ExpandLess /> : <ExpandMore />} */}
          </ListItem>
          <Collapse in={isWhenOpen} timeout="auto">
            <List component="div" disablePadding>
              <ListItem>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <TimeSelectoGrid>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="From date"
                      format="dd/MM/yyyy"
                      value={fromDate}
                      onChange={(date) => {
                        const epochDate = date
                          ? date.getTime()
                          : EMPTY_EPOCH_TIME;
                        fromDateChange(epochDate);
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                      style={{ marginTop: 0 }}
                    />
                    <KeyboardDatePicker
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
                        'aria-label': 'change date'
                      }}
                      style={{ marginTop: 0 }}
                    />
                  </TimeSelectoGrid>
                </MuiPickersUtilsProvider>
              </ListItem>
            </List>
          </Collapse>
          {/* WHAT */}
          <ListItem button onClick={handleClick}>
            <ListItemText primary="🔮 Subjects" />
            {/* {isWhenOpen ? <ExpandLess /> : <ExpandMore />} */}
          </ListItem>
          <Collapse in={isWhenOpen} timeout="auto">
            <List component="div" disablePadding>
              <ListItem>
                <ButtonGrid>
                  <ButtonFilter
                    text={'🧑 People'}
                    active={activeTags.people}
                    onClick={() => tagChange('people')}
                  />
                  <ButtonFilter
                    text={'🐶 Animals'}
                    active={activeTags.animals}
                    onClick={() => tagChange('animals')}
                  />
                  <ButtonFilter
                    text={'🚗 Vehicles'}
                    active={activeTags.vehicles}
                    onClick={() => tagChange('vehicles')}
                  />
                  <ButtonFilter
                    text={'🍔 Food'}
                    active={activeTags.food}
                    onClick={() => tagChange('food')}
                  />
                  <ButtonFilter
                    text={'🍺 Drinks'}
                    active={activeTags.drinks}
                    onClick={() => tagChange('drinks')}
                  />
                  <ButtonFilter
                    text={'🏀 Sports'}
                    active={activeTags.sports}
                    onClick={() => tagChange('sports')}
                  />
                </ButtonGrid>
              </ListItem>
            </List>
          </Collapse>
          {/* EMOTIONS */}
          {/* <ListItem button onClick={handleClick}>
            <ListItemText primary="🤣 Emotions (comming soon)" />
          </ListItem> */}
          {/* <Collapse in={isWhenOpen} timeout="auto">
            <List component="div" disablePadding>
              <ListItem>
                <ButtonGrid>
                  <ButtonFilter
                    icon={<HappyIcon />}
                    text={"Happy"}
                    disabled={true}
                    onClick={() => tagChange("happy")}
                  />
                  <ButtonFilter
                    icon={<SadIcon />}
                    text={"Sad"}
                    disabled={true}
                    onClick={() => tagChange("sad")}
                  />
                  <ButtonFilter
                    icon={<SurpriseIcon />}
                    text={"Surprise"}
                    disabled={true}
                    onClick={() => tagChange("surprise")}
                  />
                  <ButtonFilter
                    icon={<FearIcon />}
                    text={"Fear"}
                    disabled={true}
                    onClick={() => tagChange("fear")}
                  />
                  <ButtonFilter
                    icon={<AngerIcon />}
                    text={"Anger"}
                    disabled={true}
                    onClick={() => tagChange("anger")}
                  />
                  <ButtonFilter
                    icon={<DisgustIcon />}
                    text={"Disgust"}
                    disabled={true}
                    onClick={() => tagChange("disgust")}
                  />
                </ButtonGrid>
              </ListItem>
            </List>
          </Collapse> */}
        </List>
      </Body>
      <FooterDivider />
      <ButtonRegular
        text={'✨ Clear filters'}
        onClick={resetState}
        style={{
          background: '#1976d2'
        }}
      />
    </Wrapper>
  );
};

export default Filters;
