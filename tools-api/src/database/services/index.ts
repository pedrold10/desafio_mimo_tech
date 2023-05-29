import createDynamoDBClient from "../db";
import ToolService from "./toolService";

const { TOOLS_TABLE } = process.env;

const toolService = new ToolService(createDynamoDBClient(), TOOLS_TABLE);

export default toolService;