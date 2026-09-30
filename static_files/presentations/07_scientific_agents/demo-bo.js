/**
 * Interactive Discovery Visuals & Agent Engines:
 * 1. Slide 4: Reward Landscape & Mode Collapse (Plotly.js)
 * 2. Slide 17: ChemOS Active Reaction Optimization (Gaussian Process & UCB)
 */

// ============================================================
// Slide 4: RL Mode Collapse vs. Diverse Agent Landscape
// ============================================================
(function() {
  function drawModeCollapsePlot() {
    const el = document.getElementById('rl-collapse-plot');
    if (!el) return;

    const N = 240;
    const xs = [];
    const bioLandscape = [];
    const rlPolicy = [];
    const diversePolicy = [];

    // Synthetic chemical latent axis
    for (let i = 0; i < N; i++) {
      const x = 0 + 10 * (i / (N - 1));
      xs.push(x);

      // Multi-modal bio-reward landscape (three functional peaks)
      const p1 = 6.8 * Math.exp(-Math.pow((x - 2.2) / 0.75, 2));
      const p2 = 9.2 * Math.exp(-Math.pow((x - 5.5) / 0.85, 2)); // Global surrogate peak
      const p3 = 7.4 * Math.exp(-Math.pow((x - 8.4) / 0.65, 2));
      const baseline = 0.5 * Math.sin(0.8 * x) + 0.8;
      const trueScore = p1 + p2 + p3 + baseline;
      bioLandscape.push(trueScore);

      // Standard RL: collapses all probability mass onto the surrogate's narrow peak
      const rl = 11.5 * Math.exp(-Math.pow((x - 5.5) / 0.22, 2));
      rlPolicy.push(rl);

      // Diverse Agent / GFlowNet: proportional coverage across all modes
      const div = 0.85 * (p1 + p2 + p3) + 0.4;
      diversePolicy.push(div);
    }

    const traceBio = {
      x: xs, y: bioLandscape, mode: 'lines',
      name: 'Surrogate Score Landscape R(x)',
      line: { color: '#95A5A6', width: 2, dash: 'dot' }
    };

    const traceRL = {
      x: xs, y: rlPolicy, mode: 'lines',
      name: 'Standard RL: Mode Collapse',
      line: { color: '#EA5A27', width: 3.5 },
      fill: 'tozeroy', fillcolor: 'rgba(234, 90, 39, 0.12)'
    };

    const traceDiverse = {
      x: xs, y: diversePolicy, mode: 'lines',
      name: 'GFlowNet: Diverse Policy π(x) ∝ R(x)',
      line: { color: '#2E9B85', width: 3 },
      fill: 'tozeroy', fillcolor: 'rgba(46, 155, 133, 0.16)'
    };

    const layout = {
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(250,250,250,0.8)',
      margin: { t: 20, r: 15, b: 40, l: 45 },
      font: { family: 'Lato, sans-serif', size: 12, color: '#1A1A1A' },
      xaxis: { title: 'Chemical Scaffold Space', showgrid: true, zeroline: false },
      yaxis: { title: 'Sampling Probability / Score', showgrid: true, zeroline: false },
      legend: { x: 0.02, y: 0.98, bgcolor: 'rgba(255,255,255,0.85)', bordercolor: '#E1E6EA', borderwidth: 1 },
      annotations: [
        {
          x: 5.5, y: 11.5,
          text: 'Surrogate Exploitation<br>(False Positive Trap)',
          showarrow: true, arrowhead: 2, ax: 45, ay: -25,
          font: { size: 11, color: '#EA5A27', family: 'Raleway' }
        },
        {
          x: 2.2, y: 7.2,
          text: 'Discovered Mode A',
          showarrow: true, arrowhead: 2, ax: -35, ay: -25,
          font: { size: 11, color: '#2E9B85', family: 'Raleway' }
        },
        {
          x: 8.4, y: 7.8,
          text: 'Discovered Mode C',
          showarrow: true, arrowhead: 2, ax: 35, ay: -25,
          font: { size: 11, color: '#2E9B85', family: 'Raleway' }
        }
      ]
    };

    Plotly.react('rl-collapse-plot', [traceBio, traceDiverse, traceRL], layout, {
      displayModeBar: false,
      responsive: true
    });
  }

  Reveal.on('slidechanged', (e) => {
    if (e.currentSlide && e.currentSlide.querySelector('#rl-collapse-plot')) {
      drawModeCollapsePlot();
      Plotly.Plots.resize('rl-collapse-plot');
    }
  });

  Reveal.on('ready', () => {
    drawModeCollapsePlot();
  });
})();

// ============================================================
// Slide 17: ChemOS Bayesian Optimization Live Engine
// ============================================================
(function() {
  const X_MIN = -3.0, X_MAX = 3.0;
  const GRID_POINTS = 160;
  const xGrid = [];
  for (let i = 0; i < GRID_POINTS; i++) {
    xGrid.push(X_MIN + (X_MAX - X_MIN) * (i / (GRID_POINTS - 1)));
  }

  function trueTarget(x) {
    const raw = Math.sin(2.2 * x) + 0.6 * Math.cos(4.8 * x) - 0.12 * x * x + 1.2;
    return Math.max(5, Math.min(95, raw * 32 + 12));
  }

  const LENGTH_SCALE = 0.65;
  const NOISE_VAR = 0.8;

  function kernel(x1, x2) {
    const d = x1 - x2;
    return 380 * Math.exp(- (d * d) / (2 * LENGTH_SCALE * LENGTH_SCALE));
  }

  function solveLinear(A, b) {
    const n = A.length;
    const M = A.map((row, i) => [...row, b[i]]);
    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
      }
      [M[i], M[maxRow]] = [M[maxRow], M[i]];
      const pivot = M[i][i];
      for (let j = i; j <= n; j++) M[i][j] /= pivot;
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = M[k][i];
          for (let j = i; j <= n; j++) M[k][j] -= factor * M[i][j];
        }
      }
    }
    return M.map(row => row[n]);
  }

  let sampledX = [-2.2, 1.8];
  let sampledY = sampledX.map(trueTarget);
  let beta = 2.5;

  function runGP() {
    const N = sampledX.length;
    const K = [];
    for (let i = 0; i < N; i++) {
      K[i] = [];
      for (let j = 0; j < N; j++) {
        K[i][j] = kernel(sampledX[i], sampledX[j]) + (i === j ? NOISE_VAR : 0);
      }
    }
    const alpha = solveLinear(K, sampledY);

    const mu = [];
    const sigma = [];
    const ucb = [];

    for (let g = 0; g < GRID_POINTS; g++) {
      const x = xGrid[g];
      const kStar = [];
      for (let i = 0; i < N; i++) kStar.push(kernel(x, sampledX[i]));

      let meanVal = 0;
      for (let i = 0; i < N; i++) meanVal += kStar[i] * alpha[i];
      mu.push(meanVal);

      const v = solveLinear(K, kStar);
      let kStarKinvKstar = 0;
      for (let i = 0; i < N; i++) kStarKinvKstar += kStar[i] * v[i];
      const variance = Math.max(0.1, kernel(x, x) - kStarKinvKstar);
      const std = Math.sqrt(variance);
      sigma.push(std);

      ucb.push(meanVal + beta * std);
    }

    let bestIdx = 0;
    for (let i = 1; i < GRID_POINTS; i++) {
      if (ucb[i] > ucb[bestIdx]) bestIdx = i;
    }

    return { mu, sigma, ucb, nextX: xGrid[bestIdx], nextUCB: ucb[bestIdx] };
  }

  function drawDemo() {
    const container = document.getElementById('bo-plot');
    if (!container) return;

    const res = runGP();
    const upperBand = res.mu.map((m, i) => m + 2 * res.sigma[i]);
    const lowerBand = res.mu.map((m, i) => m - 2 * res.sigma[i]);
    const trueY = xGrid.map(trueTarget);

    const traceTrue = {
      x: xGrid, y: trueY, mode: 'lines', name: 'Unknown Reaction Landscape',
      line: { color: '#BDC3C7', width: 2, dash: 'dot' }
    };
    const traceUpper = {
      x: xGrid, y: upperBand, mode: 'lines', line: { width: 0 },
      showlegend: false, hoverinfo: 'skip'
    };
    const traceLower = {
      x: xGrid, y: lowerBand, mode: 'lines', line: { width: 0 },
      fill: 'tonexty', fillcolor: 'rgba(46, 155, 133, 0.18)',
      name: 'Surrogate Uncertainty (±2σ)', hoverinfo: 'skip'
    };
    const traceMean = {
      x: xGrid, y: res.mu, mode: 'lines', name: 'Agent GP Surrogate μ(x)',
      line: { color: '#2E9B85', width: 3.5 }
    };
    const traceObs = {
      x: sampledX, y: sampledY, mode: 'markers', name: 'Completed Wet-Lab Trials',
      marker: { size: 10, color: '#1A1A1A', symbol: 'circle' }
    };

    const traceUCB = {
      x: xGrid, y: res.ucb, mode: 'lines', name: 'Acquisition: UCB(x)',
      yaxis: 'y2', line: { color: '#EA5A27', width: 2.5 }
    };
    const traceNext = {
      x: [res.nextX], y: [res.nextUCB], mode: 'markers', name: 'Next Recommended Condition',
      yaxis: 'y2', marker: { size: 14, color: '#EA5A27', symbol: 'star' }
    };

    const layout = {
      grid: { rows: 2, columns: 1, pattern: 'independent', roworder: 'top to bottom' },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(250,250,250,0.8)',
      margin: { t: 15, r: 25, b: 35, l: 55 },
      font: { family: 'Lato, sans-serif', size: 13, color: '#1A1A1A' },
      xaxis: { showticklabels: false, range: [X_MIN, X_MAX], zeroline: false },
      yaxis: { domain: [0.38, 1.0], title: 'Isolated Yield (%)', range: [0, 105], zeroline: false },
      xaxis2: { title: 'Continuous Reaction Parameter x (e.g., Catalyst Loading mol% / Temperature °C)', range: [X_MIN, X_MAX], zeroline: false },
      yaxis2: { domain: [0.0, 0.28], title: 'Acquisition', zeroline: false },
      legend: { x: 0.02, y: 1.02, orientation: 'h', bgcolor: 'rgba(255,255,255,0.75)' },
      hovermode: false
    };

    Plotly.react('bo-plot', [traceTrue, traceUpper, traceLower, traceMean, traceObs, traceUCB, traceNext], layout, {
      displayModeBar: false,
      responsive: true
    });

    const statusEl = document.getElementById('bo-status');
    if (statusEl) statusEl.textContent = `Simulated Runs: ${sampledX.length} / 14`;
  }

  function stepAgent() {
    if (sampledX.length >= 14) return;
    const res = runGP();
    sampledX.push(res.nextX);
    sampledY.push(trueTarget(res.nextX));
    drawDemo();
  }

  function resetAgent() {
    sampledX = [-2.2, 1.8];
    sampledY = sampledX.map(trueTarget);
    drawDemo();
  }

  function wireDemo() {
    const stepBtn = document.getElementById('bo-step');
    const resetBtn = document.getElementById('bo-reset');
    const betaSlider = document.getElementById('bo-beta');

    if (stepBtn && !stepBtn.dataset.wired) {
      stepBtn.dataset.wired = '1';
      stepBtn.onclick = stepAgent;
    }
    if (resetBtn && !resetBtn.dataset.wired) {
      resetBtn.dataset.wired = '1';
      resetBtn.onclick = resetAgent;
    }
    if (betaSlider && !betaSlider.dataset.wired) {
      betaSlider.dataset.wired = '1';
      betaSlider.oninput = (e) => {
        beta = parseFloat(e.target.value);
        const labelEl = document.getElementById('bo-beta-val');
        if (labelEl) labelEl.textContent = beta.toFixed(1);
        drawDemo();
      };
    }
  }

  Reveal.on('slidechanged', (e) => {
    wireDemo();
    if (e.currentSlide && e.currentSlide.querySelector('#bo-plot')) {
      drawDemo();
      Plotly.Plots.resize('bo-plot');
    }
  });

  Reveal.on('ready', () => {
    wireDemo();
    drawDemo();
  });
})();
