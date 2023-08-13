import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './views/pages/Login';
import Loading from './common/Loader';
import './vibe/scss/styles.scss';
import { tabVisible } from './redux/actions';
import { connect } from 'react-redux';

class Root extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    window.document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        dispatch(tabVisible({ isVisible: false }));
      } else {
        dispatch(tabVisible({ isVisible: true }));
      }
    });
  }

  render() {
    return (
      <>
        <Loading />
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={Login} />
            <Route exact={true} path="/login" component={Login} />
            <Route component={DashboardLayout} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default connect((state) => {
  return {}
})(Root);

// export default Root;

// export default function App() {
//   return (
//     <Provider store={store}>
//       <Root />
//     </Provider>
//   );
// }