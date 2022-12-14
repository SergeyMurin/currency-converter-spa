import React from "react";
import Converter from "../components/converter/converter";

type Props = {
  loading: boolean;
};
export const ConverterPage: React.FC<Props> = ({ loading }) => {
  return (
    <>
      <Converter loading={loading} />
    </>
  );
};
