import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      console.log(data.result);
      setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error.message);
      // alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        {/* <link rel="icon" href="/dog.png" /> */}
      </Head>

      <main className={styles.main}>
        {/* <img src="/dog.png" className={styles.icon} /> */}
        <h3>Ask Me</h3>
        <form onSubmit={onSubmit}>
          <textarea
          rows={1}
          className="ttarea"
            type="text"
            name="animal"
            placeholder="Ask Anything"
            value={animalInput}
            onChange={(e) => { setAnimalInput(e.target.value); }}
          />
          <input type="submit" value="Done" />
        </form>
        <div className={styles.result}>{result}</div>
        <br />
        <br />
        <br />
        <div className={styles.result}>Count {result?.trim().split(' ').length}</div>
      </main>
    </div>
  );
}
