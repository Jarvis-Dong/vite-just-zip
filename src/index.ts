import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import type { Plugin } from 'vite';

interface ViteJustZipOptions {
  /**
   * The output directory to zip
   * @default 'dist'
   */
  outDir?: string;
  
  /**
   * The directory where to save the zip file
   * @default same as outDir's parent
   */
  zipPath?: string;
  
  /**
   * The app code prefix for the zip file name
   * @default 'app'
   */
  appCode?: string;
  
  /**
   * Whether to enable the plugin
   * @default true in production, false otherwise
   */
  enabled?: boolean;
}

function getNextIndex(baseDir: string, appCode: string, dateStr: string): number {
  // Read all files in the directory
  const files = fs.readdirSync(path.dirname(baseDir));
  // Match zip files for the current day with the pattern: appCode_YYYYMMDD_1.zip
  const pattern = new RegExp(`${appCode}_${dateStr}_(\\d+)\\.zip`);
  let maxIndex = 0;

  files.forEach(file => {
    const match = file.match(pattern);
    if (match) {
      const index = parseInt(match[1]);
      maxIndex = Math.max(maxIndex, index);
    }
  });

  return maxIndex + 1;
}

function zipOutputFolder(outDir: string, zipPath: string, appCode: string): Promise<string> {
  const outputPath = path.resolve(outDir);
  // Generate date string in YYYYMMDD format
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  // Get the next available index
  const index = getNextIndex(zipPath || outputPath, appCode, dateStr);
  // Build the new zip file name
  const zipFilePath = path.join(
    path.dirname(zipPath || outputPath),
    `${appCode}_${dateStr}_${index}.zip`
  );

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', { zlib: { level: 9 }});

    output.on('close', () => resolve(zipFilePath));
    archive.on('error', (err: Error) => reject(err));

    archive.pipe(output);
    // Maintain the original directory structure
    archive.directory(outputPath, path.basename(outDir));
    archive.finalize();
  });
}

export default function viteJustZip(options: ViteJustZipOptions = {}): Plugin {
  const {
    outDir = 'dist',
    zipPath,
    appCode = 'app',
    enabled
  } = options;

  return {
    name: 'vite-just-zip',
    apply: 'build',
    closeBundle: async () => {
      const isProduction = process.env.NODE_ENV === 'production';
      const shouldZip = enabled !== undefined ? enabled : isProduction;
      
      if (!shouldZip) {
        return;
      }
      
      try {
        const finalOutDir = process.env.VITE_BUILD_PATH || outDir;
        const finalZipPath = zipPath || process.env.VITE_ZIP_PATH || finalOutDir;
        const finalAppCode = process.env.VITE_APP_CODE || appCode;
        
        const zipFilePath = await zipOutputFolder(finalOutDir, finalZipPath, finalAppCode);
        console.log(`Successfully packaged and compressed: ${zipFilePath}`);
      } catch (err) {
        console.error('Error compressing folder:', err);
      }
    }
  };
} 