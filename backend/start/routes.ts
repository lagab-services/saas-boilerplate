/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import {middleware} from "#start/kernel";
import AuthController from '#controllers/auth/auth_controller';
import MembershipController from '#controllers/membership_controller';
import OrganizationsController from '#controllers/organizations_controller';

router.group(() => {
  router.group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
    router.post('/google', [AuthController, 'googleAuth'])
    router.post('/forgot-password', [AuthController, 'forgotPassword'])
    router.post('/reset-password', [AuthController, 'resetPassword'])
    router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
  }).prefix('auth')
  router.group(() => {
    // Organization Routes
    router.get('/organizations', [OrganizationsController, 'list'])
    router.post('/organizations', [OrganizationsController, 'create'])
    router.get('/organizations/:id', [OrganizationsController, 'get'])
    router.put('/organizations/:id', [OrganizationsController, 'update'])
    router.delete('/organizations/:id', [OrganizationsController, 'delete'])

    // Membership Routes
    router.get('/organizations/:id/members', [MembershipController, 'listMembers']).use([middleware.orgPermission({permissions: ['owner', 'manager']})])
    router.post('/organizations/:id/invite', [MembershipController, 'invite']).use([middleware.orgPermission({permissions: ['owner', 'manager']})])
    router.delete('/organizations/:id/members/:userId', [MembershipController, 'remove']).use([middleware.orgPermission({permissions: ['owner', 'manager']})])
    router.put('/organizations/:id/members/:userId/role', [MembershipController, 'updateRole']).use([middleware.orgPermission({permissions: ['owner', 'manager']})])

    // Subscription Routes
    // router.post('/organizations/:id/subscription', 'SubscriptionController.create')
    // router.put('/organizations/:id/subscription', 'SubscriptionController.update')
    // router.delete('/organizations/:id/subscription', 'SubscriptionController.cancel')
    router.get('/me', async ({auth, response}) => {
      try {
        const user = auth.getUserOrFail()
        return response.ok(user)
      } catch (error) {
        return response.unauthorized({error: 'User not found'})
      }
    })
  }).use([middleware.auth()])
}).prefix('/api/v1')
