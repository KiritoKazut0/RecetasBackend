import 'dotenv/config'
import express from "express"
import cors from "cors"
import morgan from "morgan"

const app = express();
const PORT = parseInt(process.env['PORT'] || '3000');
app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
    origin: "*"
}));

app.listen(PORT, () => {
    console.log('Server Listening on port', PORT);
})



