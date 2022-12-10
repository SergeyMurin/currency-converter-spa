import React, {useEffect} from "react";

type Props = {
    rates: {} | any,
    currency: string,
}

type Rate = {
    currency_name: string;
    rate: string;
    rate_for_amount: string;
}

export const RatesList: React.FC<Props> = ({rates, currency}) => {

    const makeList = () => {

        const sortedRates = Object.keys(rates)
            .sort()
            .reduce((accumulator: any, key) => {
                accumulator[key] = rates[key];
                return accumulator;
            }, {});

        const defaultAmount = "1";
        const list: JSX.Element[] = [];
        for (let [key, value] of Object.entries(sortedRates)) {
            const listItem = <div className={"rate"} style={{height: "40px"}} key={key}>
                <span>{defaultAmount}</span>
                <span>{currency}</span>
                =
                <span>{(value as Rate).rate_for_amount}</span>
                <span>{key}</span>
            </div>;
            list.push(listItem);
        }
        return list
    }

    return (
        <div className={"rates__list"} style={{height: "300px", overflowY: "auto"}}>
            {rates ? makeList() : <></>}
        </div>
    )
}

