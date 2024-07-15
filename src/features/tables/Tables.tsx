import React, { useState, ChangeEvent, MouseEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  TextField,
  useMediaQuery,
  TableFooter,
} from "@mui/material";
import Link from "next/link";
import { Technology } from "../../types";
import { formatNumber } from "@/utils/formatNumbers";

interface TablesProps {
  data: Technology[];
}

type Order = "asc" | "desc";

const Tables: React.FC<TablesProps> = ({ data }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Technology>("name");
  const [filter, setFilter] = useState<string>("");

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleRequestSort = (property: keyof Technology) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setPage(0);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.category.toLowerCase().includes(filter.toLowerCase()) ||
      item.weekly_downloads?.toString().includes(filter.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, sortedData.length - page * rowsPerPage);

  return (
    <Paper className="!shadow-sm 2">
      <div className="flex justify-center w-full mx-auto text-xs">
        <TextField
          label="Search.."
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          sx={{
            margin: 2,
            width: "300px",
            "& .MuiInputBase-input": {
              height: "1rem",
              fontSize: "0.75rem",
              borderRadius: "1rem",
            },
            "& .MuiInputLabel-root": {
              fontSize: "0.75rem",
            },
          }}
        />
      </div>

      <TableContainer className="!px-36">
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "aliceblue" }}>
              <TableCell sortDirection={orderBy === "name" ? order : false}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              {!isSmallScreen && (
                <TableCell
                  sortDirection={orderBy === "category" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "category"}
                    direction={orderBy === "category" ? order : "asc"}
                    onClick={() => handleRequestSort("category")}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>
              )}
              {!isSmallScreen && <TableCell>Release Date</TableCell>}
              <TableCell>Weekly Downloads</TableCell>
              {!isSmallScreen && <TableCell>URL</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell
                    sx={{
                      backgroundColor: "aliceblue",
                    }}
                  >
                    <Link href={item.url} passHref>
                      <span
                        style={{
                          textDecoration: "underline",
                          color: "darkblue",
                          backgroundColor: "aliceblue",
                          cursor: "pointer",
                        }}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </TableCell>
                  {!isSmallScreen && <TableCell>{item.category}</TableCell>}
                  {!isSmallScreen && (
                    <TableCell>
                      {new Date(item.release_date).toLocaleDateString()}
                    </TableCell>
                  )}
                  <TableCell>{formatNumber(item.weekly_downloads)}</TableCell>
                  {!isSmallScreen && (
                    <TableCell>
                      <Link href={item.url} passHref>
                        <span
                          style={{
                            textDecoration: "underline",
                            color: "darkblue",
                            cursor: "pointer",
                          }}
                        >
                          {item.url}
                        </span>
                      </Link>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={sortedData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Tables;
