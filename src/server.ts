import express from 'express';

import { categoriesRoutes } from './routes/categories.routes';
import { specificationRoutes } from './routes/specifications.routes';

const port = process.env.PORT || 3333;

const app = express();
app.use(express.json());
app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
