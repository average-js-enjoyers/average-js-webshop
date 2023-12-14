function ButtonTemplate() {
  return (
    <>
      <h3 className="py-3 mt-5">Button Template Examples</h3>
      <button className="btn btn-primary">Primary</button>{" "}
      <button className="btn btn-outline-primary">Outline Prim.</button> <hr />
      <button className="btn btn-secondary">Secondary</button>{" "}
      <button className="btn btn-outline-secondary">Outline Sec.</button> <hr />
      <button className="btn btn-success btn--compact">Success</button>{" "}
      <button className="btn btn-outline-success btn--compact">
        Outline Succ.
      </button>{" "}
      <hr />
      <button className="btn btn-warning btn--compact">Warning</button>{" "}
      <button className="btn btn-outline-warning btn--compact">
        Outline Warn.
      </button>{" "}
      <hr />
      <button className="btn btn-danger btn--compact">Danger</button>{" "}
      <button className="btn btn-outline-danger btn--compact">
        Outline Dang.
      </button>{" "}
      <hr />
      <button className="btn btn-info btn--compact">Info</button>{" "}
      <button className="btn btn-outline-info btn--compact btn--muted">
        Outline Info
      </button>{" "}
      <hr />
      <button className="btn btn-light btn--compact btn--muted">
        Light
      </button>{" "}
      <button className="btn btn-outline-light btn--compact btn--muted">
        Outline Light
      </button>{" "}
      <hr />
      <button className="btn btn-dark btn--compact btn--muted">
        Dark
      </button>{" "}
      <button className="btn btn-outline-dark btn--compact btn--muted">
        Outline Dark
      </button>{" "}
      <hr />
      <button className="btn btn-link btn--compact btn--muted">
        Forgot password?
      </button>{" "}
    </>
  );
}

export default ButtonTemplate;
