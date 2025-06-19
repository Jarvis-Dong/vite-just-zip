#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up vite-just-zip package...${NC}"

# Install dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
npm install

# Build the package
echo -e "${GREEN}Building the package...${NC}"
npm run build

# Create a symbolic link
echo -e "${GREEN}Creating npm link...${NC}"
npm link

echo -e "${YELLOW}Setup complete!${NC}"
echo ""
echo -e "To use this package in your project, run:"
echo -e "${GREEN}cd /path/to/your/project${NC}"
echo -e "${GREEN}npm link vite-just-zip${NC}"
echo ""
echo -e "Or add to your package.json:"
echo -e "${GREEN}\"vite-just-zip\": \"file:$(pwd)\"${NC}"
echo ""
echo -e "Then add to your vite.config.js:"
echo -e "${GREEN}import viteJustZip from 'vite-just-zip'${NC}"
echo ""
echo -e "${GREEN}plugins: [${NC}"
echo -e "${GREEN}  // other plugins...${NC}"
echo -e "${GREEN}  viteJustZip({${NC}"
echo -e "${GREEN}    outDir: 'dist',${NC}"
echo -e "${GREEN}    zipPath: './dist', ${NC}"
echo -e "${GREEN}    appCode: 'myapp'${NC}"
echo -e "${GREEN}  })${NC}"
echo -e "${GREEN}]${NC}" 