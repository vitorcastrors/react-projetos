import "./Game.css";

const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}) => {
  return (
    <div className="game">
      <h1>Discover the Word</h1>
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h2>Adivinhe a palavra:</h2>
      <p className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </p>
      <p>Você ainda tem {guesses} tentativas(s).</p>
      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">{letter}</span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente Adivinhar uma letra da palavra</p>
        <form>
          <input type="text" name="letter" maxLength="1" required />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras utilizadas:</p>
        {wrongLetters.map((letter, i) => {
          <span key={i}>{letter}, </span>
        })}
      </div>
    </div>
  )
}

export default Game