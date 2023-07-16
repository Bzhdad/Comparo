import { createSelector } from 'reselect';

const compareOptionsSelector = state => state.rating.compareOptions;

const firstEntityRatingsSelector = createSelector(
    compareOptionsSelector,
    compareOptions => compareOptions.map(option => option.firstEntity.rating)
);
const secondEntityRatingsSelector = createSelector(
    compareOptionsSelector,
    compareOptions => compareOptions.map(option => option.secondEntity.rating)
);

const sumOfFirstEntityRatingsSelector = createSelector(
    firstEntityRatingsSelector,
    ratings => ratings.reduce((sum, rating) => sum + rating, 0)
);

const sumOfSecondEntityRatingsSelector = createSelector(
    secondEntityRatingsSelector,
    ratings => ratings.reduce((sum, rating) => sum + rating, 0)
);


export {compareOptionsSelector, firstEntityRatingsSelector, secondEntityRatingsSelector,
    sumOfFirstEntityRatingsSelector, sumOfSecondEntityRatingsSelector};