import {DateTime} from 'luxon'
import {BaseModel, belongsTo, column} from '@adonisjs/lucid/orm'
import User from '#models/user';
import Organization from '#models/organization';
import type {BelongsTo} from '@adonisjs/lucid/types/relations';

export default class Membership extends BaseModel {
  @column({isPrimary: true})
  declare id: number

  @column()
  declare userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  declare organizationId: number

  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>


  @column()
  declare role: string


  @column.dateTime({autoCreate: true})
  declare createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  declare updatedAt: DateTime
}
