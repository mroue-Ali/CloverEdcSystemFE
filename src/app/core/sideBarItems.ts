export const sideBarItems = [
  { title: 'Home', route: '/home', icon: 'home', roles: ['All'] },
  { title: 'Users', route: '/users', icon: 'group', roles: ['SuperAdmin'] },
  { title: 'Roles', route: '/roles', icon: 'supervisor_account', roles: ['SuperAdmin'] },
  { title: 'Protocols', route: '/protocols', icon: 'health_and_safety', roles: ['SuperAdmin'] },
  { title: 'Studies', route: '/studies', icon: 'assignment', roles: ['SuperAdmin'] },
  //i want icon for crf template and sites and Principal Investigators

  { title: 'Crf Template', route: '/crf_template', icon: 'article', roles: ['Admin'] },
  { title: 'Sites', route: '/sites', icon: 'business', roles: ['Admin','CRC','DM'] },
  { title: 'PIs', route: '/pis', icon: 'account_circle', roles: ['Admin'] },
  { title: 'CRCs', route: '/crcs', icon: 'person', roles: ['Admin'] },
  { title: 'DMs', route: '/dms', icon: 'assessment', roles: ['Admin'] },
  { title: 'CRFs', route: '/crf', icon: 'note', roles: ['CRC'] },
  { title: 'Patients', route: '/patient', icon: 'note', roles: ['Admin', 'CRC'] },


];
