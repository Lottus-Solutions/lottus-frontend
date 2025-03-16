const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Rota para cadastrar usuários
server.post("/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }
  req.body.id = Date.now(); // Gerar um ID único
  router.db.get("usuarios").push(req.body).write();
  res.status(201).json(req.body);
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server está rodando na porta 3000");
});
