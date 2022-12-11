import React, {useEffect, useState} from "react";
import {useTypedSelector} from "../../hooks/use-typed-selector";

type Props = {
    currency: string,
}

type Rate = {
    currency_name: string;
    rate: string;
    rate_for_amount: string;
    isFavorite: boolean;
    timestamp: number;
}

export const RatesList: React.FC<Props> = ({currency}) => {
    const [renderList, setRenderList] = useState<JSX.Element[] | null>(null);
    const [favoriteRenderList, setFavoriteRenderList] = useState<JSX.Element[] | null>(null);
    const {rates} = useTypedSelector(state => state.historicalRates);
    const [tempRates, setTempRates] = useState(structuredClone(rates));

    useEffect(() => {
        if (tempRates) {
            tempRatesPreparation();
            setTempRates(sortTempRates());
        }
    }, []);

    useEffect(() => {
        if (tempRates) {
            makeList(tempRates, true);
            makeList(tempRates, false);
        }
    }, [tempRates])

    const sortTempRates = () => {
        return Object.keys(tempRates)
            .sort()
            .reduce((accumulator: any, key) => {
                accumulator[key] = tempRates[key];
                return accumulator;
            }, {});

    }

    const tempRatesPreparation = () => {
        const favoriteRatesStr = localStorage.getItem("favorite-rates");
        const favoriteRates: FavoriteRate[] = favoriteRatesStr ? JSON.parse(favoriteRatesStr) : null;
        const newObj = {};
        for (let [key, value] of Object.entries(tempRates)) {
            const found = findFavoriteRate(favoriteRates, currency, key, (value as Rate));
            if (found) {
                Object.assign(newObj, {[key]: value});
            }
        }
    }

    const removeFavoriteHandler = (key: string, value: Rate) => {
        removeFavoriteRateFromLocalStorage(currency, key, value);
        makeList(tempRates, false);
        makeList(tempRates, true);
    }
    const addFavoriteHandler = (key: string, value: Rate) => {
        addFavoriteRateToLocalStorage(currency, key, value);
        makeList(tempRates, false);
        makeList(tempRates, true);
    }

    type FavoriteRate = {
        from: string;
        to: string;
        timestamp: number;
    }
    const addFavoriteRateToLocalStorage = (from: string, to: string, value: Rate) => {
        const favoriteRatesStr = localStorage.getItem("favorite-rates");
        const favoriteRates: FavoriteRate[] = favoriteRatesStr ? JSON.parse(favoriteRatesStr) : null;
        if (!favoriteRates) {
            localStorage.setItem("favorite-rates", JSON.stringify([{from: from, to: to, timestamp: Date.now()}]));
            value.isFavorite = true;
        } else {
            if (findFavoriteRate(favoriteRates, from, to)) {
                return;
            }
            favoriteRates.push({from: from, to: to, timestamp: Date.now()});
            localStorage.setItem("favorite-rates", JSON.stringify(favoriteRates));
            value.isFavorite = true;
            setTempRates(tempRates);
        }
    }

    const removeFavoriteRateFromLocalStorage = (from: string, to: string, value: Rate) => {
        const favoriteRatesStr = localStorage.getItem("favorite-rates");
        const favoriteRates: FavoriteRate[] = favoriteRatesStr ? JSON.parse(favoriteRatesStr) : null;
        const favoriteRate = findFavoriteRate(favoriteRates, from, to);
        if (favoriteRate) {
            const idx = favoriteRates.indexOf(favoriteRate);
            if (idx > -1) {
                favoriteRates.splice(idx, 1);
                localStorage.setItem("favorite-rates", JSON.stringify(favoriteRates));
                value.isFavorite = false;
                setTempRates(tempRates);
            }

        }
    }

    const findFavoriteRate = (favoriteRates: FavoriteRate[], from: string, to: string, value?: Rate): FavoriteRate | null => {
        const foundValue = favoriteRates?.find((favoriteRate) => {
            return favoriteRate.from === from && favoriteRate.to === to;
        })
        if (foundValue && value) {
            value.timestamp = foundValue.timestamp;
            value.isFavorite = true;
        }
        return foundValue ? foundValue : null;
    }

    const makeList = (obj: {}, isFavoriteList: boolean) => {
        const list: JSX.Element[] = [];
        for (let [key, value] of Object.entries(obj)) {
            if (currency === key) {
                continue;
            }
            if ((value as Rate)?.isFavorite) {
                if (!isFavoriteList) {
                    continue;
                }
            } else if (!((value as Rate)?.isFavorite) && isFavoriteList) {
                continue;
            }
            const defaultAmount = "1";
            const listItem =
                <div className={`rate${(value as Rate)?.isFavorite ? "__favorite" : ""}`} style={{height: "40px"}}
                     key={key}>
                    {(value as Rate)?.isFavorite ?
                        <button
                            onClick={() => removeFavoriteHandler(key, (value as Rate))}>remove
                        </button> :
                        <button onClick={() => addFavoriteHandler(key, (value as Rate))}>to favs
                        </button>
                    }
                    <span>{defaultAmount}</span>
                    <span>{currency}</span>
                    =
                    <span>{(value as Rate).rate_for_amount}</span>
                    <span>{key}</span>
                </div>;
            list.push(listItem);
        }
        isFavoriteList ? setFavoriteRenderList(list) : setRenderList(list);
    }

    return (
        <div className={"rates-list"}>
            {favoriteRenderList &&
                <div className={"rates-list__favorite"}
                     style={{height: "200px", overflowY: "auto"}}>{favoriteRenderList}</div>}
            {renderList &&
                <div className={"rates-list__favorite"}
                     style={{height: "200px", overflowY: "auto"}}>{renderList}</div>}
        </div>
    )
}





