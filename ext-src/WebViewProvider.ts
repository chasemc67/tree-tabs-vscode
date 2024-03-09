import * as vscode from "vscode";
import * as path from "path";

export class WebViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "treeTabs.webViewProviderView";

  private _view?: vscode.WebviewView;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _extensionPath: string
  ) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getReactForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "tabSelected":
          // possible commands to open the file
          let uri = vscode.Uri.file(message.fileName);
          let success = await vscode.commands.executeCommand(
            "vscode.open",
            uri
          );
      }
    });
  }

  public getWebView() {
    return this._view;
  }

  public postMessage(message: any) {
    if (!this._view) {
      console.log("========= no current view");
    }

    this._view?.webview.postMessage(message);
  }

  private _getReactForWebview(webview: vscode.Webview) {
    const manifest = require(path.join(
      this._extensionPath,
      "build",
      "asset-manifest.json"
    ));
    const mainScript = manifest["main.js"];
    const mainStyle = manifest["main.css"];

    // Transform the local file paths to webview URI paths
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "build", mainScript));
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "build", mainStyle));

    // const scriptPathOnDisk = vscode.Uri.file(
    //   path.join(this._extensionPath, "build", mainScript)
    // );
    // const scriptUri = scriptPathOnDisk.with({ scheme: "vscode-resource" });
    // const stylePathOnDisk = vscode.Uri.file(
    //   path.join(this._extensionPath, "build", mainStyle)
    // );
    // const styleUri = stylePathOnDisk.with({ scheme: "vscode-resource" });

    // Use a nonce to whitelist which scripts can be run
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>React App</title>
				<link rel="stylesheet" type="text/css" href="${styleUri}">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
				<base href="${webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "build"))}/">
			</head>

			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root"></div>
				
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  }
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
