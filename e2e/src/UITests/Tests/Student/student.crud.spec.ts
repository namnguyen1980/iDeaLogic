import { browser } from 'protractor';
import { LoginPage } from '../../Pages/login.page';
import { StudentPage } from '../../Pages/student.page';


describe('Test CRUD on Student page:', function () {

    let loginPage = new LoginPage();
    let studentPage = new StudentPage();

    // add student details
    let add_first_name: string = 'firstname';
    let add_last_name: string = 'lastname';
    let add_email_address: string = 'email@domain.com';
    let add_phone_number: string = '9595123456';

    // update
    let update_first_name: string = 'updatefirstname';
    let update_last_name: string = 'updatelastname';
    let update_email_address: string = 'updateemail@domain.com';
    let update_phone_number: string = '9595456789';

    // error message
    let first_last_name_warning: string = 'Please enter 3 to 50 characters';
    let email_address_warning: string = 'Please enter valid email address';
    let phone_number_warning: string = 'Please enter valid phone number';

    // number of students
    let original_number: number;

    beforeAll(() => {
        browser.get('/');
        loginPage.logIn();
        expect(loginPage.getSuccessCredential().isElementPresent).toBeTruthy();
    });

    afterAll(function () {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    describe('When on Student list page, user clicks on add new user:', function () {
        it('should be able to see Add new user page and Register button is unclickable', () => {
            // expect when launch student page and count number students on table
            expect(studentPage.getNavSideBarElement().isElementPresent).toBeTruthy();
            expect(studentPage.getTableStudentList().isElementPresent).toBeTruthy();
            original_number = studentPage.getTableStudentList().count;

            // click on Add New User
            expect(studentPage.clickAddNewUser());

            // expect
            expect(studentPage.getStudentRegistrationPage().isElementPresent).toBeTruthy();
            expect(studentPage.getRegisterButtonElement().toBeDisabled);
        });

        describe('When on Add new user page, user enters values for fields:', function () {
            it('should be able to see error messages for invalid value fields and Register button is unclickable', () => {
                // input invalid value for first name
                studentPage.setStudentFirstName("a");

                // input invalid value for last name
                studentPage.setStudentLastName("a");

                // input invalid value for email
                studentPage.setStudentEmail("a");

                // update onvalid for phone
                studentPage.setStudentPhone("e");

                // expect
                expect(studentPage.getInvalidStudentFirstNameWarningElement().getText()).toContain(first_last_name_warning);
                expect(studentPage.getInvalidStudentLastNameWarningElement().getText()).toContain(first_last_name_warning);
                expect(studentPage.getInvalidStudentEmailWarningElement().getText()).toContain(email_address_warning);
                expect(studentPage.getInvalidStudentPhoneWarningElement().getText()).toContain(phone_number_warning);
                expect(studentPage.getRegisterButtonElement().toBeDisabled);
            });

            it('should be able to clear error messages for valid fields and Register button is clickable', () => {
                // input valid value for first name
                studentPage.clearStudentFirstName();
                studentPage.setStudentFirstName(add_first_name);

                // input valid value for last name
                studentPage.clearStudentLastName();
                studentPage.setStudentLastName(add_last_name);

                // input valid value for email
                studentPage.clearStudentEmail;
                studentPage.setStudentEmail(add_email_address);

                // update valid for phone
                studentPage.clearStudentPhone();
                studentPage.setStudentPhone(add_phone_number);

                // expect
                expect(studentPage.InvalidStudentFirstNameWarningNotPresent());
                expect(studentPage.InvalidStudentLastNameWarningShouldNotPresent());
                expect(studentPage.InvalidStudentEmailWarningShouldNotPresent());
                expect(studentPage.InvalidStudentPhoneWarningShouldNotPresent());
                expect(studentPage.getRegisterButtonElement().toBeEnabled);
            });
        });

        describe('When on Add New User page, user enters all valid fields and click Register:', function () {
            it('should be able to add the student detail then back Student list page', () => {
                // click on Add New User
                studentPage.clickRegisterButton();

                // expect
                expect(studentPage.getStudentSuccessfullyAddedElement().isElementPresent).toBeTruthy();
                expect(studentPage.getPageStudentListElement().isElementPresent).toBeTruthy();
            });

            it('should be able see added user on Student list page', () => {
                // expect
                expect(studentPage.getTableStudentList().count == original_number + 1);
                expect(studentPage.getStudentNameOnStudentList(add_first_name).isElementPresent).toBeTruthy();
            });

        });
    });

    describe('When on Student list page, user clicks on existing user:', function () {
        it('should be able to see Student update page and Update button is unclickable', () => {
            // expect
            expect(studentPage.clickUpdateStudentByName(add_first_name));
            expect(studentPage.getStudentDetailUpdateElement().isElementPresent).toBeTruthy();
        });

        describe('When on Student update page, user enters invalid values:', function () {
            it('should be able to see error messages for email already in use', () => {
                // a lot of toasts make the Update button sometimes failed to click
                // so it's better as we step a while to wait last toast removed from DOM
                studentPage.WaitToastStudentSuccessfullyAddedNotPresent();

                // click Update button
                studentPage.clickUpdateStudentDetail();

                // expect
                expect(studentPage.getStudentEmailAlreadyInUseElement().isElementPresent).toBeTruthy();
            });

            it('should be able to see error messages for all fields and update button is unclickable', () => {
                // update first name with invalid value
                studentPage.clearStudentFirstName();
                studentPage.setStudentFirstName("a");

                // update last name with invalid value
                studentPage.clearStudentLastName();
                studentPage.setStudentLastName("a");

                // update email with invalid value
                studentPage.clearStudentEmail();
                studentPage.setStudentEmail("a");

                // update phone with invalid value
                studentPage.clearStudentPhone();
                studentPage.setStudentPhone("e");

                // expect
                expect(studentPage.getInvalidStudentFirstNameWarningElement().getText()).toContain(first_last_name_warning);
                expect(studentPage.getInvalidStudentLastNameWarningElement().getText()).toContain(first_last_name_warning);
                expect(studentPage.getInvalidStudentEmailWarningElement().getText()).toContain(email_address_warning);
                expect(studentPage.getInvalidStudentPhoneWarningElement().getText()).toContain(phone_number_warning);
                expect(studentPage.getButtonUpdateStudentElement().toBeDisabled);
            });

            it('should not update the existing user', () => {
                // click Back button
                studentPage.clickBackStudentUpdate();

                // expect
                expect(studentPage.getPageStudentListElement().isElementPresent).toBeTruthy();
                expect(studentPage.getTableStudentList().count == original_number + 1);
                expect(studentPage.getStudentNameOnStudentList(add_first_name).isElementPresent).toBeTruthy();
            });
        });


        describe('When on Student update page, user update an existing user:', function () {
            it('should be able to update the student detail then back Student list page', () => {
                expect(studentPage.clickUpdateStudentByName(add_first_name));
                expect(studentPage.getStudentDetailUpdateElement().isElementPresent).toBeTruthy();

                // update first name
                studentPage.clearStudentFirstName();
                studentPage.setStudentFirstName(update_first_name);
                // update last name
                studentPage.clearStudentLastName();
                studentPage.setStudentLastName(update_last_name);
                // update email
                studentPage.clearStudentEmail();
                studentPage.setStudentEmail(update_email_address);
                // update phone
                studentPage.clearStudentPhone();
                studentPage.setStudentPhone(update_phone_number);

                // ecpext
                studentPage.clickUpdateStudentDetail();
                expect(studentPage.getStudentSuccessfullyUpdatedElement().isElementPresent).toBeTruthy();
                expect(studentPage.getPageStudentListElement().isElementPresent).toBeTruthy();
                expect(studentPage.getTableStudentList().count == original_number + 1);
            });

            it('should be able see updated user, no new and previous user added to table', () => {
                // expect
                expect(studentPage.getTableStudentList().count == original_number + 1);
                expect(studentPage.getStudentNameOnStudentList(update_first_name).isElementPresent).toBeTruthy();
                expect(studentPage.StudentNameOnStudentListShouldNotPresent(add_first_name));
            });
        });
    });

    describe('When on Student list page, user clicks on delete existing user:', function () {
        it('should be able to cancel deleting and user is still presented on Student list table', () => {
            // delete an user
            expect(studentPage.clickDeleteStudentByName(update_first_name));

            // click on cancel
            var alertDialog = browser.switchTo().alert();
            alertDialog.dismiss(); // Use to simulate cancel button

            // expect
            expect(studentPage.getPageStudentListElement().isElementPresent).toBeTruthy();
            expect(studentPage.getTableStudentList().count == original_number + 1);
            expect(studentPage.getStudentNameOnStudentList(update_first_name).isElementPresent).toBeTruthy();

        });

        it('should be able to delete and user is removed on Student list table', () => {
            // delete an user
            expect(studentPage.clickDeleteStudentByName(update_first_name));

            // click on OK
            var alertDialog = browser.switchTo().alert();
            alertDialog.accept();

            // expect
            expect(studentPage.getPageStudentListElement().isElementPresent).toBeTruthy();
            expect(studentPage.getTableStudentList().count == original_number);
            expect(studentPage.StudentNameOnStudentListShouldNotPresent(update_first_name));
        });
    });
});
