import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';

export const CurrencySelector = () => {
  const { currencyCode, setCurrencyCode, currencies } = useCurrency();

  return (
    <div className="relative inline-block">
      <select
        value={currencyCode}
        onChange={(e) => setCurrencyCode(e.target.value)}
        className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer transition-colors"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.symbol} {c.code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
