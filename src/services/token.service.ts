import jwt from 'jsonwebtoken';
import { UserEntity } from '../database/entities/users';
//import tokenModel from "../models/tokenModel.js";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as jwt.Secret;

class TokenService {
  async generateToken(payload: UserEntity): Promise<{
    accessToken: string;
  }> {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: '15m',
    });
    return {
      accessToken,
    };
  }

  //   async saveToken(userId, refreshToken) {
  //     const tokenData = await tokenModel.findOne({ user: userId });
  //     if (tokenData) {
  //       tokenData.refreshToken = refreshToken;
  //       return tokenData.save();
  //     }
  //     const token = await tokenModel.create({ user: userId, refreshToken });
  //     return token;
  //   }

  //   async removeToken(refreshToken) {
  //     const tokenData = await tokenModel.findOneAndDelete({ refreshToken });
  //     return tokenData;
  //   }

  //   async findToken(refreshToken) {
  //     const tokenData = await tokenModel.findOne({ refreshToken });
  //     return tokenData;
  //   }

  /*validateAccessToken(token:string): boolean | null{
    try {
      jwt.verify(token, JWT_ACCESS_SECRET);
      return true;
    } catch (err) {
      return null;
    }
  }*/

  //   validateRefreshToken(token) {
  //     try {
  //       const userData = jwt.verify(
  //         token,
  //         JWT_ACCESS_SECRET
  //       );
  //       return userData;
  //     } catch (err) {
  //       return null;
  //     }
  //   }
}

export default new TokenService();
