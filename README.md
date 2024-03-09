## -- Work in Progress --

# Tree Tabs VSCode

Tree Tabs is a VSCode extension which provides a Tree-based layout mananger for open tabs.

A linear-based tab layout (just a big list of tabs) becomes messy and unuseable once you have more than a few tabs open.

Often I'm working in a file which is several logical "components" deep, trying to keep the child/parent caller/callee chains straight in my head

With tree tabs, you can easily give child/parent/sibling relationships to tabs. This makes it much easier to quickly jump between multiple open files which call/render eachother while working in complex codebases.

# VSCode Webview React

This project was bootstrapped with

- [Create React App](https://github.com/facebookincubator/create-react-app)
- [Create React App TypeScript](https://github.com/wmonk/create-react-app-typescript)
- [VSCode Extension Webview Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/webview-sample)

[The webview API](https://code.visualstudio.com/docs/extensions/webview) allows extensions to create customizable views within VSCode. Single Page Application frameworks are perfect fit for this use case. However, to make modern JavaScript frameworks/toolchains appeal to VSCode webview API's [security best practices](https://code.visualstudio.com/docs/extensions/webview#_security) requires some knowledge of both the bundling framework you are using and how VSCode secures webview. This project aims to provide an out-of-box starter kit for Create React App and TypeScript in VSCode's webview.

## Development

Run following commands in the terminal

```shell
// must use npm
// for some reason installing dependencies with Yarn can cause type issues.
// see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20350
npm install
npm run build
```

And then press F5, in Extension Development Host session, run `Tree Tabs Webview` command from command palette.

## Packaging and Shipping
`npm install -g vsce` if you dont have it 
`vsce package` to create a .vsix file
Open VSCode
Go to Extensions view (cmd+shift+X)
Install from VSIX 
choose your VSIX

## Debugging

To see console.log outputs from the webview, in the VSCode test instance click `help -> toggle developer tools`

## Under the hood

Things we did on top of Create React App TypeScript template

- We inline `index.html` content in `ext-src/extension.ts` when creating the webview
- We set strict security policy for accessing resources in the webview.
  - Only resources in `/build` can be accessed
  - Onlu resources whose scheme is `vscode-resource` can be accessed.
- For all resources we are going to use in the webview, we change their schemes to `vscode-resource`
- Since we only allow local resources, absolute path for styles/images (e.g., `/static/media/logo.svg`) will not work. We add a `.env` file which sets `PUBLIC_URL` to `./` and after bundling, resource urls will be relative.
- We add baseUrl `<base href="${vscode.Uri.file(path.join(this._extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">` and then all relative paths work.

## Limitations

Right now you can only run production bits (`yarn run build`) in the webview, how to make dev bits work (webpack dev server) is still unknown yet. Suggestions and PRs welcome !
