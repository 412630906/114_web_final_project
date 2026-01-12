import { getGuestId } from "../utils/guest.js";

function buildUrl(baseUrl, path) {
  var base = baseUrl;
  if (!base) base = "";
  if (base.endsWith("/")) base = base.slice(0, base.length - 1);
  if (!path.startsWith("/")) path = "/" + path;
  return base + path;
}

async function parseJsonSafe(res) {
  var text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

function errorFromResponse(payload, fallbackMsg) {
  if (payload) {
    if (payload.message) return new Error(payload.message);
    if (payload.error && payload.error.code) return new Error(payload.error.code);
  }
  return new Error(fallbackMsg);
}

export function createClient(baseUrl) {
  async function request(method, path, body) {
    var url = buildUrl(baseUrl, path);

    var headers = {
      "Content-Type": "application/json",
      "X-Guest-Id": getGuestId()
    };

    var init = { method: method, headers: headers };
    if (body !== undefined && body !== null) {
      init.body = JSON.stringify(body);
    }

    var res = await fetch(url, init);
    var payload = await parseJsonSafe(res);

    if (!res.ok) {
      throw errorFromResponse(payload, "Request failed");
    }

    if (!payload) {
      return {};
    }

    if (payload.success === false) {
      throw errorFromResponse(payload, "API error");
    }

    if (payload.data !== undefined) return payload.data;
    return payload;
  }

  return {
    get(path) {
      return request("GET", path, null);
    },
    post(path, body) {
      return request("POST", path, body);
    },
    del(path) {
      return request("DELETE", path, null);
    }
  };
}
