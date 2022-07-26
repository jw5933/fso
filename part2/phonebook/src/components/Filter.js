import React from "react";

const Filter = ({filter, handleFilter}) => (
    <div>
      Filter by: <input
        value = {filter}
        onChange = {handleFilter}
      />
    </div>
  )

export default Filter;