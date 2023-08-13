import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Badge, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Header, SidebarNav, Footer, PageContent, Avatar, PageAlert, Page } from '../vibe';
import Logo from '../assets/images/vibe-logo.svg';
import nav from '../_nav';
import routes from '../views';
import ContextProviders from '../vibe/components/utilities/ContextProviders';
import handleKeyAccessibility, { handleClickAccessibility } from '../vibe/helpers/handleTabAccessibility';
import Select from 'react-select';
import { connect } from 'react-redux';
import { selectedCamera as selectCamera } from './../redux/actions';
import api from './../util/api';

const MOBILE_SIZE = 992;

export default class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: false,
      isMobile: window.innerWidth <= MOBILE_SIZE
    };
  }

  handleResize = () => {
    if (window.innerWidth <= MOBILE_SIZE) {
      this.setState({ sidebarCollapsed: false, isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  componentDidUpdate(prev) {
    if (this.state.isMobile && prev.location.pathname !== this.props.location.pathname) {
      this.toggleSideCollapse();
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('keydown', handleKeyAccessibility);
    document.addEventListener('click', handleClickAccessibility);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  toggleSideCollapse = () => {
    this.setState(prevState => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
  };

  render() {
    const { sidebarCollapsed } = this.state;
    const sidebarCollapsedClass = sidebarCollapsed ? 'side-menu-collapsed' : '';
    return (
      <ContextProviders>
        <div className={`app ${sidebarCollapsedClass}`}>
          <PageAlert />
          <div className="app-body">
            <SidebarNav
              nav={nav}
              logo={Logo}
              logoText="VIWE"
              isSidebarCollapsed={sidebarCollapsed}
              toggleSidebar={this.toggleSideCollapse}
              {...this.props}
            />
            <Page
            >
              <Header
                toggleSidebar={this.toggleSideCollapse}
                isSidebarCollapsed={sidebarCollapsed}
                routes={routes}
                {...this.props}
              >
                <HeaderNav props={this.props} />
              </Header>
              <PageContent>
                <Switch>
                  {routes.map((page, key) => (
                    <Route path={page.path} component={page.component} key={key} />
                  ))}
                  <Redirect from="/" to="/404" />
                </Switch>
              </PageContent>
            </Page>
          </div>
          {/* <div className="app-footer" /> */}
          <Footer>
            <span>Copyright © 2019 Nice Dash. All rights reserved.</span>
            <span>
              <a href="#!">Terms</a> | <a href="#!">Privacy Policy</a>
            </span>
            <span className="ml-auto hidden-xs">
              Made with{' '}
              <span role="img" aria-label="taco">
                🌮
              </span>
            </span>
          </Footer>
        </div>
      </ContextProviders>
    );
  }
}

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

class HeaderNav extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
    this.onProfile = this.onProfile.bind(this);
  }

  onLogout() {
    api.post("/Logout", {}, (res) => {
      this.props.props.history.push('/Login');
    });
  }

  onProfile() {
    debugger
  }

  render() {
    const { cameraRecord, selectedCamera } = this.props;
    const { camData } = cameraRecord;
    let isPlaybackscreen = this.props.props.location.pathname.indexOf("playback") > -1;
    let options = camData.map(e => { return { value: e.Id, label: e.Name } });
    return (
      <React.Fragment>
        <NavItem>
          {/* <form className="form-inline">
            <input className="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search" />
            <Button type="submit" className="d-none d-sm-block">
              <i className="fa fa-search" />
            </Button>
          </form> */}
          {
            isPlaybackscreen && <div className="form-inline" style={{ width: '200px', display: 'block' }}>
              <Select
                styles={{
                  width: "400px"
                }}
                value={selectedCamera.camera}
                onChange={(item) => {
                  this.props.dispatch(selectCamera({ camera: item }));
                }}
                options={options}
              />
            </div>
          }
        </NavItem>
        {/* <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            New
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Project</DropdownItem>
            <DropdownItem>User</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              Message <Badge color="primary">10</Badge>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav>
            <Avatar image={Logo} size="small" initials="JS" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={this.onProfile}>Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={this.onLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </React.Fragment>
    );
  }
}
HeaderNav = connect((state) => {
  return {
    cameraRecord: state.cameraRecord,
    selectedCamera: state.selectedCamera
  }
})(HeaderNav);