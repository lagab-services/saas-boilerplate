import type {HttpContext} from '@adonisjs/core/http'
import User from "#models/user";
import {loginValidator, registerValidator} from "#validators/auth";
import AuthService from '#services/auth/auth_service';
import {inject} from '@adonisjs/core';

@inject()
export default class AuthController {
  constructor(protected  authService: AuthService) {}
  async login({request, response}: HttpContext) {
    const {email, password} = await request.validateUsing(loginValidator)

    const { token, user } = await this.authService.login(email, password)

    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }

  async logout({auth, response}: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({message: 'Token not found'})
    }
    await User.accessTokens.delete(user, token)
    return response.ok({message: 'Logged out'})
  }

  async register({request, response}: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await this.authService.register(payload)

    return response.created(user)
  }

  public async googleAuth({ request, response }: HttpContext) {
    const { email, name } = request.only(['email', 'name'])

    let user = await User.findBy('email', email)

    if (!user) {
      user = new User()
      user.email = email
      user.fullName = name
      await this.authService.registerWithAuth(user)
    }

    return response.json({ user })
  }

}
