import { Selector, t } from 'testcafe';
import { faker } from '@faker-js/faker';

const PRODUCT_NAME = 'Sauce Labs Fleece Jacket';
const PRODUCT_PRICE = '$49.99';

class LoginPage {
    public usernameInput: Selector;
    public passwordInput: Selector;
    public loginButton: Selector;
  
    constructor() {
      this.usernameInput = Selector('#user-name');
      this.passwordInput = Selector('#password');
      this.loginButton = Selector('#login-button');
    }
    public async login(username: string, password: string) {
      await t.typeText(this.usernameInput, username)
             .typeText(this.passwordInput, password)
             .click(this.loginButton);
    }
  }

fixture ('Testing')
    .page ('https://www.saucedemo.com')

//Test case 1 - Access to the web page and Loging to the system
.beforeEach(async t => {
    const loginPage = new LoginPage();
    await loginPage.login('performance_glitch_user', 'secret_sauce');
  });

//Test case 2 - Check the price of product, Sauce Labs Fleece Jacket is $49.99
test('Check the price of product, Sauce Labs Fleece Jacket is $49.99', async t =>{
   
  // check the price of product
  const product = await Selector('.inventory_item_name').withExactText(PRODUCT_NAME);
  const price = await product.sibling('.inventory_item_price').withText(PRODUCT_PRICE);

});

//Test case 3 - Add any two products into the cart
test('Add any two products into the cart', async t =>{
      
    // Add any two products into the cart 
await t
    .click('#add-to-cart-sauce-labs-backpack')
    .click('#add-to-cart-sauce-labs-bike-light');
});

//Test case 4 - Click cart icon in the top 
test('Click cart icon in the top', async t =>{
await t
    .click('#add-to-cart-sauce-labs-backpack')
    .click('#add-to-cart-sauce-labs-bike-light')

        //Click cart icon in the top 
        .click('#shopping_cart_container');
        
    });
 
//Test case 5 -Verify the items in the cart and the checkout button
test('Verify the items in the cart and click the ckeckout button', async t =>{
   
await t
    .click('#add-to-cart-sauce-labs-backpack')
    .click('#add-to-cart-sauce-labs-bike-light')
//verify the item in the cart
        .click('.shopping_cart_link')
        .expect(Selector('.cart_item').count).eql(2);

//click the checkout button
await t
.click('#shopping_cart_container')
.click('#checkout');

});

//Test case 6 - Provide a random firstname, lastname and a zip code in the next page 
test('Provide a random firstname, lastname and a zip code in the next page ', async t =>{
      
         //add products into the cart
    await t
        .click('#add-to-cart-sauce-labs-backpack')
        .click('#add-to-cart-sauce-labs-bike-light')
            .click('#shopping_cart_container')

             //Click the checkout button and provide random data using faker
            .click('#checkout')
            .typeText('#first-name', faker.name.firstName())
            .typeText('#last-name', faker.name.lastName())
            .typeText('#postal-code', faker.address.zipCode())

            // click the continue button
            .click('#continue')

            //click the finish button
            .click('#finish');
         });  