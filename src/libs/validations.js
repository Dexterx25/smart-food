import { test } from 'ramda';

export const isGreaterThan = total => a => a.trim().length >= total;
export const isValidPassword = isGreaterThan(8);

export const isEmail = test(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);