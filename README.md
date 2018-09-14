# DESCRIPTION

Microservice to send custom messages in HTML to AWS Cognito users.

## USAGE

### VALIDATE UNIQUE EMAILS

A handler to check for uniuqe emails for the case of having a `Cognito username` that is not the email. This is meant for use in the `PreSignup Lambda trigger` only.

Often, we allow users to change email, but setting the email as `username` in `Cognito` means that even if they change their email, they can still login via their old email whih is their username.

The alternative is to set `username` as some sort of id like UUID and allow login via email.

However, Cognito allows duplicate emails with different UUID/`username` to sign up. To prevent this, [@bsdkurt came up with a solution](https://github.com/aws-amplify/amplify-js/issues/369#issuecomment-369933670) to use the `PreSignup Lambda trigger` to validate the uniqueness of emails.

This lambda trigger is under the function name `validateUniqueEmails` in the `handler` export.

### SETUP

1. Create an AWS user with programmatic access. Deployment will be using [named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html). Permissions of the AWS user TODO

2. Make a copy of the `envsample.yml` file and rename it as `env.yml` to utilise [variables from the Serverless framework](https://serverless.com/framework/docs/providers/aws/guide/variables/).

3. Replace the `env` variables accordingly.

### DEPLOYMENT

Run the command:
```
$ sls deploy --stage <STAGE_NAME>
```

## TODO

* Handle more scenarios other than `CustomMessage_AdminCreateUser`
* Handle Cognito link option instead of code optins