const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const client = require('prom-client');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Registre Prometheus pour les métriques personnalisées
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Jauge et Compteur Prometheus
const activePlayersGauge = new client.Gauge({
  name: 'gamenode_active_players',
  help: 'Nombre de joueurs actuellement connectés',
  registers: [register]
});

const totalConnectionsCounter = new client.Counter({
  name: 'gamenode_total_connections',
  help: 'Nombre total de connexions établies',
  registers: [register]
});

let currentPlayers = 0;

io.on('connection', (socket) => {
  currentPlayers++;
  activePlayersGauge.set(currentPlayers);
  totalConnectionsCounter.inc();
  console.log(`Joueur connecté. Total actifs : ${currentPlayers}`);

  socket.on('disconnect', () => {
    currentPlayers = Math.max(0, currentPlayers - 1);
    activePlayersGauge.set(currentPlayers);
    console.log(`Joueur déconnecté. Total actifs : ${currentPlayers}`);
  });
});

// Endpoint des métriques exposé pour Prometheus
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.get('/', (req, res) => {
  res.send('GameNode Ops Server is running!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur GameNode en écoute sur le port ${PORT}`);
});
