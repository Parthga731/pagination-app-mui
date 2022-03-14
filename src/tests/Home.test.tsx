import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import ReactDOM from "react-dom";
import { Home } from "../components/Home";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("testing home snapshot", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>,
      container
    );
  });
  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("render correctly", () => {
    expect(container).toMatchSnapshot();
  });
});

// test("render without crashing", () => {
//   const wrapper = mount(
//     <BrowserRouter>
//       <Provider store={store}>
//         <Home />
//       </Provider>
//     </BrowserRouter>
//   );
//   const appComponent = wrapper.find("[data-test='component-pagination']");
//   // console.log(wrapper.debug())
//   expect(appComponent.length).toBe(1);
// });
