import Membership from '#models/membership';
import UnAuthorizedException from '#exceptions/un_authorized_exception';

export default class MembershipService {

  /**
   * Add a user to an organization with a specific role
   */
  public async addMember(organizationId: number, userId: number, role: 'owner' | 'admin' | 'member') {
    const organization = await Membership.findOrFail(organizationId)

    // Check if the user is already a member
    const existingMembership = await Membership.query()
      .where('organization_id', organizationId)
      .where('user_id', userId)
      .first()

    if (existingMembership) {
      throw new UnAuthorizedException('User is already a member of this organization')
    }

    // Add the user to the organization
    return await Membership.create({
      organizationId,
      userId,
      role,
    })
  }

  /**
   * Remove a user from an organization
   */
  public async removeMember(organizationId: number, userId: number) {
    const membership = await Membership.query()
      .where('organization_id', organizationId)
      .where('user_id', userId)
      .firstOrFail()

    // Ensure the last owner cannot be removed
    if (membership.role === 'owner') {
      const ownerCount = await Membership.query()
        .where('organization_id', organizationId)
        .where('role', 'owner')
        .count('* as total')

      if (ownerCount[0].total === 1) {
        throw new UnAuthorizedException('Cannot remove the last owner of the organization')
      }
    }

    // Remove the user from the organization
    await membership.delete()
  }

  /**
   * Update the role of a member in an organization
   */
  public async updateRole(organizationId: number, userId: number, newRole: 'owner' | 'admin' | 'member') {
    const membership = await Membership.query()
      .where('organization_id', organizationId)
      .where('user_id', userId)
      .firstOrFail()

    // Update the role
    membership.role = newRole
    await membership.save()
  }

  /**
   * List all members of an organization
   */
  public async listMembers(organizationId: number) {
    return await Membership.query()
      .where('organization_id', organizationId)
      .preload('user') // Assumes a relationship between UserOrganizationRole and User models
  }
}
