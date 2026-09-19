---
type: lecture
date: 2026-09-16
title: "Interconnection Topologies, Latency Bounds, and Grid Energy Infrastructure"
tldr: "Topological bounds, collective communications, cluster sizing derivation, and RL-based smart grid control."
links: 
  - url: /static_files/presentations/05_topologies_energy_infrastructure.pdf
    name: slides
---

**Key Topics:**
* **Interconnection Topologies:** Diameters, node degrees, and routing bounds across Linear Arrays, 2D Meshes, Binary Trees, and Hypercubes.
* **Collective Communication:** Hierarchies of Single-Node Broadcast, Scatter/Gather, Multinode Broadcast, and Total Exchange.
* **Cross-Section Bounds:** Bisection link constraints ($L_{12}$) dictating minimum communication units.
* **Memory Optimization:** Row vs. Column storage tradeoffs in distributed matrix-vector operations.
* **Analytical Cluster Optimization:** Deriving optimal processor counts ($p^* = \sqrt{\frac{2\alpha n}{\alpha + \beta}}$) and block sizes ($k^*$) to minimize distributed inner-product latency.
* **Datacenter Power Infrastructure:** NVIDIA DGX B200 density, Power Usage Effectiveness (PUE), and direct liquid cooling.
* **Grid Control as an RL Problem:** DEC-POMDP formulations for line capacity utilization ($\rho_{ij}$), branch current constraints, non-stationarity, and the Grid2Op challenge.
* **Parallel Power Flow Solvers:** Jacobi vs. Gauss-Seidel updates and parallelization via graph coloring.