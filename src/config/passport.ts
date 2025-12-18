import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import User from '../apps/user/user.model.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? 'change_this_secret';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (payload: string, done: Function) => {
    try {
      const user = await User.findById(payload.sub);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error as Error, false);
    }
  })
);

export default passport;
