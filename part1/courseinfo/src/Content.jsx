import Part from "./Part";

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.name} part={part.name} exercise={part.exercise} />
    ))}
  </>
);

export default Content;
