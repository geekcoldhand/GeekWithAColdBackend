import Base from "./Base";

export default class UnknownState extends Base {
  constructor(agiCallback) {
    super();
    this.callAGI = agiCallback;
  }

  async handleUserInput(input) {
    try {
      // TODO: Call HuggingFace AGI model
      const agiResponse = await this.callAGI(input);
      return {
        response: agiResponse,
        nextState: 'faq'
      };
    } catch (error) {
      return {
        response: `AGI Error: ${error.message}`,
        nextState: 'faq'
      };
    }
  }
}