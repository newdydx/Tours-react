import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const App = () => {
  const url = "https://course-api.com/react-tours-project";
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const removeItem = (id) => {
    const newTours = people.filter((person) => person.id !== id);
    setPeople(newTours);
  };

  const setFetchItem = async () => {
    setLoading(true);
    const response = await fetch(url);
    const people = await response.json();
    setPeople(people);
    setLoading(false);
    console.log(people);
  };
  useEffect(() => {
    setFetchItem();
  }, [url]);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )}
  if (people.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button
            className="btn"
            onClick={() => {
              setFetchItem();
            }}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <section>
      <div className="title">
        <h2>Our Tours</h2>
        <div className="underline"></div>
      </div>
      <div className="tours">
        {people.map((person) => {
          const { id, image, info, name, price } = person;
          return (
            <article className="single-tour" key={id}>
              <img src={image} alt="" />
              <footer>
                <div className="tour-info">
                  <h4>{name}</h4>
                  <h4 className="tour-price"> ${price}</h4>
                </div>
                <p>
                  {readMore ? info : `${info.substring(0, 200)}...`}
                  <button onClick={() => setReadMore(!readMore)}>
                    {readMore ? "show less" : "read more"}
                  </button>
                </p>
                <button
                  className="delete-btn"
                  onClick={() => {
                    removeItem(id);
                  }}
                >
                  not intrested
                </button>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default App
