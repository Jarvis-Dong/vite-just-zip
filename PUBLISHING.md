# Publishing vite-just-zip

This document contains instructions for testing and publishing the vite-just-zip package.

## Local Development and Testing

1. **Build the package locally**:
   ```bash
   cd vite-just-zip
   npm install
   npm run build
   ```

2. **Test it in your project**:
   
   You can test the plugin locally without publishing by linking it:
   ```bash
   # In the vite-just-zip directory
   npm link
   
   # In your project directory
   npm link vite-just-zip
   ```

   Or by using a local file reference in your project's package.json:
   ```json
   {
     "dependencies": {
       "vite-just-zip": "file:../path/to/vite-just-zip"
     }
   }
   ```

3. **Verify the plugin works**:
   Run a build in your project and check that the zip file is created:
   ```bash
   npm run build
   ```

## Publishing to npm

1. **Update version**:
   Update the version in `package.json` following semantic versioning.

2. **Build the package**:
   ```bash
   npm run build
   ```

3. **Login to npm**:
   ```bash
   npm login
   ```

4. **Publish the package**:
   ```bash
   npm publish
   ```

   If you want to publish a beta version:
   ```bash
   npm publish --tag beta
   ```

## Version Tags

- Use `^1.0.0` for stable releases
- Use `npm publish --tag beta` for beta releases
- Use `npm publish --tag next` for next releases

## After Publishing

Make sure to test the published package by installing it from npm:

```bash
npm install vite-just-zip --save-dev
```

And verify it works in a real project. 