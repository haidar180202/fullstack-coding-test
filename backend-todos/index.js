const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});