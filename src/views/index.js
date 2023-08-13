import Analytics from './pages/Analytics';
import Users from './pages/Users';
import User from './pages/User';
import Video from './pages/Video';
import Cameras from './pages/Cameras';
import RecordingSettings from './pages/RecordingSettings';
import EventSettings from './pages/EventSettings';
import Page404 from './pages/404';
import Playback from './pages/Playback';

import SmartSensors from './pages/SmartSensors';
import SmartSensor from './pages/SmartSensor';
import SystemSettings from './pages/SystemSettings';

//Pages
import Camera from './pages/Camera';

// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: 'Home',
    path: '/home',
    component: Analytics,
  },
  {
    name: 'Users',
    path: '/users',
    component: Users,
  },
  {
    name: 'Video',
    path: '/video',
    component: Video,
  },
  {
    name: 'Cameras',
    path: '/cameras',
    component: Cameras,
  },
  {
    name: 'Recording Settings',
    path: '/recording',
    component: RecordingSettings,
  },
  {
    name: 'Event Settings',
    path: '/event',
    component: EventSettings,
  },
  {
    name: '404',
    path: '/404',
    component: Page404,
  },
  {
    name: 'Camera',
    path: '/camera/:id',
    component: Camera,
  },
  {
    name: 'User',
    path: '/user/:id',
    component: User,
  },
  {
    name: 'Playback',
    path: '/playback',
    component: Playback,
  },
  {
    name: 'Smart Sensors',
    path: '/SmartSensors',
    component: SmartSensors,
  },
  {
    name: 'Smart Sensor',
    path: '/SmartSensor/:id',
    component: SmartSensor,
  },
  {
    name: 'System Settings',
    path: '/SystemSettings',
    component: SystemSettings,
  }
];

export default pageList;
