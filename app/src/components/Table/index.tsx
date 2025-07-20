import {
  Table as FlowTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

type Header = { title: string; key: string };

export interface TableProps {
  headers: Header[];
  details: Record<string, any>[];
}

export function Table({ headers = [], details = [] }: TableProps) {
  return (
    <FlowTable>
      <TableHead>
        <TableRow>
          {headers.map(({ title, key }, i) => (
            <TableHeadCell key={i + key}>{title}</TableHeadCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody className="divide-y">
        {details.map((detail, index) => (
          <TableRow
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
            key={index + "detail"}
          >
            {headers.map(({ key }, hIndex) => (
              <TableCell key={index + hIndex + index}>{detail[key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </FlowTable>
  );
}
