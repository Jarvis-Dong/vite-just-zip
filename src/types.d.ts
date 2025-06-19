declare module 'archiver' {
  import { Readable, Transform } from 'stream';
  
  namespace archiver {
    interface ArchiverOptions {
      zlib?: {
        level?: number;
      };
    }
  }
  
  interface Archiver extends Transform {
    pipe(destination: NodeJS.WritableStream): NodeJS.WritableStream;
    directory(dirpath: string, destpath: string): this;
    finalize(): Promise<void>;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: string, listener: Function): this;
  }
  
  function archiver(format: string, options?: archiver.ArchiverOptions): Archiver;
  
  export = archiver;
} 