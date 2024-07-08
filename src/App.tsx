import { useState } from 'react';

import './App.css';
import { Button } from '@/components/ui';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className='card'>
        <Button
          variant='secondary'
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Button>
      </div>
    </>
  );
}

export default App;
