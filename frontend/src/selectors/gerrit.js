import { createSelector } from 'reselect';
import { calculateBusinessDays } from '../util/time';

const gerritSelector = state => state.gerrit.data;

function enrichWithAge(change) {
  return {
    ...change,
    age: calculateBusinessDays(change.updated),
  };
}

function byAge(a, b) {
  return b.age - a.age;
}

export const gerritDataSelector = createSelector(gerritSelector, gerrit =>
  gerrit.map(enrichWithAge).sort(byAge)
);
