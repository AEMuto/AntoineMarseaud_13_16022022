<img src="src/assets/logo.svg" alt="drawing" width="200" align='right'/>

# argentbank-frontend
![GitHub package.json version](https://img.shields.io/github/package-json/v/AEMuto/AntoineMarseaud_13_16022022?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/AEMuto/AntoineMarseaud_13_16022022?style=flat-square)
![node](https://img.shields.io/badge/node-%3E%3D16.13.1-lightgrey?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/AEMuto/AntoineMarseaud_13_16022022?style=flat-square)

### About
This project contains the frontend code for the online app of ARGENTBANK,
a relatively new bank that wants to establish its place as a serious actor in its sector.

>Prod dependencies
> 
>![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/react?style=flat-square)
>![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/react-router-dom?style=flat-square)
>![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/redux?style=flat-square)
>![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/react-redux?style=flat-square)
>![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/@reduxjs/toolkit?label=redux-toolkit&style=flat-square)
>![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/axios?style=flat-square)
>![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/styled-components?style=flat-square)
>![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/@fortawesome/fontawesome-svg-core?label=fontawesome-svg-core&style=flat-square)
>![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/@fortawesome/free-solid-svg-icons?label=free-solid-svg-icons&style=flat-square)
>![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/@fortawesome/react-fontawesome?label=react-fontawesome&style=flat-square)

>Dev dependencies
> 
>![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/dev/typescript?style=flat-square)
>![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/dev/@types/react?style=flat-square)
>![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/dev/@types/react-dom?style=flat-square)
>![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/dev/@types/react-fontawesome?style=flat-square)
>![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/dev/@types/styled-components?style=flat-square)
>![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/dev/vite?style=flat-square)
>![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/dev/@vitejs/plugin-react?style=flat-square)
>![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/dev/vite-plugin-svgr?style=flat-square)
>![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/dev/vite-preset-react?style=flat-square)
>![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/dev/vite-tsconfig-paths?style=flat-square)
>![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/AEMuto/AntoineMarseaud_13_16022022/dev/prettier?style=flat-square)


### How to use

First, fork and clone [the API](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API/tree/master/designs), and read its documentation in case you need help for how to install and run it.

Then, fork and clone this repository. Name it as you wish. In order to run it, follow the next instructions (I assume you have a github account and know how to use [nvm](https://github.com/nvm-sh/nvm)).

>*Detailed steps* 
>
>Enter the following command in your terminal of choice:
>
>`git clone https://github.com/[your-username]/[name-of-your-repo]`
>
>`cd [name-of-your-repo]`
>
>`nvm install 16.13.1`
>
>`nvm use 16.13.1`
>
>`npm i`
>
>`npm run dev`

If you have followed each steps correctly, you should be able to access the dev server on `http://localhost:3000/
`.

For building the project simply run:

`npm run build`

### Current state

**The app is in its phase 1**, meaning the user's authentication is in place. Each client existing in the database can log in.
Furthermore, they can access their profile page, which is filled with their different accounts information. 
>_The data displayed is a placeholder. Work on the API is needed to add the client's accounts data._

**For phase 2 - _the transactions_ -** you can find a proposition modelling the API endpoints we should need, in the `swagger.yaml` present at the project root.
