import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Header,
  HeaderGroup,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

const SKIP_HEADER = "SKIP_HEADER";

type Data = {
  project: string;
  periods: {
    name: string;
    real: string;
    prev: string;
  }[];
};

type Total = {
  periodName: string;
  prev: string;
  real: string;
};

const makeData = (): Data[] => {
  return [
    {
      project: "Project 1",
      periods: [
        {
          name: "S39",
          real: "2J",
          prev: "2J",
        },
        {
          name: "S40",
          real: "2J",
          prev: "2J",
        },
      ],
    },
    {
      project: "Project 2",
      periods: [
        {
          name: "S39",
          real: "3J",
          prev: "2J",
        },
        {
          name: "S40",
          real: "2J",
          prev: "3J",
        },
      ],
    },
  ];
};

const makeTotals = (): Total[] => {
  return [
    {
      periodName: "S39",
      real: "5J",
      prev: "4J",
    },
    {
      periodName: "S40",
      real: "4J",
      prev: "5J",
    },
  ];
};

const makeColumns = ({ data, totals }: { data: Data[]; totals: Total[] }) => {
  const columnHelper = createColumnHelper<Data>();

  const periods = data.flatMap((d) => d.periods);
  const periodNames = Array.from(new Set(periods.map((p) => p.name)));

  return [
    columnHelper.group({
      id: "project",
      header: "",
      columns: [
        columnHelper.accessor("project", {
          cell: (info) => info.getValue(),
          id: "project",
          header: SKIP_HEADER,
        }),
      ],
    }),
    ...periodNames.map((name) => {
      return columnHelper.group({
        id: name,
        header: name,
        columns: [
          columnHelper.group({
            id: `prevreal${name}`,
            header: SKIP_HEADER,
            columns: [
              columnHelper.accessor(
                (row) => {
                  const period = row.periods.find((p) => p.name === name);
                  return period?.prev;
                },
                {
                  id: `prev${name}`,
                  header: SKIP_HEADER,
                  footer: () => {
                    const total = totals.find((t) => t.periodName === name);
                    return (
                      <div className="text-right bg-neutral50 text-neutral500">
                        {total?.prev}
                      </div>
                    );
                  },
                  cell: (info) => (
                    <div className="text-right bg-neutral50 text-neutral500">
                      {info.getValue()}
                    </div>
                  ),
                }
              ),
              columnHelper.accessor(
                (row) => {
                  const period = row.periods.find((p) => p.name === name);
                  return period?.real;
                },
                {
                  id: `real${name}`,
                  header: SKIP_HEADER,
                  footer: () => {
                    const total = totals.find((t) => t.periodName === name);
                    return (
                      <div className="text-right bg-positive50 text-neutral800">
                        {total?.real}
                      </div>
                    );
                  },
                  cell: (info) => (
                    <div className="text-right bg-positive50 text-neutral800">
                      {info.getValue()}
                    </div>
                  ),
                }
              ),
            ],
          }),
        ],
      });
    }),
  ];
};

export const Table = () => {
  const data = React.useMemo(makeData, []);

  const totals = React.useMemo(makeTotals, []);

  const columns = React.useMemo(
    () => makeColumns({ data, totals }),
    [data, totals]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const shouldKeepHeader = (header: Header<Data, unknown>) => {
    return header.column.columnDef.header !== SKIP_HEADER;
  };

  return (
    <table style={{ width: "90%" }}>
      <thead className="bg-neutral50 h-12 border border-neutral200 rounded-t">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.filter(shouldKeepHeader).map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
                <div
                  className={`bg-neutral100 ${
                    header.isPlaceholder || !header.column.columnDef.header
                      ? ""
                      : "h-8 p-1"
                  } rounded text-xs font-normal flex justify-end items-center px-1`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="border border-neutral200">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border border-neutral200">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border border-neutral200">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <td key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};
