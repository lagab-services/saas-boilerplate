// import type { HttpContext } from '@adonisjs/core/http'


import {inject} from '@adonisjs/core';
import MembershipService from '#services/membership_service';

@inject()
export default class MembershipController {
  constructor(protected membershipService: MembershipService) {
  }

  public async listMembers({params}) {
    const {id: organizationId} = params
    return await this.membershipService.listMembers(organizationId)
  }

  public async invite({params, request}) {
    const organizationId = params.id
    const {userId, role} = request.only(['userId', 'role'])
    await this.membershipService.addMember(organizationId, userId, role)
    return {message: 'User invited successfully'}
  }

  public async remove({params}) {
    const {id: organizationId, userId} = params
    await this.membershipService.removeMember(organizationId, userId)
    return {message: 'Member removed successfully'}
  }

  public async updateRole({params, request}) {
    const {id: organizationId, userId} = params
    const {role} = request.only(['role'])
    await this.membershipService.updateRole(organizationId, userId, role)
    return {message: 'Role updated successfully'}
  }
}
