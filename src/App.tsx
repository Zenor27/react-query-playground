import React from "react";
import { Table } from "./components/Table";
import { makeColumns, makeDetailsColumns } from "./makeColumns";
import { makeData, makeTotals } from "./makeData";
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

  const [columnVisibility, setColumnVisibility] = React.useState({
    realS39: true,
    prevS39: true,
    mainColumn: true,
  });

  columns;
  return (
    <>
      <div className="flex flex-col">
        <button
          onClick={() => {
            setColumnVisibility((prev) => ({
              ...prev,
              realS39: !prev.realS39,
              prevS39: !prev.prevS39,
            }));
          }}
        >
          toggle S39
        </button>
        <button
          onClick={() => {
            setColumnVisibility((prev) => ({
              ...prev,
              mainColumn: !prev.mainColumn,
            }));
          }}
        >
          toggle project
        </button>
      </div>
      <div className="flex justify-center items-center h-screen">
        <Table<Data, Detail>
          columns={columns}
          columnVisibility={columnVisibility}
          data={data}
          detailedDataFactory={detailedDataFactory}
          detailedColumnsFactory={detailedColumnsFactory}
        />
      </div>
    </>
  );
}

export default App;
