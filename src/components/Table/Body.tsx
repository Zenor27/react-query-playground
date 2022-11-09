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
};

type RowsProps<DataType, DetailType> = {
  isDetail?: boolean;
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
  isDetail = false,
  detailedDataFactory = (_: any) => [],
  detailedColumnsFactory = (_: any) => [],
}: RowsProps<DataType, DetailType>) => {
  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <Row<DataType, DetailType>
          key={row.id}
          row={row}
          isDetail={isDetail}
          detailedDataFactory={detailedDataFactory}
          detailedColumnsFactory={detailedColumnsFactory}
        />
      ))}
    </>
  );
};

const SubRow = <DataType, DetailType>({
  data,
  detailedDataFactory = (_: any) => [],
  detailedColumnsFactory = (_: any) => [],
}: SubRowProps<DataType, DetailType>) => {
  const table = useReactTable({
    data: detailedDataFactory({ data }),
    columns: detailedColumnsFactory({ data }),
    getCoreRowModel: getCoreRowModel(),
  });

  return <Rows table={table} isDetail={true} />;
};

const Row = <DataType, DetailType>({
  row,
  detailedDataFactory = (_: any) => [],
  detailedColumnsFactory = (_: any) => [],
  isDetail = false,
}: RowProps<DataType, DetailType>) => {
  return (
    <React.Fragment key={row.id}>
      <tr className="border border-neutral200">
        {row.getVisibleCells().map((cell, index) => {
          const isFirstCell = index === 0;
          return (
            <td key={cell.id} className="border border-neutral200">
              <div className={`${isFirstCell ? `pl-${isDetail ? 8 : 4}` : ""}`}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            </td>
          );
        })}
      </tr>
      {row.getIsExpanded() ? (
        <SubRow<DataType, DetailType>
          data={row.original}
          detailedDataFactory={detailedDataFactory}
          detailedColumnsFactory={detailedColumnsFactory}
        />
      ) : null}
    </React.Fragment>
  );
};

export const Body = <DataType, DetailType>({
  table,
  detailedDataFactory = (_: any) => [],
  detailedColumnsFactory = (_: any) => [],
}: BodyProps<DataType, DetailType>) => {
  return (
    <tbody className="border border-neutral200">
      <Rows<DataType, DetailType>
        table={table}
        detailedDataFactory={detailedDataFactory}
        detailedColumnsFactory={detailedColumnsFactory}
      />
    </tbody>
  );
};
