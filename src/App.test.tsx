import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const cases = [
  {
    description: 'Should render the Home component',
    initialEntries: ['/'],
    testIdIn: [
      'home-container',
    ],
    testIdNotIn: [
      'books-grid',
      'not-found-caption',
    ],
  },
  {
    description: 'Should render the Books component',
    initialEntries: ['/books'],
    testIdIn: [
      'books-grid',
    ],
    testIdNotIn: [
      'home-container',
      'not-found-caption',
    ],
  },
  {
    description: 'Should render the NotFound component',
    initialEntries: ['/notfound'],
    testIdIn: [
      'not-found-caption',
    ],
    testIdNotIn: [
      'books-grid',
      'home-container',
    ],
  },
];

describe.each(cases)('App', ({description, initialEntries, testIdIn, testIdNotIn}) => {
  it(description, () => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    );

    testIdIn.forEach(testId => {
      const actual = screen.queryByTestId(testId);
      expect(actual).toBeInTheDocument();
    })

    testIdNotIn.forEach(testId => {
      const actual = screen.queryByTestId(testId);
      expect(actual).not.toBeInTheDocument();
    })
  });
});
