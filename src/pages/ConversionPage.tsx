import React, { FC, useState } from "react";
import axios from "axios";
import { FaExchangeAlt } from "react-icons/fa";
import {
  currencies,
  exchangerateAPI,
  cpConvertButtonText,
  cpHeaderTitle,
} from "../lib";

const ConversionPage: FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [lastConversion, setLastConversion] = useState<{
    from: string;
    to: string;
    amount: number;
  } | null>(null);
  const [displayAmount, setDisplayAmount] = useState<number | undefined>();

  const fetchRatesFromExchangeRateAPI = async () => {
    try {
      const url = `${exchangerateAPI}/${fromCurrency}`;
      const response = await axios.get(url);
      const exchangeRate = response.data.conversion_rates[toCurrency];
      setConvertedAmount(amount * exchangeRate);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = parseFloat(e.target.value);
    setAmount(isNaN(inputAmount) ? 0 : inputAmount);
  };

  const handleFromCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  const handleConvert = React.useCallback(() => {
    const currentConversion = {
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
    };
    if (
      lastConversion &&
      currentConversion.from === lastConversion.from &&
      currentConversion.to === lastConversion.to &&
      currentConversion.amount === lastConversion.amount
    ) {
      return;
    }

    fetchRatesFromExchangeRateAPI();
    setDisplayAmount(amount);
    setLastConversion(currentConversion);
  }, [fromCurrency, toCurrency, amount, lastConversion]);

  return (
    <div
      id="conversionSection"
      className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 min-h-screen flex items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold font-serif text-slate-900 mb-6">
          {cpHeaderTitle}
        </h2>

        <div
          className={`mt-5 mb-7 overflow-hidden ease-in-out duration-300 ${
            convertedAmount !== null ? "h-auto" : "h-7"
          }`}
        >
          {convertedAmount !== null && (
            <p className="text-white">
              <span className="font-bold font-serif">{displayAmount}</span>{" "}
              <span className="text-gray-500">{fromCurrency}</span> converted to{" "}
              <span className="font-bold">{convertedAmount.toFixed(2)}</span>{" "}
              <span className="text-gray-500">{toCurrency}</span>
            </p>
          )}
        </div>
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="w-32 md:w-40 p-2 border border-blue-300 rounded-md mr-4 focus:outline-none focus:border-blue-500 text-gray-800"
          />
          <select
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
            className="w-32 md:w-40 p-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
          >
            {currencies.map((code, ix) => (
              <option key={ix}>{code}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={convertedAmount !== null ? convertedAmount.toFixed(2) : ""}
            readOnly
            className="w-32 md:w-40 p-2 border border-blue-300 rounded-md mr-4 focus:outline-none focus:border-blue-500 text-gray-800"
          />
          <select
            value={toCurrency}
            onChange={handleToCurrencyChange}
            className="w-32 md:w-40 p-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
          >
            {currencies.map((code, ix) => (
              <option key={ix}>{code}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleConvert}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-full text-lg cursor-pointer focus:outline-none transition duration-300 ease-in-out flex items-center"
        >
          <span className="mr-2">
            <FaExchangeAlt />
          </span>
          {cpConvertButtonText}
        </button>
      </div>
    </div>
  );
};

export default ConversionPage;
