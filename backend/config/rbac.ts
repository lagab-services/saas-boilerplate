const rbacConfig = {
  systemRoles: {
    admin: ['manage_users', 'manage_system', 'view_reports'],
    user: ['view_profile', 'edit_profile'],
    guest: ['view_public_data'],
  },
  organizationRoles: {
    owner: ['manage_organization', 'assign_roles', 'view_all_data'],
    manager: ['manage_team', 'view_team_data'],
    member: ['view_own_data'],
  },
};

export default rbacConfig
