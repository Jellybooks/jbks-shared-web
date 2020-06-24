/** Indicates that a resource is encrypted/obfuscated and provides relevant information
 *  for decryption.
 */
export interface Encryption {

  /** Identifies the algorithm used to encrypt the resource. */
  algorithm: string;

  /** Compression method used on the resource. */
  compression?: string;

  /** Original length of the resource in bytes before compression and/or encryption. */
  originalLength?: number;

  /** Identifies the encryption profile used to encrypt the resource. */
  profile?: string;

  /** Identifies the encryption scheme used to encrypt the resource. */
  scheme?: string;
}