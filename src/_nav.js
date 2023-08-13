export default {
  top: [
    {
      name: 'Home',
      url: '/home',
      icon: 'Home',
    },
    {
      name: 'Video',
      url: '/video',
      icon: 'Play',
    },
    {
      name: 'Playback',
      url: '/playback',
      icon: 'Video',
    },
    {
      name: 'Admin',
      icon: 'Cloud',
      children: [
        {
          name: 'Users',
          url: '/users',
          icon: 'User',
        },
        {
          name: 'Cameras',
          url: '/cameras',
          icon: 'Camera',
        },
        {
          name: 'Smart Sensor',
          url: '/SmartSensors',
          icon: 'Wifi',
        },
        {
          name: 'System Settings',
          url: '/SystemSettings',
          icon: 'Settings',
        },
        // {
        //   name: 'Recording',
        //   url: '/recording',
        //   icon: 'Save',
        // },
        // {
        //   name: 'Events',
        //   url: '/event',
        //   icon: 'Package',
        // }
      ],
    },
    {
      divider: true,
    }
  ],
  bottom: [
    {
      name: 'Get Viwe',
      url: '/home',
      icon: 'GitHub',
      external: true,
      target: '_blank',
    },
    {
      name: 'Account',
      url: '/home',
      icon: 'User',
      badge: {
        variant: 'success',
        text: '3',
      },
    },
  ],
};
