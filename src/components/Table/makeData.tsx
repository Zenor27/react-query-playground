/*
Nothing to see here. Just some data generation.
*/

import { Data, Total } from "./types";

export const makeData = (): Data[] => {
  return [
    {
      project: "Project 1",
      details: [
        {
          userName: "User 1",
          periods: [
            {
              name: "S39",
              real: "3J",
              prev: "2J",
            },
            {
              name: "S40",
              real: "1J",
              prev: "1J",
            },
          ],
        },
        {
          userName: "User 2",
          periods: [
            {
              name: "S39",
              real: "1J",
              prev: "1J",
            },
            {
              name: "S40",
              real: "1J",
              prev: "1J",
            },
          ],
        },
      ],
      periods: [
        {
          name: "S39",
          real: "4J",
          prev: "3J",
        },
        {
          name: "S40",
          real: "2J",
          prev: "2J",
        },
      ],
    },
    {
      project: "Project 2",
      details: [
        {
          userName: "User 1",
          periods: [
            {
              name: "S39",
              real: "1J",
              prev: "1J",
            },
            {
              name: "S40",
              real: "1J",
              prev: "2J",
            },
          ],
        },
        {
          userName: "User 2",
          periods: [
            {
              name: "S39",
              real: "2J",
              prev: "1J",
            },
            {
              name: "S40",
              real: "1J",
              prev: "1J",
            },
          ],
        },
      ],
      periods: [
        {
          name: "S39",
          real: "3J",
          prev: "2J",
        },
        {
          name: "S40",
          real: "2J",
          prev: "3J",
        },
      ],
    },
  ];
};

export const makeTotals = (): Total[] => {
  return [
    {
      periodName: "S39",
      real: "7J",
      prev: "5J",
    },
    {
      periodName: "S40",
      real: "4J",
      prev: "5J",
    },
  ];
};
