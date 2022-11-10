import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Body } from "./Body";
import { Footer } from "./Footer";
import { Header } from "./Header";

export type TableProps<DataType, DetailType> = {
  data: DataType[];
  columns: ColumnDef<DataType, unknown>[];
  columnVisibility?: Record<string, boolean>;
  detailedDataFactory: ({ data }: { data: DataType }) => DetailType[];
  detailedColumnsFactory: ({
    data,
  }: {
    data: DataType;
  }) => ColumnDef<DetailType, unknown>[];
};

export const Table = <DataType, DetailType>({
  data,
  columns,
  columnVisibility = {},
  detailedDataFactory,
  detailedColumnsFactory,
}: TableProps<DataType, DetailType>) => {
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table style={{ width: "90%" }}>
      <Header<DataType> table={table} />
      <Body<DataType, DetailType>
        table={table}
        columnVisibility={columnVisibility}
        detailedDataFactory={detailedDataFactory}
        detailedColumnsFactory={detailedColumnsFactory}
      />
      <Footer<DataType> table={table} />
    </table>
  );
};
