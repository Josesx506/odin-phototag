'use server';

import { getApiPrefix } from "./register";

// /api/game/[id]/checkMove
async function gameMoveAction(id, target, xcoord, ycoord) {
  try {
    const prefix = await getApiPrefix();
    const route = `${prefix}/api/game/${id}/checkmove?target=${target}&xcrd=${xcoord}&ycrd=${ycoord}`;
    const response = await fetch(route);
    const data = await response.json();
    
    return data;
  } catch (error) {

    return {
      success: false,
      message: error.message || 'An unexpected error occurred'
    };
  }
}

export { gameMoveAction }