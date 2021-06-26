import { ElementFinder} from 'protractor';
import { BasePage } from './base.page';

export class LoginPage extends BasePage{
  // Elements
  private nodeAppRoot: string;
  private boxLogin: string;
  private txtUsername: string;
  private txtPassword: string;
  private btnLogin: string;
  private usernameErrorFormat: string;
  private passwordErrorFormat: string;
  private invalidCredential: string;
  private successCredential: string;
  private defaultUsername: string;
  private defaultPassword: string;

  // Declare Elements
  constructor() {
    super();
    // Elements
    this.nodeAppRoot = '[ng-version]';
    this.boxLogin = '.w3-container.align-center.w3-card.login-card';
    this.txtUsername = 'input[type="email"]';
    this.txtPassword = 'input[type="password"]';
    this.btnLogin = 'button[type="submit"]';

    // error prompt elements
    this.usernameErrorFormat = 'body > app-root:nth-child(1) > app-login:nth-child(2) > div:nth-child(1) > form:nth-child(1) > div:nth-child(4)';
    this.passwordErrorFormat = 'body > app-root:nth-child(1) > app-login:nth-child(2) > div:nth-child(1) > form:nth-child(1) > div:nth-child(7)';
    this.invalidCredential = '.toast-error.toast.ng-trigger.ng-trigger-flyInOut';
    this.successCredential = '.toast-success.toast.ng-trigger.ng-trigger-flyInOut'

    // default account
    this.defaultUsername = "admin@yopmail.com";
    this.defaultPassword = "admin123";
  }

  // Functions
  // returns app root element
  getNodeAppRoot(): ElementFinder {
    return this.getElementByCss(this.nodeAppRoot);
  }

  // returns login box element
  getBoxLogin(): ElementFinder {
    return this.getElementByCss(this.boxLogin);
  }

  // returns username element
  getTxtUsername(): ElementFinder {
    return this.getElementByCss(this.txtUsername);
  }

  // sends keys to username/email entry box
  setTxtUsername(username: string) {
    this.inputTextElement(this.txtUsername, username);
  }

  // clears username text
  clearTxtUsername(){
    this.clearTextElement(this.txtUsername);
  }

  // returns password element
  getTxtPassword(): ElementFinder {
    return this.getElementByCss(this.txtPassword);
  }

  // sends keys to password entry box
  setTxtPassword(password: string) {
    this.inputTextElement(this.txtPassword, password)
  }

  // clears password text
  clearTxtPassword(){
    this.clearTextElement(this.txtPassword);
  }

  // clicks on login button
  clickBtnLogin() {
    this.getElementByCss(this.btnLogin).click();
  }

  // returns login button element
  getBtnLogin(): ElementFinder {
    return this.getElementByCss(this.btnLogin);
  }

  // returns email error format element
  getUsernameErrorFormat(): ElementFinder {
    return this.getElementByCss(this.usernameErrorFormat);
  }

  // returns password error format element
  getPasswordeErrorFormat(): ElementFinder {
    return this.getElementByCss(this.passwordErrorFormat);
  }

  // returns invalid credential element
  getInvalidCredential(): ElementFinder {
    return this.getElementByCss(this.invalidCredential);
  }

  // returns invalid credential element
  getSuccessCredential(): ElementFinder {
    return this.getElementByCss(this.successCredential);
  }

  // login built-in
  logIn() {
    this.setTxtUsername(this.defaultUsername);
    this.setTxtPassword(this.defaultPassword);
    this.clickBtnLogin();
  }

  // Email warning element should be gone
  isEnterValidEmailErrorExisted() {
    this.isElementExistedByCss(this.usernameErrorFormat);
  }

  // Password warning element should be gone
  isEnterValidPasswordErrorExisted() {
    this.isElementExistedByCss(this.passwordErrorFormat);
  }
}