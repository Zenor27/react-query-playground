import { Table, Header as _RTHeader, flexRender } from "@tanstack/react-table";
import { SKIP_HEADER } from "./makeColumns";

type HeaderProps<Data> = {
  table: Table<Data>;
};

export const Header = <Data,>({ table }: HeaderProps<Data>) => {
  const shouldKeepHeader = (header: _RTHeader<any, unknown>) => {
    return header.column.columnDef.header !== SKIP_HEADER;
  };
  return (
    <thead className="bg-neutral50 h-12 border border-neutral200 rounded-t">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.filter(shouldKeepHeader).map((header, index) => {
            const isLast = index === headerGroup.headers.length - 1;
            return (
              <th key={header.id} colSpan={header.colSpan} className="h-auto">
                <div
                  className={`bg-neutral100 ${
                    header.isPlaceholder || !header.column.columnDef.header
                      ? ""
                      : "h-full py-0.5 my-2"
                  } ${
                    isLast ? "mr-3 ml-3" : "ml-3"
                  } rounded text-xs font-normal flex justify-end items-center px-2`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};
