const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const protect = require('./middleware/authMiddleware');
const path = require('path');

const typeArticle = require('./routes/TypeArticle');
const vente = require('./routes/VenteRoutes');
const stock = require('./routes/StockRoutes');
const fournisseur = require('./routes/FournisseurRoutes');
const client = require('./routes/ClientRoutes');
const auth = require('./routes/authRoutes');
const article = require('./routes/ArticleRoutes');
const approvisionnement = require('./routes/ApprovisionnementRoutes');
const dashboard = require('./routes/DashboardRoutes');

sequelize.authenticate()
  .then(() => {
    console.log("Connexion à MySQL réussie.");
    // return sequelize.sync({update: true});
  })
  .catch(err => console.error("Échec de connexion à MySQL :", err));

const corsOptions = {
  origin: "*"
};

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cors(corsOptions));


app.use(express.json({ extended: false }));

app.use("/api", auth);
app.use("/api", protect, typeArticle);
app.use("/api", protect, vente);
app.use("/api", protect, stock);
app.use("/api", protect, fournisseur);
app.use("/api", protect, client);
app.use("/api", protect, article);
app.use("/api", protect, approvisionnement);
app.use("/api", protect, dashboard);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is running on the port ${port}`));