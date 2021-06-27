import { browser } from 'protractor';
import { LoginPage } from '../../Pages/login.page';
import { StudentPage } from '../../Pages/student.page';


describe('Test listing, seraching and detailing on Student page:', function () {

    let loginPage = new LoginPage();
    let studentListPage = new StudentPage();

    // Sangwin student details
    let Sangwin_first_name: string = 'Sangwin';
    let Sangwin_last_name: string = 'Gawande';
    let Sangwin_email_address: string = 'sangwin@yopmail.com';
    let Sangwin_phone_number: string = '9503733178';

    // numbers
    let full_list_number: number = 5;
    let few_list_number: number = 3;
    let one_list_number: number = 1;

    beforeAll(() => {
        browser.get('/');
        loginPage.logIn();
    });

    afterAll(function () {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    describe('When launch the Student page:', function () {
        it('should launch Student page successfully and show 5 students record now', () => {
            // expect
            expect(studentListPage.getPageStudentListElement().isElementPresent).toBeTruthy();
            expect(studentListPage.getTableStudentList().count == full_list_number);
        });
    });

    describe('When on Student page, user searchs the student by name:', function () {
        it('should show not found if no name match with search key', () => {
            // search student name "abcd"
            studentListPage.setTxtSearch("abcd");

            // expect
            expect(studentListPage.TableStudentListShouldNotPresent());

            // clear searching
            studentListPage.clearTxtSearch();
        });

        it('should show several student if somes match partial search key', () => {
            // search student name "d"
            studentListPage.setTxtSearch("d");

            // expect
            expect(studentListPage.getTableStudentList().count == few_list_number);

            // clear searching
            studentListPage.clearTxtSearch();
        });

        it('should show one if only a student matches search key', () => {
            // search student name "Sangwin"
            studentListPage.setTxtSearch("Sangwin");

            // expect
            expect(studentListPage.getTableStudentList().count == one_list_number);

            // clear searching
            studentListPage.clearTxtSearch();
        });

        it('should go to the student details by clicking on a student row', () => {
            // click on student name Sangwin
            studentListPage.clickRowStudentName(Sangwin_first_name);

            // expect
            expect(studentListPage.getStudentDetailFetchedElement().isElementPresent).toBeTruthy();
        });
    });

    describe('When on Student details page:', function () {
        it('should be able to collect student detail such as first name, last name, address and phone', () => {
            // expect
            expect(studentListPage.getStudentFirstNameDetailElement().innerText == Sangwin_first_name);
            expect(studentListPage.getStudentLastNameDetailElement().innerText == Sangwin_last_name);
            expect(studentListPage.getStudentEmailAddressDetailElement().innerText == Sangwin_email_address);
            expect(studentListPage.getStudentPhoneDetailElement().innerText == Sangwin_phone_number);
        });

        it('should be able to back to previous student list page by Back button', () => {
            // click back on student detail
            studentListPage.clickBackStudentDetail();

            // expect
            expect(studentListPage.getPageStudentListElement().isElementPresent).toBeTruthy();
        });

        it('should be able to go to the student details update page by Edit button', () => {
            // click on student name Sangwin, click on detail
            studentListPage.clickRowStudentName(Sangwin_first_name);
            studentListPage.clickEditStudentDetail();

            // expect
            expect(studentListPage.getStudentDetailUpdateElement().isElementPresent).toBeTruthy();
        });
    });
});