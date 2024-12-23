# [Your Project Name]

[Optional: Badges like build status, code coverage, etc.]

[Your Project Name] is a brief description of your project, which can include its purpose, methods, or other pertinent information.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)

## Getting Started

These instructions will guide you through setting up your development environment.

### Prerequisites

List any prerequisites for your project here, for example:

- Node.js v18.0.0+
- npm v9.0.0+

### Installation

To set up the development environment and install all necessary dependencies and configurations, follow these steps:

1. Clone this repository:

   ```bash
   git clone [your-repo-url]

   ```

2. ## Initial Setup

For setting up the project initially, you'll want to run the setup script embedded within this `README.md`. Here's how:

1. Copy the command below and paste it into your terminal.
2. Execute the command. It will extract the embedded setup script, run it, and then clean up.

if you want to remove the init-setup.sh run this

<!-- prettier-ignore -->
```bash
echo "$(sed -n '/^```setup-start/,/^```setup-end/p' README.md | sed '1d;$d')" > init-setup.sh && chmod +x init-setup.sh && ./init-setup.sh && sed -i '' '/^```setup-start/,/^```setup-end/d' README.md && rm init-setup.sh
```

else

<!-- prettier-ignore -->
```bash
echo "$(sed -n '/^```setup-start/,/^```setup-end/p' README.md | sed '1d;$d')" > init-setup.sh && chmod +x init-setup.sh && ./init-setup.sh && sed -i '' '/^```setup-start/,/^```setup-end/d' README.md
```

## Usage

[Provide instructions on how to use your software or any examples.]

## License

This software is protected under a proprietary license. Any use, redistribution, or modification is prohibited without prior written permission. See [LICENSE.txt](LICENSE.txt) for more details.

## Contact

Boostle tech team
Email: tech@boostle.io
[Other contact details or social media links]

---

© 2023 Boostle. All Rights Reserved.

<!-- prettier-ignore -->
```setup-start


#!/bin/bash

echo "Creating scripts directory and the required scripts..."
mkdir -p scripts

# Create install.sh
cat <<EOL > scripts/install.sh
#!/bin/bash
# Navigate to the root directory of your project
cd "\$(dirname "\$0")/.."
# Remove node_modules and package-lock.json
echo "Cleaning up old node modules and package lock..."
rm -rf node_modules package-lock.json
# Run npm install
echo "Running npm install..."
npm install
# Ensure Husky hooks are set up properly
echo "Setting up Husky hooks..."
npx husky install
npx husky add .husky/pre-commit "npm run precommit"
# npx husky add .husky/pre-push "sh ./scripts/release.sh"
echo "Installation complete!"
EOL

# .gitignore file creation
echo 'node_modules/
.DS_Store
*.log
.env
.env.test
.vscode/
.prettiercache
.eslintcache
.husky/
aws-exports.js
awsconfiguration.json
amplify/
' > .gitignore


# Check if this is a React app or a microservice
IS_REACT_APP=true  # Set this to true if it's a React app


# ESLint configuration
# Install packages based on the type of app
if $IS_REACT_APP; then
  npm install react react-dom
  npm install eslint-plugin-react
  # Set up ESLint configuration for React
  echo '{
    "extends": ["eslint:recommended", "airbnb", "airbnb-base", "plugin:react/recommended", "prettier"],
    "plugins": ["prettier", "react"],
    "parserOptions": {
      "ecmaVersion": 2021,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "env": {
      "browser": true,
      "node": true,
      "es6": true,
      "jest": true
    },
    "rules": {
      "prettier/prettier": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error"
    }
  }' > .eslintrc.json
else
  npm install eslint eslint-config-prettier eslint-plugin-prettier prettier husky lint-staged jest --save-dev
  # Set up ESLint configuration without React
  echo '{
    "extends": ["eslint:recommended", "airbnb-base", "prettier"],
    "plugins": ["prettier"],
    "parserOptions": {
      "ecmaVersion": 2021,
      "sourceType": "module"
    },
    "env": {
      "node": true,
      "es6": true,
      "jest": true
    },
    "rules": {
      "prettier/prettier": "error"
    }
  }' > .eslintrc.json
fi


echo '
  #include test folder for linting later
  test/**/*.test.js
  dist/**/*.js
  public/**/*.js
  views/**/*.js
  tasks/**/*.js
  node_modules/**/*.js
  jsLib/**/*.js
  coverage/**/*.js
  .tmp/**/*.js
  .vscode/**/*.js
  .nyc_output/**/*.js
  build/
  dist/
  *.min.js
' > .eslintignore

# Prettier configuration
echo '{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 120,
  "tabWidth": 2,
  "endOfLine": "lf"
}' > .prettierrc.json

echo '
dist
node_modules/**/*.js
coverage/**/*.js
.vscode/**/*.js
' > .prettierignore


npm install dotenv joi
npm install nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier eslint-plugin-react eslint-config-airbnb husky lint-staged jest --save-dev


npx husky install
echo '{
    "**/*.(js|jsx)": ["npm run format", "npm run validate", "git add"]
}' > .lintstagedrc.json


npx husky add .husky/pre-commit "npm run precommit"

# .env file
echo 'API_KEY=YOUR_API_KEY
API_URL=YOUR_API_URL
OTHER_ENV_VARIABLE=YOUR_VALUE
' > .env

# Creating the LICENSE.txt file with the proprietary license
cat > LICENSE.txt <<EOL
Copyright © 2023, Boostle
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are prohibited without prior written permission from the author.

This software is confidential and proprietary information of the author. Access to and use of this software is restricted to authorized personnel only.

Any unauthorized use of this software is strictly prohibited.

SOFTWARE PROPRIETARY LICENSE AGREEMENT

By accessing, using, downloading, or copying any part of this software, you are agreeing to be bound by the terms of this license. If you do not agree to these terms, do not use, download, or copy the software.

1. **Restrictions**:
   - You shall not sublicense, sell, lease, or otherwise transfer the software without the prior written consent of Boostle.
   - You shall not modify, adapt, or translate the software, or decompile, reverse engineer, disassemble, or otherwise attempt to derive the source code of the software.
   - You shall not use this software for any purpose that is illegal or prohibited by this agreement.

2. **Termination**: Your license to use the software will terminate immediately if you violate any provision of this agreement. Upon termination, you must destroy all copies of the software.

3. **Limitation of Liability & Warranties**:
   - THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
   - IN NO EVENT SHALL Boostle BE LIABLE FOR ANY DAMAGES WHATSOEVER ARISING OUT OF THE USE OF OR INABILITY TO USE THE SOFTWARE.

4. **Jurisdiction & Dispute Resolution**: This license shall be governed by and construed in accordance with the laws of of the United Kingdom. Any disputes arising out of or in connection with this license shall be subject to the exclusive jurisdiction of the courts of the United Kingdom.
The terms of this license will be enforced to the fullest extent permissible under the laws and treaties of other jurisdictions, and the licensor reserves the right to seek legal remedy in the jurisdiction most favorable to enforcing the terms of this license.

If you have questions about this license, please contact legal@boostle.io.
EOL

# Make all scripts executable
chmod +x scripts/*.sh

# if we want to save the init script into the scripts folder
# mv init-setup.sh scripts/
# chmod +x scripts/init-setup.sh

# Clean up README.md after setup
sed -i '' '/^```setup-start/,/^```setup-end/d' README.md

```setup-end

