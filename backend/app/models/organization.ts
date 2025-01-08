import {DateTime} from 'luxon'
import {BaseModel, column, hasMany} from '@adonisjs/lucid/orm'
import type {HasMany} from '@adonisjs/lucid/types/relations';
import Membership from '#models/membership';

export default class Organization extends BaseModel {
  @column({isPrimary: true})
  declare id: number

  @column()
  public name: string

  @column()
  public type: 'private' | 'public'

  @column()
  public plan: 'basic' | 'premium' // Default to 'basic'
  
  @column()
  public ownerId: number

  @hasMany(() => Membership)
  declare memberships: HasMany<typeof Membership>


  @column.dateTime({autoCreate: true})
  declare createdAt: DateTime
}
