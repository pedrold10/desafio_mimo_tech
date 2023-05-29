import { APIGatewayEvent, Handler, Context, APIGatewayProxyResult } from "aws-lambda";
import middify from "../core/middify";
import formatJSONResponse from "../core/formatJsonResponse";
import toolService from "../database/services";
  
  export const handler: Handler = middify(
    async (
      event: APIGatewayEvent,
      context: Context
    ): Promise<APIGatewayProxyResult> => {
      const toolId: string = event.pathParameters.toolId;
      try {
        const tools = await toolService.getTool(toolId);
  
        return formatJSONResponse(200, tools);
      } catch (err) {
        return formatJSONResponse(400, err);
      }
    }
  );