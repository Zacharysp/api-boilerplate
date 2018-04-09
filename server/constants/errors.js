'use strict';

/** Error Names Sets
 * InternalError[Offical]
 * RangeError[Offical]
 * ReferenceError[Offical]
 * SyntaxError[Offical]
 * TypeError[Offical]
 * URIError[Offical]
 * ValidationError[JOI]
 */

/** Code def
 * 1xxxx: Javascript runtime Error
 * 2xxxx: Internal lib/dependencis Error
 * 20xxx: Internal validate Error
 * 3xxxx: Database Error
 * 4xxxx: Our code base error(400 kind)
 * 40xxx: Our code side auth related error(400 kind)
 * 5xxxx: Our code base error(500 kind)
 * 50xxx: Our code side auth related error(500 kind)
 * 6xxxx: Other service Error
 */

module.exports = {
  // 2XXXX Errors
  VALIDATE_ERROR: {
    name: 'ValidationError',
    statusCode: 403,
    code: 20000,
    message: 'unkonw validation error'
  },
  PARAMETER_VALIDATE_ERROR: {
    statusCode: 403,
    code: 20001,
    message: 'parameter validation error'
  },
  DATA_VALIDATE_ERROR: {
    statusCode: 403,
    code: 20002,
    message: 'data validation error'
  },

  // 3XXXX Errors
  DATABASE_ERROR: {
    statusCode: 500,
    code: 30000,
    message: 'unkonw internal database error'
  },

  // 4XXXX Errors
  SERVER_ERROR: {
    statusCode: 400,
    code: 40000,
    message: 'unknow server error'
  },
  UNAUTHORIZED: {
    statusCode: 401,
    code: 40001,
    message: 'Unauthorized'
  },
  IDENTITY_NOT_FOUND: {
    statusCode: 404,
    code: 40002,
    message: 'identity not found'
  },

  // 5XXXX Errors
  INTERNAL_ERROR: {
    statusCode: 500,
    code: 50000,
    message: 'unknow server internal error'
  }
};
