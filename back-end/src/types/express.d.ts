import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: any; // Bạn có thể thay `any` bằng kiểu chính xác của `user`
  }
}