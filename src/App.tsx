import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Details } from "./components/Details";

function App() {
  return (
    <Container>
      <h1 data-testid="title">Pagination App</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="details" element={<Details />} />
      </Routes>
    </Container>
  );
}

export default App;
