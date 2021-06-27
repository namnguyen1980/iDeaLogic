import { ElementFinder } from 'protractor';
import { BasePage } from './base.page';

export class StudentPage extends BasePage {
    // List Elements
    private navSideBar: string;
    private pageStudentList: string;
    private tableStudentList: string;
    private txtBoxSearch: string;
    private studentDetailFetched: string;
    private txtStudentFirstNameDetail: string;
    private txtStudentLastNameDetail: string;
    private txtStudentAddressDetail: string;
    private txtStudentPhoneDetail: string;
    private btnBackStudentDetail: string;
    private btnEditStudentDetail: string;
    private formStudentUpdate: string;
    private rowStudentName: string;

    private btnStudentDetailUpdate: string;
    private btnStudentUpdateBack: string;
    private studentEmailAlreadyInUse: string;
    private studentSuccessfullyUpdated: string;

    // CRUD elemets
    private btnAddNewUser: string;
    private pageStudentRegistration: string;
    private btnRegister: string;
    private toastStudentSuccessfullyAdded: string;

    private txtStudentFirstName: string;
    private txtStudentLastName: string;
    private txtStudentEmail: string;
    private txtStudentPhone: string;
    private txtInvalidStudentFirstNameWarning: string;
    private txtInvalidStudentLastNameWarning: string;
    private txtInvalidStudentEmailWarning: string;
    private txtInvalidStudentPhoneWarning: string;
    private btnStudentUpdate: string;
    private btnStudentDelete: string;

    // LogOut
    private linkLogOut: string;

    // Declare Elements
    constructor() {
        super();

        // common elements
        this.navSideBar = '#mySidebar';
        this.pageStudentList = 'div[class="w3-container"]';
        this.tableStudentList = '.w3-table.w3-striped.w3-bordered tr';
        this.txtBoxSearch = 'input[type="text"]';
        this.studentDetailFetched = 'div[aria-label="Student Details Fetched"]';
        this.studentEmailAlreadyInUse = 'div[aria-label="Email Address Already In Use"]';
        this.studentSuccessfullyUpdated = 'div[aria-label="Student Successfully Updated"]';
        this.btnStudentUpdateBack = '//a[normalize-space()="Back"]';
        this.btnBackStudentDetail = '//button[normalize-space()="Back"]';
        this.btnEditStudentDetail = '//button[text() = " Edit"]';
        this.formStudentUpdate = '//form[@ng-reflect-form="[object Object]"]';

        // using Xpath to allow to click on any student with name
        this.rowStudentName = '//td[normalize-space()="{0}"]';

        // student detail elements
        this.txtStudentFirstNameDetail = 'tbody tr:nth-child(1) td:nth-child(2) b:nth-child(1)';
        this.txtStudentLastNameDetail = 'tbody tr:nth-child(2) td:nth-child(2) b:nth-child(1)';
        this.txtStudentAddressDetail = 'tbody tr:nth-child(3) td:nth-child(2) b:nth-child(1)';
        this.txtStudentPhoneDetail = 'tbody tr:nth-child(4) td:nth-child(2) b:nth-child(1)';

        // student CRUD elements
        this.btnAddNewUser = '//button[normalize-space()="Add New Student"]';
        this.pageStudentRegistration = '//span[normalize-space()="Student Registration"]';
        this.txtStudentFirstName = 'input[formcontrolname="first_name"]';
        this.txtStudentLastName = 'input[formcontrolname="last_name"]';
        this.txtStudentEmail = 'input[formcontrolname="email"]';
        this.txtStudentPhone = 'input[type="number"]';
        this.txtInvalidStudentFirstNameWarning = '//div[text() = "Please enter 3 to 50 characters"]';
        this.txtInvalidStudentLastNameWarning = '//div[text() = "Please enter 3 to 50 characters "]';
        this.txtInvalidStudentEmailWarning = '//div[text() = "Please enter valid email address"]';
        this.txtInvalidStudentPhoneWarning = '//div[text() = "Please enter valid phone number"]';
        this.btnRegister = '//button[@type="submit"]';
        this.toastStudentSuccessfullyAdded = 'div[aria-label="Student Successfully Added"]';
        this.btnStudentUpdate = '//td[normalize-space()="{0}"]/../td/button[normalize-space()="Update"]';
        this.btnStudentDelete = '//td[normalize-space()="{0}"]/../td/button[normalize-space()="Delete"]';
        this.btnStudentDetailUpdate = '//button[@type="submit"]';

        // logout element
        this.linkLogOut = '//a[normalize-space()="Logout"]';

    }

    // Common Functions
    // returns sidebar element
    getNavSideBarElement(): ElementFinder {
        return this.getElementByCss(this.navSideBar);
    }

    // returns app root element
    getPageStudentListElement(): ElementFinder {
        return this.getElementByCss(this.pageStudentList);
    }

    // returns table student element
    getTableStudentList() {
        return this.getElementByCss(this.tableStudentList);
    }

    // sends keys to search entry box
    setTxtSearch(searchKey: string) {
        this.inputTextElement(this.txtBoxSearch, searchKey);
    }

    // clears search box
    clearTxtSearch() {
        this.clearTextElement(this.txtBoxSearch);
    }

    // checks if student list table is gone
    TableStudentListShouldNotPresent() {
        this.ElementByCssShouldNotPresent(this.tableStudentList);
    }

    // clicks on student record by student name
    clickRowStudentName(studentName: string) {
        this.clickOnElementByCustomXpath(this.rowStudentName, studentName);
    }

    // gets specific student by name
    getStudentNameOnStudentList(studentName: string): ElementFinder {
        return this.getElementByCustomXpath(this.rowStudentName, studentName);
    }

    // is specific student by name existed
    StudentNameOnStudentListShouldNotPresent(studentName: string) {
        return this.ElementByCustomXpathShouldNotPresent(this.rowStudentName, studentName);
    }

    // list functions
    // returns panel student detail
    getStudentDetailFetchedElement(): ElementFinder {
        return this.getElementByCss(this.studentDetailFetched);
    }

    // returns first name student detail
    getStudentFirstNameDetailElement(): ElementFinder {
        return this.getElementByCss(this.txtStudentFirstNameDetail);
    }

    // returns last name student detail
    getStudentLastNameDetailElement(): ElementFinder {
        return this.getElementByCss(this.txtStudentLastNameDetail);
    }

    // returns email address student detail
    getStudentEmailAddressDetailElement(): ElementFinder {
        return this.getElementByCss(this.txtStudentAddressDetail);
    }

    // returns phone student detail
    getStudentPhoneDetailElement(): ElementFinder {
        return this.getElementByCss(this.txtStudentPhoneDetail);
    }

    // clicks back on student detail
    clickBackStudentDetail() {
        this.clickOnElementByXpath(this.btnBackStudentDetail);
    }

    // clicks edit on student detail
    clickEditStudentDetail() {
        this.clickOnElementByXpath(this.btnEditStudentDetail);
    }

    // returns student detail update
    getStudentDetailUpdateElement(): ElementFinder {
        return this.getElementByXpath(this.formStudentUpdate);
    }

    // clicks update on student update
    clickUpdateStudentDetail() {
        this.clickOnElementByXpath(this.btnStudentDetailUpdate);
    }

    // clicks update on student update
    clickBackStudentUpdate() {
        this.clickOnElementByXpath(this.btnStudentUpdateBack);
    }

    // returns Update button for detail
    getButtonUpdateStudentElement(): ElementFinder {
        return this.getElementByXpath(this.btnStudentDetailUpdate);
    }

    // returns toast student email address already in use
    getStudentEmailAlreadyInUseElement(): ElementFinder {
        return this.getElementByCss(this.studentEmailAlreadyInUse);
    }

    // returns toast student successfully updated
    getStudentSuccessfullyUpdatedElement(): ElementFinder {
        return this.getElementByCss(this.studentSuccessfullyUpdated);
    }

    // CRUD functions
    // click Add new student
    clickAddNewUser() {
        this.clickOnElementByXpath(this.btnAddNewUser);
    }

    // returns Student Registration element
    getStudentRegistrationPage(): ElementFinder {
        return this.getElementByXpath(this.pageStudentRegistration);
    }

    // sends keys to Student first name entry box
    setStudentFirstName(name: string) {
        this.inputTextElement(this.txtStudentFirstName, name);
    }

    // clears Student first name
    clearStudentFirstName() {
        this.clearTextElement(this.txtStudentFirstName);
    }

    // sends keys to Student last name entry box
    setStudentLastName(name: string) {
        this.inputTextElement(this.txtStudentLastName, name)
    }

    // clears Student last name
    clearStudentLastName() {
        this.clearTextElement(this.txtStudentLastName);
    }

    // sends keys to email entry box
    setStudentEmail(name: string) {
        this.inputTextElement(this.txtStudentEmail, name)
    }

    // clears Student email
    clearStudentEmail() {
        this.clearTextElement(this.txtStudentEmail);
    }

    // sends keys to phone entry box
    setStudentPhone(name: string) {
        this.inputTextElement(this.txtStudentPhone, name)
    }

    // clears Student phone
    clearStudentPhone() {
        this.clearTextElement(this.txtStudentPhone);
    }

    // clicks on Register button
    clickRegisterButton() {
        this.clickOnElementByXpath(this.btnRegister);
    }

    // returns Register button element
    getRegisterButtonElement(): ElementFinder {
        return this.getElementByXpath(this.btnRegister);
    }

    // returns Student fist name warning element
    getInvalidStudentFirstNameWarningElement(): ElementFinder {
        return this.getElementByXpath(this.txtInvalidStudentFirstNameWarning);
    }

    // Student fist name warning element should be gone
    InvalidStudentFirstNameWarningNotPresent() {
        return this.ElementByXpathShouldNotPresent(this.txtInvalidStudentFirstNameWarning);
    }

    // returns Student fist name warning element
    getInvalidStudentLastNameWarningElement(): ElementFinder {
        return this.getElementByXpath(this.txtInvalidStudentLastNameWarning);
    }

    // Student last name warning element should be gone
    InvalidStudentLastNameWarningShouldNotPresent() {
        return this.ElementByXpathShouldNotPresent(this.txtInvalidStudentLastNameWarning);
    }

    // returns Student email warning element
    getInvalidStudentEmailWarningElement(): ElementFinder {
        return this.getElementByXpath(this.txtInvalidStudentEmailWarning);
    }

    // Student email warning element should be gone
    InvalidStudentEmailWarningShouldNotPresent() {
        return this.ElementByXpathShouldNotPresent(this.txtInvalidStudentEmailWarning);
    }

    // returns Student phone warning element
    getInvalidStudentPhoneWarningElement(): ElementFinder {
        return this.getElementByXpath(this.txtInvalidStudentPhoneWarning);
    }

    // Student phone warning element should be gone
    InvalidStudentPhoneWarningShouldNotPresent() {
        return this.ElementByXpathShouldNotPresent(this.txtInvalidStudentPhoneWarning);
    }

    // returns toast student successfully added
    getStudentSuccessfullyAddedElement(): ElementFinder {
        return this.getElementByCss(this.toastStudentSuccessfullyAdded);
    }

    // wait for toast removed
    WaitToastStudentSuccessfullyAddedNotPresent(){
        this.WaitForElementRemoved(this.toastStudentSuccessfullyAdded);
    }

    // clicks on Update by student name
    clickUpdateStudentByName(name: string) {
        this.clickOnElementByCustomXpath(this.btnStudentUpdate, name);
    }

    // clicks on Delete by student name
    clickDeleteStudentByName(name: string) {
        this.clickOnElementByCustomXpath(this.btnStudentDelete, name);
    }

    // Logout Functions
    // clicks on Logout link
    clickLogOutlink(){
        this.clickOnElementByXpath(this.linkLogOut);
    }
}