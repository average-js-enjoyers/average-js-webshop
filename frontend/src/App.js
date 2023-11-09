import { Outlet, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function App() {
  const location = useLocation();

  return (
    <>
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
          <div id="routeRootWithAnimations">
            <Outlet /> {/* <Outlet /> is used to render child routes */}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
