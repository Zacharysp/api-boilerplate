'use strict';

const httpError = require('http-errors');
const Raven = require('raven');

class WCLError extends Error {
  constructor(messageORtemplate, info) {
    if (isTemplate(messageORtemplate)) {
      super((messageORtemplate && messageORtemplate.message) || info.message || 'Undefined Error Message');
      // Copy object props into the error
      this.setExtraInfo(messageORtemplate);
    } else {
      super(messageORtemplate);
    }

    this.isWCLError = true;
    this.isSentry = false;

    this.setExtraInfo(info);
    if (this.isSentry && process.env['SENTRY_DSN']) this.toSentry();

    function isTemplate(messageORtemplate) {
      return typeof messageORtemplate === 'object';
    }
  }

  setExtraInfo(obj) {
    Object.keys(obj).map(key => {
      // Convert status to statusCode
      this[key === 'status' ? 'statusCode' : key] = obj[key];
    });
  }

  getExtraInfo() {
    return Object.keys(this).reduce((infoObj, key) => {
      infoObj[key] = this[key];
      return infoObj;
    }, {});
  }

  toHttp() {
    return httpError(parseInt(this.statusCode), this.message, this.getExtraInfo());
  }

  toSentry() {
    try {
      Raven.captureException(this);
    } catch (err) {
      console.error('>>> faile to send to sentry', err);
      throw err;
    }
  }
}

exports.WCLError = WCLError;

exports.initWCLError = () => {
  try {
    console.log('>>> init WCLError');
    if (process.env['SENTRY_DSN']) {
      console.log('>>> init sentry config');
      Raven.config(process.env['SENTRY_DSN']).install();
    }
  } catch (err) {
    console.error('>>> fail to init WCLError', err);
  }
};
