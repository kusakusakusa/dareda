# DESCRIPTION

Microservice to send custom messages in HTML to AWS Cognito users.

## USAGE

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
