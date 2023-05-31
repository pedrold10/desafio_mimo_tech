# Documentação da API

## Endpoints

### Listar Ferramentas

- **Endpoint:** `GET /tools`
- **URL:** `https://986mq6hd05.execute-api.us-east-1.amazonaws.com/dev/tools`

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Ferramenta 1",
    "link": "https://exemplo.com/ferramenta1",
    "descricao": "Descrição da Ferramenta 1",
    "tags": ["tag1", "tag2"]
  },
  {
    "id": 2,
    "nome": "Ferramenta 2",
    "link": "https://exemplo.com/ferramenta2",
    "descricao": "Descrição da Ferramenta 2",
    "tags": ["tag3", "tag4"]
  }
]
```


### Obter Ferramenta por ID
**Endpoint:** GET /tools/{id}
**URL:** https://986mq6hd05.execute-api.us-east-1.amazonaws.com/dev/tools/{id}

**Resposta:**
```json
{
  "id": 1,
  "nome": "Ferramenta 1",
  "link": "https://exemplo.com/ferramenta1",
  "descricao": "Descrição da Ferramenta 1",
  "tags": ["tag1", "tag2"]
}
```

### Criar Ferramenta
**Endpoint:** POST /tools
**URL:** https://986mq6hd05.execute-api.us-east-1.amazonaws.com/dev/tools

**Corpo da Solicitação:**

``` json
{
  "nome": "Nova Ferramenta",
  "link": "https://exemplo.com/nova-ferramenta",
  "descricao": "Descrição da Nova Ferramenta",
  "tags": ["tag5", "tag6"]
}

```

**Resposta:**

```json
{
  "message": "Ferramenta criada com sucesso"
}

```

### Atualizar Ferramenta por ID
**Endpoint:** PUT /tools/{id}
**URL:** https://986mq6hd05.execute-api.us-east-1.amazonaws.com/dev/tools/{id}
**Corpo da Solicitação:**

```json
{
  "nome": "Ferramenta Atualizada",
  "link": "https://exemplo.com/ferramenta-atualizada",
  "descricao": "Descrição da Ferramenta Atualizada",
  "tags": ["tag7", "tag8"]
}
```

**Resposta:**

```json

{
  "id": 1,
  "nome": "Ferramenta Atualizada",
  "link": "https://exemplo.com/ferramenta-atualizada",
  "descricao": "Descrição da Ferramenta Atualizada",
  "tags": ["tag7", "tag8"]
}

```

### Excluir Ferramenta por ID
**Endpoint:** DELETE /tools/{id}
**URL:** https://986mq6hd05.execute-api.us-east-1.amazonaws.com/dev/tools/{id}
**Resposta:**

```json
{
  "message": "Ferramenta deletada com sucesso"
}

```