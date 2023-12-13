import joi from "joi";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { returnHandler } from "./utils/APIGateway/return-handler.apigateway";
import { concatenateData } from "./utils/APIGateway/concatenate-data.apigateway";

export const LambdaDefaultHandler = class {
  handler: Function;
  requestBodySchema?: joi.ObjectSchema;
  connectToDatabase?: () => Promise<void>;

  constructor(
    handler: Function,
    requestBodySchema: joi.ObjectSchema,
    connectToDatabase?: () => Promise<void>
  ) {
    this.handler = handler;
    this.requestBodySchema = requestBodySchema;
    this.connectToDatabase = connectToDatabase;

    this.handleAPIGatewayEvent = this.handleAPIGatewayEvent.bind(this);
  }

  public async handleAPIGatewayEvent(
    event: APIGatewayProxyEvent
  ): Promise<void | APIGatewayProxyResult> {
    try {
      if (this.connectToDatabase) {
        await this.connectToDatabase();
      }

      if (event.headers?.["x-iswarmup"]) {
        console.log("WarmUp - Lambda is warm!");
        return returnHandler({}, 200);
      }

      const $body = await this.requestBodySchema.validateAsync(
        concatenateData(event),
        {
          abortEarly: false,
        }
      );

      const { statusCode, result } = await this.handler($body);

      return returnHandler(result, statusCode);
    } catch (error) {
      return returnHandler({ error: error.message }, 500);
    }
  }
};
