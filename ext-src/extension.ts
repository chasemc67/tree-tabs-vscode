import * as path from "path";
import * as vscode from "vscode";
import { WebViewProvider } from "./WebViewProvider";

export function activate(context: vscode.ExtensionContext) {
  const provider = new WebViewProvider(
    context.extensionUri,
    context.extensionPath
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      WebViewProvider.viewType,
      provider,
      // TODO replace this with the setState/getState https://code.visualstudio.com/api/extension-guides/webview#persistence
      { webviewOptions: { retainContextWhenHidden: true } }
    )
  );

  function sendAddTabMessage(command: string) {
    let fileName = vscode.window.activeTextEditor?.document?.fileName;
    // let fileName = file?.fileName;
    let lineNumber = vscode.window.activeTextEditor?.selection?.start.line;

    // let lineNumber = selection?.start.line;
    provider.postMessage({
      command,
      fileName,
      lineNumber,
    });
  }

  context.subscriptions.push(
    vscode.commands.registerCommand("treetabs-vscode.start", () => {
      // TreeTabsPanel.createOrShow(context.extensionPath);
      console.log("======= treetabs-vscode start was called");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("treetabs-vscode.addChild", () => {
      sendAddTabMessage("addChild");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("treetabs-vscode.addSibling", () => {
      sendAddTabMessage("addSibling");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("treetabs-vscode.addParent", () => {
      sendAddTabMessage("addParent");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("treetabs-vscode.addTab", (args) => {
      sendAddTabMessage("addTab");
    })
  );
}
