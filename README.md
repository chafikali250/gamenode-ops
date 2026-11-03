# 🎮 GameNode Ops

> **GameNode Ops** is a hands-on DevOps project featuring a real-time WebSocket game server node, automated containerized delivery via GitHub Actions and Ansible, and full-stack observability with Prometheus and Grafana.

---

## 📌 Project Overview

This repository demonstrates an end-to-end CI/CD and monitoring architecture for lightweight game backend infrastructure.

*   **Application**: Node.js & Socket.io server tracking real-time player connections and exposing custom Prometheus metrics.
*   **Containerization**: Multi-container setup managed via Docker Compose (`gamenode`, `prometheus`, `grafana`).
*   **CI/CD Pipeline**: GitHub Actions workflow that automatically builds and pushes Docker images to Docker Hub on every push to `main`.
*   **Automated Deployment**: Idempotent remote server provisioning using an **Ansible** playbook triggered by GitHub Actions.
*   **Observability**: Prometheus scraping interval setup and Grafana dashboard for live tracking of connected players, connection spikes, and memory heap utilization.

---

## 🏗️ Tech Stack

*   **Runtime**: Node.js, Express, Socket.io, `prom-client`
*   **Containers**: Docker, Docker Compose
*   **CI/CD & Automation**: GitHub Actions, Ansible
*   **Monitoring**: Prometheus, Grafana

