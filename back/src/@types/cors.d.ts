declare module 'cors' {
    import express from 'express';
    function cors(options?: any): express.RequestHandler;
    export = cors;
  }