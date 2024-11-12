const Total = ({ parts }) => {
  const total = parts.reduce((sum, curr) => sum + curr.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

export default Total;
