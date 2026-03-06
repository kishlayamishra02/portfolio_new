import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Portfolio from './components/Portfolio';
import Loading from './components/Loading';
import CustomCursor from './components/CustomCursor';
import { ShootingStarsBackground } from './components/ShootingStarsBackground';

const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />
      <ShootingStarsBackground />
      <AnimatePresence mode="wait">
        {!loaded ? (
          <Loading key="loading" onComplete={() => setLoaded(true)} />
        ) : (
          <Portfolio key="portfolio" />
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
