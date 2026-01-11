import React from "react";
import { formatTWD } from "../utils/money.js";

export default function GameCard(props) {
  const game = props.game;
  const onAdd = props.onAdd;

  function handleAdd() {
    if (onAdd) onAdd(game);
  }

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={game.coverImage}
        alt={game.title}
        className="card-img-top game-cover"
        loading="lazy"
      />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title mb-2">{game.title}</h6>
        <div className="mt-auto d-flex align-items-center justify-content-between">
          <span className="fw-semibold">{formatTWD(game.price)}</span>
          <button className="btn btn-primary btn-sm" onClick={handleAdd}>
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
}
