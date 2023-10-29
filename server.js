// mirage-config.js
import { Model, Factory, Response, createServer } from "miragejs";

createServer({
  models: {
    todo: Model,
  },

  factories: {
    todo: Factory.extend({
      title: "Sample Todo",
      description: "this is simple todo description",
      completed: false,
      priority: {
        number: 1,
        badgeColor: "#21D375",
        textColor: "#0B6E4F",
      },
    }),
  },

  routes() {
    this.namespace = "/api";

    // Create a new category
    this.post("/categories", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      return schema.categories.create(attrs);
    });

    // Get all categories
    this.get("/categories", (schema) => {
      return schema.categories.all();
    });

    // Edit a category
    this.patch("/categories/:id", (schema, request) => {
      const categoryId = request.params.id;
      const attrs = JSON.parse(request.requestBody);
      schema.categories.find(categoryId).update(attrs);
      return schema.categories.find(categoryId);
    });

    // Delete a category
    this.delete("/categories/:id", (schema, request) => {
      const categoryId = request.params.id;
      schema.categories.find(categoryId).destroy();
      schema.todos.where({ categoryId }).destroy();
      return new Response(204);
    });

    // Create a new todo in a category
    this.post("/categories/:categoryId/todos", (schema, request) => {
      const categoryId = request.params.categoryId;
      const attrs = JSON.parse(request.requestBody);
      attrs.categoryId = categoryId;
      return schema.todos.create(attrs);
    });

    // Get all todos in a category
    this.get("/categories/:categoryId/todos", (schema, request) => {
      const categoryId = request.params.categoryId;
      const todos = schema.todos.where({ categoryId });
      return todos;
    });

    // Edit a todo
    this.patch("/todos/:id", (schema, request) => {
      const todoId = request.params.id;
      const attrs = JSON.parse(request.requestBody);
      schema.todos.find(todoId).update(attrs);
      return schema.todos.find(todoId);
    });

    // Delete a todo
    this.delete("/todos/:id", (schema, request) => {
      const todoId = request.params.id;
      schema.todos.find(todoId).destroy();
      return new Response(204);
    });
  },
});
