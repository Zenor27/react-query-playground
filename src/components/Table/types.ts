export type Period = {
  name: string;
  real: string;
  prev: string;
};

export type Detail = {
  userName: string;
  periods: Period[];
};

export type Data = {
  project: string;
  details: Detail[];
  periods: Period[];
};

export type Total = {
  periodName: string;
  prev: string;
  real: string;
};
