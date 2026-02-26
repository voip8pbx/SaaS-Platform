const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { CallToolRequestSchema, ListToolsRequestSchema } = require("@modelcontextprotocol/sdk/types.js");
const axios = require("axios");
// const dotenv = require("dotenv");
// dotenv.config();

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_API = "https://api.vercel.com";

const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
    },
});

const server = new Server(
    {
        name: "vercel-mcp-server",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: "list_projects",
            description: "List all projects in your Vercel account",
            inputSchema: {
                type: "object",
                properties: {},
            },
        },
        {
            name: "get_latest_deployment",
            description: "Get the latest deployment for a specific project",
            inputSchema: {
                type: "object",
                properties: {
                    projectId: { type: "string", description: "The ID or name of the project" },
                },
                required: ["projectId"],
            },
        },
        {
            name: "get_deployment_status",
            description: "Get the status of a specific deployment",
            inputSchema: {
                type: "object",
                properties: {
                    deploymentId: { type: "string", description: "The ID of the deployment" },
                },
                required: ["deploymentId"],
            },
        },
    ],
}));

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        switch (name) {
            case "list_projects": {
                const response = await axiosInstance.get(`${VERCEL_API}/v9/projects`);
                return {
                    content: [{ type: "text", text: JSON.stringify(response.data.projects, null, 2) }],
                };
            }
            case "get_latest_deployment": {
                const response = await axiosInstance.get(`${VERCEL_API}/v6/deployments`, {
                    params: { projectId: args.projectId, limit: 1 },
                });
                return {
                    content: [{ type: "text", text: JSON.stringify(response.data.deployments[0], null, 2) }],
                };
            }
            case "get_deployment_status": {
                const response = await axiosInstance.get(`${VERCEL_API}/v13/deployments/${args.deploymentId}`);
                return {
                    content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
                };
            }
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error: ${error.response?.data?.error?.message || error.message}`,
                },
            ],
            isError: true,
        };
    }
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Vercel MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
