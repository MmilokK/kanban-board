import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';
import { jsonSchemaTransform } from '@fastify/type-provider-zod';

export async function registerSwagger(app: FastifyInstance): Promise<void> {
  await app.register(swagger, {
    openapi: {
      openapi: '3.0.3',
      info: {
        title: 'Kanban Board API',
        description: 'HTTP API для Kanban Board',
        version: '1.0.0',
      },
      tags: [
        {
          name: 'Health',
          description: 'Состояние backend',
        },
        {
          name: 'Auth',
          description: 'Аутентификация',
        },
        {
          name: 'Boards',
          description: 'Cloud-доски',
        },
        {
          name: 'Columns',
          description: 'Колонки cloud-досок',
        },
        {
          name: 'Tasks',
          description: 'Задачи cloud-досок',
        },
        {
          name: 'Subtasks',
          description: 'Подзадачи cloud-задач',
        },
        {
          name: 'Comments',
          description: 'Комментарии cloud-задач',
        },
      ],
      components: {
        securitySchemes: {
          sessionCookie: {
            type: 'apiKey',
            in: 'cookie',
            name: 'kanban_session',
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
  });
}
