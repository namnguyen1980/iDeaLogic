import { browser } from 'protractor';
import { LoginPage } from '../../Pages/login.page';
import { StudentPage } from '../../Pages/student.page';


describe('Test Login page:', function () {

  let loginPage = new LoginPage();
  let studentPage = new StudentPage();

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
      // expect
      expect(loginPage.getNodeAppRoot().isElementPresent).toBeTruthy();
    });

    it('should be able to see Login box with Login button disabled', () => {
      // expect
      expect(loginPage.getBoxLogin().isElementPresent).toBeTruthy();
      expect(loginPage.getBtnLogin().getAttribute('disabled')).toEqual('true');;
    });
  });

  describe('When on Login page, user enters username and password with invalid format:', function () {
    it('should show a message to ask user enter valid email and password', () => {
      // login with wrong format for username and password
      loginPage.setTxtUsername(wrongFormatUsername);
      loginPage.setTxtPassword(wrongFormatPassword);

      // expect
      expect(loginPage.getUsernameErrorFormat().getText()).toEqual('Please enter valid email address');
      expect(loginPage.getPasswordeErrorFormat().getText()).toEqual('Password must be at least 6 characters long, and contain a number');
    });
  });

  describe('When on Login page, user enters username and password with valid format:', function () {
    it('should NOT show a message to ask user enter valid email and password', () => {
      // clear previous inputs
      loginPage.clearTxtUsername();
      loginPage.clearTxtPassword();

      // login with valid username and password
      loginPage.setTxtUsername(validUsername);
      loginPage.setTxtPassword(validPassword);

      // expect
      expect(loginPage.EnterValidEmailErrorShouldNotPresent());
      expect(loginPage.EnterValidPasswordErrorShouldNotPresent());
    });
  });

  describe('When on Login page, user enters wrong username and/or password:', function () {
    it('should be able to see a message to notify user enter wrong email and password', () => {
      // clear previous inputs
      loginPage.clearTxtUsername();
      loginPage.clearTxtPassword();

      // login with invalid username and password
      loginPage.setTxtUsername(invalidUsername);
      loginPage.setTxtPassword(invalidPassword);

      // expect
      loginPage.getBtnLogin().click().then(function () {
        expect(loginPage.getInvalidCredential().isElementPresent).toBeTruthy();
      });
    });
  });

  describe('When on Login page, user enters the correct username and password are entered:', function () {
    it('should be able to login successfully and go to Student list page', () => {
      // clear previous inputs
      loginPage.clearTxtUsername();
      loginPage.clearTxtPassword();

      // login
      loginPage.logIn();

      // expect
      expect(loginPage.getSuccessCredential().isElementPresent).toBeTruthy();
    });
  });

  describe('When on Student page, user clicks on Logout link:', function () {
    it('should be able to logout successfully and go to Login page', () => {
      // logout
      studentPage.clickLogOutlink();

      // expect
      expect(loginPage.getBoxLogin().isElementPresent).toBeTruthy();
      expect(loginPage.getSuccessCredential().isElementPresent).toBeTruthy();
    });
  });
});