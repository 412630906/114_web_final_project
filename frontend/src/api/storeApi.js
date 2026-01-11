import { createClient } from "./client.js";
import { mockApi } from "./mockApi.js";

export function createStoreApi() {
  var useMock = import.meta.env.VITE_USE_MOCK;
  if (useMock === "true") {
    return mockApi;
  }

  var baseUrl = import.meta.env.VITE_API_BASE_URL;
  var client = createClient(baseUrl);

  return {
    async getGames() {
      return client.get("/games");
    },
    async getCart() {
      return client.get("/cart");
    },
    async addToCart(gameId) {
      return client.post("/cart/items", { gameId: gameId });
    },
    async removeFromCart(gameId) {
      return client.del("/cart/items/" + gameId);
    },
    async clearCart() {
      return client.del("/cart");
    },
    async checkout() {
      return client.post("/checkout", {});
    },
    async getLibrary() {
      return client.get("/library");
    }
  };
}
