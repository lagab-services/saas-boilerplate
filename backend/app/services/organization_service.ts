import Organization from '#models/organization';

export default class OrganizationService {
  public async createOrganization(data: { name: string; type: 'private' | 'public'; ownerId: number }) {
    return await Organization.create({...data, plan: 'basic'})
  }

  public async updateOrganization(id: number, data: Partial<{ name: string; type: string }>) {
    const organization = await Organization.findOrFail(id)
    organization.merge(data)
    await organization.save()
    return organization
  }

  public async getOrganization(id: number) {
    return await Organization.findOrFail(id)
  }

  public async deleteOrganization(id: number) {
    const organization = await Organization.findOrFail(id)
    await organization.delete()
  }

  public async getUserOrganizations(userId: number) {
    return await Organization.query()
      .select('organizations.*', 'memberships.role')
      .join('memberships', 'organizations.id', '=', 'memberships.organization_id')
      .where('memberships.user_id', userId)
  }
}
