import { createSelector } from "reselect";

export const selectMainData = (state) => state.main;

export const selectTarifs = createSelector(
    [selectMainData],
    (mainData) => mainData.tarifs
);
