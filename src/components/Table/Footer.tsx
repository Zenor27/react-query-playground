import { flexRender, Table } from "@tanstack/react-table";

export const Footer = <DataType,>({ table }: { table: Table<DataType> }) => {
  return (
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
  );
};
