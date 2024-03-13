import Page from './page';

const emailInput: string = '#login_email';
const passwordInput: string = '#login_password';
const loginButton: string = 'button[class*="Login_loginFormButton"]';

class LoginPage extends Page {

    login(email: string, password: string) {
        super.type(emailInput, email);
        super.type(passwordInput, password);
        super.clickElement(loginButton);
    }
}

export const loginPage = new LoginPage();