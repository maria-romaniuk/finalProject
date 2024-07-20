import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface INewsItem {
    id: number;
    regionId: number;
    regionName: string;
    sectionName: string;
    title: string;
    date: string;
    titleImageSquare: string;
    titleImageWide: string;
    content: string;
    likes?: number | null;
    isUserLikes?: boolean;
    likedBy?: number[];
}

export interface initialNewsState {
    items: INewsItem[];
    status:null| "loading" | "success" | "error";
    idSelectedUser: number;
}
const initialState: initialNewsState = {
    items: [],
    status: null,
    idSelectedUser: 0,

};

interface LikePayload {
    newsId: number;
    userId: number;
}
export const fetchNews = {}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setNews: (state, action: PayloadAction<INewsItem[]>) => {
            state.items = action.payload;
        },
        addNewsItem: (state, action: PayloadAction<INewsItem>) => {
            state.items.push(action.payload);
        },
        updateNewsItem: (state, action: PayloadAction<INewsItem>) => {
            const index =
             state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteNewsItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },



        likeNewsItem: (state, action: PayloadAction<LikePayload>) => {
            const { newsId, userId } =action.payload;
            const item = state.items.find(item=> item.id === newsId);
            if (item) {
                item.likes = (item.likes || 0) + 1;
                if (!item.likedBy) {
                    item.likedBy=[];
                }
                item.likedBy.push(userId);
            }
        },
        unlikeNewsItem: (state, action: PayloadAction<LikePayload>) => {
            const { newsId, userId } = action.payload;
            const item = state.items.find(item => item.id === newsId);
            if (item) {
                item.likes = (item.likes || 0) - 1;
                if (item.likedBy) {
                    item.likedBy = item.likedBy.filter(id => id !== userId);
                }
            }
        }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchUsers.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
              state.users = action.payload;
              state.status = "success";
            }
          )
          .addCase(fetchUsers.rejected, (state) => {
            state.status = "error";
          });
      },
});

export const { setNews, addNewsItem, updateNewsItem, deleteNewsItem,  likeNewsItem,unlikeNewsItem } = newsSlice.actions;
export default newsSlice.reducer;