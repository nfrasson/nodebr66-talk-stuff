import { APIGatewayProxyEvent } from "aws-lambda";

export const concatenateData = (event: APIGatewayProxyEvent): object => {
  return {
    ...event.pathParameters,
    ...event.queryStringParameters,
    ...(typeof event.body === "string" ? JSON.parse(event.body) : event.body),
  };
};
