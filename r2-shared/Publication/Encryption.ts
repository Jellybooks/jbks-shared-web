export interface Encryption {
  algorithm: string;
  compression?: string;
  originalLength?: number;
  profile?: string;
  scheme?: string;
}