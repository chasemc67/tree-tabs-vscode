export class VSCodeApiGetter {
  private static instance: VSCodeApiGetter;
  private vscodeApi: any;

  private constructor() {
    // @ts-ignore
    this.vscodeApi = acquireVsCodeApi();
  }

  public static getVsCodeApi(): any {
    if (!this.instance) {
      this.instance = new VSCodeApiGetter();
    }

    return this.instance.vscodeApi;
  }
}
