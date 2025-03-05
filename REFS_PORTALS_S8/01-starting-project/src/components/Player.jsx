import { useState } from 'react';
import { useRef } from 'react'

export default function Player() {
  const [player, setPlayer] = useState(null);
  const nameRef = useRef();

  function handleClick() {
    const name = nameRef.current.value;
    setPlayer(() => name);
    nameRef.current.value=''

  }
  return (
    <section id="player">
      <h2>Welcome {player? player : 'unknown entity'}</h2>
      <p>
        <input 
          type="text"
          ref={nameRef} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
