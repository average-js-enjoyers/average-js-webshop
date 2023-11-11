import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function App() {
  const location = useLocation();

  const nodeRef = useRef(null); // Create a ref to pass to CSSTransition

  return (
    <>
      <TransitionGroup>
        <CSSTransition
          nodeRef={nodeRef}
          key={location.pathname}
          classNames="fade"
          timeout={300}
        >
          <div ref={nodeRef} id="routeRootWithAnimations">
            <Outlet /> {/* <Outlet /> is used to render child routes */}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
