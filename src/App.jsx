import React from "react";
import Header from "./components/Header";

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main>
        <h1>Willkommen in der Welt der begabten Kinder</h1>
        {/* сюда потом добавим Hero и Cards */}
      </main>
    </>
  );

}


