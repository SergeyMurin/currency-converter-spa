import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import addIcon from "../../assets/icons/svg/add-favorite.svg";
import removeIcon from "../../assets/icons/svg/remove-favorite.svg";
import topArrow from "../../assets/icons/svg/top-arrow.svg";
import { LocalStoragePath } from "../../App";
import {orderObject} from "../../store/action-creators/available-currencies-action-creator";

type Props = {
  currency: string;
};

type Rate = {
  currency_name: string;
  rate: string;
  rate_for_amount: string;
  isFavorite: boolean;
  timestamp: number;
};

type FavoriteRate = {
  from: string;
  to: string;
  timestamp: number;
};

export const RatesList: React.FC<Props> = ({ currency }) => {
  const { rates } = useTypedSelector((state) => state.historicalRates);

  const [renderList, setRenderList] = useState<JSX.Element[] | null>(null);
  const [favoriteRenderList, setFavoriteRenderList] = useState<
    JSX.Element[] | null
  >(null);
  const [tempRates, setTempRates] = useState(structuredClone(rates));

  useEffect(() => {
    if (tempRates) {
      tempRatesPreparation();
      setTempRates(orderObject(tempRates));
    }
  }, []);

  useEffect(() => {
    if (tempRates) {
      refreshRenderList();
    }
  }, [tempRates]);


  const tempRatesPreparation = () => {
    const favoriteRatesStr = localStorage.getItem(
      LocalStoragePath.FAVORITE_RATES
    );
    const favoriteRates: FavoriteRate[] = favoriteRatesStr
      ? JSON.parse(favoriteRatesStr)
      : null;
    const newObj = {};
    for (const [key, value] of Object.entries(tempRates)) {
      const found = findFavoriteRate(
        favoriteRates,
        currency,
        key,
        value as Rate
      );
      if (found) {
        Object.assign(newObj, { [key]: value });
      }
    }
  };

  const refreshRenderList = () => {
    makeList(tempRates, true);
    makeList(tempRates, false);
  };

  const removeFavoriteHandler = (key: string, value: Rate) => {
    removeFavoriteRateFromLocalStorage(currency, key, value);
    refreshRenderList();
  };

  const addFavoriteHandler = (key: string, value: Rate) => {
    addFavoriteRateToLocalStorage(currency, key, value);
    refreshRenderList();
  };

  const addFavoriteRateToLocalStorage = (
    from: string,
    to: string,
    value: Rate
  ) => {
    const favoriteRatesStr = localStorage.getItem(
      LocalStoragePath.FAVORITE_RATES
    );
    const favoriteRates: FavoriteRate[] = favoriteRatesStr
      ? JSON.parse(favoriteRatesStr)
      : null;

    if (!favoriteRates) {
      localStorage.setItem(
        LocalStoragePath.FAVORITE_RATES,
        JSON.stringify([
          {
            from: from,
            to: to,
            timestamp: Date.now(),
          },
        ])
      );
      value.isFavorite = true;
    } else {
      if (findFavoriteRate(favoriteRates, from, to)) {
        return;
      }
      favoriteRates.push({ from: from, to: to, timestamp: Date.now() });
      localStorage.setItem(
        LocalStoragePath.FAVORITE_RATES,
        JSON.stringify(favoriteRates)
      );
      value.isFavorite = true;
      setTempRates(tempRates);
    }
  };

  const removeFavoriteRateFromLocalStorage = (
    from: string,
    to: string,
    value: Rate
  ) => {
    const favoriteRatesStr = localStorage.getItem(
      LocalStoragePath.FAVORITE_RATES
    );
    const favoriteRates: FavoriteRate[] = favoriteRatesStr
      ? JSON.parse(favoriteRatesStr)
      : null;
    const favoriteRate = findFavoriteRate(favoriteRates, from, to);
    if (favoriteRate) {
      const idx = favoriteRates.indexOf(favoriteRate);
      if (idx > -1) {
        favoriteRates.splice(idx, 1);
        localStorage.setItem(
          LocalStoragePath.FAVORITE_RATES,
          JSON.stringify(favoriteRates)
        );
        value.isFavorite = false;
        setTempRates(tempRates);
      }
    }
  };

  const findFavoriteRate = (
    favoriteRates: FavoriteRate[],
    from: string,
    to: string,
    value?: Rate
  ): FavoriteRate | null => {
    const foundValue = favoriteRates?.find((favoriteRate) => {
      return favoriteRate.from === from && favoriteRate.to === to;
    });
    if (foundValue && value) {
      value.timestamp = foundValue.timestamp;
      value.isFavorite = true;
    }
    return foundValue ? foundValue : null;
  };

  const makeList = (obj: object, isFavoriteList: boolean) => {
    const list: JSX.Element[] = [];
    for (const [key, value] of Object.entries(obj)) {
      if (needToContinue(key, value, isFavoriteList)) {
        continue;
      }
      const defaultAmount = "1";
      const listItem = (
        <div
          className={`rate${(value as Rate)?.isFavorite ? " favorite" : ""}`}
          style={{ height: "40px" }}
          key={key}
        >
          <div className={"rate-icon"}>
            {(value as Rate)?.isFavorite ? (
              <div
                className={"icon__container"}
                onClick={() => removeFavoriteHandler(key, value as Rate)}
              >
                <img
                  alt={""}
                  id={"remove-favorite-icon"}
                  className={"icon"}
                  src={removeIcon.toString()}
                />
              </div>
            ) : (
              <div
                className={"icon__container"}
                onClick={() => addFavoriteHandler(key, value as Rate)}
              >
                <img
                  alt={""}
                  id={"add-favorite-icon"}
                  className={"icon"}
                  src={addIcon.toString()}
                />
              </div>
            )}
          </div>
          <div className={"rate-left"}>
            <span className={"rate-left-amount"}>{defaultAmount}</span>
            <span className={"rate-left-currency"}>{currency}</span>
          </div>
          <div className={"rate-middle"}>=</div>
          <div className={"rate-right"}>
            <span className={"rate-right-currency"}>{key}</span>
            <span className={"rate-right-amount"}>
              {(value as Rate).rate_for_amount}
            </span>
          </div>
        </div>
      );
      list.push(listItem);
    }
    isFavoriteList ? setFavoriteRenderList(list) : setRenderList(list);
  };

  const needToContinue = (
    key: string,
    value: unknown,
    isFavoriteList: boolean
  ) => {
    if (currency === key) {
      return true;
    }
    if ((value as Rate)?.isFavorite) {
      if (!isFavoriteList) {
        return true;
      }
    } else if (!(value as Rate)?.isFavorite && isFavoriteList) {
      return true;
    }
    return false;
  };

  return (
    <div className={"rates-container"}>
      {favoriteRenderList && (
        <div className={"rates-list-favorite"}>{favoriteRenderList}</div>
      )}
      {renderList && <div className={"rates-list"}>{renderList}</div>}
      <a id={"for-top"} href={"#top"}>
        <img alt={""} src={topArrow.toString()} />
      </a>
    </div>
  );
};
