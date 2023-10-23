# benefitPay-react-native

Tap BenefitPay React-Native Wrapper

# Introduction[]()

Before diving into the development process, it's essential to establish the prerequisites and criteria necessary for a successful build. In this step, we'll outline the specific requirements, including the minimum SDK version and other important details you need to consider. Let's ensure your project is set up for success from the very beginning.

# Sample demo[]()



https://github.com/Tap-Payments/BenefitPay-React-Native/assets/121755223/5849ba95-3375-4b8e-8bb9-c34d6dab2008


# Step 1: Requirements[]()

-  React native 0.64
-  A minimum  [Android SDK/API level](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)  of 24+

- in order to accept online payments on your application, you will need to add at least the Internet permission in the manifest file.
 ```gradle
<uses-permission android:name="android.permission.INTERNET" /> 
//get internet access to complete online payments
 ```
    

# Step 2: Get Your Public Keys[]()

While you can certainly use the sandbox keys available within our sample app which you can get by following the  [installation](https://developers.tap.company/docs/android-card-sdk#step-3-installation-using-gradle)  process, however, we highly recommend visiting our  [onboarding](https://register.tap.company/ae/en/sell)  page, there you'll have the opportunity to register your package name and acquire your essential Tap Key for activating Card integration.


# Step 3: Installation[]()

We got you covered, `benefit-pay-react-native` can be installed with all possible technologies.

## Node modules

```sh
npm install benefit-pay-react-native
```

```sh
yarn install benefit-pay-react-native
```

Then run in your terminal

```swift
cd ios
pod install
pod update
```



# Import the dependency
```Ts
import BenefitPayView from ‘benefit-pay-react-native’;
```

# Step 4: Integrating Benefit-pay-react-native[]()
This integration offers two distinct options: a simple integration designed for rapid development and streamlined merchant requirements, and an advanced integration that adds extra features for a more dynamic payment integration experience.

## Simple Integration[]()

Here, you'll discover a comprehensive table featuring the parameters applicable to the simple integration. Additionally, you'll explore the various methods for integrating the SDK, either using storyboard to create the layout and then implementing the controllers functionalities by code, or directly using code. Furthermore, you'll gain insights into card tokenization after the initial payment and learn how to receive the callback notifications.

### Parameters[]()
Each parameter is linked to the  [reference](https://developers.tap.company/docs/card-sdk-ios#reference)  section, which provides a more in depth explanation of it.


|Configuration|Description | Required | Type| Sample
|--|--|--| --|--|
| operator| This is the `Key` that you will get after registering you bundle id. | True  | `String`| `let operator  {publicKey: 'pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7'}` |
| order| This is the `order id` that you created before or `amount` and `currency` to generate a new order.   It will be linked this token. | True  | `Order`| ` let order: = { amount: 1, currency: TapCurrencyCode.SAR, description: '', id: '', , reference : ''}` |


## Simple widget initialisation
```Ts
function MinRequirement() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BenefitPayView
        onSuccess={(data) => {
          console.log(
            '🚀 ~ tokenValue:',
            data
          );
        }}
        onError={(data) => {
          console.log(
            '🚀 ~ onError:',
            data
          );
        }}
        style={{ width: '100%' }}
        config={{
          merchant: {
            id: '',
          },
          order: {
            amount: 1,
            currency: TapCurrencyCode.SAR,
          },
          customer: {
            name: [
              {
                first: 'Tap',
                lang: Locale.en,
                middle: 'Company',
                last: 'Payments',
              },
            ],
            contact: {
              phone: {
                number: '88888888',
                countryCode: '+965',
              },
              email: 'tappayments@tap.company',
            },
          },
        }}
        onReady={() => {
          console.log(
            '🚀 ~ file: HomeScreen.tsx:145 ~ HomeScreen ~ onReady:',
          );
        }}
      />
    </View>
  );
}
```

# Advanced Integration
## Advanced Integration

[]()

The advanced configuration for the BenefitPay integration not only has all the features available in the simple integration but also introduces new capabilities, providing merchants with maximum flexibility. You can find a code below, where you'll discover comprehensive guidance on implementing the advanced flow as well as a complete description of each parameter.

### Parameters[]()
Each parameter is linked to the  [reference]()  section, which provides a more in depth explanation of it.

|Configuration|Description | Required | Type| Sample
|--|--|--| --|--|
| operator| This is the `Key` that you will get after registering you bundle id. | operator|It has the key obtained after registering your package name, also known as Public key. Also, the [hashString](https://developers.tap.company/docs/benefit-pay-ios#generate-the-hash-string) value which is used to validate live charges. | True  | `Dictionary`| `let operator:[String:Any]: ["publicKey":"pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7", "hashString":""]`  |
| order| This is the `order id` that you created before or `amount` and `currency` to generate a new order.   It will be linked this token. | True  | `Order`| ` let order: = { amount: 1, currency: TapCurrencyCode.SAR, description: '', id: '', , reference : ''}` |
| invoice| This is the `invoice id` that you want to link this token to if any. | False  | `Invoice`| ` let invoice = {"id":""}` |
| merchant| This is the `Merchant id` that you will get after registering you bundle id. | True  | `Merchant`| ` let merchant = {"id":""}` |
| customer| The customer details you want to attach to this tokenization process. | True  | `Customer`| ` let customer = {"id":"", "name":{{"lang":"en","first":"TAP","middle":"","last":"PAYMENTS"}}, "nameOnCard":"TAP PAYMENTS", "editble":true, "contact":{"email":"tap@tap.company", "phone":{"countryCode":"+965","number":"88888888"}}}` |
| `Interface`| ` let interface = {locale: Locale.en, theme: Theme.dark, edges: Edges.curved, cardDirection: Direction.ltr, colorStyle: 'monochrome', "loader": true}` |
| post| This is the `webhook` for your server, if you want us to update you server to server. | False  | `Post`| ` let post = {"url":""}` |

## Advanced configuration initiliasation
```Ts
const config = React.useMemo(() => {
    return {
      merchant: {
        id: '',
      },
      order: {
        reference: '',
        amount: 1,
        currency: TapCurrencyCode.SAR,
        description: '',
        id: '',
        metadata: {},
      },
      invoice: {
        id: 'Map to authenticate.reference.invoice',
      },
      post: {
        url: 'Map to authenticate.reference.post',
      },
      operator: {
        publicKey: 'pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7',
        hashString: 'OSAMA',
      },
      customer: {
        editable: true,
        id: '',
        name: [
          {
            first: 'Tap',
            lang: Locale.en,
            middle: 'Company',
            last: 'Payments',
          },
        ],
        contact: {
          phone: {
            number: '88888888',
            countryCode: '+965',
          },
          email: 'tappayments@tap.company',
        },
      },
      interface: {
        loader: true,
        locale: Locale.en,
        theme: Theme.dark,
        edges: Edges.curved,
        colorStyle: ColorStyle.colored,
      },
    };
  }, []);
```
## Advanced widget initialisation
```Ts
<View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
         <BenefitPayView
          onSuccess={(tokenValue) => {}}
          style={{ width: '100%' }}
          config={config}
          onReady={() => {}}
          onCanceled={() => {}}
          onClicked={() => {}}
          onChargeCreated={(binIdentification: Object) => {}}
          onOrderCreated={(binIdentification: Object) => {}}
          onError={(error: object) => {}}
        />
      </View>
```

# BenefitPayView Callbacks

callbacks that allows integrators to get notified from events fired from the `BenefitPayView`.

```Ts
 {
  ///  Will be fired whenever there is an error related to the button connectivity or apis
  ///  - Parameter  data: includes a JSON format for the error description and error
  const onError = (data: String) => {}
	///  Will be fired whenever the charge is completed, regardless of its status.
	///  - Parameter  data: includes a JSON format for the charge details
  const onSuccess = (data: String) => {}
	///  Will be fired whenever the order is created. use it, if you want to retrieve its data from your backend for state manegement purposes
	///  - Parameter  data: Order id.
  const onOrderCreated = (data: String)  => {}
	///  Will be fired whenever the charge is created. use it, if you want to retrieve its data from your backend for state manegement purposes
	///  - Parameter  data: json data representing the charge model.
  const onChargeCreated = (data: String)  => {}
  ///  Will be fired whenever the benefit pay button is rendered and loaded
  const onReady = ()  => {}
  ///  Will be fired whenever the customer clicked on the benefit pay button. Now the button will be in loading state to render the benefit pay popup
  const onClicked = ()  => {}
  ///  Will be fired whenever the customer cancels the payment. This will reload the button once again
  func onCanceled = () => {}

}
```

# Parameters Reference[]()

Below you will find more details about each parameter shared in the above tables that will help you easily integrate BenefitPay SDK.

## operator[]()

1.  Definition: It links the payment gateway to your merchant account with Tap, in order to know your business name, logo, etc...
2.  Type: string (_required_)
3.  Fields:
    -   **publicKey**  
        _Definition_: This is a unique public key that you will receive after creating an account with Tap which is considered a reference to identify you as a merchant. You will receive 2 public keys, one for sandbox/testing and another one for production.  
4. Example:
        
```ts
const operator = {publicKey : "pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7", hashString:"" }
```
##  order []()

1.  Definition: This defined the details of the order that you are trying to purchase, in which you need to specify some details like the id, amount, currency ...
2.  Type: Dictionary, (_required_)
3.  Fields:
    -   **id**  
        _Definition:_  Pass the order ID created for the order you are trying to purchase, which will be available in your database.  
        Note: This field can be empty  
    -   **currency**  
        _Definition:_  The currency which is linked to the order being paid.  
    -   **amount**  
        _Definition:_  The order amount to be paid by the customer.  
        Note: Minimum amount to be added is 0.1.  
    -   **description**  
        _Definition:_  Order details, which defines what the customer is paying for or the description of the service you are providing.  
    -   **reference**  
        _Definition:_  This will be the order reference present in your database in which the paying is being done for.  
4.  _Example:_
  ```ts
  const order = [
      { id : "", amount: 1, currency: "SAR", description: "Authentication description",
      "reference": "",
    }
  ```

##  merchant

[]()

1.  Definition: It is the Merchant id that you get from our onboarding team. This will be used as reference for your account in Tap.
2.  Type: Dictionary (_required_)
3.  Fields:
    -   **id**  
        _Definition:_  Generated once your account with Tap is created, which is unique for every merchant.  
        _Example:_
```ts
	const merchant = {id:""}
```
        

##  invoice []()

1.  Definition: After the token is generated, you can use it to pay for any invoice. Each invoice will have an invoice ID which you can add here using the SDK.  
    Note: An invoice will first show you a receipt/summary of the order you are going to pay for as well as the amount, currency, and any related field before actually opening the payment form and completing the payment.
2.  Type: Dictionary (_optional_)
3.  Fields:
    -   **id**  
        _Definition:_  Unique Invoice ID which we are trying to pay.  
        _Example:_
```ts
	const invoice = {id:""}
```
        

## customer []()

1.  Definition: Here, you will collect the information of the customer that is paying..
    
2.  Type: Dictionary (_required_)
    
3.  Fields:
    
    -   **id**  
        _Definition:_  This is an optional field that you do not have before the charge is processed. But, after the charge, then you will receive the customer ID in the response which can be handled in the onSuccess callback function.  
    -   **name**  
        _Definition:_  Full Name of the customer paying.  
        _Fields:_
        
        1.  **lang**  
            Definition: Language chosen to write the customer name.
        2.  **first**  
            Definition: Customer's first name.
        3.  **middle**  
            Definition: Customer's middle name.
        4.  **last**  
            Definition: Customer's last name.  
    -   **contact**  
        _Definition:_  The customer's contact information like email address and phone number.  
        Note: The contact information has to either have the email address or the phone details of the customers or both but it should not be empty.  
        _Fields:_
        
        1.  **email**  
            Definition: Customer's email address  
            Note: The email is of type string.
        2.  **phone**  
            Definition: Customer's Phone number details
            1.  **countryCode**
            2.  **number**  
4.  _Example:_
```ts
const customer = {
      editable: true,
      id: '',
      name: [
        {
          first: 'Tap',
          lang: Locale.en,
          middle: 'Company',
          last: 'Payments',
        },
      ],
      contact: {
        phone: {
          number: '88888888',
          countryCode: '+965',
        },
        email: 'tappayments@tap.company',
      },
    }
```
        

##  interface []()

1.  Definition: This will help you control the layout (UI) of the payment form, like changing the theme light to dark, the language used (en or ar), ...
2.  Type: Dictionary (_optional_)
3.  Fields:
    -   **loader**  
        _Definition:_  A boolean to indicate wether or not you want to show a loading view on top of the benefit button while it is performing api requests.  
    -   **locale**  
        _Definition:_  The language of the benefit button. Accepted values as of now are:  
        _Possible Values:_
        
        1.  **en**(for english)
        2.  **ar**(for arabic).  
        
    -   **theme**  
        _Definition:_  The display styling of the benefit button. Accepted values as of now are:  
        _Options:_
        
        1.  **light**
        2.  **dark**
        3.  **dynamic**  ( follow the device's display style )  
        
    -   **edges**  
        _Definition:_  Control the edges of the payment form.  
        _Possible Values:_
        
        1.  **curved**
        2.  **flat**  

    -   **colorStyle**  
        _Definition:_  How do you want the icons rendered inside the benefit button
        _Possible Values:_
        
        1.  **colored**
        2.  **monochrome**  
4.  _Example:_
```ts
const interface = {
      loader: true,
      locale: Locale.en,
      theme: Theme.dark,
      edges: Edges.curved,
      colorStyle: ColorStyle.colored,
    } 
```
        

##  post []()

1.  Definition: Here you can pass the webhook URL you have, in order to receive notifications of the results of each Transaction happening on your application.
    
2.  Type: Dictionary (_optional_)
    
3.  Fields:
    
    -   **url**  
        _Definition:_  The webhook server's URL that you want to receive notifications on.  
        _Example:_
```ts
	const post = {id:""}
```        

# Expected Callbacks Responses[]()

## onError
```json
{
    "error":""
}
```

## onOrderCreated
```swift
"ord_uAx145231127yHYS19Ou9B126"
```


## onChargeCreated
```json
{
    "id": "chg_TS07A5220231433Ql241910314",
    "object": "charge",
    "live_mode": false,
    "customer_initiated": true,
    "api_version": "V2",
    "method": "CREATE",
    "status": "INITIATED",
    "amount": 0.1,
    "currency": "BHD",
    "threeDSecure": true,
    "card_threeDSecure": false,
    "save_card": false,
    "order_id": "ord_uAx145231127yHYS19Ou9B126",
    "product": "GOSELL",
    "order": {
        "id": "ord_uAx145231127yHYS19Ou9B126"
    },
    "transaction": {
        "timezone": "UTC+03:00",
        "created": "1697726033236",
        "url": "",
        "expiry": {
            "period": 30,
            "type": "MINUTE"
        },
        "asynchronous": false,
        "amount": 0.1,
        "currency": "BHD"
    },
    "response": {
        "code": "100",
        "message": "Initiated"
    },
    "receipt": {
        "email": true,
        "sms": true
    },
    "customer": {
        "first_name": "TAP",
        "last_name": "PAYMENTS",
        "email": "tap@tap.company",
        "phone": {
            "country_code": " 965",
            "number": "88888888"
        }
    },
    "merchant": {
        "country": "KW",
        "currency": "KWD",
        "id": "599424"
    },
    "source": {
        "object": "source",
        "id": "src_benefit_pay"
    },
    "redirect": {
        "status": "PENDING",
        "url": ""
    },
    "post": {
        "status": "PENDING",
        "url": ""
    },
    "activities": [
        {
            "id": "activity_TS02A5420231433Mx4g1910470",
            "object": "activity",
            "created": 1697726033236,
            "status": "INITIATED",
            "currency": "BHD",
            "amount": 0.1,
            "remarks": "charge - created"
        }
    ],
    "auto_reversed": false,
    "gateway_response": {
        "name": "BENEFITPAY",
        "request": {
            "amount": "0.100",
            "currency": "BHD",
            "hash": "gMjpC12Ffz+CMhyvm+/jdYJmqbPdgAhHJvvGBABYhCI=",
            "reference": {
                "transaction": "chg_TS07A5220231433Ql241910314"
            },
            "merchant": {
                "id": "00000101"
            },
            "application": {
                "id": "4530082749"
            },
            "configuration": {
                "show_result": "0",
                "hide_mobile_qr": "0",
                "frequency": {
                    "start": 120,
                    "interval": 60,
                    "count": 10,
                    "type": "SECOND"
                }
            }
        }
    }
}
```
## onSuccess
```json
{
    "id": "chg_TS07A5220231433Ql241910314",
    "object": "charge",
    "live_mode": false,
    "customer_initiated": true,
    "api_version": "V2",
    "method": "UPDATE",
    "status": "INITIATED",
    "amount": 0.1,
    "currency": "BHD",
    "threeDSecure": true,
    "card_threeDSecure": false,
    "save_card": false,
    "order_id": "ord_uAx145231127yHYS19Ou9B126",
    "product": "GOSELL",
    "description": "",
    "order": {
        "id": "ord_uAx145231127yHYS19Ou9B126"
    },
    "transaction": {
        "timezone": "UTC+03:00",
        "created": "1697726033236",
        "url": "https://sandbox.payments.tap.company/test_gosell/v2/payment/tap_process.aspx?chg=8D9e9fdEo5N03hWrGnROvEEFw4DfqYVFv8R7R34GITc%3d",
        "expiry": {
            "period": 30,
            "type": "MINUTE"
        },
        "asynchronous": false,
        "amount": 0.1,
        "currency": "BHD"
    },
    "response": {
        "code": "100",
        "message": "Initiated"
    },
    "receipt": {
        "email": true,
        "sms": true
    },
    "customer": {
        "first_name": "TAP",
        "last_name": "PAYMENTS",
        "email": "tap@tap.company",
        "phone": {
            "country_code": " 965",
            "number": "88888888"
        }
    },
    "merchant": {
        "country": "KW",
        "currency": "KWD",
        "id": "599424"
    },
    "source": {
        "object": "source",
        "id": "src_benefit_pay"
    },
    "redirect": {
        "status": "PENDING",
        "url": ""
    },
    "post": {
        "status": "PENDING",
        "url": ""
    },
    "activities": [
        {
            "id": "activity_TS02A5420231433Mx4g1910470",
            "object": "activity",
            "created": 1697726033236,
            "status": "INITIATED",
            "currency": "BHD",
            "amount": 0.1,
            "remarks": "charge - created"
        }
    ],
    "auto_reversed": false,
    "gateway_response": {
        "name": "BENEFITPAY",
        "request": {
            "amount": "0.100",
            "currency": "BHD",
            "hash": "gMjpC12Ffz+CMhyvm+/jdYJmqbPdgAhHJvvGBABYhCI=",
            "reference": {
                "transaction": "chg_TS07A5220231433Ql241910314"
            },
            "merchant": {
                "id": "00000101"
            },
            "application": {
                "id": "4530082749"
            },
            "configuration": {
                "show_result": "0",
                "hide_mobile_qr": "0",
                "frequency": {
                    "start": 120,
                    "interval": 60,
                    "count": 10,
                    "type": "SECOND"
                }
            }
        }
    }
}
```

# Generate the hash string[]()

1. Install crypto-js `npm install crypto-js`
2. Import 
```Ts
  import sha256 from 'crypto-js/sha256';
  import hmacSHA256 from 'crypto-js/hmac-sha256';
  import Base64 from 'crypto-js/enc-base64';
```
3. Copy this helper method code
```TS
/**
     This is a helper method showing how can you generate a hash string when performing live charges
     - Parameter publicKey:             The Tap public key for you as a merchant pk_.....
     - Parameter secretKey:             The Tap secret key for you as a merchant sk_.....
     - Parameter amount:                The amount you are passing to the SDK, ot the amount you used in the order if you created the order before.
     - Parameter currency:              The currency code you are passing to the SDK, ot the currency code you used in the order if you created the order before. PS: It is the capital case of the 3 iso country code ex: SAR, KWD.
     - Parameter post:                  The post url you are passing to the SDK, ot the post url you pass within the Charge API. If you are not using postUrl please pass it as empty string
     - Parameter transactionReference:  The reference.trasnsaction you are passing to the SDK(not all SDKs supports this,) or the reference.trasnsaction  you pass within the Charge API. If you are not using reference.trasnsaction please pass it as empty string
     */
      const generateTapHashString = (
        publicKey: string,
        secretKey: string,
        amount: number,
        currency: string,
        postUrl: string = '',
        transactionReference: string = ''
      ) => {
        // Let us generate our encryption key
        // For amounts, you will need to make sure they are formatted in a way to have the correct number of decimal points. For BHD we need them to have 3 decimal points
        const formattedAmount = amount.toFixed(3);
        // Let us format the string that we will hash
        const toBeHashed = `x_publickey${publicKey}x_amount${formattedAmount}x_currency${currency}x_transaction${transactionReference}x_post${postUrl}`;
        // let us generate the hash string now using the HMAC SHA256 algorithm
        const hashDigest = sha256(toBeHashed);
        const hmacDigest = Base64.stringify(hmacSHA256(hashDigest, secretKey));
        return hmacDigest;
      };
```
3. Call it as follows:
```ts
let hashString = generateTapHashString(publicKey: publicKey, secretKey: secretString, amount: amount, currency: currency, postUrl: postUrl)
```
4. Pass it within the operator model
```ts
let operatorModel = {publicKey: "pk_test_HJN863LmO15EtDgo9cqK7sjS", hashString: hashString}
```
