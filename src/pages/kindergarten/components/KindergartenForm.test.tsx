import { render, screen, fireEvent } from "@testing-library/react";
import KindergartenForm from "../api/../components/KindergartenForm";
import nock from "nock";

const API_BASE = "http://localhost:8080";

describe("KindergartenForm", () => {
  afterEach(() => {
    nock.cleanAll;
  });
});
