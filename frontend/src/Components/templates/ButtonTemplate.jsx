import Button from "react-bootstrap/Button";

function ButtonTemplate() {
  return (
    <>
      <h1 className="py-3">Button Template Examples</h1>
      <Button variant="primary">Primary</Button>{" "}
      <Button variant="outline-primary">Outline Prim.</Button> <hr />
      <Button variant="secondary">Secondary</Button>{" "}
      <Button variant="outline-secondary">Outline Sec.</Button> <hr />
      <Button variant="success" className="btn--compact">
        Success
      </Button>{" "}
      <Button variant="outline-success" className="btn--compact">
        Outline Succ.
      </Button>{" "}
      <hr />
      <Button variant="warning" className="btn--compact">
        Warning
      </Button>{" "}
      <Button variant="outline-warning" className="btn--compact">
        Outline Warn.
      </Button>{" "}
      <hr />
      <Button variant="danger" className="btn--compact">
        Danger
      </Button>{" "}
      <Button variant="outline-danger" className="btn--compact">
        Outline Dang.
      </Button>{" "}
      <hr />
      <Button variant="info" className="btn--compact">
        Info
      </Button>{" "}
      <Button variant="outline-info" className={`btn--compact btn--muted`}>
        Outline Info
      </Button>{" "}
      <hr />
      <Button variant="light" className={`btn--compact btn--muted`}>
        Light
      </Button>{" "}
      <Button variant="outline-light" className={`btn--compact btn--muted`}>
        Outline Light
      </Button>{" "}
      <hr />
      <Button variant="dark" className={`btn--compact btn--muted`}>
        Dark
      </Button>{" "}
      <Button variant="outline-dark" className={`btn--compact btn--muted`}>
        Outline Dark
      </Button>{" "}
      <hr />
      <Button variant="link" className={`btn--compact btn--muted`}>
        Forgot password?
      </Button>{" "}
    </>
  );
}

export default ButtonTemplate;
