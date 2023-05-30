const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();


async function getNextId() {
  const counterParams = {
    TableName: 'Counter',
    Key: { id: 1 },
    UpdateExpression: 'ADD currentId :increment',
    ExpressionAttributeValues: { ':increment': 1 },
    ReturnValues: 'UPDATED_NEW'
  };

  const result = await dynamoDB.update(counterParams).promise();
  const nextId = result.Attributes.currentId;

  return nextId;
}

const listTools = async () => {
  try {
    const params = {
      TableName: 'tools'
    };

    const result = await dynamoDB.scan(params).promise();

    const tools = result.Items;

    return {
      statusCode: 200,
      body: JSON.stringify(tools)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Falha ao listar as ferramentas' })
    };
  }
};

const getTool = async (event) => {
    try {
      const { id } = event.pathParameters;
      console.log('ID:', id); // Adicione este log para verificar o valor do ID
  
      const params = {
        TableName: 'tools',
        Key: { id: parseInt(id) }
      };
  
      console.log('Query Params:', params); // Adicione este log para verificar os parâmetros da consulta
  
      const result = await dynamoDB.get(params).promise();
  
      console.log('Query Result:', result); // Adicione este log para verificar o resultado da consulta
  
      const tool = result.Item;
  
      if (!tool) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Ferramenta não encontrada' })
        };
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify(tool)
      };
    } catch (error) {
      console.log('Error:', error); // Adicione este log para registrar o erro
  
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Falha ao obter a ferramenta' })
      };
    }
  };
  


const createTool = async (event) => {
  try {
    const { nome, link, descricao, tags } = JSON.parse(event.body);
    const nextId = await getNextId();

    const params = {
      TableName: 'tools',
      Item: {
        id: parseInt(nextId),
        nome,
        link,
        descricao,
        tags
      }
    };

    await dynamoDB.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Ferramenta criada com sucesso' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Falha ao criar a ferramenta' })
    };
  }
};

const updateTool = async (event) => {
  try {
    const { id } = event.pathParameters;
    const { nome, link, descricao, tags } = JSON.parse(event.body);

    const params = {
      TableName: 'tools',
      Key: { id: parseInt(id) },
      UpdateExpression: 'set #nome = :nome, link = :link, descricao = :descricao, tags = :tags',
      ExpressionAttributeNames: { '#nome': 'nome' },
      ExpressionAttributeValues: { ':nome': nome, ':link': link, ':descricao': descricao, ':tags': tags },
      ReturnValues: 'UPDATED_NEW'
    };

    const result = await dynamoDB.update(params).promise();

    const updatedTool = result.Attributes;

    if (!updatedTool) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Ferramenta não encontrada' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(updatedTool)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Falha ao atualizar a ferramenta' })
    };
  }
};

const deleteTool = async (event) => {
  try {
    const { id } = event.pathParameters;

    const params = {
      TableName: 'tools',
      Key: { id: parseInt(id) }
    };

    const result = await dynamoDB.delete(params).promise();

    if (result.$response.error) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Ferramenta não encontrada' })
      };
    }


    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Ferramenta deletada com sucesso' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Falha ao deletar a ferramenta' })
    };
  }
};

module.exports = {
  listTools,
  getTool,
  createTool,
  updateTool,
  deleteTool
};
