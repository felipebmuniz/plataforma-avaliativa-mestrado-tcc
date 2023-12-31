import { ReactNode, useCallback } from "react";
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
  Badge,
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
  children?: ReactNode;
  dataChildren?: ReactNode[];
  columnsChildren?: string[];
}

export const TableUI = ({
  data,
  columns,
  title,
  children,
  columnsChildren,
  dataChildren,
}: IProps) => {
  const theme = useTheme();

  const setBadge = useCallback((status: boolean) => {
    if (status) {
      return <Badge colorScheme="green">Validado</Badge>;
    } else {
      return <Badge colorScheme="yellow">Pendente</Badge>;
    }
  }, []);

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
            {columnsChildren &&
              columnsChildren.map((column) => (
                <Th key={`columnsChildren-${column}`}>{column}</Th>
              ))}
          </Tr>
        </Thead>

        <Tbody>
          {data.map((data, index) => (
            <Tr key={`tr-${index}`}>
              {columns.map((column) => (
                // @ts-ignore
                <Td key={`td-${column}-${index}`}>
                  {column === "createdAt" ||
                  column === "startDate" ||
                  column === "endDate"
                    ? new Date(data[column]).toLocaleDateString("pt-br", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : column === "validated"
                    ? setBadge(data[column])
                    : data[column]}
                </Td>
              ))}
              {dataChildren &&
                dataChildren.map((column, index) => (
                  // @ts-ignore
                  <Td key={`td-dataChildren-${index}`}>{column}</Td>
                ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            {columns.map((column) => (
              <Th key={`column-${column}`}>{EColumns[column]}</Th>
            ))}
            {columnsChildren &&
              columnsChildren.map((column) => (
                <Th key={`columnsChildren-${column}`}>{column}</Th>
              ))}
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
