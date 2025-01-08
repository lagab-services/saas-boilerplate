import type {HttpContext} from '@adonisjs/core/http'
import type {NextFn} from '@adonisjs/core/types/http'
import UnAuthorizedException from '#exceptions/un_authorized_exception';
import Membership from '#models/membership';

export default class OrgPermissionMiddleware {
  async handle(ctx: HttpContext, next: NextFn, options: {
    permissions: string[]
  }) {

    const user = ctx.auth.user

    // Retrieve the authenticated user
    if (!user) {
      throw new UnAuthorizedException('Unauthorized access')
    }
    const organizationId = ctx.request.param('id')
    if (!organizationId) {
      throw new UnAuthorizedException('Organization ID is required')
    }
    // Check if the user has the correct role in the organization
    const membership = await Membership.query()
      .where('user_id', user.id)
      .where('organization_id', organizationId)
      .first()

    if (!membership || !options.permissions.includes(membership.role)) {
      throw new UnAuthorizedException('Access denied. Insufficient permissions.')
    }
    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
