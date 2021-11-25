import { IUserTokenDTO } from '../dtos/IUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: IUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
