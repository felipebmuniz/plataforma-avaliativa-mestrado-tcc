import React, { useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { ITabs } from "@/types/tabs";

import { useTheme } from "@emotion/react";
import { userList } from "@/types/users";
import { subjectsList } from "@/types/subjects";
import { classesList } from "@/types/classes";
import { IListFrom } from "@/types/forms";
import { evaluationsList } from "@/types/evaluations";
import {
  columnsClasses,
  columnsEvaluations,
  columnsForms,
  columnsSubjects,
  columnsUsers,
  EColumnsUsers,
  EColumnsSubjects,
  EColumnsClasses,
  EColumnsForms,
  EColumnsEvaluations,
  EColumns,
} from "@/types/columns";

interface IProps {
  data: any[];

  columns: (
    | columnsUsers
    | columnsSubjects
    | columnsClasses
    | columnsForms
    | columnsEvaluations
  )[];
  title: string;
}

export const TableUI = ({ data, columns, title }: IProps) => {
  const theme = useTheme();

  return (
    <TableContainer
      w={"100%"}
      border={`1px solid ${theme.disabled}`}
      borderRadius={"0.5rem"}
    >
      <Table variant="striped">
        <TableCaption>{title}</TableCaption>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={`column-${column}`}>{EColumns[column]}</Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {data.map((data, index) => (
            <Tr key={`tr-${index}`}>
              {columns.map((column) => (
                // @ts-ignore
                <Td key={`td-${column}-${index}`}>{data[column]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            {columns.map((column) => (
              <Th key={`column-${column}`}>{EColumns[column]}</Th>
            ))}
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
