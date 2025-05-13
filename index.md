---
layout: default
title: My Game Dev Portfolio
---

<style>
  body {
    background-color: #0d0d0d;
    color: #f0f0f0;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    padding: 2rem;
  }

  h1, h2, p {
    margin-bottom: 1rem;
  }

  .neon-separator {
    border: none;
    height: 2px;
    background: linear-gradient(90deg, #ff0000, #ff4d4d);
    box-shadow: 0 0 10px #ff0000, 0 0 20px #ff4d4d;
    margin: 2rem 0;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }

  .card {
    background: #1a1a1a;
    border: 2px solid #ff0000;
    box-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;
    border-radius: 12px;
    width: 280px;
    padding: 1.5rem;
    text-align: left;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px #ff4d4d, 0 0 30px #ff0000;
  }

  .card h3 {
    color: #ff4d4d;
    margin-bottom: 0.5rem;
  }

  .card p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .card a {
    color: #ff4d4d;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .card a:hover {
    color: #ffffff;
    text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000;
  }
</style>

# My Game Dev Portfolio

[See my projects](#projects)

<hr class="neon-separator">

## Projects

<div class="card-container">

<div class="card">
  <img src="/assets/TITULO.png" alt="Fox Adventure" style="width:100%; border-radius:8px; margin-bottom:1rem;">
  <h3>Fox Adventure</h3>
  <p>A 2D action-platformer featuring a brave fox with unique tail attacks. Developed in Unity.</p>
  <a href="#">View Project</a>
</div>

<div class="card">
  <img src="https://via.placeholder.com/250x150.png?text=Spell+Cards" alt="Spell Cards" style="width:100%; border-radius:8px; margin-bottom:1rem;">
  <h3>Spell Cards</h3>
  <p>Multiplayer online card game using Unity RPCs, featuring magic duels and deck building mechanics.</p>
  <a href="#">View Project</a>
</div>

<div class="card">
  <h3>Pixel Dungeon</h3>
  <p>Procedurally generated dungeon crawler game, with pixel art graphics and rogue-lite elements.</p>
  <a href="#">View Project</a>
</div>

</div> <!-- CIERRE correcto del div.card-container -->
