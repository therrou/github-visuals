'use client'

import { useEffect, useState } from "react";



export default function Home() {

const [message, setMessage] = useState();

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/github`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData(  )
  return () => {
  };
}, []);

const handleSubmit = async (e: any) => {
  e.preventDefault();
  try {
    const response = await fetch(`/api/github`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    setMessage(data);
    
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
 test and {JSON.stringify(message)}
    <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Sending POST</button>
    </div>
  );
}
