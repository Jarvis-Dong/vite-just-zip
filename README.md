# vite-just-zip

A Vite plugin to automatically zip your build output folder with incremental versioning.

## Features

- Automatically zips your build output directory after build
- Creates versioned zip files with format: `appCode_YYYYMMDD_index.zip`
- Automatically increments the index for multiple builds on the same day
- Configurable output paths and app code prefix
- Environment variable support for easy integration with existing projects

## Installation

```bash
npm install vite-just-zip --save-dev
# or
yarn add vite-just-zip -D
# or
pnpm add vite-just-zip -D
```

## Usage

Add the plugin to your `vite.config.js` or `vite.config.ts`:

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteJustZip from 'vite-just-zip'

export default defineConfig({
  plugins: [
    vue(),
    viteJustZip({
      // options (all optional)
      outDir: 'dist',          // Output directory to zip
      zipPath: './dist',       // Directory where to save the zip file
      appCode: 'myapp',        // App code prefix for the zip filename
      enabled: true            // Whether to enable the plugin (defaults to true in production)
    })
  ]
})
```

## Environment Variables Support

This plugin also respects the following environment variables if they are set:

- `VITE_BUILD_PATH`: The build output directory
- `VITE_ZIP_PATH`: The directory where to save the zip file
- `VITE_APP_CODE`: The app code prefix for the zip filename

Environment variables take precedence over options passed to the plugin.

## Options

| Option   | Type    | Default              | Description                                    |
|----------|---------|----------------------|------------------------------------------------|
| outDir   | string  | 'dist'               | The output directory to zip                    |
| zipPath  | string  | Same as outDir       | Directory where to save the zip file           |
| appCode  | string  | 'app'                | App code prefix for the zip filename           |
| enabled  | boolean | true in production   | Whether to enable the plugin                   |

## License

MIT 