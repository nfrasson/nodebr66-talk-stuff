# nodebr66-talk-stuff

This repository contains materials used in my presentation at the NodeBR event on “The Universe of Serverless”. The talk was titled “Advanced Strategies with Node.js for Performance in Serverless Environments and AWS Lambda”.

## Presentation Materials

- **Slides**: [View the presentation slides](https://www.canva.com/design/DAF2lg5J7jM/ltk7UWZsA1ZnobyKz9nSMQ/edit)
- **Recording**: [Watch the recorded presentation](https://youtu.be/OgaKIj4pRIU?t=5257)

## Repository Contents

### `lambda-initial-example`
This directory contains the setup for an initial project.

- **exampleModule.js**: A JavaScript module used in one of our defined Lambdas ("exampleFunction"). It includes a "handler" method, which is the JavaScript function executed by the Lambda upon invocation. This method is designed to respond to an HTTP event triggered by AWS API Gateway.
- **exampleEcmaModule.mjs**: A JavaScript module using ECMAScript Modules standard. It includes an example of using Top-level await, beneficial in solutions addressing Lambda Cold-start issues, such as Warmup and Provisioned Concurrency, especially during database connections.
- **Layers**: Defines the layer to be used by Lambda execution. [Learn more about Layers for AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html).
- **serverless.yml**: Specifies Cloud resources, defining AWS Lambdas and their environment configurations.

### `lambda-complete-architecture`
In the `lambda` directory:
- **database**: Contains the database connection function and Mongoose Schemas.
- **functions**: Defines modules related to the user entity like login and registration. These modules define functions independent of the Lambda environment but used by the `LambdaDefaultHandler` class and `handleAPIGatewayEvent` method to process events from the API Gateway.

- **LambdaDefaultHandler**: A class that receives a "handler" function in its constructor, which is executed in the Lambda context. The `handleAPIGatewayEvent` method provides standard processing for events from the API Gateway, including handling of dummy events for warmup flows, database connection, and request body validation.

- **Layers**: Defines the layer used by Lambda execution. [Learn more about Layers for AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html).
- **serverless.yml**: Defines Cloud resources, setting up AWS Lambdas and their environment configurations.

## License
This project is licensed under the [LICENSE](LICENSE) included in the repository.