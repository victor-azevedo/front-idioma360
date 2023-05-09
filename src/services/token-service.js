/* eslint-disable no-unused-vars */
import jwt from "jsonwebtoken";
import nookies from "nookies";

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_MONTH = ONE_DAY * 30;
const ONE_YEAR = ONE_DAY * 365;

function save(accessToken, ctx = null) {
  nookies.set(null, ACCESS_TOKEN_KEY, accessToken, {
    maxAge: ONE_MONTH,
    path: "/",
  });
}

function get(ctx = null) {
  const cookies = nookies.get(ctx);
  return cookies[ACCESS_TOKEN_KEY] || null;
}

function destroy(ctx = null) {
  nookies.destroy(ctx, ACCESS_TOKEN_KEY, { path: "/" });
}

function decode(ctx = null) {
  const token = get();
  return jwt.decode(token);
}

export const tokenService = {
  save,
  get,
  destroy,
  decode,
};
