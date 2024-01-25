import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  let passwordRef = useRef(null);

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  const randomPasswordGenerator = useCallback(() => {
    let pass = "";
    let charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) charSet += "0123456789";
    if (charAllowed) charSet += "~!@#$%^&*_+=?";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * charSet.length);
      let char = charSet[index];

      pass += char;
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    randomPasswordGenerator();
  }, [length, numberAllowed, charAllowed, randomPasswordGenerator]);

  return (
    <>
      <div className="border w-full h-screen bg-black opacity-95">
        <div className="rounded-lg max-w-md shadow mx-full bg-gray-800 mx-auto my-32 pt-4 pb-4 px-3">
          <h1 className="text-center text-white text-2xl mb-6">
            Password Generator
          </h1>
          <div className="flex shadow rounded-lg mb-4 overflow-hidden">
            <input
              type="text"
              placeholder="password"
              value={password}
              className="outline-none w-full py-1 px-3"
              readOnly
              ref={passwordRef}
            />
            <button
              className="bg-green-500 outline-none text-white px-3 py-0.5 shrink-0"
              onClick={copyPasswordToClipboard}
            >
              Copy
            </button>
          </div>
          <div className="flex md:flex-row flex-col text-sm text-green-400 gap-x-2 justify-evenly">
            <div className="flex gap-x-1 item-centre">
              <input
                type="range"
                min={5}
                max={50}
                id="range"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="cursor-pointer"
              />
              <label htmlFor="range">length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="number"
                defaultChecked={numberAllowed}
                onChange={() => setNumberAllowed(!numberAllowed)}
              />
              <label htmlFor="number">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="character"
                defaultChecked={charAllowed}
                onChange={() => setCharAllowed(!charAllowed)}
              />
              <label htmlFor="character">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
