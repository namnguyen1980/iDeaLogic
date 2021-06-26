import { ExpectedConditions, browser } from 'protractor';
import { LoginPage } from '../../Pages/login.page';


describe('Test Login page:', function () {

  let loginPage = new LoginPage();

  // parameters
  let wrongFormatUsername = "abc";
  let wrongFormatPassword = "123";
  let invalidUsername = "admin123@yopmail.com";
  let invalidPassword = "admin123456";
  let validUsername = "admin@yopmail.com";
  let validPassword = "admin123";

  beforeAll(() => {
    browser.get('/');
  });

  afterAll(function () {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  describe('When launch the page:', function () {
    it('should be able to launch successfully', () => {
      expect(loginPage.getNodeAppRoot().isElementPresent).toBeTruthy();
    });

    it('should be able to see Login box with Login button disabled', () => {
      expect(loginPage.getBoxLogin().isElementPresent).toBeTruthy();
      expect(loginPage.getBtnLogin().getAttribute('disabled')).toEqual('true');;
    });

  });

  describe('When on Login page, user enters username and password with invalid format:', function () {
    it('should show a message to ask user enter valid email and password', () => {

      loginPage.setTxtUsername(wrongFormatUsername);
      loginPage.setTxtPassword(wrongFormatPassword);
      expect(loginPage.getUsernameErrorFormat().getText()).toEqual('Please enter valid email address');
      expect(loginPage.getPasswordeErrorFormat().getText()).toEqual('Password must be at least 6 characters long, and contain a number');
      loginPage.clearTxtUsername();
      loginPage.clearTxtPassword();
    });
  });

  describe('When on Login page, user enters username and password with valid format:', function () {
    it('should NOT show a message to ask user enter valid email and password', () => {
      loginPage.setTxtUsername(validUsername);
      loginPage.setTxtPassword(validPassword);
      expect(loginPage.isEnterValidEmailErrorExisted());
      expect(loginPage.isEnterValidPasswordErrorExisted());
      loginPage.clearTxtUsername();
      loginPage.clearTxtPassword();
    });
  });

  describe('When on Login page, user enters wrong username and/or password:', function () {
    it('should be able to see a message to notify user enter wrong email and password', () => {
      loginPage.setTxtUsername(invalidUsername);
      loginPage.setTxtPassword(invalidPassword);
      loginPage.getBtnLogin().click().then(function () {
        expect(loginPage.getInvalidCredential().isElementPresent).toBeTruthy();
      });
      loginPage.clearTxtUsername();
      loginPage.clearTxtPassword();
    });
  });

  describe('When on Login page, user enters the correct username and password are entered:', function () {
    it('should be able to login successfully and go to Student list page', () => {
      loginPage.logIn();
      expect(loginPage.getSuccessCredential().isElementPresent).toBeTruthy();
    });
  });
});