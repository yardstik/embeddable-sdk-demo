![Yardstik](https://yardstik-assets.s3.amazonaws.com/logos/yardstik-wordmark-white-outlined.png)

# Getting Started

1. Log into your account in Yardstik
2. Navigate to the Developer page and select API Keys
3. Enter the `Name` for the API key and click the `Create` button

    ![Yardstik](https://yardstik-assets.s3.amazonaws.com/images/yardstik_api_keys_screen.png)

4. Click the `copy` icon to copy the api key to your clipboard.

    ![Yardstik](https://yardstik-assets.s3.amazonaws.com/images/copy_api_key.png)
    
5. Paste the API key somewhere safe as it will not be displayed again.
6. Once the key is pasted somewhere safe, you can click the green `I have copied my API key` button
7. Update the constants.js file to include the `YARDSTIK_ACCOUNT_ID`, `YARDSTIK_REPORT_ID`, and `YARDSTIK_ACCOUNT_EMAIL`.
8. Set the `YARDSTIK_API_KEY` environment variable with the api-key you created in `Getting Started` section.
9. Set the `YARDSTIK_API_URL` environment variable to `https://api.yardstik-staging.com`.
10. Run `yarn server` to start up the back end.
11. Run `yarn start` to start up the front end. 

# Important Notes

1. The `YARDSTIK_API_KEY` must belong to account specified in `YARDSTIK_ACCOUNT_ID` 
2. The `YARDSTIK_ACCOUNT_EMAIL` must be associated with the account specified in `YARDSTIK_ACCOUNT_ID`
3. The account specified in `YARDSTIK_ACCOUNT_ID` must be authorized to view the report for the provided `YARDSTIK_REPORT_ID`.
4. Legal documents will only appear if they are required on your account but have not yet been provided.

# Using the App
1. View a candidate report by click on the "Candidate Report" tab in the nav bar:
  ![Yardstik](https://yardstik-assets.s3.amazonaws.com/images/embeddable-sdk-demo-report.png)
  ![Yardstik](https://yardstik-assets.s3.amazonaws.com/images/embeddable-sdk-demo-report2.png)

2. View/sign account disclosures by clicking on the "Account Disclosures" tab in the nav bar:
  ![Yardstik](https://yardstik-assets.s3.amazonaws.com/images/embeddable-sdk-demo-disclosures.png)
