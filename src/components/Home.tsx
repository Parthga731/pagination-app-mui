import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getPagesData, showPagination } from "../redux/PaginationSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
  Stack,
  Box,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { data } = useAppSelector((state) => state.pages);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(data);

  const [page, setPage] = useState(0);
  const [pageValue, setpageValue] = useState(0);
  const [searchValue, setSearchValue] = useState<string>("");

  //   useEffect(() => {
  //     axios
  //       .get(
  //         `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
  //       )
  //       .then((result) => {
  //         console.log(result);
  //         dispatch(addData(result.data));
  //         // dispatch(showPagination());
  //       })
  //       .catch((error) => console.log(error));
  //   }, [page, dispatch]);

  useEffect(() => {
    dispatch(getPagesData(page));
    dispatch(showPagination());
  }, [dispatch, page]);

  useEffect(() => {
    const interval = setTimeout(() => {
      setPage(page + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, [page]);

  const changePage = (event: any, value: any) => {
    setpageValue(value - 1);
  };

  const handleClick = (row: any) => {
    navigate("./details", { state: { row } });
  };

  return (
    <>
      <Box data-test="component-pagination">
        <Paper
          elevation={5}
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <TextField
            id="filled-basic"
            label="Search by Title and created at"
            variant="standard"
            onChange={(e: any) => setSearchValue(e.target.value)}
          />

          <Table sx={{ width: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Created_at</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>url</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {console.log(data[pageValue]?.hits)} */}
              {data[pageValue]?.hits
                ?.filter(
                  (info: any) =>
                    info.title
                      .toUpperCase()
                      .includes(searchValue.toUpperCase()) ||
                    info.created_at
                      .toUpperCase()
                      .includes(searchValue.toUpperCase())
                )
                ?.map((row: any, index: number) => {
                  return (
                    <TableRow key={index} onClick={() => handleClick(row)}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {moment(row.created_at).format("LLLL")}
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.author}</TableCell>
                      <TableCell>{row.url}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <Stack spacing={2}>
            <Pagination
              count={data.length}
              page={pageValue + 1}
              onChange={changePage}
              color="primary"
              sx={{ m: 3 }}
              showFirstButton
              showLastButton
            />
          </Stack>
        </Paper>
      </Box>
    </>
  );
};
