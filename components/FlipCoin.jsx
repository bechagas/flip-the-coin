const { useState, useEffect } = React;

const FlipCoin = () => {
  const [coin, setCoin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFlip = () => {
    if (isLoading) return;
    setCoin("");
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;

    // Limpa o resultado anterior imediatamente ao começar a girar
    setCoin("");

    const timerID = setTimeout(() => {
      const num = Math.floor(Math.random() * 2) + 1;
      setCoin(num === 1 ? "Heads" : "Tail");
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timerID);
  }, [isLoading]);

  return (
    <div className="app-viewport">
      <div className="glass-card">
        <h1>Flip the coin</h1>
        <p className="instruction">Press the coin or the button to flip the coin</p>

        <div className={`coin-display ${isLoading ? "is-flipping" : ""}`} onClick={handleFlip}>
          <img
            className={`main-coin ${!isLoading && coin ? "reveal" : ""}`}
            src={
              (coin === "Tail") ? "./resources/tails.svg" :
              (coin === "Heads") ? "./resources/heads.svg" :
              "./resources/interrogation.png"
            }
            alt="coin"
          />
          <img className="coin-shadow" src="./resources/shadow.svg" alt="shadow" />
        </div>

        <div className="result-container">
          <p className={`coin-result ${coin ? "show" : ""}`}>{coin}</p>
        </div>

        <button
          className={`flip-btn ${isLoading ? "loading" : ""}`}
          onClick={handleFlip}
          disabled={isLoading}
        >
          {isLoading ? "Spinning..." : "Random"}
        </button>
      </div>
    </div>
  );
};

window.FlipCoin = FlipCoin;
