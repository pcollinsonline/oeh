import React from 'react';
import { Hangman } from 'components/game/game-hangman';
import { useWordPool } from 'hooks/use-word-pool';
import { ErrorMessage } from './components/app/error-message';
import { SplashScreen } from './components/app/splash-screen';
import { ColorModeToggle } from './components/app/color-mode-toggle';

const App: React.FC = () => {
  const { status, data, error, refetch } = useWordPool();
  const [splashed, setSplashed] = React.useState(false);

  const onFinished = React.useCallback(() => {
    setSplashed(true);
  }, [setSplashed]);

  if (status === 'loading' || !splashed) {
    return <SplashScreen onFinished={onFinished} />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-100 mt6 pa3">
        <ErrorMessage error={error} />
      </div>
    );
  }

  return (
    <main>
      <div className="w-100 absolute flex justify-end top-1 pr3">
        <ColorModeToggle />
      </div>
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
      <Hangman initialPool={data!} refetchPool={refetch} />
    </main>
  );
};

export default App;
