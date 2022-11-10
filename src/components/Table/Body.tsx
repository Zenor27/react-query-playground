import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row as _RTRow,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

type BodyProps<DataType, DetailType> = {
  table: Table<DataType>;
  detailedDataFactory?: ({ data }: { data: DataType }) => DetailType[];
  detailedColumnsFactory?: ({
    data,
  }: {
    data: DataType;
  }) => ColumnDef<DetailType, unknown>[];
  columnVisibility?: Record<string, boolean>;
};

type RowsProps<DataType, DetailType> = {
} & BodyProps<DataType, DetailType>;

type RowProps<DataType, DetailType> = {
  row: _RTRow<DataType>;
} & Omit<RowsProps<DataType, DetailType>, "table">;

type SubRowProps<DataType, DetailType> = { data: DataType } & Omit<
  BodyProps<DataType, DetailType>,
  "table"
>;

const Rows = <DataType, DetailType>({
  table,
  detailedDataFactory = (_: any) => [],
  detailedColumnsFactory = (_: any) => [],
  columnVisibility = {},
}: RowsProps<DataType, DetailType>) => {
  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <Row<DataType, DetailType>
          key={row.id}
          row={row}
          detailedDataFactory={detailedDataFactory}
          detailedColumnsFactory={detailedColumnsFactory}
          columnVisibility={columnVisibility}
        />
      ))}
    </>
  );
};

const SubRow = <DataType, DetailType>({
  data,
  detailedDataFactory = (_: any) => [],
  detailedColumnsFactory = (_: any) => [],
  columnVisibility = {},
}: SubRowProps<DataType, DetailType>) => {
  const table = useReactTable({
    data: detailedDataFactory({ data }),
    columns: detailedColumnsFactory({ data }),
    state: {
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return <Rows table={table}/>;
};

const Row = <DataType, DetailType>({
  row,
  detailedDataFactory = (_: any) => [],
  detailedColumnsFactory = (_: any) => [],
  columnVisibility = {},
}: RowProps<DataType, DetailType>) => {
  return (
    <React.Fragment key={row.id}>
      <tr className="border border-neutral200">
        {row.getVisibleCells().map((cell, index) => {
          return (
            <td key={cell.id} className="border border-neutral200">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        })}
      </tr>
      {row.getIsExpanded() ? (
        <SubRow<DataType, DetailType>
          data={row.original}
          detailedDataFactory={detailedDataFactory}
          detailedColumnsFactory={detailedColumnsFactory}
          columnVisibility={columnVisibility}
        />
      ) : null}
    </React.Fragment>
  );
};

export const Body = <DataType, DetailType>({
  table,
  detailedDataFactory = (_: any) => [],
  detailedColumnsFactory = (_: any) => [],
  columnVisibility = {},
}: BodyProps<DataType, DetailType>) => {
  return (
    <tbody className="border border-neutral200">
      <Rows<DataType, DetailType>
        table={table}
        columnVisibility={columnVisibility}
        detailedDataFactory={detailedDataFactory}
        detailedColumnsFactory={detailedColumnsFactory}
      />
    </tbody>
  );
};
