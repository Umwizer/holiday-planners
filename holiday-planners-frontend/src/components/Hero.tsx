import { useEffect, useState } from "react";
import {  reviews} from "../data/review";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const review = reviews[current];

  const next = () => setCurrent((c) => (c + 1) % reviews.length);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center text-center text-white"
      style={{ backgroundImage: `url(${review.image})` }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative max-w-3xl px-6">
        <h1 className="font-serif text-5xl md:text-7xl">
          {review.lineOne}
          <br />
          <span className="bg-gold px-4">{review.lineTwo}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl">{review.text}</p>
      </div>

      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
    </section>
  );
}