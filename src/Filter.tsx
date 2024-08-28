import { TextField } from "@mui/material";
import React from "react";

type Props = {
  filter: string,
  setFilter: (filter:string) => void,
};

const Filter:React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <TextField
      label='filter books'
      value={filter}
      onChange={(e) => setFilter(e.target.value)} />
  );
}

export default Filter;
