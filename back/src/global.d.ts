declare module 'cors' {
    import { RequestHandler } from 'express';
    function cors(options?: any): RequestHandler;
    export = cors;
  }