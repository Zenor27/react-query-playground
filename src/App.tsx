import React from "react";
import { Table } from "./components/Table";
import {
  makeColumns,
  makeDetailsColumns,
} from "./components/Table/makeColumns";
import { makeData, makeTotals } from "./components/Table/makeData";
import { Data, Detail } from "./components/Table/types";

function App() {
  const data = React.useMemo(makeData, []);
  const totals = React.useMemo(makeTotals, []);

  const columns = React.useMemo(
    () => makeColumns({ data, totals }),
    [data, totals]
  );

  const detailedDataFactory = ({ data }: { data: Data }) => {
    return data.details;
  };

  const detailedColumnsFactory = React.useCallback(
    ({ data }: { data: Data }) => {
      return makeDetailsColumns({ details: data.details });
    },
    []
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <Table<Data, Detail>
        columns={columns}
        data={data}
        detailedDataFactory={detailedDataFactory}
        detailedColumnsFactory={detailedColumnsFactory}
      />
    </div>
  );
}

export default App;
