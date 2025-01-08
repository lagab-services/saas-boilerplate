import type {HttpContext} from '@adonisjs/core/http'
import type {NextFn} from '@adonisjs/core/types/http'
import rbacConfig from '#config/rbac';
import UnAuthorizedException from '#exceptions/un_authorized_exception';

export default class PermissionMiddleware {
  async handle(ctx: HttpContext, next: NextFn, options: {
    permissions: string[]
  }) {
    /**
     * Middleware logic goes here (before the next call)
     */

    const user = ctx.auth.user

    // Retrieve the authenticated user
    if (!user) {
      throw new UnAuthorizedException('Unauthorized access')
    }
    // Fetch permissions associated with the user's generic role
    const permissions = rbacConfig.systemRoles[user.genericRole] || []

    // Check if the user has at least one of the required permissions
    const hasPermission = options.permissions.some((permission) => permissions.includes(permission))

    if (!hasPermission) {
      throw new UnAuthorizedException('Access denied')
    }
    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
