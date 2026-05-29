import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "CONFIRMED" | "PROCESSING" | "IN_TRANSIT" | "DELIVERED";
  estimatedDelivery?: string;
  trackingLocation?: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  memberTier: "ONYX" | "PLATINUM" | "DIAMOND";
  loyaltyPoints: number;
  orderHistory: Order[];
  wishlist: string[]; // Product IDs
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, firstName?: string, lastName?: string) => Promise<boolean>;
  signup: (email: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  toggleWishlist: (productId: string) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  addOrder: (items: { id: string; name: string; price: number; quantity: number; image: string }[], total: number) => void;
  updatePoints: (amount: number) => void;
}

const mockDefaultUser: UserProfile = {
  firstName: "Julian",
  lastName: "Malkovich",
  email: "julian@aether.luxury",
  memberTier: "ONYX",
  loyaltyPoints: 124800,
  wishlist: ["vector-optics-x1", "pulse-buds-3"],
  orderHistory: [
    {
      id: "98234",
      date: "Oct 02, 2024",
      total: 1240,
      status: "DELIVERED",
      items: [
        {
          id: "sneaker-x1",
          name: "LMN-X1 PROTOCOL SNEAKER",
          price: 1240,
          quantity: 1,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDP3fQ4biAXR2o6O3tOM2S-JgfJfQhQImJUccLEymGGMDu_KI6chKG7riPMQQnmNGzcWlq6V7vFT5hNxcdwfcETvxw7-CrZIUo87clvJdJjV815ECqPsseH5mVVN2KDejqV5Rm7lp1CSUUXpDqir_qnYwku6lRMoJdiNMrFMF646MeM60wvlVHa1KJUj1W88bADPYEMDLTOw7riP5SRiWSBJ_4_wI_NBOtkIUfHgDf35C8KTpoJO7zXBQ5tQXfal9LHANioQt8v4g"
        }
      ]
    },
    {
      id: "98102",
      date: "Sept 15, 2024",
      total: 3150,
      status: "DELIVERED",
      items: [
        {
          id: "chronos-series-4",
          name: "CHRONOS SERIES IV",
          price: 3150,
          quantity: 1,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpYiR9VgRdR5cAsFZ5VCcbmbNXKFEwiGYfpkMkO6hhyqzMZWcHW4XfVOgRUGqwFEU8rvmgwF1p5rI-tnuRwZEBCTtZY4Dmd0endh2lnJLCM52rv_AELiHMq7n7OHcVUGsPXbZUeKp-rnZegyc4hPhIVcfefVyZpCU4tiBTw-geZGJ3PzYzRT5HeghryZKShDnU2vvVhdz7EgfM-QqDBssmZE0M0hf9L6tI4IAYo5gBwJfWlLwQbS7UK1_RTF73e7TgGjxBfJhVhA"
        }
      ]
    }
  ]
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: mockDefaultUser, // pre-authenticate with our luxury placeholder by default
      isAuthenticated: true,
      isLoading: false,

      login: async (email: string, firstName = "Julian", lastName = "Malkovich") => {
        set({ isLoading: true });
        // Simulate API loading
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        set({
          user: {
            firstName,
            lastName,
            email,
            memberTier: "ONYX",
            loyaltyPoints: 124800,
            wishlist: ["vector-optics-x1", "pulse-buds-3"],
            orderHistory: mockDefaultUser.orderHistory
          },
          isAuthenticated: true,
          isLoading: false
        });
        return true;
      },

      signup: async (email: string, firstName: string, lastName: string) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        set({
          user: {
            firstName,
            lastName,
            email,
            memberTier: "ONYX",
            loyaltyPoints: 1000, // starting bonus points
            wishlist: [],
            orderHistory: []
          },
          isAuthenticated: true,
          isLoading: false
        });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      toggleWishlist: (productId: string) => {
        set((state) => {
          if (!state.user) return {};
          const isWishlisted = state.user.wishlist.includes(productId);
          const updatedWishlist = isWishlisted
            ? state.user.wishlist.filter((id) => id !== productId)
            : [...state.user.wishlist, productId];
          return {
            user: {
              ...state.user,
              wishlist: updatedWishlist
            }
          };
        });
      },

      addToWishlist: (productId: string) => {
        set((state) => {
          if (!state.user) return {};
          if (state.user.wishlist.includes(productId)) return {};
          return {
            user: {
              ...state.user,
              wishlist: [...state.user.wishlist, productId]
            }
          };
        });
      },

      removeFromWishlist: (productId: string) => {
        set((state) => {
          if (!state.user) return {};
          return {
            user: {
              ...state.user,
              wishlist: state.user.wishlist.filter((id) => id !== productId)
            }
          };
        });
      },

      addOrder: (items, total) => {
        set((state) => {
          if (!state.user) return {};
          
          const newOrder: Order = {
            id: (Math.floor(Math.random() * 90000) + 10000).toString(),
            date: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric"
            }),
            items,
            total,
            status: "CONFIRMED",
            estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit"
            }).toUpperCase(),
            trackingLocation: "PROCESSING CENTER"
          };

          // award 10 loyalty points for every dollar spent
          const pointsEarned = Math.floor(total * 10);

          return {
            user: {
              ...state.user,
              loyaltyPoints: state.user.loyaltyPoints + pointsEarned,
              orderHistory: [newOrder, ...state.user.orderHistory]
            }
          };
        });
      },

      updatePoints: (amount: number) => {
        set((state) => {
          if (!state.user) return {};
          return {
            user: {
              ...state.user,
              loyaltyPoints: Math.max(0, state.user.loyaltyPoints + amount)
            }
          };
        });
      }
    }),
    {
      name: "stitch-aether-auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
