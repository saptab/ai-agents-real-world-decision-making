---
type: lecture
date: 2026-09-28
title: "Lecture 7: Scientific Agents: Design, Synthesis, and Autonomous Discovery"
tldr: "Autonomous closed-loop discovery, generative inverse molecular design with GFlowNets, 3N-MCTS retrosynthesis planning, ChemOS orchestration, and Coscientist robotic execution."
thumbnail: /static_files/presentations/lec01.jpg
links:
  - url: /static_files/presentations/07_scientific_agents/index.html
    name: Interactive Slides
---

<!-- **Lecture Focus & Core Concepts:**

- **The Autonomous Discovery Loop:** Contrasting Edisonian trial-and-error (10–20 years) with closed-loop Self-Driving Laboratories (hours–days).
- **Inverse Molecular Design:** Discrete molecular graphs and DAG-structured state spaces; why standard RL suffers mode collapse on biological surrogates; GFlowNet flow conservation and log-flow matching.
- **Retrosynthetic Search:** Formulating retrosynthesis as an MDP; 3N-MCTS architecture combining expansion policy, in-scope neural filters, and rapid rollout playouts.
- **Physical Laboratory Orchestration:** Distributed execution via ChemOS; active Bayesian optimization for continuous reaction yields; Coscientist tool-use (ReAct, documentation vector search, sandboxed execution).
- **Physical Validation & Governance:** Automated Suzuki-Miyaura and Sonogashira cross-coupling execution, GC-MS verification, and deterministic biosecurity/safety firewalls. -->

**Reference Readings:**

- Bengio, E., et al. (2021). *Flow Network based Generative Models for Non-Iterative Diverse Candidate Generation and Molecule Discovery*. arXiv:2106.04399.
- Segler, M. H. S., Preuss, M., & Waller, M. P. (2018). *Planning chemical syntheses with deep neural networks and symbolic AI*. **Nature**, 555(7698), 604–610.
- Roch, L. M., et al. (2020). *ChemOS: An orchestration software to democratize autonomous discovery*. **PLOS ONE**, 15(4), e0229862.
- Boiko, D. A., et al. (2023). *Autonomous chemical research with large language models*. **Nature**, 624(7992), 570–578.