import { Dimensions } from "react-virtualized";

// 10160 = 2*127*5*2*2*2
// divisable by 254 (inches), 10 (metric), 16 (EMF fixed point)
export const units = {
    inch: 25.4,
    mm: 1,
};

// https://www.epiloglaser.com/how-it-works/laser-faqs.htm
export const epilogRepeatability = 0.0005 * units.inch;
export const epilogAccuracy = 0.01 * units.inch;
export const bed = { width: 18 * units.inch, height: 12 * units.inch } as Dimensions;