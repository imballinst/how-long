import React, { useState } from 'react';

export default function Counter({ children, count: initialCount }) {
  const [count, setCount] = useState(initialCount);
  const add = () => setCount((i) => i + 1);
  const subtract = () => setCount((i) => i - 1);

  return (
    <>
      <div className="counter">
        <button
          class="py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
          type="button"
          onClick={subtract}
        >
          -
        </button>

        <pre>{count}</pre>

        <button
          class="py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
          type="button"
          onClick={add}
        >
          +
        </button>
      </div>
      <div className="children">{children}</div>
    </>
  );
}
