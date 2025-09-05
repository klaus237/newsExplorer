import "./NotFound.css";

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__icon">😔</div>
      <h2 className="not-found__title">Nothing found</h2>
      <p className="not-found__text">
        Sorry, but nothing matched your search queries.
      </p>
    </section>
  );
}

export default NotFound;
