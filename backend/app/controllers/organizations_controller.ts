// import type { HttpContext } from '@adonisjs/core/http'

import {inject} from '@adonisjs/core';
import OrganizationService from '#services/organization_service';

@inject()
export default class OrganizationsController {
  constructor(protected organizationService: OrganizationService) {
  }


  public async get({params, request}) {
    const organizationId = params.id
    return await this.organizationService.getOrganization(organizationId)
  }

  public async list({auth}) {
    const user = auth.getUserOrFail()
    // Retrieve organizations where the user has a role
    return this.organizationService.getUserOrganizations(user.id)
  }

  public async create({request, auth}) {
    const user = auth.user!
    const data = request.only(['name', 'type'])
    return await this.organizationService.createOrganization({...data, ownerId: user.id})
  }

  public async update({params, request}) {
    const organizationId = params.id
    const data = request.only(['name', 'type'])
    return await this.organizationService.updateOrganization(organizationId, data)
  }

  public async delete({params}) {
    const organizationId = params.id
    await this.organizationService.deleteOrganization(organizationId)
    return {message: 'Organization deleted successfully'}
  }
}
