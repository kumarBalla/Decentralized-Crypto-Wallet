// src/store/store.js
// ✅ FINAL STORE + SWAP + WALLET UPDATE FIXED
import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

/* LocalStorage Helpers */
const loadUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};
const saveUser = (data) => {
  try {
    localStorage.setItem("user", JSON.stringify(data));
  } catch {}
};
const clearUser = () => localStorage.removeItem("user");

/* =====================================================
 ✅ THUNKS
===================================================== */

/* Login */
export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const isOwner = email?.toLowerCase().endsWith("@crypto.com");
      const endpoint = isOwner ? "/api/owners/login" : "/api/user/login";
      const payload = isOwner ? { email, password } : { email, password, name };

      const res = await api.post(endpoint, payload);
      const data = res.data;
      data.role = isOwner ? "owner" : "user";

      saveUser(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);


// ✅ Add Money
export const addMoney = createAsyncThunk(
  "user/addMoney",
  async ({ userId, amount, upiId }) => {
    const response = await api.post(
      `/api/user/wallet/add/${userId}?amount=${amount}&upiId=${upiId}`
    );
    return response.data;
  }
);

// ✅ Withdraw Money
export const withdrawMoney = createAsyncThunk(
  "user/withdrawMoney",
  async ({ userId, amount }) => {
    const response = await api.post(
      `/api/user/wallet/withdraw/${userId}?amount=${amount}`
    );
    return response.data;
  }
);




/* Fetch All Cryptos (Market View) */
export const fetchCryptos = createAsyncThunk(
  "crypto/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/crypto/all");
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load cryptos");
    }
  }
);

/* Fetch All Owners */
export const fetchOwners = createAsyncThunk(
  "owners/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/owners/all");
      return res.data;
    } catch {
      return rejectWithValue("Failed to load owners");
    }
  }
);

/* Fetch Owner Cryptos */
export const fetchOwnerCryptos = createAsyncThunk(
  "crypto/fetchOwner",
  async (ownerId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/crypto/owner/${ownerId}`);
      return res.data;
    } catch {
      return rejectWithValue("Failed to load owner cryptos");
    }
  }
);

/* ✅ BUY */
export const buyCrypto = createAsyncThunk(
  "crypto/buy",
  async ({ userId, ownerId, cryptoId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/user/${userId}/buy/${ownerId}/${cryptoId}?quantity=${quantity}`
      );
      saveUser(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Transaction Failed");
    }
  }
);

/* ✅ SELL */
export const sellCrypto = createAsyncThunk(
  "crypto/sell",
  async ({ userId, ownerId, cryptoId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/user/${userId}/sell/${ownerId}/${cryptoId}?quantity=${quantity}`
      );
      saveUser(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Sell Failed");
    }
  }
);

/* ✅ 🔄 SWAP */
export const swapCrypto = createAsyncThunk(
  "crypto/swap",
  async ({ userId, ownerId, fromCryptoId, toCryptoId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/user/${userId}/swap/${ownerId}?fromCryptoId=${fromCryptoId}&toCryptoId=${toCryptoId}&quantity=${quantity}`
      );
      saveUser(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "❌ Swap failed!");
    }
  }
);

/* Owner CRUD */
export const addOwnerCrypto = createAsyncThunk(
  "crypto/addOwner",
  async ({ ownerId, cryptoData }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/api/crypto/add/${ownerId}`, cryptoData);
      return res.data;
    } catch {
      return rejectWithValue("Add crypto failed");
    }
  }
);

export const updateOwnerCrypto = createAsyncThunk(
  "crypto/updateOwner",
  async ({ ownerId, cryptoId, cryptoData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/crypto/update/${ownerId}/${cryptoId}`, cryptoData);
      return res.data;
    } catch {
      return rejectWithValue("Update failed");
    }
  }
);

export const deleteOwnerCrypto = createAsyncThunk(
  "crypto/deleteOwner",
  async ({ ownerId, cryptoId }, { rejectWithValue }) => {
    try {
      await api.delete(`/api/crypto/delete/${ownerId}/${cryptoId}`);
      return { cryptoId };
    } catch {
      return rejectWithValue("Delete failed");
    }
  }
);

/* =====================================================
 ✅ SLICES
===================================================== */
const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    cryptos: [],
    ownerCryptos: [],
    owners: [],
    selectedCrypto: null,
    editCrypto: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
    setEditCrypto: (state, action) => {
      state.editCrypto = action.payload;
    },
    clearEditCrypto: (state) => {
      state.editCrypto = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        state.cryptos = action.payload;
      })
      .addCase(fetchOwners.fulfilled, (state, action) => {
        state.owners = action.payload;
      })
      .addCase(fetchOwnerCryptos.fulfilled, (state, action) => {
        state.ownerCryptos = action.payload;
      })
      .addCase(addOwnerCrypto.fulfilled, (state, action) => {
        state.ownerCryptos.push(action.payload);
      })
      .addCase(updateOwnerCrypto.fulfilled, (state, action) => {
        const updated = action.payload;
        state.ownerCryptos = state.ownerCryptos.map((c) =>
          c.cryptoId === updated.cryptoId ? updated : c
        );
      })
      .addCase(deleteOwnerCrypto.fulfilled, (state, action) => {
        state.ownerCryptos = state.ownerCryptos.filter(
          (c) => c.cryptoId !== action.payload.cryptoId
        );
      });
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: loadUser(),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      clearUser();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(buyCrypto.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(sellCrypto.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(swapCrypto.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(addMoney.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(withdrawMoney.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

/* ✅ EXPORT ACTIONS */
export const { logout } = userSlice.actions;
export const { setSelectedCrypto, setEditCrypto, clearEditCrypto } =
  cryptoSlice.actions;

/* ✅ STORE SETUP */
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    crypto: cryptoSlice.reducer,
  },
});

export default store;
