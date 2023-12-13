import { APIGatewayProxyResult } from "aws-lambda";

export const returnHandler = (
  body: object,
  statusCode = 200
): APIGatewayProxyResult => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};
