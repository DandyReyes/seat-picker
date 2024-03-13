"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const array = new Array(198).fill(0);
  const [color, setColor] = useState<{ [index: number]: "blue" | "gray" }>({
    0: "blue",
    1: "blue",
  });

  const handleClick = (event: any, index: number) => {
    event.preventDefault();
    const { backgroundColor } = event.target.style;
    setColor({
      ...color,
      [index]: backgroundColor === "blue" ? "gray" : "blue",
    });
  };

  useEffect(() => {
    for (const [key, value] of Object.entries(color)) {
      // console.log(`${key}: ${value}`);
    }
  }, [color]);

  return (
    <main className="min-h-screen p-24">
      <div
        style={{
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%/3, max(64px, 100%/5)), 1fr))",
        }}
        className="grid grid-cols-9 justify-items-center"
      >
        {array.map((element, index) => {
          return (
            <div
              className="rounded-full cursor-pointer w-8 h-8 border-2 border-white mr-2 min-h-8 min-w-8"
              onClick={(e) => handleClick(e, index)}
              style={{
                background: color[index] ?? "blue",
              }}
              key={Math.random()}
            ></div>
          );
        })}
      </div>
    </main>
  );
}
