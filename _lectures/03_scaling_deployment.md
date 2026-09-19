---
type: lecture
date: 2026-09-09
title: "Scaling to Real-World Deployment"
tldr: "Four-tier autonomous architecture, Sim2Real alignment, real-time control loops, and fluid dynamics in automated experimentation."
links: 
  - url: /static_files/presentations/03_scaling_deployment.pdf
    name: slides
---

**Key Topics:**
* **Four Tiers of Autonomous Architecture:** Decision Layer (active learning), Compilation & Safety Layer, Translation & Driver Layer (PyLabRobot), and Actuation Layer.
* **Sim2Real Gap & Domain Randomization:** Parameter distribution optimization and System Identification (SysID).
* **Visuomotor Control:** Vision-Language-Action (VLA) models, Action Chunking with Transformers (ACT), and CVAE loss.
* **Real-Time Control:** Deterministic 50 Hz control loops ($\Delta t = 20\text{ ms}$) and latency budgeting to avoid setpoint starvation.
* **Hardware Abstraction Layer (HAL):** Kinematic envelope boundary assertions, deck clearance verification, and Hagen-Poiseuille fluid dynamics for volatile/viscous liquid handling.
* **Automation Interfaces:** Opentrons HTTP REST API transaction models and OpenShelf Automated Storage and Retrieval Systems (AS/RS).
* **Coordinate Registration:** Orthogonal Procrustes alignment using Singular Value Decomposition (SVD).
* **Active Learning:** Multi-point Expected Improvement ($q$-EI) batch acquisition using Monte Carlo integration.