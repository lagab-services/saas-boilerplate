import {DateTime} from 'luxon'
import hash from '@adonisjs/core/services/hash'
import {compose} from '@adonisjs/core/helpers'
import {BaseModel, column, manyToMany} from '@adonisjs/lucid/orm'
import {withAuthFinder} from '@adonisjs/auth/mixins/lucid'
import {DbAccessTokensProvider} from '@adonisjs/auth/access_tokens'
import Organization from '#models/organization';
import type {ManyToMany} from '@adonisjs/lucid/types/relations';

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({isPrimary: true})
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({serializeAs: null})
  declare password: string

  @column()
  public role: string

  @column()
  declare image: string | null

  @column()
  declare resetPasswordToken: string | null

  @column.dateTime()
  declare resetPasswordTokenExpires: DateTime | null

  @column.dateTime({autoCreate: true})
  declare createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @manyToMany(() => Organization, {
    pivotTable: 'memberships',
    pivotColumns: ['role'], // Colonne pour le rôle organisationnel
  })
  public organizations: ManyToMany<typeof Organization>
}
