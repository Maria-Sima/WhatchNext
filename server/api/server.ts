import { GetDetails } from "./movieDb/getDetails";
import { GetRecomandation } from "./openAi/openAiService";
import {Request, Response} from "express";
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');



const app = express();
const port = 3000 || 4001;
app.use(express.json());
app.use(cors);


app.get('/api/details', async (req:Request, res: Response) => {
  try {
    console.log(req);
    const details = await GetDetails({ request: req });
    res.json(details);
  } catch (error) {
    console.error('Error while fetching details:', error);
    res.status(500).json({ error: 'Something went wrong with MovieDb :(' });
  }
});

app.post('/api/recommendations', async (req:Request, res:Response) => {
  try {
    const recommendations = await GetRecomandation({ request: req });
    res.json(recommendations);
  } catch (error) {
    console.error('Error while fetching movie recommendations:', error);
    res.status(500).json({ error: 'Something went wrong with openAI :(' });
  }
});

const startServer = async () => {
  try {
    await app.listen(port);
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
